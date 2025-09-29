<template>
  <div>
    <form @submit.prevent="realizarBusca" class=" items-center justify-center flex">
      <div class="relative w-full max-w-md m-20">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
        <input class="bg-gradient-to-r from-degrade-inicio to-degrade-fim w-full h-14 rounded-2xl
               focus:outline-none focus:ring-2 focus:ring-purple-500 text-white 
               pl-12 pr-5 text-lg" type="search" v-model="textoDaBusca" placeholder="Busque por séries..." />
      </div>
    </form>

    <div class="items-center justify-center px-30 mb-10 ">
      <div v-if="carregando" class="text-center">
        <p class="text-white text-xl">Buscando séries...</p>
      </div>
      <div v-else-if="resultados.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 w-380 ">
        <div v-for="serie in resultados" :key="serie.id" class="bg-slate-800 rounded-lg overflow-hidden shadow-lg             transition-all duration-600 ease-in-out
            hover:scale-105
            hover:shadow-xl">
          <img :src="'https://image.tmdb.org/t/p/w500' + serie.poster_Path" :alt="'Pôster de ' + serie.name"
            class="w-full h-100">
          <h3 class="text-white p-3 font-bold text-center ">{{ serie.name }}</h3>
          <div class="flex justify-center p-4">
            <button type="submit" class="bg-pink-500 text-center my-5 px-2 py-2 flex justify-center items-center border rounded-xl mt-6 w-45 m-2  text-white border-none
            bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-700 hover:to-pink-600
            ">+ Adicionar aos favotitos</button>
          </div>

        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-slate-400">Nenhuma série encontrada. Faça uma busca para começar!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const textoDaBusca = ref('');
const resultados = ref([]);
const carregando = ref(false);

async function realizarBusca() {
  if (textoDaBusca.value.trim() === '') {
    resultados.value = [];
    return;
  }

  carregando.value = true;
  resultados.value = [];

  try {
    const response = await axios.get('https://localhost:7107/api/SerieHub/buscar', {
      params: {
        nome: textoDaBusca.value
      }
    });
    resultados.value = response.data;
    console.log("A cozinha respondeu:", response.data);
  } catch (error) {
    console.error("A cozinha gritou que deu erro!", error);
    alert("Ops! Não foi possível buscar as séries.");
  } finally {
    carregando.value = false;
  }
}
</script>