<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
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
          <el-col :span="6">
            <el-form-item label="代理账号">
                <el-input v-model="formInline.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="agentaccountdayreportgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox" style="overflow:hidden;">
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

  <div>
    <div class="parenti" v-for="(item,key) in nav" :key="key">
      <el-button plain @click="getpid(item,key)">{{item.text}}</el-button>
      <i class="el-icon-d-arrow-right"></i>
    </div>

    </div>


    <el-table
    :data="tableData"
    :row-class-name="tableclassname"
    @sort-change='sort'
    border
    style="width: 100%">
    <el-table-column
      label="代理账户"
      width='200'
      >
      <template slot-scope="scope">
        <el-button type="text"  @click="confirmEdit(scope.row)" v-if="scope.row.account_name != '总计' &&  scope.row.href!=''">{{scope.row.account_name}}</el-button>
        <span  v-else>{{scope.row.account_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="所属渠道">
    </el-table-column>
    <el-table-column
      prop="recharge_user_num"
      label="账号状态">
    </el-table-column>
    <el-table-column
      prop="user_recharge_money"
      label="充值额度">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_money"
      label="提现金额">
    </el-table-column>
    <el-table-column
      prop="flow_money"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="流水">
    </el-table-column>
    <el-table-column
      prop="revenue"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="营收">
    </el-table-column>
     <el-table-column
      prop="user_lose_money"
      label="玩家输额">
    </el-table-column>
     <el-table-column
      prop="user_win_money"
      label="玩家赢额">
    </el-table-column>
     <el-table-column
      prop="tax"
      label="税收">
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
        endtime: '',
        id: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 50,
      nav: [],
      navlist : '',
      pid: '',
      flag: false
    }
  },
  created() {
    let that = this;
    if (!this.agentaccountday.length && this.agentaccountday.length != 0) {
      that.formInline.starttime = this.agentaccountday.starttime,
        that.formInline.endtime = this.agentaccountday.endtime,
        that.currentPage = this.agentaccountday.currentPage,
        that.pagesize = this.agentaccountday.pagesize,
        that.formInline.id = this.agentaccountday.id;
        that.flag = this.agentaccountday.flag;
        if (this.flag) {
          that.pid = this.agentaccountday.pid;
          that.navlist = this.agentaccountday.navlist;
        }
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
    }
  },
  computed: {
    ...mapGetters([
      'agentaccountdayreportgetlist',
      'agentaccountday'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        this.flag = false
        getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'flag': that.flag
      }
      this.$store.commit('agentaccountday', agentaccountday)
    },
    confirmEdit (row) {
      let that = this
      let href = row.href
      this.navlist =  (href.split('&')[3]).split('=')[1]
      this.pid = (href.split('&')[0]).split('=')[1]
      this.flag = true
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'pid': that.pid,
        'navlist': that.navlist,
        'flag': that.flag
      }
      this.$store.commit('agentaccountday', agentaccountday)
    },
    getpid (item,key) {
      let that = this
      if (key === 0) {
        this.flag = false
        getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
        let agentaccountday = {
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
          'pid': that.pid,
          'navlist': that.navlist,
          'flag': that.flag
        }
        this.$store.commit('agentaccountday', agentaccountday)
      } else {
        let href = item.href
        this.navlist =  (href.split('&')[3]).split('=')[1]
        this.pid = (href.split('&')[0]).split('=')[1]
        this.flag = true
        getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
        let agentaccountday = {
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
          'flag': that.flag
        }
        this.$store.commit('agentaccountday', agentaccountday)
      }
    },
    tableclassname ({row, rowIndex}) {
      if(row.revenue * 1 < (row.flow_money * 1 * 0.05)) {
        return 'warning-row';
      }
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    sort ({column, prop, order}) {
      if (this.tableData.length > 0) {
        var sum = this.tableData.shift()
        switch(order) {
          case 'ascending':
            this.tableData.sort((a,b) => {
                return b[prop]*1 - a[prop]*1
            })
            break
          case 'descending':
            this.tableData.sort((a,b) => {
                return a[prop]*1 - b[prop]*1
            })
            break
        }
        this.tableData.unshift(sum)
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      this.flag = false
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'flag': that.flag
      }
      this.$store.commit('agentaccountday', agentaccountday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      this.flag = false
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'flag': that.flag
      }
      this.$store.commit('agentaccountday', agentaccountday)
    }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, currentPage, pagesize, id) {
  var timestart = ''
  var timeend = ''
  if (starttime) {
    var start = starttime.getTime() / 1000
    var timestart = parseTime(start)
  }
  if (endtime) {
    var end = endtime.getTime() / 1000
    var timeend = parseTime(end + 24 * 60 * 60 - 1)
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
  let data =  {
      date_from: timestart,
      date_to: timeend,
      pageno: currentPage,
      pagerows: pagesize,
      account_name: id
    }
    if (that.flag) {
      data.isnav = that.navlist
      data.pid = that.pid
    } else {
      data.isnav = ''
      data.pid = ''
    }
  request({
    url: that.public.url + '/backend/agentdatareport/getlist',
    method: 'post',
    data: data
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
    let data = res.data.total[0]
    data.account_name = '总计'
    that.tableData = res.data.list
    that.tableData.unshift(data)
    that.nav = res.data.nav
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
   .el-table .success-row {
    background: #f0f9eb;
  }
  .parenti {
    margin-bottom: 10px;
    float: left;
  }
  .parenti:last-child i{
    visibility: hidden;
  }
</style>
