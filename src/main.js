import { createApp } from 'vue'
import App from './App.vue'
import vSelect from "vue-select";

import './index.css'
import "vue-select/dist/vue-select.css";



const app = createApp(App);
app.component("v-select", vSelect);
app.mount('#app');

// createApp(App).mount('#app')