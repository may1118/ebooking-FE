<template>
  <div class="HotelRegister">
    <h1 style="text-align: center">酒店信息注册</h1>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="手机号码">
        <a-input v-model:value="formState.phone"></a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="formState.email"></a-input>
      </a-form-item>
      <a-form-item label="地区">
        <a-select
          style="width: 120px"
          :value="formState.provice"
          @change="(value) => handleChange('provice', value)"
        >
          <a-select-option
            v-for="item of proviceArr"
            :value="item.name"
            :key="item.region_id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
        <a-select
          style="width: 120px"
          :value="formState.city"
          v-if="cityArr.length"
          @change="(value) => handleChange('city', value)"
        >
          <a-select-option
            v-for="item of cityArr"
            :value="item.name"
            :key="item.region_id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
        <a-select
          style="width: 120px"
          :value="formState.district"
          v-if="districtArr.length"
          @change="(value) => handleChange('district', value)"
        >
          <a-select-option
            v-for="item of districtArr"
            :value="item.name"
            :key="item.region_id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="酒店名称">
        <a-input v-model:value="formState.hotelName"></a-input>
      </a-form-item>
      <a-form-item label="酒店基本描述">
        <a-input v-model:value="formState.des"></a-input>
      </a-form-item>
      <a-form-item label="酒店房间类型">
        <div
          class="hotel-config"
          v-for="(item, index) of formState.config"
          :key="index"
        >
          <a-input
            v-model:value="item.name"
            placeholder="请输入房间名称"
          ></a-input>
          <a-input-number
            id="inputNumber"
            v-model:value="item.number"
            :min="1"
            :max="10"
            placeholder="房间数"
          />
          <PlusCircleOutlined
            @click="
              () => {
                formState.config.push({ name: '', number: 1 });
              }
            "
          />
          <MinusCircleOutlined
            @click="
              () => {
                formState.config.pop();
              }
            "
          />
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submit">确认</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";

import { hotelRegister, getRegion } from "@/api/hotelRegister";

export default defineComponent({
  name: "HotelRegister",
  components: { PlusCircleOutlined, MinusCircleOutlined },
  setup() {
    const formState = reactive({
      phone: "",
      email: "",
      provice: "",
      city: "",
      district: "",
      hotelName: "",
      des: "",
      config: [
        {
          name: "",
          number: 1,
        },
      ],
    });
    const proviceArr = ref([]);
    const cityArr = ref([]);
    const districtArr = ref([]);

    const handleChange = async (type, value) => {
      switch (type) {
        case "provice":
          cityArr.value = await getRegion(value);
          formState.provice = value;
          break;
        case "city":
          districtArr.value = await getRegion(value);
          formState.city = value;
          break;
        case "district":
          formState.district = value;
          break;
      }
    };
    const submit = async () => {
      await hotelRegister({}, Object.assign(formState, {
        config: JSON.stringify(formState.config)
      }))
    };
    onMounted(async () => {
      proviceArr.value = await getRegion();
    });
    return {
      // data
      formState,
      proviceArr,
      cityArr,
      districtArr,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // func
      handleChange,
      submit,
    };
  },
});
</script>

<style lang="less" scoped>
.HotelRegister {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .hotel-config {
    display: flex;
    align-items: center;
    * {
      margin-right: 3px;
      margin-bottom: 5px;
    }
  }
}
</style>