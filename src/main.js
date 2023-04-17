import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from "./router";


//import Bootstrap, Popper, jQuery
// import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

axios.defaults.baseURL = 'http://localhost:3000'
const app = createApp(App)

app.use(router).mount('#app')