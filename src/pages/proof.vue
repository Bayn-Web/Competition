<template>
    <div>
        <div class="login">
        </div>
        <!--登录中间块-->
        <div class="login-mid">
            <div class="login-mid-top">
                <div class="shadow-top-left"></div>
                <div class="shadow-top-right"></div>
            </div>
            <div class="login-mid-mid">
                <!--捕获人脸区域-->
                <div class="videoCamera-canvasCamera">
                    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
                    <canvas style="display: none" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                    <!--人脸特效区域-->
                    <div v-if="faceImgState" class="face-special-effects-2"></div>
                    <div v-else class="face-special-effects"></div>
                </div>
                <!--按钮区域-->
                <div class="face-btn">
                    <button @click="faceVef()">{{ faceImgState ? '正在识别中...' : '开始识别' }}</button>
                </div>
                <!--消息区域-->
                <div class="msg">
                    <div class="server-msg">{{ msg }}</div>
                    <div class="welcome">Welcome to face recognition</div>
                </div>
            </div>
            <div class="login-mid-bot">
                <div class="shadow-bot-left"></div>
                <div class="shadow-bot-right"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCamera, draw } from '../camera'
import { reactive, onMounted } from "vue"
import axios from '../axios';
import usePinia from '../pinia';
import { goto } from '../tools';
import { useRouter } from 'vue-router';
const router = useRouter();
const pinia = usePinia();
let { videoWidth, videoHeight, msg, faceImgState, faceOption } = reactive({
    videoWidth: 200,
    videoHeight: 200,
    msg: "",
    faceImgState: false,
    faceOption: {}
})
onMounted(() => {
    faceOption = getCamera({
        videoWidth: 200,
        videoHeight: 200,
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        canvasId: 'canvasCamera',
        videoId: 'videoCamera'
    });
    setTimeout(() => {
        
    }, 3000);
})
const faceVef = () => {
    // 开始绘制图片
    let imageBase = draw(faceOption)
    if (faceImgState) {
        return
    }
    faceImgState = true
    if (imageBase === '' || imageBase === null || imageBase === undefined) {
        console.log("kong")
    } else {
        axios({
            method: "post",
            url: "/face/vef",
            data: {
                imageBase,
                type: "1",
                userId: pinia.userInfo.id
            }
        }).then(res => {
            faceImgState = false
            // 关闭摄像头
            //@ts-ignore
            faceOption.thisVideo.srcObject.getTracks()[0].stop();
            localStorage.setItem("face_token", res.data.token);
            localStorage.setItem("username", res.data.name);
            console.log(res.data)
            goto('/about', router)
        })
    }
}
</script>
<style>
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: url(./images/login/login-bg.png) no-repeat;
    background-size: cover;
    filter: blur(10px);

}

.login-mid {
    position: absolute;
    width: 45%;
    height: 65%;
    background-color: rgba(37, 76, 102, 0.5);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    cursor: pointer;
}

.login-mid-top,
.login-mid-bot {
    width: 100%;
    height: 10%;
}

.shadow-top-left {
    float: left;
    width: 50px;
    height: 100%;
    border-top: 2px solid #00ffff;
    border-left: 2px solid #00ffff;
    filter: blur(2px);
}

.shadow-top-right {
    float: right;
    width: 50px;
    height: 100%;
    border-top: 2px solid #00ffff;
    border-right: 2px solid #00ffff;
    filter: blur(2px);
}

.shadow-bot-left {
    float: left;
    width: 50px;
    height: 100%;
    border-bottom: 2px solid #00ffff;
    border-left: 2px solid #00ffff;
    filter: blur(2px);
}

.shadow-bot-right {
    float: right;
    width: 50px;
    height: 100%;
    border-bottom: 2px solid #00ffff;
    border-right: 2px solid #00ffff;
    filter: blur(2px);
}

.login-mid-mid {
    width: 100%;
    height: 80%;
}

.login-mid:hover .shadow-top-left,
.login-mid:hover .shadow-top-right,
.login-mid:hover .shadow-bot-left,
.login-mid:hover .shadow-bot-right {
    border-color: #fff;
    filter: blur(1px);
}

.videoCamera-canvasCamera {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
}

.face-special-effects,
.face-special-effects-2 {
    width: 300px;
    height: 300px;
    position: absolute;
    z-index: 99999999999 !important;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

.face-special-effects {
    background: url(./images/login/face.gif) no-repeat;
    background-size: 300px 300px;
}

.face-special-effects-2 {
    background: url(./images/login/face_detection.gif) no-repeat;
    background-size: 300px 300px;
}

.face-btn {
    width: 100%;
    height: 50px;
    z-index: 999999999999 !important;
    margin-top: 45px;
    text-align: center;
}

.face-btn button {
    background-color: #00ffff;
    border: none;
    outline: none;
    width: 200px;
    height: 40px;
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
}

.msg {
    width: 100%;
    height: 75px;
    color: #ffffff;
}

.server-msg {
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
}

.welcome {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-family: "Baskerville Old Face";
    color: white;
}
</style>