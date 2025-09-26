<template>
<br>        
    <div class="flex justify-center items-center content-center  ">

        <form @submit.prevent="login" action="" class="bg-principal p-10 py-14 w-100 h-auto rounded-xl ">
            <Logo />
            <p class="p-4 text-center text-slate-400 ">Entrar na sua conta</p>

            <label for="" class="text-white text-sm">Email</label><br>
            <input  v-model="email" type="email" title="Preencha este campo." placeholder="seu@email.com"
                class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
                placeholder:text-slate-400 text-sm
                focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <label for="" class="text-white text-sm">Senha</label><br>
            <input v-model="senha" type="password" title="Preencha este campo." placeholder=" " name="" id=""
            class="bg-slate-600  border rounded-xl my-1 p-4 w-80 h-10 text-white
            focus:outline-none focus:ring-2  focus:ring-purple-500 border-slate-400"><br>

            <button type="submit"
            class="bg-pink-500 text-center my-5 px-2 py-2 border rounded-xl mt-6 w-80 text-white border-none
            bg-gradient-to-r from-purple-500 to-pink-500 
            transition-all duration-600 ease-in-out
            hover:scale-100
            hover:shadow-xl
            hover:from-purple-700 hover:to-pink-600
            ">Entrar</button>
            <router-link to="registro">
            <p class="text-[15px] text-center "><a href="#" 
            class="my-1 text-purple-400  
            hover:text-purple-300 "
            >Não tem uma conta? Registre-se</a></p></router-link>
        </form>
    </div>
</template>

<script setup>
import Logo from './Logo.vue';
import { ref } from 'vue';
import axios from 'axios';

const email = ref('')
const senha = ref('')

async function login() {
  try {
    const dadosParaEnviar = {
        email: email.value,
        senha: senha.value
    };
    const response = await axios.post('https://localhost:7107/api/UsuarioHub/login', dadosParaEnviar, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    console.log('Usuário registrado com sucesso!', response.data);
    alert("Login")

  } catch (error) {
    alert('Ops! Algo deu errado: ');
  }
}
</script>