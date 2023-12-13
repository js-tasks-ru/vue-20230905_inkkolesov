<template>
  <template v-if="isPending">
    <slot name="pending"></slot>
  </template>
  <template v-else-if="isFulfilled">
    <slot name="fulfilled" :result="result"></slot>
  </template>
  <template v-else-if="isRejected">
    <slot name="rejected" :error="error"></slot>
  </template>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
      isPending: true,
      isFulfilled: false,
      isRejected: false,
    };
  },

  watch: {
    promise: {
      handler: 'handlePromiseChange',
      immediate: true,
    },
  },

  methods: {
    handlePromiseChange() {
      this.isPending = true;
      this.isFulfilled = false;
      this.isRejected = false;

      this.promise
        .then((result) => {
          this.result = result;
          this.isFulfilled = true;
        })
        .catch((error) => {
          this.error = error;
          this.isRejected = true;
        })
        .finally(() => {
          this.isPending = false;
        });
    },
  },
};
</script>
