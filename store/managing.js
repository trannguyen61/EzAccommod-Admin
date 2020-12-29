import ResponseHelper from '@/helpers/ResponseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    async authenticatePost({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.authenticatePost(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
            return response.getData()
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi xác thực bài viết", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async getAccounts({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.getAccounts(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
            return response.getData()
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi tải tài khoản", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async enableAccount({ commit }, handler) {
        const onRequest = async () => {
          const rawData = await this.$managingServices.enableAccount(handler.data)
          const response = new ResponseHelper(rawData)
  
          if (response.isSuccess()) {
            Vue.notify({
                type: 'success',
                title: 'Duyệt tài khoản thành công',
            })
          } else {
            const errorMessage = response.getErrorMessage()
            throw new CustomError("Có lỗi khi duyệt tài khoản", errorMessage)
          }  
        }
  
        await handler.setOnRequest(onRequest).execute()
    },

    async filterAccounts({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.filterAccounts(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
            return response.getData()
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi tải tài khoản", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async approvePost({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.approvePost(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          Vue.notify({
              type: 'success',
              title: 'Duyệt bài đăng thành công',
          })
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi duyệt bài đăng", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
  },

  async getReports({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$managingServices.getReports(handler.data)
      const response = new ResponseHelper(rawData)

      if (response.isSuccess()) {
          return response.getData()
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi tải báo cáo", errorMessage)
      }  
    }

    await handler.setOnRequest(onRequest).execute()
  },

  async resolveReport({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$managingServices.resolveReport(handler.data)
      const response = new ResponseHelper(rawData)

      if (response.isSuccess()) {
        Vue.notify({
            type: 'success',
            title: 'Giải quyết báo cáo thành công',
        })
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi giải quyết báo cáo", errorMessage)
      }  
    }

    await handler.setOnRequest(onRequest).execute()
  },

  async getReviews({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$managingServices.getReviews(handler.data)
      const response = new ResponseHelper(rawData)

      if (response.isSuccess()) {
          return response.getData()
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi tải bình luận", errorMessage)
      }  
    }

    await handler.setOnRequest(onRequest).execute()
  },

  async authenticateReview({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$managingServices.authenticateReview(handler.data)
      const response = new ResponseHelper(rawData)

      if (response.isSuccess()) {
        Vue.notify({
          type: 'success',
          title: 'Duyệt bình luận thành công',
        })
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi duyệt bình luận", errorMessage)
      }  
    }

    await handler.setOnRequest(onRequest).execute()
  },

}

