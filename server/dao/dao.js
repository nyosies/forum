let connectSql = require('../connectSql/sql')
   
    //连接数据库
    let connection =connectSql.sql()
function dao(sql, arr=[], callback) {
         connection.query(sql, arr, (err, res) => {
        if (err) {
            return console.error('error in dao ')
        }
        callback(err, res)
    })
}
module.exports = dao