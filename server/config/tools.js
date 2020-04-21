const bcrypt = require('bcryptjs');

// tools.js
// 配置server的基本工具包

var tools = { 
 
 //1.加密密码
	enbcrypt(password) {
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	}, 
 //2.对比密码,返回bool(密码是:666)
	comparePsw(fromUser,fromSql) {
		return bcrypt.compareSync(fromUser, fromSql); 
		// return fromUser === fromSql;  
	},
	//3.判断对象or数组,返回数组
	parseArr(data) {
		let arr = []
		if(Array.isArray(data)) 
		{
			arr = data;
		} 
		else { 
			arr.push(data);
		}
		return arr
	}
}

module.exports = tools;