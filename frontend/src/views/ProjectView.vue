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
                        <a-button type="link" :icon="h(FormOutlined)" @click="projectDetail(record.title)" />
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
import { h, ref, onMounted, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
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
        key: 'upload_date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
];

const userId = ref(JSON.parse(localStorage.getItem('user')).user_id);
const route = useRouter();
const emit = defineEmits(['getVideo']);

const data = ref([]);
onMounted(async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/project/getProjectById', {
            user_id: userId.value,
        });
        if (response.status === 200) {
            // console.log(response.data.data);
            data.value = response.data.data;
        }
    } catch (error) {
        console.log(error.message);
    }
});

const projectDetail = e => {
    route.push('/result')
    emit('getVideo', e);
};

const onDelete = key => {
    data.value = data.value.filter(item => item.key !== key);
};
</script>