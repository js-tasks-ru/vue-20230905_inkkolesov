<template>
  <TransitionGroup :tag="tag" name="fade-list" class="fade-list">
    <slot />
  </TransitionGroup>
</template>

<script>
export default {
  name: 'UiTransitionGroupFade',

  props: {
    tag: {
      type: [String, Object, Function],
      default: 'div',
    },
  },
};
</script>

<style scoped>
::v-deep(.fade-list) {
  position: relative;
}

::v-deep(.fade-list > *) {
  opacity: 1;
  transition: opacity 13s ease-out;
}

::v-deep(.fade-list .fade-list-leave-active) {
  position: absolute !important;
  left: 0;
  right: 0;
}

::v-deep(.fade-list .fade-list-enter-from,
.fade-list .fade-list-leave-to) {
  opacity: 0;
}

::v-deep(.fade-list .fade-list-move) {
  transition: transform 4s;
}
</style>
