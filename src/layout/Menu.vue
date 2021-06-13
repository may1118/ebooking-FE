<template>
  <div class="main-menu-inner">
    <div class="project-title">易程酒店</div>
    <ul
      class="aside-container menu-site ant-menu-light ant-menu-root ant-menu ant-menu-inline"
      @click="handleClick"
    >
      <li
        v-for="(item, index) of menuList"
        :key="index"
        :data-content="item.content"
        :class="{
          'ant-menu-item': true,
          choosed: currentRoute.includes(item.content)
        }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";

import { menuList } from "@/config/pages/menu";

export default defineComponent({
  setup() {
    const router = useRouter();
    const currentRoute = ref(router.currentRoute.value.path);
    const handleClick = (el) => {
      const content = el.target.dataset.content;
      router.push(`/ebooking/${content}`);
    };
    watch(
      () => router.currentRoute.value.path,
      (newPath) => {
        currentRoute.value = newPath
      }
    );
    return {
      currentRoute,
      menuList,

      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.project-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  background-color: #1890ff;
}
.choosed {
  color: #1890ff;
}
</style>

