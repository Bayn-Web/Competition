<template>
    <template v-for="item in data.list">
        <lineItem :info="item"></lineItem>
    </template>
</template>

<script lang="ts" setup>
import axios from '../axios';
import usePinia from '../pinia';
import lineItem from './components/line.vue';
import {
    reactive,
    ref
} from 'vue';
const userInfo = usePinia()
const data = reactive<{ list: any[] }>({
    list: []
})
axios({
    method: "POST",
    url: "/assist/selectAssistByUserId",
    data: {
        // id: userInfo.userInfo.id
        id: 1
    }
}).then(res => {
    console.log(res.data)
    data.list = res.data
})
</script>

<style scoped></style>