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
              type="date"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.org" filterable clearable>
                <el-option
                  v-for="item in orglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="newuserdayreportgetlist" :loading="loading">查询</el-button>
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
    border
    :row-class-name="tableclass"
    :cell-class-name='cell'
    style="width: 100%">
    <el-table-column
      prop="adate"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="add_user_num"
      label="新增用户数">
    </el-table-column>
    <el-table-column
      prop="reg_user_num"
      label="注册用户数">
    </el-table-column>
    <el-table-column
      prop="newuser_mobile_num"
      label="绑定手机用户数">
    </el-table-column>
    <el-table-column
      prop="newuser_balance_money"
      label="新增用户账户余额">
    </el-table-column>
    <el-table-column
      prop="newuser_recharge_num"
      label="充值用户数">
    </el-table-column>
    <el-table-column
      prop="newuser_recharge_money"
      label="充值金额">
    </el-table-column>
    <el-table-column
      prop="newuser_withdraw_num"
      label="提款用户数">
    </el-table-column>
    <el-table-column
      prop="newuser_withdraw_money"
      label="提款金额">
    </el-table-column>
    <el-table-column
      prop="rechwith_diff"
      label="充提差">
    </el-table-column>
    <el-table-column
      prop="newuser_whole_bet_num"
      label="投注人数">
    </el-table-column>
    <el-table-column
      prop="newuser_ptop_bet_num"
      label="人人类投注人数">
    </el-table-column>
    <el-table-column
      prop="newuser_ptom_bet_num"
      label="人机类投注人数">
    </el-table-column>
     <el-table-column
      prop="newuser_ptom_bet"
      label="人机类投注额">
    </el-table-column>
    <el-table-column
      prop="newuser_ptop_flow"
      label="人人类流水">
    </el-table-column>
    <el-table-column
      prop="newuser_ptom_flow"
      label="人机类流水">
    </el-table-column>
  </el-table>

<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[20,50,200]"
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
        endtime: '',
        org: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      havetime: false,
      havetime1: false,
      orglist: [],
      loading: false
    }
  },
  created() {
    let week = new Date(new Date().toLocaleDateString()).getTime() - 60*60*24*1000*7
    let time = new Date(new Date().toLocaleDateString()).getTime()
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    getorglist(this)
    let that = this
    if (!this.newuser.length && this.newuser.length != 0) {
      that.formInline.starttime = this.newuser.starttime
      that.currentPage = this.newuser.currentPage
      that.pagesize = this.newuser.pagesize
      that.formInline.endtime = this.newuser.endtime
      that.formInline.org = this.newuser.org
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
    }
  },
  computed: {
    ...mapGetters([
      'newuserdayreportgetlist',
      'newuser'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
        let setnewuser = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org
        }
      this.$store.commit('setnewuser', setnewuser)
    },
    tableclass ({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    cell ({row, column, rowIndex, columnIndex}) {
      // if (columnIndex === 4 && row.newuser_balance_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 6 && row.newuser_recharge_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 8 && row.newuser_withdraw_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 9 && row.newuser_flow_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 10 && row.newuser_lose_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 11 && row.newuser_win_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 12 && row.rechwith_diff*1 < 0) {
      //   return 'red'
      // }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
       let setnewuser = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org
        }
      this.$store.commit('setnewuser', setnewuser)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
       let setnewuser = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org
        }
      this.$store.commit('setnewuser', setnewuser)
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
    that.loading = true
  request({
    url: that.public.url + '/backend/newuserdayreport/getlist',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      pageno: currentPage,
      pagerows: pagesize,
      agent_org_id: that.formInline.org
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
      that.loading = false
      if (res.data.list.length === 0) {
        that.tableData = res.data.list
      } else {
         let data = res.data.total[0]
        data.adate = '总计'
        that.tableData = res.data.list
        that.tableData.unshift(data)
      }  
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

function getorglist (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.orglist = res.data
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
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
