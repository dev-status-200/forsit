import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Orders from '../views/Orders.vue'
import Inventory from '../views/Inventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: () => import('../views/Item.vue'),
      props:true
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory,
      props:true
    },
  ]
})

export default router
