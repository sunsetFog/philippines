<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-form-item label="开始日期">
              <el-date-picker
              v-model="formInline.starttime"
              :editable="false"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束日期">
              <el-date-picker
              v-model="formInline.endtime"
              :editable="false"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="businessdealdayreportgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background
      layout="prev, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    </div>

    <el-table
    :data="tableData"
    :row-class-name="tableclassname"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="adate"
      width="100"
      label="日期">
    </el-table-column>
     <el-table-column
      prop="user_logined_num"
      width="100"
      label="登录用户">
    </el-table-column>
    <el-table-column
      prop="user_active_num"
      width="100"
      label="活跃用户">
    </el-table-column>
    <el-table-column
      prop="user_recharge_num"
      width="100"
      label="充值用户">
    </el-table-column>
    <el-table-column
      prop="user_recharge_money"
      width="100"
      label="充值金额">
    </el-table-column>
    <el-table-column
      width="100"
      prop="user_withdraw_num"
      label="玩家提款用户">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_money"
      width="100"
      label="玩家提款金额">
    </el-table-column>
    <el-table-column
      prop="agent_withdraw_num"
      width="100"
      label="代理提款用户">
    </el-table-column>
    <el-table-column
      prop="agent_withdraw_money"
      width="100"
      label="代理提款金额">
    </el-table-column>
    <el-table-column
      prop="flow_money"
      width="100"
      label="流水">
    </el-table-column>
    <el-table-column
      prop="user_lose_money"
      width="100"
      label="玩家输额">
    </el-table-column>
    <el-table-column
      prop="user_win_money"
      width="100"
      label="玩家赢额">
    </el-table-column>
    <el-table-column
      prop="tax"
      width="100"
      label="税收">
    </el-table-column>
    <el-table-column
      prop="rb_ratio"
      width="100"
      label="充投比">
    </el-table-column>
    <el-table-column
      prop="gross_profit"
      width="100"
      label="平台毛利">
    </el-table-column>
    <el-table-column
      prop="activity_grant_money"
      width="100"
      label="活动派奖">
    </el-table-column>
    <el-table-column
      prop="agent_reward_money"
      width="100"
      label="代理分成">
    </el-table-column>
    <el-table-column
      prop="agent_bonus_money"
      width="100"
      label="代理分红">
    </el-table-column>
    <el-table-column
      prop="rewith_broker_rate"
      width="100"
      label="手续费">
    </el-table-column>
    <el-table-column
      prop="net_profit"
      width="100"
      label="平台净利">
    </el-table-column>
    <el-table-column
      prop="cash_ratio"
      width="100"
      label="现金流利润率">
    </el-table-column>
  </el-table>

<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[50,100,200]"
      :page-size="pagesize"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>



  </div>
</template>

<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInline: {
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      tableData: [
      ],
      total: 0,
      pagesize: 50,
      havetime: false,
      havetime1: false
    }
  },
  created() {
    let week = new Date(new Date().toLocaleDateString()).getTime() - 60*60*24*1000*7
    let time = new Date(new Date().toLocaleDateString()).getTime()
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    let that = this
    if (!this.businessdealday.length && this.businessdealday.length != 0) {
      that.formInline.starttime = this.businessdealday.starttime
      that.currentPage = this.businessdealday.currentPage
      that.pagesize = this.businessdealday.pagesize
      that.formInline.endtime = this.businessdealday.endtime
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
    }
  },
  computed: {
    ...mapGetters([
      'businessdealdayreportgetlist',
      'businessdealday'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
        let setbusinessdealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 4 && row.user_recharge_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 6 && row.user_withdraw_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 8 && row.agent_withdraw_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 9 && row.flow_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 10 && row.user_lose_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 11 && row.user_win_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 12 && row.tax*1 < 0) {
        return 'red'
      }
       if (columnIndex === 14 && row.gross_profit*1 < 0) {
        return 'red'
      }
       if (columnIndex === 15 && row.activity_grant_money*1 < 0) {
        return 'red'
      }
       if (columnIndex === 16 && row.agent_reward_money*1 < 0) {
        return 'red'
      }
       if (columnIndex === 17 && row.agent_bonus_money*1 < 0) {
        return 'red'
      }
       if (columnIndex === 18 && row.rewith_broker_rate*1 < 0) {
        return 'red'
      }
    },
    tableclassname ({row, rowIndex}) {
      if(row.gross_profit * 1 < (row.flow_money * 1 * 0.05) || row.net_profit * 1 < 0) {
        return 'warning-row';
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, currentPage, pagesize) {
   var timestart = ''
    var timeend = ''
    if (starttime) {
      var start = starttime.getTime() /1000
      var timestart = parseTime(start)
    }
    if (endtime) {
      var end = endtime.getTime() /1000
      var timeend = parseTime(end + 24 *60*60 -1)
    }
    if (start && end) {
      if (start > end) {
        Message({
          message: '开始时间必须小于结束时间',
          type: 'error'
        })
        return
      }
    }
  request({
    url: that.public.url + '/backend/businessdealdayreport/getlist',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      pageno: currentPage,
      pagerows: pagesize
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
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

</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-table .warning-row {
    background: oldlace;
  }
</style>
