<template>
  <v-stepper
    v-model="step"
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Địa chỉ phòng trọ
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
        Thông tin chi tiết
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        step="4"
      >
        Xác nhận thông tin
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form v-model="formValue1">
          <div class="d-flex">
            <v-select
              v-model="form.city"
              :items="[1, 2, 3]"
              :rules="requiredField()"
              label="Tỉnh/Thành phố"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-select
              v-model="form.district"
              :items="[1, 2, 3]"
              :rules="requiredField()"
              label="Quận/Huyện/Thị xã"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
          <div class="d-flex">
            <v-select
              v-model="form.ward"
              :items="[1, 2, 3]"
              :rules="requiredField()"
              label="Phường"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              v-model="form.detailAddress"
              :rules="requiredField()"
              label="Địa chỉ cụ thể"
              placeholder="Số 1 Phạm Văn Đồng"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
          <v-text-field
            v-model="form.addressDescription"
            label="Miêu tả địa chỉ"
            placeholder="Gần trường Đại học Công nghệ"
            class="mt-6 mx-8"
          />
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue1"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="step = 2"
        >
          Tiếp tục
        </button>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form v-model="formValue2">
          <div class="d-flex">
            <v-select
              v-model="form.type"
              :items="[1, 2, 3]"
              :rules="requiredField()"
              label="Loại phòng"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              v-model="form.number"
              :rules="requiredField()"
              label="Số lượng phòng"
              type="number"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
          <div class="d-flex">
            <v-text-field
              v-model="form.price"
              :rules="requiredField()"
              label="Giá (VNĐ)"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              v-model="form.square"
              :rules="requiredField()"
              label="Diện tích (m2)"
              type="number"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue2"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
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
        <v-form v-model="formValue3">
          <v-simple-table class="mx-8">
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Dịch vụ
                  </th>
                  <th class="text-left">
                    Phòng trọ
                  </th>
                </tr>
              </thead>
              <v-form />
              <tbody>
                <tr>
                  <td>Chung chủ</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.withOwner"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có chung chủ'"
                        value="1"
                      />
                      <v-radio
                        :label="'Không chung chủ'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Phòng tắm</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.bathroom"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Phòng tắm khép kín'"
                        value="1"
                      />
                      <v-radio
                        :label="'Phòng tắm chung'"
                        value="0"
                      />
                    </v-radio-group>
                    <v-radio-group
                      v-model="form.services.heater"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có bình nóng lạnh'"
                        value="1"
                      />
                      <v-radio
                        :label="'Không có bình nóng lạnh'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Phòng bếp</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.kitchen"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Khu bếp riêng'"
                        value="2"
                      />
                      <v-radio
                        :label="'Khu bếp chung'"
                        value="1"
                      />
                      <v-radio
                        :label="'Không nấu ăn'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Điều hòa</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.aircond"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có điều hòa'"
                        value="1"
                      />
                      <v-radio
                        :label="'Không điều hòa'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Ban công</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.velanda"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có ban công'"
                        value="1"
                      />
                      <v-radio
                        :label="'Không ban công'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Điện nước</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.elecPrice"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Điện nước giá dân'"
                        value="1"
                      />
                      <v-radio
                        :label="'Điện nước giá thuê'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Tiện ích khác</td>
                  <td>
                    <v-radio-group v-model="form.services.other">
                      <v-radio
                        :label="'Tủ lạnh'"
                        value="2"
                      />
                      <v-radio
                        :label="'Máy giặt'"
                        value="1"
                      />
                      <v-radio
                        :label="'Giường tủ'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue3"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
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
        <v-form v-model="formValue4">
          <div class="d-flex">
            <v-text-field
              :value="'Nakayama Haruki'"
              readonly
              label="Họ tên chủ trọ"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              :value="'113'"
              readonly
              label="Số điện thoại liên lạc"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
            
          <v-select
            v-model="form.time"
            :rules="requiredField()"
            :items="['1 tuần', '1 tháng', 'Từ giờ cho đến mãi sau này']"
            label="Thời gian hiển thị bài đăng"
            placeholder="6 tháng"
            class="mt-6 mx-8"
            @change="onGetPostFee"
          />

          <v-text-field
            :value="postFee"
            readonly
            label="Phí hiển thị bài đăng"
            class="mt-6 mx-8"
            style="width: 100%;"
          />
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue4"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="onSubmitPost"
        >
          Gửi yêu cầu xét duyệt bài đăng
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
import validationRules from '@/helpers/validationRules'

export default {
    props: {
        postFee: {
            type: String,
            default: ''
        },

        post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            step: 1,
            formValue1: false,
            formValue2: false,
            formValue3: false,
            formValue4: false,
            form: {
                city: null,
                district: null,
                ward: null,
                detailAddress: null,
                addressDescription: null,
                type: null,
                number: null,
                price: null,
                square: null,
                services: {
                    withOwner: null,
                    bathroom: null,
                    heater: null,
                    kitchen: null,
                    aircond: null,
                    velanda: null,
                    elecPrice: null,
                    other: null
                },
                time: null
            }
        }
    },

    mounted () {
        this.getChosenPost()
    },

    methods: {
        getChosenPost () {
            Object.keys(this.post).forEach(e => {
                this.form[e] = this.post[e]
            })
            
            if (this.form.time) this.onGetPostFee()
        },

        onGetPostFee () {
            this.$emit('on-get-post-fee', this.form.time)
        },

        onSubmitPost () {
            this.$emit('on-submit-post', this.form)
        },

        requiredField () {
            return [validationRules.requiredField]
        }
    }
}
</script>