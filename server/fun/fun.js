const jwt = require('jsonwebtoken')
const fs = require('fs')
module.exports = {
    /**
     * @setToken 设置token
     * @param {*} payload 
     * @param {*} secret 
     */
    setToken(payload, secret) {
        let token;
        token = jwt.sign(payload, secret)
        return token
    },
    /**
     *  @decryptToken 解密token
     * @param {*} token 
     * @param {*} secret 
     */
    decryptToken(token, secret) {
        let _payload = jwt.verify(token, secret)
        return _payload
    },

    // 返回格式
    succesFormat(data, msg, status = 200) {
        let _obj = {
            status: status,
            msg: msg,
            data: data
        }
        return _obj
    },
    
    /**
     * getRandomInt 随机数生成
     * @param {*} min 
     * @param {*} max 
     */
    getRandomInt(min,max){
        return Math.ceil(Math.random()*(max-min))+min
    },
    /**
     * formatTimer 格式化时间
     * @param {*} date 
     */
    formatTimer(date) {
        console.log(date)
        var json_date = new Date(date).toJSON();
        // console.log(json_date.split('T')[0])
        // new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        return json_date.toUpperCase().split('T')[0]
    }

}