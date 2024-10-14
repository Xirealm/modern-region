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
      <div class="img" >
        
      </div>
     
      <h1 class="title" color="red">区域现代化</h1>
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

body {
  background: linear-gradient(135deg, #2b2d42, #8d99ae);
  overflow: hidden;
}

.header {
  display:flex ;
  flex-direction: column;
  position: relative;
  text-align: center;
  height: 10vh;
  background: #101C3D;
  backdrop-filter: blur(5px);
  .title {
    height: 10vh;
    line-height: 10vh;
    letter-spacing: 2px;
    font-size: 36px;
    font-weight: 500;
    color: #edf2f4;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
}

.main {
  background-color:#07162f;
  height: 90vh;
  padding: 30px;
  .tree-box {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 10px 5px;
    height: 100%;
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  .charts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0 0 40px;

    .line1 {
      height: 45%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .chart1, .chart2 {
        background-color: rgba(255, 255, 255, 0.9);
        height: 100%;
        border-radius: 12px;
        border: 1px solid var(--el-border-color);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .line2 {
      margin-top: 1px;
      height: 42%;
      display: grid;
      grid-template-columns: 5fr 1fr;
      gap: 50px;

      .chart3, .chart4 {
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        border: 1px solid var(--el-border-color);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}
.img{
  margin-top: 20px;
  border-radius: 8px; 
  left: 100px;
  position: absolute;
  background-image: url('../../region/assets/logo.png');
  background-color: rgba(255, 255, 255, 0.7);
  background-repeat: no-repeat;
  // background:linear-gradient(to bottom right, #9407d1, #aaaadc);
width: 250px;
height: 100px;
}
</style>
