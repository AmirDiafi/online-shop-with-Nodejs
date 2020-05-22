const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const check = require('express-validator').check
const authProtect = require('../protect-routes/auth.protect')

router.get('/signup', authProtect.isNotAuth, authController.getSignup)

router.post(
    '/signup',
    bodyParser.urlencoded({extended: true}),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format'),
    check('password').not().isEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 charachters'),
    check('confirmPassword').custom((ConfirmPassVal, {req}) => {
        if(ConfirmPassVal === req.body.password) return true
        else throw 'The passwords are not the same, please confirm your password.'
    }).not().isEmpty().withMessage('Your password must be confirmed'),
    authProtect.isNotAuth,
    authController.postSignup)

router.get('/signin', authProtect.isNotAuth, authController.getSignin)

router.post(
    '/signin',
    bodyParser.urlencoded({extended: true}),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('password').not().isEmpty().withMessage('Password is required')
    .isLength({min: 6}).withMessage('Password must be at least 6 charachters'),
    authProtect.isNotAuth,
    authController.postSignin)

router.all('/logout',authProtect.isAuth, authController.logout)

module.exports = router