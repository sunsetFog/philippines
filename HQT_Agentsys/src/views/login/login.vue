<template>
  <div class="login-container" style="background:url('../../../static/bg.png') 100% 100%">
    <h2 class="title">系统登录</h2>
    <el-form autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             style="margin: 20px;"
             ref="loginForm">
      <el-form-item prop="userName">
        <mt-field placeholder="用户名："
                  type="text"
                  v-model="loginForm.userName"
                  name="userName"
                  autoComplete="on"></mt-field>
      </el-form-item>
      <el-form-item prop="userPassword">
        <mt-field placeholder="密码："
                  :type="passwordType"
                  v-model="loginForm.userPassword"
                  name="userPassword"
                  autoComplete="on">
        </mt-field>
      </el-form-item>
    </el-form>
    <mt-button type="primary"
               size="large"
               class="button"
               @click.native="handleLogin">登 录</mt-button>
    

  </div>
</template>

<script>
import { login } from '@/api/login/login'
import { setToken, setname } from '../../utils/auth'
export default {
  name: 'login',
  data () {
    // 开头是字母 后面可以是数字 字母 下划线 总长度为 4到20
    const valid = /^[a-zA-Z]\w{4,19}$/
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入用户名'))
      } else if (!valid.test(value)){
        callback(new Error('用户名开头必须字母,后面可以是数字、字母、下划线，总长度为4到20'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 && value.length > 18) {
        callback(new Error('密码6-18位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        userPassword: ''
      },
      loginRules: {
        userName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        userPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      showDialog: false
    }
  },
  methods: {
    // 切换密码显示
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      let that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const username = this.loginForm.userName.trim()
          const password = this.loginForm.userPassword.trim()
          let that = this
          login(that, username, password).then(response => {
            if (response.code === 0) {
              const data = response.data
              setToken(data.token)
              this.$store.commit('SET_TOKEN', data.token)
              this.$store.commit('SET_NAME', data.login_name)
              setname(data.login_name)
              this.$router.push({ path: '/home' })
            }
          }).catch(error => {
            
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283442;
$light_gray: #eee;
@media screen and (min-width: 768px) { /*当屏幕尺寸大于768px时，应用下面的CSS样式*/
  .login-container {
    width: 768px;
  }
}
@media screen and (max-width: 768px) {
  .login-container {
    width: 100%;
  }
}
.login-container {
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .button {
    width: 80%;
    margin: 10%;
  }
}
.title {
  text-align: center;
  color: white;
  margin-top: 30%;
}
</style>
