<template>
  <div class="app-container">
    <h3>红包扫雷设置</h3>
  <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:15%;">
              <div class="cell">发包间隔时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <p style="margin-left:100px">间隔时间(秒)</p>
                <p>
                  <span style="width:100px;display: inline-block;">最小间隔</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_min_interval}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_min_interval" v-else></el-input>
                  </span>
                  <span>秒</span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">最大间隔</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_max_interval}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_max_interval" v-else></el-input>
                  </span>
                  <span>秒</span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">间隔递增幅度</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_incr_interval}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_incr_interval" v-else></el-input>
                  </span>
                  <span>秒</span>
                </p>
              </div>
            </td>
                   
        </tr>
        <tr>
           <td crowspan="1" colspan="1" style="width:15%;">
              <div class="cell">发包类型设定</div>
            </td>
           <td crowspan="1" colspan="1">
              <div class="cell">
                <p>
                  <span style="width:100px;display: inline-block;">红包类型</span>
                  <span>权重（正整数）</span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">10包1倍</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_weight_10b1}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_weight_10b1" v-else></el-input>
                  </span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">7包1.5倍</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_weight_7b1d5}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_weight_7b1d5" v-else></el-input>
                  </span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">5包两倍</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_weight_5b2}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_weight_5b2" v-else></el-input>
                  </span>
                </p>
              </div>
            </td>
        </tr>
        <tr>
           <td crowspan="1" colspan="1" style="width:15%;">
              <div class="cell">发包金额设定</div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <p style="margin-left:100px">金额（元，10的正倍数）</p>
                <p>
                  <span style="width:100px;display: inline-block;">最小金额</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_min_money}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_min_money" v-else></el-input>
                  </span>
                  <span>元</span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">最大金额</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_max_money}}</span>
                    <el-input clearable style="width: 200px;" type="number" v-model="form2.srp_max_money" v-else></el-input>
                  </span>
                  <span>元</span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">金额递增幅度</span>
                  <span>
                    <span v-if="spanshow">{{form2.srp_incr_money}}</span>
                    <el-input clearable style="width: 200px;" type="number"  v-model="form2.srp_incr_money" v-else></el-input>
                  </span>
                  <span>元</span>
                </p>
              </div>
            </td>
        </tr>

        <tr>
          <td crowspan="1" colspan="1" style="width:15%;">
              <div class="cell">AI抢包权重</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <p style="margin-left:100px">权重（正整数）</p>
                <p>
                  <span style="width:100px;display: inline-block;">抢包</span>
                  <span>
                    <span v-if="spanshow">{{form2.ai_grp_weight}}</span>
                    <el-input clearable style="width: 200px;" type="number"  v-model="form2.ai_grp_weight" v-else></el-input>
                  </span>
                </p>
                <p>
                  <span style="width:100px;display: inline-block;">不抢包</span>
                  <span>
                    <span v-if="spanshow">{{form2.ai_ngrp_weight}}</span>
                    <el-input clearable style="width: 200px;" type="number"  v-model="form2.ai_ngrp_weight" v-else></el-input>
                  </span>
                </p>
              </div>
            </td>
        </tr>
      
        
      </tbody>
    </table> 
    
  </div>


<div style="text-align:center;margin-top:10px;margin-bottom:10px;">
     <el-button type="primary" @click="sure3" style="width: 170px;" v-if="gamesetredpacketaiset && !spanshow">保存配置</el-button>
      <el-button type="primary" @click="reset()" style="width: 170px;" v-if="!spanshow">取消</el-button>
      <el-button type="primary" @click="edit()" style="width: 170px;" v-if="spanshow">修改配置</el-button>
</div>
  
</div>




            


  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
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
      formLabelWidth: '180px',
      spanshow: true
    }
  },
  created() {
    getlist(this)
  },
  computed: {
    ...mapGetters([
      'gamesetredpacketaiset'
    ])
  },
  watch: {
  },
  filters: {
  },
  methods: {
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
            that.spanshow = true
          }).catch(error => {
          })
        }).catch(error => {
        })
    },
    edit () {
      this.spanshow = false
    },
    reset () {
      this.spanshow = true
      getlist(this)
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
      that.form2 = res.data
    }).catch(error => {
    })
}





</script>

<style>
</style>
