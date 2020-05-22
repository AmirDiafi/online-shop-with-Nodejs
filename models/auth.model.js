const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost:27017/onlone-shop"
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const theUser = mongoose.model('user', userSchema)
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.newUser = (username, email, password) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then( () => {
            return theUser.findOne({ email: email })
        }).then(user => {
            if(user) {
                mongoose.disconnect()
                reject('email is already exist')
            } else {
                console.log(password)
                return bcrypt.hash(password, saltRounds)
            }
        }).then(hashedPassword => {
            let user = new theUser({
                username: username,
                email: email,
                password: hashedPassword,
            })
            return user.save()
        }).then( () => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.signin = (email, password) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => theUser.findOne({ email: email }))
        .then(user => {
            if(!user) {
                mongoose.disconnect()
                reject('There is no account match this email!')
            } else {
                bcrypt.compare(password, user.password)
                .then(theSame => {
                    if(!theSame) {
                        mongoose.disconnect()
                        reject('Password is incorrect')
                    } else{
                        mongoose.disconnect()
                        resolve(user._id)
                    }
                })
            }
        }).catch( (err)=> {
            mongoose.disconnect()
            reject(err)

        })
    } )
}