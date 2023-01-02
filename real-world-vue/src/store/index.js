import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'asdde12e', name: 'Barbra Joan Streisand' },
    events: [
      {
        id: 1,
        title: '...',
        organizer: '...',
      },
      {
        id: 2,
        title: '...',
        organizer: '...',
      },
      {
        id: 3,
        title: '...',
        organizer: '...',
      },
      {
        id: 4,
        title: '...',
        organizer: '...',
      },
      {
        id: 5,
        title: '...',
        organizer: '...',
      },
    ],
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    event: null,
  },
  actions: {
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event)
        commit('ADD_EVENT', event)
      } catch {
        console.log('There is a problem creating an event')
      }
    },
    async fetchEvents({ commit }, { perPage, page }) {
      try {
        const { data, headers } = await EventService.getEvents(perPage, page)
        commit('SET_EVENTS', data)
        const totalEvents = parseInt(headers['x-total-count'])
        commit('SET_TOTAL_EVENTS', totalEvents)
      } catch {
        console.log('Something went wrong while fetching events')
      }
    },
    async fetchEventById({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
        return
      }

      try {
        const { data } = await EventService.getEvent(id)
        commit('SET_EVENT', data)
      } catch {
        console.log('Something went wrong while fetching event by ID')
      }
    },
  },
  getters: {
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
    categoriesLength: (state) => state.categories.length,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
  },
  modules: {},
})
