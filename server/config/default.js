 // default.js
 // 设置server的基本配置
 
const config = {
	 
     //1.配置启动端口号
    port: 4000,
   
     //2. 数据库配置
    database: {
			HOST: 'localhost',
			PORT: '3306',		/* 本机mysql5.0版本的端口 */
			USERNAME: 'root',
			PASSWORD: '123456',
			DATABASE: 'demo01' //使用的数据库
    }
}
 
 module.exports = config;