<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />

      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name describe your event</h3>

      <BaseInput
        class="field"
        label="Title"
        id="title"
        name="title"
        v-model="event.title"
        placeholder="Title"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />

      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        class="field"
        label="Description"
        id="desc"
        name="desc"
        v-model="event.desc"
        placeholder="Add a description"
        @blur="$v.event.desc.$touch()"
        :class="{ error: $v.event.desc.$error }"
      />

      <template v-if="$v.event.desc.$error">
        <p v-if="!$v.event.desc.required" class="errorMessage">
          Description is required.
        </p>
      </template>

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
          id="date"
          placeholder="Select a date"
          @closed="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        class="field"
        label="Select a time"
        :options="times"
        v-model="event.time"
        @focusin.native="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.anyError"
        >Submit</BaseButton
      >

      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required fields
      </p>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import nProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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

      this.$v.$touch()
      if (this.$v.$invalid) {
        nProgress.done()
        return
      }

      await this.$store.dispatch('event/createEvent', this.event)

      this.$router.push({
        name: 'event-show',
        params: { id: this.event.id },
      })

      this.event = this.createEmptyEventObject()
    },
    log() {
      console.log('hi')
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
  validations: {
    event: {
      category: { required },
      title: { required },
      desc: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
