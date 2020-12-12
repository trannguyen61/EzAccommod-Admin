<template>
  <div class="default-layout">
    <notifications position="top right" />
    <v-app>
      <custom-navbar />
      <v-container
        fluid
        class="container"
      >
        <Nuxt />
      </v-container>  
    </v-app>
  </div>
</template>

<script>
import CustomNavbar from '@/components/CustomNavbar'

export default {
    components: { CustomNavbar }
}
</script>
