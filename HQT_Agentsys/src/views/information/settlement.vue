<template>
  <div class="container">
    <otherheader title="资金密码"></otherheader>

    <div class="card">
        <mt-field label="旧的密码" v-model="oldpwd" placeholder="如没有，可空置本栏" type='password'></mt-field>
        <mt-field label="新的密码" v-model="newpwd" placeholder="请输入新的资金密码" type='password'></mt-field>
        <mt-field label="确认密码" v-model="pwd" placeholder="请再输入一次资金密码" type='password'></mt-field>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" @click="sure">修改</mt-button>
     </div>



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { request } from '@/utils/request'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      oldpwd: '',
      newpwd: '',
      pwd: ''
    }
  },
  components: { otherheader },
  created() {

  },
  methods: {
    sure () {
      let that = this
      if (this.newpwd=== '') {
        Toast({
          message: '请输入新密码'
        })
        return
      }
      if (this.pwd=== '') {
        Toast({
          message: '请输入确认密码'
        })
        return
      }
    request({
        url: this.public.url + '/account/updatemoneypwd',
        method: 'post',
        data: {
          old_pwd: this.oldpwd,
          new_pwd: this.newpwd,
          reply_pwd: this.pwd
        }
      }).then(res => {
        var width = document.body.offsetWidth
        if (width > 768) {
          Message({
          message: res.message,
            type: 'success'
            })
        } else {
          Toast({
              message: res.message
            })
        }
        that.$router.go(-1)
      }).catch(error => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
