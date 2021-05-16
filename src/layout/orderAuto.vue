<template>
  <div class="order-auto-container">
    <div class="poiSelect">门店：{{ hotelName }}</div>
    <div class="orderAuto">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="开启状态" style="display: flex; align-items: center;">
          <a-radio-group v-model:value="enableStatus">
            <a-radio :value="0">关闭</a-radio>
            <a-radio :value="1">开启</a-radio>
          </a-radio-group>
        </a-form-item>
        <div v-if="enableStatus">
          <a-form-item label="自动接单星期">
            <a-checkbox v-model:checked="checkAll" @change="onCheckAllChange">
              全选
            </a-checkbox>
            <a-checkbox-group
              v-model:value="availableWeek"
              :options="weekdays"
            />
          </a-form-item>
          <a-form-item label="自动接单时间">
            <a-radio-group name="radioGroup" v-model:value="isAllDay">
              <a-radio :value="true">全天</a-radio>
              <a-radio :value="false">特定时间段</a-radio>
            </a-radio-group>
            <a-time-picker
              :disabled="isAllDay"
              v-model:value="acTime"
              placeholder="请选择数量"
              format="HH:mm"
            />
            至
            <a-time-picker
              :disabled="isAllDay"
              v-model:value="enTime"
              placeholder="请选择数量"
              format="HH:mm"
            />
          </a-form-item>
          <a-form-item label="自动接单房型">
            <div style="display: flex; flex-direction: column">
              <div
                v-for="(item, index) of hotelConfig"
                style="display: flex; margin-bottom: 5px; justify-content: space-around;"
                :key="index"
              >
                <a-checkbox v-model:checked="item.isAuto"></a-checkbox>
                <div class="hotelName" style="margin:0 10px;">房型名：{{ item.name }}</div>
                每天最多接单数: 
                <a-input-number
                style="margin-left: 10px;"
                  v-model:value="item.autoNumber"
                  :min="0"
                  :max="item.number"
                />
              </div>
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">保存</a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from "vue";
import { getCookies } from "@/config/commonFunc";

import { getHotelBaseInfo } from "@/api/orderAuto";

const weekdays = ["一", "二", "三", "四", "五", "六", "日"];
const formatHotelConfig = (hotelConfigArr) => {
  return hotelConfigArr.map(({ name, number }) => {
    return { 
      name,
      number,
      isAuto: false,
      autoNumber: 0,
    };
  });
};

export default {
  name: "layout",
  setup() {
    const uid = getCookies("hotel/hotel_id");
    const hotelName = ref("-");
    const hotelConfig = ref();
    const checkAll = ref(false);

    const orderAutoForm = reactive({
      enableStatus: 1,
      availableWeek: [],
      availableTime: "",
      roomTypes: [],
      isAllDay: true,
      acTime: "",
      enTime: "",
    });

    const onCheckAllChange = (e) => {
      const isCheck = e.target.checked;
      Object.assign(orderAutoForm, {
        availableWeek: isCheck ? weekdays : [],
      });
    };
    const onSubmit = () => {
      console.log('save.')
    }

    onMounted(async () => {
      const {
        hotel_name: hotel_nameRemote,
        hotel_base_config,
      } = await getHotelBaseInfo({ uid });
      hotelName.value = hotel_nameRemote;
      hotelConfig.value = formatHotelConfig(JSON.parse(hotel_base_config));
    });
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      weekdays,
      hotelName,
      hotelConfig,
      checkAll,
      ...toRefs(orderAutoForm),

      onCheckAllChange,
      onSubmit,
    };
  },
};
</script>

<style lang="less" scoped>
::v-deep {
  .ant-form-item-children {
    display: flex;
    align-items: center;
  }
}
.poiSelect {
  font-size: 18px;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
