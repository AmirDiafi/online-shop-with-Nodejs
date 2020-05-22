const express = require('express')
const path = require('path')
const app = express()
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const authRouter = require('./routes/auth.route')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const theStore = new SessionStore({
    uri: "mongodb://localhost:27017/onlone-shop",
    collection: "session"
})
const flash = require('connect-flash')
app.use(flash())

app.use(express.static(path.join(__dirname, 'assests')))
app.use(express.static(path.join(__dirname, 'images')))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(session({
    secret: "this amir's secret it is very important than you thisnk.. and it is not very important at the same at you..",
    saveUninitialized: false,
    store: theStore
}))
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

app.listen(8080, () => {
    console.log('server listen at port 8080')
})