// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import store from "./store/store.js"
import iView from "iview";
import 'iview/dist/styles/iview.css'    // 使用 CSS
import "./common/style/base.css"
import "../my-theme/index.less"
import "jquery"

Vue.use(iView);
Vue.prototype.$http = axios;
Vue.prototype.jQuery = $;
Vue.config.productionTip = false;
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("tokenInfo")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem("tokenInfo")).access_token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(function(response) {
	if(response.status == "401") {
		// token 过期了 跳转登录页
		router.push('/goodsList');
	}
	return response
})
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	if(to.path == "/login") {
		next()
	}else {
		if (sessionStorage.getItem("tokenInfo")) {
			next()
			store.dispatch('changeSlider',to);
		}else {
			next({ path: '/login' })
		}
	}
})
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
