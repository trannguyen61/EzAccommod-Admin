<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title class="headline">
        Gia hạn bài đăng sau ngày {{ dueDate }}
      </v-card-title>

      <div class="card-content">
        <v-select
          v-model="time"
          :items="['1 tuần', '1 tháng', 'Từ giờ cho đến mãi sau này']"
          label="Thời gian hiển thị bài đăng"
          placeholder="6 tháng"
          class="mt-6 mx-8"
          @change="onGetPostFee"
        />

        <v-text-field
          :value="postFee"
          readonly
          label="Phí hiển thị bài đăng (bổ sung)"
          class="mt-6 mx-8"
        />
      </div>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <button
          v-ripple
          class="custom-btn custom-btn--text mx-5"
          @click="close"
        >
          Hủy
        </button>
        <button
          v-ripple
          :disabled="!time || !postFee"
          class="custom-btn custom-btn--text custom-btn__densed"
          @click="onProlongTimePost"
        >
          Gia hạn
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    props: {
      post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            dialog: false,
            time: null,
            postFee: null
        }
    },

    computed: {
      dueDate () {
        return this.post ? this.post.dueDate : ''
      }
    },

    methods: {
        ...mapActions({
            getPostFee: 'room/getPostFee',
            prolongTimePost: 'room/prolongTimePost'
        }),

        async onGetPostFee () {
            const data = { time: this.time }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.postFee = res
                            })
            await this.getPostFee(handler)
        },

        async onProlongTimePost () {
            const data = { time: this.time }
            const handler = new ApiHandler()
                            .setData(data)
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