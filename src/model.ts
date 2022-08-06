import { computed, ref } from "vue";
import { Block, BlockType, createBlock } from "./blocks";

export const blockList = ref<Block[]>([]);

export const currentId = ref<number | null>(null);

export const currentBlock = computed(() => {
    if (currentId.value === null) return null;
    return blockList.value.find((block) => block.id === currentId.value) ?? null;
});

export const addBlock = (type: BlockType) => {
    const block = createBlock(type);
    blockList.value.push(block);
    return block;
};
