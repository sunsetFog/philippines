<template>
  <div class="container">
    <otherheader title="玩家信息"></otherheader>
    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" width="30" height="30">
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='账号信息'>
      </mt-cell>
      <mt-cell title='账户余额' :value="balance">
      </mt-cell>
       <mt-cell title="账号性质">
         <span>
           {{type}}
         </span>
      </mt-cell>
       <mt-cell title="建立时间" :value="create_time">
      </mt-cell>
      
      <mt-cell title="上级代理" :value="agent_name">
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='游戏状态'>
      </mt-cell>
      <mt-cell title='游戏流水' :value="flow">
      </mt-cell>
       <mt-cell title="最后活跃时间" :value="last_login_time">
      </mt-cell>
    </div>

  <mt-button type='primary' size='large' @click="close">关闭</mt-button>

  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      id: '',
      last_login_time: '',
      flow: '',
      create_time: '',
      balance: '',
      type: '',
      agent_name: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    var url = window.location.href;
    if (url.indexOf('?')!='-1') {
      this.id = url.split('?')[1]
    }
    request({
        url: this.public.url + '/playerreport/getplayerinfo',
        method: 'post',
        data: {
          player_id: this.id
        }
      }).then(res => {
        that.agent_name = res.data.agent_name
        that.type = res.data.type
        that.balance = res.data.balance
        that.create_time = res.data.create_time
        that.flow = res.data.flow
        that.last_login_time = res.data.last_login_time
      }).catch(error => {
      })
  },
   computed: {
    ...mapGetters([
      'name',
    ]),
  },
  methods: {
    close () {
      this.$router.push({path: '/'})
    }
  },
  filters: {
    type (val) {
      if (val === '1') {
        return '玩家'
      }
      if (val === '2') {
        return '游客'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .card {
    margin: 10px;
    border-top: 1px solid #2e163d;
    border-bottom: 1px solid #2e163d;
    border-left: 2px solid #2e163d;
    border-right: 2px solid #2e163d;
    border-radius: 12px;
    position: relative;
  }
  .mark {
    position: absolute;
    left: 120px;
    top: 14px;
  }
  .smallcell {
    width: 50%;
    float: left;
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
</style>
