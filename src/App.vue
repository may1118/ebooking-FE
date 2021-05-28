<template>
  <div class="app-container ant-row">
    <router-view class="left" name="menu"></router-view>
    <div class="right">
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
    min-height: 100vh;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: calc(100vh - 200px);
    .Bar {
      flex-basis: 70px;
    }
    .container {
      flex: 1;
    }
    .footer {
      background-color: #f7f7f7;
    }
  }
}
</style>
