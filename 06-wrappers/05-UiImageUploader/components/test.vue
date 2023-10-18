<template>
  <div class="image-uploader" @click="handleClick">
    <label
      :class="
        uploaderActive
        ? 'image-uploader__preview image-uploader__preview-loading'
        : 'image-uploader__preview'"
      :style="previewStyle"
    >
      <span class="image-uploader__text">{{ buttonText }}</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleFileChange"
        :name="name"
        v-show="!uploaderActive"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  props: {
    preview: String,
    uploader: Function,
    name: String,
  },
  data() {
    return {
      selectedFile: null,
      uploaderActive: false,
      uploadError: null,
    };
  },
  computed: {
    buttonText() {
      if (this.uploadError) {
        return 'Ошибка загрузки';
      }
      if (this.uploaderActive) {
        return 'Загрузка...';
      }
      return this.selectedFile ? 'Удалить изображение' : 'Загрузить изображение';
    },
    previewStyle() {
      return this.selectedFile
        ? {
            '--bg-url': this.preview || `url(${URL.createObjectURL(this.selectedFile)}`,
          }
        : {};
    },
  },
  methods: {
    handleClick() {
      if (!this.uploaderActive && !this.uploadError) {
        this.$refs.fileInput.click();
      } else if (this.selectedFile) {
        this.selectedFile = null;
        this.$emit('remove');
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploadError = null;
        this.uploaderActive = true;
        this.$emit('select', file);

        if (this.uploader) {
          this.uploader(file)
            .then((result) => {
              this.uploaderActive = false;
              this.$emit('upload', result);
            })
            .catch((error) => {
              this.uploaderActive = false;
              this.uploadError = error;
              this.$emit('error', error);
            });
        }
      }
    },
  },
};
</script>
