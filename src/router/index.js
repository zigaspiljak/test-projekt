import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Add from '../views/Add.vue'
import Details from '../views/Details.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp,
    meta: {
      isAdmin: true
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,

  },
  {
    path: '/add',
    name: 'add',
    component: Add,

  },
   {
    path: '/details/:Pid',
    name: 'details',
    component: Details,

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const user = JSON.parse(localStorage.getItem("user-info"))
  if(to.meta.isAdmin)
  {
    return(user.role === "admin")
  }
  return true
})

export default router
