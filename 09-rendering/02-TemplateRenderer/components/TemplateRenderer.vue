<script>
import { compile, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    vComponent() {
      return {
        name: 'vTemplateRenderer',
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
        components: this.components,
        template: this.template,
      };
    },
  },

  render() {
    return h(this.vComponent, { bindings: this.bindings });
  },
};
</script>
