<template>
  <v-navigation-drawer
    v-model="drawer"
    color="secondary"
    :permanent="!$vuetify.breakpoint.smAndDown"
    :temporary="$vuetify.breakpoint.smAndDown"
    :absolute="$vuetify.breakpoint.mdAndDown"
    :expand-on-hover="$vuetify.breakpoint.mdOnly"
    mini-variant-width="60px"
    class="side-navbar"
  >
    <v-list
      dense
      nav
    >
      <v-list-item class="my-2">
        <v-list-item-icon>
          <v-icon>far fa-user-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-uppercase">
            {{ userName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      dense
      nav
    >
      <nuxt-link to="/app/create-post">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-edit</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Tạo bài đăng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link to="/app/post-list">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-list</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Danh sách bài đăng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link to="/app/acc-list">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-address-card</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Danh sách tài khoản</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link to="/app/approve-posts">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-toggle-on</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Duyệt bài đăng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link to="/app/approve-reviews">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-star</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Duyệt bình luận</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link to="/app/report-list">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-exclamation-triangle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Báo cáo vi phạm</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            drawer: false
        }
    },

    computed: {
      ...mapGetters({
        userName: 'user/userName'
      })
    }
}
</script>