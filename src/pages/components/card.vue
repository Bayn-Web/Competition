<template>
  <el-card class="height" :body-style="{ padding: '0px' }">
    <img :src="picUrl" class="image" @click="goto(`/market/details/${is.expand.id}`, router)" />
    <div style="padding: 14px" class="hide">
      <span>{{ name }}</span>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <el-button v-if="is.expand.isMy" text @click="goto(`/market/editDetails/${is.expand.id}`, router)"
          class="button">编辑我的商品</el-button>
        <el-button v-else text @click="goDetail(`/market/details/${is.expand.id}`)" class="button">点击查看</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import { useRouter } from 'vue-router';
import usePinia from '../../pinia';
import { goto } from '../../tools';
const pinia = usePinia();
const router = useRouter()
let is = defineProps(['expand'])
const goDetail = (path: string) => {
  router.push({
    path
  })
}
let picUrl = ref(is.expand.picUrl)
if (picUrl.value && picUrl.value.length > 999) {
  console.log("isBase")
  picUrl.value = "data:image/png;base64" + picUrl.value
}
let name = ref(is.expand.name)
const currentDate = ref(is.expand.addTime)
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.height {
  height: 100%;
  width: 100%;
}

.image {
  width: 100%;
  height: 254px;
}
</style>