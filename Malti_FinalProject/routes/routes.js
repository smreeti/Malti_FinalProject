/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
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
    logout,
    printInvoice,
    reports,
    fetchBookStocks,
    fetchBookList,
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

router.get('/manageInventory/:orderStatus', redirectIfAuthenticatedMiddleware, manageInventory);
router.get('/manageInventory', redirectIfAuthenticatedMiddleware, manageInventory);
router.get('/manageOrderItem/:bookOrderID', redirectIfAuthenticatedMiddleware, manageOrderItem);
router.post('/verifyOrder', redirectIfAuthenticatedMiddleware, verifyOrder);

router.get('/printInvoice/:bookOrderID', printInvoice);
router.get('/reports', reports);
router.get('/fetchBookStocks', fetchBookStocks);
router.get('/fetchBookList', fetchBookList);
module.exports = router;