<template>
    <el-form class="form" :model="form" label-width="20%">
        <el-form-item label="userAccount">
            <span>{{ form.userAccount }}</span>
        </el-form-item>
        <el-form-item label="realName">
            <span>{{ form.realName }}</span>
        </el-form-item>
        <el-form-item label="mobile">
            <span>{{ form.mobile }}</span>
        </el-form-item>
        <el-form-item label="idCard">
            <span>{{ form.idCard }}</span>
        </el-form-item>
        <el-form-item label="age">
            <span>{{ form.age }}</span>
        </el-form-item>
        <el-form-item label="address">
            <span>{{ form.address }}</span>
        </el-form-item>
        <el-form-item label="性别">
            <span>{{ form.userSex }}</span>
        </el-form-item>
        <el-form-item class="center">
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script lang="ts" setup>
import { reactive } from 'vue'
import usePinia from '../pinia';
import { router } from '../router';
const useP = usePinia()
const userInfo = useP.userInfo
const form: user = reactive({
    id: userInfo.id,
    userAccount: userInfo.userAccount,
    userSex: userInfo.userSex,
    realName: userInfo.realName,
    mobile: userInfo.mobile,
    idCard: userInfo.idCard,
    age: userInfo.age,
    address: userInfo.address,
})

const onSubmit = () => {
    router.push({
        path: "/userPage/editinfo"
    })
}
</script>
  
<style>
.form {
    padding: 10px;
    border: 1px solid black;
    min-width: 60%;
    box-shadow: 10px 5px 5px gray;
    border-radius: 10px;
}

.center {
    margin-left: 70px;
}
</style>
    