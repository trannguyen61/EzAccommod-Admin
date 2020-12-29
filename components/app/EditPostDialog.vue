<template>
  <v-dialog
    v-model="dialog"
    width="90vw"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="headline">
        Chỉnh sửa bài đăng
      </v-card-title>

      <div class="card-content">
        <create-general-post-stepper
          :post="post"
          @editted="onFinishEditing"
        />
      </div>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__densed mx-5"
          @click="close"
        >
          Hủy
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CreateGeneralPostStepper from '@/components/app/CreateGeneralPostStepper'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    components: { CreateGeneralPostStepper },

    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            dialog: false
        }
    },

    methods: {
      onFinishEditing () {
        this.$emit('editted')
        this.close()
      },

        open () {
            this.dialog = true
        },

        close () {
            this.dialog = false
        }
    }
}
</script>