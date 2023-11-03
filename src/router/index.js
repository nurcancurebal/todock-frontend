import Vue from 'vue'
import VueRouter from 'vue-router'
import EditAccount from "@/views/EditAccount"
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
    path: '/editaccount',
    name: 'EditAccount',
    component: EditAccount
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