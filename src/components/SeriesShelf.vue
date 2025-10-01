<template>
    <div class=" p-10 m-5 rounded-lg shadow-lg w-full h-auto mt-15">
        <div class="p-8">
            <h2 class="text-3xl font-bold text-white mb-6">Meus favoritos ({{ userStore.seriesFavoritos.length }})</h2>
            <div v-if="userStore.seriesFavoritos.length > 0"
                class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                <div v-for="serie in userStore.seriesFavoritos" :key="serie.id" class="bg-slate-800 rounded-lg">
                    <img :src="'https://image.tmdb.org/t/p/w500' + serie.urlPoster" />
                    <h3 class="text-white p-3">{{ serie.nome }}</h3>
                    <div class="px-4 mb-2">
                        <div class="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Progresso</span>
                            <span>Temporada {{ serie.temporadaAtual }} de {{ serie.number_of_seasons }}</span>
                        </div>
                        <div class="w-full bg-gray-600 rounded-full h-2">
                            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                :style="{ width: (serie.temporadaAtual / serie.numberOfSeasons * 100) + '%' }">
                            </div>
                        </div>
                        <div class="mt-auto p-4"> <button @click="handleRemover(serie)"
                                class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Remover dos favoritos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center h-64  rounded-lg shadow-lg mt-10">
                <img src="../assets/IconiCoracao.svg" alt="">
                <h3 class="mt-5 text-slate-500 font-bold">Nenhuma série favorita ainda</h3>
                <p class="mt-1 text-slate-500 font-bold">Use a busca e adicionar suas series favoritas</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
onMounted(() => {
    userStore.buscarFavoritos();
});

async function removerFavorito(serieDbId, serieTmdbId) {
    await userStore.removerFavorito(serieDbId, serieTmdbId);
}

</script>