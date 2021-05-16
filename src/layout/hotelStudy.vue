<template>
  <div class="layout">
    <VuePlayerVideo
      src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"
    ></VuePlayerVideo>
  </div>
</template>

<script lang="ts">
import VuePlayerVideo from 'vue3-player-video';
import { ref } from "vue";
export default {
  name: "layout",
  components: {
    VuePlayerVideo,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.layout {
}
</style>
