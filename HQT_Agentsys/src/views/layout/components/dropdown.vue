<template>
  <div class="headerdd">
    <!-- 遮罩层 -->
    <!-- <transition name="fade">
      <div v-show="show"
           class='mask'
           @click='menuHide();show=!show'
           ref='cover'>
      </div>
    </transition> -->
    <!-- 面包屑按钮 -->
    <mt-button slot="right"
                icon='more'
                style="color: #dbcbb7;"
               @click="loginout">
               <span style="font-size:12px;color: #dbcbb7;font-family: 'Microsoft YaHei'">返回游戏</span>
    </mt-button>
  </div>
</template>

<script>
import {
  removename,
  removeToken,
  removeweb,
  getweb
} from '@/utils/auth'
export default {
  components: {
  },
  created () {
  },
  data () {
    return {
      // 控制菜单及遮罩层显示与否
      show: false,
    }
  },
   watch: {
    'show': function (val) {
      var width = document.body.offsetWidth
      if (width < 768) {
         if (val) {
          var container = document.getElementById('container')
          container.style.position = 'fixed'
          container.style.top = 0
          container.style.bottom = 0
          container.style.left = 0
          container.style.right = 0
        } else {
          var container = document.getElementById('container')
          container.style.position = 'static'
        }
      } else {
        if (val) {
          var body = document.body
          var app = document.getElementById('app')
          app.style.position = 'static'
          body.style.height = '100%'
          body.style.overflow = 'hidden'
        } else {
          var body = document.body
          var app = document.getElementById('app')
          app.style.position = 'absolute'
          body.style.height = ''
          body.style.overflow = 'auto'
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    menuShow () {
      // 菜单显示
      const rightmenu = this.$refs.rightmenu
      rightmenu.style.right = '0px'
    },
    menuHide () {
      // 菜单隐藏
      const rightmenu = this.$refs.rightmenu
      if (rightmenu) {
        rightmenu.style.right = '-235px'
      } else {
        var body = document.body
        var app = document.getElementById('app')
        app.style.position = 'absolute'
        body.style.height = ''
        body.style.overflow = 'auto'
        var container = document.getElementById('container')
        container.style.position = 'static'
      }
    },
    loginout () {
      if(getweb() == 'true') {
        window.parent.postMessage('back','*')
      } else {
        document.location = 'js://webview?arg=back2game'
      }
      this.$store.commit('SET_TOKEN', '')
      this.$store.commit('SET_NAME', '')
      removeToken()
      removename ()
      removeweb()
    },
    ready () {
      location.reload();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.headerdd {
  // position: relative;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #2c3b41;
    opacity: 0.5;
    z-index: 222;
  }
  .menu {
    line-height: 50px;
    background: #735885;
    text-align: left;
  }
  .whitetitle {
    margin: 0;
    padding: 5px 10px;
  }
  .menurightbox {
    background: white;
    // margin: 20px 0;
    // a:not(:last-child) {
    //   border-bottom: 1px solid #2e163d;
      
    // }
    .mint-cell-title {
      font-size: 14px;
      text-align: left;
    }
    .mint-cell-wrapper {
      border:0!important;
    }
  }
  .headerright {
    height: 100vh;
    position: absolute;
    top: 0;
    right: -235px;
    margin: 0;
    padding: 0 0;
    min-width: 235px;
    background: #735885;
    z-index: 222;
    transition: all ease 0.4s;
    overflow: auto;
    font-size: 16px;
  }
}

// 淡入淡出
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
