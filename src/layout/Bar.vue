<template>
  <div class="Bar">
    <span class="pageName">{{ pageName }}</span>
    <span class="userName">{{ userName }}</span>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
import { menuList } from "@/config/pages/menu";
import { getCookies } from "@/config/commonFunc";
import { getHotelBaseInfo } from '@/api/userBase'

export default defineComponent({
  name: "layout",
  setup() {
    const that = getCurrentInstance();
    const socket = that.ctx.$socket;
    const proxy = that?.proxy;
    const pageName = computed(() => {
      const path = proxy?.$route.path;
      const pageNameUrl = path.split("/")[2];
      let pageName = "-";
      menuList.forEach(({ name, content }) => {
        if (content === pageNameUrl) pageName = name;
      });

      return pageName;
    });
    onMounted(async () => {
      // websocket
      // 其实路由拦截后，没有登陆的进入不到这个页面
      const isLogin = getCookies("user/login");
      const hotel_id = getCookies("hotel/hotel_id")
      const { hotel_is_auto } = await getHotelBaseInfo({ hotel_id });
      if (isLogin && hotel_is_auto) {
        socket.onopen = () => {
          console.log("open");
        };
        socket.onmessage = (event) => {
          console.log(event);
        };
        socket.onclose = () => {
          console.log("close connect to");
        };
      }
    });
    return {
      pageName,
      userName: getCookies("user/user_name") || "-",
    };
  },
});
</script>

<style lang="less" scoped>
.Bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ededed;

  .pageName {
    font-size: 20px;
    margin-left: 20px;
    font-weight: normal;
    width: 120px;
  }
}
</style>
