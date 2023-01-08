<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <select v-bind="$attrs" @input="updateValue" :value="value">
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    options: {
      type: Array,
      required: true,
    },
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
