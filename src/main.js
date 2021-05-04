import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// import $ from 'jquery'
// import {messaging} from './firebase/database'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import VueFlatPickr from 'vue-flatpickr-component'

import 'materialize-css/dist/css/materialize.min.css'

// createApp(App).use(router).use(ElementPlus).mount('#app')

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(VueFlatPickr);
app.mount('#app');
