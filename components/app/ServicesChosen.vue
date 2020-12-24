<template>
  <div class="services-choosen">
    <v-form v-model="formValue">
      <v-simple-table
        fixed-header
        class="mx-8"
        style="overflow-y: hidden"
      >
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
                  v-model="services.withOwner"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Có chung chủ'"
                    value="11"
                  />
                  <v-radio
                    :label="'Không chung chủ'"
                    value="12"
                  />
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <td>Phòng tắm</td>
              <td>
                <v-radio-group
                  v-model="services.bathroom"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Phòng tắm khép kín'"
                    value="1"
                  />
                  <v-radio
                    :label="'Phòng tắm chung'"
                    value="13"
                  />
                </v-radio-group>
                <v-radio-group
                  v-model="services.heater"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Có bình nóng lạnh'"
                    value="2"
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
                  v-model="services.kitchen"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Khu bếp riêng'"
                    value="3"
                  />
                  <v-radio
                    :label="'Khu bếp chung'"
                    value="4"
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
                  v-model="services.aircond"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Có điều hòa'"
                    value="5"
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
                  v-model="services.velanda"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Có ban công'"
                    value="6"
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
                  v-model="services.elecPrice"
                  :rules="requiredField()"
                >
                  <v-radio
                    :label="'Điện nước giá dân'"
                    value="7"
                  />
                  <v-radio
                    :label="'Điện nước giá thuê'"
                    value="14"
                  />
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <td>Tiện ích khác</td>
              <td>
                <v-checkbox
                  v-model="services.other"
                  :label="'Tủ lạnh'"
                  value="8"
                  hide-details
                />
                <v-checkbox
                  v-model="services.other"
                  :label="'Máy giặt'"
                  value="9"
                  hide-details
                />
                <v-checkbox
                  v-model="services.other"
                  :label="'Giường tủ'"
                  value="10"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-form>
  </div>        
</template>

<script>
import { SERVICE_BY_NAME } from '@/consts/consts'
import validationRules from '@/helpers/validationRules'

export default {
    props: {
        defaultServices: {
            type: Array,
            default: () => ([])
        }
    },

    data () {
        return {
            formValue: false,
            form: {
                services: []
            },
            services: {
              withOwner: null,
              bathroom: null,
              heater: null,
              kitchen: null,
              aircond: null,
              velanda: null,
              elecPrice: null,
              other: []
            },
            serviceByName: SERVICE_BY_NAME
        }
    },

    computed: {
      hasCompletedForm () {
        return Object.keys(this.services).reduce((acc, key) => {
          return key == 'other' ? acc : ( acc && this.services[key] )
        }, true)
      }
    },

    watch: {
      formValue (value) {
        if (value && this.hasCompletedForm) this.onSubmitPost()
      },

      defaultServices: {
        handler (value) {
          if (value) {
            this.getChosenServices()
          }
        },
        deep: true
      }
    },

    mounted () {
        this.getChosenServices()
    },

    methods: {
        getChosenServices () {
            if (!this.defaultServices) return

            this.form.services = this.defaultServices
            this.convertArrayToServices()
        },

        onSubmitPost () {
            this.convertServices()
            this.$emit('on-submit-post', this.form.services)
        },

        convertServices () {
          const services = Object.keys(this.services).reduce((res, key) => {
            if (this.services[key] && this.services[key] != '0') {
              return res.concat(this.services[key])
            } else return res
          }, [])
          this.form.services = services
        },

        convertArrayToServices () {
          this.defaultServices.forEach(e => {
            const serviceName = this.serviceByName[e]

            if (serviceName == 'other') {
              if (!this.services.other) this.services.other = []
              this.services[serviceName].push(e)
            } else if (serviceName) {
              this.services[serviceName] = e
            }
          })
        },

        requiredField () {
            return [validationRules.requiredField]
        }
    }
}
</script>