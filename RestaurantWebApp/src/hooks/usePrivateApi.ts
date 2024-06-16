import axios from 'axios'
import localStorage from 'redux-persist/es/storage'

const token = localStorage.getItem('access_token')

export default axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: {
    common: {
      Authorization: `Bearer ${token}`
    }
  }
})
