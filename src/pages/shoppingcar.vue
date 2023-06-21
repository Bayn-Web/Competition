
<template>
    <div class="border" v-for="item in data.list">
        <component :is="orderLine" :info="item"></component>
        <!-- <el-table :data="data.list" style="width: 100%">
            <el-table-column prop="name" label="订单名" width="500" />
            <el-table-column prop="total" label="总金额" width="180" />
            <el-table-column prop="createTime" label="订单产生时间" width="180" />
            <el-table-column label="购买" width="180">
                <template v-slot="scop">
                    <el-button
                        @click="toOut(decodeURI(`http://localhost:9090/alipay/pay?traceNo=${scop.row.orderId}&totalAmount=${scop.row.total}&subject=${scop.row.name}`))">
                        <el-icon>
                            <ShoppingCart />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table> -->
    </div>
    <el-result v-if="data.list.length == 0" icon="success" title="购物车清空了" sub-title="购物车已经没有物品，前往市场挑选艺术品">
        <template #extra>
            <el-button @click="goto('/market', router)" type="primary">逛一逛</el-button>
        </template>
    </el-result>
</template>
<script lang="ts" setup>
import {
    reactive,
    onMounted,
    ref
} from 'vue';
import axios from '../axios';
import usePinia from '../pinia';
import orderLine from "./components/orderLine.vue"
import { goto } from '../tools';
import { useRouter } from 'vue-router';
const router = useRouter();
const data = reactive<{ list: any[] }>({
    list: []
})
const pinia = usePinia()
onMounted(() => {
    axios({
        method: "post",
        url: "/buy/waitPay",
        data: {
            buyId: pinia.userInfo.id
        }
    }).then(res => {
        console.log(res)
        data.list = res.data.data
        data.list.forEach((value, index, self) => {
            self[index].url = `http://47.97.32.206:9090/alipay/pay?traceNo=${value.orderId}&totalAmount=${value.total}&subject=${value.name}`
        })
    })
})
</script>

<style scoped></style>