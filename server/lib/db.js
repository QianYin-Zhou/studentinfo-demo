//使用sequelize连接mysql

const { Sequelize } = require('sequelize');
const config = require('../config/default.js');

var sequelize = new Sequelize(
	config.database.DATABASE, 
	config.database.USERNAME, 
	config.database.PASSWORD, 
	{
	  host: 'localhost',
	  dialect: 'mysql',
	  port: config.database.PORT,
	  logging: false   //不要打印sql语句,不然烦死你
	}
);

 module.exports = sequelize;