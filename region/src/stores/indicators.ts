import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFirstStore = defineStore('first', () => {
  const getCurrentFirst = (currentFirst:string) => {    ;
    const economy = ["生产与流通指标", "分配与消费"]
    const society = ["人口与卫生指标", "学习与工作指标", "休闲与福利指标"]
    const politics = ["政治参与指标","国家治理指标","公共安全指标"]
    const culture = ["文化生活指标", "科技与创新指标"]
    const environment = ["生态环境指标", "国际环境指标"]
    const health = ["营养与健康指标", "家庭与住房指标", "生活模式指标"]
    if (economy.indexOf(currentFirst) > -1) {
      return "经济指标"
    } 
    else if(society.indexOf(currentFirst) > -1){
      return "社会指标"
    }
    else if(politics.indexOf(currentFirst) > -1){
      return "政治指标"
    }
    else if(culture.indexOf(currentFirst) > -1){
      return "文化指标"
    }
    else if(environment.indexOf(currentFirst) > -1){
      return "环境指标"
    }
    else{
      return "个人生活指标"
    }
  }
  return { getCurrentFirst }
})

export const useSecondStore = defineStore('second', () => {
  const currentSecond = ref("生产与流通指标")
  return { currentSecond }
})

export const useRegionStore = defineStore('region', () => {
  const selectedRegions = ref(["中国"])
  const regionLegend = ref()
  const currentRegion = ref()
  return { selectedRegions,currentRegion,regionLegend }
})

export const useThirdStore = defineStore('third', () => {
  const names = ref<string[]>([])
  const values = ref<number[]>([])
  const datas = ref<any[]>([])
  const setNames = (val:any)=>{
    names.value = val
  }
  const setValues = (val:any)=>{
    values.value = val
  }

  return {datas,names,values,setNames, setValues }
})
