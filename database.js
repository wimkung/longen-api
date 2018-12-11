const mongoose = require('mongoose');

require('dotenv').config();

const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    authSource: 'admin',
    useNewUrlParser: true,
};

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

exports.db = db;