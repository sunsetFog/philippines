<template>
  <div class="container">
    <otherheader title="代理管理"></otherheader>
    <div class="card">
        <mt-cell :title="loginname">
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
       <mt-cell title="最后修改时间" :value="last_time">
      </mt-cell>
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
      value: '',
      reward: '',
      day_wages: '',
      bonus: '',
      create_time: '',
      last_time: '',
      loginname: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    let id = this.$route.query.id
    request({
        url: this.public.url + '/agentaccount/getinfo',
        method: 'post',
        data: {
          user_id : id
        }
      }).then(res => {
        this.bonus = res.data.bonus
        this.day_wages = res.data.day_wages
        this.reward = res.data.reward_team
        this.create_time = res.data.create_time
        this.loginname = res.data.login_name
        if (res.data.update_time === '-1') {
          this.last_time = ''
        } else {
          this.last_time = res.data.update_time
        }
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
    }
  },
  filters: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

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
