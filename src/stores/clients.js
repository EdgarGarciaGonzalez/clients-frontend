import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { clientsApi } from '@/services/api'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])
  const loading = ref(false)
  const error = ref(null)

  const totalClients = computed(() => clients.value.length)

  async function fetchClients() {
    loading.value = true
    error.value = null
    try {
      const data = await clientsApi.getAll()
      clients.value = Array.isArray(data) ? data : []
    } catch (err) {
      error.value = err.message || 'Error carregant clients'
      clients.value = []
    } finally {
      loading.value = false
    }
  }

  async function createClient(payload) {
    error.value = null
    try {
      const created = await clientsApi.create(payload)
      if (created && created.id) clients.value.push(created)
      return created
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function deleteClient(id) {
    error.value = null
    try {
      await clientsApi.delete(id)
      clients.value = clients.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return { clients, loading, error, totalClients, fetchClients, createClient, deleteClient }
})