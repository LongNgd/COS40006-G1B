<template>
    <a-upload
      v-model="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <LoadingOutlined v-if="loading"/>
        <PlusOutlined v-else/>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const fileList = ref([]);
  const loading = ref(false);
  const imageUrl = ref('');
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, base64Url => {
        imageUrl.value = base64Url;
        loading.value = false;
      });
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
  };
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  </script>