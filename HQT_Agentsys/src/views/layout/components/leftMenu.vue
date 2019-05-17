<template>
  <div class="header-slot">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div v-show="show"
           class='header-slot-mask'
           @click='menuHide();show=!show'
           ref='cover'>
      </div>
    </transition>
    <!-- <div class='header-slot-mask'  @click='menuHide();show=!show' v-show="show" @touchmove.prevent> -->

    <!-- </div> -->
    <!-- 面包屑按钮 -->
    <mt-button slot="right"
               @click="menuShow();show=!show">
               
      <i class="icon iconfont icon-menu"></i>
      <span style="font-size:12px;">菜单</span>
    </mt-button>
    <!-- 菜单栏 -->
    <ul ref="leftmenu"
        class="header-slot-leftmenu"
        @click="menuHide();show=!show">
        <div class='menu'>
          <h2 class="whitetitle">目录</h2>
        </div>

      <div class="menubox">
        <mt-cell title="团队报表" is-link  to="/teamreport">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="日度报表" is-link  to="/daydegrees">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="游戏报表" is-link  to="/game">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="玩家报表" is-link  to="/plaverreport">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      </div>
        
       <div class="menubox">
        <mt-cell title="注册下级" is-link  to="/lowerlevel">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell><mt-cell title="提款记录" is-link  to="/record">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      <!-- <mt-cell title="玩家后置注册链接" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell> -->
      <mt-cell title="玩家前置注册链接" is-link  to="/http">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      <!-- <mt-cell title="玩家转代理" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell> -->
      </div>

      <div class="menubox">
        <mt-cell title="代理管理" is-link  to="/agent">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell><mt-cell title="提现管理" is-link  to="/withdrawal">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      </div>

      <!-- <div class="menubox">
        
        <mt-cell title="公告列表" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      </div> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'leftmenu',
  components: {
  },
  created () {
  },
  data () {
    return {
      // 控制菜单及遮罩层显示与否
      show: false
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
          console.log(3333)
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
  methods: {
    menuShow () {
      // 菜单显示
      const leftMenu = this.$refs.leftmenu
      // const windowleft = document.body.clientWidth
      // if (windowleft > 768) {
      //   var left = (windowleft - 768) / 2
      //   leftMenu.style.left = left + 'px'
      // } else {
      //   leftMenu.style.left = 0
      // }
      leftMenu.style.left = 0
    },
    menuHide () {
      // 菜单隐藏
      const leftMenu = this.$refs.leftmenu
      if (leftMenu) {
        leftMenu.style.left = '-235px'
      } else {
        var body = document.body
        var app = document.getElementById('app')
        app.style.position = 'absolute'
        body.style.height = ''
        body.style.overflow = 'auto'
        var container = document.getElementById('container')
        container.style.position = 'static'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.header-slot {
  // position: relative;
  &-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #2c3b41;
    opacity: 0.5;
    z-index: 1111;
  }
  .menu {
    line-height: 50px;
    background: #304156;
  }
  .whitetitle {
    margin: 0;
    padding: 5px 10px;
    color:white;
  }
  .menubox {
    background: white;
    margin: 20px 0;
    a:not(:last-child) {
      border-bottom: 1px solid #eadfdf;
      
    }
    .mint-cell-title {
      color: black;
      font-size: 14px;
    }
  }

  &-leftmenu {
    height: 100vh;
    position: absolute;
    top: 0;
    // bottom: 0;
    margin: 0;
    left: -235px;
    padding: 0 0;
    min-width: 235px;
    background: #f2f2f3;
    z-index: 1200;
    transition: all ease 0.4s;
    overflow: auto;
    font-size: 16px;
    &-title {
      margin: 0;
      padding: 5px 10px;
      color: gray;
      &:not(:first-child) {
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
    }
    &-item {
      display: block;
      color: black;
      text-decoration: none;
      padding: 15px 10px;
      font-size: 0.9rem;
      .icon {
        font-size: 0.9rem;
        margin-right: 5px;
      }
    }
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
