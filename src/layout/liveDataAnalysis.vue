<template>
  <div class="layout">
    <a-select v-model:value="choosedChart" style="width: 300px">
      <a-select-option
        v-for="(item, index) of charts"
        :key="index"
        :value="item.value"
        >{{ item.name }}</a-select-option
      >
    </a-select>
    <template v-for="item of charts" :key="item.value">
      <div :id="item.value" v-if="choosedChart === item.value" style="width: 800px; margin: 10px 0;"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { Line, Datum } from "@antv/g2plot";

import { getData } from "@/api/liveDataAnalysis";

const charts = [
  {
    value: "year-income",
    name: "近一年收益",
  },
  {
    value: "sell-hotel",
    name: "近一年销售状况",
  },
];

export default defineComponent({
  setup(props, context) {
    const choosedChart = ref(charts[1].value);

    const newLine = (config) => {
      const line = new Line(choosedChart.value, config);
      line.render();
    };

    watch(
      () => choosedChart.value,
      async (newChart) => {
        const data: any = await getData({
          type: newChart,
          year: 2021,
        });
        switch (newChart) {
          case "year-income":
            const config = {
              data: Object.keys(data).map((item) => {
                return {
                  month: item,
                  value: data[item],
                };
              }),
              xField: "month",
              yField: "value",
              height: 300,
              point: {
                size: 2,
                shape: "diamond",
                style: {
                  stroke: "#FE740C",
                  lineWidth: 1,
                  fillOpacity: 0.6,
                },
              },
              annotations: [
                {
                  type: "text",
                  position: ["98%", "100%"],
                  content: "月",
                  style: {
                    color: "#1890ff",
                  },
                  top: true,
                },
                {
                  type: "text",
                  position: ["0%", "0%"],
                  content: "元",
                  style: {
                    color: "#1890ff",
                  },
                  top: true,
                },
              ],
              tooltip: {
                formatter: (datum: Datum) => {
                  return {
                    name: datum.month + "月",
                    value: datum.value + "元",
                  };
                },
              },
            };
            newLine(config);
            break;
          case "sell-hotel":
            const configSellHotel = {
              data: Object.keys(data).map((item) => {
                return {
                  month: item,
                  value: data[item],
                };
              }),
              xField: "month",
              yField: "value",
              height: 300,
              point: {
                size: 2,
                shape: "diamond",
                style: {
                  stroke: "#FE740C",
                  lineWidth: 1,
                  fillOpacity: 0.6,
                },
              },
              annotations: [
                {
                  type: "text",
                  position: ["98%", "100%"],
                  content: "月",
                  style: {
                    color: "#1890ff",
                  },
                  top: true,
                },
                {
                  type: "text",
                  position: ["0%", "0%"],
                  content: "间夜量",
                  style: {
                    color: "#1890ff",
                  },
                  top: true,
                },
              ],
              tooltip: {
                formatter: (datum: Datum) => {
                  return {
                    name: datum.month + "月",
                    value: datum.value + "间夜量",
                  };
                },
              },
            };
            newLine(configSellHotel);
            break;
        }
      },
      { immediate: true }
    );
    return { choosedChart, charts };
  },
});
</script>



<style lang="less" scoped>
.layout {
  #container {
    margin: 10px 0;
  }
}
</style>
