<template>
    <div class="p-8">
        <h2 class="text-3xl font-bold text-white mb-6">Minha Estante ({{ userStore.seriesFavoritas?.length ?? 0 }})</h2>
        
        <div v-if="carregando" class="text-center text-white">
            Carregando sua estante...
        </div>

        <div v-else-if="userStore.seriesFavoritas.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div v-for="serie in userStore.seriesFavoritas" :key="serie.dbId" class="bg-slate-800 rounded-lg shadow-lg flex flex-col">
                <img :src="serie.posterPath ? 'https://image.tmdb.org/t/p/w500' + serie.posterPath : '/placeholder.png'" 
                     :alt="'Pôster de ' + serie.name" class="rounded-t-lg object-cover"/>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-white font-bold text-lg mb-2 h-14">{{ serie.name }}</h3>

                    <div class="mb-2">
                        <div class="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Progresso</span>
                            <span>Temp. {{ serie.temporadaAtual }} de {{ serie.numberOfSeasons }}</span>
                        </div>
                        <div class="w-full bg-gray-600 rounded-full h-2">
                            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                                 :style="{ width: (serie.temporadaAtual / serie.numberOfSeasons * 100) + '%' }">
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <label class="text-sm text-slate-400">Temporada atual:</label>
                        <select :value="serie.temporadaAtual" 
                                @change="atualizarTemporada(serie, $event.target.value)"
                                class="w-full bg-slate-700 text-white p-2 rounded mt-1">
                            <option v-for="n in serie.numberOfSeasons" :key="n" :value="n">
                                Temporada {{ n }}
                            </option>
                        </select>
                    </div>

                    <div class="mt-auto pt-4">
                       <button @click="handleRemover(serie)" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                           Remover dos favoritos
                       </button>
                    </div>
                </div>
            </div>

        </div>
        
        <div v-else class="flex flex-col items-center justify-center h-64 rounded-lg shadow-inner mt-10 border-2 border-dashed border-slate-700">
            <img src="../assets/IconiCoracao.svg" alt="Coração Vazio" class="w-16 h-16 opacity-30">
            <h3 class="mt-5 text-slate-500 font-bold">Sua estante está vazia</h3>
            <p class="mt-1 text-slate-600">Use a busca para adicionar suas séries favoritas.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const carregando = ref(false);

onMounted(async () => {
    carregando.value = true;
    await userStore.buscarFavoritos();
    carregando.value = false;
});

async function handleRemover(serie) {
    console.log('remover', serie);
    await userStore.removerFavorito(serie.dbId, serie.tmdbId);
}

async function atualizarTemporada(serie, novaTemporada) {
    // Convertemos o valor do select (que vem como texto) para número
    const temporadaNumero = parseInt(novaTemporada);
    await userStore.atualizarProgresso(serie.dbId, temporadaNumero);
}
</script>