import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../src/style/index.scss'
import ElementPlus from 'element-plus'
const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
