import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const cleanError = {
      message: 'Hi ha hagut un error inesperat',
      status: null,
      isNetworkError: false
    }

    if (!error.response) {
      cleanError.isNetworkError = true
      cleanError.message = 'No s\'ha pogut connectar amb el servidor'
      return Promise.reject(cleanError)
    }

    cleanError.status = error.response.status
    const data = error.response.data
    if (data && typeof data === 'object' && typeof data.message === 'string') {
      cleanError.message = data.message
    }
    if (error.response.status === 404) cleanError.message = 'Client no trobat'
    if (error.response.status >= 500) cleanError.message = 'Error del servidor'

    return Promise.reject(cleanError)
  }
)

export const clientsApi = {
  getAll: () => apiClient.get('/clients').then(r => r.data),
  getById: (id) => apiClient.get(`/clients/${id}`).then(r => r.data),
  create: (data) => apiClient.post('/clients', data).then(r => r.data),
  update: (id, data) => apiClient.put(`/clients/${id}`, data).then(r => r.data),
  delete: (id) => apiClient.delete(`/clients/${id}`).then(r => r.data)
}

export default apiClient