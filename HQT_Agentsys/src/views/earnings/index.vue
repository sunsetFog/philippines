<template>
  <div class="container earnings">
    <otherheader title="收益详情"></otherheader>


    <div class="card">
      <mt-cell title="我的收益">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1" @click="show = !show">
          <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        我的收益：我的税收收益总和
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="my_income.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="my_income.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="my_income.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

    <div class="card">
      <mt-cell title="团队流水">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1" @click="show1 = !show1">
          <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        团队流水：团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="group_flow.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="group_flow.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="group_flow.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="下级流水">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1" @click="show2 = !show2">
          <mt-popup
          v-model="show2"
          popup-transition='popup-fade'
        >
        下级流水：团队流水-直属流水
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="child_flow.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="child_flow.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="child_flow.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="直属流水">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1" @click="show3 = !show3">
          <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
        >
        直属流水：直属玩家提供的流水总额
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="direct_flow.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="child_flow.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="child_flow.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="团队税收">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1"  @click="show4 = !show4">
          <mt-popup
          v-model="show4"
          popup-transition='popup-fade'
        >
        团队税收：团队的税收收益总额（团队总流水*计税税收*团队最高代理分红额度）
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="group_reward.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="group_reward.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="group_reward.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="下级税收">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1" @click="show5 = !show5">
          <mt-popup
          v-model="show5"
          popup-transition='popup-fade'
        >
        下级税收：团队税收-直属税收
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="child_reward.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="child_reward.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="child_reward.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>

     <div class="card">
      <mt-cell title="直属税收">
          <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark1"  @click="show6 = !show6">
          <mt-popup
          v-model="show6"
          popup-transition='popup-fade'
        >
        直属税收：直属流水*计税税率*自身代理分红比例
        </mt-popup>
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="总计" :label="direct_reward.total"  class="threecell">
        </mt-cell>
        <mt-cell title="今日" :label="direct_reward.today"  class="threecell">
        </mt-cell>
        <mt-cell title="昨日" :label="direct_reward.yersterday"  class="threecell">
        </mt-cell>
      </div>
    </div>


  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { request } from '@/utils/request'
export default {
  // components: { MtHeader },
  data () {
    return {
      value: '',
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      child_flow: {},
      child_reward: {},
      direct_flow: {},
      direct_reward: {},
      group_flow:{},
      group_reward: {},
      my_income: {}
    }
  },
  components: { otherheader },
  created() {
    let that = this
    request({
      url: that.public.url + '/account/getincomeinfo',
      method: 'post',
      data: {
      }
    }).then(res => {
      that.child_flow = res.data.child_flow
      that.child_reward = res.data.child_reward
      that.direct_flow = res.data.direct_flow
      that.direct_reward = res.data.direct_reward
      that.group_flow = res.data.group_flow
      that.group_reward = res.data.group_reward
      that.my_income = res.data.my_income
    }).catch(error => {
    })
  },
  methods: {
  }
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
  .mark1 {
    position: absolute;
    left: 80px;
    top: 15px;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #d9d9d9;
    text-align: center;
  }
  .earnings .mint-popup {
      position: absolute;
      width: 80%;
    left: 50%;
    top: 120%;
    background: #26a2ff;
    color: white;
        padding: 2% 8%;
    font-size: 12px;
    }
    .earnings .v-modal {
    background: white;
    opacity:0;
  }
</style>
