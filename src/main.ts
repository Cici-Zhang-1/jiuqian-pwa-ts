import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import Framework7 from 'framework7/lite'
import Framework7Vue from 'framework7-vue'
import 'framework7/css'

Framework7.use(Framework7Vue)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
