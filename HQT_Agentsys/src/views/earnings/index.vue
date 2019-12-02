<template>
  <div class="container earnings">
    <otherheader title="收益详情"></otherheader>


    <div class="card">
      <mt-cell title="我的收益">
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm" @click="show = !show">
          <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">我的收益</div>
        <div style="line-height: 1.25rem;">我的税收收益总和</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm" @click="show1 = !show1">
          <mt-popup
          v-model="show1"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队流水</div>
        <div style="line-height: 1.25rem;">团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm" @click="show2 = !show2">
          <mt-popup
          v-model="show2"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">下级流水</div>
        <div style="line-height: 1.25rem;">团队流水-直属流水</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm" @click="show3 = !show3">
          <mt-popup
          v-model="show3"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">直属流水</div>
        <div style="line-height: 1.25rem;">直属玩家提供的流水总额</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm"  @click="show4 = !show4">
          <mt-popup
          v-model="show4"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队税收</div>
        <div style="line-height: 1.25rem;">团队的税收收益总额（团队总流水*计税税收*团队最高代理分红额度）</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm" @click="show5 = !show5">
          <mt-popup
          v-model="show5"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">下级税收</div>
        <div style="line-height: 1.25rem;">团队税收-直属税收</div>
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
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="mark1 all_palm"  @click="show6 = !show6">
          <mt-popup
          v-model="show6"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">直属税收</div>
        <div style="line-height: 1.25rem;">直属流水*计税税率*自身代理分红比例</div>
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
  .mark1 {
    position: absolute;
    left: 80px;
    top: 15px;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #2e163d;
    text-align: center;
  }

    .earnings .v-modal {
    background: white;
    opacity:0;
  }
</style>
