<template>
  <div class="container dayinfo">
    <otherheader title="团队报表"></otherheader>
    <div class="card">
        <mt-cell :title="name">
          <img slot="icon" src="../../../static/user.png" style="width: 1.875rem;height: 1.875rem">
          <span class="all_palm" @click="back">返回</span>
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='税收'>
      </mt-cell>
      <mt-cell title='团队总流水'>
        <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark all_palm" @click="show1 = !show1">
        <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队总流水</div>
        <div style="line-height: 1.25rem;">团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）</div>
        </mt-popup>
        <span>{{team_flow}}</span>
      </mt-cell>
       <mt-cell title="团队税收收益">
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark all_palm" @click="show2 = !show2">
        <mt-popup
          v-model="show2"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队税收收益</div>
        <div style="line-height: 1.25rem;">团队的税收收益总额（团队总流水*计税税率*团队最高代理分红额度）</div>
        </mt-popup>
        <span>{{team_tax}}</span>
      </mt-cell>
      
      <mt-cell title="个人税收收益">
        <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark all_palm" @click="show3 = !show3">
        <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">个人税收收益</div>
        <div style="line-height: 1.25rem;">团队税收收益总额-所有直属代理团队税收收益总额</div>
        </mt-popup>
        <span>{{self_tax}}</span>
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='充值信息'>
      </mt-cell>
      <mt-cell title='总充值' :value="team_recharge_money">
      </mt-cell>
       <!-- <mt-cell title="总提现" :value="withdraw_money">
      </mt-cell> -->
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
        <mt-cell :title="team_agent_num"  class="twocelll">
        </mt-cell>
        <mt-cell :title="add_agent_num"  class="twocelll">
        </mt-cell>
      </div>
      <div style="display: flex">
        <mt-cell title="玩家" class="twocelll">
        </mt-cell>
        <mt-cell :title="team_user_num"  class="twocelll">
        </mt-cell>
        <mt-cell :title="add_user_num"  class="twocelll">
        </mt-cell>
      </div>
    </div>
<div class="card">
  <mt-button type='primary' size='large' class="all_palm" @click="close">关闭</mt-button>
</div>
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
      self_tax: '',
      team_recharge_money: '',
      withdraw_money: '',
      date: '',
      show1: false,
      show2: false,
      show3: false,
      team_agent_num: '',
      add_agent_num: '',
      team_user_num: '',
      add_user_num: ''
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
        url: this.public.url + '/teamreport/getlist',
        method: 'post',
        data: {
          agent_id: this.id,
          single: 1
        }
      }).then(res => {
        that.team_flow = res.data.list[0].team_flow
        that.team_tax = res.data.list[0].team_tax
        that.self_tax = res.data.list[0].self_tax
        that.team_recharge_money = res.data.list[0].team_recharge_money
        that.withdraw_money = res.data.list[0].withdraw_money
        that.team_agent_num = res.data.list[0].team_agent_num
        that.add_agent_num = res.data.list[0].add_agent_num
        that.team_user_num = res.data.list[0].team_user_num
        that.add_user_num = res.data.list[0].add_user_num
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
    },
    back () {
      this.$router.go(-1)
    }
  },
  filters: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .dayinfo{

    .v-modal {
    background: white;
    opacity:0;
  }
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
  .twocelll {
    float: left;
    flex: 1;
    text-align: center;
  }
</style>
