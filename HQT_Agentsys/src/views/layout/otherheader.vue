<template>
  <div>
    <mt-header :title="title">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>
  </div>
</template>

<script>

export default {
  created () {
  },
  data () {
    return {
    }
  },
  props: ['title'],
  methods: {
    back() {
      this.$router.go(-1)
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
