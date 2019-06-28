<template>
  <div class="container daydegrees">
    <mt-header title="游戏报表">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>

  
       <div class="card">
        <mt-cell title="游戏记录" is-link  to="/gamereport">
        <img slot="icon" src="../../../static/game.png" width="30" height="30">
      </mt-cell>
    </div>
     



  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      show:false
    }
  },
  created() {

  },
  methods: {
    back () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .mint-header {
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
