<template>
  <div class="post-list">
    <div class="item--title item--title__secondary-ribbon">
      Danh sách bài đăng cho thuê phòng
    </div>

    <div class="post-list--content">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="rooms"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        multi-sort
      >
        <template #item.type="{ item }">
          {{ defaultRoom.roomTypes.find(e => e.id == item.type).name || '' }}
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
        <template #item.expiredAt="{ item }">
          {{ onFormatISOdate(item.expiredAt.split("T")[0]) }}
        </template>
        <template #item.active="{ item }">
          <v-switch
            :readonly="!item.checked"
            :input-value="item.active"
            @mousedown="onCheckActivePost(item)"
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
            <nuxt-link :to="`/${item.id}`">
              Chi tiết
              <v-icon class="ml-2">
                fas fa-chevron-right
              </v-icon>
            </nuxt-link>
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
    <confirm-dialog
      ref="confirm-dialog"
      :title="'Thông báo'"
      :text="'Bài đăng cần tối thiểu 1 ảnh khái quát nhà và tối thiểu 3 ảnh cho mỗi loại phòng. Hãy cập nhật để bắt đầu cho thuê.'"
      @confirm="onClickEditBtn"
    />
  </div>
</template>

<script>
import ProlongTimeDialog from '@/components/app/ProlongTimeDialog'
import EditPostDialog from '@/components/app/EditPostDialog'
import ConfirmDialog from '@/components/ConfirmDialog'

import { formatISOdate } from '@/helpers/dateHelper'
import { ROOM_TYPES } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    components: { ProlongTimeDialog, EditPostDialog, ConfirmDialog },

    layout: 'app',

    data () {
        return {
            rooms: [],
            chosenPost: null,
            totalItems: 10,
            loading: false,
            headers: [
              { text: "ID phòng", value: "_id" },
              { text: "Loại phòng", value: "type", width: "10%" },
              { text: "Lượt xem", value: "views" },
              { text: "Yêu thích", value: "like" },
              { text: "Trạng thái duyệt", value: "checked" },
              { text: "Phí bài đăng", value: "postPrice" },
              { text: "Ngày hết hạn", value: "expiredAt" },
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

    mounted () {
      this.onGetPosts()
    },

    methods: {
        ...mapActions({
          toggleActivePost: 'room/toggleActivePost',
          getOwnerRooms: 'room/getOwnerRooms'
        }),

        onFormatISOdate (date) {
          return formatISOdate(date)
        },

        onCheckActivePost (item) {
          this.chosenPost = item
          if (!item.active && (!item.images || !item.images.length)) {
            this.$refs['confirm-dialog'].open()
          } else {
            this.onToggleActivePost()
          }
        },

        async onToggleActivePost () {
          const item = this.chosenPost
          const data = { id: item.id, active: !item.active }
          const handler = new ApiHandler().setData(data).setOnResponse(() => {
            this.chosenPost.active = !item.active
          })
          await this.toggleActivePost(handler)
        },

        onClickEditBtn (item) {
          if (item) this.chosenPost = item
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
          //   await this.getOwnerRooms({ handler })
          // } else {
          //   await this.getOwnerRooms({ handler, query })
          // }
          await this.getOwnerRooms(handler)
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