<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="changeMonth(-1)"
        ></button>
        <div class="calendar-view__date">{{ formattedDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="changeMonth(+1)"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="day in calendar"
        :class="{ 'calendar-view__cell_inactive': day.inActive }"
        class="calendar-view__cell"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day.calendarDate }}</div>
        <div class="calendar-view__cell-content">
          <a
            v-for="meetup in day.calendarMeetups"
            :href="`/meetups/${meetup.id}`"
            class="calendar-event"
            >{{ meetup.title }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  methods: {
    changeMonth(n) {
      this.date.setUTCHours(0, 0, 0, 0);
      this.date = new Date(this.date.setMonth(this.date.getMonth() + n, 1));
    },
  },

  computed: {
    formattedDate() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },
    dayOfMonthFirst() {
      const date = new Date(this.date);
      return new Date(date.setUTCMonth(date.getUTCMonth(), 1)).getTime();
    },
    dayOfMonthLast() {
      const date = new Date(this.date);
      return new Date(date.setUTCMonth(date.getUTCMonth() + 1, 0)).getUTCDay();
    },
    dayOfMonthFirstBefore() {
      const date = new Date(this.date);
      return new Date(date.setUTCMonth(date.getUTCMonth(), 0)).getUTCDay();
    },
    dayOfMonthLastAfter() {
      const date = new Date(this.date);
      return new Date(date.setUTCMonth(date.getUTCMonth() + 1, 1)).getTime();
    },
    dayBefore() {
      return this.dayOfMonthFirstBefore;
    },
    dayAfter() {
      return this.dayOfMonthLast === 0 ? 0 : 7 - this.dayOfMonthLast;
    },
    dayInMonth() {
      const date = new Date(this.date);
      return new Date(date.setUTCMonth(date.getMonth() + 1, 0)).getUTCDate();
    },
    calendarDays() {
      return this.dayBefore + this.dayInMonth + this.dayAfter;
    },
    meetupsInMonth() {
      return this.meetups.filter(
        (meetup) =>
          new Date(meetup.date).getTime() >= this.dayOfMonthFirst &&
          new Date(meetup.date).getTime() < this.dayOfMonthLastAfter,
      );
    },
    calendar() {
      let calendar = [];
      const date = this.date;
      const month = date.getUTCMonth();
      const year = date.getUTCFullYear();
      for (let calendarDay = 1; calendarDay < this.calendarDays + 1; calendarDay++) {
        let calendarDate = new Date(year, month, calendarDay - this.dayOfMonthFirstBefore);
        if (calendarDate.getMonth() !== month) {
          calendar.push({
            calendarDate: calendarDate.getDate(),
            inActive: true,
          });
        } else {
          let meetupsInCalendar = [];
          for (
            let meetupInCalendar = 0;
            meetupInCalendar < this.meetupsInMonth.length;
            meetupInCalendar++
          ) {
            if (
              new Date(this.meetupsInMonth[meetupInCalendar].date).getUTCDate() ===
              calendarDate.getDate()
            ) {
              meetupsInCalendar.push(this.meetupsInMonth[meetupInCalendar]);
            }
          }
          calendar.push({
            calendarDate: calendarDate.getDate(),
            inActive: false,
            calendarMeetups: { ...meetupsInCalendar },
          });
        }
      }
      return calendar;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
