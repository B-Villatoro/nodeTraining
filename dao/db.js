var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.AURL,
    user     : process.env.AUN,
    password : process.env.APASS,
    database : process.env.ADB
});

module.exports = connection;