// 项目入口文件main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import AtComponents from 'at-ui'
import 'at-ui-style'  
import axios from 'axios'
import qs from 'qs'
import app from './App.vue'
import router from './router.js'

Vue.use(VueRouter);
Vue.use(AtComponents);
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

//m-v-vm
var vm = new Vue({
	el:'#app',
	render: c=> c(app),
	router  /*挂载路由*/
})