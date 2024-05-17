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


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'khmerapp_laravel11',
    port: 3306,
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});