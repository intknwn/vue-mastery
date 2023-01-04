<template>
  <li :class="['notification', notificationTypeClass]">
    {{ notification.message }}
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timerId: null,
    }
  },
  computed: {
    notificationTypeClass() {
      return `_${this.notification.type}`
    },
  },
  methods: mapActions('notification', ['remove']),
  created() {
    this.timerId = setTimeout(() => this.remove(this.notification.id), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timerId)
  },
}
</script>

<style lang="scss" scoped>
.notification {
  padding: 1rem;
  border-radius: 0.8rem;
  color: #fff;
  background-color: #39b982;

  &._error {
    background-color: tomato;
  }
}
</style>
