<template>
  <div class="Bar">Bar</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'layout',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.Bar {
  background-color: red;
}
</style>
