<template>
  <div class="Bar">
    <span class="pageName">{{ pageName }}</span>
    <span class="userName">{{ userName }}</span>
    <audio
      id="soundtrack"
      src="http://localhost:3000/voice/newOrder.m4a"
      type="audio/ogg"
    ></audio>
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
import { useRouter } from "vue-router";
import { menuList } from "@/config/pages/menu";
import { getCookies } from "@/config/commonFunc";
import { getHotelBaseInfo } from "@/api/userBase";

export default defineComponent({
  name: "layout",
  setup() {
    const url = null
    const router = useRouter();
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
      const audio = new Audio(url);
      // websocket
      // 其实路由拦截后，没有登陆的进入不到这个页面
      const isLogin = getCookies("user/login");
      const hotel_id = getCookies("hotel/hotel_id");
      const { hotel_is_auto } = await getHotelBaseInfo({ hotel_id });
      if (isLogin && hotel_is_auto) {
        socket.onopen = () => {
          console.log("open");
        };
        socket.onmessage = (event) => {
          const { type, voice } = JSON.parse(event.data);
          switch (type) {
            case "NEW-ORDER":
              audio.src = voice;
              audio.play();

              // 判断页面路径是否是consume-order，如果是，需要获取请求
              // 为了减少复杂性，将页面的url假如一个params，这样order页面监听即可
              if (router.currentRoute.value.path.includes('consume-order')) {
                router.replace(`/ebooking/consume-order?newOrder=true&time=${new Date().getTime()}`)
              }
              break;
          }
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
