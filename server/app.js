const express = require('express')

const bodyParser = require('body-parser');
let router =require('./router')
let app = express();


// 设置跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.use(router)

app.listen(3000,()=>{
    console.log('start server in port 3000')
})