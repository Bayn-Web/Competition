<template>
    <div class="border">
        <div class="col-rankingg">
            <div class="image"><img :src="item.picUrl" alt="Image"></div>
        </div>
        <div class="col-rankingg">{{ item.name }}</div>
        <div class="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                fill="none">
            </svg>{{ item.brief }} </div>
        <div class="col-rankingg">{{ item.price }}</div>
        <div class="col-rankingg">{{ item.ownerId }}</div>
        <el-tooltip content="点击复制" placement="top">
            <div class="col-rankingg"><span @click="copy()" class="textoverflow">{{ item.blockchainId }}</span></div>
        </el-tooltip>
        <div class="col-rankingg">{{ item.status }}</div>
        <div class="col-rankingg" style="cursor: pointer;">
            <el-popover :visible="visible" placement="bottom" :width="150">
                <div class="row">
                    <el-button @click="goto(`/market/editDetails/${1}`, router)">编辑</el-button>
                    <el-button type="danger" @click="downGood">下架</el-button>
                </div>
                <template #reference>
                    <el-icon @click=" visible = !visible">
                        <More />
                    </el-icon>
                </template>
            </el-popover>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    ref
} from 'vue';
import { goto } from '../../tools';
import { useRouter } from 'vue-router';
import { elNote } from "../../tools"
const router = useRouter();
const visible = ref(false)
const downGood = () => { }
const copy = async () => {
    await navigator.clipboard.writeText(item.blockchainId)
    elNote("复制成功")
}
interface infoT {
    goods: {
        picUrl: string,
        addTime: string,
        blockchainId: string,
        brief: string,
        buyChain: string,
        categoryId: number,
        deleted: 0 | 1,
        detail: string,
        empowerPrice: number,
        goodsSn: string,
        id: number,
        imgName: string,
        ipfsHash: string,
        isHot: 0 | 1,
        isNew: 0 | 1,
        isOnSale: 1 | 0,
        name: string,
        ownerId: number,
        price: number,
        sortOrder: number,
        status: number,
        transactionHash: string,
        unit: string,
        updateTime: string
    },
}
const info = defineProps<{ info: infoT }>()
const item = reactive(info.info.goods)
</script>

<style scoped>
.border {
    border-radius: 20px;
    border: 1px solid var(--nav-inner-li-color);
    margin: 20px;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.col-rankingg {
    width: 7vw;
    display: flex;
    margin: 10px 10px;
    justify-content: center;
}

.textoverflow {
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
}

.col-rankingg:first-child {
    margin-left: 35px;
}

.col-rankingg:last-child {
    margin-right: 15px;
}

img {
    object-fit: fill;
    border-radius: 20px;
    height: 70px;
    width: 70px;
}

.row {
    display: flex;
    flex-direction: row;
}
</style>