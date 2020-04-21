const { 
	findAll,
	findClassName 
} = require('../models/class.js');

class classController {
	//1.通过班号获取班级名称
	static async getClassName(ctx) {
		let cid = ctx.query.cid;
		if (cid) {
			let data = await findClassName(cid);
			ctx.body = {
				code: 1,
				cname: data.name,
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '参数错误'
			}
		}
	}
	
	//2.获取所有课程
	static async getAllClassInfo(ctx) {
		let data = await findAll();
		ctx.body = {
			list:data
		}
	}
	
	//测试接口
	static async console(ctx) {
		ctx.body = {
			msg: "测试接口"
		}
	}
}

module.exports = classController;
