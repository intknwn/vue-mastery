<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="isPrevLinkShown"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >Previous page</router-link
    >
    <span v-if="isPrevLinkShown && isNextLinkShown"> | </span>
    <router-link
      v-if="isNextLinkShown"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="prev"
      >Next page</router-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '../components/EventCard.vue'
import store from '@/store'

const getPageEvents = async (routeTo, next) => {
  const currentPage = parseInt(routeTo.query.page) || 1

  await store.dispatch('event/fetchEvents', {
    page: currentPage,
  })

  routeTo.params.page = currentPage
  next()
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState({
      perPage: (state) => state.event.perPage,
      totalEvents: (state) => state.event.totalEvents,
      user: (state) => state.user.user,
      events: (state) => state.event.events,
    }),
    isPrevLinkShown() {
      return this.page !== 1
    },
    isNextLinkShown() {
      return this.page * this.perPage < this.totalEvents
    },
  },
}
</script>

<style lang="scss" scoped></style>
