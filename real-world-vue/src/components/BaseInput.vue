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
import { formFieldMixin } from '../mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin],
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
