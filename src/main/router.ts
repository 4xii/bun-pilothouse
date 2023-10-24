import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/index',
    children: [
      {
        path: 'index',
        name: 'main_index',
        component: () => import('@/pages/main/main.vue'),
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


const router = createRouter({
  history: createWebHistory('/'),
  routes,
});


export default router;
