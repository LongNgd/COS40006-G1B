<template>
  <a-row justify="center">
    <a-card title="Register" style="width: 700px">
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="Username" name="username">
          <a-input v-model="formState.username">
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
        <a-form-item label="Confirm Password" name="cpassword">
          <a-input-password v-model="formState.cpassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Register
          </a-button>
          Already have an account? <RouterLink class="menu" to="/login">login now!</RouterLink>
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

const router = useRouter();
const formState = reactive({
  username: '',
  password: '',
  cpassword: '',
  remember: true,
});
const onFinish = () => {
  message.success('login success');
  router.push('/setting');
};
const onFinishFailed = () => {
  message.error('login failed');
};
</script>