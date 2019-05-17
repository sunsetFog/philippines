<template>
  <div class="container">
    <!-- <otherheader title="银行卡管理"></otherheader> -->
    <mt-header title="银行卡管理">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

        <mt-button slot="right"   @click="add">
        <img src="../../../static/jia.png" style="width:30px;height:30px;">
        </mt-button>
    </mt-header>

    <div class="card" v-for="(item, index) in list" :key="index">
      <mt-cell title="银行卡" style="background:#26a2ff;color:white;">
        <img src="../../../static/moren.png" style="width:30px;height:30px" @click="change(item.bank_id)" v-if="id!=item.bank_id">
        <img src="../../../static/moren1.png" style="width:30px;height:30px" @click="change(item.bank_id)" v-if="id===item.bank_id">
        <span :class="id===item.bank_id?'morencard': 'white'" @click="change(item.bank_id)">默认</span>
      </mt-cell>
        <mt-cell title="银行卡号" :value='item.cardno'>
      </mt-cell>
      <mt-cell title="开户人" :value='item.cardholder'>
      </mt-cell>
      <mt-cell title="银行" :value='item.bankname'>
      </mt-cell>

    </div>

     <div class="card">
          
         <mt-button type="primary" size="large" @click="add">添加银行卡</mt-button>
     </div>
     <div class="card">
          
         <mt-button type="primary" size="large" @click="del">删除银行卡</mt-button>
     </div>



  </div>
</template>

<script>
// import otherheader from '../layout/otherheader'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      list: [],
      id: ''
    }
  },
  // components: { otherheader },
  created() {
     getlist(this)
    
  },
  methods: {
    add () {
      this.$router.push({path:'/bankcardadd'})
    },
    back () {
      this.$router.push({path:'/'})
    },
    del () {
      this.$router.push({path:'/bankcarddel'})
    },
    change (id) {
      let that = this
      request({
          url: this.public.url + '/bank/updateDefBankcard',
          method: 'post',
          data: {
            bank_id: id
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
          
        getlist(that)
        }).catch(error => {
        })
    },
  }
}
function getlist (that) {
  request({
        url: that.public.url + '/paywithdraw/getbanklist',
        method: 'post',
        data: {
          pageno:1,
          pagerows:15
        }
      }).then(res => {
        that.list = res.data.list
       that.id = res.data.def_bank_id
      }).catch(error => {
      })

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
  .mint-header {
  background-color: #304156!important;
  height: 60px!important;
  font-size: 21px!important;
}
.morencard {
  color: red;
}
.white{
  color:white
}
</style>
