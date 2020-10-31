
const mysql = require('mysql')

module.exports={
       sql(config={}){      
        const connection = mysql.createConnection({
            host:config.url||'localhost',
            user:config.user||'root',
            password:config.password||'root',
            database:config.database||'koabooks',
            multipleStatements:true
        })
        connection.connect(() =>{
            console.log('连接成功')
        })
        return connection
       }
}