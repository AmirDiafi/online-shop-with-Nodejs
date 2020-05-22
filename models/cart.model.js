const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/onlone-shop'
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})
const Cart = mongoose.model('cart', cartSchema)

exports.AddNewCart = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            let cart = new Cart(data)
            return cart.save()
        }).then( () => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getCartByUserID = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true })
        .then( () => {
            return Cart.find({userId: userId}, {}, {sort: {timestamp: 1}})
        }).then( Carts => {
            mongoose.disconnect()
            resolve(Carts)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editCart = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true })
    }).then( () => {
        return Cart.findByIdAndUpdate(id, newData)
    }).then( newCart => {
        mongoose.disconnect()
        resolve(newCart)
    }).catch(err => {
        mongoose.disconnect()
        reject(err)
        console.log(err)
    })
}

exports.deleteCart = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true })
    }).then( () => {
        return Cart.findByIdAndDelete(id)
    }).then( () => {
        mongoose.disconnect()
        resolve()
    }).catch(err => {
        mongoose.disconnect()
        reject(err)
        console.log(err)
    })
}