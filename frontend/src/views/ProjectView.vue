<template>
    <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
            <a-col :span="6">
                <a-card title="Project 1" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Project 2" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Project 3" :bordered="false">
                    <p>card content</p>
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
</script>
<style scoped>
.btn-size {
    width: 100%;
    height: 100%;
    font-size: 30px;
}
</style>