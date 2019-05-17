<template>
  <div class="login-container" style="background-image:url('../../../static/bg.png')">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="titlebox">
        棋牌游戏中心
      </div>
      <h3 class="title">企业后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
        <el-button :loading="loading" type="primary" @click="handleLogin" class="loginbutton">
          登录
        </el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import request from '../../utils/request'
import { setToken } from '../../utils/auth'
import { login } from '@/api/login'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 18) {
        callback(new Error('密码是6-18位之间'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const username = this.loginForm.username.trim()
          const password = this.loginForm.password.trim()
          let that = this
          login(that, username, password).then(response => {
            if (response.code === 0) {
              this.loading = false
              const data = response.data
              setToken(data.token)
              this.$store.commit('SET_TOKEN', data.token)
              this.$store.commit('SET_NAME', data.nickname)
              this.$store.commit('SET_ROLES', data.menu)
              this.$store.dispatch('getbtn', data.menu)
              this.$store.dispatch('getnewroles', data.menu)
              this.$router.push({ path: '/dashboard' })
            } else {
              this.loading = false
            }
          }).catch(error => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    width: 500px;
    margin-left: 50px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 600px;
    max-width: 100%;
    margin: 160px auto;
    background: white;
    height: 500px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    margin-top:30px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .titlebox {
    background: #2d3a4b;
    text-align: center;
    color: white;
    height: 100px;
    line-height: 100px;
    font-size: 40px;
  }
  .loginbutton {
    width: 500px;
    margin-top: 32px;
    margin-left: 50px;
    line-height: 28px;
    font-size: 25px;
  }
}
</style>
