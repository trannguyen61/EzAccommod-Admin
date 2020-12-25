<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card style="overflow: hidden;">
      <v-card-title class="headline">
        Gia hạn bài đăng sau ngày {{ formattedExpiredAt }}
      </v-card-title>

      <div class="card-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="timeFrame"
              :items="defaultInfo.defaultTimeFrame"
              item-text="name"
              item-value="days"
              label="Thời gian hiển thị bài đăng"
              placeholder="6 tháng"
              class="mx-8"
              @change="onGetPostPrice"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              :value="formattedNewExpiredAt"
              readonly
              label="Ngày hết hạn"
              class="mx-8"
            />
          </v-col>
        </v-row>

        <v-text-field
          :value="postPrice"
          readonly
          label="Phí hiển thị bài đăng (bổ sung)"
          class="mx-8"
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
          :disabled="!timeFrame || !postPrice"
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
import { DEFAULT_TIME_FRAME, DEFAULT_POST_PRICE } from '@/consts/consts'
import { addDays, formatISOdate } from '@/helpers/dateHelper'
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
            timeFrame: null,
            postPrice: null,
            expiredAt: null,
            defaultInfo: {
              defaultTimeFrame: DEFAULT_TIME_FRAME,
              postPrice: DEFAULT_POST_PRICE
            }
        }
    },

    computed: {
      formattedExpiredAt () {
        return this.post && this.post.expiredAt ? formatISOdate(this.post.expiredAt.split('T')[0]) : ''
      },

      formattedNewExpiredAt () {
        return this.expiredAt ? formatISOdate(this.expiredAt.split("T")[0]) : ''
      }
    },

    watch: {
      timeFrame () {
          if (!this.post || !this.post.expiredAt) return

          const expiredAt = new Date(this.post.expiredAt)
          const newExpiredAt = addDays(expiredAt, this.timeFrame).toISOString()

          this.expiredAt =  newExpiredAt.split("T")[0]
      },

      post: {
        handler () {
          this.timeFrame = null
          this.postPrice = null
          this.expiredAt = null
        },
        deep: true
      }
    },

    methods: {
        ...mapActions({
            prolongTimePost: 'room/prolongTimePost'
        }),

        async onGetPostPrice () {
            const findPostPrice = this.defaultInfo.postPrice.find(e => e.days == this.timeFrame)
            if (!findPostPrice) {
              this.timeFrame = null
            } else {
              this.postPrice = findPostPrice.price
            }
        },

        async onProlongTimePost () {
            const data = { time: this.timeFrame }
            const handler = new ApiHandler()
                            .setData(data)
            await this.getPostPrice(handler)
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