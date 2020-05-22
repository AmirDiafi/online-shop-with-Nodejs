const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
    let authErr = req.flash('authErr')[0]
    let validErrs = req.flash('validErrs')
    res.render('signup', {
        authErr: authErr,
        validErrs: validErrs,
        userIsExist: false
    })
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel.newUser(
            req.body.username,
            req.body.email,
            req.body.password)
        .then( () => res.redirect('/signin'))
        .catch(err => {
        req.flash('authErr', err)
        res.redirect('/signup')
        })
    } else {
        req.flash('validErrs', validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getSignin = (req, res, next) => {
    let authErr = req.flash('authErr')[0]
    let validErrs = req.flash('validErrs')
    res.render('signin', {
        authErr: authErr,
        validErrs: validErrs,
        userIsExist: false
    })
}

exports.postSignin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel.signin(req.body.email, req.body.password)
        .then( (id) => {
            req.session.userId = id
            res.redirect('/')
        })
        .catch(err => {
            req.flash('authErr', err)
            res.redirect('/signin')
        })
    } else {
        req.flash('validErrs', validationResult(req).array())
        res.redirect('/signin')
    }
}

exports.logout = (req, res, next) =>{
    req.session.destroy( () => {
        res.redirect('/')
    })
}
