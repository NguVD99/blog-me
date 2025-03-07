const connection = require('../config/database');
const { } = require('../services/CRUDService');




const getHomepage = (req, res) => {
    res.render('home.ejs')
}

const getPopularpage = (req, res) => {
    res.render('popular.ejs')
}

const getCategoriespage = (req, res) => {
    res.render('categories.ejs')
}

module.exports = {
    getHomepage,
    getPopularpage,
    getCategoriespage
}