<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': !preview && uploader }"
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
      deletePreview: false,
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
        if (this.preview && !this.deletePreview) {
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
        ? { '--bg-url': `url(${URL.createObjectURL(this.hasFile)}` }
        : this.preview
        ? { '--bg-url': `url(${this.preview})` }
        : {};
    },
  },
  methods: {
    handleClick() {
      if ((this.hasFile || this.preview) && !this.uploader) {
        this.hasFile = null;
        this.$refs.fileInput.value = '';
        this.deletePreview = true;
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
              this.$refs.fileInput.value = '';
              this.$emit('error', error);
            });
        }
      }
    },
  },
  emits: ['select', 'upload', 'remove', 'error'],
  expose: [],
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
