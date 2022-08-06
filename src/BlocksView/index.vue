<script setup lang="ts">
import { ref } from 'vue'
import { blockList, addBlock, currentId } from '@/model';
import { Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { BlockType, blockTypeList } from '@/blocks';

const add = (type: BlockType) => {
  const block = addBlock(type);
  currentId.value = block.id;
}

const select = (id: number) => {
  currentId.value = id;
};

</script>

<template>
  <div class="blocks-view">
    <div class="palette">
      <Button
        class="palette-button"
        v-for="block of blockTypeList" :key="block.type"
        size="small"
        @click="add(block.type)"
      >
        <PlusOutlined #icon />
        {{ block.title }}
      </Button>
    </div>
    <div class="block-list">
      <div
        class="block-item" :class="{ active: block.id === currentId }"
        v-for="block of blockList" :key="block.id"
        @click="select(block.id)"
      >
        {{ block.meta.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.blocks-view {
  width: 240px;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
}
.palette {
  padding: 5px;
}
.palette-button {
  margin: 1px 3px;
}
.block-list {
  padding: 10px 0;
}
.block-item {
  padding: 2px 10px;
  user-select: none;
  &.active {
    background-color: #90CAF9;
  }
}
</style>
