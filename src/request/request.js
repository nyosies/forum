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
    console.log(this)
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
    // console.log(config)
    let method = config.method || 'get'
    let data = config.data || {}
    let bindName = config.bindName || name
    let self = this
    // 请求数据处理前
    let beforeRequest = function (res) {

    }
    //  请求数据默认处理
    let defaultRequest = function (res) {
        // console.log(self.nowhand)
        if (res.data) {
            self.nowhand[bindName] = res.data
        } else {
            console.log('数据为空')
        }
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
    /***
     * 具有一定弊端，post参数拼接
     */
    let qsURL;
    qsURL = Object.keys(data).length > 0 ? url + '?' + qs.stringify(data) : url

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