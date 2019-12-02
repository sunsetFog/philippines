<template>
  <div class="container updateagent">
    <otherheader title="修改税收"></otherheader>

    <div class="card">
        <mt-cell :title="agentname">
        <img slot="icon" src="../../../static/user.png" style="width: 1.875rem;height: 1.875rem">
      </mt-cell>
    </div>

    <div class="card">
        <!-- <mt-field label="日工资" v-model="day" placeholder="请输入日工资"></mt-field> -->
        <!-- <mt-field label="已生效税收比例" v-model="reward" placeholder="请输入团队流水（税收）分成"></mt-field> -->
        <!-- <mt-field label="分红" v-model="bonus" placeholder="请输入分红"></mt-field> -->
        <mt-cell title="已生效税收比例:">
          <span>{{reward}}</span>
        </mt-cell>
        <mt-cell title="剩余配额:">
        <span class="mark">{{pei | pei}}</span>
        </mt-cell>
        <mt-cell title="修改后税收比例:">
          <span class="mark">{{proportion}}</span>
          <span class="all_palm" @click="select()">请选择</span>
        </mt-cell>
        <div>
          <mt-cell title=""  v-if="pickershow">
          <span class="all_palm" @click="sure1">确定</span>
        </mt-cell>
          <mt-picker :slots="datalist"  v-if="pickershow" valueKey="reward"  :show-toolbar='true' @change="valuechange"></mt-picker>
      </div>
    </div>

     <div class="card">
         <mt-button type="primary" size="large" class="all_palm" @click="sure">修改</mt-button>
     </div>



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { request } from '@/utils/request'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      day: '',
      reward: '',
      bonus: '',
      userid: '',
      agentname: '',
      pickershow: false,
      pei: '',
      id: '',
      platdata: [],
      proportion: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    this.userid = this.$route.query.id
    request({
        url: this.public.url + '/agentaccount/getinfo',
        method: 'post',
        data: {
          user_id : this.userid
        }
      }).then(res => {
        that.agentname = res.data.login_name
        that.reward = res.data.reward_team
        that.platdata = res.data.quota
      }).catch(error => {
      })
  },
  filters: {
    pei (val) {
      if (val == '-1') {
        return '无限制'
      } else {
        return val
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
    datalist () {
        let dataslot = [
          {
            flex: 1,
            values: this.platdata,
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      return dataslot
    }
  },
  methods: {
    select() {
      this.pickershow = !this.pickershow
    },
    valuechange (picker, values) {
      let that = this
      this.proportion = values[0].reward
      this.platdata.map(val =>{
        if (val.reward == this.proportion) {
          that.pei = val.surplus_num
        }
      })
    },
    sure1() {
      let that = this
      this.pickershow = !this.pickershow
    },
    sure () {
      let that = this
      if (this.proportion === '') {
        Toast({
          message: '请输入修改后税收比例'
        })
        return
      }
      request({
        url: this.public.url + '/agentaccount/updatequota',
        method: 'post',
        data: {
          user_id: this.userid,
          // day_wages: this.day,
          reward_team: this.proportion,
          quota_num: this.pei
          // bonus: this.bonus
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
        that.$router.go(-1)
      }).catch(error => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.updateagent .mark {
    position: absolute;
    left: 140px;
    top: 12px;
    color: red;
    font-size: 20px;
  }
</style>
