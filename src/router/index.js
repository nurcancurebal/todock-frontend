import Vue from 'vue'
import VueRouter from 'vue-router'
import TheList from "@/components/TheList"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router