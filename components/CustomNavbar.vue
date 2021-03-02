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

        <v-list>
          <v-list-item
            v-for="noti in notif"
            :key="noti.id"
            :class="getNotiClass(noti)"
          >
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
import ApiHandler from '@/helpers/ApiHandler'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    sidebar: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      menu: false
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      notif: 'user/notif',
      unreadNotif: 'user/unreadNotif'
    })
  },

  watch: {
    loggedIn (value) {
      if (value) {
        this.onGetNotif()
      }
    }
  },

  mounted () {
    if (this.loggedIn) this.onGetNotif()
  }, 

  methods: {
    ...mapActions({
      logout: 'user/logout',
      getNotif: 'user/getNotif',
      readNotif: 'user/readNotif'
    }),

    async onGetNotif () {
          const handler = new ApiHandler()
          await this.getNotif(handler)
    },

    async onReadNotif (noti) {
      const data = {
        id: noti.ID
      }
      const handler = new ApiHandler().setData(data).setOnResponse(() => {
        this.onGetNotif()
      })
      await this.readNotif(handler)
    },
    
    async onLogout () {
      this.logout()
      this.$router.push('/')
    },

    getNotiClass (noti) {
      if (noti.seen) return 'noti--seen'
      else return 'noti'
    },
    
    getNotiText (noti) {
      if (noti.type == 'post') return 'Có bài đăng mới cần được xét duyệt.'
      if (noti.type == 'review') return 'Có bình luận mới cần được xét duyệt'
    }
  }
}
</script>