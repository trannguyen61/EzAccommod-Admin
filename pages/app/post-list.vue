<template>
  <div class="post-list">
    <div class="item--title item--title__secondary-ribbon">
      Danh sách bài đăng cho thuê phòng
    </div>

    <div class="post-list--content">
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
        <template #item.checked="{ item }">
          <v-icon
            v-if="item.checked"
            color="success"
          >
            fas fa-circle
          </v-icon>
          <v-icon
            v-else
            color="dark"
          >
            far fa-circle
          </v-icon>
        </template>
        <template #item.active="{ item }">
          <v-switch
            :readonly="!item.checked"
            :input-value="item.active"
            @change="onToggleActivePost"
          />
        </template>
        <template #item.edit="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="item.checked"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onClickEditBtn(item)"
          >
            <v-icon>fas fa-tools</v-icon>
          </button>
        </template>
        <template #item.prolong="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="!item.checked"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onClickProlongTimeBtn(item)"
          >
            <v-icon>fas fa-clock</v-icon>
          </button>
        </template>
        <template #item.detail="{ item }">
          <button
            v-if="item.checked"
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

    <prolong-time-dialog
      ref="prolong-time-dialog"
      :post="chosenPost"
    />
    <edit-post-dialog
      ref="edit-post-dialog"
      :post="chosenPost"
    />
  </div>
</template>

<script>
import ProlongTimeDialog from '@/components/app/ProlongTimeDialog'
import EditPostDialog from '@/components/app/EditPostDialog'

import { ROOM_TYPES } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    components: { ProlongTimeDialog, EditPostDialog },
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
                fee: '1.500.000'
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
                fee: '1.000.000'
            }],
            chosenPost: null,
            totalItems: 10,
            loading: false,
            headers: [
              { text: "ID phòng", value: "id" },
              { text: "Loại phòng", value: "type", width: "10%" },
              { text: "Lượt xem", value: "views" },
              { text: "Yêu thích", value: "favorite" },
              { text: "Trạng thái duyệt", value: "checked" },
              { text: "Phí bài đăng", value: "fee" },
              { text: "Ngày hết hạn", value: "dueDate" },
              { text: "Trạng thái cho thuê", value: "active"},
              { text: "Chỉnh sửa", value: "edit", sortable: false},
              { text: "Gia hạn bài đăng", value: "prolong", sortable: false},
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
          toggleActivePost: 'room/toggleActivePost'
        }),

        async onToggleActivePost (value) {
          const data = { active: value }
          const handler = new ApiHandler().setData(data)
          await this.toggleActivePost(handler)
        },

        onClickEditBtn (item) {
          this.chosenPost = item
          this.$refs['edit-post-dialog'].open()
        },

        onClickProlongTimeBtn (item) {
          this.chosenPost = item
          this.$refs['prolong-time-dialog'].open()
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