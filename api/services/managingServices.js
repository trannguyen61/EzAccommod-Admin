import {
    API_ROOM_SERVICE,
    API_ADMIN,
    API_AUTHENTICATE_POST,
    API_GET_REVIEWS,
    API_AUTHENTICATE_REVIEW
} from '@/api/apiUrl'

export default $axios => ({
    authenticatePost ({ post_id }) {
        return $axios.get(`${API_ADMIN}${API_ROOM_SERVICE}/${post_id}${API_AUTHENTICATE_POST}`)
    },
    
    getAccounts (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    enableAccount (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    filterAccounts (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getReports (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    resolveReport (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getReviews () {
        return $axios.get(API_GET_REVIEWS)
    },

    authenticateReview ({ post_id }) {
        return $axios.get(`${API_GET_REVIEWS}/${post_id}${API_AUTHENTICATE_REVIEW}`)
    },
})