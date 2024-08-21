<template>
  <div class="greetings">
    <h1>
      Upload Section
    </h1>
    <h3>
      Our application is a powerful tool designed to transform CCTV data into actionable insights. By analyzing footage
      for anomalies, the tool generates visualizations like heatmaps and charts and offers a report exporter function to
      create detailed reports.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
