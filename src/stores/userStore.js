import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const token = ref(null);
    const seriesFavoritos = ref([]);
    const idsSeriesFavoritos = ref(new Set());

    async function buscarFavoritos() {
        try {
            const resposta = await api.get('SerieHub/meus-favoritos');
            seriesFavoritos.value = resposta.data;

            const setDeIds = new Set(resposta.data.map(serie => serie.tmdbId));
            idsSeriesFavoritos.value = setDeIds;
        } catch (error) {
            console.error("Erro ao buscar séries favoritas:", error);
        }
    }

    async function adicionarFavorito(serieParaAdicionar) {
        try {
            const resposta = await api.post('SerieHub/adicionar-favorito', { tmdbId: serieParaAdicionar.id });
            seriesFavoritos.value.push(resposta.data);
            idsSeriesFavoritos.value.add(resposta.data.tmdbId);
        } catch (error) {
            console.error("Erro ao adicionar série aos favoritos:", error);
            throw error;
        }
    }

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

    return { user, token, seriesFavoritos, idsSeriesFavoritos, buscarFavoritos, adicionarFavorito, login, logout, tentarAutoLogin };
});