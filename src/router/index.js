import Vue from 'vue'
import VueRouter from 'vue-router'
import UpdateAccount from "@/views/UpdateAccount"
import SignIn from "@/views/SignIn"
import SignUp from "@/views/SignUp"
import Kanban from "@/views/Kanban"

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/updateaccount',
    name: 'UpdateAccount',
    component: UpdateAccount
  },
  {
    path: '/',
    name: "Kanban",
    component: Kanban
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const token = localStorage.getItem("token");
const navPathName = location.pathname;

const WHITE_NONTOKEN_PATH_NAMES = ["/signin", "/signup"];

if (!WHITE_NONTOKEN_PATH_NAMES.includes(navPathName) && !token) {
  router.push("signin");
};

if (WHITE_NONTOKEN_PATH_NAMES.includes(navPathName) && token) {
  localStorage.removeItem("token");
};

export default router