<template>
    <img src="./images/thumb-pagetitle.jpg" id="backgorund">
    <div class="row">
        <div id="headPlc" ref="clickArea">
            <div id="avater">
                <img id="headPic" src="./images/hero/hero-img.svg" alt="headPicture">
            </div>
            <span id="name">{{ pinia.userInfo.userAccount }}</span>
            <label style="position: relative;" @click="clicked($event, '/userPage/arts')">
                <div class="but">收藏</div>
                <div ref="shader1" class="shader"></div>
            </label>
            <label style="position: relative;" @click="clicked($event, '/userPage/favorite')">
                <div class="but">喜欢</div>
                <div ref="shader2" class="shader"></div>
            </label>
            <label style="position: relative;" @click="clicked($event, '/userPage/shoppingcar')">
                <div class="but">购物车</div>
                <div ref="shader3" class="shader"></div>
            </label>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    ref, onMounted
} from 'vue';
import usepinia from '../pinia';
import { useRouter } from 'vue-router';
import { goto } from '../tools';
const router = useRouter()
const pinia = usepinia();
const shader1 = ref<null | HTMLDivElement>(null);
const shader2 = ref<null | HTMLDivElement>(null);
const shader3 = ref<null | HTMLDivElement>(null);
const temp = ref<null | HTMLDivElement>(null);
const clickArea = ref<null | HTMLDivElement>(null)
let deg = ref(0);
setInterval(() => {
    if (deg.value < 360) {
        deg.value += 1;
        if (shader1.value) shader1.value!.style.background = `conic-gradient(from ${deg.value}deg, #7460ba, #fff 5deg 340deg, #7857ed)`;
        if (shader2.value) shader2.value!.style.background = `conic-gradient(from ${deg.value}deg, #7460ba, #fff 5deg 340deg, #7857ed)`;
        if (shader3.value) shader3.value!.style.background = `conic-gradient(from ${deg.value}deg, #7460ba, #fff 5deg 340deg, #7857ed)`;
    }
    else deg.value = 0;
}, 10)
const clicked = (event: Event, path: string) => {
    goto(path, router);
    temp.value?.classList.remove("clicked");
    (event.target as HTMLDivElement)!.classList.add("clicked")
    temp.value = (event.target as HTMLDivElement);
}
onMounted(() => {
})
</script>

<style scoped>
#backgorund {
    display: block;
    z-index: -1;
    width: 100vw;
    height: 360px;
}

#headPlc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: var(--bg-color-2);
    border: 1px solid var(--indigo-6);
    border-radius: 18px;
    padding: 24px;
    margin-top: -131px;
    margin-left: 31px;
    z-index: 99;
    max-width: 20vw;
    height: fit-content;
}

#name {
    font-family: "DM Sans";
    font-weight: 700;
    font-size: 24px;
    text-transform: capitalize;
    color: var(--white);
    margin-bottom: 8px;
}

#headPic {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border-radius: 50%;
    border: 1.5px solid var(--indigo-6);
    box-shadow: 1px 1px var(--indigo-6);
}

#avater {
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 16px;
    margin-bottom: 16px;
}

.but {
    display: flex;
    justify-content: center;
    position: relative;
    width: 180px;
    height: 30px;
    font-weight: bolder;
    background-color: var(--indigo-3);
    color: white;
    border-radius: 1em;
    cursor: pointer;
    line-height: 1.8em;
}

.but:hover {
    background-color: white;
    color: black;
}

.clicked {
    background-color: var(--nav-inner-li-color);
    color: black;
}

.shader {
    position: absolute;
    top: -2px;
    left: -2px;
    height: 34px;
    width: 184px;
    border-radius: 1em;
    z-index: -1;
}

label {
    margin: 20px;
}

.row {
    display: flex;
}

.view {
    width: 100%;
    margin: 20px;
}
</style>
