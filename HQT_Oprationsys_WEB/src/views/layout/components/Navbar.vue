<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <!-- <el-badge :value="2" class="item">
        <el-button size="small" @click="message">消息</el-button>
      </el-badge> -->
      <div class="avatar-wrapper">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
        <span style="line-height:50px;">{{name}}</span>
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item divided>
          <span style="display:block;" @click="change">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :title='title'  :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="原始密码" :label-width="formLabelWidth" prop="original">
        <el-input v-model="form.original"  type='password'></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="new">
        <el-input v-model="form.new"  type='password'></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="sure">
        <el-input v-model="form.sure"  type='password'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>
  </el-dialog>
  
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken, removeToken } from '@/utils/auth' // 验权
import { logout } from '@/api/login'
import request from '../../../utils/request'
import { Message, MessageBox } from 'element-ui'
import store from '../../../store'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.form.sure !== '') {
          this.$refs.form.validateField('sure');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.new) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        original: '',
        new: '',
        sure: ''
      },
      rules: {
        original: [
          {required: true, message: '请输入原始密码', trigger: 'blur'},
          {min:6, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ],
        new: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min:6, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ],
        sure: [
          {required: true, validator: validatePass2, trigger: 'blur'},
          {min:4, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      title: '修改密码'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    message () {

    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      logout().then(response => {
        if (response.code === 0) {
          this.$store.commit('SET_TOKEN', '')
          this.$store.dispatch('delAllViews')
          removeToken()
          this.$router.push({path: '/login'})
          console.log(1111)
          window.location.reload()
        } else {

        }
      }).catch(error => {
      })
    },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    change () {
      this.dialogFormVisible = true
    },
    sure (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let that = this
          request({
            url: this.public.url + '/backend/account/resetLoginPwd',
            method: 'post',
            data: {
              oldpwd: this.form.original,
              newpwd: this.form.new,
              confirmpwd: this.form.sure
            }
          }).then(res => {
            if (res.code === 0) {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              location.reload()
              .then(() => {
                store.dispatch('FedLogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              })
              return Promise.reject('error')
            } else {
              Message({
                message: error.message,
                type: 'error'
              })
            }
            
          }).catch(error => {
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  line-height: 70px;
      font-size: 31px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 70px;
    height: 70px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

