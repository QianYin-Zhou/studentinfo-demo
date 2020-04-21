const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db.js'); 

const Class = sequelize.define("class", {
	cid: {
		type: DataTypes.STRING(5),
		primaryKey: true
	},
	name: DataTypes.STRING(18),
}, {
	tableName:"class",
	timestamps: false //修改默认设置
});

module.exports = Class;