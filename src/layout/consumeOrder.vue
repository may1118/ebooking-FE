/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
  <div class="consumeOrder">
    <a-table :dataSource="order" :columns="columns">
      <template #operation="{ record }">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link">
            操作
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu v-if="record.status === 0 || record.status !== 2">
              <a-menu-item
                v-if="record.status === 0"
                @click="handleClick(record, 'LIVED')"
                key="LIVED"
              >
                修改成用户已入住
              </a-menu-item>
              <a-menu-item
                v-if="record.status === 0"
                @click="handleClick(record, 'LIVED')"
                key="LIVED"
              >
                拒绝订单
              </a-menu-item>
              <a-menu-item
                v-if="record.status !== 2"
                @click="handleClick(record, 'USERINFO')"
                key="USERINFO"
              >
                查看用户信息
              </a-menu-item>
            </a-menu>
            <a-menu v-else>
              <a-menu-item key="NOOPERATE"> 无可操作 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref,  h } from "vue";
import { Modal } from 'ant-design-vue';
import { DownOutlined } from "@ant-design/icons-vue";
import { getOrder, changeOrderStatus, getUserInfo } from "@/api/order";
import { formatTime } from '@/config/commonFunc'

const columns = [
  {
    title: "房型",
    dataIndex: "room_name",
    key: "room_name",
  },
  {
    title: "入住/离店",
    dataIndex: "hotel_live_time",
    key: "hotel_live_time",
  },
  {
    title: "价格",
    dataIndex: "live_price",
    key: "live_price",
  },
  {
    title: "顾客",
    dataIndex: "user_name",
    key: "user_name",
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
];
export default {
  name: "layout",
  components: { DownOutlined },
  setup() {
    const order: Ref<any> = ref([]);
    const getOrderInfo = async () => {
      const data: any = await getOrder();
      order.value = data.map((item) => {
        const { live_time, leave_time, order_time } = item;

        return {
          ...item,
          order_time: formatTime(order_time),
          hotel_live_time: `${formatTime(live_time)} - ${formatTime(
            leave_time
          )}`,
        };
      });
    };
    onMounted(async () => {
      await getOrderInfo();
    });
    const handleClick = async (order, type) => {
      const { key, user_id } = order;
      switch (type) {
        case "REJECT":
          await changeOrderStatus({
            live_id: key,
            status: 4,
          });
          await getOrderInfo();
          break;
        case "USERINFO":
          const userDetail: any = await getUserInfo(user_id);
          Modal.info({
            title: "用户详细个人信息",
            content: h("div", {}, [
              h("p", `用户姓名: ${ userDetail.name }`),
              h("p", `用户电话: ${ userDetail.phone }`),
            ]),
          });

          break;
        case "LIVED":
          await changeOrderStatus({
            live_id: key,
            status: 1,
          });
          await getOrderInfo();
          break;
      }
    };
    return {
      order,
      columns,
      handleClick,
    };
  },
};
</script>

<style lang="less" scoped>
.consumeOrder {
}
</style>
