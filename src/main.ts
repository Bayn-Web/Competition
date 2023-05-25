import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from "./router/index"
import { createPinia } from "pinia"
import Particles from 'particles.vue3'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
const app = createApp(App).use(ElementPlus).use(router).use(Particles).use(createPinia().use(piniaPluginPersistedstate)).use(UndrawUi)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')