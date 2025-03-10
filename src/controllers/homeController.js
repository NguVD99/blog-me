const connection = require('../config/database');
const { getAllUsers } = require('../services/CRUDService');




const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}

const getPopularpage = (req, res) => {
    res.render('popular.ejs')
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

    // let { name, email, address, city } = req.body;

    console.log("nameInformation = ", myif, "image = ", image)

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
        `INSERT INTO information (nameInformation, image) VALUES (?, ?)`, [myif, image]
    );

    // res.render('home.ejs');
    // res.send('Create User');
    res.redirect('/');

}

const getLoginpage = (req, res) => {
    res.render('login.ejs')
}


module.exports = {
    getHomepage,
    getPopularpage,
    getCategoriespage,
    getCreatepage,
    postCreateUser,
    getLoginpage,
}