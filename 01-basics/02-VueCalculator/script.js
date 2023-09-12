import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      number_1: 0,
      number_2: 0,
      operator: '',
    };
  },
  computed:{
    calculatedOutput(){
      switch (this.operator) {
        case "sum":
          return this.number_1 + this.number_2;
        case "subtract":
          return this.number_1 - this.number_2;
        case "multiply":
          return this.number_1 * this.number_2;
        case "divide":
          return this.number_1 / this.number_2;
        default:
          return 0;
      }
    },
  },
}).mount('#app')
