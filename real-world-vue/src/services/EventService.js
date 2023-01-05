import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
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
