const connection = require('../config/database');
const { } = require('../services/CRUDService');




const getHomepage = (req, res) => {
    res.render('layout.ejs')
}


module.exports = {
    getHomepage
}