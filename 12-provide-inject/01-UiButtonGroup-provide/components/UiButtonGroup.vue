<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiButtonGroup',

  provide() {
    return {
      buttonGroup: this,
    };
  },

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
