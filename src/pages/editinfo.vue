<template>
  <el-form class="form" :model="form" label-width="20%">
    <el-form-item label="userAccount">
      <el-input v-model="form.userAccount" />
    </el-form-item>
    <el-form-item label="realName">
      <el-input v-model="form.realName" />
    </el-form-item>
    <el-form-item label="mobile">
      <el-input v-model="form.mobile" />
    </el-form-item>
    <el-form-item label="idCard">
      <el-input v-model="form.idCard" />
    </el-form-item>
    <el-form-item label="age">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="address">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.userSex">
        <el-radio label="男" />
        <el-radio label="女" />
      </el-radio-group>
    </el-form-item>
    <el-form-item class="center">
      <el-button type="primary" @click="open">修改</el-button>
      <el-button @click="router.push({ path: '/userPage/info' })">取消</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import axios from '../axios';
import { reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import usePinia from '../pinia';
import { ElMessageBox, ElMessage } from "element-plus"
const router = useRouter()
const useP = usePinia()
const userInfo = useP.userInfo
onMounted(() => {
  document.getElementById("info")?.classList.add("active");
})
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

const props: (keyof user)[] = ["id", "userAccount", "userSex", "realName", "mobile", "idCard", "age", "address"]

const open = () => {
  ElMessageBox.confirm('是否确认修改', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }).then(() => {
    onSubmit()
  })
}

const onSubmit = () => {
  axios({
    method: "POST",
    url: "/user/update",
    data: {
      id: form.id,
      userAccount: form.userAccount, //用户名
      realName: form.realName,
      userSex: form.userSex, //性别
      mobile: form.mobile, //手机号
      idCard: form.idCard,
      address: form.address,
      age: form.age
    }
  }).then((res) => {
    props.forEach((val) => {
      useP.$patch((state) => {
        (state.userInfo[val] as any) = form[val]
      })
    })
    router.push({
      path: "/userPage/info"
    })
  })
}
</script>

<style>
.form {
  padding: 10px;
  border: 1px solid black;
}


::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.el-form-item {
  border-bottom: 1px dashed gray;
}

.center {
  border-bottom: none;
}
</style>
  