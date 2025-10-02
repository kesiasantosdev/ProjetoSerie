import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const token = ref(null);
    const seriesFavoritas = ref([]);
    const idsFavoritos = ref(new Set());

    function login(userToken, newUser) {
        token.value = userToken;
        user.value = newUser;
        localStorage.setItem('user_token', userToken);
    }

    function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem('user_token');
        seriesFavoritas.value = []; 
        idsFavoritos.value.clear();
    }

    function tryAutoLogin() {
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
                console.error("Token inválido no localStorage, limpando...", error);
                logout();
            }
        }
    }

    async function buscarFavoritos() {
        try {
            const response = await api.get('/SerieHub/meus-favoritos');
            seriesFavoritas.value = response.data;
            const setDeIds = new Set(response.data.map(serie => serie.tmdbId));
            idsFavoritos.value = setDeIds;
        } catch (error) {
            console.error("Não foi possível carregar os favoritos.", error);
            seriesFavoritas.value = [];
            idsFavoritos.value.clear();
        }
    }

    async function adicionarNovoFavorito(serieParaAdicionar) {
        try {
            const response = await api.post('/SerieHub/adicionar-favorito', { tmdbId: serieParaAdicionar.id });
            seriesFavoritas.value.push(response.data);
            idsFavoritos.value.add(response.data.tmdbId);
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            throw error;
        }
    }

    async function removerFavorito(serieDbId, serieTmdbId) {
        try {
            await api.delete(`/SerieHub/${serieDbId}`);
            seriesFavoritas.value = seriesFavoritas.value.filter(s => s.dbId !== serieDbId);
            idsFavoritos.value.delete(serieTmdbId);
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
            throw error;
        }
    }

    async function atualizarProgresso(serieDbId, novaTemporada) {
        try {
            await api.put(`/SerieHub/${serieDbId}`, { novaTemporada: novaTemporada });
            const serieParaAtualizar = seriesFavoritas.value.find(s => s.dbId === serieDbId);
            if (serieParaAtualizar) {
                serieParaAtualizar.temporadaAtual = novaTemporada;
            }
        } catch (error) {
            console.error("Erro ao atualizar progresso:", error);
            throw error;
        }
    }

    tryAutoLogin();

    return { 
        user, 
        token, 
        seriesFavoritas, 
        idsFavoritos, 
        login, 
        logout, 
        tryAutoLogin,
        buscarFavoritos,
        adicionarNovoFavorito,
        removerFavorito,
        atualizarProgresso,
    };
});