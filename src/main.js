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
import "jquery"

Vue.use(iView);
Vue.prototype.$http = axios;
Vue.prototype.jQuery = $;
Vue.prototype.verifyToken = function (goNext){
  let tokenInfo = JSON.parse(sessionStorage.getItem("tokenInfo"));
  let time_out = tokenInfo.time_out;
  let expires_in = tokenInfo.expires_in;
  let now_time = parseInt(new Date().getTime() / 1000);
  if(now_time > time_out) {
  	console.log("token过期了")
  	if(now_time - time_out < expires_in) {
  		console.log("token过期了, 还在刷新时间内")
  		axios.get("/api/refresh").then((res) => {
  			console.log(res)
			sessionStorage.setItem("tokenInfo", JSON.stringify(res.data.data.token_info))
			sessionStorage.setItem("userInfo", JSON.stringify(res.data.data.user_info))
			goNext()
  		})
  	}else {
  		console.log("token过期了, 不在刷新时间内")
  		router.replace({
  			path: "/login"
  		})
  	}
  }else {
	goNext()
  }
}
Vue.config.productionTip = false;
import "../my-theme/index.less"
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
