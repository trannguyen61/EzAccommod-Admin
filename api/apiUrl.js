/*
* BASE URLS
*/
export const BASE_URL = 'https://easy-accomod-api.herokuapp.com/api'
export const IMAGE_UPLOAD_URL = 'https://api.imgur.com/3/upload'
export const API_ADMIN = '/admin'

/*
*   USER SERVICES
*/
export const API_USER = '/user'
export const API_SIGNUP = API_USER + '/register'
export const API_LOGIN = API_USER + '/login'

/*
* ROOM SERVICES
*/
export const API_ROOM_SERVICE = '/post'
export const API_GET_ALL_POST = API_ROOM_SERVICE + '/get-all-posts'
export const API_GET_ROOM_LIST = API_ROOM_SERVICE
export const API_CREATE_POST = API_ROOM_SERVICE + '/new-post'
export const API_CREATE_REVIEW = '/new-review'
export const API_CREATE_REPORT = '/reportRoom'
export const API_GET_OWNER_ROOMS = API_ROOM_SERVICE + '/get-user-post'
export const API_PROLONG_TIME_POST = '/prolong-time-post'
export const API_TOGGLE_ACTIVE = '/toggle-active-post'
export const API_EDIT_ROOM = '/edit-room'
export const API_EDIT_POST = '/edit-post'
export const API_UPLOAD_IMAGE = '/upload-image'

/*
* MANAGING SERVICES
*/
export const API_AUTHENTICATE_POST = '/authenticate-post'
export const API_GET_REVIEWS = API_ADMIN + '/review'
export const API_AUTHENTICATE_REVIEW = '/authenticate-review'
export const API_GET_OWNERS = API_ADMIN + API_USER + '/get-all-owner'
export const API_AUTHENTICATE_USER = '/authenticate-owner'
export const API_GET_REPORTS = API_ADMIN + '/report'

/*
*   NOTIFICATIONS
*/
export const API_GET_NOTIF = '/notification'
export const API_READ_ALL_NOTIF = API_GET_NOTIF + '/read-all'