const homeController = require('./../controllers/home.controller')
const router = require('express').Router()

router.get('/', homeController.getHome)

module.exports = router