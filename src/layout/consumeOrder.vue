<template>
  <div class="consumeOrder">
    <a-table :dataSource="dataSource" :columns="columns">
      <template #operation="{ record }">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "layout",
  setup() {
    return {
      dataSource: [
        {
          key: "1",
          hotel_live_name: "临湖大床房",
          hotel_live_time: "2021/5/15 - 2021/5/16",
          live_price: 200,
          live_user_name: "马某某",
          status: "等待入住",
          operator: "operator",
        },
      ],

      columns: [
        {
          title: "房型",
          dataIndex: "hotel_live_name",
          key: "hotel_live_name",
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
          dataIndex: "live_user_name",
          key: "live_user_name",
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "操作",
          dataIndex: "operator",
          slots: { customRender: 'operation' },
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.consumeOrder {
}
</style>
