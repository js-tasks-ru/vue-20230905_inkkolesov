<template>
  <div class="toasts">
    <UIToast v-for="(toast, index) in toasts" :key="index" :toast="toast" />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UIToast from './UiToast.vue';
import index from 'vuex';

export default {
  name: 'TheToaster',

  components: { UIToast, UiIcon },

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
        this.delToast(toast);
      }, duration);
    },
    delToast(unsettedToast) {
      this.toasts = this.toasts.filter((toast) => toast !== unsettedToast);
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

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
