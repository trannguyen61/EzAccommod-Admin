import ResponseHelper from '@/helpers/ResponseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
  access_token: null,
  user: null,
  notif: [],
  unreadNotif: 0
})

export const getters = {
  access_token(state) {
    return state.access_token
  },

  loggedIn(state) {
    return !!state.access_token
  },

  user(state) {
    return state.user
  },

  isAdmin(state) {
    return state.user && state.user.role == 'admin'
  },

  userName(state) {
    return state.user ? `${state.user.lastName} ${state.user.firstName}` : null
  },

  notif(state) {
    return state.notif
  },

  unreadNotif(state) {
    return state.unreadNotif
  }
}

export const mutations = {
  setAccessToken (state, access_token) {
    if (!access_token) {
      localStorage.removeItem('access_token')
      state.access_token = null
    } else {
      localStorage.setItem('access_token', access_token)
      state.access_token = access_token  
    }
  },

  setUser (state, user) {
    if (!user) {
      localStorage.removeItem('user')
      state.user = null
    } else {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user  
    }
  }, 

  setNotif (state, notif) {
    state.notif = notif
  },

  setUnreadNotif (state, number) {
    state.unreadNotif = number
  }
}

export const actions = {
    async signup({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.signup(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { token, user } = response.getData()
          commit('setAccessToken', token)
          commit('setUser', user)
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng ký thất bại", errorMessage)
        }
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async login({ commit, state }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.login(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { token, user } = response.getData()

          if (user.role != 'admin') {
            throw new CustomError("Đăng nhập thất bại", 'Vui lòng đăng nhập tài khoản quản trị để tiếp tục.')
          }

          commit('setAccessToken', token)
          commit('setUser', user)
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng nhập thất bại", errorMessage)
        }
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async loginWithFacebook({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.loginWithFacebook(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { access_token } = response.getData()
          commit('setAccessToken', access_token)
          return access_token
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng nhập thất bại", errorMessage)
        }
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async fetchUser({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.getUserProfile()
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
          commit('setUser', response.getData())
          if (!handler.turnOffSuccess) {
            Vue.notify({
                type: 'success',
                title: 'Đăng nhập thành công',
                text: 'Chào mừng bạn đến với EzAccommod! Chúc bạn có những trải nghiệm tuyệt vời tại trang.'
            })
          }
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Lấy thông tin người dùng thất bại", errorMessage)
        }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async getNotif({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.getNotif(handler.data)
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
          commit('setNotif', response.getData().noti)
          commit('setUnreadNotif', response.getData().not_seen_noti + "")
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Lấy thông báo người dùng thất bại", errorMessage)
        }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async readNotif({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.readNotif(handler.data)
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Lấy thông báo người dùng thất bại", errorMessage)
        }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async logout ({commit}) {
      commit('setAccessToken', null)
      commit('setUser', null)
      Vue.notify({
        type: 'success',
        title: 'Đăng xuất thành công',
      })
    }
}

