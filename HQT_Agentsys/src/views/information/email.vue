<template>
  <div class="container">
    <otherheader title="邮箱绑定"></otherheader>

    <div style="padding:10px;">
      <mt-cell title="提高您账号的安全性，用于您的密码找回">
      </mt-cell>
      <mt-field label="绑定邮箱" v-model="email" placeholder="请输入需绑定的邮箱地址"></mt-field>
    </div>
      

     <div class="card">
         <mt-button type="primary" size="large" @click='sure'>修改</mt-button>
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
      email: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    request({
        url: this.public.url + '/account/getbindemail',
        method: 'post',
        data: {
        }
      }).then(res => {
        that.email = res.data.email
      }).catch(error => {
      })
  },
  methods: {
    sure () {
      let that = this
      if (this.email === '') {
        Toast({
          message: '请输入邮箱号码'
        })
        return
      }
      request({
        url: this.public.url + '/account/bindemail',
        method: 'post',
        data: {
          email: this.email
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
  .card {
    margin: 10px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    border-left: 2px solid #d9d9d9;
    border-right: 2px solid #d9d9d9;
    border-radius: 12px;
    position: relative;
  }
</style>
