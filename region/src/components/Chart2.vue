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
    "#acc2ef", "#acc2ef",
    "#4d648d", "#4d648d", "#4d648d",
    "#3D5A80", "#3D5A80", "#3D5A80",
    "#374357", "#374357",
    "#1f2b3e", "#1f2b3e",
    "#1F3A5F", "#1F3A5F", "#1F3A5F",
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
  position: relative;
}
.chart {
  height: 100%;
}
.select{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 200px;
  z-index: 1000;
}
</style>
