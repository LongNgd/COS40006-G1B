<template>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Report" @back="() => $router.push('/result')">
            <template #extra>
                <a-button type="primary" @click="download">
                    <DownloadOutlined />
                    Download
                </a-button>
            </template>
            <a-card>
                <a-flex justify="center" align="center" class="fs-1">Anomaly Report</a-flex>
                <a-descriptions title="Summarization">
                    <a-descriptions-item label="Video duration">1 min 22 sec</a-descriptions-item>
                    <a-descriptions-item label="Number of anomalies">2</a-descriptions-item>
                    <a-descriptions-item label="Type of anomalies">Fighting</a-descriptions-item>
                    <a-descriptions-item label="Most detected type">Fighting</a-descriptions-item>
                    <a-descriptions-item label="Longest duration of anomaly" :span="2">20 sec</a-descriptions-item>
                </a-descriptions>
                <a-descriptions title="Details"></a-descriptions>
                <a-table :columns="columns" :data-source="data" :pagination="false" bordered></a-table>
                <a-descriptions title="Frequency and distribution of anomolies"></a-descriptions>
                <a-card>bar-chart</a-card>
                <a-descriptions title="Suggestion">
                    <a-descriptions-item :span="3">
                        <template #label>
                            <a-badge status="error" text="Suggestion" />
                        </template>
                        Increase in number of security guards should be implemented
                    </a-descriptions-item>
                    <a-descriptions-item :span="3">
                        <template #label>
                            <a-badge status="warning" text="Suggestion" />
                        </template>
                        Increase in number of security guards should be implemented
                    </a-descriptions-item>
                </a-descriptions>
            </a-card>
        </a-page-header>
</template>
<script setup>
import { DownloadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { h } from 'vue';

const columns = [
    {
        title: 'Number',
        dataIndex: 'key',
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
    },
    {
        title: 'Anomaly type',
        dataIndex: 'type',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
    },
    {
        title: 'Participant',
        dataIndex: 'participant',
    },
    {
        title: 'Intensity Level',
        dataIndex: 'intensity',
    },
    {
        title: 'Evidence',
        dataIndex: 'evidence',
        customRender: ({ text }) => {
            return h('img', {
                src: text,
                alt: 'Evidence',
                style: 'width: 100px; height: auto;',
            });
        },
    },
];
const data = [
    {
        key: '1',
        timestamp: '2021-09-01 12:00:00',
        type: 'Fighting',
        duration: '10 sec',
        participant: '2',
        intensity: 'High',
        evidence: '/src/assets/background.png',
    },
    {
        key: '2',
        timestamp: '2021-09-01 12:00:10',
        type: 'Fighting',
        duration: '10 sec',
        participant: '2',
        intensity: 'High',
        evidence: '/src/assets/background.png',
    },
    {
        key: '3',
        timestamp: '2021-09-01 12:00:30',
        type: 'Fighting',
        duration: '20 sec',
        participant: '4',
        intensity: 'Medium',
        evidence: '/src/assets/background.png',
    },
];
const download = () => {
    message.success("Download success", 2)
};
</script>