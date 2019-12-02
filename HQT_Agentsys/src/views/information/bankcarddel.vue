<template>
  <div class="container">
    <!-- <otherheader title="银行名称"></otherheader> -->
    <mt-header title="删除银行卡">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>
    <mt-radio
      title="选择要删除的银行卡"
      v-model="value"
      :options="options"
      @change="check()"
      >
    </mt-radio>


  </div>
</template>

<script>
// import otherheader from '../layout/otherheader'
import { request } from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import  {MessageBox as MessageBox1} from 'mint-ui'
export default {
  data () {
    return {
      options: [],
      value: ''
    }
  },
  // components: { otherheader },
  watch: {
    value (val) {
      this.val = val
      let that = this
      if (this.val != '') {
        var width = document.body.offsetWidth
        if (width > 768) {
        MessageBox.confirm('确定删除此银行卡？').then(action=>{
          request({
            url: that.public.url + '/bank/del',
            method: 'post',
            data: {
              bank_id: val
            }
          }).then(res => {
             Message({
              message: res.message,
                type: 'success'
              })
             that.$router.push({path: '/bankcard'}) 
          }).catch(error => {
         })
        }).catch(error=>{
          that.value=''
        })
        } else {
          MessageBox1.confirm('确定删除此银行卡？').then(action=>{
          request({
            url: that.public.url + '/bank/del',
            method: 'post',
            data: {
              bank_id: val
            }
          }).then(res => {
             Message({
              message: res.message,
                type: 'success'
              })
             that.$router.push({path: '/bankcard'}) 
          }).catch(error => {
         })
        }).catch(error=>{
          that.value=''
        })
        }
      }
    }
  },
  created() {
     let that = this
     this.form = this.$route.query.form
    request({
        url: this.public.url + '/paywithdraw/getbanklist',
        method: 'post',
        data: {
        }
      }).then(res => {
        let options = res.data.list
        that.options = options.map((item) =>{
          return {label: item.bankname+':'+ item.cardno, value: item.bank_id}
        })
      }).catch(error => {
      })
  },
  methods: {
    check () {
      // console.log(this.options)
      // console.log(this.value)
    },
    back () {
      this.$router.go(-1)
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
