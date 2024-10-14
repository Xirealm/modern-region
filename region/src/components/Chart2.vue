<template>
  <div class="chart2">
    <el-select  class="select" :placeholder="cur" @change="onChange" :key="length">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <v-chart ref="chart" class="chart" :option="option" @click = "handleClick" @mouseover="mouseOver" />
  </div>
</template>


<script setup lang="ts">
import axios from "axios"
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { useFirstStore,useRegionStore,useSecondStore } from "../stores/indicators";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, onMounted, watchEffect, watch } from "vue";

const firstStore = useFirstStore()
const secondStore = useSecondStore()
const chart = ref()
const secondaryIndicators = ref<any[]>([]);

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
]);

const emit = defineEmits<{
  change: [void]
}>()



const props = defineProps({
  value: {
    type: Object,
    default: [{
      value: '中国',
      label: '中国',
    }]
  }
})



const option:any = ref({
  color: [
    "#ffa409",
    "#ffa409",
    "rgba(29, 193, 202, 0.8)",
    "rgba(29, 193, 202, 0.8)",
    "rgba(29, 193, 202, 0.8)",
    "rgba(29, 35, 202, 0.8)",
    "rgba(29, 35, 202, 0.8)",
    "rgba(29, 35, 202, 0.8)",
    "pink",
    "pink",
    "rgba(29, 202, 136, 0.8)",
    "rgba(29, 202, 136, 0.8)",
    "#4172c3",
    "#4172c3",
    "#4172c3",
  ],
  title: {
    text: "二级指标",
    left: '5',
    top:'5',
    textStyle: {
      color: '#fff',
    }
  },
  label: {
    color: '#fff',
    fontSize:'14'
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "二级指标",
      type: "pie",
      radius: ["12%","64%"],
      data: secondaryIndicators.value,
      roseType: 'radius',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
onMounted(async () => {
  onChange("中国")
})

const handleClick = (e: any) => {
  secondStore.currentSecond = e.data.name
  emit("change")
  chart.value.setOption(option.value)
}
const mouseOver = (e: any) => {
  option.value.series[0].name = firstStore.getCurrentFirst(e.data.name)
}

const regionStore = useRegionStore()
const cur = ref("中国")

const options:{[key:string]: any} = [
  {
    value: '中国',
    label: '中国',
  }
]

const length = ref(options.length)
const change = ref(true)
// const index = ref(-1)
watchEffect(() => {
  if (options.length > props.value.length && props.value.length != 0) {
    options.forEach((item: { [key: string]: any },index: number) => {
      change.value = true
      props.value.forEach((item2: any, index2: number) => {
        if (item2.value == item.value) {
          change.value = false
        }
      })
      if (change.value) {
        const res = options.splice(index, 1)
        
        if (regionStore.currentRegion == res[0].value) {
          onChange("中国")
        }
        length.value--
      }
    })
  }
  else {
    props.value.forEach((item: { [key: string]: any }) => {
      change.value = true
      options.forEach((item2:any) => {
        if (item2.value == item.value) {
          change.value = false
        }
      })
      if (change.value) {
        options.push({
          value: item.value,
          label: item.label
        })
        length.value++
      }
    })
  }
  
})
const onChange = async (value: any) => {
  regionStore.currentRegion = value
  cur.value = regionStore.currentRegion
  const secondaryIndicatorsRes = await axios.request({
    url: "/api/getRegion/tag_two_list",
    method: "post",
    params: {
      region: regionStore.currentRegion
    },
  });
  const secondaryIndicatorsData:any[] = []
  secondaryIndicatorsRes.data.data.forEach((item: any) => {
    secondaryIndicatorsData.push({
      name: item.name,
      value:item.score
    })
  })
  option.value.series[0].data = secondaryIndicatorsData
  chart.value.setOption(option.value) 
}
</script>

<style scoped>
.chart2{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* background: linear-gradient(to bottom right, #2a2a4d, #4b4b6b); */
  background: linear-gradient(to bottom right, #2a2a4d, #2a2a4d);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* 防止内容溢出 */
}
.chart {
  flex-grow: 1;
  height: 100%;
  border-radius: 15px; /* 图表圆角 */
  overflow: hidden; /* 防止内容溢出 */
  transition: transform 0.3s; /* 动画效果 */
}
.chart:hover {
  transform: scale(1.03); /* 悬停时放大 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* 悬停时的阴影效果 */
}
.select{
  position: absolute;
  left: 600px;
  right: 30px; /* 调整位置 */
  top: 10px; /* 调整位置 */
  z-index: 1000;
  background: rgba(60, 42, 199, 0.2); /* 半透明背景 */
  border: 1px solid rgba(255, 255, 255, 0.4); /* 边框 */
  color: #fff; /* 字体颜色 */
  transition: background 0.3s, transform 0.3s; /* 过渡效果 */
  border-radius: 5px; /* 圆角 */
  padding: 5px 10px; /* 内边距 */
  width: 300px;
}
.select:hover {
  background: rgba(255, 255, 255, 0.4); /* 悬停时背景变化 */
  transform: scale(1.05); /* 悬停时放大 */
}


</style>
