import 'bootstrap'
import './assets/main.css'
import 'ant-design-vue/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(Antd)
app.use(router)

app.mount('#app')
