<template>
  <div class="chart1">
    <!-- 删去选中区域 -->
    <el-popover
      placement="bottom"
      :width="300"
      trigger="hover">
      <template #reference>
        <el-button class="delete-btn">已选区域</el-button>
      </template>
      <div class="tags-box">
        <el-tag
          v-for="region in selectedRegions"
          :key="region"
          class="tag"
          effect="plain"
          :closable="region !== '中国'"
          @close="handleClose(region)">
          {{ region }}
        </el-tag>
      </div>
    </el-popover>
    <el-popover
      placement="bottom"
      :width="300"
      trigger="hover"
    >
      <template #reference>
        <el-button class="increase-btn">{{ "+  "}}添加对比区域</el-button>
      </template>
      <div class="btn-box">
        <el-button
          v-for="region in regions"
          :key="region"
          class="btn"
          @click = "increaseRegion(region)"
          text
          :disabled = "selectedRegions.includes(region)">
          {{ region }}
        </el-button>
      </div>

    </el-popover>
    <v-chart class="chart" :option="option" ref="chart" @legendselectchanged="legendselectchanged"/>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
import { useRegionStore } from "@/stores/indicators";
const regionStore = useRegionStore()

const chart = ref();
const regions = ref <string[]>([])
const selectedRegions = ref(['中国'])
const primaryIndicators = ref<any[]>([]);

const emit = defineEmits<{
  regionsChange: [selectedRegions: string[]],
  regionsLegendChange: [void],
  deleteRegion: [void],
  chart2Change: [void]
}>()

; (async () => {
  const res2 = await axios.request({
    method: "post",
    url: "/api/getRegion/getRegionList"
  })
  regions.value = res2.data.data
})();

onMounted(async () => {
  const res = await axios.request({
    url: "/api/getRegion/tag_one",
    method: "post",
    params: {
      region: "中国",
    },
  });
  const datas: number[] = [];
  res.data.data.forEach((item: any) => {
    datas.push(item.score);
  });
  option.value.series[0].data.push({
      name: "中国",
      value: datas,
  });
  option.value.legend.data.push("中国")
});

const increaseRegion = async (region: string) => {
  selectedRegions.value.push(region)
  regionStore.selectedRegions.push(region)
  emit('regionsChange', selectedRegions.value)
  emit('chart2Change')
  const res = await axios.request({
    url: "/api/getRegion/tag_one",
    method: "post",
    params: {
      region: region,
    },
  });
  const datas: number[] = [];
  res.data.data.forEach((item: any) => {
    datas.push(item.score);
  });
  option.value.series[0].data.push({
      name: region,
      value: datas,
  });
  option.value.legend.data.push(region)
}
const handleClose = (region: string) => {
  selectedRegions.value.splice(selectedRegions.value.indexOf(region), 1)
  regionStore.selectedRegions.splice(regionStore.selectedRegions.indexOf(region), 1)
  emit('regionsChange', selectedRegions.value)
  emit('deleteRegion')
  emit('chart2Change')
  option.value.series[0].data.splice(selectedRegions.value.indexOf(region), 1)
}

const option:any = ref({
  // color: [
  //   "rgba(202, 29, 29, 0.8)",
  //   "rgba(29, 35, 202, 0.8)",
  //   "rgba(29, 202, 136, 0.8)",
  //   "rgba(29, 193, 202, 0.8)",
  //   "rgba(245, 152, 59, 0.8)",
  // ],
  textStyle: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
  title: {
    text: "一级指标",
    left: '5',
    top:'5',
    textStyle: {
      color: '#000',
    }
  },
  /**取消生成动画 */
  // animation:false,
  /**悬浮提示 */
  tooltip: {
    trigger: "item",
  },
  /**选中城市 */
  legend: {
    data:"",
    left: "right",
    top:"100",
    orient: "vertical",
    icon: "rect",
    itemHeight: 12,
    align:'left',
    itemWidth: 12,
    textStyle: {
      fontSize: '15',
      lineHeight:'15'
    }
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "经济指标", max: 100 },
      { name: "社会指标", max: 100 },
      { name: "政治指标", max: 100 },
      { name: "文化指标", max: 100 },
      { name: "环境指标", max: 100 },
      { name: "个人生活指标", max: 100 },
    ],
    axisName: {
      color: '#000',
      fontSize:"14"
    },
    /**位置 */
    center: ["50%", "50%"],
  },
  series: [
    {
      type: "radar",
      data: primaryIndicators.value,
    },
  ],
});

const legendselectchanged = (e: any) => {
  regionStore.regionLegend = e.selected
  emit('regionsLegendChange')
}
</script>

<style scoped>
.chart1{
  position: relative;
}
.chart {
  height: 100%;
}
.increase-btn{
  position: absolute;
  top:5px;
  right:5px;
  z-index: 10000;
}
.delete-btn{
  position: absolute;
  top:5px;
  right:140px;
  z-index: 10000;
}
.btn-box{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  .btn{
    margin: 0;
  }
}
.tags-box{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 8px;
  .tag{
    font-size: 14px;
  }
}
</style>
