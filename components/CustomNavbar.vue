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
      <v-btn
        icon
        class="mr-6"
      >
        <v-badge
          :content="notif"
          :value="notif"
          color="primary"
          overlap
        >
          <v-icon>
            fas fa-bell
          </v-icon>
        </v-badge>
      </v-btn>
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

    <!-- Button group for medium and up screens + Not logged in yet -->
    <template v-if="$vuetify.breakpoint.mdAndUp && !loggedIn">
      <button
        v-ripple
        class="custom-btn custom-btn--text mx-5"
        @click="$router.push('/auth/register')"
      >
        Đăng ký
      </button>
      <button
        v-ripple
        class="custom-btn custom-btn--text custom-btn__densed"
        @click="$router.push('/auth/login')"
      >
        Đăng nhập
      </button>
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

    <!-- Hamburger toggle navigation bar for small and down screen - Including sidebar -->
    <template v-if="$vuetify.breakpoint.smAndDown && !sidebar">
      <v-menu 
        offset-y
        transition="slide-y-transition"
        min-width="120px"
      >
        <template #activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
            icon 
            v-on="on" 
            @click="menu = !menu"
          >
            <v-icon color="primary">
              fas fa-bars
            </v-icon>
          </v-btn>
        </template>

        <template v-if="!loggedIn">
          <v-list class="d-flex flex-column">
            <button
              v-ripple
              class="custom-btn custom-btn--text"
              @click="$router.push('/auth/register')"
            >
              Đăng ký
            </button>
            <button
              v-ripple
              class="custom-btn custom-btn--text custom-btn__secondary"
              @click="$router.push('auth/login')"
            >
              Đăng nhập
            </button>
          </v-list>
        </template>

        <template v-else>
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
        </template>
      </v-menu>
    </template>
  </nav>
</template>

<script>
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
      menu: false,
      notif: 1
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },

  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    
    async onLogout () {
      this.logout()
      this.$router.push('/')
    }
  }
}
</script>