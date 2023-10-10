import Vue from 'vue'
import VueRouter from 'vue-router'
import TheList from "@/components/TheList"
import EditAccount from "@/components/EditAccount"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheList
  },
  {
    path: '/editaccount',
    name: 'EditAccount',
    component: EditAccount
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router