import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import router from './router'

createApp(App).use(router).mount('#app')