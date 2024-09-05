<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Project">
        <template #extra>
            <a-button @click="() => $router.push('/setting')">New Project</a-button>
        </template>
        <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'title'">
                    Project Name
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
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
import { h, ref, onMounted } from 'vue';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

const columns = [
    {
        name: 'Project Name',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Camera',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Upload Date',
        dataIndex: 'upload_date',
        key: 'date',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/project');
        if (response.status === 200) {
            data.value = response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};

onMounted(() => {
    fetchData();
});

const onDelete = key => {
    data.value = data.value.filter(item => item.key !== key);
};
</script>