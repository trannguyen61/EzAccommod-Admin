<template>
  <div class="acc-list">
    <div class="item--title item--title__secondary-ribbon">
      Danh sách tài khoản
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
        <template #item.name="{ item }">
          {{ `${item.lastName} ${item.firstName}` }}
        </template>
        <template #item.checked="{ item }">
          <v-icon
            v-if="item.authenticated"
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
            v-if="!item.authenticated"
            v-ripple
            type="button"
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
            accounts: [],
            chosenAcc: null,
            totalItems: 10,
            loading: false,
            search: null,
            headers: [
              { text: "ID", value: "_id", width: "5%"},
              { text: "Họ tên", value: "name", width: "15%" },
              { text: "CCCD/CMND", value: "socialID", width: "8%", sortable: false},
              { text: "Địa chỉ thường trú", value: "address", width: "20%", sortable: false},
              { text: "SĐT", value: "phoneNumber", width: "8%", sortable: false},
              { text: "Email", value: "email", width: "10%"},
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

      mounted () {
        this.onGetAccounts()
      },

    methods: {
        ...mapActions({
          getAccounts: "managing/getAccounts",
          enableAccount: 'managing/enableAccount',
          filterAccounts: 'managing/filterAccounts'
        }),

        async onFilterAccounts () {
          const data = { search: this.search }
          const handler = new ApiHandler()
                        .setData(data)
                    
          await this.filterAccounts(handler)
        },

        async onEnableAccount (item) {
          const data = { user_id: item._id }
          const handler = new ApiHandler()
                        .setData(data)
                        .setOnResponse(() => {
                          item.authenticated = true
                        })
          await this.enableAccount(handler)
        },

        async onGetAccounts (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.accounts = data.users
              this.totalItems = data.users.length
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
          //   await this.getAccounts({ handler })
          // } else {
          //   await this.getAccounts({ handler, query })
          // }
          await this.getAccounts(handler)
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