import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Mange = ()=>import('../views/Manage')

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: Mange
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router