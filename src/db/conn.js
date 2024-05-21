// const mongoose = require('mongoose')
// mongoose.set("strictQuery", false);
// mongoose.connect('mongodb://localhost:27017/studends', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('successfully connect with database.');
// }).catch((e) => {
//     console.log(`error` + e);
// })


// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
// });
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });



const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;