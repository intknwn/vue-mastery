let id = 0

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    ADD(state, notification) {
      state.notifications.push({
        ...notification,
        id: id++,
      })
    },
    REMOVE(state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      )
    },
  },
  actions: {
    add({ commit }, notification) {
      commit('ADD', notification)
    },
    remove({ commit }, id) {
      commit('REMOVE', id)
    },
  },
}
