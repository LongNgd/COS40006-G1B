<script setup>
import { SettingOutlined, UploadOutlined, DesktopOutlined, FileDoneOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <div>
    <div class="hero_area">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="center-content">
              <h1>
                Data Visualization Tool
              </h1>
              <a-button type="primary" @click="() => $router.push('/setting')">Get Started</a-button>
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