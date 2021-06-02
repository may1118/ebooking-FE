<template>
  <div class="views">
    这是 【{{ decodeURI(userName) }}】 的个人中心
    <div>
      <p>个人订单：</p>
      <a-table :dataSource="order" :columns="columns">
        <template #operation="{ record }">
          <a-popconfirm
            title="确认取消"
            @confirm="handleClick(record, 'CANCEL')"
            ok-text="确认取消"
            cancel-text="取消"
          >
            <a v-if="record.status === 0">取消订单</a>
          </a-popconfirm>
          <a
            v-if="record.status === 2 && !record.comment"
            @click="handleClick(record, 'COMMENT')"
            >评论</a
          >
          <a v-if="record.status === 2 && record.comment">show comment</a>
        </template>
      </a-table>
    </div>
    <!-- 评论弹框 -->
    <a-modal v-model:visible="modalComment" title="评论">
      <template #footer>
        <a-button key="back" @click="changeModal('close')">返回</a-button>
      </template>
      <p>酒店名称: {{ comment.hotel_name }}</p>
      <p>房间信息: {{ comment.room_name }}</p>
      <p>
        居住时间:
        {{
          `${formatTime(comment.live_time)} - ${formatTime(comment.leave_time)}`
        }}
      </p>
      <div v-if="comment.needComment">
        <p>亲爱的用户，在您完成订单之后可以参与评论</p>
        <div style="display: flex">
          <a-input
            v-model:value="commentValue"
            style="margin-right: 10px"
          ></a-input>
          <a-button @click="confirmComment" type="primary">确认</a-button>
        </div>
      </div>
      <div v-else>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from "vue";
import { getCookies, formatTime } from "@/config/commonFunc";
import { getUserOrder, userCancelOrder, userComment } from "@/api/liveUser";

export default {
  name: "views",
  setup() {
    const userName = ref(getCookies("live_user/name"));
    const userPhone = ref(getCookies("live_user/phone"));
    const userId = ref(getCookies("live_user/id"))

    const order: Ref<any> = ref([]);

    const modalComment = ref(false);
    const comment: Ref<any> = ref({
      needComment: false,
    });
    const commentValue = ref("");

    // 页面请求
    const mountedReq = async () => {
      const data: any = await getUserOrder();
      order.value = data.map((item) => {
        const { live_time, leave_time } = item;
        return {
          ...item,
          time: `${formatTime(live_time)} - ${formatTime(leave_time)}`,
        };
      });
    };

    const handleClick = async (order, type) => {
      const { comment: commentRemote, key, ...otherInfo } = order;
      switch (type) {
        case "CANCEL":
          // 取消订单
          await userCancelOrder({
            live_id: key,
          });
          await mountedReq();
          break;
        case "COMMENT":
          const commentObj: any = {
            ...order,
          };
          // 证明之前没有评论过，需要用户评论
          if (!commentRemote) {
            commentObj.needComment = true;
          }
          comment.value = commentObj;

          modalComment.value = true;
          break;
      }
    };
    const changeModal = (type: string) => {
      switch (type) {
        case "close":
          modalComment.value = false;
          break;
      }
    };
    // 确认评论
    const confirmComment = async () => {
      const commentData = {
        live_id: comment.value.key,
        from_id: userId.value,
        to_id: comment.value.hotel_id,
        content: commentValue.value,
        comment_type: 'USER'
      }
      await userComment(commentData)
    };

    onMounted(async () => {
      await mountedReq();
    });

    return {
      userName,
      userPhone,
      order,
      modalComment,
      comment,
      commentValue,

      handleClick,
      formatTime,
      changeModal,
      confirmComment,

      columns: [
        {
          title: "酒店名称",
          dataIndex: "hotel_name",
          key: "hotel_name",
        },
        {
          title: "房间信息",
          dataIndex: "room_name",
          key: "room_name",
        },
        {
          title: "入住/离开",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "状态",
          dataIndex: "statusContent",
          key: "statusContent",
        },
        {
          title: "操作",
          dataIndex: "operator",
          slots: { customRender: "operation" },
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.views {
}
</style>
