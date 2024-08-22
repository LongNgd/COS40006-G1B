<template>
    <div class="p-3">
        <a-steps :current="current" :items="items"></a-steps>
        <a-card class="my-3">
            <component :is="steps[current].content" />
        </a-card>
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
import { ref, h } from 'vue';
import { useRouter } from 'vue-router';
import Upload from '../components/UploadVideo.vue';

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
        content: h(Upload),
    },
    {
        title: 'Configuration',
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