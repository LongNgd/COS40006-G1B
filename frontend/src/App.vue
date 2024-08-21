<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header class="banner">
      <img alt="Vue logo" src="@/assets/logo.svg" width="100" height="100" />

      <nav>
        <RouterLink class="menu" to="/">Home</RouterLink>
        <RouterLink class="menu" to="/login">Login</RouterLink>
        <RouterLink class="menu" to="/register">Register</RouterLink>
      </nav>
    </header>
    <a-divider />
    <RouterView />
  </div>
</template>
<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

nav {
  display: flex;
  gap: 20px;
}

.menu {
  font-size: 1.2rem;
  text-decoration: none;
  color: black;
}
</style>