<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label for="category">Select category</label>
      <select name="category" id="category" v-model="event.category">
        <option
          v-for="category in categories"
          :value="category"
          :key="category"
        >
          {{ category }}
        </option>
      </select>

      <h3>Name describe your event</h3>
      <div class="field">
        <label for="title">Title</label>
        <input
          v-model="event.title"
          type="text"
          name="title"
          id="title"
          placeholder="Add an event title"
        />
      </div>

      <div class="field">
        <label for="desc">Description</label>
        <input
          v-model="event.desc"
          type="text"
          name="desc"
          id="desc"
          placeholder="Add a description"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label for="title">Location</label>
        <input
          v-model="event.location"
          type="text"
          name="location"
          id="location"
          placeholder="Add a location"
        />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label for="date">Date</label>
        <datepicker
          v-model="event.date"
          name="date"
          placeholder="Select a date"
        />
      </div>

      <div class="field">
        <label for="time">Select a time</label>
        <select name="time" id="time" v-model="event.time">
          <option :value="time" v-for="time in times" :key="time">
            {{ time }}
          </option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = new Array(24).fill('').map((_, index) => index + ':00')

    return {
      times,
      event: this.createEmptyEventObject(),
    }
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    async createEvent() {
      await this.$store.dispatch('event/createEvent', this.event)

      this.$router.push({
        name: 'event-show',
        params: { id: this.event.id },
      })

      this.event = this.createEmptyEventObject()
    },
    createEmptyEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 1e6)

      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        desc: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
