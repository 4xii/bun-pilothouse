/** vue core */
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue'
/** vue core */

/** Component */
// @ts-ignore
import { Plugin as VideoBackGroundPlayerPlugin} from 'vue-responsive-video-background-player'
/** Component */

// @ts-ignore
import { MotionPlugin } from '@vueuse/motion'


/** CSS */
import '@/assets/style/global.scss';

// https://windicss.org/
import 'virtual:uno.css'
/** CSS */

async function mountApp() {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  app.use(VideoBackGroundPlayerPlugin);
  app.use(MotionPlugin);
  app.mount('#app');
}
mountApp();
