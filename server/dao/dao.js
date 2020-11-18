let connectSql = require('../connectSql/sql')

//连接数据库
let connection = connectSql.sql()
function exec(sql, paramsArr = []) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, paramsArr, (err, res) => {
            if (err) {
                reject(err)
                return console.error('Error in Dao, please check whether it is SQL error ?')
            }
            resolve(res)
        })
    })
    return promise
}

module.exports = exec