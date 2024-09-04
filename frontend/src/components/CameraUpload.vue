<template>
    <a-card title="Camera Upload">
        <template #extra>
            <a-date-picker v-model="date" :format="dateFormatList" />
        </template>
        <a-cascader v-model="value" :options="options" placeholder="Please select" />
        <a-flex>
            <a-space size="middle">
                <a-card>
                    <p>Card content</p>
                </a-card>
                <a-card>
                    <p>Card content</p>
                </a-card>
            </a-space>
        </a-flex>
        <a-button type="primary">Process</a-button>
    </a-card>
</template>
<script setup>
import dayjs from 'dayjs';
import { ref } from 'vue';

const dateFormatList = 'DD/MM/YYYY';
const date = ref(dayjs(dateFormatList));

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
    },
    {
        value: 'hangzhou',
        label: 'Hangzhou',
    },
    {
        value: 'xihu',
        label: 'West Lake',
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
    },
    {
        value: 'nanjing',
        label: 'Nanjing',
    },
    {
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
    },
];
const value = ref(['zhejiang']);
</script>