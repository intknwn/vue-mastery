export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      label: String,
      default: '',
    },
    value: [String, Number],
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
