import ResponseHelper from '@/helpers/ResponseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
  access_token: null,
  user: null,
  notif: [],
  unreadNotif: 0,
  pusher: false
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
  },

  pusher(state) {
    return state.pusher
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

  concatNotif (state, notif) {
    state.notif = [notif, ...state.notif]
  },

  setUnreadNotif (state, number) {
    state.unreadNotif = number
  },

  setPusher (state, value) {
    state.pusher = value
  }
}

export const actions = {
    async login({ commit, state, dispatch }, handler) {
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

    getPusher({commit, getters}, vm) {
      if (getters.pusher) return

      var channel = vm.$pusher.subscribe("admin-notification")
      commit('setPusher', true)

      channel.bind("new-post", data => {
        console.log("this shit work!!", data)
        commit('concatNotif', data.data.notification)
        commit('setUnreadNotif', data.data.not_seen_noti)
      })
    },  

    removePusher({commit}, vm) {
      vm.$pusher.unsubscribe('admin-notification')
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

    async readAllNotif({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.readAllNotif(handler.data)
        const response = new ResponseHelper(rawData)
        
        if (response.isError()) {
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

