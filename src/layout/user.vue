<template>
  <div class="layout">
    <user-login v-if="!isLogin" />
    <div v-else>
      <live-user-base />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { getCookies } from '@/config/commonFunc'
import userLogin from "@/views/userLogin.vue";
import liveUserBase from '@/views/liveUserBase.vue'
export default {
  name: "layout",
  components: { userLogin, liveUserBase },
  setup() {
    const isLogin = getCookies('live_user/login')
    return {
      isLogin
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
}
</style>
