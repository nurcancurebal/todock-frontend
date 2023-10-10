import Vue from 'vue'
import VueRouter from 'vue-router'
import TheList from "@/components/TheList"
import EditAccount from "@/components/EditAccount"
import SignIn from "@/components/SignIn"
import SignUp from "@/components/SignUp"
import UserHome from "@/views/UserHome"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/userhome',
    name: 'UserHome',
    component: UserHome
  },
  {
    path: '/editaccount',
    name: 'EditAccount',
    component: EditAccount
  },
  {
    path: '/thelist',
    name: 'TheList',
    component: TheList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router