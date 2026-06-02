<template>
  <div class="container">
    <router-link to="/" class="btn-back">← Tornar</router-link>

    <h1>Nou Client</h1>

    <div v-if="success" class="state success">Client creat correctament!</div>
    <div v-if="error" class="state error">{{ error }}</div>

    <div class="form-card">
      <div class="form-group">
        <label>Nom *</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="form-group">
        <label>Email *</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label>Telèfon</label>
        <input v-model="form.phone" type="text" />
      </div>
      <div class="form-group">
        <label>Empresa</label>
        <input v-model="form.company" type="text" />
      </div>

      <div class="form-actions">
        <button class="btn-primary" :disabled="loading" @click="submit">
          {{ loading ? 'Creant...' : 'Crear Client' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClientsStore } from '@/stores/clients'

const router = useRouter()
const store = useClientsStore()

const form = reactive({ name: '', email: '', phone: '', company: '' })
const loading = ref(false)
const success = ref(false)
const error = ref(null)

async function submit() {
  if (!form.name || !form.email) {
    error.value = 'Nom i email són obligatoris'
    return
  }
  loading.value = true
  error.value = null
  try {
    await store.createClient({ ...form })
    success.value = true
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>