import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router)

const router = new Router({
  mode: 'history', 
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUp
    },
    { 
      path: '/hello',
      component: HelloWorld,
      meta: { requiresAuth: true}
    },
    {
      path: '/',
      component: Index,
      meta: { requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next)=> {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'Login'})
    }
  }
  next()
})

export default router