<template>
    <div class="topSafe">
        <div class="mt-4">
            <el-input @keyup.enter.native="search()" v-model="keywords" placeholder="关键词" class="input-with-select">
                <template #prepend>
                    <el-select v-model="searchWay" style="width: 125px">
                        <el-option @click="sortList('Time')" label="按时间顺序" value="1" />
                        <el-option @click="sortList('ID')" label="按ID顺序按" value="2" />
                        <el-option @click="sortList('Price')" label="价格顺序" value="3" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" @click="search()" />
                </template>
            </el-input>
        </div>
        <div class="grid-container" id="scroll">
            <KeepAlive>
                <template v-for="item of data.data" :key="item.id">
                    <card class="grid-item" :expand="item"></card>
                </template>
            </KeepAlive>
        </div>
    </div>
    <el-result v-if="showNoDataNote" icon="warn" title="到底了。。" sub-title="试着搜索其他关键字吧">
    </el-result>
    <a v-if="!showNoDataNote" @click="getAllGoods(pageNum++, keywords, true)"
        class="slide btn btn--primary shadow-1 text-sm font-semi-bold z-1">加载</a>
    <el-backtop :right="100" :bottom="100" />
</template>';'

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from '../axios';
import card from './components/card.vue'
import { ElLoading } from 'element-plus'
let data: { data: any[] } = reactive({ data: [] })
const options = {
    target: ".topSafe",
    fullscreen: false
}
onMounted(async () => {
    const LoadInstence = ElLoading.service(options)
    await getAllGoods(1, "")
    LoadInstence.close();
})
let showNoDataNote = ref(false)
enum sortOptions { "Time", "ID", 'Price' }
type sortOption = keyof typeof sortOptions;
const sortList = (sortWay: sortOption) => {
    if (sortWay == "Time") {
        data.data = data.data.sort((a: any, b: any) => {
            a = new Date(a.addTime)
            b = new Date(b.addTime)
            return a.getTime() < b.getTime() ? 1 : 0
        })
    }
    if (sortWay == "ID") {
        data.data.sort((a: any, b: any) => {
            return b.id - a.id
        })
        data.data = data.data.concat([])
    }
    if (sortWay == "Price") {
        data.data.sort((a: any, b: any) => {
            return a.price - b.price
        })
        data.data = data.data.concat([])
    }
}
const pageNum = ref(1)
const getAllGoods = async (pageNum: number, key: string, restart: boolean = false) => {
    console.log("getAll")
    if (showNoDataNote.value) {
        console.log("finish")
        return
    }
    if (localStorage.getItem("items") && !restart) {
        console.log("has")
        data.data = JSON.parse(localStorage.getItem("items")!)
        return
    }
    await axios({
        method: 'post',
        url: '/goods/getAllSaleGood',
        data: {
            pageNum,
            "pageSize": 20,
            key
        }
    }).then(res => {
        console.log(res.data)
        if (res.data.data.list.length < 20) {
            showNoDataNote.value = true
        } else {
            showNoDataNote.value = false
        }
        if (restart) {
            data.data = data.data.concat(res.data.data.list)
        } else {
            data.data = data.data.concat(res.data.data.list)
            localStorage.setItem("items", JSON.stringify(data.data))
        }
    }).catch((res) => {
        console.log(res)
    })
}
let searchWay = ref("排序方式")
let keywords = ref("")
const search = () => {
    getAllGoods(1, keywords.value, true)
}
</script>

<style scoped>
#dropdown {
    background-color: black;
    display: inline-block;
    height: 100px;
    width: 200px;
}

.mt-4 {
    padding: 10px;
}

.grid-container {
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-left: 3vw;
}

.grid-item {
    text-align: center;
    width: 20vw;
    cursor: pointer;
}

.grid-item:hover {
    transform: scale(1.3);

}

.input-with-select {
    width: 90vw;
    margin: 0 30px;
}

.slide {
    margin: 20px auto;
    width: fit-content;
}
</style>