<template>
  <div class="container lowerlevel">
    <otherheader title="下级注册"></otherheader>

    <div class="card">
        <mt-field label="用户名" v-model="user" :attr="{ maxlength: 10 }" placeholder="请输入用户名"></mt-field>
        <mt-field label="昵称" v-model="nickname" :attr="{ maxlength: 6 }" placeholder="请输入昵称"></mt-field>
        <mt-field label="登录密码" v-model="pwd" :attr="{ maxlength: 12 }" placeholder="请输入密码" type='password'></mt-field>
        <mt-field label="确认密码" v-model="newpwd" :attr="{ maxlength: 12 }" placeholder="请再输入一次密码" type='password'></mt-field>
        <!-- <mt-field label="日工资" v-model="day" placeholder="请输入日工资" type='number'></mt-field> -->
        <!-- <mt-field label="团队税收比例" v-model="reward" placeholder="团队税收比例" type='number'></mt-field> -->
        <!-- <mt-picker :slots="slots" @change="onchange" value-key='reward'></mt-picker> -->
        <!-- <mt-field label="分红" v-model="bonus" placeholder="请输入分红"  type='number'></mt-field> -->
    </div>

    <div class="card">
      <mt-cell title="剩余配额:">
        <span class="mark">{{pei | pei}}</span>
      </mt-cell>
      <mt-cell title="代理税收:">
        <span class="mark">{{proportion}}</span>
        <span class="all_palm" @click="select()">请选择</span>
      </mt-cell>
      <div>
        <mt-cell title=""  v-if="pickershow">
        <span class="all_palm" @click="sure1">确定</span>
      </mt-cell>
        <mt-picker :slots="datalist"  v-if="pickershow" valueKey="reward" :itemHeight="80" :show-toolbar='true' @change="valuechange"></mt-picker>
      </div>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" class="all_palm" @click="sure">注册用户</mt-button>
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
      platdata: [],
      pei: '',
      id: ''
      // slots: [
      //   {
      //     flex: 1,
      //     values: datalist,
      //     className: 'slot1',
      //     textAlign: 'center'
      //   }
      // ]
    }
  },
  components: { otherheader },
  created() {
    let that = this
    request({
        url: this.public.url + '/agentaccount/getsubquotas',
        method: 'post',
        data: {
        }
      }).then(res => {
        that.platdata = res.data
      }).catch(error => {
      })
  },
  filters: {
    pei (val) {
      if (val == '-1') {
        return '无限制'
      } else {
        return val
      }
    }
  },
  computed: {
    datalist () {
        let dataslot = [
          {
            flex: 1,
            values: this.platdata,
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      return dataslot
    }
  },
  methods: {
    select() {
      this.pickershow = !this.pickershow
    },
    valuechange (picker, values) {
      let that = this
      this.proportion = values[0].reward
      this.platdata.map(val =>{
        if (val.reward == this.proportion) {
          that.pei = val.surplus_num
        }
      })
    },
    sure1() {
      let that = this
      this.pickershow = !this.pickershow
    },
    sure () {
      let that = this
      // this.pickershow = !this.pickershow
      if(/[^A-z0-9]/.test(this.user)){
        Toast({message: '用户名不能输入特殊字符！'});
        that.user = '';
        return
      }else if(/[^A-z0-9]/.test(this.pwd)){
        Toast({message: '登陆密码不能输入特殊字符！'});
        that.pwd = '';
        return
      }else if(/[^A-z0-9]/.test(this.newpwd)){
        Toast({message: '确认密码不能输入特殊字符！'});
        that.newpwd = '';
        return
      }
      if (this.user=== '') {
        Toast({
          message: '请输入用户名'
        })
        return
      }
      if (this.user.length<4) {
        Toast({
          message: '请输入4~10字符的用户名'
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
      if (this.pwd.length<6||this.newpwd.length<6) {
        Toast({
          message: '请输入6~12的密码'
        })
        return
      }
      if (this.pwd!=this.newpwd) {
        Toast({
          message: '登陆密码与确认密码不一致'
        })
        return
      }
      if (this.proportion === '') {
        Toast({
          message: '请输入代理税收'
        })
        return
      }
      // if (this.reward=== '') {
      //   Toast({
      //     message: '请输入团队税收比例'
      //   })
      //   return
      // } else {
      //   if (this.reward*1 > 100 || this.reward*1 < 0) {
      //     Toast({
      //     message: '团队税收比例最高不超过100%,最低不低于0'
      //     })
      //     return
      //   }
      // }
      request({
        url: this.public.url + '/agentaccount/register',
        method: 'post',
        data: {
          login_name: this.user,
          nickname:this.nickname,
          login_pwd: this.pwd,
          confirm_pwd: this.newpwd,
          reward_team: this.proportion,
          quota_num: this.pei
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
  .picker-toolbar{
    height: 0px;
  }
  .lowerlevel .mark {
    position: absolute;
    left: 120px;
    top: 12px;
    color: red;
    font-size: 20px;
  }
</style>
