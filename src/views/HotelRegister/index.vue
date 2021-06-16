<template>
  <div class="HotelRegister">
    <h1 style="text-align: center">酒店信息注册</h1>
    <a-form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @finish="submit"
      :rules="rules"
    >
      <a-form-item required label="手机号码" name="phone">
        <a-input v-model:value="formState.phone"></a-input>
      </a-form-item>
      <a-form-item required label="邮箱" name="email">
        <a-input v-model:value="formState.email"></a-input>
      </a-form-item>
      <a-form-item label="地区">
        <Region @getRegionLocal="handleRegionChange" />
      </a-form-item>
      <a-form-item required label="酒店名称" name="hotelName">
        <a-input v-model:value="formState.hotelName"></a-input>
      </a-form-item>
      <a-form-item required label="酒店基本描述" name="des">
        <a-input v-model:value="formState.des"></a-input>
      </a-form-item>
      <a-form-item required label="酒店房间类型">
        <div
          class="hotel-config"
          v-for="(item, index) of formState.config"
          :key="index"
        >
          <a-input
            v-model:value="item.name"
            placeholder="请输入房间名称"
          ></a-input>
          <div style="flex-basis: 50px">数量:</div>
          <a-input-number
            id="inputNumber"
            v-model:value="item.number"
            :min="1"
            :max="10"
            placeholder="房间数"
          />
          <div style="flex-basis: 50px">价格:</div>
          <a-input-number
            style="flex-basis: 100px"
            v-model:value="item.price"
          />
          <PlusCircleOutlined
            @click="
              () => {
                formState.config.push({ name: '', number: 1, price: 100 });
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
        <a-button html-type="submit" type="primary">确认</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";

import Region from "@/components/region";

import { hotelRegister, getRegion } from "@/api/hotelRegister";

const rules = {
  phone: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
    {
      pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
      message: "请输入正确的电话号码",
    },
  ],
  email: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确的邮箱",
    },
  ],
  hotelName: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  des: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
};

export default defineComponent({
  name: "HotelRegister",
  components: { PlusCircleOutlined, MinusCircleOutlined, Region },
  setup() {
    const router = useRouter();
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
          price: 100,
        },
      ],
    });

    const submit = async () => {
      try {
        await hotelRegister(
          Object.assign({}, formState, {
            config: JSON.stringify(formState.config),
          })
        );
        router.push("/ebooking/workbench");
      } catch (error) {}
    };
    const handleRegionChange = (provice, city, district) => {
      formState.provice = provice;
      formState.city = city;
      formState.district = district;
    };
    return {
      // data
      rules,
      formState,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // func
      submit,
      handleRegionChange,
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