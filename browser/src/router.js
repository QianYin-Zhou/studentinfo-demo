//路由模块router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import account from './views/account.vue';
import infolist from './views/infoList.vue';

//1. 创建路由对象和路由规则
var router = new VueRouter({
	routes: [
		{
			path: '/',
			component: account, 
		},
		{
			path: '/infolist', 
			component: infolist,
			meta: {
				requireAuth: true //  flag标识此路由需要token验证
			}
		}
	]
})

//2. 创建前端全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token');
    if (token && token !== 'null') {
      // Bearer是JWT的认证头部信息
      Vue.prototype.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next();
    } else {
			  next({
					path: '/',
					query: {redirect: to.fullPath}  // 登录成功后跳转到该路由
				})
    }
  } 
	else {
    next();  //本实验中"账户"页面不需要token验证
  }
})


//3. 将路由router暴露出去
export default router