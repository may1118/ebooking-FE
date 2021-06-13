<template>
  <div class="views">
    <router-link to="/">
      <span style="display: flex; align-items: center">
        <LeftOutlined />返回主页
      </span>
    </router-link>
    <span style="display: flex; justify-content: center"
      >用户 【{{ decodeURI(userName) }}】 的个人中心</span
    >
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
          <a
            v-if="record.status === 2 && record.comment"
            @click="handleClick(record, 'COMMENT')"
            style="display: flex; align-items: center"
            >评论
            <SmileOutlined
              v-if="record?.comment[0]?.hotelComment"
              style="margin-left: 5px"
            />
          </a>
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
      <div v-else class="hotelComment">
        您的评论： {{ comment?.comment[0]?.content }}
        <br />
        评论时间：
        {{ formatTime(Number(comment?.comment[0]?.comment_time)) }}

        <div
          v-if="comment?.comment[0]?.hotelComment"
          style="background-color: #eee; padding: 10px"
        >
          商家回复： {{ comment?.comment[0]?.hotelComment }}
          <br />
          回复时间：{{
            formatTime(Number(comment?.comment[0]?.hotelCommentTime))
          }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from "vue";
import { getCookies, formatTime } from "@/config/commonFunc";
import { getUserOrder, userCancelOrder, addComment } from "@/api/liveUser";
import { notification } from "ant-design-vue";
import { SmileOutlined, LeftOutlined } from "@ant-design/icons-vue";

export default {
  name: "views",
  components: { SmileOutlined, LeftOutlined },
  setup() {
    const userName = ref(getCookies("live_user/name"));
    const userPhone = ref(getCookies("live_user/phone"));
    const userId = ref(getCookies("live_user/id"));

    const order: Ref<any> = ref([]);

    const modalComment = ref(false);
    const comment: Ref<any> = ref({
      needComment: false,
      comment: [
        {
          content: "-",
          comment_time: "-",
          hotelComment: null,
          hotelCommentTime: "-",
        },
      ],
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
            needComment: commentRemote.length ? false : true
          };
          comment.value = commentObj
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
        live_id: comment.value.comment.key,
        from_id: userId.value,
        to_id: comment.value.comment.hotel_id,
        content: commentValue.value,
        comment_type: "USER",
      };
      try {
        await addComment(commentData);
        notification["success"]({
          message: "评论成功",
          description: "感谢您的评价",
        });
        changeModal("close");
      } catch (error) {
        notification["error"]({
          message: "评论失败",
          description: "请重试",
        });
      }
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
  padding: 10px;
}
.hotelComment {
  display: flex;
  flex-direction: column;
  background: rgba(9, 188, 164, 0.06);
  padding: 12px;
  text-align: left;
}
</style>
