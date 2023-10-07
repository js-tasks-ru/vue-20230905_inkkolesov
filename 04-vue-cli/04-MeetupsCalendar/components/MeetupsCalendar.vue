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
        <div class="calendar-view__date">{{ localDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="changeMonth(1)"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="day in calendar"
        :class="{ 'calendar-view__cell_inactive': !day.isActive }"
        class="calendar-view__cell"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day.date }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in day.meetups" :href="`/meetups/${meetup.id}`" class="calendar-event">{{
            meetup.title
          }}</a>
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
      date: Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth()),
    };
  },

  methods: {
    changeMonth(n) {
      this.date = new Date(this.UTC.setUTCMonth(this.UTC.getUTCMonth() + n, 1));
    },
  },

  computed: {
    localDate() {
      return this.UTC.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    UTC() {
      return new Date(this.date);
    },

    firstDayInMonth() {
      return new Date(this.UTC.getUTCFullYear(), this.UTC.getUTCMonth(), 1);
    },
    lastDayInMonth() {
      return new Date(this.UTC.getUTCFullYear(), this.UTC.getUTCMonth() + 1, 1);
    },

    dayInMonth() {
      return (
        this.firstDayInMonth.getUTCDay() +
        new Date(this.UTC.getUTCFullYear(), this.UTC.getUTCMonth() + 1, 1).getUTCDate() +
        (this.lastDayInMonth.getUTCDay() === 0 ? 0 : 7 - this.lastDayInMonth.getUTCDay())
      );
    },

    meetupsInMonth() {
      return this.meetups.filter(
        (meetup) => new Date(meetup.date).getUTCMonth() === this.UTC.getUTCMonth(),
      );
    },

    calendar() {
      const calendar = [];
      for (let calendarDay = 2; calendarDay < this.dayInMonth + 2; calendarDay++) {
        let calendarDate = new Date(
          this.UTC.getUTCFullYear(),
          this.UTC.getUTCMonth(),
          calendarDay - this.firstDayInMonth.getUTCDay(),
        );
        const meetupsInDay = [];
        console.log('month calendar :' + calendarDate.getUTCMonth());
        console.log('month utc:' + this.UTC.getUTCMonth());
        if (calendarDate.getUTCMonth() !== this.UTC.getUTCMonth()) {
          calendar.push({
            date: calendarDate.getUTCDate(),
            isActive: false,
            meetups: {},
          });
        } else {
          for (let meetup = 0; meetup < this.meetupsInMonth.length; meetup++) {
            if (
              new Date(this.meetupsInMonth[meetup].date).getUTCDate() === calendarDate.getUTCDate()
            ) {
              meetupsInDay.push(this.meetupsInMonth[meetup]);
            }
          }
          calendar.push({
            date: calendarDate.getUTCDate(),
            isActive: true,
            meetups: { ...meetupsInDay },
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
