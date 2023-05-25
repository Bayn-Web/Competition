<template>
    <div class="background">
        <div class="row">
            <div class="border" @click="takeMark">
                <el-tooltip class="box-item" effect="dark" content="点击提取图片交易链码" placement="top">
                    <img :src="currentGood.data.picUrl">
                </el-tooltip>
            </div>
            <div class="column">
                <div class="title">{{ currentGood.data.name }} <span @click="dialogVisible = true" class="warn">⚠</span>
                </div>
                <div class="price">￥{{ currentGood.data.price }}</div>
                <div class="brief maxlength">{{ currentGood.data.brief }}</div>
                <div class="brief">创建时间{{ currentGood.data.addTime }}</div>
                <el-button-group v-if="currentGood.data.ownerId != pinia.userInfo.id">
                    <el-button class="button" type="success" @click="buy" plain>
                        <el-icon>
                            <Coin />
                        </el-icon>
                        购买
                    </el-button>
                    <el-button class="button" type="success" @click="to('/userPage/shoppingcar')" plain>
                        <el-icon>
                            <ShoppingTrolley />
                        </el-icon>
                        购物车
                    </el-button>
                </el-button-group>
                <el-button v-else disabled="true">这件商品已经被您拥有</el-button>
            </div>
        </div>
        <comment :comments="comments.list"></comment>
    </div>
    <el-dialog v-model="dialogVisible" title="举报！" width="30%" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="举报内容" label-width="'140px'">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="证据" :label-width="'100px'">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="截图" value="pic" />
                    <el-option label="视频" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.region != ''" label="上传" label-width="'140px'">
                <input type="file" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import comment from './components/comment.vue';
import {
    reactive,
    ref,
    onBeforeMount
} from 'vue';
import axios from '../axios';
import { ElMessageBox, ElMessage, ElLoading } from "element-plus"
import { useRouter } from 'vue-router';
import usePinia from '../pinia';
import { elNote } from '../tools';
const form = reactive({
    name: '',
    region: '',
})
const router = useRouter()
const to = function (path: string) {
    router.push({ path })
}
const dialogVisible = ref(false)
const currentGood = reactive<{ data: any }>({
    data: {}
})
const comments = reactive<{ list: any[] }>({
    list: []
})
onBeforeMount(async () => {
    axios({
        method: "post",
        url: "/goods/selectGoodById",
        data: {
            id: router.currentRoute.value.params.id
        }
    }).then((res) => {
        currentGood.data = res.data
    })
    await axios({
        method: "get",
        url: "/comment/getCommentByGoodsSn/" + router.currentRoute.value.params.id
    }).then((res) => {
        console.log(res.data)
        res.data.forEach((element: any, index: number) => {
            comments.list[index] = {}
            comments.list[index]['content'] = element.content
            comments.list[index].id = element.id
            comments.list[index].uid = element.id
            comments.list[index].likes = 4
            comments.list[index].createTime = element.createTime
            comments.list[index].parentId = element.parentId
            comments.list[index].user = {}
            comments.list[index].reply = {}
            comments.list[index].user.username = element.userBaseVo.userName
            comments.list[index].user.homeLink = '/1'
            comments.list[index].address = "fake address"
            comments.list[index].user.avatar = element.userBaseVo.headPic ?? "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100"
            if (element.childrenList) {
                comments.list[index].reply = {
                    total: element.childrenList.length,
                    list: []
                }
                element.childrenList.forEach((value: any, ind: number) => {
                    comments.list[index].reply.list[ind] = {}
                    comments.list[index].reply.list[ind]['content'] = value.content
                    comments.list[index].reply.list[ind].id = value.id
                    comments.list[index].reply.list[ind].uid = value.id
                    comments.list[index].reply.list[ind].likes = 4
                    comments.list[index].reply.list[ind].createTime = value.createTime
                    comments.list[index].reply.list[ind].parentId = value.parentId
                    comments.list[index].reply.list[ind].user = {}
                    comments.list[index].reply.list[ind].reply = {}
                    comments.list[index].reply.list[ind].user.username = value.userBaseVo.userName
                    comments.list[index].reply.list[ind].user.homeLink = '/1'
                    comments.list[index].reply.list[ind].address = "fake address"
                    comments.list[index].reply.list[ind].user.avatar = comments.list[index].reply.list[ind].user.avatar ?? "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100"
                })
            }
        });
        console.log(comments.list)
    })
})
const pinia = usePinia()
const buy = () => {
    axios({
        method: "post",
        url: "/buy/buyGoods",
        data: {
            goodsId: currentGood.data.id,
            buyId: pinia.userInfo.id,
            price: currentGood.data.price
        }
    }).then(res => {
        elNote("成功加入购物车")
    }).catch(res => {
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
        navigator.clipboard.writeText(res.data).then(() => {
            ElMessage({
                showClose: true,
                message: '成功提取并复制到剪切板: ' + res.data,
                type: 'success',
            })
        })
    }).catch(() => {
        loadingInstance.close()
        // ElMessage({
        //     showClose: true,
        //     message: '成功提取并复制到剪切板: ' + "34586d4e0c50f0e066a046663dc4cca368f41b2150bf88677dd37638e930782d",
        //     type: 'success',
        // })
        elNote("发生错误,请联系管理员", "error", "Error!")
    })
}
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('是否放弃投诉？', '确认操作', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(() => {
        done()
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
    line-height: 45px;
    margin-bottom: 12px;
}

img {
    max-height: 294px;
    min-height: 294px;
    max-width: 1000px;
    min-width: 294px;
}

.border {
    cursor: pointer;
    margin: 10px;
    margin-top: 30px;
    height: fit-content;
    border: 6px solid white;
    box-shadow: 1px 1px 5px #333333;
}

.warn {
    margin: 30px;
    cursor: pointer;
    color: red;
    font-size: smaller;
    opacity: 40%;
    transition: all 1s;
}

.warn:hover {
    cursor: pointer;
    color: red;
    font-size: smaller;
    opacity: 100%;
    transition: all 0.4s;
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
    width: 100px;
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