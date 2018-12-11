const Joi = require('joi');
const UserController = require('./Controllers/UserController');
const LonggenController = require('./Controllers/LongenController');
const TrnasactionController = require('./Controllers/TransactionController');

module.exports = [
  //User
  {
    method: 'GET',
    path: '/user',
    options: {
      handler: UserController.listUser,
      description: 'Get All users.',
      tags: ['api', 'user']
    }
  },
  {
    method: 'POST',
    path: '/user',
    options: {
      handler: UserController.createUser,
      description: 'Create new user.',
      tags: ['api', 'user'],
      validate: {
        payload: {
          username: Joi.string().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required()
        }
      }
    }
  },

  //Longen
  {
    method: 'GET',
    path: '/longen',
    options: {
      handler: LonggenController.list,
      description: 'List all longen.',
      tags: ['api', 'longen']
    }
  },
  {
    method: 'GET',
    path: '/longen/{longen_id}',
    options: {
      handler: LonggenController.show,
      description: 'Show a longen by objcet id.',
      tags: ['api', 'longen'],
      validate: {
        params: {
          longen_id: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/longen',
    options: {
      handler: LonggenController.create,
      description: 'Create longen by username.',
      tags: ['api', 'longen'],
      validate: {
        payload: {
          username: Joi.string().required(),
          address: Joi.string().required(),
          amount: Joi.number().required(),
          long: Joi.number().required(),
          lat: Joi.number().required(),
          price: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/longen',
    options: {
      handler: LonggenController.update,
      description: 'Update longen by object id and username.',
      tags: ['api', 'longen'],
      validate: {
        payload: {
          longen_id: Joi.string().required(),
          username: Joi.string().required(),
          address: Joi.string().required(),
          amount: Joi.number().required(),
          long: Joi.number().required(),
          lat: Joi.number().required(),
          price: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/longen/{username}/{longen_id}',
    options: {
      handler: LonggenController.delete,
      description: 'Delete longen by object id and username.',
      tags: ['api', 'longen'],
      validate: {
        params: {
          longen_id: Joi.string().required(),
          username: Joi.string().required()
        }
      }
    }
  },

  //Transaction
  {
    method: 'GET',
    path: '/transaction/{username}',
    options: {
      handler: TrnasactionController.list,
      description: 'List transaction by username.',
      tags: ['api', 'transaction'],
      validate: {
        params: {
          username: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/transaction',
    options: {
      handler: TrnasactionController.create,
      description: 'Create transaction.',
      tags: ['api', 'transaction'],
      validate: {
        payload: {
          username: Joi.string().required(),
          longen_id: Joi.string().required()
        }
      }
    }
  }
];
