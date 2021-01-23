const exec = require('../../dao/dao')
let bcrypt = require('../../fun/bcrypt/index')
let fun = require('../../fun/fun')
const date = require("silly-datetime");
// const 

/**
 * 原本没写好，现在不想改了
 */

class Common{
    //管理员登录
    login(req, result) {
        let sql = 'select * from admin where account=? and password=?'  
       let userInfo=  JSON.parse(Object.keys(req.body))
    //    console.log(userInfo)
       let psw = userInfo.password
        // 加密
        userInfo.password = bcrypt.encryption(psw, 'psw')
        let ParaArr = Object.values(userInfo)
        exec(sql, ParaArr).then(res => {
            let params;
            if (res.length > 0 && res) {
                let _obj ={},payload={name:'name'}
                res.forEach(ele => {
                    _obj = ele
                });
                for (const key in _obj) {
                   payload[key]=_obj[key]
                }
                // console.log(111,_obj)
                //删除密码
                delete _obj.password
                 _obj.token=fun.setToken(payload,'这是啥')
                
              params =fun.succesFormat(_obj, '登录成功')
            } else {
             params =fun.succesFormat(res, '账号或密码错误', 400)
                
            }
            result.json(params)
        })
    }
    //管理员注册
    register(req, result) {
        let sql = 'INSERT INTO  admin (account,password,create_at,role) VALUES (?,?,?,?)'
        let userInfo=  JSON.parse(Object.keys(req.body))
        let psw = userInfo.password
        console.log(userInfo)
        userInfo.password = bcrypt.encryption(psw, 'psw')
        let ParaArr = Object.values(userInfo)
        //时间
        const today = date.format(new Date(),'YYYY-MM-DD'); 
        ParaArr.push(today)
        ParaArr.push('user')
        console.log(ParaArr)
        exec(sql, ParaArr).then(res => {
            // console.log(sql)
            if (res) {
                let params =fun.succesFormat([], '注册成功')
                result.json(params)
            } else {
                let params =fun.succesFormat([], '注册失败', 400)
                result.json(params)
            }
        })

    }
    //查询用户

    user(req, result) {
        let sql = 'select * from  user  where id =?'
        let ParaArr = Object.values(req.query)
        console.log(req.query)
        exec(sql, ParaArr).then(res => {
            if (res) {
                let params = succesFormat(res, '查询成功')
                result.json(params)
            } else {
                let params = succesFormat(res, '查询失败', 400)
                result.json(params)
            }
        })
    }

}

    module.exports = new Common()