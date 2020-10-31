import serve from './serve.js'
import { _ } from 'core-js'

const qs = require('qs')


function Myserve() {
    this.serve = serve
    this.nowhand = null
}

Myserve.prototype.commpontThis = function (v) {
    // 绑定组件的this
    this.nowhand = v
    return this
}

Myserve.prototype.parseRouter = function (name, modelUrl) {

    let _obj = this[name] = {}
    Object.keys(modelUrl).forEach(item => {
        //request.login.login()
        _obj[item] = this.sendMessage.bind(this, item, name, modelUrl[item])
        _obj[item].state = 'ready'
        // console.dir(_obj[item])

    })
}
Myserve.prototype.sendMessage = function (name, modelName, url, config = {}) {
    console.log(config)
    let method = config.method || 'get'
    let data = config.data || {}
    let bindName = config.bindName || name
    let self = this
    // 请求数据处理前
    let beforeRequest = function (res) {

    }
    //  请求数据默认处理
    let defaultRequest = function (res) {
        console.log(self.nowhand)
        self.nowhand[bindName] = res
    }
    //成功的回调
    let success = config.success || defaultRequest
    let callback = function (res) {
        success(res)
    }
    //错误的回调
    let error = config.error || undefined

    let errorCallback = function (err) {
        if (config.error) {
            error('error=>', err)
        }
    }
    //参数序列化
    let qsURL = data ? url + '?' + qs.stringify(data) : url
    console.log(qsURL)
    //请求方式
    let state = {}
    let methodArr = ['get', 'post', 'put', 'del']
    methodArr.forEach(item => {
        state[item] = function () {
            self.serve[item](qsURL).then(res => {
                beforeRequest(res.data)
                callback(res.data)
            }).then(errorCallback)
        }
    })
    if (self[modelName][name].state == 'ready') {
        self.state = 'pending'
        state[method]()
    }
}

// let myserve = new Myserve()
export default new Myserve;