<template>
  <slot v-if="state === 'pending'" name="pending" />
  <slot v-else-if="state === 'fulfilled'" name="fulfilled" :result="result" />
  <slot v-else-if="state === 'rejected'" name="rejected" :error="error" />
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
      state: 'pending',
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
      this.result = null;
      this.error = null;
      this.state = 'pending';

      this.promise
        .then((result) => {
          this.result = result;
          this.state = 'fulfilled';
        })
        .catch((error) => {
          this.error = error;
          this.state = 'rejected';
        });
    },
  },
};
</script>
