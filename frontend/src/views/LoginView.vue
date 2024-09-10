<template>
  <div class="container bg-white rounded py-3 col-lg-7" id="login">
    <h1 class="text-center">Login</h1>
    <form @submit="login">
      <label class="form-label" for="email">Email</label>
      <input type="text" class="form-control" id="email" v-model="email" placeholder="Email" required>

      <label class="form-label" for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-outline-primary mt-3"> Login </button>
        <RouterLink to="/" class="btn btn-outline-primary mt-3"> Back to Homepage </RouterLink>
      </div>

      <div class="d-flex justify-content-around">
        <RouterLink to="/register">Don't have account yet? Register Now</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');

const login = async (e) => {
  e.preventDefault();
  try {
    // Make a POST request to your login API endpoint
    const response = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value,
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
</script>
