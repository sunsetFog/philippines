<template>
  <div class="header-slot">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div v-show="show"
           class='header-slot-mask all_palm'
           @click='menuHide();show=!show'
           ref='cover'>
      </div>
    </transition>
    <!-- <div class='header-slot-mask'  @click='menuHide();show=!show' v-show="show" @touchmove.prevent> -->

    <!-- </div> -->
    <!-- 面包屑按钮 -->
    <mt-button slot="right"
               @click="menuShow();show=!show">
               
      <i class="icon iconfont icon-menu all_palm" style="color: #dbcbb7;"></i>
      <span class="all_palm" style="font-size:0.75rem;color: #dbcbb7;">菜单</span>
    </mt-button>
    <!-- 菜单栏 -->
    <ul ref="leftmenu"
        class="header-slot-leftmenu"
        @click="menuHide();show=!show">
        <div class='menu'>
          <h2 class="whitetitle">目录</h2>
        </div>

      <div class="menubox">
        <mt-cell title="团队报表" is-link  to="/teamreport" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/tuiduibaobiao.png" class="mulutubiao">
      </mt-cell>
       <mt-cell title="日度报表" is-link  to="/daydegrees" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/ridubaobiao.png" class="mulutubiao">
      </mt-cell>
       <!-- <mt-cell title="游戏报表" is-link  to="/game">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell> -->
       <mt-cell title="玩家报表" is-link  to="/plaverreport" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/wanjiabaobiao.png" class="mulutubiao">
      </mt-cell>
      </div>
        
       <div class="menubox">
        <mt-cell title="注册下级" is-link  to="/lowerlevel" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/zhucexiaji .png" class="mulutubiao">
      </mt-cell><mt-cell title="提款记录" is-link  to="/record" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/tikuanjilu.png" class="mulutubiao">
      </mt-cell>
      <!-- <mt-cell title="玩家后置注册链接" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell> -->
      <!-- <mt-cell title="玩家前置注册链接" is-link  to="/http">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell> -->
      <!-- <mt-cell title="玩家转代理" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell> -->
      </div>

      <div class="menubox">
        <mt-cell title="代理管理" is-link  to="/agent" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/dailiguanli.png" class="mulutubiao">
      </mt-cell>
      <!-- <mt-cell title="提现管理" is-link  to="/withdrawal" style="background: #735885;">
        <img slot="icon" src="../../../../static/tikuanjilu.png" class="mulutubiao">
      </mt-cell> -->
      </div>

      <!-- <div class="menubox">
        
        <mt-cell title="公告列表" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell>
      </div> -->
        <div class="menubox" style="border-top:0.0625rem solid #2e163d">
        <!-- <mt-cell title="个人信息" is-link  to="/personal" style="background: #735885;">
        <img slot="icon" src="../../../../static/gerenxinxi.png" class="mulutubiao">
      </mt-cell> -->
       <mt-cell title="邮箱绑定" is-link  to="/email" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/youxiangbangding.png" class="mulutubiao">
      </mt-cell>
       <!-- <mt-cell title="登录密码" is-link  to="/pwd">
        <img slot="icon" src="../../../../static/user.png" class="mulutubiao">
      </mt-cell> -->
       <mt-cell title="资金密码" is-link  to="/settlement" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/zijinmima.png" class="mulutubiao">
      </mt-cell>
      </div>

      <div class="menubox">
        <mt-cell title="银行卡管理" is-link  to="/bankcard" class="all_palm" style="background: #735885;">
        <img slot="icon" src="../../../../static/yinhangka.png" class="mulutubiao">
      </mt-cell>
      </div>



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
      // var width = document.body.offsetWidth
      // if (width < 768) {
      //    if (val) {
      //     var container = document.getElementById('container')
      //     container.style.position = 'fixed'
      //     container.style.top = 0
      //     container.style.bottom = 0
      //     container.style.left = 0
      //     container.style.right = 0
      //   } else {
      //     var container = document.getElementById('container')
      //     container.style.position = 'static'
      //   }
      // } else {
      //   if (val) {
      //     var body = document.body
      //     var app = document.getElementById('app')
      //     app.style.position = 'static'
      //     body.style.height = '100%'
      //     body.style.overflow = 'hidden'
      //   } else {
      //     var body = document.body
      //     var app = document.getElementById('app')
      //     app.style.position = 'absolute'
      //     body.style.height = ''
      //     body.style.overflow = 'auto'
      //   }
      // }
    }
  },
  methods: {
    menuShow () {
      // 菜单显示
      const leftMenu = this.$refs.leftmenu;
      leftMenu.style.height = document.body.clientHeight + 'px';
      // const windowleft = document.body.clientWidth
      // if (windowleft > 768) {
      //   var left = (windowleft - 768) / 2
      //   leftMenu.style.left = left + 'px'
      // } else {
      //   leftMenu.style.left = 0
      // }
      leftMenu.style.left = '0rem';
    },
    menuHide () {
      // 菜单隐藏
      const leftMenu = this.$refs.leftmenu
      if (leftMenu) {
        leftMenu.style.left = '-14.6875rem';
      } else {
        // var body = document.body
        // var app = document.getElementById('app')
        // app.style.position = 'absolute'
        // body.style.height = ''
        // body.style.overflow = 'auto'
        // var container = document.getElementById('container')
        // container.style.position = 'static'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.header-slot {
  .mulutubiao{
    width: 20px;
    height: 20px;
  }

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
    background: #735885;
  }
  .whitetitle {
    margin: 0;
    padding: 5px 10px;
  }
  .menubox {
    background: white;
    // margin: 20px 0;
    // a:not(:last-child) {
    //   border-bottom: 1px solid #2e163d;
      
    // }
    .mint-cell-title {
      font-size: 14px;
    }
    .mint-cell-wrapper {
      border:0!important;
    }
  }

  &-leftmenu {
    position: absolute;
    top: 0;
    left: -235px;
    margin: 0;
    padding: 0 0;
    min-width: 235px;
    background: #735885;
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
