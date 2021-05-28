<template>
  <div class="layout">
    <div class="pr-3 pl-3">
      <p>近一年收益情况：</p>
      <div id="container" style="width: 800px" class="pt-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, onMounted } from "vue";
import { Line, Datum } from "@antv/g2plot";

export default defineComponent({
  setup(props, context) {
    const data = [
      { month: "1", value: 300 },
      { month: "2", value: 400 },
      { month: "3", value: 300.5 },
      { month: "4", value: 500 },
      { month: "5", value: 400.9 },
      { month: "6", value: 600 },
      { month: "7", value: 700 },
      { month: "8", value: 900 },
      { month: "9", value: 1300 },
      { month: "10", value: 5300 },
      { month: "11", value: 1300 },
      { month: "12", value: 12300 },
    ];

    onMounted(() => {
      const line = new Line("container", {
        data,
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
            position: ["95%", "100%"],
            content: "月",
            style: {
              fill: "red",
            },
            top: true,
          },
          {
            type: "text",
            position: ["0%", "0%"],
            content: "元",
            style: {
              fill: "red",
            },
            top: true,
          },
        ],
        tooltip: {
          formatter: (datum: Datum) => {
            return { name: datum.month + "月", value: datum.value + "元" };
          },
        },
      });
      line.render();
    });
  },
});
</script>



<style lang="less" scoped>
.layout {
}
</style>
