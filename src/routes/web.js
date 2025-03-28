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
    getDetail,
    getSearchPage,
    postDeleteInformation,
    getTrashPage,
    postRestoreInformation,
    postForceDeleteInformation,
    getEditPage,
    postUpdateInformation,
    getLogoutpage

} = require('../controllers/homeController')
const router = express.Router();

router.get('/', getHomepage);

router.get('/popular', getPopularpage);

router.get('/categories', getCategoriespage);

router.get('/categories/:type', getListcategory);

router.get('/create', getCreatepage);

router.post('/create-user', postCreateUser);

router.get('/login', getLoginpage);

router.post('/login-user', postLoginpage);

router.get('/register', getRegisterpage);

router.post('/register-user', postRegisterpage);

router.get("/logout", getLogoutpage);

router.get('/post', getDetail);

router.get('/post/:id', getPostDetail);

router.get('/search', getSearchPage);

router.post('/delete/:id', postDeleteInformation);

router.get('/trash', getTrashPage);

router.post('/restore/:id', postRestoreInformation);

router.post('/force-delete/:id', postForceDeleteInformation);

router.get('/edit/:id', getEditPage);

router.post('/update/:id', postUpdateInformation);
// router.post('/delete', postHandleRemovePage)


module.exports = router;