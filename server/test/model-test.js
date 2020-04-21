/* 
  使用抹茶测试;
  class表的增删改查;
	student表的增删改查;
*/
const assert = require('assert');
const {
	findAll,
	findClassName
} = require('../models/class.js');

//1.数据库数据
var now_RecordCount = 3;
var true_testCID = '85670';
var false_testCID = '12345';
//2.测试数据
var testCID = true_testCID;
//3.期望数据
var expected_flag = false;

describe('models-crud-test', () => {
		
		//测试第一组:class表的方法
    describe('#class表', () => {
			it('class.findAll() success!', (done) => {
					(async()=> {
					try {
						let classes= await findAll();
						assert.equal(classes.length, now_RecordCount);
						done();
					}catch (err) {
						done(err);
					}
				})();
			});
		
			it('class.findClassName() success!', (done) => {
					(async()=> {
						try {
							let flag = await findClassName(testCID);
							assert.equal(flag, expected_flag);
							done();
						}catch (err) {
							done(err);
						}
					})();
			});
    });
		
		//测试第二组:student表的方法
		describe('#student表', () => {
			
		});
});