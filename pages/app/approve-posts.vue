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
        <template #item.address="{ item }">
          {{ getFullAddress(item) }}
        </template>
        <template #item.expiredAt="{ item }">
          {{ getFormattedDate(item) }}
        </template>
        <template #item.type="{ item }">
          {{ defaultRoom.roomTypes.find(e => e.id == item.type).name || '' }}
        </template>
        <template #item.price="{ item }">
          {{ new Intl.NumberFormat('vi-VN').format(item.rooms[0].price.replace(/\D/g, '')) }}
        </template>
        <template #item.check="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="item.authenticate"
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
import { ROOM_TYPES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
import { formatISOdate } from '@/helpers/dateHelper'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    layout: 'app',

    data () {
        return {
            rooms: [],
            totalItems: 10,
            loading: false,
            headers: [
              { text: "Duyệt", value: "check", sortable: false},
              { text: "Phí bài đăng", value: "postPrice", width: '10%'},
              { text: "Loại phòng", value: "type"},
              { text: "Số phòng", value: "rooms[0].number"},
              { text: "Diện tích", value: "rooms[0].area"},
              { text: "Địa chỉ", value: "address", sortable: false, width: '15%'},
              { text: "Giá", value: "price"},
              { text: "Hạn đăng", value: "expiredAt"},
              { text: "ID phòng", value: "_id", sortable: false},
              { text: "ID chủ", value: "author._id", sortable: false},
              { text: "Xem bài đăng", value: "detail", sortable: false, width: '10%'},
            ],
            options: {},
            defaultRoom: {
                roomTypes: ROOM_TYPES,
                cities: CITIES,
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
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

    mounted () {
      this.onGetPosts()
    },

    methods: {
        ...mapActions({
          getRoomList: "room/getRoomList",
          authenticatePost: 'managing/authenticatePost'
        }),

        getFullAddress (item) {
          const findCity = this.defaultRoom.cities.find(e => e.id == item.address.city)
          const findDistrict = this.defaultRoom.hanoiDistricts.find(e => e.id == item.address.district)
          const findWard = this.defaultRoom.hanoiWards.find(e => e.id == item.address.ward)

          const city = findCity ? findCity.name : ''
          const district = findDistrict ? findDistrict.name : ''
          const ward = findWard ? findWard.name : ''
          const road = item.address.road

          return `${road}, ${ward}, ${district}, ${city}`
        },

        getFormattedDate (item) {
          return formatISOdate(item.expiredAt.split("T")[0])
        },

        async onApprovePost (item) {
          const data = { post_id: item._id }
          const handler = new ApiHandler()
                          .setData(data)
                          .setOnResponse(() => {
                            item.authenticate = true
                          })
          await this.authenticatePost(handler)
        },

        async onGetPosts (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.rooms = data.posts
              this.totalItems = data.posts.length
            })
            .setOnFinally(() => {
              this.customSortAndPaginate(sortBy, sortDesc, page, itemsPerPage)
              this.loading = false
            })

          const query = {
            page,
            size: itemsPerPage,
          }
          // if (getFullPage) {
          //   await this.getPosts({ handler })
          // } else {
          //   await this.getPosts({ handler, query })
          // }
          await this.getRoomList(handler)
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