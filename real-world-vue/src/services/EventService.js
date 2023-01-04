import axios from 'axios'
import nProgress from 'nprogress'

const api = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  nProgress.start()
  return config
})
api.interceptors.response.use((res) => {
  nProgress.done()
  return res
})

export default {
  getEvents(perPage, page) {
    return api.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(id) {
    return api.get(`/events/${id}`)
  },
  postEvent(event) {
    return api.post('/events', event)
  },
}
