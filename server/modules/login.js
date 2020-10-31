const dao = require('../dao/dao')

// 返回格式
function succesFormat(data,msg,status=200){
    let _obj={
        status:status,
        msg:msg,
        data:data
    }    
    return _obj
}
// function errrorFormat(data,msg){
//     let _obj={
//         status:2,
//         msg:msg,
//         data:data
//     }    
//     return _obj
// }


module.exports = {
    //登录
    login(req, result) {
        let sql = 'select * from user'
        dao(sql, [], (err, res) => {
             if(res){
                let params =  succesFormat(res,'获取成功')
                result.json(params)
             }else{
                let params =  succesFormat(res,'获取失败',400)
                result.json(params)
             }
        })
    },
    //注册
    register(req,result){
        let sql ='INSERT INTO  user (user_name,psw ) VALUES (?,?)'
        let ParaArr = Object.values(req.query)
        dao(sql, ParaArr, (err, res) => {
            if(res){
                let params =  succesFormat([],'注册成功')
                result.json(params)
             }else{
                let params =  succesFormat([],'注册失败',400)
                result.json(params)
             }
        })

    },
    //查询用户
    
    user(req,result){
        let sql ='select * from  user  where id =?'
        let ParaArr = Object.values(req.query)
        console.log(req.query)
        dao(sql, ParaArr, (err, res) => {
            if(res){
                let params =  succesFormat(res,'查询成功')
                result.json(params)
             }else{
                let params =  succesFormat(res,'查询失败',400)
                result.json(params)
             }
        })
    }
    

}