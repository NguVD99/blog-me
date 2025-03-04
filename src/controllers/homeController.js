const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');


const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}


const getABC = (req, res) => {
    //Process data
    //call model
    // let users = [];

    // connection.query(
    //     'SELECT * FROM Users u',
    //     function (err, results, fields) {
    //         users = results;
    //         console.log('>>>Results', results); // results contains rows returned by server
    //         console.log('>>>Fields', fields); // fields contains extra meta data about results, if available

    //         console.log(">> check users: ", users)
    //         res.send(JSON.stringify(users))
    //     }
    // );
    req.send('check abc')
}

const getTest = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    // console.log('>>>> req.body ', req.body)

    let name = req.body.myname
    let email = req.body.email
    let address = req.body.address
    let city = req.body.city

    // let { name, email, address, city } = req.body;

    console.log("Name = ", name, "Email= ", email, "Address= ", address, "City= ", city)
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
        `INSERT INTO Users (Name, Email, Address, City) VALUES (?, ?, ?, ?)`, [name, email, address, city]
    );

    // res.render('home.ejs');
    // res.send('Create User');
    res.redirect('/');

}


const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getEditPage = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user })
}

const postUpdateUser = async (req, res) => {
    // console.log('>>>> req.body ', req.body)

    let name = req.body.myname
    let email = req.body.email
    let address = req.body.address
    let city = req.body.city
    let userId = req.body.userId


    // let { name, email, address, city } = req.body;

    console.log("Name = ", name, "Email= ", email, "Address= ", address, "City= ", city, "UserId= ", userId)

    await updateUserById(name, email, address, city, userId);

    res.redirect('/');

}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    await deleteUserById(id);

    res.redirect('/');
}

module.exports = {
    getHomepage,
    getABC,
    getTest,
    postCreateUser,
    getCreatePage,
    getEditPage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}