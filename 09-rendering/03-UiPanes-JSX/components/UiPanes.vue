<!--<template>-->
<!--  <div class="panes">-->
<!--    &lt;!&ndash;  Pane 0 &ndash;&gt;-->
<!--    <div class="pane">-->
<!--      <div class="pane__content">-->
<!--        &lt;!&ndash; Определяем, какой именно слот рендерить по массиву порядка панелей &ndash;&gt;-->
<!--        <slot :name="`pane-${panes[0]}`" />-->
<!--      </div>-->
<!--      <div class="pane__controls">-->
<!--        &lt;!&ndash; Скрываем кнопку классом pane__disabled-button &ndash;&gt;-->
<!--        <UiButton class="pane__disabled-button" variant="secondary" block @click="up(0)">-->
<!--          Up-->
<!--        </UiButton>-->
<!--        <UiButton variant="danger" block @click="down(0)"> Down</UiButton>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;  Pane 1 &ndash;&gt;-->
<!--    <div class="pane">-->
<!--      <div class="pane__content">-->
<!--        <slot :name="`pane-${panes[1]}`" />-->
<!--      </div>-->
<!--      <div class="pane__controls">-->
<!--        <UiButton variant="secondary" block @click="up(1)"> Up</UiButton>-->
<!--        <UiButton variant="danger" block @click="down(1)"> Down</UiButton>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;  Pane 2 &ndash;&gt;-->
<!--    <div class="pane">-->
<!--      <div class="pane__content">-->
<!--        <slot :name="`pane-${panes[2]}`" />-->
<!--      </div>-->
<!--      <div class="pane__controls">-->
<!--        <UiButton variant="secondary" block @click="up(2)"> Up</UiButton>-->
<!--        <UiButton class="pane__disabled-button" variant="danger" block @click="down(2)">-->
<!--          Down-->
<!--        </UiButton>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      panes: Array.from(
        { length: this.$slots.default ? this.$slots.default()?.length : 0 },
        (_, i) => i,
      ),
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },

  render() {
    const slotsVNode = this.$slots.default
      ? this.$slots.default().map((vnode, index) => vnode)
      : [];
    return (
      <div class="panes">
        {this.panes.map((pane, i) => (
          <div class="pane" key={`pane-${pane}`}>
            <div class="pane__content">{slotsVNode[pane]}</div>
            <div class="pane__controls">
              <UiButton
                class={i === 0 ? 'pane__disabled-button' : ''}
                variant="secondary"
                block
                onClick={() => this.up(i)}
              >
                Up
              </UiButton>
              <UiButton
                class={i === this.panes.length - 1 ? 'pane__disabled-button' : ''}
                variant="danger"
                block
                onClick={() => this.down(i)}
              >
                Down
              </UiButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
