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
  computed: {
    message() {
      return this.toast.message;
    },
    toastClass() {
      return `toast toast_${this.toast.type}`;
    },
    iconClass() {
      return `${this.toast.type === 'success' ? 'check-circle' : 'alert-circle'}`;
    },
  },
};
</script>

<template>
  <div class="toast" :class="toastClass">
        <UiIcon class="toast__icon" :icon="iconClass"/>
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
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
