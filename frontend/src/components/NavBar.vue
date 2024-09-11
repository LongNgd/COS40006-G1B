<template>
    <div class="container-fluid bg-black">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
            <img alt="Vue logo" src="@/assets/swinburne.png" width="120" height="60" />

            <div class="d-flex ml-auto align-items-center">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/project">Project</RouterLink>
                    </li>
                    <li v-if="props.checkauth" class="nav-item">
                        <a-dropdown>
                            <a class="ant-dropdown-link nav-link" @click.prevent>
                                Hello, User
                            </a>
                            <template #overlay>
                                <a-menu @click="logout">
                                    <a-menu-item key="1">
                                        <LogoutOutlined />
                                        Logout
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </li>
                    <li v-if="!props.checkauth" class="nav-item">
                        <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    </li>
                    <li v-if="!props.checkauth" class="nav-item">
                        <RouterLink class="nav-link" to="/register">Register</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { LogoutOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const props = defineProps({
    checkauth: Boolean,
});

const emit = defineEmits(['authenticated']);

const route = useRouter();

const logout = () => {
    localStorage.clear();
    emit('logout', false);
    message.success('Logout successful');
    route.push('/');
}
</script>