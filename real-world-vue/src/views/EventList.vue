<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '../components/EventCard.vue'

export default {
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('fetchEvents')
  },
  computed: mapState(['events']),
}
</script>

<style lang="scss" scoped></style>
