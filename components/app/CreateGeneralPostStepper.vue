<template>
  <v-stepper
    v-model="step"
    class="create-general-post-stepper"
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Thông tin thanh toán
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Thông tin cơ bản
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="step > 3"
        step="3"
      >
        Cấu hình dịch vụ
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="step > 4"
        step="4"
      >
        Thông tin chi tiết
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-row>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            md="5"
          >
            <img
              :src="require('@/assets/images/app/6143.jpg')"
              alt=""
              class="demo-ilust"
            >
          </v-col>

          <v-col
            cols="12"
            md="7"
          >
            <v-form
              v-model="formValue1"
              class="owner-config"
            >
              <div class="d-flex">
                <v-text-field
                  :value="userName"
                  readonly
                  label="Họ tên chủ trọ"
                  class="stepper-input"
                  style="width: 100%;"
                />
                <v-text-field
                  :value="user.phoneNumber"
                  readonly
                  label="Số điện thoại liên lạc"
                  class="stepper-input"
                  style="width: 100%;"
                />
              </div>

              <v-select
                v-model="timeFrame"
                :items="defaultInfo.defaultTimeFrame"
                item-text="name"
                item-value="days"
                label="Thời gian hiển thị bài đăng"
                placeholder="6 tháng"
                hint="Trường bắt buộc"
                persistent-hint
                class="stepper-input"
                @change="onGetPostPrice"
              />

              <div class="d-flex">
                <v-text-field
                  :value="expiredAt"
                  readonly
                  label="Ngày hết hạn"
                  class="stepper-input"
                  style="width: 100%;"
                />

                <v-text-field
                  :value="form.postPrice"
                  readonly
                  label="Phí hiển thị bài đăng"
                  class="stepper-input"
                  style="width: 100%;"
                />
              </div>
            </v-form>
          </v-col>
        </v-row>


        <button
          v-ripple
          type="button"
          :disabled="!formValue1 || !expiredAt"
          class="custom-btn custom-btn--text custom-btn__densed stepper-btn"
          @click="step = 2"
        >
          Tiếp tục
        </button>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form v-model="formValue2">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <div class="d-flex">
                <v-select
                  v-model="form.address.city"
                  :items="defaultInfo.cities"
                  item-text="name"
                  item-value="id"
                  :rules="requiredField()"
                  hint="Trường bắt buộc"
                  persistent-hint
                  label="Tỉnh/Thành phố"
                  class="stepper-input"
                  style="width: 100%;"
                />
                <v-select
                  v-model="form.address.district"
                  :items="defaultInfo.hanoiDistricts"
                  item-text="name"
                  item-value="id"
                  :rules="requiredField()"
                  hint="Trường bắt buộc"
                  persistent-hint
                  label="Quận/Huyện/Thị xã"
                  class="stepper-input"
                  style="width: 100%;"
                />
              </div>
              <div class="d-flex">
                <v-select
                  v-model="form.address.ward"
                  :items="defaultInfo.hanoiWards"
                  item-text="name"
                  item-value="id"
                  :rules="requiredField()"
                  hint="Trường bắt buộc"
                  persistent-hint
                  label="Phường"
                  class="stepper-input"
                  style="width: 100%;"
                />
                <v-text-field
                  v-model="form.address.road"
                  :rules="requiredField()"
                  hint="Trường bắt buộc"
                  persistent-hint
                  label="Địa chỉ cụ thể"
                  placeholder="Số 1 Phạm Văn Đồng"
                  class="stepper-input"
                  style="width: 100%;"
                />
              </div>
              <v-text-field
                v-model="form.address.addressDetail"
                label="Miêu tả địa chỉ"
                placeholder="Gần trường Đại học Công nghệ"
                class="stepper-input"
              />
              <v-select
                v-model="form.type"
                :items="defaultInfo.roomTypes"
                item-text="name"
                item-value="id"
                :rules="requiredField()"
                hint="Trường bắt buộc"
                persistent-hint
                label="Loại phòng"
                class="stepper-input"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
              class="d-flex flex-column align-center"
            >
              <upload-file
                :default-preview-imgs="previewImgs"
                @upload-imgs="uploadImgs"
                @delete-imgs="deleteImgs"
              />
              <!-- <small>Tối thiểu 3 ảnh khái quát về phòng cho thuê</small>
              <small>(Có thể bổ sung sau khi tạo bài đăng)</small> -->
            </v-col>
          </v-row>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue2"
          class="custom-btn custom-btn--text custom-btn__densed stepper-btn"
          @click="step = 3"
        >
          Tiếp tục
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>

      <v-stepper-content step="3">
        <services-chosen 
          :default-services="room.services"
          @on-submit-post="onAddRoom"
        />

        <button
          v-ripple
          type="button"
          :disabled="!room.services.length"
          class="custom-btn custom-btn--text custom-btn__densed stepper-btn"
          @click="step = 4"
        >
          Tiếp tục
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-row>
          <v-col
            cols="12"
            md="7"
          >
            <v-form
              v-model="formValue3"
              class="price-config"
            >
              <div class="post-room-list">              
                <div class="d-flex">
                  <v-text-field
                    v-model="room.price"
                    :rules="requiredField()"
                    hint="Trường bắt buộc"
                    persistent-hint
                    label="Giá (VNĐ)"
                    class="stepper-input"
                    style="width: 100%;"
                    @input="formatPrice"
                  />
                </div>
                <div class="d-flex">
                  <v-text-field
                    v-model="room.number"
                    :rules="requiredField()"
                    hint="Trường bắt buộc"
                    persistent-hint
                    label="Số lượng phòng"
                    type="number"
                    class="stepper-input"
                    style="width: 100%;"
                  />
                  <v-text-field
                    v-model="room.area"
                    :rules="requiredField()"
                    hint="Trường bắt buộc"
                    persistent-hint
                    label="Diện tích (m2)"
                    type="number"
                    class="stepper-input"
                    style="width: 100%;"
                  />
                </div>
              </div>
            </v-form>
          </v-col>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            md="5"
          >
            <img
              :src="require('@/assets/images/app/11060.jpg')"
              alt=""
              class="demo-ilust"
            >
          </v-col>
        </v-row>

        <button
          v-ripple
          type="button"
          :disabled="!formValue3"
          class="custom-btn custom-btn--text custom-btn__densed stepper-btn"
          @click="onSubmitPost"
        >
          {{ !loading ? 'Hoàn tất' : '' }}
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          />
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import UploadFile from '@/components/app/UploadFile'
import ServicesChosen from '@/components/app/ServicesChosen'

import { HANOI_DISTRICTS, HANOI_WARDS, ROOM_TYPES, DEFAULT_TIME_FRAME, CITIES, DEFAULT_POST_PRICE } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { addDays, formatISOdate } from '@/helpers/dateHelper'
import validationRules from '@/helpers/validationRules'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { UploadFile, ServicesChosen },

    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            loading: false,
            step: 1,
            formValue1: false,
            formValue2: false,
            formValue3: false,
            form: {
                address: {
                  city: null,
                  district: null,
                  ward: null,
                  road: null,
                  addressDetail: null,
                },
                expiredAt: null,
                type: null,
                rooms: [],
                postPrice: null
            },
            room: {
                number: null,
                price: null,
                area: null,
                services: [],
            },
            expiredAt: null,
            timeFrame: null,
            postImgs: [],
            previewImgs: [],
            imgsToDelete: [],
            defaultInfo: {
              hanoiDistricts: HANOI_DISTRICTS,
              hanoiWards: [],
              roomTypes: ROOM_TYPES,
              defaultTimeFrame: DEFAULT_TIME_FRAME,
              cities: CITIES,
              postPrice: DEFAULT_POST_PRICE
            }
        }
    },

    computed: {
      ...mapGetters({
        userName: 'user/userName',
        user: 'user/user'
      }),

      hasExistedPost () {
        return this.post && !!Object.keys(this.post).length
      }
    },

    watch: {
      'form.address.district': {
        handler() {
          this.defaultInfo.hanoiWards = HANOI_WARDS.filter(e =>  e.district == this.form.address.district )
        },
        deep: true
      },

      timeFrame () {
          let createdAt = null
          if (this.hasExistedPost) {
            createdAt = new Date(this.post.createdAt)
          } else {
            createdAt = new Date()
          }
          const expiredAt = addDays(createdAt, this.timeFrame).toISOString()
          this.expiredAt = formatISOdate(expiredAt.split("T")[0])
      },
      
      post: {
        handler () {
          this.timeFrame = null
          this.expiredAt = null
          this.postImgs = []
          this.previewImgs = []
          this.imgsToDelete = []

          this.getChosenPost()
        },
        deep: true
      }
    },

    mounted () {
        this.getChosenPost()
    },

    methods: {
        ...mapActions({
            submitPost: 'room/submitPost',
            uploadImage: 'room/uploadImage',
            editRoom: 'room/editRoom',
            editPost: 'room/editPost',
        }),

        getChosenPost () {
            if (!this.hasExistedPost) return

            const vm = this

            Object.keys(this.form).forEach(e => {
                vm.form[e] = vm.post[e]

                if (e == 'rooms') {
                  vm.room = vm.post.rooms[0]
                }
            })
            this.$nextTick(() => {
              this.expiredAt = formatISOdate(this.post.expiredAt.split("T")[0])
            })
        },

        onGetPostPrice () {
            const findPostPrice = this.defaultInfo.postPrice.find(e => e.days == this.timeFrame)
            if (!findPostPrice) {
              this.timeFrame = null
            } else {
              this.form.postPrice = findPostPrice.price
            }
        },

        onAddRoom (room) {
          this.room.services = room
        },

        uploadImgs (imgs) {
            this.postImgs = imgs
        },

        deleteImgs (img) {
            this.imgsToDelete.push(img)
        },

        async onUploadImage (img, post_id, index) {
          this.loading = true

          const data = new FormData()
          data.append('image', img)
          const handler = new ApiHandler()
                          .setData({
                            data,
                            post_id
                          })
                          .setOnFinally(() => {
                            if (index == this.postImgs.length - 1 || !this.postImgs.length) {
                              this.loading = false
                              if (!this.hasExistedPost) this.$router.push('/app/post-list')
                              else this.$emit('editted')
                            }
                          })
          await this.uploadImage(handler)
        },

        onSubmitPost () {
          if (this.hasExistedPost){
            const data = this.onTransformData()
            let roomData = {}
            let postData = {}

            Object.keys(data).forEach(e => {
              if (e == 'rooms') {
                roomData = data.rooms[0]
              } else {
                postData[e] = data[e]
              }
            })

            this.onEditRoom(roomData)
            this.onEditPost(postData)
          } else {
            this.onCreatePost()
          }
        },

        async onCreatePost () {
            this.loading = true 

            const data = this.onTransformData()
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                              this.postImgs.forEach((e, index) => {
                                this.onUploadImage(e, res.post._id, index)
                              })
                            })
                            .setOnFinally(() => {
                              if (!this.postImgs.length) {
                                this.loading = false
                                this.$emit('editted')
                              }
                            })
            await this.submitPost(handler)
        },

        async onEditRoom (form) {
            this.loading = true

            const data = {
              data: form,
              post_id: this.post._id
            }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnFinally(() => {
                              if (!this.postImgs.length) {
                                this.loading = false
                                this.$emit('editted')
                              }
                            })
            await this.editRoom(handler)
        },

        async onEditPost (form) {
            this.loading = true

            const data = {
              data: form,
              post_id: this.post._id
            }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                              this.postImgs.forEach((e, index) => {
                                this.onUploadImage(e, this.post._id, index)
                              })
                            })
                            
            await this.editPost(handler)
        },

        onTransformData () {
          const room = Object.assign({}, this.room)
          room.price = room.price.replaceAll('.', '')
          this.form.rooms = [room]
          const data = this.form
          
          let createdAt = null
          if (this.hasExistedPost) {
            createdAt = new Date(this.post.createdAt)
          } else {
            createdAt = new Date()
          }
          const expiredAt = addDays(createdAt, this.timeFrame).toISOString()
          data.expiredAt = expiredAt.split("T")[0]

          return data
        },

        formatPrice () {
            this.room.price = new Intl.NumberFormat('vi-VN').format(this.room.price.replace(/\D/g, ''))
        },

        requiredField () {
            return [validationRules.requiredField]
        },

        emptyForm () {
          Object.keys(this.form).forEach(e => {
            this.form[e] = null
          })
          Object.keys(this.room).forEach(e => {
            this.room[e] = null
          })
          this.timeFrame = null
          this.postImgs = [],
          this.previewImgs = [],
          this.imgsToDelete = [],
          this.step = 1
        }
    }
}
</script>