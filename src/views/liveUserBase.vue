<template>
  <div class="views">
    这是 【{{ decodeURI(userName) }}】 的个人中心
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { getCookies } from "@/config/commonFunc";

export default {
  name: "views",
  setup() {
    const userName = ref(getCookies("live_user/name"));
    const userPhone = ref(getCookies("live_user/phone"));
    return {
      userName,
      userPhone,
    };
  },
};
</script>

<style lang="less" scoped>
.views {
}
</style>
