<template>
  <div class="approve-posts">
    <div class="item--title item--title__secondary-ribbon">
      Duyệt bình luận
    </div>

    <div class="approve-posts--content">
      <v-data-table
        :headers="headers"
        :items="reviews"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        multi-sort
      >
        <template #item.check="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="item.checked"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onApproveReview(item)"
          >
            <v-icon>fas fa-check-circle</v-icon>
          </button>
        </template>

        <template #item.detail="{ item }">
          <button
            v-ripple
            type="button"
            class="custom-btn custom-btn--text"
          >
            <a :href="`http://localhost:3000/${item.id}`">
              Chi tiết
              <v-icon class="ml-2">
                fas fa-chevron-right
              </v-icon>
            </a>
          </button>
        </template>
        <template #no-data>
          <v-btn
            class="ml-auto mr-auto"
            color="primary"
            @click="onGetAllReviews"
          >
            Tải lại
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { ROOM_TYPES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
import { formatISOdate } from '@/helpers/dateHelper'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    layout: 'app',

    data () {
        return {
            reviews: [],
            totalItems: 10,
            loading: false,
            headers: [
              { text: "Duyệt", value: "check", sortable: false},
              { text: "Tiêu đề", value: "title", width: '10%'},
              { text: "Đánh giá", value: "star"},
              { text: "Nội dung", value: "content", width: '30%'},
              { text: "ID phòng", value: "_id", sortable: false},
              { text: "ID chủ bình luận", value: "author._id", sortable: false},
              { text: "Xem bài đăng", value: "detail", sortable: false, width: '10%'},
            ],
            options: {},
            defaultRoom: {
                cities: CITIES,
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
            }
        }
    },

      watch: {
        options: {
            async handler (val, oldVal) {
                if (Object.keys(oldVal).length) await this.onGetAllReviews()
            },
            deep: true,
        }
      },

    methods: {
        ...mapActions({
          getAllReviews: "room/getAllReviews",
          approveReview: 'managing/approveReview'
        }),

        async onApproveReview (item) {
          const data = { item }
          const handler = new ApiHandler().setData(data)
          await this.approveReview(handler)
        },

        async onGetAllReviews (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.reviews = data.reviews
              this.totalItems = data.reviews.length
            })
            .setOnFinally(() => {
              this.customSortAndPaginate(sortBy, sortDesc, page, itemsPerPage)
              this.loading = false
            })

          const query = {
            page,
            size: itemsPerPage,
          }
        //   if (getFullPage) {
        //     await this.getPosts({ handler })
        //   } else {
        //     await this.getPosts({ handler, query })
        //   }

            await this.getAllReviews(handler)
        },

        customSortAndPaginate(sortBy, sortDesc) {
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.rooms = this.rooms.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }
        },
    }
}
</script>