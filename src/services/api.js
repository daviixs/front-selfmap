import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getProducts = async () => {
  const response = await api.get('/products')
  return response.data.products
}

export const getMapForProducts = async (productIds) => {
  const response = await api.post('/map/products', {
    product_ids: productIds
  })
  return response.data
}

export default api

