<template>
    <div class="flex justify-center items-center content-center  ">

        <form action="" @submit.prevent="registrar" class="bg-principal p-10 py-14 w-100 h-auto rounded-xl ">
            <Logo />
            <p class="p-4 text-center text-slate-400 ">Criar sua conta</p>
            <div v-if="errorMessage" class="bg-erro text-white p-3 rounded-lg text-center my-4 text-sm">
                {{ errorMessage }}
            </div>
            <label for="" class="text-white text-sm">Nome completo</label><br>
            <input v-model="nome" type="text" title="Preencha este campo." placeholder="Seu nome" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            placeholder:text-slate-400 
            focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <label for="" class="text-white text-sm">Email</label><br>
            <input v-model="email" type="email" title="Preencha este campo." placeholder="seu@email.com" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
                placeholder:text-slate-400 text-sm
                focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <label for="" class="text-white text-sm">Senha</label><br>
            <input v-model="senha" type="password" title="Preencha este campo." placeholder=" " name="" id="" class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <label for="" class="text-white text-sm">Confirmar senha</label><br>
            <input v-model="confirmarSenha" type="password" name="" id="" title="Preencha este campo." class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <button type="submit" class="bg-pink-500 text-center my-5 px-2 py-2 border rounded-xl mt-6 w-80 text-white border-none
            bg-gradient-to-r from-purple-500 to-pink-500 
            transition-all duration-600 ease-in-out
            hover:scale-105
            hover:shadow-xl
            hover:from-purple-700 hover:to-pink-600
            ">Criar conta</button>

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

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const errorMessage = ref('')

async function registrar() {
    errorMessage.value = ''

    if (senha.value !== confirmarSenha.value) {
        errorMessage.value = 'As senhas não são iguais!';
        return;
    }
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
        alert('Conta criada com sucesso');

    } catch (error) {

        alert('Ops! Algo deu errado: ');
    }
}
</script>