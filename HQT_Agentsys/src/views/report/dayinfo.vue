<template>
  <div class="container dayinfo">
    <otherheader title="日度报表"></otherheader>
    <div class="card">
        <mt-cell :title="date">
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='税收'>
      </mt-cell>
      <mt-cell title='团队总流水'>
        <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="show1 = !show1">
        <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        团队总流水：团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）
        </mt-popup>
        <span>{{team_flow}}</span>
      </mt-cell>
       <mt-cell title="团队税收收益">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="show2 = !show2">
        <mt-popup
          v-model="show2"
          popup-transition='popup-fade'
        >
        团队税收收益：团队的税收收益总额（团队总流水*计税税率*团队最高代理分红额度）
        </mt-popup>
        <span>{{team_tax}}</span>
      </mt-cell>
      
      <mt-cell title="个人税收收益">
        <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="show3 = !show3">
        <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
        >
        个人税收收益：团队税收收益总额-所有直属代理团队税收收益总额
        </mt-popup>
        <span>{{agent_tax}}</span>
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='充值信息'>
      </mt-cell>
      <mt-cell title='总充值' :value="recharge_money">
      </mt-cell>
       <mt-cell title="总提现" :value="withdraw_money">
      </mt-cell>
    </div>

     <div class="card">
      <mt-cell title="我的代理"></mt-cell>
      <div style="display: flex">
        <mt-cell title="" class="twocelll">
        </mt-cell>
        <mt-cell title="总数"  class="twocelll">
        </mt-cell>
        <mt-cell title="今日新增"  class="twocelll">
        </mt-cell>
      </div>
       <div style="display: flex">
        <mt-cell title="代理"  class="twocelll">
        </mt-cell>
        <mt-cell :title="agent_total_num"  class="twocelll">
        </mt-cell>
        <mt-cell :title="add_agent_num"  class="twocelll">
        </mt-cell>
      </div>
      <div style="display: flex">
        <mt-cell title="玩家" class="twocelll">
        </mt-cell>
        <mt-cell :title="user_total_num"  class="twocelll">
        </mt-cell>
        <mt-cell :title="add_user_num"  class="twocelll">
        </mt-cell>
      </div>
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
      team_flow: '',
      team_tax: '',
      agent_tax: '',
      recharge_money: '',
      withdraw_money: '',
      date: '',
      show1: false,
      show2: false,
      show3: false,
      agent_total_num: '',
      add_agent_num: '',
      user_total_num: '',
      add_user_num: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    var url = window.location.href;
    if (url.indexOf('?')!='-1') {
      this.date = url.split('?')[1]
    }
    request({
        url: this.public.url + '/dayreport/getdayinfo',
        method: 'post',
        data: {
          date: this.date
        }
      }).then(res => {
        that.team_flow = res.data.team_flow
        that.team_tax = res.data.team_tax
        that.agent_tax = res.data.agent_tax
        that.recharge_money = res.data.recharge_money
        that.withdraw_money = res.data.withdraw_money
        that.agent_total_num = res.data.agent_total_num
        that.add_agent_num = res.data.add_agent_num
        that.user_total_num = res.data.user_total_num
        that.add_user_num = res.data.add_user_num
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .dayinfo .card {
    margin: 10px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    border-left: 2px solid #d9d9d9;
    border-right: 2px solid #d9d9d9;
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
    .v-modal {
    background: white;
    opacity:0;
  }
  }
  .buttonposition {
    position: absolute!important;
    left: 86px;
    top: 7px;
    z-index: 200;
  }
  .mark {
    position: absolute;
    left: 120px;
    top: 15px;
  }
  .smallcell {
    width: 50%;
    float: left;
    border-right: 1px solid #d9d9d9;
  }
  .smallcell .mint-cell-text{
    font-size: 12px;
    font-weight: 600;
  }
  .twocelll {
    float: left;
    flex: 1;
    text-align: center;
  }
</style>
