<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="isPrevLinkShown"
      :to="{ name: 'event-list', query: { page: currentPage - 1 } }"
      rel="prev"
      >Previous page</router-link
    >
    <span v-if="isPrevLinkShown && isNextLinkShown"> | </span>
    <router-link
      v-if="isNextLinkShown"
      :to="{ name: 'event-list', query: { page: currentPage + 1 } }"
      rel="prev"
      >Next page</router-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '../components/EventCard.vue'

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      perPage: 3,
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.currentPage,
    })
  },
  computed: {
    ...mapState({
      totalEvents: (state) => state.event.totalEvents,
      user: (state) => state.user.user,
      events: (state) => state.event.events,
    }),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    isPrevLinkShown() {
      return this.currentPage !== 1
    },
    isNextLinkShown() {
      return this.currentPage * this.perPage < this.totalEvents
    },
  },
}
</script>

<style lang="scss" scoped></style>
