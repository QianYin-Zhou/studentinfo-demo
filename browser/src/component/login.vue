<template>
	<div class="loginform">
		<img src="img/avatar.png" alt="学生妹" class="avatar">
		<at-input v-model="account" placeholder="学号" size="large"></at-input>
		<at-input v-model="password" type="password" placeholder="密码" size="large"></at-input>
		<at-button icon="icon-user-check" type="primary" @click="tologin()">立即登录</at-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
				password:''
			}
		},
		methods: {
			tologin() {
				this.$Loading.start();   //登录进度条
				let student = {
					account: this.account,
					password: this.password
				}
				var that = this;  //保留this
				this.axios({ 
					method:'post',
					url:'http://localhost:4000/api/login',	
					data:this.qs.stringify(student)
				}) 
				.then(function (res) {
					console.log(res.data);
					if (res.data.code === 1) {
						const bean = res.data.bean
						localStorage.setItem('token', bean.token);  //将token存入本地存储
						that.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bean.token; // Bearer是JWT的认证头部信息
						that.$Message.success('登录成功');
						that.$Loading.finish();
						that.$router.push('/infolist');
					} else {
						that.$Loading.error();
						that.$Message.error(res.data.msg);
					}
				})
				.catch(function (error) {
					that.$Message.error(error);
					that.$Loading.error();
				});
			}
		}
	}
</script>

<style>
	.loginform .avatar{
		margin-top: 40px;
		width: 60px;
	}
	.loginform .at-input {
		width: 270px;
		margin-top: 30px;
	}
	.loginform .at-btn {
		margin-top: 50px;
	}
</style>
