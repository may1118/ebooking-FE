<template>
  <div class="layout">
    <div v-for="item of video" :key="item.study_id">
      <VuePlayerVideo
        class="videoPlay"
        :src="item.study_url"
      ></VuePlayerVideo>
      <div style="margin-left: 20px">
        {{ item.study_des }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VuePlayerVideo from "vue3-player-video";
import { ref, onMounted, Ref } from "vue";
import { getStudyVideo } from "@/api/studyVideo";
export default {
  name: "layout",
  components: {
    VuePlayerVideo,
  },
  setup() {
    const video: Ref<any[]> = ref([]);

    onMounted(async () => {
      const data: any = await getStudyVideo();
      video.value = data
    });

    return { video };
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .videoPlay {
    width: 400px;
    height: 250px;
    margin: 0 10px;
  }
}
</style>
