const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const connection = require('../config/database');
const { getAllUsers } = require('../services/CRUDService');




const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}

const getPopularpage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('popular.ejs', { listUsers: results });
}

const getCategoriespage = (req, res) => {
    res.render('categories.ejs')
}

const getCreatepage = (req, res) => {
    res.render('create.ejs')
}

const postCreateUser = async (req, res) => {
    // console.log('>>>> req.body ', req.body)

    let myif = req.body.myinformation
    let image = req.body.myimage
    let linkdoc = req.body.mydoc

    // let { name, email, address, city } = req.body;

    console.log("nameInformation = ", myif, "image = ", image, "linkDocument", linkdoc)

    // Cach 1
    // connection.query(
    //     `INSERT INTO Users (Name, Email, Address, City)
    //     VALUES (?, ?, ?, ?);
    //     `,
    //     [name, email, address, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('Create User')
    //     }
    // );


    // cach 2
    let [results, fields] = await connection.query(
        `INSERT INTO information (nameInformation, image, linkDocument) VALUES (?, ?, ?)`, [myif, image, linkdoc]
    );

    // res.render('home.ejs');
    // res.send('Create User');
    res.redirect('/');

}

const getLoginpage = (req, res) => {
    res.render('login.ejs')
}


const getRegisterpage = (req, res) => {
    res.render('register.ejs')
}

const postRegisterpage = async (req, res) => {
    // console.log('>>>> req.body ', req.body)

    const myloginname = req.body.loginname
    const myfullname = req.body.fullname
    const myemail = req.body.email
    const mypassword = req.body.password

    // let { name, email, address, city } = req.body;

    console.log("loginname = ", myloginname, "fullname = ", myfullname, "email = ", myemail, "password = ", mypassword)

    connection.query('SELECT * FROM listUser WHERE email = ?', [myemail], async (err, results) => {
        if (err) return res.status(500).send('Lỗi khi kiểm tra email');

        if (results.length > 0) {
            return res.status(400).send('Email đã tồn tại');
        }

        try {
            const hashedPassword = await bcrypt.hash(mypassword, 10);

            connection.query(
                'INSERT INTO llistUser (loginname, fullname, email, password) VALUES (?, ?, ?, ?)',
                [myloginname, myfullname, myemail, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).send('Lỗi khi tạo tài khoản');
                    res.status(201).send('Đăng ký thành công!');
                }
            );
        } catch (error) {
            res.status(500).send('Lỗi server trong quá trình mã hóa');
        }
    });


    // // cach 2
    // let [results, fields] = await connection.query(
    //     `INSERT INTO listUser (loginname, fullname, email, password) VALUES (?, ?, ?, ?)`, [myloginname, myfullname, myemail, mypassword]
    // );

    // // res.render('home.ejs');
    // // res.send('Create User');
    // res.redirect('/');

    // connection.query('SELECT * FROM listUser WHERE email = ?', [myemail], async (err, results) => {
    //     if (err) return res.status(500).send(err);

    //     if (results.length > 0) {
    //         return res.status(400).send('Email đã tồn tại');
    //     }

    // })

    // const hashedPassword = await bcrypt.hash(mypassword, 10);

    // let [results, fields] = await connection.query(
    //     `INSERT INTO listUser (loginname, fullname, email, password) VALUES (?, ?, ?, ?)`, [myloginname, myfullname, myemail, hashedPassword]
    // );

    // // res.render('home.ejs');
    // // res.send('Create User');
    // res.redirect('/');


}



module.exports = {
    getHomepage,
    getPopularpage,
    getCategoriespage,
    getCreatepage,
    postCreateUser,
    getLoginpage,
    getRegisterpage,
    postRegisterpage
}