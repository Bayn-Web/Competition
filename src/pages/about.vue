<template>
    <div class="dark">
        <section id="hero" class="hero">
            <div class="animation-elements">
                <div class="shape item-w-16"></div>
                <div class="shape item-w-22"></div>
                <div class="shape item-w-32"></div>
                <div class="shape item-w-48"></div>
                <div class="shape style2 item-w-51" data-depth="0.4"></div>
                <div class="shape style2 item-w-51 position2" data-depth="0.4"></div>
                <div class="shape item-w-68"></div>
            </div>
            <div class="container pos-relative">
                <div class="hero__main">
                    <h2 class="text-5xl">
                        Discover, and collect <br />
                        extraordinary <br />
                        <span class="monster-word">NFTs</span>
                    </h2>
                    <p id="typeit" class="text-sm font-light"></p>
                    <div class="buttons-container">
                        <button @click="goto('market', router)" class="btn btn--primary shadow-1 text-sm font-semi-bold">
                            <i class="fa-solid fa-rocket"></i>
                            <span>Explore</span>
                        </button>
                        <button @click="goto('/userPage/upLoad', router)"
                            class="btn btn--primary shadow-1 text-sm font-semi-bold">
                            <i class="fa-brands fa-unity"></i>
                            <span>Create</span>
                        </button>
                    </div>
                </div>
                <div class="hero__pic">
                    <img class="hero__character" src="./images/hero/imgslider2.png" data-depth="0.2" />
                    <img class="hero__img img-rendering" src="./images/hero/hero-img.svg" data-depth="0.4" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import axios from '../axios';
import { reactive, onBeforeMount, onMounted } from 'vue'
//@ts-ignore
import Parallax from "parallax-js"
import { useRouter } from 'vue-router';
import { goto } from "../tools"
const router = useRouter();
// const data = reactive<{ list: any[] }>({
//     list: []
// })
onBeforeMount(() => {
    // axios({
    //     method: "post",
    //     url: "/goods/getAllHotAdmin",
    //     data: {
    //         pageNum: 1,
    //         pageSize: 10,
    //         key: ""
    //     }
    // }).then(res => {
    //     data.list = data.list.concat(res.data.data.list)
    // })
})
onMounted(() => {
    new Parallax(document.getElementsByClassName("hero__pic")[0], { relativeInput: true })
    const headerEl = document.querySelector(".header")!;
    window.addEventListener("scroll", function () {
        let yAxis = window.scrollY;
        if (yAxis >= 70) {
            headerEl.classList.add("sticky-nav");
        } else {
            headerEl.classList.remove("sticky-nav");
        }
    });

})
</script>

<style scoped></style>