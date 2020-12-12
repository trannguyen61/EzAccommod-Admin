<template>
  <div class="approve-posts">
    <div class="item--title item--title__secondary-ribbon">
      Duyệt bài đăng
    </div>

    <div class="approve-posts--content">
      <v-data-table
        :headers="headers"
        :items="rooms"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        multi-sort
      >
        <template #item.type="{ item }">
          {{ defaultRoom.roomTypes.find(e => e.value == item.type).name || '' }}
        </template>
        <template #item.check="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="item.checked"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onApprovePost(item)"
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
            @click="onGetPosts"
          >
            Tải lại
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { ROOM_TYPES } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    layout: 'app',

    data () {
        return {
            rooms: [{
                id: '123',
                type: 1,
                roomNum: 2,
                square: 30,
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                detailAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                price: '1.000.000',
                facilities: [1, 2, 3],
                favorite: 10,
                views: 100,
                checked: true,
                active: false,
                dueDate: '06/01/2021',
                fee: '1.500.000',
                owner: {
                    id: '1'
                },
                duration: '2m'
            }, {
                id: '124',
                type: 3,
                roomNum: 2,
                square: 30,
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                detailAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                price: '1.000.000',
                facilities: [1, 2, 3],
                favorite: 6,
                views: 65,
                checked: false,
                active: false,
                fee: '1.000.000',
                owner: {
                    id: '1'
                },
                duration: '2m'
            }],
            totalItems: 10,
            loading: false,
            headers: [
              { text: "ID phòng", value: "id", sortable: false},
              { text: "ID chủ", value: "owner.id", sortable: false},
              { text: "Loại phòng", value: "type"},
              { text: "Số phòng", value: "roomNum"},
              { text: "Diện tích", value: "square"},
              { text: "Địa chỉ", value: "address", sortable: false},
              { text: "Giá", value: "price"},
              { text: "Thời gian đăng", value: "duration"},
              { text: "Phí bài đăng", value: "fee"},
              { text: "Duyệt", value: "check", sortable: false},
              { text: "Xem bài đăng", value: "detail", sortable: false},
            ],
            options: {},
            defaultRoom: {
                roomTypes: ROOM_TYPES
            }
        }
    },

      watch: {
        options: {
            async handler (val, oldVal) {
                if (Object.keys(oldVal).length) await this.onGetPosts()
            },
            deep: true,
        }
      },

    methods: {
        ...mapActions({
          getPosts: "room/getPosts",
          approvePost: 'managing/approvePost'
        }),

        async onApprovePost (item) {
          const data = { item }
          const handler = new ApiHandler().setData(data)
          await this.approvePost(handler)
        },

        async onGetPosts (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.rooms = data.rooms
              this.totalItems = data.total
            })
            .setOnFinally(() => {
              this.customSortAndPaginate(sortBy, sortDesc, page, itemsPerPage)
              this.loading = false
            })

          const query = {
            page,
            size: itemsPerPage,
          }
          if (getFullPage) {
            await this.getPosts({ handler })
          } else {
            await this.getPosts({ handler, query })
          }
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