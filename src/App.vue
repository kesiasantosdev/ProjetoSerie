<template>
  <div>
    <router-view/>
  </div>
  
</template>

<script>
import AuthView from './Views/AuthView.vue';
export default{
  components:{
    AuthView,
  }
}
</script>
