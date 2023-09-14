import Vue from 'vue'
import VueRouter from 'vue-router'
import TheList from "@/components/TheList"
import EditAccount from "@/components/EditAccount"
import DeleteAccount from "@/components/DeleteAccount"
import EditPassword from "@/components/EditPassword"

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
  },
  ,
  {
    path: '/deleteaccount',
    name: 'DeleteAccount',
    component: DeleteAccount
  },
  {
    path: '/editpassword',
    name: 'EditPassword',
    component: EditPassword
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router