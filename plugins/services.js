import userServices from "@/api/services/userServices"
import roomServices from "@/api/services/roomServices"
import managingServices from "@/api/services/managingServices"

export default ({ $axios }, inject) => {
  inject("userServices", userServices($axios))
  inject("roomServices", roomServices($axios))
  inject("managingServices", managingServices($axios))
}
