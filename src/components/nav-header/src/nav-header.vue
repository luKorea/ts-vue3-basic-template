<template>
  <div class="nav-header">
    <i
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      class="fold-menu"
      @click="handleFoldClick"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref<boolean>(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    return {
      isFold,
      handleFoldClick,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
