const express = require('express')
const router = express.Router()

let options = require('../modules')

router.use((req, res, next) => {
    // console.log('路由拦截')
    next()
})

router.get('/', (req, res) => {
    res.send('hello world111')
})
router.get('/loginIn', (req, res) => options.loginModule.login(req, res))

router.post('/register', (req, res) => options.loginModule.register(req, res))

router.post('/user', (req, res) => options.loginModule.user(req, res))

module.exports = router