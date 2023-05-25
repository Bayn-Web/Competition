<template>
    <u-comment :config="config" @submit="submit" @like="like" @operate="operate" ref="commentRef" relative-time>
        <template #operate="scope">
            <Operate :comment="scope" @remove="remove" />
        </template>
        <template #info="scope">{{ scope.user.username }}</template>
    </u-comment>
</template>
  
<script setup lang="ts">
import Operate from "./operate.vue"
import emoji from "../../../public/emoji/emoji"
import { reactive, ref } from 'vue'
import { CommentApi, ConfigApi, SubmitParamApi, UToast, createObjectURL, throttle, dayjs, CommentInstance } from 'undraw-ui'
import axios from "../../axios"
import usePinia from "../../pinia"
import { useRouter } from "vue-router"
const router = useRouter()
const pinia = usePinia();
const remove = (comment: CommentApi) => {
    setTimeout(() => {
        commentRef.value?.remove(comment)
    }, 200)
}
const commentRef = ref<CommentInstance>()
const operate = (type: string, comment: CommentApi, finish: Function) => {
    _throttle(type, comment, finish)
}
const _throttle = throttle((type: string, comment: CommentApi, finish: Function) => {
    switch (type) {
        case '删除':
            alert(`删除成功: ${comment.id}`)
            finish()
            break
        case '举报':
            alert(`举报成功: ${comment.id}`)
            break
    }
})
const config = reactive<ConfigApi>({
    user: {
        id: 1,
        username: 'jack',
        avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
        likeIds: [1, 2, 3]
    },
    emoji: emoji,
    comments: [],
    total: 10
})

let temp_id = 100
const submit = ({ content, parentId, files, finish, reply }: SubmitParamApi) => {
    temp_id += 1
    axios({
        method: "post",
        url: "/comment/addComment",
        data: {
            goodsSn: router.currentRoute.value.params.id,
            content,
            fatherId: parentId,
            userId: pinia.userInfo.id
        }
    }).then(res => {
        console.log(res)
    }).catch(res => {
        console.log(res)
    })
    const comment: CommentApi = {
        id: String(temp_id),
        parentId: parentId,
        uid: config.user.id,
        address: '来自江苏',
        content: content,
        likes: 0,
        createTime: dayjs().subtract(5, 'seconds').toString(),
        user: {
            username: config.user.username,
            avatar: config.user.avatar,
            level: 6,
            homeLink: `/${(temp_id)}`
        },
        reply: null
    }
    setTimeout(() => {
        finish(comment)
        UToast({ message: '评论成功!', type: 'info' })
    }, 200)
}
const like = (id: string, finish: () => void) => {
    console.log('点赞: ' + id)
    setTimeout(() => {
        finish()
    }, 200)
}

const comments = defineProps(["comments"])
config.comments = comments.comments
</script>
<style scoped>
:deep .header {
    padding-left: 30px;
}
</style>