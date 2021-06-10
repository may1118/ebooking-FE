<template>
  <div class="layout">
    <div>最新新评论</div>

    <div>
      <div v-for="item of userComment" :key="item.comment_id" class="feedback">
        <div class="user">
          <span>{{ item.userName }}</span>
        </div>
        <div class="content">
          <div>用户评论：{{ item.content }}</div>
          <div class="time">
            评价时间：{{ formatTime(Number(item.comment_time)) }}
          </div>
          <div v-if="item.hasHotelComment" class="hotelContent">
            <span>酒店回复内容：</span>
            <span>{{ item.hotelComment.content }}</span>
            <span
              >回复时间:
              {{ formatTime(Number(item.hotelComment.comment_time)) }}
            </span>
          </div>
          <div v-else>
            <a-button type="primary" @click="handleClick('openFeedBack', item)"
              >回复</a-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 回复窗口 -->
    <a-modal
      v-model:visible="modalComment"
      title="回复评论"
      @ok="handleClick('feedBack')"
      okText="确认"
      cancelText="取消"
    >
      <a-input v-model:value="feedback.content"></a-input>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getCommentAll } from "@/api/comment";
import { addComment as addComment } from "@/api/liveUser";
import { formatTime } from "@/config/commonFunc";
export default {
  name: "layout",
  setup() {
    const userComment: any = ref([]);
    const modalComment = ref(false);
    const feedback = reactive({
      content: "",
      comment: {
        from_id: "",
        to_id: "",
        live_id: "",
        comment_type: "HOTEL",
      },
    });

    const getCommentAllMounted = async () => {
      const data: any = await getCommentAll();
      // todo 需要对信息进行整合，将live_id一样的进行合并展示，只有USER则可以回复
      data.forEach((item: any) => {
        if (item.comment_type === "USER") {
          userComment.value.push(item);
        }
      });
    };

    const handleClick = async (type, value?) => {
      switch (type) {
        case "openFeedBack":
          modalComment.value = true;
          feedback.comment = value;
          break;
        case "feedBack":
          // 发送请求
          await addComment({
            content: feedback.content,
            from_id: feedback.comment.to_id,
            to_id: feedback.comment.from_id,
            live_id: feedback.comment.live_id,
            comment_type: "HOTEL",
          });
          modalComment.value = false;
          await getCommentAllMounted();
          break;
      }
    };
    onMounted(async () => {
      await getCommentAllMounted();
    });
    return { userComment, formatTime, modalComment, feedback, handleClick };
  },
};
</script>

<style lang="less" scoped>
.layout {
  .feedback {
    display: flex;
    margin: 10px 0;
    border: 1px solid #eee;
    padding: 10px;

    .user {
      flex-basis: 100px;
    }
    .content {
      flex: 1;
      .hotelContent {
        display: flex;
        flex-direction: column;
        background: rgba(9, 188, 164, 0.06);
        padding: 12px;
        text-align: left;
      }
    }
  }
}
</style>
