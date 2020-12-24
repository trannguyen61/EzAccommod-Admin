export const actions = {
    async nuxtClientInit({ commit, dispatch }) {
      const access_token = localStorage.getItem('access_token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (access_token) {
        commit('user/setAccessToken', access_token)
        commit('user/setUser', user)
      }
    }
}