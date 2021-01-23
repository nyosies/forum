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
router.post('/loginIn',options.loginModule.login)

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
 * searchArticle 搜索
 */

router.get('/searchArticle',options.articleModule.searchArticle)

/**
 * categoryList 分类信息列表
 */
router.get('/categoryList',options.articleModule.categoryList)
/**
 * getCategory 分类名
 */
router.get('/getCategory',options.articleModule.getCategory)


/**
 * admin
 */
router.get('/getUser',options.adminModule.getUser)

router.get('/deleteUser',options.adminModule.deleteUser)


router.get('/userPagination',options.adminModule.userPagination)

/**
 * 删除文章
 */

router.get('/deleteArticle',options.adminModule.deleteArticle)

/**
 * 文件上传 
 * */

router.post('/uploadImg',options.adminModule.uploadImg)
/**
 * 文章发布
 */
router.get('/publishArticle',options.adminModule.publishArticle)

module.exports = router