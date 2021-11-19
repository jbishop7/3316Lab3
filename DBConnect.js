const mysql = require('mysql');

function newConn(){
    var conn = mysql.createConnection({
        host: '35.226.215.177',
        user: 'root',
        password: '1qaz!QAZ',
        database: 'lab3DB'
    });
    return conn;
}
module.exports = newConn;