module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  const config = require('./shipit/config');

  shipit.initConfig({
    default: {
      workspace: 'shipit/workspace',
      keepReleases: 2,
      deleteOnRollback: false,
      ignores: ['.git', 'node_modules', 'shipit', 'shipitfile.js'],
      repositoryUrl: 'git@github.com:20Scoops-CNX/wim-backend-training.git',
      shared: {
        overwrite: true,
        dirs: [/*"public", */ 'node_modules' /*, "log"*/],
        files: ['.env']
      }
    },
    dev: {
      servers: '20scoops@jisack.com',
      key: '~/.ssh/wim_dev',
      deployTo: '~/wim-project',
      branch: 'master'
    }
  });

  shipit.on('sharedEnd', () => shipit.start('setup'));
  shipit.blTask('setup', function() {
    return Promise.resolve().then(() =>
      shipit.remote(`npm install --production`, { cwd: shipit.releasePath })
    );
  });

  shipit.on('deployed', () => shipit.start('pm2'));
  shipit.blTask('pm2', function() {
    const pm2Name = config[shipit.environment].pm2_name;
    if (!pm2Name) {
      throw new Error('No pm2_name present in shipit configuration');
    }
    return Promise.resolve()
      .then(() => shipit.remote(`pm2 id ${pm2Name}`))
      .then(res => {
        if (res[0].stdout.trim() === '[]') {
          console.log('Start pm2 : ' + pm2Name);
          return shipit.remote(
            `pm2 start ${shipit.currentPath}/ --name ${pm2Name}`
          );
        } else {
          console.log('Restart pm2 : ' + pm2Name);
          return shipit.remote(`pm2 restart ${pm2Name}`);
        }
      });
  });
};
