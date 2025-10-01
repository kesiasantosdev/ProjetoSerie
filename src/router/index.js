import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../Views/AuthView.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import HomeView from '../Views/HomeView.vue';
import Header from '../components/TheHeader.vue';

const routes = [
  {
    path: '/auth',
    component: AuthView,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginForm
      },
      {
        path: 'registro',
        name: 'registro',
        component: RegisterForm
      }]},
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
  {
    path: '/',
    redirect: '/auth/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;