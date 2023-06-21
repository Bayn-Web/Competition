<template>
    <div class="row">
        <span @click="isActive($event)" class="rowItem">预览<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">名称<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">描述<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">价格<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">拥有者<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">链码<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">状态<el-icon>
                <ArrowDown />
            </el-icon></span>
        <span @click="isActive($event)" class="rowItem">操作<el-icon>
                <ArrowDown />
            </el-icon></span>
    </div>
    <template v-for="item in data.list">
        <lineItem :info="item"></lineItem>
    </template>
</template>

<script lang="ts" setup>
import axios from '../axios';
import usePinia from '../pinia';
import lineItem from './components/line.vue';
import {
    reactive,
    ref
} from 'vue';
const pinia = usePinia()
let oldNode: null | HTMLSpanElement = null
const isActive = (event: MouseEvent) => {
    if (oldNode != null) {
        (oldNode as HTMLSpanElement).classList.remove("active");
    }
    (event.currentTarget as HTMLSpanElement).classList.add("active");
    oldNode = (event.currentTarget as HTMLSpanElement)
}
const data = reactive<{ list: any[] }>({
    list: []
})
axios({
    method: "POST",
    url: "/assist/selectAssistByUserId",
    data: {
        id: pinia.userInfo.id
    }
}).then(res => {
    console.log(res.data)
    data.list = res.data
})
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 30px 0 45px;
}

.rowItem {
    cursor: pointer;
}

.active {
    color: lightskyblue;
}
</style>