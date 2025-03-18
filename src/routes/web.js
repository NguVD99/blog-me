const express = require('express');
const { getHomepage,
        getPopularpage,
        getCategoriespage,
        getCreatepage,
        postCreateUser,
        getLoginpage,
        getRegisterpage,
        postRegisterpage,
        postLoginpage,
        getListcategory,
        getPostDetail,
        getDetail
    } = require('../controllers/homeController')
const router = express.Router();


router.get('/', getHomepage)

router.get('/popular', getPopularpage)

router.get('/categories', getCategoriespage)

router.get('/categories/:type', getListcategory)

router.get('/create', getCreatepage)

router.post('/create-user', postCreateUser)

router.get('/login', getLoginpage)

router.post('/login-user', postLoginpage)

router.get('/register', getRegisterpage)

router.post('/register-user', postRegisterpage)

router.get('/post', getDetail);


router.get('/post/:id', getPostDetail);




module.exports = router;