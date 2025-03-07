const express = require('express');
const { getHomepage, getPopularpage, getCategoriespage } = require('../controllers/homeController')
const router = express.Router();


router.get('/', getHomepage)

router.get('/popular', getPopularpage)

router.get('/categories', getCategoriespage)



module.exports = router;