<template>
    <div class="container">
        <nav>
            <div class="brand">
                <img src="../images/hero/hero-img.svg">
                <p>Good day,<span>{{ pinia.userInfo.userAccount }}</span>
                </p>
            </div>
            <hr class="line">
            <ul class="list">
                <li @click="inPageChange(0)" ref="li0" class="active">
                    <i>🏠</i>
                    <span>主页</span>
                </li>
                <li @click="inPageChange(1)" ref="li1">
                    <i>💰</i>
                    <span>账户</span>
                </li>
                <li @click="inPageChange(2)" ref="li2">
                    <i>🛒</i>
                    <span>购物车</span>
                </li>
                <li @click="inPageChange(3)" ref="li3">
                    <el-badge :value="messageNum" class="item">
                        <i>💬</i>
                    </el-badge>
                    <span>通知</span>
                </li>
                <li @click="inPageChange(4)" ref="li4">
                    <i>🎨</i>
                    <span>制作</span>
                </li>
                <hr class="line">
                <li @click="inPageChange(5)" ref="li5">
                    <i>🎈</i>
                    <span>登出</span>
                </li>
            </ul>
        </nav>
    </div>
    <el-drawer v-model="drawer" title="通知" :direction="'ltr'">
        <template v-for="item in alerts.list">
            <el-alert :title="item.title" :type="item.type" :description="item.content" show-icon />
            <br>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect, Ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../axios';
import { elNote } from '../../tools';
import usePinia from '../../pinia';
const drawer = ref(false)
const pinia = usePinia();
const router = useRouter();
const messageNum = ref(0)
const alerts = reactive<{ list: any[] }>({
    list: []
})
const li0 = ref<null | HTMLLIElement | Element>(null)
const li1 = ref<null | HTMLLIElement | Element>(null)
const li2 = ref<null | HTMLLIElement | Element>(null)
const li3 = ref<null | HTMLLIElement | Element>(null)
const li4 = ref<null | HTMLLIElement | Element>(null)
const li5 = ref<null | HTMLLIElement | Element>(null)
const lis: Ref<null | HTMLLIElement | Element>[] = [li0, li1, li2, li3, li4, li5]
let tepLi = ref<null | HTMLLIElement | Element>(null)
tepLi = li0
onMounted(() => {
    axios({
        method: "post",
        url: "/message/getMessageAllByUserId",
        data: {
            id: pinia.userInfo.id
        }
    }).then((res) => {
        messageNum.value = (res.data.data as Array<any>).length;
        alerts.list = res.data.data.unread
        alerts.list.forEach((value, index, self) => {
            if (value.type == 0) {
                self[index].type = "info"
                self[index].title = "消息"
            } else if (value.type == 1) {
                self[index].type = "success"
                self[index].title = "购买通知"
            } else if (value.type == 2) {
                self[index].type = "warning"
                self[index].title = "授权消息"
            } else {
                self[index].type = "error"
                self[index].title = "侵权警告"
            }
        })
        console.log(alerts.list[0])
        }).catch((res)=>{
            alerts.list = [{title:"你好",type:"error",content:"你好"},{title:"你好",type:"success",content:"你好"},{title:"你好",type:"info",content:"你好"},]
  
    })
    let delayTime = 3;
    let spans = document.querySelectorAll("li>span") as NodeListOf<HTMLSpanElement>;
    spans.forEach((e) => {
        e.style.animationDelay = `.${delayTime++}s`
    })
    watchEffect(() => {
        addClass(pinia.nowAt)
    })
})
const inPageChange = (id: number) => {
    pinia.nowAt = id
    addClass(id);
}
const addClass = (id: number) => {
    nextTick(() => {
        tepLi.value!.classList.remove("active")
        lis[id].value!.classList.add("active")
        tepLi = lis[id]
        const innerText = lis[id].value?.innerHTML! as string
        const conntent = innerText.match(/s;">(.*)<\/span>/)![1]
        switch (conntent) {
            case "主页":
                router.push({
                    path: "/about"
                })
                break;
            case "账户":
                router.push({
                    path: "/userPage/arts"
                })
                break;
            case "购物车":
                router.push({
                    path: "/userPage/shoppingcar"
                })
                break;
            case "通知":
                drawer.value = true
                break;
            case "制作":
                router.push({
                    path: "/userPage/upLoad"
                })
                break;
            case "登出":
                axios({
                    method: "post",
                    url: "/user/exit",
                    data: {
                        token: localStorage.getItem("token")
                    },
                }).then(() => {
                    elNote("已安全退出")
                    localStorage.removeItem("token")
                }).catch(() => {
                    elNote("服务端未结束服务，请尝试重退", "info", "")
                })
                break;

            default:
                break;
        }
    })
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}

.container {
    width: fit-content;
    position: fixed;
    top: 60px;
    right: -7px;
    display: flex;
    align-items: start;
    justify-content: end;
    z-index: 9;
}

.container nav {
    overflow-x: hidden;
    width: 80px;
    height: min-content;
    padding: 16px;
    padding-bottom: 8px;
    border-radius: 12px;
    backdrop-filter: blur(18px);
    background: rgba(230, 235, 240, .2);
    border: 2px solid rgba(230, 235, 240, .7);
    box-shadow: 0 0 30px rgba(0, 0, 0, .05);
    transition: .6s cubic-bezier(.8, .5, .5, .8);
}

.container nav:hover {
    width: 200px;
    background: rgba(230, 235, 240, .7);
}

.container nav:hover .brand img {
    width: 65px;
}

.brand {
    width: 100%;
    display: flex;
    align-items: center;
}

.brand img {
    width: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
}

.brand p {
    color: #505257;
    font-weight: 500;
    font-style: italic;
    text-align: left;
    line-height: 22px;
    margin-left: 4px
}

.brand p span {
    color: #3c3e43;
    display: block;
    white-space: nowrap;
    font-size: 12px;
    font-style: normal;
}

nav .line {
    width: 100%;
    height: 2px;
    margin: 10px 0;
    border-radius: 30%;
    background: #87a3af;
}

nav .list {
    width: 100%;
}

nav .list li {
    display: flex;
    margin: 10px 0;
    padding: 5px 9px;
    cursor: pointer;
    border-radius: 8px;
    transition: .4s ease-in-out;
    height: 40px;
}

nav .list li:hover {
    background: rgba(230, 235, 240, .4);
}

nav .list li.active {
    background: #3681f6;
}

nav .list li.active span {
    color: #fff;
}

nav .list li.active i {
    background: none;
    -webkit-text-fill-color: unset;
    color: #e6ebf0;
}

nav .list i {
    font-size: 20px;
    background: linear-gradient(-135deg,
            #3c3e43,
            #838487);
    font-style: normal;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

nav .list span {
    color: #505257;
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 0 12px;
}

nav .brand p,
nav .list span {
    opacity: 0;
    pointer-events: none;
    transform: translateX(20px);
}

@keyframes fadeIn {
    to {
        opacity: 1;
        pointer-events: unset;
        transform: translateX(0);
    }
}

nav:hover .brand p {
    animation: fadeIn .4s ease-out forwards;
    animation-delay: .4s;
}

nav:hover .list span {
    animation: fadeIn .3s ease-out forwards;
}
</style>