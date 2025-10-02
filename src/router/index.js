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

// Guard de rota para proteger /home
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user_token');

  // Proteger rota /home
  if (to.path === '/home') {
    if (!isLoggedIn) {
      next({ path: '/auth/login' });
      return;
    }
  }

  // Se estiver logado e tentar acessar login ou registro, redireciona para home
  if (isLoggedIn && (to.path === '/auth/login' || to.path === '/auth/registro')) {
    next({ path: '/home' });
    return;
  }

  next();
});

export default router;