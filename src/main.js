import { createApp } from 'vue'
import App from './App.vue'


//import Bootstrap, Popper, jQuery
// import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.mount('#app')