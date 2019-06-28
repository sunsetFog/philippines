<template>
  <div class="container lowerlevel">
    <otherheader title="下级注册"></otherheader>

    <div class="card">
        <mt-field label="用户名" v-model="user" placeholder="请输入用户名"></mt-field>
        <mt-field label="昵称" v-model="nickname" placeholder="请输入昵称"></mt-field>
        <mt-field label="登录密码" v-model="pwd" placeholder="请输入密码" type='password'></mt-field>
        <mt-field label="确认密码" v-model="newpwd" placeholder="请再输入一次密码" type='password'></mt-field>
        <!-- <mt-field label="日工资" v-model="day" placeholder="请输入日工资" type='number'></mt-field> -->
        <mt-field label="团队税收比例" v-model="reward" placeholder="团队税收比例" type='number'></mt-field>
        <!-- <mt-field label="分红" v-model="bonus" placeholder="请输入分红"  type='number'></mt-field> -->
    </div>

    <!-- <div class="card">
      <mt-cell title="分成比例:">
        <span class="mark">{{proportion}}</span>
        <span  @click="select()">请选择</span>
      </mt-cell>
      <div>
        <mt-cell title=""  v-if="pickershow" style="background:#26a2ff">
        <span style="color:white" @click="sure">确定</span>
      </mt-cell>
        <mt-picker :slots="slots" @change="valuechange" v-if="pickershow" style="background:white"></mt-picker>
      </div>
    </div> -->

     <div class="card">
         <mt-button type="primary" size="large" @click="sure">注册用户</mt-button>
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
      user: '',
      nickname:'',
      newpwd: '',
      pwd: '',
      proportion: '',
      day:'',
      reward: '',
      bonus: '',
      pickershow: false,
      slots: [
        {
          flex: 1,
          values: ['','5%', '6%', '10%', '15%', '20%'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  components: { otherheader },
  created() {

  },
  methods: {
    select() {
      // this.pickershow = !this.pickershow
    },
    valuechange (picker, values) {
      this.proportion = values[0]
      // console.log(values)
    },
    sure () {
      let that = this
      // this.pickershow = !this.pickershow
      if (this.user=== '') {
        Toast({
          message: '请输入用户名'
        })
        return
      }
      if (this.nickname=== '') {
        Toast({
          message: '请输入昵称'
        })
        return
      }
      if (this.pwd=== '') {
        Toast({
          message: '请输入密码'
        })
        return
      }
      if (this.newpwd=== '') {
        Toast({
          message: '请输入确认密码'
        })
        return
      }
      if (this.reward=== '') {
        Toast({
          message: '请输入团队税收比例'
        })
        return
      } else {
        if (this.reward*1 > 100 || this.reward*1 < 0) {
          Toast({
          message: '团队税收比例最高不超过100%,最低不低于0'
          })
          return
        }
      }
      request({
        url: this.public.url + '/agentaccount/register',
        method: 'post',
        data: {
          login_name: this.user,
          nickname:this.nickname,
          login_pwd: this.pwd,
          confirm_pwd: this.newpwd,
          reward_team: this.reward
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
  .lowerlevel .mark {
    position: absolute;
    left: 120px;
    top: 12px;
    color: red;
    font-size: 20px;
  }
</style>
