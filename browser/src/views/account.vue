<template>
	<div class="account-root">
		<at-tabs>
		  <at-tab-pane label="登录" name="logintab">
				<Login></Login>
		  </at-tab-pane>
		  <at-tab-pane label="注册" name="registertab">
				<Register></Register>
		  </at-tab-pane>
		</at-tabs>
	</div>
</template>

<script>
	//引入子组件
	import Login from "../component/login.vue";
	import Register from '../component/register.vue';
	
	export default {
		data() {
			return {}
		},
		methods: {},
		components: {
			Login,
			Register
		},
	}
</script>

<style>
	.account-root {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
	}
	.at-tabs {
		background-color: white;
		height: 500px;
		width: 400px;
		padding: 20px 20px 20px 20px;
		box-sizing: border-box;
	}
</style>
