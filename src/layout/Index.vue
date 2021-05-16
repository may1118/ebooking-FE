<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
export default defineComponent({
  name: "Index",
  setup() {
    const proxy = getCurrentInstance()?.proxy;
    const contentId = computed(() => proxy?.$route.path);
    return {
      contentId
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  margin: 0 10px;
}
</style>