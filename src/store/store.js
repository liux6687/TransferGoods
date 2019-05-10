import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	// 定义全局静态资源
	state: {
		active_name: 'home-setting',
	},
	// 计算属性
	getters: {
		
	},
	// 异步
	actions:{
		changeSlider(state, route) {
			state.commit("changeSlider_",route)
		}
	},
	// 同步
	mutations:{
		changeSlider_(state, route) {
			if(route.path != "/") {
				if(route.matched.length >= 2) {
					let path = route.matched[1].path;
					let parentPath = route.matched[1].parent.name.toLowerCase();
					if(parentPath != "") {
						state.active_name = parentPath + "-" + path.substr(1);
					}
				}
			}
		},
	}
})