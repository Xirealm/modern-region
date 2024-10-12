<template>
  <div class="chart2">
    <el-select v-model="value" class="select" placeholder="选择查看城市" @change="onChange">
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
import { ref, onMounted } from "vue";

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
      color: '#000',
    }
  },
  label: {
    color: '#000',
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
  regionStore.currentRegion = "中国"
  const secondaryIndicatorsRes = await axios.request({
    url: "/api/getRegion/tag_two_list",
    method: "post",
    params: {
      region: value.value
    },
  });
  secondaryIndicatorsRes.data.data.forEach((item: any) => {
    secondaryIndicators.value.push({
      name: item.name,
      value:item.score
    })
  })
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
const value = ref("中国")

const options = [
  {
    value: '中国',
    label: '中国',
  },
  {
    value: '太原',
    label: '太原',
  },
  {
    value: '晋中',
    label: '晋中',
  },
  {
    value: '大同',
    label: '大同',
  },
  {
    value: "阳泉",
    label: '阳泉',
  },
]
const onChange = async (value: any) => {
  regionStore.currentRegion = value
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
  position: relative;
}
.chart {
  height: 100%;
}
.select{
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1000;
}
</style>
