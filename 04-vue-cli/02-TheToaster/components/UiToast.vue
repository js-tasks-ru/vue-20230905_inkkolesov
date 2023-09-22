<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UIToast',
  components: { UiIcon },
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <!--    <UiIcon />-->
    <span>{{ toast.message }}</span>
  </div>
</template>

<style scoped></style>
