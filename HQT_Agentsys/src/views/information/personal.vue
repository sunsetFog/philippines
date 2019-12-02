<template>
  <div class="container">
    <otherheader title="个人信息"></otherheader>
    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" style="width: 1.875rem;height: 1.875rem">
      </mt-cell>
    </div>

    <div class="card">
      <mt-cell title='团队流水（税收分成）' :value="reward">
      </mt-cell>
       <!-- <mt-cell title="日工资" :value="day_wages">
      </mt-cell>
       <mt-cell title="分红" :value="bonus">
      </mt-cell> -->
      
      <mt-cell title="创建时间" :value="create_time">
      </mt-cell>
    </div>


     <!-- <div class="card">
      <mt-cell title="登录密码修改">
        <span @click="changelogin">
          <img slot="icon" src="../../../static/edit.png" style="width: 1.875rem;height: 1.875rem">
        </span>
      </mt-cell>
       <mt-cell title="修改状态">
        <span>
          {{loginpwd | loginpwd}}
        </span>
      </mt-cell>
      <mt-cell title="上次修改">
        <span>
          {{loginpwdtime | loginpwdtime}}
        </span>
      </mt-cell>
    </div> -->

    <div class="card">
      <mt-cell title="资金密码修改">
        <span class="all_palm" @click="js">
          <img slot="icon" src="../../../static/edit.png" style="width: 1.875rem;height: 1.875rem">
        </span>
      </mt-cell>
       <mt-cell title="设定状态">
        <span>
          {{money | loginpwd}}
        </span>
      </mt-cell>
      <mt-cell title="上次修改">
        <span>
          {{moneytime | loginpwdtime}}
        </span>
      </mt-cell>
    </div>


  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
import {
  getname
} from '@/utils/auth'
export default {
  data () {
    return {
      value: '',
      reward: '',
      day_wages: '',
      bonus: '',
      create_time: '',
      loginpwd: '',
      money: '',
      loginpwdtime: '',
      moneytime: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    request({
        url: this.public.url + '/account/getinfo',
        method: 'post',
        data: {
        }
      }).then(res => {
        // this.bonus = res.data.bonus
        // this.day_wages = res.data.day_wages
        this.reward = res.data.reward_team
        this.create_time = res.data.create_time
        this.loginpwd = res.data.loginpwd_status
        this.loginpwdtime = res.data.update_loginpwd_time
        this.money = res.data.moneypwd_status
        this.moneytime = res.data.update_moneypwd_time
      }).catch(error => {
      })
  },
   computed: {
    ...mapGetters([
      'name',
    ]),
  },
  methods: {
    changelogin () {
      this.$router.push({path: '/pwd'})
    },
    js () {
      this.$router.push({path: '/settlement'})
    }
  },
  filters: {
    loginpwd (val) {
      if (val === 0) {
        return '未设定'
      }
      if (val === 1) {
        return '已修改'
      }
    },
    loginpwdtime (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

  .buttonposition {
    position: absolute!important;
    left: 86px;
    top: 10px;
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
