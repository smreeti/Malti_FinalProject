const express = require('express');
const router = express.Router();

const {
    dashboard,
    login,
    loginEmployee,
    addInventory,
    addOrder,
    confirmOrder
} = require('../controllers/controllers.js');

//API end points and their corresponding ejs pages to navigate
router.get('/', dashboard);
router.get('/login', login);
router.post('/loginEmployee', loginEmployee);

// router.get('/logout', logout);

router.get('/addInventory', addInventory);
router.post('/addOrder', addOrder);
router.post('/confirmOrder', confirmOrder);

module.exports = router;