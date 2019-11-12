<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-row v-for="item in cards" :key="item.key">
                <userInfoHeader 
                    :userIcon="item.mblog.user.profile_image_url"
                    :userName="item.mblog.user.screen_name"
                    :time="item.mblog.created_at">
                </userInfoHeader>
                <p class="text" v-html="item.mblog.text"></p>
            </van-row>
        </van-list>
    </div>
</template>

<script>

import userInfoHeader from '../components/userInfoHeader'

export default {
    name: 'newsList',
    components: {userInfoHeader},
    props: ['cards'],
    data () {
        return {
            loading: false,
            finished: true
        }
    },
    methods: {
        onLoad () {

        }
    }
}
</script>

<style>
.text {
    float: left;
    margin-left: 10px;
    margin-right: 10px;
}
</style>