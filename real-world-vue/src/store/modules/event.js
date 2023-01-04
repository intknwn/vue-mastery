import EventService from '../../services/EventService'

export default {
  namespaced: true,
  state: {
    event: null,
    events: [],
    totalEvents: null,
  },
  actions: {
    async createEvent({ commit, dispatch }, event) {
      try {
        await EventService.postEvent(event)
        commit('ADD_EVENT', event)
        dispatch(
          'notification/add',
          {
            type: 'success',
            message: `The event "${event.title}" has been successfully created"`,
          },
          { root: true }
        )
      } catch (err) {
        dispatch(
          'notification/add',
          {
            type: 'error',
            message: `Something went wrong while creating an event: ${err.message}`,
          },
          { root: true }
        )
      }
    },
    async fetchEvents({ commit, dispatch }, { perPage, page }) {
      try {
        const { data, headers } = await EventService.getEvents(perPage, page)
        commit('SET_EVENTS', data)
        const totalEvents = parseInt(headers['x-total-count'])
        commit('SET_TOTAL_EVENTS', totalEvents)
      } catch (err) {
        dispatch(
          'notification/add',
          {
            type: 'error',
            message: `Something went wrong while fetching events: ${err.message}`,
          },
          { root: true }
        )
      }
    },
    async fetchEventById({ commit, getters, dispatch }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
        return
      }

      try {
        const { data } = await EventService.getEvent(id)
        commit('SET_EVENT', data)
      } catch (err) {
        dispatch(
          'notification/add',
          {
            type: 'error',
            message: `Something went wrong while fetching an event: ${err.message}`,
          },
          { root: true }
        )
      }
    },
  },
  getters: {
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
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
}
