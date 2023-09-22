<template>
  <Transition name="fade" mode="out-in">
    <slot />
  </Transition>
</template>

<script>
export default {
  name: 'UiTransitionFade',
};
</script>

<style>
/* _transitions.css */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
