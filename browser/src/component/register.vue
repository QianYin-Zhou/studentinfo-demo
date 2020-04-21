<template>
	<div class="registerform">
		<student-info ref="mychildhasgrd"></student-info>
		<at-button icon="icon-user-plus" type="primary" @click="toRegister()">注册账号</at-button>
	</div>
</template>

<script>
	import studentInfo from "./studentInfo.vue"
	
	export default {
		data() {
			return {
				selectDataSource:[], //
			}
		},
		methods: {
			toRegister() {
				var now = new Date()
				let formdata = this.$refs.mychildhasgrd.getRegisterInfo()
				if(!formdata) return;  //为空退出
				let data = {
					name: formdata.name,
					account: formdata.account,
					password: formdata.password,
					avatar:"img/avatar.png",
					create_time: now,
					isVerify: true,
					cid: formdata.cid
				};  //表单数据
				this.axios({
					method:'post',
					url:'http://localhost:4000/api/register',	
					data:this.qs.stringify(data)
				}) 
				.then((res)=> {
					console.log(res.data);
					if (res.data.code === 1) {
						const bean = res.data.bean
						localStorage.setItem('token', bean.token); 
						this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bean.token; 
						this.$Message.success('账号注册成功');
						this.$router.push('/infolist');
					} else {
						this.$Message.error(res.data.msg);
					}
				})
				.catch((error)=> {
					this.$Message.error(error);
				});
			},
			changeSelect(value) {
				console.log("我变了",value) //这里拿到了班号
				this.cid = value;
			}
		},
		components: {
			studentInfo
		},
	}
</script>

<style>
	.registerform {
		margin-top: 30px;
	}
	.registerform .at-btn {
		float: right;
		margin-right: 40px;
		margin-top: 70px;
	}
</style>
