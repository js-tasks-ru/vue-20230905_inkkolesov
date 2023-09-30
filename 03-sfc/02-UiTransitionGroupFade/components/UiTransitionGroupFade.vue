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

<style>
/* _transitions.css */

.fade-list {
  position: relative;
}

::v-global(.fade-list > *) {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

::v-global(.fade-list .fade-list-leave-active) {
  position: absolute !important;
  left: 0;
  right: 0;
}

::v-global(.fade-list .fade-list-enter-from),
::v-global(.fade-list .fade-list-leave-to) {
  opacity: 0;
}

::v-global(.fade-list .fade-list-move) {
  transition: transform 4s;
}
</style>
