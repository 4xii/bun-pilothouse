/** vue core */
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue'
/** vue core */

/** Component */
// @ts-ignore
import { Plugin as VideoBackGroundPlayerPlugin} from 'vue-responsive-video-background-player'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
/** Component */

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
  app.use(PerfectScrollbar, {
    watchOptions: true,
    options: {
      suppressScrollX: true
    }
  })
  app.mount('#app');
}
mountApp();

mountApp()
