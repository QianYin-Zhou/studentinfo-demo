const Router = require('koa-router');
const StudentController = require('../controllers/student.js');
const ClassController = require('../controllers/class.js');

let router = new Router({ 
  prefix: '/api'  //给接口加前缀
})

router
  .get('/', ClassController.console)
	.get('/getAllClassInfo', ClassController.getAllClassInfo)
  .post('/login', StudentController.login)
  .post('/register', StudentController.register)
	.get('/student/getStudentInfo', StudentController.getStudentInfo)
	.get('/student/getAllStudentInfo', StudentController.getAllStudentInfo)
	.post('/student/updateStudentInfo', StudentController.updateStudentInfo)
	.get('/student/getStudentFromCondition', StudentController.getStudentFromCondition)
	.get('/student/getClassName', ClassController.getClassName)

module.exports = router;
