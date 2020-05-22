const productModel = require('../models/products.model')

exports.getProductById = (req, res, next) => {
    let id = req.params.id
    productModel.getProductByID(id).then(products => {
        res.render('product', {
            product: products,
            userIsExist: req.session.userId,
            cartErr: req.flash('cartErr')[0]
        })
    })
}

exports.getFirstProductToProductRoute = (req, res, next) => {
    productModel.getToProduct().then(products => {
        res.render('product', {
            product: products,
            userIsExist: req.session.userId,
            cartErr: req.flash('cartErr')[0]
        })
    })
}