<template>
  <a-row justify="center">
    <a-card title="Login" style="width: 700px">
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="Email" name="email">
          <a-input v-model="formState.email">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password">
          <a-input-password v-model="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          Or
          <RouterLink class="menu" to="/register">register now!</RouterLink>
        </a-form-item>
      </a-form>
    </a-card>
  </a-row>
</template>

<script setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const formState = reactive({
  email: '',
  password: '',
  remember: true,
});

const onFinish = async () => {
  try {
    // Make a POST request to your login API endpoint
    const response = await axios.post('http://localhost:5000/api/login', {
      email: "test@gmail.com",
      password: "newpassword",
    });

    // Check if the login was successful
    if (response.data.success) {
      message.success('Login successful');
      router.push('/setting');
    } else {
      message.error('Invalid email or password');
    }
  } catch (error) {
    message.error('Login failed: ' + error.message);
  }
};

const onFinishFailed = () => {
  message.error('Login failed');
};
</script>
