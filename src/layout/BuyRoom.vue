<template>
  <div class="buyRomm" style="padding: 20px 20px">
    <div style="display: flex; justify-content: space-between">
      <span>欢迎入住，请选择需要的酒店</span>
      <router-link to="/user">{{
        live_user_is_login ? "用户中心" : "请登录"
      }}</router-link>
    </div>
    <div class="region">
      请选择位置：
      <Region @getRegionLocal="handleRegionChange" />
      <a-button @click="chooseRegion">确认</a-button>
    </div>
    <div class="hotelList">
      <div
        v-for="(item, index) of hotels"
        :key="index"
        class="hotelItem"
        @click="chooseHotel(item)"
      >
        <img src="http://zt.gaoxiaojob.com/cslgdx1903.jpg" alt="" />
        <div class="name">名称：{{ item.hotel_name }}</div>
        <div class="des">描述：{{ item.hotel_des }}</div>
      </div>
    </div>
    <a-modal
      :width="700"
      v-model:visible="showModal"
      :title="choosedHotel.hotel_name || '-'"
      @ok="handleModalClick('confirm')"
    >
      请选择需要的房间：
      <div
        v-for="(item, index) of choosedHotel.hotel_base_config"
        :key="index"
        style="margin-bottom: 10px"
      >
        <a-checkbox
          style="margin-right: 10px"
          v-model:checked="item.checked"
        ></a-checkbox>
        {{ item.name }}
        <a-range-picker
          style="margin-right: 10px"
          format="YYYY-MM-DD"
          :disabled="!item.checked"
          :disabled-date="disabledDate"
          :disabled-time="disabledRangeTime"
          v-model:value="item.timeRange"
        />
        <a-input-number
          style="margin-right: 10px"
          v-model:value="item.needNumber"
          :min="1"
          :max="item.number"
        />
      </div>
      <template #footer>
        <div v-show="price">¥{{ price }} :预计价格</div>
        <a-button key="back" @click="handleModalClick('cancel')">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="handleModalClick('confirm')"
          >提交</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue'
import moment from "moment";
import { getCookies } from "@/config/commonFunc";
import Region from "@/components/region.vue";
import { buyRoom, comfirmBuy } from "@/api/buyRoom";

const formatTime = (time) => {
  const date = new Date(time);
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  return `${YYYY}-${MM}-${DD}`;
};
const getTimeRangeDay = ([acTime, enTime]) => {
  const acDate = new Date(formatTime(acTime));
  const enDate = new Date(formatTime(enTime));
  return (enDate.getTime() - acDate.getTime()) / 86400000;
};

const disabledDate = (current) => {
  return current && current < moment().endOf("day");
};
const disabledDateTime = () => {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
};

const disabledRangeTime = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
};
export default {
  name: "layout",
  components: { Region },
  setup() {
    const router = useRouter()
    const formState = reactive({
      provice: "湖南省",
      city: "",
      district: "",
    });
    const live_user_is_login = ref(getCookies("live_user/login"));
    const userName = ref(getCookies("live_user/name"));
    const userPhone = ref(getCookies("live_user/phone"));
    const hotels = ref([]);
    const showModal = ref(false);
    const choosedHotel = ref({});

    const handleRegionChange = (provice, city, district) => {
      formState.provice = provice;
      formState.city = city;
      formState.district = district;
    };
    const chooseRegion = async () => {
      const region = [];
      Object.keys(formState).forEach((item) => {
        if (formState[item]) {
          region.push(formState[item]);
        }
      });
      const { hotel } = await buyRoom(region.join("-"));
      hotel.forEach((item) => {
        item.hotel_base_config = JSON.parse(item.hotel_base_config).map(
          (item) => {
            return {
              ...item,
              needNumber: 1,
              checked: false,
            };
          }
        );
      });
      hotels.value = [...hotel];
    };
    const chooseHotel = (hotel) => {
      showModal.value = true;
      choosedHotel.value = hotel;
    };
    const handleModalClick = async (type) => {
      if (!live_user_is_login.value) {
        notification['error']({
          message: "请登录",
          description:
            "登陆后才能购买",
        });
        router.push('/user')
        return 
      }
      switch (type) {
        case "confirm":
          const hotel_base_config = choosedHotel.value.hotel_base_config
            .filter((item) => {
              if (item.checked && item.timeRange) return true;
            })
            .map((item) => {
              const { timeRange } = item;
              item.timeRange = [
                formatTime(timeRange[0]),
                formatTime(timeRange[1]),
              ];
              return item;
            });
          const hotelInfo = Object.assign({}, choosedHotel.value, {
            hotel_base_config: hotel_base_config,
            userName: decodeURI(userName.value),
            userPhone: userPhone.value,
          });
          await comfirmBuy({ hotel: JSON.stringify(hotelInfo) });
          break;
      }
      showModal.value = false;
    };
    const price = computed(() => {
      let mon = 0;
      if (Array.isArray(choosedHotel.value.hotel_base_config)) {
        choosedHotel.value.hotel_base_config.forEach((item) => {
          if (
            item.checked &&
            item.timeRange &&
            item.needNumber &&
            item.timeRange
          ) {
            mon +=
              item.price * item.needNumber * getTimeRangeDay(item.timeRange);
          }
        });
        return mon;
      }
      return 0;
    });
    onMounted(async () => {
      await chooseRegion();
    });
    return {
      live_user_is_login,
      userName,
      userPhone,

      hotels,
      showModal,
      choosedHotel,
      price,

      disabledDate,
      disabledDateTime,
      disabledRangeTime,
      chooseRegion,
      handleRegionChange,
      chooseHotel,
      handleModalClick,
    };
  },
};
</script>

<style lang="less" scoped>
.region {
  display: flex;
}
.hotelList {
  display: flex;
  .hotelItem {
    padding: 10px;
    margin: 0 10px;
    display: flex;
    flex-basis: 300px;
    flex-direction: column;
    border: 1px solid #eee;
  }
}
</style>
