const express = require('express');
const { getHomepage, getPopularpage, getCategoriespage, getCreatepage, postCreateUser, getLoginpage, getRegisterpage } = require('../controllers/homeController')
const router = express.Router();


router.get('/', getHomepage)

router.get('/popular', getPopularpage)

router.get('/categories', getCategoriespage)

router.get('/create', getCreatepage)

router.post('/create-user', postCreateUser)

router.get('/login', getLoginpage)

router.get('/register', getRegisterpage)




module.exports = router;