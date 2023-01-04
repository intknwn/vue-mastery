<template>
  <ul class="notification-bar">
    <transition-group name="fade">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import NotificationItem from './NotificationItem.vue'

export default {
  components: {
    NotificationItem,
  },
  computed: mapState('notification', ['notifications']),
}
</script>

<style lang="scss" scoped>
.notification-bar {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
