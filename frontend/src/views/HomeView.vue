<template>
  <div>
    <div class="hero_area">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="center-content">
              <a-typography-title>Data Visualization Tool</a-typography-title>
              <a-button type="primary" @click="getStarted">Get Started</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="how_section pt-3">
      <div class="heading_container">
        <h2>
          How It works ?
        </h2>
      </div>
      <div class="how_container">
        <div class="box">
          <div class="img-box">
            <UploadOutlined />
          </div>
          <div class="detail-box">
            <h5>
              Upload Video Data
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
        </div>
        <div class="box">
          <div class="img-box">
            <SettingOutlined />
          </div>
          <div class="detail-box">
            <h5>
              Configuration
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
        </div>
        <div class="box">
          <div class="img-box">
            <DesktopOutlined />
          </div>
          <div class="detail-box">
            <h5>
              Display Screen
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
        </div>
        <div class="box">
          <div class="img-box">
            <FileDoneOutlined />
          </div>
          <div class="detail-box">
            <h5>
              Export Report
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid footer_section">
      <p>
        &copy; 2024 All Rights Reserved By Group 1B
      </p>
    </section>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { SettingOutlined, UploadOutlined, DesktopOutlined, FileDoneOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const route = useRouter();

const props = defineProps({
  checkauth: Boolean,
});

const getStarted = () => {
  if (!props.checkauth) {
    route.push('/login');
    message.warning('You must login first', 2);
  } else {
    route.push('/setting');
  }
}
</script>