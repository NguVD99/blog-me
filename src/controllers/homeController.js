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

const getListcategory = async (req, res) => {
    const category = req.params.type;

    const categoryLink = {
        language: 'Ngôn Ngữ',
        trick: 'Thủ Thuật',
        database: 'Data Base'
    };

    const categoryName = categoryLink[category] || '';

    try {
        const [results] = await connection.execute(
            'SELECT * FROM information WHERE linkCategorie = ?',
            [categoryName]
        );
        res.render('categoryList', { listUsers: results });
    } catch (err) {
        console.error('❌ Lỗi truy vấn:', err);
        res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
};

const getCreatepage = (req, res) => {
    res.render('create.ejs')
}

// const postCreateUser = async (req, res) => {
//     // console.log('>>>> req.body ', req.body)

//     let myif = req.body.myinformation
//     let image = req.body.myimage
//     let linkdoc = req.body.mydoc
//     let linkctg = req.body.linkcategory

//     // let { name, email, address, city } = req.body;

//     console.log("nameInformation = ", myif, "image = ", image, "linkDocument", linkdoc, "LinkCategory = ", linkctg)

//     // Cach 1
//     // connection.query(
//     //     `INSERT INTO Users (Name, Email, Address, City)
//     //     VALUES (?, ?, ?, ?);
//     //     `,
//     //     [name, email, address, city],
//     //     function (err, results) {
//     //         console.log(results);
//     //         res.send('Create User')
//     //     }
//     // );


//     // cach 2
//     let [results, fields] = await connection.query(
//         `INSERT INTO information (nameInformation, image, linkDocument, linkCategorie) VALUES (?, ?, ?, ?)`, [myif, image, linkdoc, linkctg]
//     );

//     // res.render('home.ejs');
//     // res.send('Create User');
//     res.redirect('/');

// }

const postCreateUser = async (req, res) => {
    const { myinformation, myimage, mydoc, linkcategory } = req.body;

    // Map ngược từ tên danh mục sang route
    const categoryRouteMap = {
        'Ngôn Ngữ': 'language',
        'Thủ Thuật': 'trick',
        'Data Base': 'database'
    };

    try {
        await connection.query(
            `INSERT INTO information (nameInformation, image, linkDocument, linkCategorie)
             VALUES (?, ?, ?, ?)`,
            [myinformation, myimage, mydoc, linkcategory]
        );

        const redirectRoute = categoryRouteMap[linkcategory] || '';
        res.redirect(`/categories/${redirectRoute}`);
    } catch (err) {
        console.error('❌ Lỗi khi thêm bài học:', err);
        res.status(500).send('Không thể thêm bài học!');
    }
};

const getLoginpage = (req, res) => {
    res.render('login.ejs')
}

const postLoginpage = async (req, res) => {
    const { loginname, password } = req.body
    console.log(req.body)

    try {
        const [login] = await connection.query(
            `SELECT * FROM listUser WHERE loginname = ?`,
            [loginname]
        );

        if (login.length === 0) {
            return res.send("Tài khoản không tồn tại")
        }

        const user = login[0];

        const compare = await bcrypt.compare(password, user.password);

        if (compare) {
            return res.send("Chào mừng bạn đến với trang web")
        } else {
            return res.send("Mật khẩu không chính ")
        }


    } catch (err) {
        console.error(err);
        return res.status(500).send('LỖI MÁY CHỦ KHI ĐĂNG NHẬP');
    }
}


const getRegisterpage = (req, res) => {
    res.render('register.ejs')
}

const postRegisterpage = async (req, res) => {
    // console.log('>>>> req.body ', req.body)

    // const myloginname = req.body.loginname
    // const myfullname = req.body.fullname
    // const myemail = req.body.email
    // const mypassword = req.body.password

    const { loginname, fullname, email, password } = req.body

    console.log(req.body)

    // console.log("loginname = ", myloginname, "fullname = ", myfullname, "email = ", myemail, "password = ", mypassword)

    const checkSql = `SELECT * FROM listUser WHERE email = "${email}"`;

    const [result] = await connection.query(checkSql);
    if (result.length > 0) {
        return res.send('Email đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [data] = await connection.query(
            `INSERT INTO listUser (loginname, fullname, email, password) VALUES (?, ?, ?, ?)`,
            [loginname, fullname, email, hashedPassword]
        );

        if (data.affectedRows > 0) {
            return res.redirect('/');
        } else {
            return res.status(400).send('TẠO TÀI KHOẢN THẤT BẠI');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('LỖI MÁY CHỦ KHI TẠO TÀI KHOẢN');
    }

}





module.exports = {
    getHomepage,
    getPopularpage,
    getCategoriespage,
    getCreatepage,
    postCreateUser,
    getLoginpage,
    getRegisterpage,
    postRegisterpage,
    postLoginpage,
    getListcategory
}