import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/home',
      name: "Home",
      component: resolve => require(['@/views/home'], resolve),
      children: [
        {
          path: "/goods",
          name: "Goods",
          component: resolve => require(['@/components/goods'], resolve),
          redirect: "/goodsList",
          children: [
            {
              path: "/goodsList",
              name: "GoodsList",
              component: resolve => require(['@/components/goodsList'], resolve)
            },
            {
              path: "/shopEdit",
              name: "ShopEdit",
              component: resolve => require(['@/components/shopEdit'], resolve)
            },
            {
              path: "/shopEdit2",
              name: "ShopEdit2",
              component: resolve => require(['@/components/shopEdit2'], resolve)
            }
          ]
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
    },
    {
      path: "/404",
      name: "404",
      component: resolve => require(['@/components/common/404'], resolve)
    }
  ]
})
