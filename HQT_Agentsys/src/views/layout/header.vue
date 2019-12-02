<template>
  <div>
    <mt-header title="代理系统" style="color:#dbcbb7">
      <!-- 左侧组件 -->
      <LeftMenu slot="left"></LeftMenu>

      <!-- 右侧组件 -->
      <DropDown slot="right"></DropDown>
    </mt-header>
  </div>
</template>

<script>
import DropDown from './components/dropdown'
import LeftMenu from './components/leftmenu'
import { setToken, setname, setweb } from '../../utils/auth'
export default {
  name: 'mtheader',
  components: { DropDown, LeftMenu },
  created () {
    // let url = window.location.href
    
    let json = this.$route.query;
    if(!json.hasOwnProperty('token')){
      return;
    }

    // let token =  ((url.split('?')[1]).split('&')[0]).split('=')[1]
    setToken(json.token)
    this.$store.commit('SET_TOKEN', json.token)
    // let name =  ((url.split('?')[1]).split('&')[1]).split('=')[1]
    this.$store.commit('SET_NAME', json.loginname)
    setname(json.loginname)
    if(json.hasOwnProperty('web')){
      setweb(true)
    } else {
      setweb(false)
    }
    // this.$bus.$on('set-theme', (color) => {
    //   this.$el.querySelector('.mint-header').style.backgroundColor = color
    // })
  },
  data () {
    return {
      // theme: '#2e3238'
    }
  },
  methods: {
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
