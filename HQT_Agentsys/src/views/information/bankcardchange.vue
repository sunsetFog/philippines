<template>
  <div class="container">
    <!-- <otherheader title="银行名称"></otherheader> -->
    <mt-header title="更换银行卡">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>
    <mt-radio
      title="选择要更换的银行卡"
      v-model="value"
      :options="options"
      @change="check()"
      >
    </mt-radio>


  </div>
</template>

<script>
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
  watch: {
    value (val) {
      this.val = val
      let that = this
      if (this.val != '') {
        var width = document.body.offsetWidth
        if (width > 768) {
          MessageBox.confirm('确定更换此银行卡？').then(action=>{
          that.$router.push({path: '/withdrawal', query:{id: val}}) 
          }).catch(error=>{
            that.value=''
          })
        } else {
          MessageBox1.confirm('确定更换此银行卡？').then(action=>{
          that.$router.push({path: '/withdrawal', query:{id: val}}) 
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
.mint-radiolist-title {
  color: #dbcbb7!important;
}
</style>
