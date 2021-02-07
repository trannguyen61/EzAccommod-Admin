import {
    API_SIGNUP,
    API_LOGIN,
    API_GET_NOTIF
} from '@/api/apiUrl'

export default $axios => ({
    signup (payload) {
        return $axios.post(API_SIGNUP, payload)
    },

    login (payload) {
        return $axios.post(API_LOGIN, payload)
    },

    getUserProfile (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    loginWithFacebook (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getNotif () {
        return $axios.get(API_GET_NOTIF)
    },

    readNotif ({ id }) {
        return $axios.get(`${API_GET_NOTIF}/${id}`)
    }
})


