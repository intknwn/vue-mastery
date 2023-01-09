<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <select
      v-bind="$attrs"
      @input="updateValue"
      :value="value"
      v-on="listeners"
    >
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
import { formFieldMixin } from '../mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin],
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
