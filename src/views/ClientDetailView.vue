<template>
  <div class="container">
    <router-link to="/" class="btn-back">← Tornar</router-link>

    <div v-if="loading" class="state">Carregant...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else-if="client" class="detail-card">
      <h1>{{ client.name }}</h1>
      <dl>
        <dt>Email</dt><dd>{{ client.email }}</dd>
        <dt>Telèfon</dt><dd>{{ client.phone || '—' }}</dd>
        <dt>Empresa</dt><dd>{{ client.company || '—' }}</dd>
        <dt>Creat</dt><dd>{{ formatDate(client.createdAt) }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { clientsApi } from '@/services/api'

const route = useRoute()
const client = ref(null)
const loading = ref(true)
const error = ref(null)

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleString('ca-ES')
}

onMounted(async () => {
  try {
    client.value = await clientsApi.getById(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>