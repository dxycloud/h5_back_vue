import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Panel from '@/components/panel/Index'
Vue.use(Router)

export default new Router({
  base: '/admin/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/panel',
      name: 'panel',
      component: Panel,
    }
  ]
})
