<template>
  <div class="components">
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
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { getRegion } from "@/api/hotelRegister";
export default {
  name: "components",
  setup(props, { emit }) {
    const formState = reactive({
      provice: "",
      city: "",
      district: "",
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
      emit('getRegionLocal', formState.provice, formState.city, formState.district)
    };
    onMounted(async () => {
      proviceArr.value = await getRegion();
    });
    return {
      formState,
      proviceArr,
      cityArr,
      districtArr,

      handleChange,
    };
  },
};
</script>
