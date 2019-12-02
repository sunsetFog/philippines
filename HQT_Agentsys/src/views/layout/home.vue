<template>
  <div class="container" id="home">
    <MtHeader></MtHeader>

    <div class="card">
        <mt-cell :title="name" is-link  to="/personal">
        <span style="color:#a16ec2" class="all_palm">更多</span>
        <img slot="icon" src="../../../static/user.png" class="yonghutouxiang">
      </mt-cell>
    </div>

    <div class="card tuan">
      <mt-switch v-model="value" class="shouyixinxi"></mt-switch>
        <mt-cell title="收益信息">
        </mt-cell>
      <mt-cell title="团队总流水">
        <span>
          <!-- <input :type="value || false ? '' :'password'"  style="color: black;font-size: 0.875rem;font-weight:800;border:0;background:#513663;text-align:right" :value="total_team_flow" disabled> -->
          <input v-if="value==true" type=""  style="color: black;font-size: 0.875rem;font-weight:800;border:0;background:#513663;text-align:right" :value="total_team_flow" disabled>
          <input v-else type="password"  style="color: black;font-size: 0.875rem;font-weight:800;border:0;background:#513663;text-align:right" value="123456" disabled>
        </span>
        <img slot="icon" src="../../../static/mark.png" class="tishixinxi all_palm" @click="popup = !popup">
        <mt-popup
          v-model="popup"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队总流水</div>
        <div style="line-height: 1.25rem;">团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）</div>
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
      <mt-cell title="今日团队总流水" :label="team_flow"  class="smallcell" style="border-right: 1px solid #2e163d;">
        <img slot="icon" src="../../../static/mark.png" class="tishixinxi all_palm" @click="show = !show">
        <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">今日团队总流水</div>
        <div style="line-height: 1.25rem;">今天团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）</div>     
        </mt-popup>
      </mt-cell>
      <mt-cell title="今日个人税收收益" :label="self_tax"  class="smallcell">
        <img slot="icon" src="../../../static/mark.png" class="tishixinxi all_palm" @click="show1 = !show1">
        <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">今日个人税收收益</div>
        <div style="line-height: 1.25rem;">今天团队税收收益总额-所有直属代理团队税收收益总额</div>
        </mt-popup>
      </mt-cell>
      </div>
      <mt-cell title="提现额度：">
        <!-- <input class="tixianedu" :type="value || false? '' :'password'" :value="balance" disabled> -->
        <input v-if="value==true" class="tixianedu" type="" :value="balance" disabled>
        <input v-else class="tixianedu" type="password" value="123456" disabled>
        <mt-button type="primary" size="small" class="all_palm" @click="withdrawal" style="width:7.625rem; height:2.125rem;background:#2e163d;color:#a16ec2;border:0;">立即提现</mt-button>
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title="我的代理"></mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="total_agent_num"  class="threecell">
        </mt-cell>
        <mt-cell title="今日新增" :label="today_add_agent_num"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日新增" :label="yesterday_add_agent_num"  class="threecell">
        </mt-cell>
      </div>
       <div style="display: flex">
        <mt-cell title="直属" :label="total_uagent_num"  class="threecell">
        </mt-cell>
        <mt-cell title="今日新增" :label="today_add_uagent_num"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日新增" :label="yesterday_add_uagent_num"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="我的玩家"></mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="total_player_num"  class="threecell">
        </mt-cell>
        <mt-cell title="今日新增" :label="today_add_player_num"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日新增" :label="yesterday_add_player_num"  class="threecell">
        </mt-cell>
      </div>
       <div style="display: flex">
       <mt-cell title="直属" :label="total_uplayer_num"  class="threecell">
        </mt-cell>
        <mt-cell title="今日新增" :label="today_add_uplayer_num"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日新增" :label="yesterday_add_uplayer_num"  class="threecell">
        </mt-cell>
      </div>
    </div>

    <div class="card extension">
      <mt-cell title="推广链接" is-link to='/http'>
        <span style="color:#a16ec2">管理链接</span>
      </mt-cell>
      <div class="fuzhilianjie" v-for="(item,key) in url" :key="key">
        <span>{{item.url}}</span><span @click="copy(item.url)">复制链接</span>
      </div>
      <div class="list_button">
          
        <!-- <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
          >
          <vueqr :size='text' :text='url'></vueqr>    一刀苏苏
        </mt-popup> -->
          <mt-button type="primary" size="small" class="all_palm" @click="add">生成链接</mt-button>

        <mt-popup
          v-model="show4"
          style="border: 1px solid #fff;"
          popup-transition='popup-fade'
        >
          <h2>选择域名</h2>
          <mt-radio
            title="请选择需要生成链接的域名"
            v-model="value1"
            :options="options"
            @change="check()"
            >
          </mt-radio>
          <div style="text-align:center">
            <mt-button type="primary" size="small" class="all_palm" style="margin:0.625rem;" @click="sure">确认生成</mt-button>
            <mt-button type="primary" size="small" class="all_palm" style="margin:0.625rem;" @click="show4 = !show4">取消生成</mt-button>
          </div>
        
        </mt-popup>
          <mt-button type="primary" size="small" class="all_palm" @click="ewm">查看二维码</mt-button>
          <mt-button type="primary" size="small" class="all_palm" @click="yulan">预览链接</mt-button>
      </div>
    </div>
    


  </div>
</template>

<script>
import MtHeader from './header'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
import vueqr from 'vue-qr'
import { request } from '@/utils/request'
import {
  getweb
} from '@/utils/auth'
export default {
  data () {
    return {
      value: true,
      popup: false,
      show: false,
      show1: false,
      show3: false,
      show4: false,
      username: '',
      text: 200,
      url: [],
      total_team_flow: '',
      team_flow: '',
      self_tax: '',
      balance: '',
      total_agent_num: '',
      today_add_agent_num: '',
      yesterday_add_agent_num: '',
      total_uplayer_num: '',
      today_add_uplayer_num: '',
      yesterday_add_uplayer_num: '',
      total_player_num: '',
      today_add_player_num: '',
      yesterday_add_player_num: '',
      total_uagent_num: '',
      today_add_uagent_num: '',
      yesterday_add_uagent_num: '',
      value1: '',
      options: [],
    }
  },
  created() {
    let that = this
    request({
        url: that.public.url + '/account/getlogininfo',
        method: 'post',
        data: {
        }
      }).then(res => {
        that.total_team_flow = res.data.total_team_flow.toString()
        that.team_flow = res.data.team_flow.toString()
        that.self_tax = res.data.self_tax.toString()
        that.balance = res.data.balance.toString()
        that.total_agent_num = res.data.total_agent_num.toString()
        that.today_add_agent_num = res.data.today_add_agent_num.toString()
        that.yesterday_add_agent_num = res.data.yesterday_add_agent_num.toString()
        that.total_uplayer_num = res.data.total_uplayer_num.toString()
        that.today_add_uplayer_num = res.data.today_add_uplayer_num.toString()
        that.yesterday_add_uplayer_num = res.data.yesterday_add_uplayer_num.toString()
        that.total_player_num = res.data.total_player_num.toString()
        that.today_add_player_num = res.data.today_add_player_num.toString()
        that.yesterday_add_player_num = res.data.yesterday_add_player_num.toString()
        that.total_uagent_num = res.data.total_uagent_num.toString()
        that.today_add_uagent_num = res.data.today_add_uagent_num.toString()
        that.yesterday_add_uagent_num = res.data.yesterday_add_uagent_num.toString()
      }).catch(error => {
      })
    geturllist(this)
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  components: { MtHeader, vueqr },
  methods: {
    withdrawal () {
      this.$router.push({path: '/withdrawal'})
    },
    sure () {
      let that = this
      request({
          url: this.public.url + '/agentaccount/addseourl',
          method: 'post',
          data: {
            url: this.value1
          }
        }).then(res => {
          var width = document.body.offsetWidth
          if (res.code == '0') {
            if (width > 768) {
              Message({
              message: '新增成功',
                type: 'success'
                })
            } else {
              Toast({
                  message: '新增成功'
                })
            }
          } else {
            Toast({
                  message: res.message
                })
          }
          that.show4 = !that.show4
          geturllist(that)
          
        }).catch(error => {
        })
    },
    add () {
      let that = this
        request({
          url: that.public.url + '/agentaccount/getagentdomainlist',
          method: 'post',
          data: {
          }
        }).then(res => {
          if (res.code == '0') {
            that.options = res.data.map(val => {
              return val.url
            })
            that.show4 = !that.show4 
          } else {
            Toast({
                message: res.message
              })
          }
        }).catch(error => {
        })
       
    },
    check () {
      // console.log(this.options)
      // console.log(this.value)
    },
    ewm () {
      this.$router.push({path: '/http'})
      // if (this.url == '') {
      //   var width = document.body.offsetWidth
      //   if (width > 768) {
      //   Message({
      //       message: '没有二维码记录',
      //         type: 'error'
      //       })
      //   } else {
      //     Toast({
      //         message: '没有二维码记录'
      //       })
      //   }
      // } else {
      //   this.show3=!this.show3
      // }
    },
    copy (url) {
      if (url == '') {
        var width = document.body.offsetWidth
        if (width > 768) {
        Message({
            message: '没有链接记录',
              type: 'error'
            })
        } else {
          Toast({
              message: '没有链接记录'
            })
        }
      } else {
        var e = document.createElement('input');
        e.value = url;
        document.body.appendChild(e)
        e.select();
        let tag = document.execCommand('Copy')
        e.style.display = 'none'
        var width = document.body.offsetWidth
          if (width > 768) {
        Message({
            message: '复制成功',
              type: 'success'
            })
          } else {
            Toast({
                message: '复制成功'
              })
          }
      }
    },
    yulan () {
      if (this.url.length == 0) {
        var width = document.body.offsetWidth
        if (width > 768) {
        Message({
            message: '没有链接记录',
              type: 'error'
            })
        } else {
          Toast({
              message: '没有链接记录'
            })
        }
      } else {
        if(getweb() == 'true') {
          openWindow(this.url[0])
        } else {
          document.location = 'js://openUrl?url=' + this.url[0]
        }
      }
    }
  }
}
function openWindow(url) {
  window.open(url)
}
function geturllist (that) {
  request({
        url: that.public.url + '/agentaccount/getseourllist',
        method: 'post',
        data: {
          pageno: 1,
          pagerows: 15
        }
      }).then(res => {
        that.url = res.data.list
      }).catch(error => {
      })
}
</script>

<style rel="stylesheet/scss" lang="scss">
  #home{
    .yonghutouxiang{
      width: 30px;
      height: 30px;
    }
  .tuan{
    position: relative;
  }
  .shouyixinxi {
    position: absolute!important;
    left: 86px;
    top: 20px;
    z-index: 200;
  }

  .tishixinxi {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 120px;
    top: 14px;
  }
  .tixianedu{
    color: red;
    background-color: #513663;
    border:0;
    text-align:left;
    font-size:18px;
    width:130px;
    position: absolute;
    left: 90px;
    top: 14px;
  }
  .smallcell {
    flex: 1;
  }
  .smallcell .mint-cell-text{
    font-size: 12px;
    font-weight: 600;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #2e163d;
    text-align: center;
  }

  .fuzhilianjie {
    height: 50px;
    line-height: 50px;
    span:nth-of-type(1){
      height: 50px;
      display: inline-block;
      float: left;
    }
    span:nth-of-type(2){
      height: 50px;
      display: inline-block;
      float: right;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .notice {
    overflow: hidden;
    p{
      white-space: nowrap;
    }
  }
  .v-modal {
    background: white;
    opacity:0;
  }
  .extension {
    .mint-radiolist-title {
      color: red;
    }
  }
  h2 {
    background: #2e163d;
    display: block;
    color: white;
    margin: 0;
    padding: 10px;
    text-align: center;
  }
  .list_button{
    width: 355px;
    height: 50px;
    margin-top: 10px;
    .mint-button--primary{
        margin-left: 17px;
    }
  }




  }

</style>
