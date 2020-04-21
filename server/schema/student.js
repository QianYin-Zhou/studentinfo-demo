const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db.js');
const Class = require('./class.js');

var now = Date.now();

//定义数据模型student
const Student = sequelize.define("student", {
	sid: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	account: DataTypes.STRING(12),
	name: DataTypes.STRING(9),
	password: DataTypes.STRING(255),
	avatar: DataTypes.STRING(255),
	create_time :{
		type: DataTypes.DATE,
		defaultValue: now
	},
	isVerify: DataTypes.BOOLEAN,
	cid: {
		type: DataTypes.STRING(5),
		references: {
			model: Class,
			key: 'cid'
		}
	}
}, {
	tableName:"student",
	timestamps: false //修改默认设置
});

module.exports = Student;