import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import {fetchMeetupById} from '../meetupService';
import MeetupView from "./MeetupView";


export default defineComponent({
  name: 'PageMeetup',

  data() {
    return {
      meetup: null,
    };
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  async mounted() {
    return this.meetup = await fetchMeetupById(this.meetupId)
      .catch(error => {
        this.error = error.message;
      });
  },

  watch:{
    async meetupId(meetupId){
      this.meetup = null;
      this.meetup = await fetchMeetupById(meetupId)
        .catch(error => {
          this.error = error.message;
        });
      },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-else-if="meetup === null" >
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="error" >
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
