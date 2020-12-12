/*
* COMMON CONSTS
*/
export const DAY_OF_MONTH = Array.from({length: 31}, (v, k) => k+1)
export const HOUR_OF_DAY = Array.from({length: 25}, (v, k) => ({ hour: k, name: `${k} giờ` }))

/*
*   ROOM CONSTS
*/
export const ROOM_PRICE_RANGE = [ 500, 4500 ]
export const ROOM_TYPES = [
    { name: 'Phòng trọ', value: 1}, 
    { name: 'Chung cư mini', value: 2},
    { name: 'Nhà nguyên căn', value: 3}, 
    { name: 'Chung cư nguyên căn', value: 4} 
]
export const ROOM_SQUARE_RANGE = [ 10, 100 ]
export const ROOM_FACILITIES = [ 
    { name: 'Phòng tắm khép kín', value: 1}, 
    { name: 'Có nóng lạnh', value: 2}, 
    { name: 'Khu bếp riêng', value: 3 }, 
    { name: 'Khu bếp chung', value: 4 }, 
    { name: 'Có điều hòa', value: 5}, 
    { name: 'Có ban công', value: 6 }, 
    { name: 'Điện nước giá dân', value: 7 }, 
    { name: 'Có tủ lạnh', value: 8 }, 
    { name: 'Có máy giặt', value: 9 }, 
    { name: 'Có giường tủ', value: 10 } 
]
export const ROOM_VIOLATIONS = [
    { id: 1, text: 'Thông tin không chính xác' },
    { id: 2, text: 'Phòng không tồn tại' },
    { id: 3, text: 'Chủ trọ có thái độ không đúng mực' }
]