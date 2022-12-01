const express = require('express');
const router = express.Router();
const {
    dashboard,
    login,
    loginCustomer
} = require('../controllers/controllers.js');

//API end points and their corresponding ejs pages to navigate
router.get('/', dashboard);
router.get('/login', login);
router.post('/loginUser', loginCustomer);

// router.get('/logout', logout);

module.exports = router;