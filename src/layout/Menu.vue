<template>
  <div class="main-menu-inner">
    <div class="project-title">易程酒店</div>
    <ul
      class="aside-container menu-site ant-menu-light ant-menu-root ant-menu ant-menu-inline"
      @click="handleClick"
    >
      <li v-for="(item, index) of menuList" :key="index" :data-content="item.content" class="ant-menu-item">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

import { menuList } from '@/config/pages/menu'

export default defineComponent({
  setup() {
    const router = useRouter()
    const handleClick = (el) => {
      const content = el.target.dataset.content
      router.push(`/ebooking/${content}`)
    }
    return {
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
</style>

