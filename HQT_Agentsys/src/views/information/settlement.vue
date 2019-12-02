<template>
  <div class="container">
    <otherheader title="资金密码"></otherheader>

    <div class="card">
        <mt-field label="旧的密码" v-model="oldpwd" :attr="{ maxlength: 6 }" placeholder="如没有，可空置本栏" type='password'></mt-field>
        <mt-field label="新的密码" v-model="newpwd" :attr="{ maxlength: 6 }" placeholder="请输入6位数字的资金密码" type='password'></mt-field>
        <mt-field label="确认密码" v-model="pwd" :attr="{ maxlength: 6 }" placeholder="请输入6位数字的资金密码" type='password'></mt-field>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" class="all_palm" @click="sure">修改</mt-button>
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
    verifyMeans(){
      if(this.oldpwd==''){
        Toast({
          message: '请输入旧密码'
        })
        return false;
      }else if(/[^\d]/g.test(this.oldpwd)){
        if(this.oldpwd.match(/[^\d]/g)!=null){
          Toast({message: '请输入6位数字的旧密码！'});
        }
        this.oldpwd = '';
        return false;
      }else if(this.newpwd==''){
        Toast({
          message: '请输入新密码'
        })
        return false;
      }else if(this.newpwd.length!=6){
        Toast({
          message: '请输入6位数字的资金密码'
        })
        return false;
      }else if(/[^\d]/g.test(this.newpwd)){
        if(this.newpwd.match(/[^\d]/g)!=null){
          Toast({message: '请输入6位数字的新密码！'});
        }
        this.newpwd = '';
        return false;
      }else if(this.pwd!=this.newpwd){
        Toast({
          message: '新密码与确认密码不一致'
        })
        return false;
      }else{
        return true;
      }
    },
    sure () {
      let that = this
      if(!that.verifyMeans()){
        return;
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
