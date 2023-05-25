<template>
    <header class="header">
        <div class="container pos-relative z-9">
            <a><img class="logo img-rendering" src="./images/header/logo_dark.png" alt="logo" /></a>
            <input type="checkbox" id="menu-bar" />
            <label class="icon-container menu-bar__label z-9 flex-center text-base font-semi-bold pointer"
                for="menu-bar"><svg style="transform: scale(0.6)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"></path>
                </svg></label>
            <nav class="nav noselect">
                <ul class="text-base font-semi-bold">
                    <li>
                        <router-link @click="pinia.nowAt = 0" to="/about">主页</router-link>
                    </li>
                    <li>
                        <a>探索<i class="fa-solid fa-angle-down"> </i></a>
                        <ul>
                            <li>
                                <router-link @click="pinia.nowAt = 0" to="/market">艺术藏品</router-link>
                            </li>
                            <li>
                                <router-link @click="pinia.nowAt = 0" to="/market/dailyBest">每日最佳</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>活动 <i class="fa-solid fa-angle-down"> </i></a>
                        <ul>
                            <li><a @click="pinia.nowAt = 0">热点</a></li>
                            <li><a @click="pinia.nowAt = 0">事件</a></li>
                        </ul>
                    </li>
                    <li>
                        <a>社区 <i class="fa-solid fa-angle-down"></i></a>
                        <ul>
                            <li><a @click="pinia.nowAt = 0" target="_blank" href="https://github.com/Bayn-Web">GitHub</a>
                            </li>
                            <li><a @click="pinia.nowAt = 0">其他信息</a></li>
                        </ul>
                    </li>
                    <li>
                        <a>相关 <i class="fa-solid fa-angle-down"></i></a>
                        <ul>
                            <li><a @click="pinia.nowAt = 0">验证</a></li>
                            <li><a @click="pinia.nowAt = 0">Profile</a></li>
                            <li><router-link to="/login" @click="pinia.nowAt = 0">Login</router-link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="header__functionalities pos-relative">
                <div class="functionalities__search pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 17.5L13.875 13.875" stroke="white" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <button class="btn btn--primary shadow-1 text-sm font-semi-bold z-1">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.6109 2.57143H2.1875C1.94578 2.57143 1.75 2.37964 1.75 2.14286C1.75 1.90607 1.94578 1.71429 2.1875 1.71429H12.6875C12.9292 1.71429 13.125 1.5225 13.125 1.28571C13.125 0.575625 12.5374 0 11.8125 0H1.75C0.783399 0 0 0.767411 0 1.71429V10.2857C0 11.2326 0.783399 12 1.75 12H12.6109C13.3771 12 14 11.4233 14 10.7143V3.85714C14 3.14812 13.3771 2.57143 12.6109 2.57143ZM11.375 8.14286C10.8918 8.14286 10.5 7.75902 10.5 7.28571C10.5 6.81241 10.8918 6.42857 11.375 6.42857C11.8582 6.42857 12.25 6.81241 12.25 7.28571C12.25 7.75902 11.8582 8.14286 11.375 8.14286Z"
                            fill="white" />
                    </svg>
                    <span>Wallet connect</span>
                </button>
                <div class="header__theme-switcher pos-relative z-1">
                    <div @click="lightMode" class="theme-light icon-container pointer flex-center">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                            viewBox="0 0 24 24" width="24px">
                            <rect fill="none" height="24" width="24" />
                            <path
                                d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                        </svg>
                    </div>
                    <div @click="darkMode" class="theme-dark icon-container pointer flex-center noselect">
                        <img src="./images/header/moon-2.png" alt="dark-mode icon" />
                    </div>
                </div>
                <svg class="blur-pattern-1 pos-absolute" width="258" height="230" viewBox="0 0 258 230" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_45_2157)">
                        <ellipse cx="129" cy="115" rx="36" ry="22" fill="#5142FB" />
                    </g>
                    <defs>
                        <filter id="filter0_f_45_2157" x="0" y="0" width="258" height="230" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="46.5" result="effect1_foregroundBlur_45_2157" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    </header>
    <router-view></router-view>
    <sideMenu></sideMenu>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import sideMenu from "./components/sideMenu.vue"
import usePinia from '../pinia';
const pinia = usePinia()
const setID = (n: number) => {
    pinia.nowAt = n
}
const darkMode = () => {
    document.getElementsByTagName("body")[0].classList.remove("light")
    document.getElementsByTagName("body")[0].classList.add("dark")
}
const lightMode = () => {
    document.getElementsByTagName("body")[0].classList.add("light")
    document.getElementsByTagName("body")[0].classList.remove("dark")
}
onMounted(() => {
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

<style scoped>
.logo {
    width: 100px;
    margin-left: -30px;
}
</style>