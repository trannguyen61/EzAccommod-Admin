<template>
  <div
    class="room-list-item"
  >
    <img
      :src="require('@/assets/images/room01.jpg')"
      alt=""
      class="img"
    >
    <div class="content">
      <div
        class="title-group"
        @click="$router.push(`/${room.id}`)"
      >
        <div class="title">
          {{ defaultRoom.roomTypes.find(e => e.value == room.type).name || '' }}
          <v-icon
            color="dark"
            class="icon"
          >
            fas fa-chevron-right
          </v-icon>
        </div>
        <div class="subtitle-2">
          {{ room.square }} m<sup>2</sup> - {{ room.roomNum }} phòng
        </div>
        <div class="price">
          {{ new Intl.NumberFormat('vi-VN').format(room.price.replace(/\D/g, '')) }} đồng/tháng
        </div>
      </div>
      <v-divider class="my-3" />
      <div class="text">
        <div class="detail">
          {{ room.address }} <br>
          {{ room.detailedAddress }}
        </div>
        <ul class="facilities ml-auto mr-auto">
          <li
            v-for="fac in room.facilities"
            :key="fac"
          >
            {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ROOM_TYPES, ROOM_FACILITIES } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    props: {
        room: {
            type: Object,
            required: true
        }
    },

    data () {
        return {
            defaultRoom: {
                roomTypes: ROOM_TYPES,
                roomFacilities: ROOM_FACILITIES
            }
        }
    }
}
</script>