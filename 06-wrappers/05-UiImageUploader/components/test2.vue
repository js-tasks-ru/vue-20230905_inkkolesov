<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': !preview && uploader && !hasUploader }"
      :style="previewStyle"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        ref="fileInput"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleFileChange"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  data() {
    return {
      hasFile: null,
      hasUploader: false,
      hasUploaderError: null,
    };
  },
  props: {
    preview: String,
    uploader: Function,
  },
  inheritAttrs: false,
  computed: {
    text() {
      if (!this.hasFile) {
        if (this.preview) {
          return 'Удалить изображение';
        } else {
          return 'Загрузить изображение';
        }
      } else {
        if (this.uploader) {
          if (this.hasUploader) {
            return 'Загрузка...';
          } else {
            if (this.hasUploaderError) {
              return 'Загрузить изображение';
            }
          }
        }
        return 'Удалить изображение';
      }
    },
    previewStyle() {
      return this.hasFile
        ? {
            '--bg-url': this.preview || `url(${URL.createObjectURL(this.hasFile)}`,
          }
        : {};
    },
  },
  methods: {
    handleClick() {
      if (!this.hasUploader && !this.hasUploaderError) {
        this.$refs.fileInput.click();
      } else if (this.hasFile) {
        this.hasFile = null;
        this.$emit('remove');
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.hasFile = file;
        this.hasUploaderError = null;
        this.hasUploader = true;
        this.$emit('select', file);

        if (this.uploader) {
          this.uploader(file)
            .then((result) => {
              this.hasUploader = false;
              this.$emit('upload', result);
            })
            .catch((error) => {
              this.hasUploader = false;
              this.hasUploaderError = error;
              this.$emit('error', error);
            });
        }
      }
    },
  },
  emits: ['select', 'upload', 'remove', 'error'],
};
</script>
