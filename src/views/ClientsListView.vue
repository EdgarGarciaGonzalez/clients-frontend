<template>
  <div class="container">
    <header class="header">
      <h1>Gestió de Clients</h1>
      <router-link to="/new" class="btn-primary">+ Nou Client</router-link>
    </header>

    <input
      v-model="search"
      type="text"
      placeholder="Cerca per nom, email o empresa..."
      class="search-input"
    />

    <div v-if="store.loading" class="state">Carregant...</div>
    <div v-else-if="store.error" class="state error">{{ store.error }}</div>
    <div v-else-if="filteredClients.length === 0" class="state">
      No s'han trobat clients.
    </div>

    <div v-else class="clients-grid">
      <div v-for="client in filteredClients" :key="client.id" class="client-card">
        <div class="client-header">
          <h3>{{ client.name }}</h3>
          <button class="btn-delete" @click="handleDelete(client.id)">×</button>
        </div>
        <p class="client-email">{{ client.email }}</p>
        <p v-if="client.company" class="client-company">{{ client.company }}</p>
        <p v-if="client.phone" class="client-phone">{{ client.phone }}</p>
        <router-link :to="`/clients/${client.id}`" class="btn-detail">
          Veure detalls →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'

const store = useClientsStore()
const search = ref('')

const filteredClients = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return store.clients
  return store.clients.filter(c =>
    c.name?.toLowerCase().includes(q) ||
    c.email?.toLowerCase().includes(q) ||
    c.company?.toLowerCase().includes(q)
  )
})

async function handleDelete(id) {
  if (confirm('Segur que vols eliminar aquest client?')) {
    await store.deleteClient(id)
  }
}

onMounted(() => store.fetchClients())
</script>