<template>
  <div class="layout">
    <div class="display: flex; margin: 0 20px;">
      <VuePlayerVideo
        class="videoPlay"
        src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"
      ></VuePlayerVideo>
      <div style="margin-left: 20px;">
        酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习
      </div>
    </div>
    <div class="display: flex; margin: 0 20px;">
      <VuePlayerVideo
        class="videoPlay"
        src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"
      ></VuePlayerVideo>
      <div style="margin-left: 20px;">
        酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习酒店学习
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VuePlayerVideo from "vue3-player-video";
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
  display: flex;
  .videoPlay {
    width: 500px;
    height: 300px;
  }
}
</style>
