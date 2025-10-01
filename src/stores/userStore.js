import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const token = ref(null);

    function login(userToken, newUser) {
        token.value = userToken;
        user.value = newUser;
        localStorage.setItem('user_token', userToken);
    }

    function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem('user_token');
    }

    function tentarAutoLogin() {
        const tokenNoStorage = localStorage.getItem('user_token');

        if (tokenNoStorage) {
            try {
                const dadosDecodificados = jwtDecode(tokenNoStorage);
                
                token.value = tokenNoStorage;
                user.value = {
                    nome: dadosDecodificados.name, 
                    email: dadosDecodificados.email, 
                    id: dadosDecodificados.sub 
                };

            } catch (error) {
                
                console.error("Token inválido no localStorage", error);
                logout();
            }
        }
    }

    tentarAutoLogin();

    return { user, token, login, logout, tentarAutoLogin };
});