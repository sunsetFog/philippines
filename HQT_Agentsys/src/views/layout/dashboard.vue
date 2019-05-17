<template>
  <div class="container" id="container">
    <!-- <MtHeader></MtHeader> -->
    <router-view/>
  </div>
</template>

<script>
import MtHeader from './header'

export default {
  name: 'dashboard',
  components: { MtHeader },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
