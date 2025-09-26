<template>
  <div class="min-h-screen flex flex-col">
    
    <TheHeader/>
    <div class=" flex  justify-center bg-corfundo">
        <Busca /> 
    </div> 
    
    
    
    <main class="flex-grow flex items-center justify-center bg-corfundo">
        
      <p>Conteúdo da Página Principal</p>
    </main>
    
  </div>

</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import Busca from '../components/Busca.vue';

export default {
    name: 'HomeViews',

    components: {
        TheHeader,
        Busca
    }
   
}

</script>