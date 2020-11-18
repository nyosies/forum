const exec = require('../../dao/dao')
let bcrypt = require('../../fun/bcrypt/index')
let fun = require('../../fun/fun')


module.exports = {
    /**
     * getArticle 获取文章
     * @param {*} req 
     * @param {*} res 
     */
    getArticle(req, result) {
        let data, paraArr, count = 0, params = [];
        let sql = 'select * from article where articleID=?'
        paraArr = Object.values(req.query)
        exec(sql, paraArr).then(res => {
            // 浏览次数
            count = res[0].look_at || 0;
            // console.log('count', ++count)
            params.unshift(count)
            params = [...params, ...paraArr]
            if (res.length > 0) {
                // console.log(params)
                exec('update article set look_at =? where articleID=?', params, (err, res) => { })
                data = fun.succesFormat(res, '获取成功')
                result.json(data)
            } else {
                data = fun.succesFormat(res, '参数错误', 400)
                result.json(data)
            }
        })
    },
    /**
     * Pagination 分页
     * pageNo 第几页
     * pageSize 一页个数
     * @param {*} req 
     * @param {*} result 
     */
    async pagination(req, result) {
        let data, paraArr = {}, temp;
        let sql = 'select * from article limit ?,?'
        let { query: params } = req
        paraArr.pageNo = (params.pageNo - 1) * params.pageSize
        paraArr.pageSize = params.pageSize * 1
        // console.log('分页数据', paraArr)

        //   返回查询数据
        temp = await exec(sql, Object.values(paraArr))
        if (temp) {
            temp.map(item=>item.create_at = fun.formatTimer(item.create_at))
            data = fun.succesFormat(temp, '获取分页成功')
        } else {
            data = fun.succesFormat([], '获取分页失败', 400)
        }
        result.json(data)

    },
    /**
     * 全都文章
     * @param {*} req 
     * @param {*} result 
     */
    allArticle(req, result) {
        let sql = 'select * from article'
        exec(sql).then(res => {
            if (res.length > 0) {
                data = fun.succesFormat(res.length, '获取全部数据')
                result.json(data)
            } else {
                data = fun.succesFormat(res, '获取数据失败', 400)
                result.json(data)
            }
        })
    },
    /**
     * searchArticle 搜索
     * @param {*} req 
     * @param {*} result 
     */
    searchArticle(req, result) {
        let data, paraArr;
        console.log(req.query.context == '')
        console.log(req.query.context == false)
        if (req.query.context == '') {
            result.json({ msg: '搜索无参数' })
            return
        }
        // let params = req.query
        // let arr = Object.values(params)
        paraArr = ["%" + req.query.context + "%"];
        let sql = 'select * from article where content like ? order by articleID desc';
        exec(sql, paraArr).then(res => {
            if (res.length > 0) {
                data = fun.succesFormat(res, '获取全部数据')
            } else {
                data = fun.succesFormat(res, '获取数据失败', 400)
            }
            result.json(data)
        })
    }
}