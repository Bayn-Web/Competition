<template>
    <div class="center">
        <el-steps :active="active" style="width: 80vw;margin-top: 20px;" finish-status="success">
            <el-step title="选择图片" />
            <el-step title="填写信息" />
            <el-step title="确认！" />
        </el-steps>
        <template v-if="active == 0">
            <ul class="create-button">
                <li class="active" @click="isActive(1, $event)" ref="li1">
                    <div class="create-item">
                        <div class="icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM4.47 5.72C4.76 5.43 5.24 5.43 5.53 5.72C6.24 6.43 7.4 6.43 8.11 5.72C8.4 5.43 8.88 5.43 9.17 5.72C9.46 6.01 9.46 6.49 9.17 6.78C8.52 7.43 7.67 7.75 6.82 7.75C5.97 7.75 5.12 7.43 4.47 6.78C4.18 6.48 4.18 6.01 4.47 5.72ZM10 16.78C7.31 16.78 5.12 14.59 5.12 11.9C5.12 11.2 5.69 10.62 6.39 10.62H13.59C14.29 10.62 14.86 11.19 14.86 11.9C14.88 14.59 12.69 16.78 10 16.78ZM15.53 6.78C14.88 7.43 14.03 7.75 13.18 7.75C12.33 7.75 11.48 7.43 10.83 6.78C10.54 6.49 10.54 6.01 10.83 5.72C11.12 5.43 11.6 5.43 11.89 5.72C12.6 6.43 13.76 6.43 14.47 5.72C14.76 5.43 15.24 5.43 15.53 5.72C15.82 6.01 15.82 6.48 15.53 6.78Z"
                                    :fill="isWhite ? 'white' : 'black'"></path>
                            </svg></div>
                        <span>藏品出售</span>
                    </div>
                </li>
                <li @click="isActive(2, $event)" ref="li2">
                    <div class="create-item">
                        <div class="icon"><svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.748 1H4.74805C3.08805 1 1.74805 2.34 1.74805 4V10C1.74805 11.66 3.08805 13 4.74805 13H9.24805C9.24805 10.52 11.268 8.5 13.748 8.5V4C13.748 2.34 12.408 1 10.748 1ZM4.51805 4.27C5.28805 3.72 6.33805 3.71 7.12805 4.25C7.46805 4.48 7.55805 4.95 7.32805 5.29C7.09805 5.63 6.62805 5.72 6.28805 5.49C6.01805 5.3 5.64805 5.3 5.37805 5.5C5.24805 5.59 5.09805 5.63 4.94805 5.63C4.71805 5.63 4.47805 5.52 4.33805 5.32C4.09805 4.98 4.17805 4.51 4.51805 4.27ZM10.018 8.24C9.75805 8.57 9.28805 8.62 8.96805 8.36C8.61805 8.08 8.19805 7.93 7.74805 7.93C6.74805 7.93 5.91805 8.69 5.80805 9.67H7.90805C8.31805 9.67 8.65805 10.01 8.65805 10.42C8.65805 10.83 8.31805 11.17 7.90805 11.17H5.58805C4.87805 11.17 4.29805 10.59 4.29805 9.88C4.29805 7.98 5.84805 6.43 7.74805 6.43C8.52805 6.43 9.29805 6.7 9.90805 7.19C10.228 7.45 10.278 7.92 10.018 8.24ZM11.328 5.29C11.098 5.63 10.628 5.72 10.288 5.49C10.018 5.3 9.64805 5.3 9.37805 5.5C9.24805 5.59 9.09805 5.63 8.94805 5.63C8.71805 5.63 8.47805 5.52 8.33805 5.32C8.09805 4.98 8.17805 4.51 8.51805 4.27C9.28805 3.72 10.338 3.71 11.128 4.25C11.468 4.48 11.558 4.95 11.328 5.29Z"
                                    :fill="!isWhite ? 'white' : 'black'"></path>
                                <path
                                    d="M18.9678 16.6786C18.8978 16.5986 18.7978 16.5586 18.6878 16.5586H14.8078C14.6978 16.5586 14.5978 16.5986 14.5278 16.6786C14.4578 16.7586 14.4178 16.8686 14.4378 16.9686C14.5678 18.1486 15.5578 19.0486 16.7478 19.0486C17.9378 19.0486 18.9278 18.1586 19.0578 16.9686C19.0678 16.8586 19.0378 16.7586 18.9678 16.6786Z"
                                    :fill="!isWhite ? 'white' : 'black'"></path>
                                <path
                                    d="M19.748 10H13.748C12.098 10 10.748 11.35 10.748 13V19C10.748 20.65 12.098 22 13.748 22H19.748C21.398 22 22.748 20.65 22.748 19V13C22.748 11.35 21.398 10 19.748 10ZM13.338 13.17C13.578 12.83 14.048 12.75 14.388 12.99C14.658 13.18 15.018 13.18 15.288 13C15.628 12.76 16.098 12.85 16.328 13.2C16.558 13.54 16.478 14.01 16.128 14.24C15.738 14.5 15.288 14.64 14.838 14.64C14.368 14.64 13.908 14.5 13.518 14.22C13.178 13.97 13.098 13.5 13.338 13.17ZM16.748 20.17C14.848 20.17 13.298 18.62 13.298 16.72C13.298 16.01 13.878 15.43 14.588 15.43H18.908C19.618 15.43 20.198 16.01 20.198 16.72C20.198 18.62 18.648 20.17 16.748 20.17ZM20.128 14.23C19.738 14.49 19.288 14.63 18.838 14.63C18.368 14.63 17.908 14.49 17.518 14.21C17.178 13.97 17.098 13.5 17.338 13.16C17.578 12.82 18.048 12.74 18.388 12.98C18.658 13.17 19.018 13.17 19.288 12.99C19.628 12.75 20.098 12.84 20.328 13.19C20.558 13.54 20.468 14 20.128 14.23Z"
                                    :fill="!isWhite ? 'white' : 'black'"></path>
                            </svg></div><span>出售授权</span>
                    </div>
                </li>
            </ul>
            <el-upload v-show="withoutAI" list-type="picture-card" action="" :on-preview="handlePictureCardPreview"
                :on-remove="handlePicRemove" :http-request="handleRequest" :show-file-list="true">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <!-- <el-upload v-show="withoutAI" style="width: 80vw;" class="upload-demo" drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽 或 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        上传您的数字艺术品
                    </div>
                </template>
            </el-upload> -->
            <label v-show="withoutAI == false" for="#describe">描述意境，让AI来创作
                <el-input v-model="description" id="describe"></el-input>
            </label>
        </template>
        <img :src=fileList[0] v-show="showImg" class="fitsize">
        <el-form class="form" label-width="20%" v-show="active == 1">
            <el-form-item label="艺术品名称">
                <el-input v-model="goodsname"></el-input>
            </el-form-item>
        </el-form>
        <el-button :disabled="!showImg && !ready" style="margin-top: 12px" @click="next">{{ buttonContent }}</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="预览" width="fit-content">
        <img :src="dialogImageUrl" class="bigSize" />
    </el-dialog>
    <!-- <img src="../static/二维码.png" id="fake"> -->
</template>
  
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref, watch, onBeforeUnmount, onBeforeMount } from 'vue';
import axios from '../axios';
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElNotification } from "element-plus"
import usePinia from '../pinia';
const li1 = ref(null)
const li2 = ref(null)
const fileList = reactive<any[]>([])
const showImg = ref(false);
const buttonContent = ref("下一步")
const fd = new FileReader()
const imgName = ref("")
const withoutAI = ref(true)
const ready = ref(false)
const description = ref("")
const isWhite = ref(true)
//监听ai描述词是否填写
watch(description, (newV) => {
    if (newV == "") {
        ready.value = false
    } else {
        ready.value = true
    }
    console.log(newV)
})
//预览图片显示
const handleRequest = (e: any) => {
    fd.readAsDataURL(e.file)
    fd.onload = () => {
        fileList.push(fd.result)
        showImg.value = true;
        imgName.value = e.file.name
    }
}
const isActive = (id: number, event: MouseEvent) => {
    if (id == 1) {
        (li2.value! as HTMLLIElement).classList.remove("active");
        withoutAI.value = true
        ready.value = false;
        isWhite.value = true;
    } else {
        (li1.value! as HTMLLIElement).classList.remove("active");
        withoutAI.value = false;
        ready.value = true;
        isWhite.value = false;
        window.open("https://mt73678119.yicp.fun/", "_blank");
    }
    (event.currentTarget! as HTMLLIElement).classList.add("active")
}
const dialogImageUrl = ref('')
const goodsname = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
const active = ref(0)
const pinia = usePinia();
const next = () => {
    active.value++;
    if (active.value == 2) {
        buttonContent.value = "完成！"
    }
    if (active.value == 3) {
        axios({
            method: "post",
            url: "/goods/userAddGoods",
            data: {
                priUrl: fileList[0],
                goodsname: goodsname.value,
                ipfsHash: "32123",
                userId: pinia.userInfo.id,
                imgName: imgName.value
            }
        }).then(() => {
            ElNotification({
                title: 'Success',
                message: '成功上传作品，返回我的作品查看吧',
                type: 'success',
            })
            showImg.value = false;
        }).catch(() => {
            ElNotification({
                title: 'Success',
                message: '成功上传作品，返回我的作品查看吧',
                type: 'success',
            })
        })
    }
}
const handlePicRemove = () => {
    fileList.splice(0, fileList.length)
    showImg.value = false;
}
</script>
  
<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#fake{
    position: absolute;
    width: 150px;
    height: 150px;
    top: 220px;
    left: 300px;
}
.fitsize {
    height: 300px;
    width: 300px;
}

.bigSize {
    height: 600px;
    width: 600px;
}

.create-button {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    border-bottom: 1px solid #aaa;
}

.create-button li {
    width: fit-content;
    margin: 10px;
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 10px;
    font-size: 14px;
    padding: 10px 62px;
    cursor: pointer;
}

.active {
    background-color: #1f1f2c;
    color: #aaa;
}

.create-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.icon {
    height: 20px;
    width: 20px;
    margin: 10px;
}

.large {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 2;
}
</style>