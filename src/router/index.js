import Vue from 'vue'
import VueRouter from 'vue-router'
import EditAccount from "@/views/EditAccount"
import SignIn from "@/views/SignIn"
import SignUp from "@/views/SignUp"
import Kanban from "@/views/Kanban"

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
    path: '/editaccount',
    name: 'EditAccount',
    component: EditAccount
  },
  {
    path: '/kanban',
    name: "Kanban",
    component: Kanban
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router