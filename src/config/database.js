require('dotenv').config();
const mysql = require('mysql2/promise');

// Create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST, //'89.233.105.193',
//     port: process.env.DB_PORT, //3306,
//     user: process.env.DB_USER, //'db_ngu_dev',
//     password: process.env.DB_PASSWORD, //'123123123Aa',
//     database: process.env.DB_NAME, //'db_ngu_dev',
// });


const connection = mysql.createPool({
    host: process.env.DB_HOST, //'89.233.105.193',
    port: process.env.DB_PORT, //3306,
    user: process.env.DB_USER, //'db_ngu_dev',
    password: process.env.DB_PASSWORD, //'123123123Aa',
    database: process.env.DB_NAME, //'db_ngu_dev',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = connection;