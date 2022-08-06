<script setup lang="ts">
import Topbar from './Topbar/index.vue';
import Statusbar from './Statusbar/index.vue';
import BlocksView from './BlocksView/index.vue';
import CanvasView from './CanvasView/index.vue';
import EditorView from './EditorView/index.vue';
</script>

<template>
  <div class="workbrench-header">
    <Topbar />
  </div>
  <div class="workbrench-main">
    <CanvasView class="workbrench-pane" />
    <BlocksView class="workbrench-pane" />
    <EditorView class="workbrench-pane" />
  </div>
  <div class="workbrench-footer">
    <Statusbar />
  </div>
</template>

<style lang="less" scoped>
.workbrench-header, .workbrench-main, .workbrench-footer {
  width: 100%;
  position: relative;
}
.workbrench-header {
  flex-shrink: 0;
  height: 30px;
}
.workbrench-footer {
  flex-shrink: 0;
  height: 30px;
}
.workbrench-main {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.workbrench-pane {
  height: 100%;
  max-height: 100%;
}
</style>
