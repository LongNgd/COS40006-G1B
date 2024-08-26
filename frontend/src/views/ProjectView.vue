<template>
    <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
            <a-col :span="6">
                <a-card hoverable title="Project 1" :bordered="false" @click="project">
                    <template #extra>
                        <a-typography-text type="secondary">
                            Last saved: 2 days ago
                        </a-typography-text>
                    </template>
                    <img width="300" src="../assets/background.png" />
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card hoverable title="Project 2" :bordered="false" @click="project">
                    <template #extra>
                        <a-typography-text type="secondary">
                            Last saved: 2 days ago
                        </a-typography-text>
                    </template>
                    <img width="300" src="../assets/background.png" />
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card hoverable title="Project 3" :bordered="false" @click="project">
                    <template #extra>
                        <a-typography-text type="secondary">
                            Last saved: 2 days ago
                        </a-typography-text>
                    </template>
                    <img width="300" src="../assets/background.png" />
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-button class="btn-size">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                </a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const project = () => {
    router.push('/result');
}
</script>
<style scoped>
.btn-size {
    width: 100%;
    height: 100%;
    font-size: 30px;
}
</style>