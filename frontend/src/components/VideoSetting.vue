<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
    <div class="steps-content">
      {{ steps[current].content }}
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button v-if="current == steps.length - 1" type="primary" @click="result">
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const current = ref(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
const steps = [
  {
    title: 'Upload',
    content: 'Upload Data',
  },
  {
    title: 'Configurating',
    content: 'Configurating',
  },
  {
    title: 'Visualize',
    content: 'Visualization Screen',
  },
];
const items = steps.map(item => ({
  key: item.title,
  title: item.title,
}));
const result = () => {
  router.push('/result');
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>