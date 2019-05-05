import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/login'],resolve)
    },
	{
		path: '/home',
		name : "Home",
		component: resolve => require(['@/views/home'], resolve),
		children: [
			{
				path: "/goodsList",
				name: "GoodsList",
				component: resolve => require(['@/components/goodsList'], resolve)
			},
			{
				path: "/setting",
				name: "StoreSetting",
				component: resolve => require(['@/components/store_setting'], resolve)
			},
			{
				path: "/record",
				name: "Record",
				component: resolve => require(['@/components/record'], resolve)
			}
		]
	}
  ]
})
