<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="currentPage !== 1"
      :to="{ name: 'event-list', query: { page: currentPage - 1 } }"
      rel="prev"
      >Previous page</router-link
    >
    |
    <router-link
      v-if="currentPage * perPage < totalEvents"
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
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.currentPage,
    })

    console.log(this.totalEvents)
  },
  computed: {
    ...mapState(['events', 'totalEvents']),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
