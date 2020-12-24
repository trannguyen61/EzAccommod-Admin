<template>
  <v-form class="upload-file">
    <label
      v-if="!previewImgs.length"
      for="file"
      class="upload-label"
    />
    <v-row
      v-else
      class="preview-img"
    >
      <v-col
        v-for="(img, i) in previewImgs"
        :key="i"
        cols="6"
        md="4"
        class="preview-img--img"
      >
        <v-img
          :src="img"
          aspect-ratio="1.33333333333"
        >
          <div class="preview-img--cover">
            <v-icon
              color="white"
              class="mx-3"
              @click="deleteImg(i)"
            >
              fas fa-times
            </v-icon>
          </div>
        </v-img>
      </v-col>
      <v-col
        v-if="previewImgs.length < 6"
        cols="6"
        md="4"
      >
        <label
          id="preview-upload"
          for="file"
          class="preview-img--upload"
        >
          <v-icon
            x-large
            color="primary"
          >fas fa-plus</v-icon>
        </label>
      </v-col>
    </v-row>
    <input
      id="file"
      type="file"
      accept=".png, .jpg, .jpeg"
      multiple
      @change="onUploadImgs"
    >
  </v-form>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    defaultPreviewImgs: {
      type: Array,
      default: () => ([])
    }
  },

  data () {
    return {
      previewImgs: [],
      uploadImgs: []
    }
  },

  watch: {
    previewImgs () {
      if (this.previewImgs.length == 3) {
        this.$nextTick(() => {
          const height = document.getElementsByClassName('preview-img--cover')[0].scrollHeight
          document.getElementById('preview-upload').style.height = `${height}px`
        })
      }
    },

    uploadImgs () {
      this.$emit('upload-imgs', this.uploadImgs)
    },

    defaultPreviewImgs () {
      // this.getExistedCppInfo()
    }
  },

  mounted () {
    // this.getExistedCppInfo()
  },

  methods: {
    getExistedCppInfo () {
      // this.previewImgs = this.defaultPreviewImgs.map(e => `${FILE_URL}${e.URL}`)
    },

    onUploadImgs (e) {
      const imgs = e.target.files
      
      if (this.previewImgs.length + imgs.length > 6) {
        Vue.notify({
          type: 'error',
          title: 'Chỉ có thể tải lên 6 ảnh',
        })
        return 
      }
      
      for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i]
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = e => {
          this.previewImgs.push(e.target.result)
          this.uploadImgs.push(img)
        }
      }
    },

    deleteImg (imageIndex) {
      const src = this.previewImgs[imageIndex].split(FILE_URL)[1]
      if (src) {
        const deleteImg = this.defaultPreviewImgs.find(e => e.URL == src)
        this.$emit('delete-imgs', deleteImg.ID)
      }
      // if (this.defaultPreviewImgs.findIndex(img) != -1) {
      //   this.$emit('delete-imgs', img.ID)
      // }
      this.previewImgs.splice(imageIndex, 1)
      this.uploadImgs.splice(imageIndex, 1)
    }
  }
}
</script>

<style>

</style>