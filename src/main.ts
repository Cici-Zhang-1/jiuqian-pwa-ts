import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import Framework7 from 'framework7/lite/bundle'
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle'
import 'framework7/css/bundle'
import 'framework7-icons'

Framework7.use(Framework7Vue)

const app = createApp(App)

app.use(createPinia())
app.use(router)

registerComponents(app)

app.mount('#app')
