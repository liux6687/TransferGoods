import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	// 定义全局静态资源
	state: {
		token: "",
		userInfo: "",
		title: "",
		subtitle: ""
	},
	// 计算属性
	getters: {
		
	},
	// 异步
	actions:{
		setInfo(state, obj) {
			state.commit("setInfo_", obj)
		},
		// 设置标题
		sendTitle(state, obj) {
			state.commit("sendTitle_", obj)
		}
	},
	// 同步
	mutations:{
		setInfo_(state, obj) {
			state.token = obj.token;
			state.userInfo = obj.userInfo
		},
		sendTitle_(state, obj) {
			state.title = obj.pageTitle;
			state.subtitle = obj.subPageTitle;
		}
			
	}
	
})