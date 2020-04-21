## 项目说明
> *author:  QianYin_Zhou*
##### 开源网站使用类似技术栈的项目是非常少的，参考了其他人的项目, 我多加了点注释，还有其他的一些功能。
##### 主要技术栈：koa2+msql+jwt+bcryptjs+sequelize+vue+wepack+at-ui
## 项目运行
##### 1. 导入sql文件
##### 2. 进入server目录下
```
cnpm i 
node app.js /nodemon app.js 
```
##### 3. 进入browser目录下
```
cnpm i 
npm run dev
```
## 项目测试
#####  *测试账号：201802004447；测试密码：666 (原始表密码都是666，账号都是12位)
#####  *使用[postwoman](https://postwoman.io/)进行接口测试,我用的是firefox的小插件
#####  *使用mocha测试，它会自动运行根目录下的test(暂时没认真用)
```
npm test(server)
```
## 项目具体
#### 1. 数据表设计
##### #student表
|字段名			|mysql数据类型|sequelize数据类型		|备注				|
|:----:			|:-----------:|:---------------:		|:--:				|
|sid				|int					|DataTypes.INTEGER		|主键				|
|account		|varchar(12)	|DataTypes.STRING(12)	|学号				|
|name				|varchar(9)		|DataTypes.STRING(9)	|姓名				|
|password		|varchar(255)	|DataTypes.STRING(255)|密码				|
|avatar			|varchar(255)	|DataTypes.STRING			|头像				|
|create_time|datetime			|DataTypes.DATE				|注册时间		|
|isVerify		|tinyint(1)		|DataTypes.BOOLEAN		|验证				|
|cid				|char(5)			|DataTypes.STRING(5)	|班级号外键	|

##### #class表
|字段名	|mysql数据类型|sequelize数据类型		| 备注		|
|:----:	|:-----------:|:--------------:			|:--:			|
|cid		|char(5)			|DataTypes.STRING(5)	|主键			|
|name		|varchar(18)	|DataTypes.STRING(18)	|班级名称	|

#### 2. 后台实现(koa2 + msql + jwt + bcryptjs + [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN))
##### 后台主要代码1: 注册接口签发token
```
	 /*
	  注册
	 */
   static async register(ctx){
    var student = ctx.request.body;
   	var isexistStudent = await findStudentByAccount(student.account);
   	if(!isexistStudent) {
   		student.password = await tools.enbcrypt(student.password);  //加密密码
   		await create(student);  //新增学生
   		var newStudent = await findStudentByAccount(student.account);
   		// 签发token
   		let studentToken = {
   			account: newStudent.account,
   			name: newStudent.name
   		}
   		const token = jwt.sign(studentToken, secret.sign, {expiresIn: '1h'}); //1小时后过期
   		ctx.body = {
   			code: 1,
   			bean: {
   				token //将token返回去
   			},
   			msg: "注册成功"
   		}
   	}
   	else {...}
```
##### 后台主要代码2: 自定义error中间件，拦截无token的请求
```
	<!-- middleware/error.js -->
	
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
	    console.log('你错了：', err)
	  }
	}
```
```
	<!-- app.js -->
	
	//除了login，register和getAllClassInfo外，其余接口需要token认证
	//使用中间件
	
	app.use(jwtKoa({secret: secret.sign})
			 .unless({path: [/^\/api\/login/, /^\/api\/register/,/^\/api\/getAllClassInfo/]}));
```
##### 后台主要代码3: 抽离基本配置和常用方法
```
	var tools = { 
	 
	 //1.加密密码
		enbcrypt(password) {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(password, salt);
			return hash;
		}, 
	 //2.对比密码,返回bool(密码都是:666)
		comparePsw(fromUser,fromSql) {
			return bcrypt.compareSync(fromUser, fromSql); 
			// return fromUser === fromSql;  
		},
		//3.判断对象or数组,返回数组
		parseArr(data) {
			let arr = []
			if(Array.isArray(data)) {arr = data} 
			else { arr.push(data)}
			return arr
		}
	}

	module.exports = tools;
```
#### 2. 前端页面(vue + [wepack4.x](https://www.webpackjs.com/) + [at-ui](https://at-ui.github.io/at-ui/#/zh/docs/introduction))
#####  使用的是京东凹凸实验室的组件库，按需配置webpack.config.js，父子组件之间的通信
```
<!-- compoment/studentInfo -->

	methods: {
		getRegisterInfo() {
			if(this.info.account&&this.info.name&&this.info.password&&this.info.cid) {
				return this.info;  // father:返回正确数据给它爸爸(注册)
			} else {....}
		},
		getupdateInfo() {
			let updateInfo = this.info
			for(let key in updateInfo) {
				if(!updateInfo[key])
					delete updateInfo[key];
			}
			return updateInfo;  // father:返回数据给它爸爸(修改信息)
		},
		...
	}
```
#####  前端主要代码：建立路由守卫，给需要token验证的路由(这里是前端路由)添加认证
```

 //1. 创建路由对象和路由规则
 var router = new VueRouter({
 	routes: [
 		{
 			path: '/',
 			component: account, 
 		},
 		{
 			path: '/infolist', 
 			component: infolist,
 			meta: {
 				requireAuth: true //  flag标识此路由需要token验证
 			}
 		}
 	]
 })
 //2. 创建前端全局路由守卫
 router.beforeEach((to, from, next) => {
   if (to.meta.requireAuth) {
     const token = localStorage.getItem('token');  //从localStorage中取出token
     if (token && token !== 'null') {
			// Bearer是JWT的认证头部信息
       Vue.prototype.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;  
       next();
     } else {
 			  next();
     }
   } 
 	else {
     next();  //本实验中"账户"页面不需要token验证
   }
 })
```
## 项目参考
##### [类似demo](https://github.com/yin-fan/todoList) 
##### [廖雪峰的nodejs教程](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040) 
##### [wepack4.x中文教程](https://www.webpackjs.com/)
##### [凹凸实验室at-ui](https://at-ui.github.io/at-ui/#/zh/docs/introduction)
##### [我的渐变背景](https://webgradients.com/)
## 项目自述
##### ：新知识用小项目练练，终于懂为什么java比较适合大项目，sequelize框架处理多表关联是有点麻烦的。	（2020.4.21）