const Student = require('../schema/student.js');
const { Op } = require("sequelize");

var now = new Date();

//增
async function create(student){
	let newStudent = await Student.create({
		sid: student.sid,
		account: student.account,
		name: student.name,
		password: student.password,
		avatar: student.avatar,
		create_time: student.create_time,
		isVerify: student.isVerify,
		cid: student.cid
	})
}

//改
async function update(nowStudent,account) {
	await Student.update(nowStudent, {
	  where: {
	    account
	  }
	});
	return true;
}

//查
async function findAll() {
	let students = await Student.findAll();
	return students;
}

async function findStudentByName(name){
	let student = await Student.findOne({
		where: {
			name 
		} 
	})
	return student;
}

async function findStudentByAccount(account){
	let student = await Student.findOne({
		where: {
			account 
		}
	})
	return student;
}

async function findStudentBycid(cid){
	let students = await Student.findAll({
		where: {
			cid 
		}
	})
	return students;
}

async function findByKeyword(condition){  
	let students
	let KEYWORD = ''
	/* 根据学号非常模糊查询 */
	if(condition.account) 
	{
		KEYWORD = condition.account;
		students = await Student.findAll({
			where: {
				account: {
					[Op.like]: '%'+ KEYWORD + '%'
				}
			}
	  });
	}
	/* 根据名字非常模糊查询 */
	if(condition.name)
	{
		KEYWORD = condition.name;
		students = await Student.findAll({
			where: {
				name: {
					[Op.like]: '%'+ KEYWORD + '%'
				}
			}
	  });
	}
	/* 根据班号非常模糊查询 */
	if(condition.cid)
	{
		KEYWORD = condition.cid;
		students = await Student.findAll({
			where: {
				cid: {
					[Op.like]:'%'+ KEYWORD + '%'
				}
			}
	  });
	}
	return students;
}

// (async()=>{
	// let user = {
	// 	sid: 2,
	// 	account: "201802004468",
	// 	name: "周西西",
	// 	password: "234567",
	// 	profession: "软件工程",
	// 	avatar: 'img/img1.jpg',
	// 	create_time: now,
	// 	isVerify: true,
	// 	cid: "85679"
	// }
// 	// await createStudent(user);
// 	await find("201802004466");
// })();


module.exports = {
	create,
	update,
	findAll,
	findStudentByAccount,
	findStudentByName,
	findStudentBycid,
	findByKeyword
};