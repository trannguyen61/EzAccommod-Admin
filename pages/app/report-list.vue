<template>
  <div class="report-list">
    <div class="item--title item--title__secondary-ribbon">
      Danh sách báo cáo vi phạm
    </div>

    <div class="report-list--content">
      <v-data-table
        :headers="headers"
        :items="reports"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        multi-sort
      >
        <template #item.report="{ item }">
          <ul>
            <li
              v-for="rep in item.report"
              :key="rep"
            >
              {{ violations.find(e => e.id == rep).text }}
            </li>
          </ul>
        </template>
        <template #item.resolve="{ item }">
          <button
            v-if="!item.resolved"
            v-ripple
            type="button"
            class="custom-btn custom-btn--text custom-btn__densed"
            @click="onResolveReport(item)"
          >
            <v-icon>fas fa-check</v-icon>
          </button>
          <v-icon
            v-else
            color="success"
          >
            fas fa-check
          </v-icon>
        </template>
        <template #no-data>
          Không có báo cáo vi phạm nào.
          <v-btn
            class="ml-auto mr-auto"
            color="primary"
            @click="onGetReports"
          >
            Tải lại
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { ROOM_VIOLATIONS } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    layout: 'app',

    data () {
        return {
            reports: [{
                id: '123',
                report: [1, 3],
                reason: 'Phòng trọ rất chán. Khóc xong rồi thì thôi cất poster bà chủ vào góc.',
                createdTime: '06/01/2000',
                resolved: false
            }],
            chosenReport: null,
            totalItems: 10,
            loading: false,
            headers: [
              { text: "ID", value: "id", width: '8%' },
              { text: "Lý do", value: "report"},
              { text: "Chi tiết", value: "reason", sortable: false },
              { text: "Ngày báo cáo", value: "createdTime", width: '10%' },
              { text: "Trạng thái giải quyết", value: "resolve", width: '10%', filterable: false, sortable: false},
            ],
            options: {},
            violations: ROOM_VIOLATIONS
        }
    },

      watch: {
      options: {
        async handler (val, oldVal) {
          if (Object.keys(oldVal).length) await this.onGetReports()
        },
        deep: true,
      }
      },

    methods: {
        ...mapActions({
          getReports: "room/getReposts",
          resolveReport: 'managing/resolveReport'
        }),

        async onResolveReport (value) {
          const data = { id: value.id }
          const handler = new ApiHandler().setData(data)
          await this.resolveReport(handler)
        },

        async onGetReports (getFullPage = false) {
          this.loading = true
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          const handler = new ApiHandler()
            .setOnResponse((data) => {
              this.reports = data.reports
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
            await this.getReports({ handler })
          } else {
            await this.getReports({ handler, query })
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