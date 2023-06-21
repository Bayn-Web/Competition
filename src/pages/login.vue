<template>
    <div id="logincontainer">
        <div id="upper" class="login">
            <div class="box">
                <p class="table">Login</p>
                <br>
                <component :is='Binput' v-model:inpvalue="uname">用户名</component>
                <component :is='Binput' v-model:inpvalue="password" :isPassword="true">密码
                </component>
                <div class="row">
                    <component id="varifyInp" :is='Binput' @keyup.enter.native="login" :inppattern="'[0-9a-zA-Z]{0,4}'"
                        v-model:inpvalue="verify">验证码</component>
                    <img id="varifyImg" alt="验证码" :src="imageUrl">
                </div>
                <br>
                <a class="go" @click="login">GO</a>
            </div>
        </div>
    </div>
    <Particles id="tsparticles" :options="ParticlesOptions" />
    <component :is="toast" :showtime="time">{{ toastContent }}</component>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import axios from '../axios';
import { useRouter } from 'vue-router'
import usePinia from '../pinia'
import toast from './components/toast.vue';
import Binput from './components/binput.vue';
import { ParticlesOptions } from "../settings"
const time = ref(0)
let imageUrl = ref("")
let code = ""
let pinia = usePinia()
const toastContent = ref("")
onBeforeMount(() => {
    axios({
        method: 'post',
        url: '/user/sendMsg',
    }).then(res => {
        imageUrl.value = "data:image/png;base64," + res.data.map.img
        code = res.data.map.account
        console.log(res)
    }).catch((res) => {
        console.log(res)
    });
})
let router = useRouter()
let uname = ref("")
let password = ref("")
uname.value = localStorage.getItem("username") != null ? localStorage.getItem("username")! : ""
password.value = localStorage.getItem("password") != null ? localStorage.getItem("password")! : ""
let verify = ref("")
const login = () => {
    axios({
        method: 'post',
        url: '/user/login',
        data: {
            uuId: code,
            account: uname.value,
            password: password.value,
            code: verify.value
        }
    }).then(res => {
        if (res.data.msg) {
            toastContent.value = res.data.msg
            time.value = 3
            return
        }
        pinia.userInfo = res.data.data
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem("username", uname.value)
        localStorage.setItem("password", password.value)
        router.push({
            path: "/"
        })
    }).catch(r => {
        toastContent.value = "发生网络错误"
        time.value = 3
    })
    time.value = 0
}
</script>

<style scoped>
#varifyImg {
    width: 60%;
    height: 53px;
}

#varifyInp {
    width: 80%;
    position: relative;
    top: 10px
}

.row {
    margin: 0 30px;
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
}

#upper {
    z-index: 999;
}

#verify {
    width: 180px;
}

#particles-js {
    z-index: -1;
    position: absolute;
    top: 0;
    height: 100nh;
    width: 100vw;
}

#logincontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login {
    width: 550px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right bottom,
            rgba(255, 255, 255, .7),
            rgba(255, 255, 255, .5),
            rgba(255, 255, 255, .4));
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px #a29bfe;
    border-radius: 15px;
}

.table {
    font: 900 40px '';
    text-align: center;
    letter-spacing: 5px;
    color: #3d3d3d;
}

.box {
    width: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.box input {
    width: 400px;
    height: 100%;
    margin-bottom: 20px;
    outline: none;
    border: 0;
    padding: 10px;
    background-color: transparent;
    border-bottom: 3px solid rgb(150, 150, 240);
    font: 900 16px '';
}

.go {
    text-align: center;
    display: block;
    height: 50px;
    padding: 12px;
    font: 900 20px '';
    border-radius: 10px;
    color: #fff;
    letter-spacing: 3px;
    background-size: 200%;
    background-image: linear-gradient(to left, #fd79a8, #a29bf6);
    transition: background-position 2s;
}

.go:hover {
    background-position: 100% 0;
}

#verify:invalid {
    color: #ff0059;
    animation: 0.3s ease-in shake;
}

#verify {
    margin-left: 50px;
    height: 100%;
}


@keyframes shake {
    0% {
        margin-left: 60px;
        margin-right: 0px;
    }

    25% {
        margin-left: 50px;
        margin-right: 10px;
    }

    75% {
        margin-left: 60px;
        margin-right: 0px;
    }

    100% {
        margin-left: 50px;
        margin-right: 0px;
    }
}
</style>