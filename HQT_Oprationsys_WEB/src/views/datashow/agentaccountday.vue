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
                <el-input v-model="formInline.account" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代理id">
                <el-input v-model="formInline.id" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="6">
             <el-form-item label="代理状态">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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

  <!-- <div>
    <div class="parenti" v-for="(item,key) in nav" :key="key">
      <el-button plain @click="getpid(item,key)">{{item.text}}</el-button>
      <i class="el-icon-d-arrow-right"></i>
    </div>

    </div> -->


    <el-table
    :data="tableData"
    :row-class-name="tableclassname"
    @sort-change='sort'
    border
    style="width: 100%">
    <!-- <el-table-column
      label="代理账户"
      width='200'
      >
      <template slot-scope="scope">
        <el-button type="text"  @click="confirmEdit(scope.row)" v-if="scope.row.account_name != '总计' &&  scope.row.href!=''">{{scope.row.account_name}}</el-button>
        <span  v-else>{{scope.row.account_name}}</span>
      </template>
    </el-table-column> -->
    <el-table-column
      prop="agent_account_id"
      label="代理ID">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="渠道名">
    </el-table-column>
    <el-table-column
      prop="user_account"
      label="代理账号">
    </el-table-column>
    <el-table-column
      prop="level"
      label="代理等级">
    </el-table-column>
    
    <el-table-column
      prop="team_recharge_money"
      label="团队玩家总充值额">
    </el-table-column>
    <el-table-column
      prop="team_withdraw_money"
      label="团队提款额">
    </el-table-column>
    <el-table-column
      prop="team_bet_user_num"
      label="团队投注人数">
    </el-table-column>
     <el-table-column
      prop="ptop_bet_user_num"
      label="人人类投注人数">
    </el-table-column>
     <el-table-column
      prop="ptom_bet_user_num"
      label="人机类投注人数">
    </el-table-column>
    <el-table-column
      prop="team_flow_ptop"
      label="人人类流水">
    </el-table-column>
    <el-table-column
      prop="team_flow_ptom"
      label="人机类流水">
    </el-table-column>
    <el-table-column
      prop="team_ptop_tax"
      label="人人类税收">
    </el-table-column>
    <el-table-column
      prop="team_ptom_tax"
      label="人机类税收">
    </el-table-column>
    <el-table-column
      prop="team_ptop_gprofit"
      label="人人毛利">
    </el-table-column>
    <el-table-column
      prop="team_ptom_gprofit"
      label="人机毛利">
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
        id: '',
        account: '',
        status: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 50,
      nav: [],
      navlist : '',
      pid: '',
      flag: false,
      orglist: [],
      statuslist:[
        {id:'0',name:'冻结'},
        {id:'1',name:'正常'}
      ]
    }
  },
  created() {
    let that = this;
    getorglist(this)
    if (!this.agentaccountday.length && this.agentaccountday.length != 0) {
      that.formInline.starttime = this.agentaccountday.starttime,
        that.formInline.endtime = this.agentaccountday.endtime,
        that.currentPage = this.agentaccountday.currentPage,
        that.pagesize = this.agentaccountday.pagesize,
        that.formInline.id = this.agentaccountday.id;
        that.formInline.org = this.agentaccountday.org;
        that.formInline.account = this.agentaccountday.account;
        that.formInline.status = this.agentaccountday.status;
      getlist(that)
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
        that.currentPage = 1
        getlist(that)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'org': that.formInline.org,
        'account': that.formInline.account,
        'status': that.formInline.status,
      }
      this.$store.commit('agentaccountday', agentaccountday)
    },
    // confirmEdit (row) {
    //   let that = this
    //   let href = row.href
    //   this.navlist =  (href.split('&')[3]).split('=')[1]
    //   this.pid = (href.split('&')[0]).split('=')[1]
    //   this.flag = true
    //   getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
    //   let agentaccountday = {
    //     'starttime': that.formInline.starttime,
    //     'endtime': that.formInline.endtime,
    //     'currentPage': that.currentPage,
    //     'pagesize': that.pagesize,
    //     'id': that.formInline.id,
    //     'pid': that.pid,
    //     'navlist': that.navlist,
    //     'flag': that.flag
    //   }
    //   this.$store.commit('agentaccountday', agentaccountday)
    // },
    // getpid (item,key) {
    //   let that = this
    //   if (key === 0) {
    //     this.flag = false
    //     getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
    //     let agentaccountday = {
    //       'starttime': that.formInline.starttime,
    //       'endtime': that.formInline.endtime,
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'id': that.formInline.id,
    //       'pid': that.pid,
    //       'navlist': that.navlist,
    //       'flag': that.flag
    //     }
    //     this.$store.commit('agentaccountday', agentaccountday)
    //   } else {
    //     let href = item.href
    //     this.navlist =  (href.split('&')[3]).split('=')[1]
    //     this.pid = (href.split('&')[0]).split('=')[1]
    //     this.flag = true
    //     getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize, that.formInline.id)
    //     let agentaccountday = {
    //     'starttime': that.formInline.starttime,
    //     'endtime': that.formInline.endtime,
    //     'currentPage': that.currentPage,
    //     'pagesize': that.pagesize,
    //     'id': that.formInline.id,
    //     'org': that.formInline.org,
    //     'account': that.formInline.account,
    //     'status': that.formInline.status,
    //   }
    //     this.$store.commit('agentaccountday', agentaccountday)
    //   }
    // },
    tableclassname ({row, rowIndex}) {
      // if(row.revenue * 1 < (row.flow_money * 1 * 0.05)) {
      //   return 'warning-row';
      // }
      // if (rowIndex === 0) {
      //   return 'success-row'
      // }
      // return ''
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
      getlist(that)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'org': that.formInline.org,
        'account': that.formInline.account,
        'status': that.formInline.status,
      }
      this.$store.commit('agentaccountday', agentaccountday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that)
      let agentaccountday = {
        'starttime': that.formInline.starttime,
        'endtime': that.formInline.endtime,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'org': that.formInline.org,
        'account': that.formInline.account,
        'status': that.formInline.status,
      }
      this.$store.commit('agentaccountday', agentaccountday)
    }
  },
  filters: {
  }
}



function getlist (that) {
  var timestart = ''
  var timeend = ''
  if (that.formInline.starttime) {
    var start = that.formInline.starttime.getTime() / 1000
    var timestart = parseTime(start)
  }
  if (that.formInline.endtime) {
    var end = that.formInline.endtime.getTime() / 1000
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
      start: timestart,
      end: timeend,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      status: that.formInline.status,
      user_account: that.formInline.account,
      user_id: that.formInline.id,
      agent_org_id: that.formInline.org,
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
