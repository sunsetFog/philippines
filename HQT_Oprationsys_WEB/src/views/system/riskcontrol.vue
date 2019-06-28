<template>
  <div class="app-container">

<div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:18%;">
            <div class="cell">异常值</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">备注信息</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">附注</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单笔提款金额风险值1</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_one_amt1"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">(用户提款金额大于或等于风险时，系统标红提示)</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单笔提款金额风险值2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_one_amt2"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">(用户提款金额大于或等于风险时，系统标红提示)</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每日提款金额风险开关</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-radio-group v-model="form.wdr_rm_day_amt_switch">
                  <el-radio :label='"0"'>开启</el-radio>
                  <el-radio :label='"1"'>关闭</el-radio>
                </el-radio-group>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>

        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单日提款金额风险值1</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_day_amt1"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单日提款金额风险值2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_day_amt2"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每周提款金额风险开关</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-radio-group v-model="form.wdr_rm_week_amt_switch">
                  <el-radio :label='0'>开启</el-radio>
                  <el-radio :label='1'>关闭</el-radio>
                </el-radio-group>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>

        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每周提款金额风险值1</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_week_amt1"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每周提款金额风险值2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_week_amt2"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每月提款金额风险开关</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-radio-group v-model="form.wdr_rm_month_amt_switch">
                  <el-radio :label='0'>开启</el-radio>
                  <el-radio :label='1'>关闭</el-radio>
                </el-radio-group>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>

        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每月提款金额风险值1</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_month_amt1"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">每月提款金额风险值2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_month_amt2"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">充投比</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                【投注总额】/ 【在线充值 + 上级转账】
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>

         <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">充投比</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_cad_ratio"></el-input><span>%</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
        </tr>

         <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单日活动金额风险值</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_day_activity_amt"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">活动金额大于或者等于风险时，系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">当月活动金额风险值</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_month_activity_amt"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">活动金额大于或者等于风险时，系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">转账次数</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_transacc_count"></el-input><span>次</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">用户转账次数大于或者等于风险时，系统标红提示</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">上下级转账</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_transacc_ullev"></el-input><span>元</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">提现用户上下级转账（包括人工充值和上级充值总和）</div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">单个用户每日系统自动审核超过</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form.wdr_rm_day_atm_count"></el-input><span>次</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">单个用户每日系统自动审核超过次数大于或等于风险时，系统转人工审核</div>
            </td>
        </tr>
        
      </tbody>
    </table>
    
  </div>
</div>


<span style='color:red'>注：提款金额风险值1与提款金额风险值2参数不交集</span>
  <div style="text-align:center">
      <el-button type="primary" @click="sure(form)" style="width: 170px;" v-if="sysconfigriskcontroller">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  filters: {
  },
  data() {
    return {
      status: '',
      form: {
        wdr_rm_one_amt1: '',
        wdr_rm_one_amt2: '',
        wdr_rm_day_amt_switch: '',
        wdr_rm_day_amt1: '',
        wdr_rm_day_amt2: '',
        wdr_rm_week_amt_switch: '',
        wdr_rm_week_amt1: '',
        wdr_rm_week_amt2: '',
        wdr_rm_month_amt_switch: '',
        wdr_rm_month_amt1: '',
        wdr_rm_month_amt2: '',
        wdr_rm_cad_ratio: '',
        wdr_rm_day_activity_amt: '',
        wdr_rm_month_activity_amt: '',
        wdr_rm_transacc_count: '',
        wdr_rm_transacc_ullev: '',
        wdr_rm_day_atm_count: ''
      }
    }
  },
  created() { 
    getlist(this)
  },
  computed: {
    ...mapGetters([
      'sysconfigriskcontroller'
    ])
  },
  methods: {
    sure (form) {
      let that = this
       request({
        url: that.public.url + '/backend/sysconfig/riskcontroller',
        method: 'post',
        data: {
          wdr_rm_one_amt1: this.form.wdr_rm_one_amt1,
          wdr_rm_one_amt2: this.form.wdr_rm_one_amt2,
          wdr_rm_day_amt_switch: this.form.wdr_rm_day_amt_switch,
          wdr_rm_day_amt1: this.form.wdr_rm_day_amt1,
          wdr_rm_day_amt2: this.form.wdr_rm_day_amt2,
          wdr_rm_week_amt_switch: this.form.wdr_rm_week_amt_switch,
          wdr_rm_week_amt1: this.form.wdr_rm_week_amt1,
          wdr_rm_week_amt2: this.form.wdr_rm_week_amt2,
          wdr_rm_month_amt_switch: this.form.wdr_rm_month_amt_switch,
          wdr_rm_month_amt1: this.form.wdr_rm_month_amt1,
          wdr_rm_month_amt2: this.form.wdr_rm_month_amt2,
          wdr_rm_cad_ratio: this.form.wdr_rm_cad_ratio,
          wdr_rm_day_activity_amt: this.form.wdr_rm_day_activity_amt,
          wdr_rm_month_activity_amt: this.form.wdr_rm_month_activity_amt,
          wdr_rm_transacc_count: this.form.wdr_rm_transacc_count,
          wdr_rm_transacc_ullev: this.form.wdr_rm_transacc_ullev,
          wdr_rm_day_atm_count: this.form.wdr_rm_day_atm_count,
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        })
      }).catch(error => {
      })
    }
  }
}

function getlist (that) {
  request({
    url: that.public.url + '/sysconfig/getconfiginfo',
    method: 'post',
    data: {
      type: 2
    }
  }).then(res => {
    that.form = res.data
  }).catch(error => {
  })
}


</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
