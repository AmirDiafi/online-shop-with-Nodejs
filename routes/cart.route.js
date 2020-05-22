const router = require('express').Router()
const bodyParser = require('body-parser')
const cartController = require('../controllers/cart.controller')
const cartProtect = require('../protect-routes/auth.protect')
const check = require('express-validator').check

router.get('',
    cartProtect.isAuth,
    cartController.getCart)

router.post('/', cartProtect.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('The amount is required.. please fill it.')
        .isInt({min: 1})
        .withMessage('The amount must be at least 1'),
    cartController.postCart)

router.post('/save', cartProtect.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('The amount is required.. please fill it.')
        .isInt({min: 1})
        .withMessage('The amount must be at least 1'),
    cartController.saveEdit)

router.post('/delete', cartProtect.isAuth,
    bodyParser.urlencoded({extended: true}),
    cartController.deleteCart)

module.exports = router