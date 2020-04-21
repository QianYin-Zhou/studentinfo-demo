const jwt = require('jsonwebtoken');
const {
	create,
	findAll,
	update,
	findStudentByAccount,
	findStudentByName,
	findStudentBycid,
	findByKeyword
} = require('../models/student.js'); 
const tools = require('../config/tools.js');
const secret = require('../config/secret.json');

class studentController {
	
	/* 
	  使用学号登录
	 */
	static async login(ctx) {
		var data = ctx.request.body;
		var student = await findStudentByAccount(data.account);
		console.log(data)
		if(student) {
			var pswflag = await tools.comparePsw(data.password,student.password);
			if(pswflag) {
				let studentToken = {
					account: student.account,
					name: student.name
				}
				const token = jwt.sign(studentToken, secret.sign, {expiresIn: '1h'})  // 签发token(一个小时)
				ctx.body = {
					code: 1,
					bean: {
						token
					},
					msg: "success!"
				}
			} else {
				ctx.body = {
					code: -1,
					msg: "密码有误"
				}
			}
		}
		else {
			ctx.body = {
				code: -1,
				msg: "该学号不存在"
			}
		}
	}
	/*
	  注册(这里将表单认证放到前端实现)
	 */
  static async register(ctx){
	  var student = ctx.request.body;
		var isexistStudent = await findStudentByAccount(student.account);
		if(!isexistStudent) {
			student.password = await tools.enbcrypt(student.password);
			await create(student);  //新增学生
			var newStudent = await findStudentByAccount(student.account);
			// 签发token
			let studentToken = {
				account: newStudent.account,
				name: newStudent.name
			}
			const token = jwt.sign(studentToken, secret.sign, {expiresIn: '1h'});
			ctx.body = {
				code: 1,
				bean: {
					token
				},
				msg: "注册成功"
			}
		}
		else {
			ctx.body = {
				code: -1,
				msg: "该学号已注册"
			}
		}
  }
	/*
	  获取用户信息
	*/
  static async getStudentInfo(ctx) {
		var Authenticationdata = ctx.student;
		var student = await findStudentByAccount(Authenticationdata.account); 
		if (student) {
			ctx.body = {
				code: 1,
				msg: '获取成功',
				student
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '获取用户信息失败'
			}
		}
	} 
	/*
	  获取同一个班级
	*/
	static async getStudentFromCondition(ctx) {
		var condition = ctx.query;
		let data = []
		if(condition)
		{
			if(condition.mycid) { //同班同学
				data = await findStudentBycid(condition.cid);
				ctx.body = {
					code: 1,
					msg: '数据返回成功',
					list: data
				}
			} else {   //模糊查询
				data = await findByKeyword(condition);
				ctx.body = {
					code: 1,
					msg: '数据返回成功',
					list: data
				}
			}
		}
		else {
			ctx.body = {
				code: -1,
				msg: '请正确查询',
			}
		}
		
	}
	/*
	  获取所有用户信息
	*/
	static async getAllStudentInfo(ctx) {
		var data = await findAll(); 
		if (data) { 
			let studentList = await tools.parseArr(data); 
			ctx.body = {
				code: 1,
				msg: '获取成功',
				studentList
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '获取所有用户信息失败'
			}
		}
	}
	/*
	  更新用户信息
	*/
	static async updateStudentInfo(ctx) {
		var ACCOUNT = ctx.student.account;
		var nowStudent = ctx.request.body;
		if(!nowStudent) {
			ctx.body = {
				code: -1,
				msg: '没有修改任何数据'
			}
			return
		}
		//用户更改密码的话,就再次加密
		if(nowStudent.password) {
			nowStudent.password = await tools.enbcrypt(nowStudent.password);
		}
		let updateFlag = await update(nowStudent, ACCOUNT);
		if(updateFlag) {
			let student = await findStudentByAccount(ACCOUNT);
			ctx.body = {
				code: 1,
				msg: '您的信息修改成功',
				student
			}
		} else {
			ctx.body = {
				code: -1,
				msg: 'hhhh,修改失败'
			}
		}
	}
}
 
 
 module.exports = studentController