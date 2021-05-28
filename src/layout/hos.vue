<template>
  <div class="layout">
    <div class="hosScore">
      <span>云塘大酒店商家， 您的HOS评分：</span>
      <span class="score">4.5 分</span>
      <span class="level">高</span>
    </div>
    <div class="hosAdvantage" style="display: flex; flex-direction: column">
      <span>守约规范：</span>
      <span>1. 您在2021/5/20 成功完成订单</span>
      <span>2. 您在2021/5/22 回复用户评论</span>
    </div>
    <div class="hosAdvantage" style="display: flex; flex-direction: column">
      <p>更快提高HOS评分方法</p>
      <span>1. 酒店信息完善</span>
      <span>2. 5分钟确认订单概率</span>
      <span>3. 更少的拒单率</span>
      <span>4. 评论维护率</span>
    </div>
    <div class="hosAdvantage" style="display: flex; flex-direction: column">
      <p>HOS评分作用</p>
      <span>1. 提高用户查找排名</span>
      <span>2. 增加更多的曝光</span>
      <span>3. 增强酒店可信度</span>
      <span>4. 保证酒店口碑，不被平台下线</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "layout",
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.layout {
  .hosScore {
    display: flex;
    align-items: center;
    margin: 0;
    padding-left: 20px;
    font-size: 16px;
    font-weight: normal;
    height: 115px;
    border-bottom: 1px solid #eee;
    position: relative;
    background-image: linear-gradient(-121deg, #00c5b1 0%, #00accc 100%);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0);
    .score {
      font-size: 44px;
      color: #ffffff;
      line-height: 36px;
      font-weight: bold;
      display: inline-block;
      vertical-align: bottom;
    }
    .level {
      display: inline-block;
      height: 20px;
      width: 20px;
      background-color: white;
      border-radius: 10px;
      line-height: 20px;
      font-size: 12px;
      font-weight: bolder;
      color: #00c0b6;
      vertical-align: bottom;
      text-align: center;
    }
  }
  .hosAdvantage {
    background-color: #f7f7f7;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 16px;
    color: #333333;
    font-weight: normal;
    vertical-align: middle;
    line-height: 30px;
    padding: 10px;
  }
}
</style>
