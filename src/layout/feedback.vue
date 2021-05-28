<template>
  <div class="layout">
    <div>最新新评论</div>

    <div>
      <div class="feedback">
        <div class="user">
          <span>马**</span>
        </div>
        <div class="content">
          <div>#位置方便##隔音好##卫生好##服务好##房间宽敞#</div>
          <div class="time">评价时间：2021/05/23</div>
          <div class="hotelContent">
            <span>酒店回复内容：</span>
            <span>谢谢！</span>
            <span>回复时间: 2021/05/25 06:30:39 </span>
          </div>
        </div>
      </div>
      <div class="feedback">
        <div class="user">
          <span>马**</span>
        </div>
        <div class="content">
          <div>#位置方便##隔音好##卫生好##服务好##房间宽敞#</div>
          <div class="time">评价时间：2021/05/23</div>
          <div class="hotelContent">
            <span>酒店回复内容：</span>
            <span>谢谢！</span>
            <span>回复时间: 2021/05/25 06:30:39 </span>
          </div>
        </div>
      </div>
      <div class="feedback">
        <div class="user">
          <span>马**</span>
        </div>
        <div class="content">
          <div>#位置方便##隔音好##卫生好##服务好##房间宽敞#</div>
          <div class="time">评价时间：2021/05/23</div>
          <div class="hotelContent">
            <span>酒店回复内容：</span>
            <span>谢谢！</span>
            <span>回复时间: 2021/05/25 06:30:39 </span>
          </div>
        </div>
      </div>
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
  .feedback {
    display: flex;
    margin: 10px 0;
    border: 1px solid #eee;
    padding: 10px;

    .user {
      flex-basis: 100px;
    }
    .content {
      flex: 1;
      .hotelContent {
        display: flex;
        flex-direction: column;
        background: rgba(9, 188, 164, 0.06);
        padding: 12px;
        text-align: left;
      }
    }
  }
}
</style>
