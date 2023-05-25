<template>
    <div class="center">
        <el-steps :active="active" style="width: 80vw;" finish-status="success">
            <el-step title="选择图片上传" />
            <el-step title="填写信息" />
            <el-step title="确认！" />
        </el-steps>
        <el-upload list-type="picture-card" v-show="active == 0" action="" :on-preview="handlePictureCardPreview"
            :on-remove="handlePicRemove" :http-request="handleRequest" :show-file-list="true">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>
        <img :src=fileList[0] v-show="showImg" class="fitsize">
        <el-form class="form" label-width="20%" v-show="active == 1">
            <el-form-item label="商品名称">
                <el-input v-model="goodsname"></el-input>
            </el-form-item>
        </el-form>
        <el-button :disabled="!showImg" style="margin-top: 12px" @click="next">{{ buttonContent }}</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="预览" width="fit-content">
        <img :src="dialogImageUrl" class="bigSize" />
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import axios from '../axios';
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElNotification } from "element-plus"
import usePinia from '../pinia';
const fileList = reactive<any[]>([])
const showImg = ref(false);
const buttonContent = ref("下一步")
const fd = new FileReader()
const imgName = ref("")
const handleRequest = (e: any) => {
    fd.readAsDataURL(e.file)
    fd.onload = () => {
        fileList.push(fd.result)
        showImg.value = true;
        imgName.value = e.file.name
    }
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

.fitsize {
    height: 300px;
    width: 300px;
}

.bigSize {
    height: 600px;
    width: 600px;
}
</style>