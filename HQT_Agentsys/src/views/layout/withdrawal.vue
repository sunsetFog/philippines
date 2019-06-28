<template>
  <div class="container">
    <mt-header title="银行卡提现管理">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

    </mt-header>

    <div class="card">
      <mt-cell title="账户余额" :value="balance">
      </mt-cell>
      <mt-field label="提现金额" v-model="money" placeholder="" type='number'></mt-field>
    </div>

    <div class="card">
      <mt-cell title="银行信息">
          <span style="color: #9f14a5" @click="change">更换银行卡</span>
      </mt-cell>

      <mt-cell title="银行名称">
          <span>{{bankname}}</span>
      </mt-cell>
      <mt-cell title="银行卡号">
          <span>{{cardno}}</span>
      </mt-cell>
      <mt-cell title="开户人">
          <span>{{cardholder}}</span>
      </mt-cell>
      
    </div>

    <div class="card">
        <mt-field label="资金密码" v-model="pwd" placeholder="请输入资金密码" type='password'></mt-field>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" @click="sure">立即提现</mt-button>
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
      money: '',
      pwd: '',
      balance: '',
      bankname: '',
      cardholder: '',
      cardno: '',
      id: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    if (this.$route.query && this.$route.query.id ) {
      this.id = this.$route.query.id
      request({
        url: that.public.url + '/paywithdraw/getbankinfo',
        method: 'post',
        data: {
          bank_id: this.id
        }
      }).then(res => {
        that.bankname = res.data.bankname
        that.cardholder = res.data.cardholder
        that.cardno = res.data.cardno
        that.balance = res.data.balance
        that.id = res.data.bank_id
      }).catch(error => {
      })
    } else {
       request({
        url: that.public.url + '/paywithdraw/getdrawerinfo',
        method: 'post',
        data: {
        }
      }).then(res => {
        that.balance = res.data[0].blance
        that.bankname = res.data[0].bankname
        that.cardholder = res.data[0].cardholder
        that.cardno = res.data[0].cardno
        that.id = res.data[0].id
      }).catch(error => {
      })
    }
  },
  methods: {
    change () {
      this.$router.push({path:'/bankcardchange'})
    },
    back () {
      this.$router.push({path:'/'})
    },
    sure () {
      let that = this
      if (this.money === '') {
        Toast({
          message: '请选择提现金额'
        })
        return
      }
      if (this.money.indexOf('.') > -1 || this.money *1 < 0) {
        Toast({
          message: '提现金额必须为正整数'
        })
        return
      }
      if (this.balance*1 < this.money *1) {
        Toast({
          message: '提现金额不能大于账户余额'
        })
        return
      }
      if (!this.id || this.id === '') {
        Toast({
          message: '请选择或者新增银行卡'
        })
        return
      }
      if (this.pwd === '') {
        Toast({
          message: '请输入资金密码'
        })
        return
      }
      request({
        url: that.public.url + '/paywithdraw/apply',
        method: 'post',
        data: {
          amount: this.money,
          bank_id: this.id,
          money_pwd: this.pwd
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
        that.$router.push({path: '/'})
        
      }).catch(error => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .mint-header {
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
