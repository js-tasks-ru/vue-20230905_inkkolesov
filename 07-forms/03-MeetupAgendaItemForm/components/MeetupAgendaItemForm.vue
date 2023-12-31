<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="removeAgendaItem">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown
        v-model="localAgendaItem.type"
        title="Тип"
        :options="$options.agendaItemTypeOptions"
        name="type"
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            v-model="localAgendaItem.startsAt"
            type="time"
            placeholder="00:00"
            name="startsAt"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="labelByType">
      <UiInput v-model="localAgendaItem.title" name="title" />
    </UiFormGroup>
    <UiFormGroup v-if="localAgendaItem.type === 'talk'" label="Докладчик">
      <UiInput v-model="localAgendaItem.speaker" name="speaker" />
    </UiFormGroup>
    <UiFormGroup
      v-if="localAgendaItem.type === 'talk' || localAgendaItem.type === 'other'"
      label="Описание"
    >
      <UiInput v-model="localAgendaItem.description" multiline name="description" />
    </UiFormGroup>
    <UiFormGroup v-if="localAgendaItem.type === 'talk'" label="Язык">
      <UiDropdown
        v-model="localAgendaItem.language"
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['remove', 'update:agendaItem'],

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.updateAgendaItem();
      },
    },
    'localAgendaItem.startsAt': {
      handler(newValue, oldValue) {
        const duration =
          this.getMilliseconds(this.localAgendaItem.endsAt) - this.getMilliseconds(oldValue);
        this.localAgendaItem.endsAt = this.getTime(this.getMilliseconds(newValue) + duration);
      },
    },
  },

  methods: {
    removeAgendaItem() {
      this.$emit('remove');
    },
    updateAgendaItem() {
      this.$emit('update:agendaItem', this.localAgendaItem);
    },
    getMilliseconds(time) {
      const timeParts = time.split(':');
      return timeParts[0] * 3600000 + timeParts[1] * 60000;
    },
    getTime(milliseconds) {
      const date = new Date(milliseconds);
      return date.toUTCString().substring(17, 22);
    },
  },

  computed: {
    labelByType() {
      switch (this.localAgendaItem.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
