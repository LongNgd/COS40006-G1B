<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Project">
        <template #extra>
            <a-button @click="() => $router.push('/setting')">New Project</a-button>
        </template>
        <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                    Name
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>
                        {{ record.name }}
                    </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="tag in record.tags" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>
                            <DeleteOutlined />
                        </a>
                        <a>
                            <FormOutlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </a-page-header>
</template>
<script setup>
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
const columns = [
    {
        name: 'Project Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Camera',
        dataIndex: 'camera',
        key: 'camera',
    },
    {
        title: 'Upload Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Action',
        key: 'action',
    },
];
const data = [
    {
        key: '1',
        name: 'project1',
        camera: 'camera1',
        date: '2021-10-10',
    },
    {
        key: '2',
        name: 'project2',
        camera: 'camera1',
        date: '2021-10-10',
    },
    {
        key: '3',
        name: 'project3',
        camera: 'camera1',
        date: '2021-10-10',
    },
    {
        key: '4',
        name: 'project4',
        camera: 'camera1',
        date: '2021-10-10',
    },
];
</script>