<script setup>
import { h } from 'vue'
import { useVuePlayer } from '@display-studio/vue-player'
import { CaretRightOutlined, PauseOutlined, AudioMutedOutlined, AudioOutlined } from '@ant-design/icons-vue'

const { playing, togglePlay, toggleMute, videoMuted, percentagePlayed, seekToPercentage, convertTimeToDuration, time, duration } = useVuePlayer()
</script>

<template>
    <a-flex justify="space-between" align="center">
        <div>{{ convertTimeToDuration(time) }} / {{ convertTimeToDuration(duration) }}</div>
        <input type="range" min="0" max="100" step="1" :value="percentagePlayed.toFixed(1)" class="video-duration"
            @input="(e) => seekToPercentage(e.target.value)" />
        <a-button @click="togglePlay()" :icon="h(playing ? PauseOutlined : CaretRightOutlined)" shape="circle"></a-button>
        <a-button @click="toggleMute()" :icon="h(videoMuted ? AudioMutedOutlined : AudioOutlined)" shape="circle"></a-button>
    </a-flex>
</template>

<style scoped>
.video-duration {
    width: 70%;
}
</style>