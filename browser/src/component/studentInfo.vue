<template>
	<div class="studentinfo">
		<at-input v-model="info.account" placeholder="请输入学号" size="large" v-if="isShow">
		  <template slot="prepend">
		    <span>学号</span>
		  </template>
		</at-input>
		<at-input v-else :placeholder="parentInfo.account" size="large" disabled>
		  <template slot="prepend">
		    <span>学号</span>
		  </template>
		</at-input>
		<at-input v-model="info.name" size="large" placeholder="请输入姓名">
		  <template slot="prepend">
		    <span>姓名</span>
		  </template>
		</at-input>
		<at-input v-model="info.password" size="large" placeholder="请输入密码">
		  <template slot="prepend">
		    <span>密码</span>
		  </template>
		</at-input>
		<at-select
			style="width: 300px"
			 placeholder="请选择您的班级"
			size="large" 
			@on-change="v=>{changeSelect(v)}"
			filterable clearable>	
			<at-option v-for="item in selectDataSource" :value="item.cid" :label="item.name">
				<span>{{item.name}}</span>
				<span style="float: right;opacity: .6;font-size: 0.8em;">{{item.cid}}</span>
			</at-option>
		</at-select>
	</div>
</template>
 
<script>
	export default {
		props:[
			'parentInfo'  //father:该组件它爸爸的数据
		],
		data() { 
			return {
				isShow: this.RegisterOrUpdate(),
				selectDataSource: [],
				info: {
					account: "",
					name: "",
					password: "",
					cid: ""
				}
			}
		},
		methods: {
			RegisterOrUpdate() {
				return !this.parentInfo;
			},
			getRegisterInfo() {
				if(this.info.account&&this.info.name&&this.info.password&&this.info.cid) {
					return this.info;
				} else {
					this.$Notify({
						title: '注册失败',
						message: "信息填写不能为空",
						duration: 3000,
						type:'error'
					})
				}
			},
			getupdateInfo() {
				let updateInfo = this.info
				for(let key in updateInfo) {
					if(!updateInfo[key])
						delete updateInfo[key];
				}
				return updateInfo;  //father:返回数据给它爸爸
			},
			changeSelect(value) {
				this.info.cid = value;
			},
			getAllClassInfo() {
				this.axios.get('http://localhost:4000/api/getAllClassInfo')
				.then(response=> {
					console.log(response.data);
					this.selectDataSource = response.data.list;
				})
				.catch(error=> {
					console.log(error);
				});
			}
		},
		created() {
			this.getAllClassInfo();  //获取课程所有信息
		}
	}
	
</script>

<style>
	.studentinfo {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.studentinfo .at-input,
	.studentinfo .at-select {
		margin: 10px auto;
		width: 300px; 
	}
</style>

<!-- 此组件分别用于注册和修改信息 -->