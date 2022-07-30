import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/navbar',
    component: () => import('@/views/navigation'),
    children: [
      {
        path: '/navbar/navigation',
        component: () => import('@/views/workBench')
      },
      {
        path: 'outbound',
        component: () => import('@/views/outbound')
      },
      {
        // 查看详情
        path: 'CheckDetails',
        component: () => import('@/views/outbound/CheckDetails')
      },
      {
        // 仓库管理
        path: 'Warehouse',
        component: () => import('@/views/Warehouse')
      },
      {
        path: 'editPage',
        component: () => import('@/views/Warehouse/editPage')
      }, {
        path: 'addWareHouse',
        component: () => import('@/views/Warehouse/addWareHouse')
      },
      {
        path: 'reservoir',
        component: () => import('@/views/Reservoir')
      },
      {
        path: 'addReservoir',
        component: () => import('@/views/Reservoir/addReservoir')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
