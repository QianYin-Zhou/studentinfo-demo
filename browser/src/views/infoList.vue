<template>
	<div class="info">
		<!-- 左边叫scalable -->
		<div class="scalable">
			<p>学生个人信息</p> 
			<div class="avatar">
				<img :src="baseinfo.avatar" />
			</div>
			<div>
				<p>id：{{ baseinfo.account }}</p>
				<p>姓名：{{ baseinfo.name }}</p>
				<p>班级：{{ baseinfo.cid }}</p>
			</div>
			<at-button type="info" hollow @click="btnChange()">修改个人信息</at-button>
			<at-button type="info" icon="icon-log-out" @click="exit()">退出登录</at-button>
			<!-- 修改模态框需要父子交流 -->
			<at-modal v-model="isshowInfoModel" title="修改个人信息(空项则表示不修改该数据)" @on-confirm="handleConfirm()">
				<student-info :parentInfo="baseinfo" ref="mychild"></student-info>
			</at-modal>
			<div class="separator">
				<i></i>
				<i></i>
			</div>
		</div>
		<!-- 右边叫main -->
		<div class="main">
			<at-select 
					style="width: 100px" 
					@on-change="v=>{changeSelect(v)}"
					placeholder="筛选条件">
			  <at-option v-for="item in ScreeningCondition" :key="item.key" :value="item.value">{{ item.condition }}</at-option>
			</at-select>
			<at-input v-model="inputValue" placeholder="输入关键字"></at-input>
			<at-button type="primary" icon="icon-search" @click="btnSearch()"></at-button>
			<at-button type="success" @click="btnSameClass()">查看我的同班同学</at-button>
			<at-button type="primary" @click="getAllStudentInfo()" hollow>查看全部学生</at-button>
			<!-- 数据表格 -->
			<at-table :columns="tableheader" :data="tabledata" stripe border pagination></at-table>
		</div>
	</div>
</template>

<script> 
	import studentInfo from "../component/studentInfo.vue";
	
	export default {
			created() {
				this.getStudentInfo();
				this.getAllStudentInfo();
			},
	    data () {
	      return {
					isshowInfoModel: false,  //是否展示修改框
					myCondition:'', //用户的筛选条件
					inputValue:'', //搜索关键字
					baseinfo: {},   //该用户信息
	        tableheader: this.makeTableHeader(), //表头
	        tabledata: [], //表数据来源
					ScreeningCondition: [  //筛选条件列表
						{ key:1, condition:"学号", value:"account" },
						{ key:2, condition:"姓名", value:"name" },
						{ key:3, condition:"班号", value:"cid" },
						{ key:4, condition:"班级名称", value:"cname" } 
					]
	      }
	    },
	    methods: {
	      makeTableHeader() {
					
					let tableHeader = 
					[
					  {
					    title: '学号',
					    key: 'account',
							sortType: 'normal'
					  },
					  {
					    title: '姓名',
					    key: 'name',
					  },
					  {
					    title: '班号',
					    key: 'cid'
					  },
						{
						  title: '注册时间',
						  key: 'create_time',
							sortType: 'normal'
						},
						{
							title: '操作选项',
							render: (h, params) => {
								return h('div', [
									h('AtButton', {
										props: {
											size: 'small',
											hollow: true
										},
										style: {
											marginRight: '8px'
										},
										on: {
											click: () => {
												this.tosearchByCondition("cid", params.item.cid);
											}
										}
									}, '查看它同班同学'),
									h('AtButton', {
										props: {
											size: 'small',
											hollow: true
										},
										on: {
											click: () => {
												this.$Message("不好看")
											}
										}
									}, '放两个按钮好不好看')
								])
							}
						}
					]
	        return tableHeader;
	      },
				changeSelect(value) {
					if(value === "cname") {
						this.$Message.error("周茜茵正常用sequelize暂时做不到多表关联查询! 2020年4月21号")
					} else {
						this.myCondition = value
					}
					console.log("用户选择的value是",this.myCondition);
				},
				exit() {
					this.$Modal.confirm({
						title: '退出提示',
						content: '此操作需要非常谨慎，您确定要这么做吗？'
					}).then(() => {
						localStorage.clear();
						this.$router.push('/');
						this.$Message.info("我已经把本地token删了,应该就是这样退出登录的，不过服务器那边的token应该还是没过期的");
					}).catch(() => {
						this.$Message('取消退出')
					})
				},
				btnSameClass() {
					this.tosearchByCondition("mycid", this.baseinfo.cid);
				},
				btnSearch() {
					console.log(`筛选条件是${this.myCondition}，输入：${this.inputValue}`)
					if(this.myCondition&&this.inputValue) 
					{
						this.tosearchByCondition(this.myCondition, this.inputValue);
					} 
					else 
					{
						this.getAllStudentInfo();
					}
				},
				btnChange() {
					this.isshowInfoModel = true;
					this.getStudentInfo();
				},
				handleConfirm() {
					let data = this.$refs.mychild.getupdateInfo()  //son: 调用它儿子的方法
					console.log("data is",data)
					if(!data) return;  //为空退出
					var that = this;  //保留this
					this.axios({
						method:'post',
						url:'http://localhost:4000/api/student/updateStudentInfo',	
						data:this.qs.stringify(data)
					}) 
					.then(function (res) {
						console.log(res.data);
						if (res.data.code === 1) {
							that.getStudentInfo();
							that.$Notify({
								title: '学生个人信息',
								message: res.data.msg,
								duration: 3000,
								type:'success'
							})
						} else {
							that.$Notify({
								title: '学生个人信息',
								message: res.data.msg,
								duration: 3000,
								type:'error'
							})
						}
					})
					.catch(function (error) {
						that.$Notify({
							title: '错误',
							message: error,
							duration: 3000,
							type:'error'
						})
					});
					
				},
				getStudentInfo() {
					this.axios.get('http://localhost:4000/api/student/getStudentInfo')
					.then(res=> {
						console.log(res.data);
						if(res.data.code === 1) {
							this.baseinfo = res.data.student;  //个人信息渲染完成；
						} else {
							this.$Message.error(res.data.msg);
						}
					})
					.catch(error=> {
						this.$Message.error(error);
					});
				},
				getAllStudentInfo() {
					this.axios.get('http://localhost:4000/api/student/getAllStudentInfo')
					.then(res=> {
						console.log(res.data);
						if(res.data.code === 1) {
							this.tabledata = res.data.studentList;  //个人信息渲染完成；
						}
					})
					.catch(error=> {
						console.log(error);
					});
				},
				tosearchByCondition(condition, input) {
					this.$Loading.start();
					this.tabledata = [],  //清空表格数据
					this.axios.get(`http://localhost:4000/api/student/getStudentFromCondition?${condition}=${input}`)
					.then((res)=> {
						if(res.data.code === 1) {
							this.tabledata = res.data.list;
							this.$Loading.finish();
							this.$Message.success(res.data.msg);
						} else {
							this.$Loading.error();
							this.$Message.error(res.data.msg);
						}
					})
					.catch((error)=> {
						this.$Loading.error();
						this.$Message.error(error);
					});
				}
	    },
			components: {
				studentInfo
			}
	  }
</script>

<style>
	.info {
		display: flex;
		min-height: 100vh;
	}
	.info .scalable {
		background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
		padding: 30px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		position: relative;
	}
	.scalable .avatar {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 50%;
	}
	.avatar img {
		/* width: 20%; */
	}
	.scalable .separator {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top:0px;
		right: 0px;
		width: 10px;
		height: 100%;
		background-color: white;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .35);
		cursor: col-resize;  /* 鼠标变为可移动*/
	}
	.separator i{
		display: inline-block;
		height: 14px;
		width: 1px;
		background-color: #e6e6e6;
		margin: 0px 2px;
	}
	.info .main {
		background-color: white;
		padding: 30px 50px;
		width: 100%;
	}
	.main .at-input {
		width: 200px;
		display: inline-block;
	}
	.main .at-table {
		margin-top: 30px;
	}
</style>
