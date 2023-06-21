<template>
    <div class="border">
        <div class="col-rankingg">{{ item.name }}</div>
        <div style="margin-left: -30px; margin-right: 30px;" class="col-rankingg">{{ item.total }} </div>
        <div style="margin-right: -30px;" class="col-rankingg">{{ item.orderId }}</div>
        <div class="col-rankingg">{{ item.goodsID }}</div>
        <div style="width: 150px;" class="col-rankingg">{{ item.createTime }}</div>
        <div style="width:150px" class="col-rankingg">
            <a @click="toOut(decodeURI(item.url))" class="btn btn--primary shadow-1 text-sm font-semi-bold">购买</a>
        </div>
        <div class="col-rankingg" style="cursor: pointer;">
            <el-popover :visible="visible" placement="bottom" :width="150">
                <div class="row">
                    <el-button style="width: 100%;" type="danger" @click="downGood">取消订单</el-button>
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
console.log(router.currentRoute.value)
const visible = ref(false)
const downGood = () => { }
interface infoT {
    total: number,
    orderId: string,
    name: string,
    goodsID: string,
    createTime: string,
    url: string
}
const toOut = (path: string) => {
    window.open(path, "_block")
}
const info = defineProps<{ info: infoT }>()
const item = reactive(info.info)
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
    width: 8vw;
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

.brief {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>