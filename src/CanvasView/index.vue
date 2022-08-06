<script setup lang="ts">
import { ref } from 'vue'
import { blockList } from '@/model'
import Wrapper from './Wrapper.vue';

</script>

<template>
  <div class="canvas-view">
    <div class="canvas">
      <Wrapper v-for="block of blockList" :key="block.id" :context="block" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.canvas-view {
  width: 600px;
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas {
  width: 416px;
  height: 416px;
  position: relative;
  background-color: #EEEEEE;
}
</style>
