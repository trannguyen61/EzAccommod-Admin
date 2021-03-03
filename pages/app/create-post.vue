<template>
  <div class="create-post">
    <div class="item--title item--title__secondary-ribbon">
      Tạo bài đăng cho thuê phòng
    </div>
    <div class="create-post--content mt-4">
      <create-general-post-stepper />
    </div>
  </div>
</template>

<script>
import CreateGeneralPostStepper from '@/components/app/CreateGeneralPostStepper'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    components: { CreateGeneralPostStepper },

    layout: 'app',

    data () {
      return {
      }
    },

    mounted () {
      this.onGetPusher()
    },

    methods: {
        ...mapActions({
            submitPost: 'room/submitPost',
            getPusher: 'user/getPusher'
        }),

        onGetPusher () {
          this.getPusher(this)
        },

        async onSubmitPost (form) {
            const data = form
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(() => {
                              this.$router.push('post-list')
                            })
            await this.submitPost(handler)
        },
    }
}
</script>