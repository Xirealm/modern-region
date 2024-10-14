<script setup lang="ts">
const file = (e: any) => {
    console.log(e.target.files[0]);
    console.log(e.target.value);
    console.log(URL.createObjectURL(e.target.files[0]));
}

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import type { UploadProps, UploadUserFile } from 'element-plus'
import axios from 'axios';

const message = ref("上传成功")


const regions = ref<string[]>([])
; (async () => {
    const res2 = await axios.request({
        method: "post",
        url: "/api/getRegion/getRegionList"
    })
    regions.value = res2.data.data
})();

const upLoadSuccess = (params: any) => {
    message.value = "上传成功"
    open2()
    console.log(params);

}

const upLoadError = () => {
    message.value = "上传失败"
    open3()
}

const fileUpload = () => {
    location.href = "http://47.100.201.199:9006/files/demo.xlsx"
    message.value = "下载成功"
    open2()
}

const open2 = () => {
    ElMessage({
        message: message.value,
        type: 'success',
    })
}
const open3 = () => {
    ElMessage({
        message: message.value,
        type: 'warning',
    })
}

const exportPDF = async (region: string) => {
    const res = await axios.request({
        method: "POST",
        url: "/api/download",
        params: {
            region: region
        },
        responseType: "arraybuffer"
    })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    window.open(url)
    if(res.status == 200) {
        message.value = "下载成功"
        open2()
    }
    else {
        message.value = "下载失败"
        open3()
    }
}

</script>


<template>
    
    <div class="box">
        <h2>上传区域现代化评价</h2>
        <div class="btn-box">
            <!-- <input type="file" name="upLoad" id="upLoad" class="fileSelect" @change = "file" > -->
            <!--  <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="3"> -->
            <!-- <el-button type="primary" class="upLoad"><label for="upLoad">上传评价数据文件</label></el-button> -->
            <!-- </el-upload> -->
            <el-upload class="upload-demo" action="/api/upload" :limit="1" :on-error="upLoadError"
                :on-success="upLoadSuccess" :show-file-list="false">
                <el-button type="primary" class="upLoad">上传评价数据文件</el-button>
            </el-upload>

            <!-- <el-button type="primary" class="upLoad"><label for="upLoad">上传评价数据文件</label></el-button> -->
        </div>
        <div class="btn-box">
            <el-popover placement="bottom" :width="300" trigger="hover">
                <template #reference>
                    <el-button type="primary" class="btn">专家在线评价系统</el-button>
                </template>
                <div class="btn-box2">
                    <el-button v-for="region in regions" :key="region" class="btn" text @click="exportPDF(region)">
                        {{ region }}
                    </el-button>
                </div>
            </el-popover>

        </div>
        <div class="btn-box">
            <el-button type="primary" class="btn" @click="fileUpload">下载评价模板文件</el-button>
        </div>


    </div>
</template>

<style lang="scss">
h2 {
    // font-size: 18px;
    text-align: center;
    color: #00d4ff;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.7), 0 0 20px rgba(0, 212, 255, 0.5);
    // margin-bottom: 15px;
    margin-top: 20px;
    font-size: 24px;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    // margin-top: 20px;
    padding: 10px;
    background: linear-gradient(to bottom right, #2a2a4d, #4b4b6b);;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(0, 255, 255, 0.1);
}

.fileSelect {
    background: transparent;
    display: none;
}

.btn-box {
    margin:50px 0;
    position: relative;
    display: flex;
    justify-content: center; /* 水平居中对齐 */
    gap: 0px; /* 按钮之间的间距 */
    flex-wrap: wrap; /* 自动换行，适配不同的屏幕宽度 */
    overflow: hidden;
    .el-button {
        height: 50px;
        background: linear-gradient(90deg, #6808d4, #0099ff);
        color: #fff;
        border: none;
        border-radius: 12px; /* 圆角按钮 */
        padding: 12px 48px; /* 按钮的内边距调整，确保大小一致 */
        font-size: 18px; /* 字体大小适中 */
        box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
        transition: background 0.5s, transform 0.3s ease;
        &:hover {
            background: linear-gradient(90deg, #00ff6e, #00d4ff);
            transform: scale(1.05); /* 稍微缩放效果 */
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
    }
}
}
.el-popover {
    .btn {
        background: linear-gradient(90deg, #00d4ff, #0057ff);
        color: #fff;
        border-radius: 8px;
        padding: 8px 16px;
        margin: 3px;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
        transition: all 0.3s ease;
        &:hover {
            background: linear-gradient(90deg, #0057ff, #00d4ff);
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(0, 0, 255, 0.3);
        }
    }
}

</style>