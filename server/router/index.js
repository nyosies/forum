const express = require('express')
const router = express.Router()

let bcrypt = require('../fun/bcrypt/index')
let options = require('../modules')

router.use((req, res, next) => {
    next()
})
/**
 * 路由拦截
 * 
 */
router.get('/loginIn',options.loginModule.login)

router.post('/register',options.loginModule.register)

router.post('/user',  options.loginModule.user)

/**
 * 获取文章
 */
router.get('/getArticle', options.articleModule.getArticle)
/**
 * 分页
 */
router.get('/pagination', options.articleModule.pagination)

router.get('/allArticle',options.articleModule.allArticle)
/**
 * searchArticle 分类
 */

router.get('/searchArticle',options.articleModule.searchArticle)
module.exports = router