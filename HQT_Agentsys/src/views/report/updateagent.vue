<template>
  <div class="container">
    <otherheader title="代理管理"></otherheader>

    <div class="card">
        <mt-cell :title="agentname">
        <img slot="icon" src="../../../static/user.png" width="30" height="30">
      </mt-cell>
    </div>

    <div class="card">
        <!-- <mt-field label="日工资" v-model="day" placeholder="请输入日工资"></mt-field> -->
        <mt-field label="团队流水" v-model="reward" placeholder="请输入团队流水（税收）分成"></mt-field>
        <!-- <mt-field label="分红" v-model="bonus" placeholder="请输入分红"></mt-field> -->
    </div>

     <div class="card">
         <mt-button type="primary" size="large" @click="sure">修改</mt-button>
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
      id: '',
      agentname: ''
    }
  },
  components: { otherheader },
  created() {
    let that = this
    this.id = this.$route.query.id
    request({
        url: this.public.url + '/agentaccount/getinfo',
        method: 'post',
        data: {
          user_id : this.id
        }
      }).then(res => {
        this.agentname = res.data.login_name
      }).catch(error => {
      })
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  methods: {
    sure () {
      let that = this
      request({
        url: this.public.url + '/agentaccount/updatequota',
        method: 'post',
        data: {
          user_id: this.id,
          // day_wages: this.day,
          reward_team: this.reward,
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
</style>
