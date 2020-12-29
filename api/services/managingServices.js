import {
    API_ROOM_SERVICE,
    API_ADMIN,
    API_USER,
    API_AUTHENTICATE_POST,
    API_GET_REVIEWS,
    API_AUTHENTICATE_REVIEW,
    API_GET_OWNERS,
    API_AUTHENTICATE_USER,
    API_GET_REPORTS
} from '@/api/apiUrl'

export default $axios => ({
    authenticatePost ({ post_id }) {
        return $axios.get(`${API_ADMIN}${API_ROOM_SERVICE}/${post_id}${API_AUTHENTICATE_POST}`)
    },
    
    getAccounts (payload) {
        return $axios.get(API_GET_OWNERS)
    },

    enableAccount ({ user_id }) {
        return $axios.get(`${API_ADMIN}${API_USER}/${user_id}${API_AUTHENTICATE_USER}`)
    },

    filterAccounts (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getReports () {
        return $axios.get(API_GET_REPORTS)
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