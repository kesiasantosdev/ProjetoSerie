<template>
      <div class="relative w-full max-w-md m-20">
    
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </span>

    <input 
      class="bg-gradient-to-r from-degrade-inicio to-degrade-fim w-full h-14 rounded-2xl
             focus:outline-none focus:ring-2 focus:ring-purple-500 text-white 
             pl-12 pr-5 text-lg" 
      type="search" 
      v-model="textoDaBusca" 
      placeholder="Busque por séries..."
    />
    
  </div>
    
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const textoDaBusca = ref('')
const resultado = ref([]);
const carregando = ref(false);


export default {
    name: 'Busca'
}
</script>