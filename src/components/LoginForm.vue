<template>
    <div class="flex justify-center items-center content-center  ">

        <form @submit.prevent="login" action="" class="bg-principal p-10 py-14 w-100 h-auto rounded-xl ">
            <Logo />
            <p class="p-4 text-center text-slate-400 ">Entrar na sua conta</p>
            <div v-if="feedbackMessage" :class="isError ? 'bg-erro' : 'bg-green-500'"
                class="text-white text-center p-3 my-4 text-sm rounded-lg">
                {{ feedbackMessage }}
            </div>

            <label for="email-login" class="text-white text-sm">Email</label><br>
            <input v-model="email" id="email-login" type="email" title="Preencha este campo."
                placeholder="seu@email.com" autocomplete="email" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
                placeholder:text-slate-400 text-sm
                focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <label for="senha-login" class="text-white text-sm">Senha</label><br>
            <input v-model="senha" id="senha-login" type="password" title="Preencha este campo."
                autocomplete="current-password" name="" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <button type="submit" :disabled="isLoading" class="bg-pink-500 text-center my-5 px-2 py-2 border rounded-xl mt-6 w-80 text-white border-none
            bg-gradient-to-r from-purple-500 to-pink-500 
            transition-all duration-600 ease-in-out
            hover:scale-100
            hover:shadow-xl
            hover:from-purple-700 hover:to-pink-600
            ">{{ isLoading ? 'Entrando...' : 'Entrar' }}</button>
            <router-link to="/auth/registro" class="my-1 text-purple-400 hover:text-purple-300">
                <p class="text-[15px] text-center">
                    Não tem uma conta? Registre-se
                </p>
            </router-link>
        </form>
    </div>
</template>

<script setup>
import Logo from './Logo.vue';
import { ref } from 'vue';
import api from '../services/api';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const email = ref('')
const senha = ref('')
const feedbackMessage = ref('');
const isError = ref(false);
const isLoading = ref(false);
const router = useRouter();
const userStore = useUserStore();

async function login() {
    isLoading.value = true;
    feedbackMessage.value = '';
    isError.value = false;

    try {
        const dadosParaEnviar = {
            email: email.value,
            senha: senha.value
        };
        const response = await api.post('UsuarioHub/login', dadosParaEnviar);
        userStore.login(response.data.token, response.data.user);
        feedbackMessage.value = `Login realizado com sucesso! Bem-vindo(a), ${userStore.user.nome}!`;

        setTimeout(() => {
            router.push('/home');
        }, 1500);
    } catch (error) {
        isError.value = true;
        if (error.response && error.response.data && error.response.data.message) {
            feedbackMessage.value = error.response.data.message;
        } else {
            feedbackMessage.value = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>