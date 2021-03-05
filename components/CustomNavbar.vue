<template>
  <nav class="custom-navbar">
    <nuxt-link
      to="/"
      class="logo"
    >
      EzAccomod
    </nuxt-link>

    <!-- Button for all screens + Logged in -->
    <template v-if="loggedIn">
      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            class="mr-6"
            v-on="on"
          >
            <v-badge
              :content="unreadNotif"
              :value="unreadNotif"
              color="primary"
              overlap
            >
              <v-icon>
                fas fa-bell
              </v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list class="notification-bar">
          <v-btn
            small
            text
            class="d-block ml-auto mr-1 mb-3"
            @click="onReadAllNotif"
          >
            Đánh dấu đọc tất cả
            <v-icon
              small
              class="ml-3"
            >
              fas fa-check-double
            </v-icon>
          </v-btn>

          <div
            v-if="!notif.length"
            class="text-center mb-3"
          >
            Không có thông báo
          </div>

          <v-list-item
            v-for="noti in notif"
            :key="noti.id"
            :class="getNotiClass(noti)"
          >
            <small class="mr-3">{{
              noti.created ? formatDate(noti.created.split("T")[0]) : ""
            }}</small>
            {{ getNotiText(noti) }}
            <v-btn
              v-if="!noti.read"
              class="ml-6"
              icon
              @click="onReadNotif(noti)"
            >
              <v-icon>fas fa-check</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Button for medium and up screens + Logged in -->
    <template v-if="$vuetify.breakpoint.mdAndUp && loggedIn">
      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>fas fa-user</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <button
                v-ripple
                class="custom-btn custom-btn--text custom-btn__block"
                text
              >
                <nuxt-link to="/app">
                  Thông tin cá nhân
                </nuxt-link>
              </button>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <button
                v-ripple
                class="custom-btn custom-btn--text custom-btn__block"
                text
                @click="onLogout"
              >
                Đăng xuất
              </button>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Hamburger toggle navigation bar for small and down screen - Excluding sidebar -->
    <template v-if="$vuetify.breakpoint.smAndDown && sidebar">
      <v-icon
        color="primary"
        @click="$emit('toggle-navbar')"
      >
        fas fa-bars
      </v-icon>
    </template>
  </nav>
</template>

<script>
import ApiHandler from "@/helpers/ApiHandler"
import { formatISOdate } from "@/helpers/dateHelper"
import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    sidebar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      menu: false,
      formatDate: formatISOdate
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      notif: "user/notif",
      unreadNotif: "user/unreadNotif"
    })
  },

  watch: {
    loggedIn(value) {
      if (value) {
        this.onGetNotif()
      }
    }
  },

  mounted() {
    if (this.loggedIn) this.onGetNotif()
  },

  methods: {
    ...mapActions({
      logout: "user/logout",
      getNotif: "user/getNotif",
      readNotif: "user/readNotif",
      removePusher: "user/removePusher",
      readAllNotif: "user/readAllNotif"
    }),

    onRemovePusher() {
      this.removePusher(this)
    },

    async onGetNotif() {
      const handler = new ApiHandler()
      await this.getNotif(handler)
    },

    async onReadNotif(noti) {
      const data = {
        id: noti.ID
      }
      const handler = new ApiHandler().setData(data).setOnResponse(() => {
        this.onGetNotif()
      })
      await this.readNotif(handler)
    },

    async onReadAllNotif() {
      const handler = new ApiHandler().setOnResponse(() => {
        this.onGetNotif()
      })
      await this.readAllNotif(handler)
    },

    async onLogout() {
      this.onRemovePusher(this)
      this.logout()
      this.$router.push("/")
    },

    getNotiClass(noti) {
      if (noti.seen) return "noti noti--seen"
      else if (noti.type == "post") return "noti noti--post"
      else if (noti.type == "review") return "noti noti--review"
      else if (noti.type == "report") return "noti noti--report"
    },

    getNotiText(noti) {
      if (noti.type == "post") return "Có bài đăng mới cần được xét duyệt."
      if (noti.type == "review") return "Có bình luận mới cần được xét duyệt"
    }
  }
}
</script>
