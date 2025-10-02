<template>
  <div class="min-h-screen flex flex-col">
    
    <TheHeader/>
    <div class=" flex  justify-center bg-corfundo">
        <Busca /> 
    </div> 
    
    <main class="flex-grow flex  bg-corfundo">
      <SeriesShelf/>
    </main>
    
  </div>

</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import Busca from '../components/Busca.vue';
import SeriesShelf from '../components/SeriesShelf.vue';

export default {
    name: 'HomeViews',

    components: {
        TheHeader,
        Busca,
        SeriesShelf
    }
   
}

</script>