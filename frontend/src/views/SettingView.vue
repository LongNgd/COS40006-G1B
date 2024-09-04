<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Setting">
        <a-tabs v-model="activeKey" tabPosition="left" size="large">
            <a-tab-pane key="1">
                <template #tab>
                    <span>
                        <VideoCameraOutlined />
                        Camera
                    </span>
                </template>
                <CameraUpload />
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #tab>
                    <span>
                        <LaptopOutlined />
                        Deivce
                    </span>
                </template>
                <DeivceUpload />
            </a-tab-pane>
        </a-tabs>
    </a-page-header>
</template>
<script setup>
import { ref } from 'vue';
import { VideoCameraOutlined, LaptopOutlined } from '@ant-design/icons-vue';
import DeivceUpload from '../components/DeviceUpload.vue';
import CameraUpload from '@/components/CameraUpload.vue';
const activeKey = ref('1');
</script>