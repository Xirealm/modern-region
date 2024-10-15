<script setup lang="ts">
import TreeData from "./components/TreeData.vue";
import Chart1 from "./components/Chart1.vue";
import Chart2 from "./components/Chart2.vue";
import Chart3 from "./components/Chart3.vue";
import Chart4 from "./components/Chart4.vue";
import { onMounted, ref } from "vue";
import { useSecondStore } from "./stores/indicators";
import { useRegionStore } from "./stores/indicators";
import axios from "axios";
import '../../region/src/style/index.scss'
const chart3 = ref()
const secondStore = useSecondStore()
const value: {[key: string]: any} = ref([])

const regionsChange = () => {
  chart3.value.change()
}
const changeThird = () => {
  chart3.value.change()
}
const deleteRegion = () => {
  chart3.value.clearChart()
}
const regionsLegendChange = (() => {
  chart3.value.regionsLegendChange()
});



const chart2Changed = () => {
  value.value = []
  useRegionStore().selectedRegions.forEach((item: any) => {
    value.value.push({
      value: item,
      label: item
    })
  })
}

</script>

<template>
  <el-container>
    <el-header class="header">
      <div class="img"></div>
      <h1 class="title">区域现代化评价指标</h1>
    </el-header>
    <el-main class="main">
      <el-row style="height: 100%" justify="space-between">
        <el-col :span="4" class="tree-box">
          <TreeData />
        </el-col>
        <el-col :span="20" class="charts">
          <div class="line1">
            <div class="chart1">
              <Chart1 @regions-change="regionsChange" @deleteRegion="deleteRegion" @regionsLegendChange="regionsLegendChange" @chart2Change = "chart2Changed" />
            </div>
            <div class="chart2">
              <Chart2 @change = "changeThird" :value = "value" />
            </div>
          </div>
          <div class="line2">
            <div class="chart3">
              <Chart3 ref="chart3"/>
            </div>
            <div class="chart4">
              <Chart4/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 8vh;
  background-color: #183158;
  position: relative;
  .title {
    height: 8vh;
    line-height: 8vh;
    letter-spacing: 2px;
    font-size: 36px;
    font-weight: 600;
    color: white;
  }
  .img{
  background-image: url('../../region/src/assets/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 300px;
  height: 100%;
  position: absolute;
  left: 100px;

}
}
.main {
  // background-color: rgba(216, 216, 216, 0.406);
  background-color: #07162f;
  height: 92vh;
  padding: 30px;
  .tree-box {
    background-color: rgba(200, 200, 200, 0.4);
    border-radius: 15px;
    // border: 1px solid var(--el-border-color);
    box-shadow: var(--el-box-shadow-lighter);
    padding: 10px 5px;
    height: 100%;
  }
  .charts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: bisque;
    padding: 0 0 0 30px;
    .line1 {
      height: 49%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      .chart1 {
        background-color: #545d6c;
        height: 100%;
        border-radius: 15px;
        // border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-lighter)
      }
      .chart2 {
        background-color: #545d6c;
        height: 100%;
        border-radius: 15px;
        // border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-lighter)
      }
    }
    .line2 {
      height: 48%;
      display: grid;
      grid-template-columns: 5fr 1fr;
      gap: 20px;
      .chart3 {
        background-color: #545d6c;
        border-radius: 15px;
        // border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-lighter)
      }
      .chart4 {
        background-color: #545d6c;
        border-radius: 15px;
        // border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-lighter)
      }
    }
  }
}

</style>
