import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from "./MeetupCover";
import MeetupDescription from "./MeetupDescription";
import MeetupAgenda from "./MeetupAgenda";
import MeetupInfo from "./MeetupInfo";

export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupInfo,
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :image="meetup.image" :title="meetup.title"/>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description"/>

            <h3>Программа</h3>
            <MeetupAgenda v-if="meetup.agenda.length > 0" :agenda="meetup.agenda"/>
            <UiAlert v-else-if="meetup.agenda.length === 0">Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </UiContainer>
    </div>`,
});
