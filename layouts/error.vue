<template>
  <div class="d-flex flex-column justify-center align-center text-center">
    <img
      :src="require('@/assets/images/app/error.jpg')"
      alt=""
      class="mb-6"
      style="width: 40%"
    >
    <h2 v-if="error.statusCode == 404">
      Không tìm thấy trang!
    </h2>
    <h2 v-else>
      Máy chủ hiện tại đang có lỗi (┬┬﹏┬┬)<br>Vui lòng chờ ít phút để yêu cầu lại.
    </h2>
    <nuxt-link to="/">
      <button
        v-ripple
        class="custom-btn custom-btn--text custom-btn__densed my-6"
      >
        Trang chủ
      </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
    props: {
      error: {
        type: Object,
        default: null
      }
    },

    head () {
      return 'Lỗi'
    }
}
</script>
