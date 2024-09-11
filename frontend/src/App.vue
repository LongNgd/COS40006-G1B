<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted, ref } from 'vue';

const authenticated = ref(false);


onMounted(() => {
  const userData = localStorage.getItem('user');
  authenticated.value = userData !== null;
});

const setAuthenticated = (status) => {
  authenticated.value = status;
}

</script>

<template>
  <div>
    <NavBar @logout="setAuthenticated" :checkauth="authenticated" />
    <RouterView @authenticated="setAuthenticated" />
  </div>
</template>