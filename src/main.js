import './assets/style.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(createStore())
app.use(router)

app.mount('#app')
