const mysql = require('mysql');

//MySQL details
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'ezinne',
    password: '123456789',
    database: 'mysqlnotes',
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err));
});

module.exports = mysqlConnection;