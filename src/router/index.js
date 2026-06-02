import { createRouter, createWebHistory } from 'vue-router'
import ClientsListView from '@/views/ClientsListView.vue'
import ClientDetailView from '@/views/ClientDetailView.vue'
import CreateClientView from '@/views/CreateClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'list', component: ClientsListView },
    { path: '/clients/:id', name: 'detail', component: ClientDetailView },
    { path: '/new', name: 'new', component: CreateClientView }
  ]
})

export default router