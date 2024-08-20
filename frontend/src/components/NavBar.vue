<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <ul class="nav justify-content-between align-items-center bg-white border-bottom">
    <li class="nav-item mx-3">
      <img src="../assets/FPT-logo.png" alt="Logo" class="nav-logo" />
    </li>
    <div class="d-flex">
      <li class="nav-item">
        <RouterLink class="nav-link align-center" to="/">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link align-center" to="/project">Projects</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link align-center pe-0" to="/login"><button type="button"
            class="btn btn-primary">Login</button></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link align-center me-3" to="/register"><button type="button"
            class="btn btn-secondary">Register</button></RouterLink>
      </li>
    </div>
  </ul>
</template>
