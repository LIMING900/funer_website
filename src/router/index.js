import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Packages from '../views/Packages.vue'
import Agent from '../views/Agent.vue'
import Gallery from '../views/Gallery.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import TermsOfService from '@/views/TermsOfService.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/packages',
    name: 'Packages',
    component: Packages
  },
  {
    path: '/agent',
    name: 'Agent',
    component: Agent
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: TermsOfService
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 