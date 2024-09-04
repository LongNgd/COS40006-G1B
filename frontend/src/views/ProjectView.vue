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
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button type="link" :icon="h(FormOutlined)" @click="() => $router.push('/result')" />
                        <a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="onDelete(record.key)">
                            <a-button danger type="link" :icon="h(DeleteOutlined)" />
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
    </a-page-header>
</template>
<script setup>
import { h, ref } from 'vue';
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
const data = ref([
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
]);
const onDelete = key => {
    data.value = data.value.filter(item => item.key !== key);
};
</script>