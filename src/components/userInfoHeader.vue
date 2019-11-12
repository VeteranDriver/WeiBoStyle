<template>
  <div>
    <van-image
        class="userIcon"
        width="40"
        height="40"
        :src="userIcon"
        round
    />
    <div class="info">
      <p class="userName">{{userName}}</p>
      <p class="time">{{time}}</p>
    </div>
    <van-button class="add" size="small" type="default" icon="plus">关注</van-button>
  </div>    
</template>

<script>
export default {
    name: 'userInfoHeader',
    props: ['userIcon','userName','time']
}
</script>

<style>
.userIcon {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
}
.info {
    float: left;
}
.userName {
    /* background-color: aqua; */
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 0px;
    font-size: 14px;
}
.time {
    /* background-color: aqua; */
    margin-left: 10px;
    margin-top: 0px;
    font-size: 10px;
    color: #999999;
}
.add {
    float: right;
    margin-right: 10px;
    width: 80px;
    margin-top: 10px;
}
</style>