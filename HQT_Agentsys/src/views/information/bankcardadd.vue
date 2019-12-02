<template>
  <div class="container">
    <!-- <otherheader title="银行卡管理"></otherheader> -->
    <mt-header title="银行卡管理">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>
    </mt-header>
    <div class="card">
        <mt-field label="开户人" v-model="form.cardholder" :attr="{ maxlength: 10 }" placeholder="中文或英文"></mt-field>
        <mt-field label="银行卡号" v-model="form.cardno" :attr="{ maxlength: 19 }" placeholder="卡号16到19位数字组成"></mt-field>
        <mt-field label="资金密码" v-model="form.money_pwd" :attr="{ maxlength: 6 }" placeholder="请输入6位数字的资金密码" type='password'></mt-field>

        <!-- <mt-cell title="银行名称" is-link  to="/bankradio"> -->
      <!-- </mt-cell> -->

    <mt-field label="银行名称" v-model="name" placeholder="请选择银行名称" :disabled="false" @focus.native.capture="bankradio"></mt-field>

      <!-- <div class="mint-cell all_palm" @click="bankradio">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            银行名称
          </div>
        </div>
        <div class="mint-cell-value">
          <span>{{name}}</span>
        </div>
        </div>
        
      </div> -->




        <mt-field label="银行卡号" v-model="form.bind_cardno" :attr="{ maxlength: 19 }" placeholder="曾绑定的卡(首次可不填)"></mt-field>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" class="all_palm" @click="sure">添加</mt-button>
     </div>



  </div>
</template>

<script>
import { request } from '@/utils/request'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      form: {
        cardholder: '',
        cardno: '',
        money_pwd: '',
        bind_cardno: ''
      },
      id: '',
      name: ''
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.id = this.$route.query.id
    }
    if (this.$route.query && this.$route.query.form) {
      let form = JSON.parse(this.$route.query.form)
      this.form = form
    }
    if (this.$route.query && this.$route.query.name) {
      this.name = this.$route.query.name
    }
  },
  methods: {
    validatSpecial(str){
        const reg = new RegExp("[\\+,\\/,\\\\,\\?,\\？,\\%,\\#,\\&,\\=,\\(,\\),\\（,\\）,\\{,\\},\\',\\\",\\<,\\>,\\@,\\!,\\！,\\$,\\.,\\，,\\、,\\:,\\：,\\;,\\；,\\￥,\\*,\\~,\\`,\\-,\\——,\\_,\\^,\\“,\\”,\\‘,\\’,\\……,\\【,\\】,\\[,\\],\\,]", "gm");
        if(reg.test(str)){
            Toast({
              message: '不能输入特殊字符！'
            })
            return {state: true,value: str.replace(reg, "")};
        }else{
            return {state: false,value: ''};
        }
    },
    sure () {
      let that = this
      if (this.form.cardholder === '') {
        Toast({
          message: '请填写开户人'
        })
        return
      }

        let validat = that.validatSpecial(that.form.cardholder);
        if(validat.state){
          that.form.cardholder = '';
          return;
        }

      if (that.form.cardno.length<16) {
        Toast({
          message: '请输入16到19位数字组成的卡号'
        })
        return
      }

            if(/[^\d]/g.test(that.form.cardno)){
                if(that.form.cardno.match(/[^\d]/g)!=null){
                   Toast({
                      message: '请输入数字的银行卡号！'
                    })
                }
                that.form.cardno = '';
                return
            }

      if (that.form.money_pwd == '') {
        Toast({
          message: '请输入资金密码'
        })
        return
      }

      if (that.form.money_pwd.length!=6) {
        Toast({
          message: '请输入6位数字的资金密码'
        })
        return
      }


      if(/[^\d]/g.test(that.form.money_pwd)){
        if(that.form.money_pwd.match(/[^\d]/g)!=null){
          Toast({message: '请输入6位数字的资金密码！'});
        }
        that.form.money_pwd = '';
        return;
      }

      if (this.id === '') {
        Toast({
          message: '请选择银行名称'
        })
        return
      }

            if(/[^\d]/g.test(that.form.bind_cardno)){
                if(that.form.bind_cardno.match(/[^\d]/g)!=null){
                   Toast({
                      message: '请输入数字的旧银行卡号！'
                    })
                }
                that.form.bind_cardno = '';
                return
            }

    request({
        url: this.public.url + '/bank/add',
        method: 'post',
        data: {
          cardholder: this.form.cardholder,
          cardno: this.form.cardno,
          money_pwd: this.form.money_pwd,
          bind_cardno: this.form.bind_cardno,
          bankid: this.id
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
        that.$router.push({path: '/bankcard'})
      }).catch(error => {
      })
    },
    back () {
      this.$router.push({path: '/bankcard'})
    },
    bankradio () {
      let form = JSON.stringify(this.form)
      this.$router.push({path: '/bankradio', query:{form: form}})
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
