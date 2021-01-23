import login from './login/login.js'
import request from '@/request/request.js'
import article from './article/article.js'
import admin from './admin/admin.js'
request.parseRouter('login',login)
request.parseRouter('article',article)
request.parseRouter('admin',admin)
