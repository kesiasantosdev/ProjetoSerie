<template>
    <div class="flex justify-center items-center content-center  ">

        <form action="" @submit.prevent="registrar" class="bg-principal p-10 py-14 w-100 h-auto rounded-xl ">
            <Logo />
            <p class="p-4 text-center text-slate-400 ">Criar sua conta</p>
            <div v-if="feedbackMessage" :class="isError ? 'bg-erro' : 'bg-green-500'"
                class="text-white text-center p-3 my-4 text-sm rounded-lg">
                {{ feedbackMessage }}
            </div>

            <label for="" class="text-white text-sm">Nome completo</label><br>
            <input v-model="nome" id="nome" type="text" title="Preencha este campo." placeholder="Seu nome" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            placeholder:text-slate-400 
            focus:outline-none focus:ring-2  focus:ring-purple-500 "
                :class="{ 'border-red-500': errors.nome, 'border-slate-400': !errors.nome }"><br>
            <p v-if="errors.nome" class="text-red-500 text-sm mt-1">{{ errors.nome }}</p>

            <label for="" class="text-white text-sm">Email</label><br>
            <input v-model="email" type="email" title="Preencha este campo." placeholder="seu@email.com" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
                placeholder:text-slate-400 text-sm
                focus:outline-none focus:ring-2  focus:ring-purple-500 "
                :class="{ 'border-red-500': errors.email, 'border-slate-400': !errors.email }"><br>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>

            <label for="" class="text-white text-sm">Senha</label><br>
            <input v-model="senha" type="password" title="Preencha este campo." placeholder=" " name="" id="" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500 "
                :class="{ 'border-red-500': errors.senha, 'border-slate-400': !errors.senha }"><br>
            <p v-if="errors.senha" class="text-red-500 text-sm mt-1">{{ errors.senha }}</p>

            <label for="" class="text-white text-sm">Confirmar senha</label><br>
            <input v-model="confirmarSenha" type="password" name="" id="" title="Preencha este campo." class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500"
                :class="{ 'border-red-500': errors.confirmarSenha, 'border-slate-400': !errors.confirmarSenha }"><br>
            <p v-if="errors.confirmarSenha" class="text-red-500 text-sm mt-1">{{ errors.confirmarSenha }}</p>

            <button type="submit" :disabled="isLoading" class="bg-pink-500 text-center my-5 px-2 py-2 border rounded-xl mt-6 w-80 text-white border-none
            bg-gradient-to-r from-purple-500 to-pink-500 
            transition-all duration-600 ease-in-out
            hover:scale-105
            hover:shadow-xl
            hover:from-purple-700 hover:to-pink-600
            ">{{ isLoading ? 'Criando...' : 'Criar conta' }}</button>

            <router-link to="/login" class="my-1 text-purple-400  
            hover:text-purple-300 ">
                <p class="text-[15px] text-center hover:cursor-pointer">Já tenho uma conta? Entre aqui
                </p>
            </router-link>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import Logo from './Logo.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const errors = ref({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
})
const feedbackMessage = ref('')
const isError = ref(false)
const isLoading = ref(false)
const router = useRouter()

function validarForm() {
    errors.value = { nome: '', email: '', senha: '', confirmarSenha: '' };
    if (!nome.value) {
        errors.value.nome = 'O nome é obrigatório.';
    }
    if (!email.value) {
        errors.value.email = 'O email é obrigatório.';
    }
    if (!senha.value) {
        errors.value.senha = 'A senha é obrigatória.';
    }
    if (senha.value !== confirmarSenha.value) {
        errors.value.confirmarSenha = 'As senhas não coincidem.';
    }
    return Object.values(errors.value).every(error => !error);
}

function limparFormulario() {
    nome.value = '';
    email.value = '';
    senha.value = '';
    confirmarSenha.value = '';
}

async function registrar() {
    const isFormValid = validarForm();
    if (!isFormValid) {
        return;
    }

    isLoading.value = true;

    const dadosParaEnviar = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };
    console.log('pedido enviado', dadosParaEnviar);
    try {
        const response = await axios.post('https://localhost:7107/api/UsuarioHub/registrar', dadosParaEnviar, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("dados recebido", response.data);
        isError.value = false;
        feedbackMessage.value = 'Registro bem-sucedido! Redirecionando para o login...';
        limparFormulario();
        setTimeout(() => {
            router.push('/login');
        }, 2000);

    } catch (error) {

        isError.value = true;
        if (error.response && error.response.data && error.response.data.message) {
            feedbackMessage.value = error.response.data.message;
        } else {
            feedbackMessage.value = 'Ocorreu um erro no registro. Tente novamente.';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>