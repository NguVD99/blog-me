require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express'); //commonjs
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session'); // ⚡ Thêm session
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');



// console.log(">>> check env:", process.env);
const app = express(); // App expree
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

// Middleware session
app.use(session({
    secret: "your_secret_key", // Thay bằng chuỗi bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt true nếu dùng HTTPS
}));

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config template engine
configViewEngine(app);

// ⚡ Middleware để truyền user vào tất cả các view
app.use((req, res, next) => {
    res.locals.user = req.session?.user || null;
    next();
});

// Khai bao route
app.use('/', webRouter);

// Test connection


// A simple SELECT query
// connection.query(
//     'SELECT * FROM informations u',
//     function (err, results, fields) {
//         console.log('>>>Results', results); // results contains rows returned by server
//         console.log('>>>Fields', fields); // fields contains extra meta data about results, if available
//     }
// );

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})