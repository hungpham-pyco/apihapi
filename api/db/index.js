const Mongoose = require('mongoose');
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost:27017';
Mongoose.connect(MONGOURL);
Mongoose.Promise = global.Promise;
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('connected', console.error.bind(console, 'Connected to MongoDB'));
db.on('disconnected', console.error.bind(console, 'MongoDB was disconnected'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});
exports.Mongoose = Mongoose;

exports.db = db;
