<template>
  <div class="container bg-white rounded py-3 col-lg-7" id="register">
    <h1 class="text-center">Create an account</h1>
    <form @submit="register">
      <label class="form-label" for="username">User Name</label>
      <input class="form-control" type="text" id="username" v-model="username" placeholder="User Name" required>

      <label class="form-label" for="mail">Email</label>
      <input class="form-control" type="email" id="mail" v-model="email" placeholder="Email" required>

      <label class="form-label" for="pwd">Password</label>
      <input class="form-control" type="password" id="pwd" v-model="password" placeholder="Password" required>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-outline-primary mt-3"> Create Account </button>
        <RouterLink to="/" class="btn btn-outline-primary mt-3"> Back to Homepage </RouterLink>
      </div>

      <div class="d-flex justify-content-around">
        <RouterLink to="/login">Already Have Account? Login Now</RouterLink>
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
const username = ref('');
const email = ref('');
const password = ref('');

const register = async (e) => {
  e.preventDefault();
  try {
    // Make a POST request to your register API endpoint
    const response = await axios.post('http://localhost:5000/api/user/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    // Check if the register was successful
    if (response.data.success) {
      message.success('Register successful');
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response));
      router.push('/setting');
    } else {
      message.error('Invalid email or password');
    }
  } catch (error) {
    message.error('Regiester failed: ' + error.message);
  }
};
</script>
