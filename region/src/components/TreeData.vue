<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface Tree {
    id?: number | string
    label: string
    children?: Tree[]
}

const expandedKeys = ref<any[]>(["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"])

const handleNodeClick = (data: Tree) => {
    console.log(data)
}
const data = ref<Tree[]>([])

onMounted(async () => {
    const res = await axios.request({
        url: "/api/getRegion/getLabelTree",
        method: "post"
    }) 
    data.value.push(res.data.data)
})


const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>

<template>
    <el-tree :data="data" :props="defaultProps" node-key="id" :default-expanded-keys="expandedKeys"
        @node-click="handleNodeClick" class="tree"/>
</template>

<style scoped lang="scss">
.tree {
    color: rgb(0, 0, 0);
    background-color: transparent;
    overflow-y: auto;
    height: 100%;
    font-size: 14px;
    letter-spacing: 1px;
}

.tree::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.tree::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(146, 146, 146, 0.2);
    background: #d5d3d3;
}

.tree::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
}
</style>
