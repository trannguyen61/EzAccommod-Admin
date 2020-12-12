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
        <create-post-stepper
          :post="post"
          @on-get-post-fee="onGetPostFee"
          @on-submit-post="onSubmitPost"
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
import CreatePostStepper from '@/components/app/CreatePostStepper'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    components: { CreatePostStepper },

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
        ...mapActions({
            editPost: 'room/editPost',
            getPostFee: 'room/getPostFee'
        }),

        async onSubmitPost (form) {
            const data = form
            const handler = new ApiHandler()
                            .setData(data)
            await this.editPost(handler)
        },

        async onGetPostFee (time) {
            const data = { time }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.postFee = res
                            })
            await this.getPostFee(handler)
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