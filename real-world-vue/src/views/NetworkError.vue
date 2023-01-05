<template>
  <div>
    <h1>Oh no!</h1>
    <p>Looks like there's a network issue. Please try again.</p>
    <router-link :to="{ name: 'event-list' }">Back to the homepage</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
