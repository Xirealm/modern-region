<template>
  <v-chart ref="chart" class="chart" :option="option" />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";

import axios from "axios";
import { ref, onMounted} from "vue";
import { useRegionStore,useSecondStore} from "@/stores/indicators";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
} from "echarts/components";
import VChart from "vue-echarts";

const secondStore = useSecondStore();
const regionStore = useRegionStore();
const chart = ref();

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
]);

const emit = defineEmits<{
  change: [name: string];
}>();

const option: any = ref({
  title: {
    text: "生产与流通指标",
    left: '5',
    top:'5',
    textStyle: {
      color: '#000',
    }
  },
  legend: {
    show: false,
    icon: "circle",
  },
  tooltip: {},
  dataset: {
    dimensions: ["project", ...regionStore.selectedRegions],
    source: [],
  },
  textStyle: {
    fontSize:'14'
  },
  xAxis: {
    type: "category",
    axisLabel: {
      interval: 0,
      rotate: 25,
      color: '#000',
      fontSize:'13'
    },
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      barMaxWidth: '50',
    },
  ],
});

onMounted(async () => {
  const regions = ["中国"];
  const res = await axios.request({
    url: `/api/getRegion/tag_three_list?regions=${regions}&tag_two=${secondStore.currentSecond}`,
    method: "post",
  });
  option.value.dataset.source = res.data.data;
  option.value.dataset.dimensions = [
    "project",
    ...regionStore.selectedRegions,
  ]
  option.value.series = regionStore.selectedRegions.map(() => {
    return { type: "bar" };
  })
});
const change = async () => {
  const res = await axios.request({
    url: `/api/getRegion/tag_three_list?regions=${regionStore.selectedRegions}&tag_two=${secondStore.currentSecond}`,
    method: "post",
  });
  option.value.dataset.dimensions = ["project",...regionStore.selectedRegions]
  option.value.series = regionStore.selectedRegions.map(() => {
    return { type: "bar" };
  })
  option.value.dataset.source = res.data.data;
  option.value.title.text = secondStore.currentSecond;
  option.value.series.forEach((item: any) => {
    item.barMaxWidth = '50'
  })
  chart.value.setOption(option.value);
};
const regionsLegendChange = () => {
  option.value.legend.selected = regionStore.regionLegend;
};
const clearChart = () => {
  chart.value.clear()
}
defineExpose({
  change,
  regionsLegendChange,
  clearChart
});
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
