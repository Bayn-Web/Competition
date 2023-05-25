<template>
    <div class="conter" v-if="isShow" @click="isShow = false">
        <div class="box">
            <span class="font">
                <slot></slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    ref,
    watchEffect,
} from 'vue';
let show = defineProps({
    showtime: Number
})
const isShow = ref(false)
watchEffect(() => {
    isShow.value = true
    console.log(show.showtime)
    setTimeout(() => {
        isShow.value = false
    }, show.showtime! * 1000);
})
</script>

<style scoped>
.conter {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(34, 25, 52, 0.5);
    z-index: 9999;
}

.box {
    background-color: rgba(34, 25, 52, 0.5);
    height: fit-content;
    width: fit-content;
    padding: 10px;
    border-radius: 8%;
}

.font {
    color: beige;
}
</style>