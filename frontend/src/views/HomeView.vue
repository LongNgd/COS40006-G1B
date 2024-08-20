<script setup>
import TheWelcome from '../components/NavBar.vue'
</script>

<template>
  <main>
    <div id="home" class="d-flex justify-content-center align-items-center">
      <div class="bg-white rounded-3 px-5 py-3">
        <h2>Upload section</h2>
        <p>
          Our application is a powerful tool designed to transform CCTV data into insights. By
          analyzing footage for anomalies, the tool generates visualization like heatmaps and charts
          and offers a report exporter function to create detailed reports.
        </p>
        <div id="browse-file" class="bg-secondary my-4 mx-auto"></div>
      </div>
    </div>
  </main>
</template>
