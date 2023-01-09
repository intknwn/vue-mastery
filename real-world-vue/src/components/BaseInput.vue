<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <input
      v-bind="$attrs"
      type="text"
      :value="value"
      @input="updateValue"
      v-on="listeners"
    />
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
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      }
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
