<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />

      <h3>Name describe your event</h3>

      <BaseInput
        class="field"
        label="Title"
        id="title"
        name="title"
        v-model="event.title"
        placeholder="Title"
      />

      <BaseInput
        class="field"
        label="Description"
        id="desc"
        name="desc"
        v-model="event.desc"
        placeholder="Add a description"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        class="field"
        label="Location"
        id="location"
        name="location"
        v-model="event.location"
        placeholder="Add a location"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label for="date">Date</label>
        <datepicker
          v-model="event.date"
          name="date"
          placeholder="Select a date"
        />
      </div>

      <BaseSelect
        class="field"
        label="Select a time"
        :options="times"
        v-model="event.time"
      />

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import nProgress from 'nprogress'

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
      nProgress.start()

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
