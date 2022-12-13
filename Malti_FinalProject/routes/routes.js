const express = require('express');
const router = express.Router();

const {
    dashboard,
    login,
    loginEmployee,
    addInventory,
    addOrder,
    confirmOrder,
    manageInventory,
    manageOrderItem,
    verifyOrder,
    signUp,
    signUpUser,
    logout
} = require('../controllers/controllers.js');
const redirectIfAuthenticatedMiddleware = require('../middlewares/redirectIfAuthenticatedMiddleware.js');

//API end points and their corresponding ejs pages to navigate
router.get('/', dashboard);
router.get('/login', login);
router.post('/loginEmployee', loginEmployee);

router.get('/signUp', signUp);
router.post('/signUpUser', signUpUser);

router.get('/logout', logout);

router.get('/addInventory', redirectIfAuthenticatedMiddleware, addInventory);
router.post('/addOrder', redirectIfAuthenticatedMiddleware, addOrder);
router.post('/confirmOrder', redirectIfAuthenticatedMiddleware, confirmOrder);

router.get('/manageInventory', redirectIfAuthenticatedMiddleware, manageInventory);
router.get('/manageOrderItem/:bookOrderID', redirectIfAuthenticatedMiddleware, manageOrderItem);
router.post('/verifyOrder', redirectIfAuthenticatedMiddleware, verifyOrder);

module.exports = router;