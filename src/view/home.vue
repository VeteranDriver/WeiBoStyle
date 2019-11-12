<template>
<div>
    <div class="title">
      <img class="icon" src="../assets/icon.png" alt="">
      <div class="search">
          <i class="el-icon-search"></i>
          <i>大家都在搜</i>
      </div>
      <img class="edit" src="../assets/edit.png" alt="" >
    </div>
    <van-tabs v-model="active" @click="gotNewsList()">
        <van-tab v-for="item in tabList" :key="item.gid" v-bind:title="item.name">
            <newsList :cards="cards"></newsList>
        </van-tab>
    </van-tabs>
  </div> 
</template>

<script>

import newsList from '../components/newsList'

export default {
    name: 'home',
    components: {newsList},
    data() {
        return {
            active: 0,
            tabList: [],
            cards: [],
        };
    },
    watch: {

    },
    created: function () {
        this.gotConfigList()
    },
    methods: {
        gotConfigList () {
            this.http.fetchGet('/api/config/list', null,).then((res) => {
                // alert(res.data.data)
                this.tabList = res.data.data.channel
                this.gotNewsList()
            }).catch((err) => {
                Math.log(err)
            })
        },
        gotNewsList () {
            let containerid = this.tabList[this.active].gid
            let url = '/api/container/getIndex?containerid='+containerid+'&openApp=0'
            this.http.fetchGet(url, null,).then((res) => {
                // alert(res.data.data)
                this.cards = res.data.data.cards
            }).catch((err) => {
                Math.log(err)
            })
        }
    }
    
}
</script>

<style scoped>

.icon {
    float: left;
    width: 40px;
    height: 40px;
}
.edit {
    margin-top: 5px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    padding: 5px;
    /* border: 1px solid red; */
}
.search {
    background-color: lightgray;
    float: left;
    width: calc(100% - 100px);
    margin-left: 5px;
    height: 30px;
    text-align: center;
    margin-top: 5px;
}
.search i {
    margin-top: 8px;
    color: #999999;
}
</style>
