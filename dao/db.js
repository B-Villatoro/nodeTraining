var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : process.env.DBUN,
    password : process.env.DBPASS,
    database : 'library'
});

module.exports = connection;