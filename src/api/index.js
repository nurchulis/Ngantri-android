import axios from 'axios'
import { baseURL } from './data'

const api = axios.create({
  baseURL: baseURL,
})

//api.defaults.headers.common['Authorization'] = header.Authorization

export default api
