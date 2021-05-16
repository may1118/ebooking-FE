<template>
  <div class="Bar">
    <span class="pageName">{{ pageName }}</span>
    <span class="userName">{{ userName }}</span>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { menuList } from "@/config/pages/menu";
import { getCookies } from "@/config/commonFunc";

export default defineComponent({
  name: "layout",
  setup() {
    const proxy = getCurrentInstance()?.proxy;
    const pageName = computed(() => {
      const path = proxy?.$route.path;
      const pageNameUrl = path.split("/")[2];
      let pageName = "-";
      menuList.forEach(({ name, content }) => {
        if (content === pageNameUrl) pageName = name;
      });

      return pageName;
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
