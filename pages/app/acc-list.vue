<template>
  <div class="acc-list">
    <div class="item--title item--title__secondary-ribbon">
      Danh sách bài đăng cho thuê phòng
    </div>

    <div class="acc-list--content">
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Tìm kiếm tài khoản"
        single-line
        hide-details
        class="search-field"
      />
      
      <v-data-table
        :headers="headers"
        :items="accounts"
        :options.sync="options"
        :server-items-length="totalItems"
        :search="search"
        :loading="loading"
        multi-sort
      >
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
        <template #item.check="{ item }">
          <button
            v-ripple
            type="button"
            :disabled="item.checked"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onEnableAccount(item)"
          >
            <v-icon>fas fa-check-circle</v-icon>
          </button>
        </template>
        <template #no-data>
          <v-btn
            class="ml-auto mr-auto"
            color="primary"
            @click="onGetAccounts"
          >
            Tải lại
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    layout: 'app',

    data () {
        return {
            accounts: [{
                id: '123',
                name: 'Nakayama Haruki',
                identityNum: '12121212',
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                phone: '113',
                email: 'ur_mom_gay@gmail.com',
                createdTime: '06-01-2000',
                checked: false
            }],
            chosenAcc: null,
            totalItems: 10,
            loading: false,
            search: null,
            headers: [
              { text: "ID", value: "id", width: "5%"},
              { text: "Họ tên", value: "name", width: "15%" },
              { text: "CCCD/CMND", value: "identityNum", width: "8%", sortable: false},
              { text: "Địa chỉ thường trú", value: "address", width: "20%", sortable: false},
              { text: "SĐT", value: "phone", width: "8%", sortable: false},
              { text: "Email", value: "email", width: "10%"},
              { text: "Thời gian đăng ký", value: "createdTime" },
              { text: "Trạng thái", value: "checked", filterable: false},
              { text: "Duyệt", value: "check", filterable: false, sortable: false}
            ],
            options: {}
        }
    },

      watch: {
        options: {
            async handler (val, oldVal) {
                if (Object.keys(oldVal).length) await this.onGetAccounts()
            },
            deep: true,
        },

        search (value) {
            if (this.accounts.length != this.totalItems) this.onGetAccounts(true)
            else {
                this.onFilterAccounts()
            }
        }
      },

    methods: {
        ...mapActions({
          getAccounts: "managing/getAccounts",
          enableAccount: 'managing/enableAccount',
          filterAccounts: 'managing/filterAccounts'
        }),

        async onFilterAccounts () {
          const data = { search: this.search }
          const handler = new ApiHandler().setData(data)
          await this.filterAccounts(handler)
        },

        async onEnableAccount (item) {
          const data = { item }
          const handler = new ApiHandler().setData(data)
          await this.enableAccount(handler)
        },

        async onGetAccounts (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.accounts = data.accounts
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
            await this.getAccounts({ handler })
          } else {
            await this.getAccounts({ handler, query })
          }
        },

        customSortAndPaginate(sortBy, sortDesc) {
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.accounts = this.accounts.sort((a, b) => {
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