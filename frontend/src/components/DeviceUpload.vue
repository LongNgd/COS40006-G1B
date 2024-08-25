<template>
  <a-card title="Device Upload">
    <div class="greetings">
      Our application is a powerful tool designed to transform CCTV data into actionable insights. By analyzing
      footage
      for anomalies, the tool generates visualizations like heatmaps and charts and offers a report exporter function
      to
      create detailed reports.
    </div>
    <div class="clearfix">
      <a-upload v-model="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
        @preview="handlePreview">
        <div v-if="fileList.length < 2">
          <PlusOutlined />
          <div>Upload</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
      <a-button type="primary" @click="result">
        Execute
      </a-button>
    </div>
  </a-card>
</template>
<script setup>
import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([]);
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const router = useRouter();
const result = () => {
  router.push('/result');
};
</script>