<template>
  <div class="create-post">
    <div class="item--title item--title__secondary-ribbon">
      Tạo bài đăng cho thuê phòng
    </div>
    <div class="create-post--content mt-4">
      <create-post-stepper
        @on-get-post-fee="onGetPostFee"
        @on-submit-post="onSubmitPost"
      />    
    </div>
  </div>
</template>

<script>
import CreatePostStepper from '@/components/app/CreatePostStepper'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    components: { CreatePostStepper },

    layout: 'app',

    data () {
      return {
        postFee: ''
      }
    },

    methods: {
        ...mapActions({
            submitPost: 'room/submitPost',
            getPostFee: 'room/getPostFee'
        }),

        async onSubmitPost (form) {
            const data = form
            const handler = new ApiHandler()
                            .setData(data)
            await this.submitPost(handler)
        },

        async onGetPostFee (time) {
            const data = { time }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.postFee = res
                            })
            await this.getPostFee(handler)
        },

    }
}
</script>