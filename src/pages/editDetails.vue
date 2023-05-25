<template>
    <div class="background">
        <div class="row">
            <div class="border" @click="takeMark">
                <el-tooltip class="box-item" effect="dark" content="点击提取图片交易链码" placement="top">
                    <img :src="currentGood.data.picUrl">
                </el-tooltip>
            </div>
            <div class="column">
                <div class="title">{{ currentGood.data.name }}</div>
                <div class="price">￥{{ currentGood.data.price }}</div>
                <div class="brief maxlength">{{ currentGood.data.brief }}</div>
                <div class="brief">创建时间{{ currentGood.data.addTime }}</div>
                <el-badge :value="badgeContent" class="item">
                    <el-button :disabled="currentGood.data.isOnSale == 1" class="button" type="success" @click="ground"
                        plain>
                        <el-icon>
                            <Coin />
                        </el-icon>
                        <span>申请上架这件商品</span>
                    </el-button>
                </el-badge>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    ref,
    onBeforeMount
} from 'vue';
import axios from '../axios';
import { ElNotification, ElLoading, ElMessage } from "element-plus"
import { useRouter } from 'vue-router';
import { elNote } from '../tools';
const router = useRouter()
const badgeContent = ref("")
const currentGood = reactive<{ data: any }>({
    data: {}
})
onBeforeMount(() => {
    axios({
        method: "post",
        url: "/goods/selectGoodById",
        data: {
            id: router.currentRoute.value.params.id
        }
    }).then((res) => {
        currentGood.data = res.data
        if (currentGood.data.isOnSale == 1) badgeContent.value = "当前商品已经上架"
        else badgeContent.value = ""
    })
})
const ground = () => {
    axios({
        method: "post",
        url: "/goods/useraddGoodToSale",
        data: {
            id: currentGood.data.id,
        }
    }).then(res => {
        elNote("成功申请上架,等待管理员审核吧")
    }).catch(() => {
        elNote("发生错误", "error", "Error!")
    })
}
const takeMark = () => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    console.log(currentGood.data)
    axios.post('http://127.0.0.1:5000/getStr', {
        imgUrl: currentGood.data.picUrl,
        imgName: "text.png",
    }).then((res) => {
        loadingInstance.close()
        ElMessage({
            showClose: true,
            message: '成功提取:' + res.data,
            type: 'success',
        })
    }).catch(() => {
        loadingInstance.close()
        elNote("发生错误,请联系管理员", "error", "Error!")
    })
}
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 400px;
}

.background {
    margin-top: 40px;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .5) 500%);

}

.column {
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-top: 30px;
}

.maxlength {
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 100px;
    max-width: 60vw;
}

.title {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #181818;
    line-height: 45px;
    margin-bottom: 12px;
}

img {
    height: 294px;
}

.border {
    cursor: pointer;
    margin: 10px;
    margin-top: 30px;
    height: fit-content;
    border: 6px solid white;
    box-shadow: 1px 1px 5px #333333;
}

.price {
    margin-bottom: 12px;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2cbab2;
    line-height: 40px;
}

.brief {
    margin-bottom: 26px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #253554;
    line-height: 20px;
    letter-spacing: 1px;
}

.button {
    width: 200px;
}

.button:disabled:hover~.tip {
    display: block;
}

.detail {
    width: 100vw;
    height: 61px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    line-height: 20px;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .2);
    border-radius: 10px;
}


.timelineBox {
    width: 100%;
    display: flex;
    margin: 30px;
    justify-content: flex-start;
}

.text {
    font-size: 3em;
}
</style>