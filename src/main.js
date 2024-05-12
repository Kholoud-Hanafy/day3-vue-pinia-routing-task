import { createApp } from 'vue'
import router from './routers/index'
import {createPinia} from 'pinia'
// import App from './App.vue'
import WrapperComponent from './WrapperComponent.vue'
const pinia = createPinia();
createApp(WrapperComponent).use(router).use(pinia).mount('#app')
