/**
 * Admin ES6类
 */
const exec = require('../../dao/dao')
const multiparty = require('multiparty')
let fun = require('../../fun/fun')
const date = require("silly-datetime");


module.exports = {
  /**
   * 获取用户
   */
  async getUser(req, result) {
    let data;
    const sql = 'SELECT COUNT(*) as count FROM admin'
    let temp = await exec(sql)
    if (temp.length > 0) {
      // temp.map(item => item.create_at = fun.formatTimer(item.create_at))
      data = fun.succesFormat(temp, '获取全部数据')
    } else {
      data = fun.succesFormat([], '获取数据失败', 400)
    }
    result.json(data)
  },
  /**
   * 删除用户
   * @param {*} req 
   * @param {*} result 
   */
  async deleteUser(req, result) {
    let data, params, temp;
    const sql = 'delete from admin where uid=?'
    params = Object.values(req.query)
    if (params.length !== 1 || params[0] == '' || !params[0]) {
      data = fun.succesFormat([], '参数错误', 401)
      result.json(data)
      return;
    }
    console.log(params.length)
    temp = await exec(sql, params)
    if (temp.affectedRows > 0) {
      data = fun.succesFormat(temp, '删除用户成功')
    } else {
      data = fun.succesFormat(temp, '删除用户失败', 400)
    }
    result.json(data)
  },
  /**
   * Pagination 分页
   * pageNo 第几页
   * pageSize 一页个数
   * @param {*} req 
   * @param {*} result 
   */
  async userPagination(req, result) {
    let data, paraArr = {}, temp;
    let sql = 'select uid,account,role,create_at  from admin limit ?,?'
    let { query: params } = req
    paraArr.pageNo = (params.pageNo - 1) * params.pageSize
    paraArr.pageSize = params.pageSize * 1
    // console.log('分页数据', paraArr)

    //   返回查询数据
    temp = await exec(sql, Object.values(paraArr))
    if (temp) {
      temp.map(item => item.create_at = fun.formatTimer(item.create_at))
      data = fun.succesFormat(temp, '获取分页成功')
    } else {
      data = fun.succesFormat([], '获取分页失败', 400)
    }
    result.json(data)

  },

  /**
  * 删除文章 deleteArticle
  * @param {*} req 
  * @param {*} result 
  */
  async deleteArticle(req, result) {
    let data, params, temp;
    const sql = 'delete from article where articleID=?'
    params = Object.values(req.query)
    if (params.length !== 1 || params[0] == '' || !params[0]) {
      data = fun.succesFormat([], '参数错误', 401)
      result.json(data)
      return;
    }
    console.log(params.length)
    temp = await exec(sql, params)
    if (temp.affectedRows > 0) {
      data = fun.succesFormat(temp, '删除文章成功')
    } else {
      data = fun.succesFormat(temp, '删除文章失败', 400)
    }
    result.json(data)
  },
  /**
   * 图片上传
   * @param {*} req 
   * @param {*} result 
   */
  uploadImg(req, result) {
    var form = new multiparty.Form();
    let data, temp = {};
    //图片上传位置
    form.uploadDir = 'upload'
    form.parse(req, function (err, fields, files) {
      // console.log(fields);  //获取表单的数据
      // console.log(files);  //图片上传成功返回的信息
      temp.path = files.file[0].path
      data = fun.succesFormat(temp, '上传成功')
      result.json(data)
    });
  },
  /**
   * 发布文章
   * @param {*} req  请求
   * @param {*} result 响应
   * 
   */
  async publishArticle(req, result) {
    let { query: params } = req ,data
    //参数判断
    let paramsKey=['uid','author','title','content','category_id','pic']
    for (const key in params) {
       if(!paramsKey.includes(key)){
          data = fun.succesFormat([],'参数名存在错误')
          result.json(data)
          return false;
       }
       if(!params[key] || params==''){
         data = fun.succesFormat([],'参数不完整,请确定上传内容')
         result.json(data)
        return false;
       }
    }

    //获取当前时间进行存储
    let timer = date.format(new Date(), 'YYYY-MM-DD');
    console.log(params)
    params.pic=params.pic.replace('\\','/')
    const sql = `insert into article (uid,author,title,content,category_id,create_at,pic) values (${params.uid},'${params.author}','${params.title}','${params.content}',${params.category_id},'${timer}','${params.pic}')`
    console.log(sql)
    //执行数据库
   let row = await exec(sql)
   if (row.affectedRows > 0) {
    data = fun.succesFormat([],'文章发布成功')
   }else{
   data =fun.succesFormat([],'文章发布失败')
   }
    result.json(data)
  }
}