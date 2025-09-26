<template>
<div class="bg-gradient-to-r from-degrade-inicio to-degrade-fim h-16 min-w-screen p-1 flex justify-between items-center ">
    <LogoHeader/>
    <div class="flex items-center space-x-4 m-20">
    <font-awesome-icon icon="fa-regular fa-user" class="fa-lg text-titulo
    "/>
    <p class="text-white">maria</p>
    
    <button class="bg-slate-600 hover:bg-slate-700 text-titulo px-3 py-2 rounded flex items-center">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="mr-2" />
        <span class="text-white">Sair</span>
      </button>
    </div>
    
</div>
</template>

<script setup>
import LogoHeader from './LogoHeader.vue';

</script>