<template>
    <a-page-header title="Result" @back="() => $router.go(-1)">
        <a-flex justify="center">
            <VuePlayer class="vue-player" :sources="sources" :togglePlayOnClick="true" :loop="true">
                <ControlVideo />
            </VuePlayer>
        </a-flex>
        <a-flex justify="space-around" class="pt-3">
            <a-button @click="save" type="primary">Save Project</a-button>
            <a-button @click="() => $router.push('/report')">Generate Report</a-button>
        </a-flex>
    </a-page-header>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import axios from 'axios';

import { VuePlayer } from '@display-studio/vue-player'
import ControlVideo from '@/components/video-player/ControlVideo.vue';

const videopath = ref("");
const route = useRoute();
const projectId = route.params.project_id;

onMounted(async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/project/getVideo', {
            title: projectId,
        });
        console.log(response.data.file_path);
        if (response.status === 200) {
            videopath.value = response.data.file_path;
        }

    } catch (error) {
        console.log(error.message);
    }
});

const sources = [
    {
        src: './violence.mp4',
        type: 'video/mp4',
    }
]

const save = () => {
    message.success("Saved", 2)
};
</script>