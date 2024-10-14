<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface Tree {
    id?: number | string
    label: string
    children?: Tree[]
}

const expandedKeys = ref<any[]>(["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"])

    const selectedNodeKey = ref<string | number | null>(null); 
const handleNodeClick = (data: Tree,node:any) => {
    selectedNodeKey.value = node.key;
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
        @node-click="handleNodeClick" class="tree" />
</template>

<style scoped lang="scss">
.tree {
    color: #00f0ff; /* 霓虹蓝 */
    // background: radial-gradient(circle, rgba(25,25,50,0.9), rgba(0,0,20,0.8)); /* 深色渐变背景 */
    background: linear-gradient(to bottom right, #2a2a4d, #2a2a4d);
    border: 1px solid rgba(0, 255, 255, 0.3); /* 霓虹边框 */
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); /* 外发光效果 */
    overflow-y: auto;
    height: 100%;
    font-size: 16px;
    letter-spacing: 1.5px;
    padding: 15px; /* 增加内边距 */
    --el-tree-node-hover-bg-color: #1f66cf;
    transition: background 0.3s, box-shadow 0.3s;
    &:hover {
        background: radial-gradient(circle, rgba(30,30,60,0.9), rgba(0,0,30,0.9));
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
}
}

</style>
