<template>
  <div class="container">
    <!-- <otherheader title="银行名称"></otherheader> -->
    <mt-header title="银行卡管理">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>
    <mt-radio
      title="银行名称"
      v-model="value"
      :options="options"
      @change="check()"
      >
    </mt-radio>


  </div>
</template>

<script>
import { request } from '@/utils/request'
export default {
  data () {
    return {
      options: [],
      value: '',
      form: '',
      name: ''
    }
  },
  watch: {
    value (val) {
      this.val = val
      if (this.val != '') {
        this.options.map(item => {
          if (item.value == val) {
            this.name = item.label
          }
        })
        this.$router.push({path: '/bankcardadd', query:{id: this.val, form: this.form, name: this.name}})
      }
    }
  },
  created() {
     let that = this
     this.form = this.$route.query.form
    request({
        url: this.public.url + '/bank/getquickbanks',
        method: 'post',
        data: {
        }
      }).then(res => {
        let options = res.data
        that.options = options.map((item) =>{
          return {label: item.name, value: item.id}
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
      this.$router.push({path: '/bankcardadd', query:{id: this.val, form: this.form, name: this.name}})
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
