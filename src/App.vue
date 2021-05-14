<template>
  <div class="app-container ant-row">
    <router-view class="left ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-6 ant-col-xl-5 ant-col-xxl-4 main-menu" name="menu"></router-view>
    <div class="right ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-18 ant-col-xl-19 ant-col-xxl-20">
      <router-view class="Bar" name="bar"></router-view>
      <router-view class="container" />
      <router-view class="footer" name="footer" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  .left {
    flex-basis: 200px;
    flex: 0 0 20%;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .Bar {
      flex-basis: 70px;
    }
    .container {
      flex: 1;
    }
    .footer {
      background-color: red;
    }
  }
}
</style>
