<template>
  <div class="app-layout">
    <notifications position="top right" />
    <v-app>
      <custom-navbar
        :sidebar="true"
        @toggle-navbar="toggleNavbar"
      />
      <v-container
        fluid
        class="container"
      >
        <side-navbar ref="side-navbar" />
        <main>
          <Nuxt />
        </main>
      </v-container>  
    </v-app>
  </div>
</template>

<script>
import CustomNavbar from '@/components/CustomNavbar'
import SideNavbar from '@/components/app/SideNavbar'

export default {
    components: { CustomNavbar, SideNavbar },

    methods: {
        toggleNavbar () {
            this.$refs['side-navbar'].drawer = true
        }
    }
}
</script>
