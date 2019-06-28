<template>
  <div class="container daydegrees">
    <mt-header title="提款记录">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>

  
       <div class="card">
        <mt-cell title="提现记录" is-link  to="/withdrawalrecord">
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
.card {
    margin: 10px;
    border-top: 1px solid #2e163d;
    border-bottom: 1px solid #2e163d;
    border-left: 2px solid #2e163d;
    border-right: 2px solid #2e163d;
    border-radius: 12px;
    position: relative;}
</style>
