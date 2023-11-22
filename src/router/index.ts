import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { RouteNames } from './const'
import { App } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: RouteNames.MAIN,
    redirect: '/main/index',
    children: [
      {
        path: 'index',
        name: 'main_index',
        component: () => import('@/pages/main/main.vue'),
      },
    ],
  },
  {
    path: '/menu',
    name: RouteNames.MENU,
    redirect: '/menu/index',
    children: [
      {
        path: 'index',
        name: 'menu_index',
        component: () => import('@/pages/menu/menu.vue'),
      },
    ],
  },
  //设置兜底路由
  {
    path: '/:w+',
    redirect: {
      path: '/',
    },
  },
];



export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
   // TODO
  })
  router.afterEach(() => {
    // TODO
  })
}



let router: Router
export const setupRouter = async (app: App) => {
  router = createRouter({
    history: createWebHistory('/'),
    routes,
  });

  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}

