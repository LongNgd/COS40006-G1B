<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <header>
      <NavBar></NavBar>
    </header>

    <RouterView />
  </div>
</template>
