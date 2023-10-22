<template>
  <UiInput :type="type" :step="step" v-model="modelValueProxy" @input="onInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
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
    step: [Number, String],
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
    modelValueProxy: {
      get() {
        return this.modelValue ? this.localDate[this.type] : '';
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
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
