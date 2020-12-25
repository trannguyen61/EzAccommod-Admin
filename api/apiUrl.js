/*
* BASE URLS
*/
export const BASE_URL = 'https://easy-accomod-api.herokuapp.com/api'
export const IMAGE_UPLOAD_URL = 'https://api.imgur.com/3/upload'

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
export const API_GET_ROOM_LIST = API_ROOM_SERVICE
export const API_CREATE_POST = API_ROOM_SERVICE + '/new-post'
export const API_CREATE_REVIEW = '/new-review'
export const API_CREATE_REPORT = '/reportRoom'
export const API_FAVORITE_ROOM = '/add-favorite'
export const API_GET_OWNER_ROOMS = API_ROOM_SERVICE + '/get-user-post'