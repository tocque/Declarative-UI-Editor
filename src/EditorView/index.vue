<script setup lang="ts">
import { ref } from 'vue'
import { currentBlock } from '@/model';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { Collapse, CollapsePanel, Textarea, Tooltip } from 'ant-design-vue';

const activeKeys = ref(['1', '2', '3', '4', '5', '6']);
</script>

<template>
  <div class="editor-view">
    <Collapse
      class="editor-collapse"
      v-model:activeKey="activeKeys"
      :bordered="false"
    >
      <template #expandIcon="{ isActive }">
        <CaretRightOutlined :rotate="isActive ? 90 : 0" />
      </template>
      <CollapsePanel key="1" header="全局变量">
        <p>这里设定全局变量的值</p>
      </CollapsePanel>
      <template v-if="currentBlock">
        <CollapsePanel key="2" header="显示条件">
          <Textarea
            autoSize
            :value="currentBlock.condition ?? ''"
            @change="(e) => currentBlock!.condition = e.target.value || void 0"
          />
        </CollapsePanel>
        <CollapsePanel key="3" header="属性">
          <div v-for="(prop, key) of currentBlock.meta.props" :key="key">
            <Tooltip :title="prop.desc">
              <span>{{ prop.name }}</span>
            </Tooltip>
            <Textarea
              autoSize
              v-model:value="currentBlock.props[key]"
            />
          </div>
        </CollapsePanel>
        <CollapsePanel key="4" header="样式">
          <Textarea
            autoSize
            v-model:value="currentBlock.style"
          />
        </CollapsePanel>
        <CollapsePanel key="5" header="点击事件">
          <Textarea
            autoSize
            :value="currentBlock.onClick ?? ''"
            @change="(e) => currentBlock!.onClick = e.target.value || void 0"
          />
        </CollapsePanel>
        <CollapsePanel key="6" header="悬停效果">
          <Textarea
            autoSize
            :value="currentBlock.onHover ?? ''"
            @change="(e) => currentBlock!.onHover = e.target.value || void 0"
          />
        </CollapsePanel>
      </template>
      <div v-else class="unselect">
        当前未选择元素
      </div>
    </Collapse>
  </div>
</template>

<style lang="less" scoped>
.editor-view {
  width: 240px;
  overflow: auto;
}
.unselect {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
}
.editor-collapse {
  min-height: 100%;
}
.ant-collapse-item {
  border: 0;
  overflow: hidden;
  :deep(.ant-collapse-header) {
    padding: 2px 8px;
    background-color: #F1F1F1;
    font-weight: bold;
  }
}
</style>
