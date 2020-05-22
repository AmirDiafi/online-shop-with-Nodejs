const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult

exports.getCart = (req, res, next) => {
    let userId = req.session.userId
    let cartEditErr = req.flash('cartEditErr')[0]
    cartModel.getCartByUserID(userId).then(Carts => {
        res.render('cart', {
            Carts: Carts,
            userIsExist: true,
            cartEditErr: cartEditErr
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        cartModel.AddNewCart({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then( () => {
            res.redirect('/cart')
        }).catch( (err) => {
            console.log(err)
        })
    } else {
        req.flash('cartErr', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.saveEdit = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        cartModel.editCart(
            req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()})
        .then( () => {
            res.redirect('/cart')
        }).catch(err => console.log(err))
    } else {
        req.flash('cartEditErr', validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.deleteCart = (req, res, next) => {
    cartModel
    .deleteCart(req.body.cartId)
    .then( () => res.redirect('/cart'))
    .catch(err => console.log(err))
}