<template>
  <UiInput :type="type" :step="step" v-model="modelValueProxy" @input="onInput">
    <template #left-icon>
      <slot name="left-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  components: {
    UiInput,
  },
  name: 'UiInputDate',
  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: [Number, null],
      default: null,
    },
    step: String,
  },
  computed: {
    dateISO() {
      return new Date(this.modelValue).toISOString();
    },
    localDate() {
      return {
        date: this.dateISO.substring(0, 10),
        time: this.dateISO.substring(11, 16),
        'datetime-local': this.dateISO.substring(0, 16),
      };
    },
    modelValueProxy() {
      return this.modelValue ? this.localDate[this.type] : '';
    },
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
  emits: ['update:modelValue'],
};
</script>
