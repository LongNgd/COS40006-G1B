<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import UpLoad from '../components/UpLoad.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const process = () => {
  router.push('/setting');
}
</script>

<template>
  <main>
    <HelloWorld />
    <UpLoad />
    <a-button type="primary" @click="process">Confirm</a-button>
  </main>
</template>
<style scoped>
main {
  margin: 20px;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 20px;
}
</style>