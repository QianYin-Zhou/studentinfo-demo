//1.引入模块
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwtKoa = require('koa-jwt');
const cors = require('koa2-cors');   //解决同源跨域问题
const router = require('./routes/index');
const config = require('./config/default');
const secret = require('./config/secret.json');
const err = require('./middleware/error');

//2.实例化对象
var app = new Koa();

//3.使用中间件
app.use(cors());
app.use(err()); 
app.use(bodyParser());
app.use(jwtKoa({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/register/,/^\/api\/getAllClassInfo/]}));

//4.启动路由
app
	.use(router.routes())
	.use(router.allowedMethods());
 
//5.开启端口 
app.listen(config.port,()=> {
	console.log(`server running port on ${config.port}`)
});