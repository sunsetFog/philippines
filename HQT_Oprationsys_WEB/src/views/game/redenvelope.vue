<template>
  <div class="app-container">
       <el-tabs type='card' v-model="actionname" @tab-click='tabclick'>
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>红包扫雷</span>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="depict">
              <el-input v-model="form.depict" type="textarea" style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>可用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" @click="sure(form)" v-if="gamesetsavebase">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
         <el-tab-pane label="配置项" v-if="gamesetredpacketlist">
           <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:10%;">
            <div class="cell"></div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">抽水率</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">抢红包时间</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">红包最高倍数</div>
          </th>
          <th colspan='1' rowspan="1" style="width:30%;">
            <div class="cell">操作</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:10%;background: #bdd7ee;color: black;font-weight: 600;">
              <div class="cell">红包扫雷</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="name" v-model="fishlist2.royalty" type="number"></el-input>
                <span v-else>{{fishlist.royalty | rate}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="name" v-model="fishlist2.get_time" type="number"></el-input>
                <span v-else>{{fishlist.get_time | time}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="name" v-model="fishlist2.max_multiple" type="number"></el-input>
                <span v-else>{{fishlist.max_multiple | max}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1" style="width:30%;">
              <div class="cell">
                <el-button type="primary" v-if="name && gamesetredpacketset" @click="sure2">保存</el-button>
                <el-button type="primary" v-if="name" @click="reset">取消</el-button>
                <el-button type="primary" v-else @click="name = true">修改</el-button>
              </div>
            </td>
        </tr>

        
        
  
        
        
        
      </tbody>
    </table>
    
  </div>
</div>
            

        </el-tab-pane>

      </el-tabs>


  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        depict: '',
        status: ''
      },
      form2: {
        srp_min_interval: '',
        srp_max_interval: '',
        srp_incr_interval: '',
        srp_weight_10b1: '',
        srp_weight_7b1d5: '',
        srp_weight_5b2: '',
        srp_min_money: '',
        srp_max_money: '',
        srp_incr_money: '',
        ai_grp_weight: '',
        ai_ngrp_weight: ''
      },
      rules: {
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      actionname: '',
      name: false,
      formLabelWidth: '180px',
      fishlist: {},
      fishlist2: {}
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetredpacketset',
      'gamesetredpacketlist',
      'gamesetredpacketaiset'
    ])
  },
  watch: {
  },
  filters: {
    rate: function (val) {
      let newval = accmul(val*1,100)
      return newval + '%'
    },
    time: function (val) {
      return val + '秒'
    },
    max: function (val) {
      return val + '倍'
    }
  },
  methods: {
    tabclick () {
      if (this.actionname === '1') {
        getlist(this)
      }
      if (this.actionname === '2') {
        getlist(this)
      }
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: '91',
                  depict: this.form.depict,
                  status: this.form.status
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            getinfo(that)
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
    sure2 () {
      let that = this
      if (that.fishlist2.royalty *1 < 0) {
        that.$message.error('抽税率为正数')
        return false
      }
      if (that.fishlist2.get_time *1 < 0) {
        that.$message.error('抢红包时间为正数')
        return false
      }
      if (that.fishlist2.max_multiple *1 < 0) {
        that.$message.error('红包最高倍数为正数')
        return false
      }
      that.$confirm('', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
      request({
            url: that.public.url + '/gameset/redpacketset',
            method: 'post',
            data: {
                  game_ids: '91',
                  royalty: this.fishlist2.royalty,
                  get_time: this.fishlist2.get_time,
                  max_multiple: this.fishlist2.max_multiple,
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
            that.name = false
          }).catch(error => {
          })
        }).catch(error => {
        })
    },
    sure3 () {
      let that = this
      let test = /^[1-9][0-9]*0$/
      if (this.form2.srp_min_interval =='' || this.form2.srp_min_interval*1 < 0) {
        that.$message.error('请输入最小间隔且值不能小于0')
        return false
      }
      if (this.form2.srp_max_interval =='' || this.form2.srp_max_interval*1 < 0) {
        that.$message.error('请输入最大间隔且值不能小于0')
        return false
      }
      if (this.form2.srp_incr_interval =='' || this.form2.srp_incr_interval*1 < 0) {
        that.$message.error('请输入间隔递增幅度且值不能小于0')
        return false
      }
      if (this.form2.srp_weight_10b1 =='' || this.form2.srp_weight_10b1*1 < 0 || this.form2.srp_weight_10b1.indexOf('.') > 0) {
        that.$message.error('请输入10包1倍且值为正整数')
        return false
      }
      if (this.form2.srp_weight_7b1d5 =='' || this.form2.srp_weight_7b1d5*1 < 0 || this.form2.srp_weight_7b1d5.indexOf('.') > 0) {
        that.$message.error('请输入7包1.5倍且值为正整数')
        return false
      }
      if (this.form2.srp_weight_5b2 =='' || this.form2.srp_weight_5b2*1 < 0 || this.form2.srp_weight_5b2.indexOf('.') > 0) {
        that.$message.error('请输入5包两倍且值为正整数')
        return false
      }
      if (this.form2.srp_min_money =='' || this.form2.srp_min_money*1 < 0 || !test.test(this.form2.srp_min_money)) {
        that.$message.error('请输入最小金额且值为10的倍数')
        return false
      }
      if (this.form2.srp_max_money =='' || this.form2.srp_max_money*1 < 0 || !test.test(this.form2.srp_max_money)) {
        that.$message.error('请输入最大金额且值为10的倍数')
        return false
      }
      if (this.form2.srp_incr_money =='' || this.form2.srp_incr_money*1 < 0 || !test.test(this.form2.srp_incr_money)) {
        that.$message.error('请输入金额递增幅度且值为10的倍数')
        return false
      }
      if (this.form2.ai_grp_weight =='' || this.form2.ai_grp_weight*1 < 0  || this.form2.ai_grp_weight.indexOf('.') > 0) {
        that.$message.error('请输入抢包金额且值为正整数')
        return false
      }
      if (this.form2.ai_ngrp_weight =='' || this.form2.ai_ngrp_weight*1 < 0  || this.form2.ai_ngrp_weight.indexOf('.') > 0) {
        that.$message.error('请输入不抢包金额且值为正整数')
        return false
      }
      that.$confirm('', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
      request({
            url: that.public.url + '/gameset/redpacketaiset',
            method: 'post',
            data: {
              srp_min_interval: this.form2.srp_min_interval,
              srp_max_interval: this.form2.srp_max_interval,
              srp_incr_interval: this.form2.srp_incr_interval,
              srp_weight_10b1: this.form2.srp_weight_10b1,
              srp_weight_7b1d5: this.form2.srp_weight_7b1d5,
              srp_weight_5b2: this.form2.srp_weight_5b2,
              srp_min_money: this.form2.srp_min_money,
              srp_max_money: this.form2.srp_max_money,
              srp_incr_money: this.form2.srp_incr_money,
              ai_grp_weight: this.form2.ai_grp_weight,
              ai_ngrp_weight: this.form2.ai_ngrp_weight
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
          }).catch(error => {
          })
        }).catch(error => {
        })
    },
    reset () {
      getlist(this)
      this.name = false
    }
  }
}



function parseTime(time) {
    var date = new Date(time *1000);
    let y = date.getFullYear() + '-'
    let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
    let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
    let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
    let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
    return y+m+d+h+i+s
}


function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: '91'
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}


function accmul(num1,num2) {
			var m=0,s1=num1.toString(),s2=num2.toString(); 
      try{m+=s1.split(".")[1].length}catch(e){};
      try{m+=s2.split(".")[1].length}catch(e){};
      return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		}


function getlist (that) {
  request({
      url: that.public.url + '/gameset/redpacketlist',
      method: 'post',
      data: {
        game_id: 91
      }
    }).then(res => {
      that.fishlist = res.data
      that.fishlist2 = res.data
      that.form2 = res.data
    }).catch(error => {
    })
}


// function getlist2 (that) {
//   request({
//       url: that.public.url + '/gameset/redpacketlist',
//       method: 'post',
//       data: {
//         game_id: 91
//       }
//     }).then(res => {
//       that.fishlist = res.data
//       that.fishlist2 = res.data
//     }).catch(error => {
//     })
// }



</script>

<style>
</style>
