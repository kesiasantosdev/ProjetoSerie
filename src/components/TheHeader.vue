<template>
    <div class="bg-gradient-to-r from-degrade-inicio to-degrade-fim h-16 min-w-screen p-1 flex justify-between items-center ">
        <LogoHeader/>
        
        <div v-if="userStore.user" class="flex items-center space-x-4 m-20">
            <font-awesome-icon icon="fa-regular fa-user" class="fa-lg text-white" />
            <p class="text-white">{{ userStore.user.nome }}</p>
            
            <button @click="fazerLogout" class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded flex items-center">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="mr-2" />
                <span>Sair</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import LogoHeader from './LogoHeader.vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

function fazerLogout() {
    userStore.logout();
    router.push('/auth/login');
}
</script>