const Class = require('../schema/class.js');

async function findAll() {
	let classes = await Class.findAll();
	return classes;
}

async function findClassName(cid) {
	let TheClass = await Class.findOne({
		where: {
			cid: cid
		}
	});
	return TheClass;
}


// async function getCountByClass(id) {
// 	let TheClass = await Class.findAll({
// 		where: {
// 			cid: id
// 		}
// 	});

// }

module.exports = {
	findAll,
	findClassName
};
