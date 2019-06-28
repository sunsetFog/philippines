<template>
  <div class="container home">
    <MtHeader></MtHeader>
    <!-- <div class="notice">
       <p>
         <span>aaaaaaa</span>
         <span>aaaaaaa</span>
         <span>aaaaaaa</span>
         <span>aaaaaaa</span>
         <span>aaaaaaa</span>
         <span>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息</span>
        </p>
    </div> -->
    <div class="card">
        <mt-cell :title="name" is-link  to="/personal">
        <span style="color:#a16ec2">更多</span>
        <img slot="icon" src="../../../static/user.png" width="30" height="30">
      </mt-cell>
    </div>

    <div class="card tuan">
      <mt-switch v-model="value" class="buttonposition"></mt-switch>
        <mt-cell title="收益信息">
          <!-- <span>详情</span> -->
        </mt-cell>
      <mt-cell title="团队总流水">
        <span><input :type="value || false ? '' :'password'"  style="color: black;font-weight:800;border:0;background:#513663;text-align:right" :value="total_team_flow" disabled></span>
        <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="popup = !popup">
        <mt-popup
          v-model="popup"
          popup-transition='popup-fade'
        >
        团队总流水:团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
      <mt-cell title="今日团队总流水" :label="team_flow"  class="smallcell" style="border-right: 1px solid #2e163d;">
        <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="show = !show">
        <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        今日团队总流水:今天团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）
        </mt-popup>
      </mt-cell>
      <mt-cell title="今日个人税收收益" :label="self_tax"  class="smallcell">
        <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="show1 = !show1">
        <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        今日个人税收收益:今天团队税收收益总额-所有直属代理团队税收收益总额
        </mt-popup>
      </mt-cell>
      </div>
      <mt-cell title="提现额度：">
        <span class="mark" style="left:90px"><input :type="value || false? '' :'password'"  style="color: red;border:0;background:#513663;text-align:left;font-size:18px;width:100%;" :value="balance" disabled></span>
        <mt-button type="primary" size="small" @click="withdrawal" style="width:122px height:34px;background:#2e163d;color:#a16ec2;border:0;">立即提现</mt-button>
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

    <div class="card">
      <mt-cell title="推广链接" is-link to='/http'>
        <span style="color:#a16ec2">更多</span>
      </mt-cell>
      <span class="http">{{url}}</span>
      <div style="display: flex; background:#2e163d;">
          <mt-button type="primary" size="small"  style="flex: 1; margin:10px;" @click="copy">复制链接</mt-button>
          <mt-button type="primary" size="small" style="flex: 1;margin:10px;" @click="ewm">查看二维码</mt-button>
          <mt-button type="primary" size="small" style="flex: 1;margin:10px;" @click="yulan">预览链接</mt-button>
      </div>
    </div>

     <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
        >
        <vueqr :size='text' :text='url'></vueqr>
        </mt-popup>


  </div>
</template>

<script>
import MtHeader from './header'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
import vueqr from 'vue-qr'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      value: true,
      popup: false,
      show: false,
      show1: false,
      show3: false,
      username: '',
      text: 200,
      url: '',
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
      yesterday_add_uagent_num: ''
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
    ewm () {
      if (this.url == '') {
        var width = document.body.offsetWidth
        if (width > 768) {
        Message({
            message: '没有二维码记录',
              type: 'error'
            })
        } else {
          Toast({
              message: '没有二维码记录'
            })
        }
      } else {
        this.show3=!this.show3
      }
    },
    copy () {
      if (this.url == '') {
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
        e.value = this.url;
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
      if (this.url == '') {
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
        openWindow(this.url)
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
        that.url = res.data.list[0].url
      }).catch(error => {
      })
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .home .card {
    margin: 10px;
    border-top: 1px solid #2e163d;
    border-bottom: 1px solid #2e163d;
    border-left: 2px solid #2e163d;
    border-right: 2px solid #2e163d;
    border-radius: 12px;
    position: relative;
    .mint-popup {
      position: absolute;
      width: 80%;
    left: 50%;
    top: 120%;
    background: #26a2ff;
    color: white;
        padding: 2% 8%;
    font-size: 12px;
    }
  }
  .buttonposition {
    position: absolute!important;
    left: 86px;
    top: 10px;
    z-index: 200;
  }
  .mark {
    position: absolute;
    left: 120px;
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
  // .blue {
  //   color: #26a2ff;
  // }
  .http {
    display: block;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
  .notice {
    overflow: hidden;
    p{
      white-space: nowrap;
    }
  }
  .home .tuan .v-modal {
    background: white;
    opacity:0;
  }
</style>
