<template>
  <v-dialog
    v-model="dialog"
    max-width="450"
  >
    <v-card>
      <v-card-title class="headline justify-center">
        {{ title }}
      </v-card-title>

      <v-card-text
        v-if="textInfo"
        class="justify-center"
      >
        {{
          textInfo
        }}
      </v-card-text>

      <v-card-text class="d-flex justify-center ">
        {{ text }}
      </v-card-text>

      <v-card-actions class="justify-center">
        <button
          class="custom-btn__densed mr-4"
          @click="onConfirm"
        >
          {{ confirmBtn }}
        </button>

        <button
          text
          outlined
          @click="dialog = false"
        >
          {{ cancelBtn }}
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Xác nhận"
    },
    text: {
      type: String,
      default: "Bạn xác nhận hành động này?"
    },
    textInfo: {
      type: String,
      default: null
    },
    confirmBtn: {
      type: String,
      default: "Đồng ý"
    },
    cancelBtn: {
      type: String,
      default: "Hủy bỏ"
    }
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    onConfirm() {
      this.$emit("confirm")
      this.dialog = false
    },

    open() {
      this.dialog = true
    },

    close() {
      this.dialog = false
    }
  }
}
</script>
