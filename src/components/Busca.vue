<template>
  <div>
    <form class=" items-center justify-center flex">
      <div class="relative w-full max-w-md m-20">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
        <input class="bg-gradient-to-r from-degrade-inicio to-degrade-fim w-full h-14 rounded-2xl
               focus:outline-none focus:ring-2 focus:ring-purple-500 text-white 
               pl-12 pr-5 text-lg" type="search" v-model="textoDaBusca" placeholder="Busque por séries..." />
      </div>
    </form>

    <div class="px-20 mb-4 flex justify-center">
      <div v-if="feedbackMessage" :class="isError ? 'bg-red-500' : 'bg-green-500'"
        class="text-white text-center p-3 my-4 text-sm rounded-lg w-full max-w-md">
        {{ feedbackMessage }}
      </div>
    </div>

    <div class="items-center justify-center px-30 mb-10 ">
      <div v-if="carregando" class="text-center">
        <p class="text-white text-xl">Buscando séries...</p>
      </div>
      <div v-else-if="resultados.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 w-380 ">
        <div v-for="serie in resultados" :key="serie.id" class="bg-slate-800 rounded-lg overflow-hidden shadow-lg             transition-all duration-600 ease-in-out
            hover:scale-105
            hover:shadow-xl">
          <img :src="'https://image.tmdb.org/t/p/w500' + (serie.poster_path || serie.urlPoster)" :alt="'Pôster de ' + serie.name"
            class="w-full h-100">
          <h3 class="text-white p-3 font-bold text-center ">{{ serie.name }}</h3>
          <div class="text-white text-center"><span>{{ serie.number_of_seasons }} temporadas</span></div>
          <div class="flex justify-center p-4">

    <button v-if="!isFavorito(serie.id)" 
            @click="adicionarFavorito(serie)" 
            type="button" 
            class="bg-pink-500 text-center my-5 px-4 py-2 flex justify-center items-center border rounded-xl text-white border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-600">
        + Adicionar aos favoritos
    </button>
    
    <button v-else 
            disabled 
            class="bg-green-600 text-center my-5 px-4 py-2 flex justify-center items-center border rounded-xl text-white border-none cursor-not-allowed">
        ✓ Já está nos favoritos
    </button>

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
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

const userStore = useUserStore();
const textoDaBusca = ref('');
const resultados = ref([]);
const carregando = ref(false);
const feedbackMessage = ref('');
const isError = ref(false);
let debounceTimer = null;

onMounted(() => {
  if (userStore.seriesFavoritos.length === 0) {
    userStore.buscarFavoritos();
  }
});

watch(textoDaBusca, (textoNovo) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (textoNovo.trim() === '') {
      resultados.value = [];
    } else {
      realizarBusca(textoNovo);
    }
  }, 500);
});

async function realizarBusca(textoParaBusca) {
  console.log(`Buscando por: ${textoParaBusca}`);
  carregando.value = true;
  resultados.value = [];

  try {
    const response = await axios.get('https://localhost:7107/api/SerieHub/buscar', {
      params: {
        nome: textoParaBusca
      }
    });
    resultados.value = response.data;

  } catch (error) {
    console.error('Erro ao buscar séries:', error);
    isError.value = true
    feedbackMessage.value = "Ops! Tivemos um problema ao buscar as séries. Por favor, tente novamente mais tarde.";
  } finally {
    carregando.value = false;
  }
}

function isFavorito(serieId) {
  return userStore.idsSeriesFavoritos.has(serieId);
}

async function adicionarFavorito(serie) {
  try {
    await userStore.adicionarFavorito(serie)
    feedbackMessage.value = `${serie.name} foi adicionada aos seus favoritos!`;
    isError.value = false;
  } catch (error) {
    isError.value = true;
    feedbackMessage.value = "Ops! Tivemos um problema ao adicionar aos favoritos. Por favor, tente novamente mais tarde.";
  }
}
</script>