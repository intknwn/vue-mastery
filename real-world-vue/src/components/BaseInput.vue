<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <input v-bind="$attrs" type="text" @input="updateValue" :value="value" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
