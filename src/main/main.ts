import { createApp } from 'vue'
import 'virtual:windi.css'
import '@/assets/style/global.scss';
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
async function mountApp() {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  app.mount('#app');
}
mountApp();

mountApp()
