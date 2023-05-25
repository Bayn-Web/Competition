<template>
    <h4>Best Daily Artwork</h4>
    <div class="row">
        <img id="artpic" src="./images/thumb-pagetitle.jpg">
        <div class="column maxwid">
            <div class="row">
                <div class="row">
                    <img src="./images/Live-Auctions/card-item8.jpg" id="avater">
                    <span id="username">UserName</span>
                </div>
                <div class="like" @click="like"><i class="far fa-heart"></i>&nbsp; 68</div>
            </div>
            <div id="name">Wicked Cranium #4449</div>
            <div id="details">A Collection Of 10,000 Undead NFTs Minted On The Ethereum Blockchain. Each Unique Deadfella Is
                Randomly Generated From A Combination.</div>
        </div>
    </div>
    <div style="width: 90vw; margin: 0 auto;">
        <comment />
    </div>
</template>

<script lang="ts" setup>
import comment from './components/comment.vue';
import {
    reactive,
    ref, onMounted
} from 'vue';
const like = (event: Event) => {
    if ((event.currentTarget as HTMLDivElement).style.backgroundColor == "red") {
        (event.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"
    } else {
        (event.currentTarget as HTMLDivElement).style.backgroundColor = "red"
    }
}
const commentsInfo = [
    {
        uid: 'uid000',
        userName: "陌溪",
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '我是一级评论',
        reply: [
            {
                uid: 'uid001',
                userName: "陌溪",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '我是二级评论',
                reply: [
                    {
                        uid: 'uid002',
                        userName: "陌溪",
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: '我是三级评论',
                        reply: []
                    }
                ]

            }, {
                uid: 'uid003',
                userName: "陌溪",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '我是二级评论',
                reply: []
            }
        ]
    },
    {
        uid: 'uid004',
        userName: "陌溪",
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '我是一级评论',
        reply: [
            {
                uid: 'uid005',
                userName: "陌溪",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '我是二级评论',
                reply: []

            }
        ]
    },
]
</script>

<style scoped>
h4 {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    margin: 30px;
}

.column {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

#artpic {
    border-radius: 16px;
    object-fit: cover;
    height: 80vh;
    max-width: 38vw;
    margin: 30px;
}

#avater {
    margin: 30px;
    height: 50px;
    width: 50px;
    object-fit: fill;
    border-radius: 50%;
}

#username {
    margin-top: 50px;
    margin-left: -20px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
}

.maxwid {
    width: 100%;
}

.like {
    border: 1px solid var(--indigo-3);
    border-radius: 20px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    height: fit-content;
    padding: 10px 20px;
    margin-top: 35px;
    margin-left: 30px;
    cursor: pointer;
}

#name {
    font-size: 44px;
    line-height: 56px;
    font-weight: 700;
    margin: 30px;
    margin-top: 0px;
}

#details {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 35px;
    font-weight: 400;
}
</style>