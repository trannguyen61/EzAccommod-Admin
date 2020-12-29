import {
    API_ROOM_SERVICE,
    API_GET_ROOM_LIST,
    API_CREATE_POST,
    API_CREATE_REVIEW,
    API_CREATE_REPORT,
    API_GET_OWNER_ROOMS,
    API_PROLONG_TIME_POST,
    API_TOGGLE_ACTIVE,
    API_EDIT_ROOM,
    API_EDIT_POST,
    API_UPLOAD_IMAGE
} from '@/api/apiUrl'

export default $axios => ({
    getRoomList () {
        return $axios.get(API_GET_ROOM_LIST)
    },

    filterRooms (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    reportRoom ({ post_id, data }) {
        return $axios.post(`${API_ROOM_SERVICE}/${post_id}${API_CREATE_REPORT}`, data)
    },

    getRoomDetail ({ post_id }) {
        return $axios.get(`${API_GET_ROOM_LIST}/${post_id}`)
    },

    submitReview ({ post_id, data }) {
        return $axios.post(`${API_ROOM_SERVICE}/${post_id}${API_CREATE_REVIEW}`, data)
    },

    getReviews () {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    submitPost (payload) {
        return $axios.post(API_CREATE_POST, payload)
    },

    uploadImage ({ post_id, data }) {
        return $axios.post(`${API_ROOM_SERVICE}/${post_id}${API_UPLOAD_IMAGE}`, data)
    },

    editRoom ({ post_id, data }) {
        return $axios.put(`${API_ROOM_SERVICE}/${post_id}${API_EDIT_ROOM}`, data)
    },

    editPost ({ post_id, data }) {
        return $axios.put(`${API_ROOM_SERVICE}/${post_id}${API_EDIT_POST}`, data)
    },

    toggleActivePost ({ post_id }) {
        return $axios.put(`${API_ROOM_SERVICE}/${post_id}${API_TOGGLE_ACTIVE}`)
    },

    prolongTimePost ({ post_id, data }) {
        return $axios.put(`${API_ROOM_SERVICE}/${post_id}${API_PROLONG_TIME_POST}`, data)
    },

    getOwnerRooms () {
        return $axios.post(API_GET_OWNER_ROOMS)
    },
})
