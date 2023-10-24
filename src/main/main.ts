import { createApp } from 'vue'
import 'virtual:windi.css'
import '@/assets/style/global.scss';
import App from './App.vue'
// @ts-ignore
import { Plugin as VideoBackGroundPlayerPlugin} from 'vue-responsive-video-background-player'
import { createPinia } from 'pinia';
import router from './router';
async function mountApp() {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  app.use(VideoBackGroundPlayerPlugin);
  app.mount('#app');
}
mountApp();

mountApp()
