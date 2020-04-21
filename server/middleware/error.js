const jwt = require('jsonwebtoken');
const util = require('util');
const secret = require('../config/secret.json');
var verify = util.promisify(jwt.verify);

/* 
	判断token是否可用
	: account+name
 */
module.exports = function () {
  return async function (ctx, next) {
		console.log("除登录,注册:其余接口需要进行token认证")
    try {
      const token = ctx.header.authorization  // 获取jwt
      if(token) {
        let payload
        try {
          payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
          ctx.student = {
            account: payload.account,
            name: payload.name
          }
        } catch (err) {
          console.log('token verify fail: ', err)
        }
      }
      console.log(`token: ${token}`)
      await next()
    } 
		catch (err) {
      if (err.status === 401) {
        ctx.body = {
          code: -1,
          message: '没有token,认证失败'
        }
      } else {
        err.status = 404
        ctx.body = '404'
        console.log('不服就是怼：', err)
      }
    }
  }
}
