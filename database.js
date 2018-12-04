const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:12341234@localhost:2277/longen?authSource=admin');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

exports.db = db;