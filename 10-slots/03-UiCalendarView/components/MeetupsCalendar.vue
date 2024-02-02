<template>
  <UiCalendarView>
    <template #calendarDay="calendarDay">
      <UiCalendarEvent
        v-for="meetup in meetupsInDay(+calendarDay.date)"
        tag="a"
        :key="meetup.id"
        :href="`/meetups/${meetup.id}`"
      >
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    meetupsInDay(currentDate) {
      const nextDate = new Date(currentDate).setDate(new Date(currentDate).getDate() + 1);
      return this.meetups.filter((meetup) => meetup.date >= currentDate && meetup.date < +nextDate);
    },
  },
};
</script>

<style scoped></style>
