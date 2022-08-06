<script setup lang="ts">
import { Block } from '@/blocks';
import { currentId } from '@/model';
import { onMounted, ref, watch } from 'vue'
import DragResize from './dragResize.vue'

const props = defineProps<{ context: Block }>();

const context = props.context;

const container = ref<HTMLElement | null>(null);

const render = (elm?: HTMLElement) => {
  return context.meta.render({
    ...context,
    x: 0, y: 0,
    onClick: undefined,
    onHover: undefined,
  }, elm); 
}

onMounted(() => {
  if (container.value) {
    const elm = render();
    container.value.appendChild(elm);
    watch(context, () => {
      render(elm);
    })
  }
});
const resize = ({ top, left, width, height }: { top: number, left: number, width: number, height: number}) => {
  context.x = top;
  context.y = left;
  context.width = width;
  context.height = height;
}
</script>

<template>
  <DragResize
    :isActive="context.id === currentId"
    :parentLimitation="true"
    :preventActiveBehavior="true"
    :x="context.x" :y="context.y"
    :w="context.width" :h="context.height"
    :minw="5" :minh="5"
    @resizing="resize"
    @dragging="resize"
    @click="currentId = context.id"
  >
    <div class="container" ref="container" />
  </DragResize>
</template>

<style lang="less" scoped>
.wrapper {
  position: relative;
  user-select: none;
}
</style>
