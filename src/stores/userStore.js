import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('user_token') || null,
    user: null
  }),


  actions: {
    login(token, userData) {
      this.token = token;
      this.user = userData;
      localStorage.setItem('user_token', token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('user_token');
    }
  }
})