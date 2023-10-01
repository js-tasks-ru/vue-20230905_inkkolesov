<template>
  <div class="toasts">
    <UIToast v-for="(toast, index) in toasts" :key="index" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script>
import UIToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UIToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    addToast(type, message, duration = 5000) {
      const toast = { type, message };
      this.toasts.push(toast);
      setTimeout(() => {
        this.delToast();
      }, duration);
    },
    delToast() {
      this.toasts.shift();
    },
    success(message, duration) {
      this.addToast('success', message, duration);
    },
    error(message, duration) {
      this.addToast('error', message, duration);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
