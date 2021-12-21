<template>
  <div class="basic-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "basicContainers",
});
</script>

<style lang="less">
.basic-container {
  padding: 10px 6px;
  border-radius: 4px;
  box-sizing: border-box;

  .el-card {
    width: 100%;
  }

  &:first-child {
    padding-top: 0;
  }
}
</style>
