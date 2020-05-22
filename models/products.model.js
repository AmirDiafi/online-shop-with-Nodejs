const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost:27017/onlone-shop"
const schemaProduct = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description :String,
    category: String
})
const products = mongoose.model('product', schemaProduct)

exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then( () => {
            return products.find({})
        }).then( products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then( () => {
            return products.find({category: category})
        }).then( products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getProductByID = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then( () => {
            return products.findById(id)
        }).then( products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getToProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then( () => {
            return products.findOne({})
        }).then( products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

