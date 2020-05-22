productsModel = require('./../models/products.model')

exports.getHome = (req, res, next) => {
    let category = req.query.category
    let productsPromise
    let validCategories  = ['clothes', 'phones', 'computers']
    if(category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getProducts()
    productsPromise.then(products => {
        res.render('index', {
            products: products,
            userIsExist: req.session.userId,
            cartErr: req.flash('cartErr')[0]
        })
    })
}