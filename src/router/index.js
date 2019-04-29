import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from "@/components/login"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/components/login'],resolve)
    },
		{
			path: '/home',
			name : "Home",
			component: resolve => require(['@/components/home'], resolve)
		}
  ]
})
