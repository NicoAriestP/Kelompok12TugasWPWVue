import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'


//import Bootstrap, Popper, jQuery
// import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import * as Popper from "@popperjs/core"
import router from './router'

axios.defaults.baseURL = 'http://localhost:3000'
const app = createApp(App)
app.use(router)
app.mount('#app')