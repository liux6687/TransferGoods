// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from "./store/store.js"
import iView from "iview";
import { Switch } from 'iview'
Vue.component('i-switch', Switch)
import 'iview/dist/styles/iview.css'    // 使用 CSS
import "./common/style/base.css"

Vue.use(iView);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
