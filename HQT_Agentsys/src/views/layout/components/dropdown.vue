<template>
  <div class="headerdd">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div v-show="show"
           class='mask'
           @click='menuHide();show=!show'
           ref='cover'>
      </div>
    </transition>
    <!-- 面包屑按钮 -->
    <mt-button slot="right"
                icon='more'
               @click="menuShow();show=!show">
               <span style="font-size:12px;">个人信息</span>
    </mt-button>
    <!-- 菜单栏 -->
    <ul ref="rightmenu"
        class="headerright"
        @click="menuHide();show=!show">
        <div class='menu'>
          <h2 class="whitetitle">用户</h2>
        </div>

      <div class="menurightbox">
        <mt-cell title="个人信息" is-link  to="/personal">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="邮箱绑定" is-link  to="/email">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="登录密码" is-link  to="/pwd">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
       <mt-cell title="结算密码" is-link  to="/settlement">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      </div>

      <div class="menurightbox">
        <mt-cell title="银行卡管理" is-link  to="/bankcard">
        <img slot="icon" src="../../../../static/user.png" width="20" height="20">
      </mt-cell>
      </div>

      <div class="menurightbox">
        
        <!-- <mt-cell title="页面刷新" is-link>
      </mt-cell> -->
      <div class="mint-cell" @click="ready">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            页面刷新
          </div>
        </div>
        </div>
        
      </div>
      <div class="mint-cell" @click="loginout">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            安全退出
          </div>
        </div>
        </div>
        
      </div>
      <!-- <mt-cell title="安全退出" is-link @click="loginout">
      </mt-cell> -->
      </div>
    </ul>
  </div>
</template>

<script>
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
      this.$store
        .dispatch('LogOut')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
        })
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
    background: #304156;
    text-align: left;
  }
  .whitetitle {
    margin: 0;
    padding: 5px 10px;
    color:white;
  }
  .menurightbox {
    background: white;
    margin: 20px 0;
    a:not(:last-child) {
      border-bottom: 1px solid #eadfdf;
      
    }
    .mint-cell-title {
      color: black;
      font-size: 14px;
      text-align: left;
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
    background: #f2f2f3;
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
