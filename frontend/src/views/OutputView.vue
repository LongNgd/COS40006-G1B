<template>
    <a-page-header title="Result" @back="() => $router.push('/setting')">
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
import { VuePlayer } from '@display-studio/vue-player'
import ControlVideo from '@/components/video-player/ControlVideo.vue';
import { message } from 'ant-design-vue';

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