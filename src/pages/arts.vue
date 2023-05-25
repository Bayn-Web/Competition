<template>
    <div class="grid-container" id="scroll">
        <template v-for="item in data.list">
            <component class="grid-item" :is="card" :expand="{ ...item, isMy: true }"></component>
        </template>
        <img src="../static/add.png" class="add" @click="to('upLoad')">
    </div>
</template>

<script lang="ts" setup>
import axios from '../axios';
import usePinia from '../pinia';
import card from "./components/card.vue"
import {
    reactive,
    ref
} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const to = (path: string) => {
    router.push({
        path
    })
}
const userInfo = usePinia()
const data = reactive<{ list: any[] }>({
    list: []
})
axios({
    method: "POST",
    url: "/goods/getGoodsByUserId",
    data: {
        userId: userInfo.userInfo.id
    }
}).then(res => {
    console.log(res)
    data.list = res.data.data
})
</script>

<style scoped>
.grid-item {
    text-align: center;
    width: 20vw;
    cursor: pointer;
}

.grid-item:hover {
    transform: scale(1.3);
    z-index: 99;

}

.grid-container {
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-left: 15px;
    margin-bottom: 50px;
}

.add {
    width: 20vw;
    height: 300px;
    object-fit: cover;
    cursor: pointer;
    filter: grayscale(100%);
    transition: filter 1s;
}

.add:hover {
    transition: filter 1s;
    filter: grayscale(0%);
}
</style>