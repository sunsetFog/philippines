<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.id" filterable clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="virtualagentgetlist" :loading='loading'>查询</el-button>
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

    <!-- <el-table
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
      label="登录用户">
    </el-table-column>
    <el-table-column
      prop="user_active_num"      
      label="活跃用户">
    </el-table-column>
    <el-table-column
      prop="user_recharge_num"     
      label="充值用户">
    </el-table-column>
    <el-table-column
      prop="user_recharge_money"  
      label="充值金额">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_num"
      label="玩家提款用户">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_money"
      label="玩家提款金额">
    </el-table-column>
    <el-table-column
      prop="agent_withdraw_num"
      label="代理提款用户">
    </el-table-column>
    <el-table-column
      prop="agent_withdraw_money"     
      label="代理提款金额">
    </el-table-column>
    <el-table-column
      prop="user_flow"      
      label="流水">
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
    <el-table-column
      prop="pay_bet_ratio"     
      label="充投比">
    </el-table-column>
    <el-table-column
      prop="gross_profit"     
      label="平台毛利">
    </el-table-column>
    <el-table-column
      prop="activity_award"     
      label="活动派奖">
    </el-table-column>
    <el-table-column
      prop="agent_divide"     
      label="代理分成">
    </el-table-column>
    <el-table-column
      prop="agent_bonus"     
      label="代理分红">
    </el-table-column>
    <el-table-column
      prop="chwi_broker_money"
      label="手续费">
    </el-table-column>
    <el-table-column
      prop="ret_porfit"
      label="平台净利">
    </el-table-column>
    <el-table-column
      prop="cash_rate"     
      label="现金流利润率">
    </el-table-column>
  </el-table> -->
    <el-table
    :data="tableData"
    :row-class-name="tableclassname"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="agent_org_name"
      width="100"
      label="渠道">
    </el-table-column>
     <el-table-column
      prop="user_account"
      label="虚拟代理账号">
    </el-table-column>
    <el-table-column
      prop="domain_count"      
      label="代理域名数">
    </el-table-column>
    <el-table-column
      prop="user_count"     
      label="用户总数">
    </el-table-column>
    <el-table-column
      prop=""  
      label="查看">
      <template slot-scope="scope">
        <el-button @click="view(scope.row)" type="text" size="small" >代理详情</el-button>
      </template>
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
        id: ''
      },
      currentPage: 1,
      tableData: [
      ],
      data:[],
      total: 0,
      pagesize: 20,
      havetime: false,
      havetime1: false,
      statuslist: [],
      loading: false
    }
  },
  created() {
    let week = new Date(new Date().toLocaleDateString()).getTime() - 60*60*24*1000*7
    let time = new Date(new Date().toLocaleDateString()).getTime()
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    let that = this
    getaccount(this)
    if (!this.businessdealday.length && this.businessdealday.length != 0) {
      that.formInline.starttime = this.businessdealday.starttime
      that.currentPage = this.businessdealday.currentPage
      that.pagesize = this.businessdealday.pagesize
      that.formInline.endtime = this.businessdealday.endtime
      that.formInline.id = this.businessdealday.id
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
    }
  },
  computed: {
    ...mapGetters([
      'businessdealdayreportgetlist',
      'businessdealday',
      'virtualagentgetlist',
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        that.currentPage = 1
        getlist(that,that.currentPage, that.pagesize)
        let setbusinessdealday = {       
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    cell ({row, column, rowIndex, columnIndex}) {
    //   if (columnIndex === 16 && row.ptop_gprofit*1 < 0) {//人人类毛利
    //     return 'red'
    //   }else if(columnIndex === 16 && row.ptop_gprofit*1 > 0){
    //     return 'green'
    //   }
    //    if (columnIndex === 17 && row.ptom_gprofit*1 < 0) {//人机类毛利
    //     return 'red'
    //   }else if(columnIndex === 17 && row.ptom_gprofit*1 > 0){
    //     return 'green'
    //   }
      
    //    if (columnIndex === 18 && parseFloat(row.gprofit) < 0) {//平台毛利
    //     return 'red'
    //   }else if(columnIndex === 18 && parseFloat(row.gprofit) > 0){
    //     return 'green'
    //   }
    //    if (columnIndex === 19 && parseInt(row.profit)*1 < 0) {//平台利润率
    //     return 'red'
    //   }else if(columnIndex === 19 && parseInt(row.profit)*1 > 0){
    //     return 'green'
    //   }
    },
    tableclassname ({row, rowIndex}) {
      // if(row.gross_profit * 1 < (row.flow_money * 1 * 0.05) || row.net_profit * 1 < 0) {
      //   return 'warning-row';
      // }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
     view (row) {
         this.$router.push({
             path:'virtualagentgetinfo',
             query:{
                  user_id: row.user_id,
                  agent_org_name:row.agent_org_name,
                  user_account:row.user_account,
             }
         })
    //   this.dialogFormVisible2 = true
    //   request({
    //   url: that.public.url + "/virtualagent/getinfo",
    //   method: "post",
    //   data: {
    //       user_id: row.user_id,
    //   }
    // })
    //   .then(res => {
    //     that.form2 = res.data
    //   })
    //   .catch(error => {});
    },
  },
  components:{
    //    virtualagentgetinfo:()=> import('../promoters/virtualagentgetinfo'),
  },
  filters: {
  }
}



function getlist (that, currentPage, pagesize) {
  request({
    url: that.public.url + '/backend/virtualagent/getlist',
    method: 'post',
    data: {
      agent_org_id: that.formInline.id,
      pageno: currentPage,
      pagerows: pagesize
    }
  }).then(res => {
    that.loading = false
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

function getaccount (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    let all = {id: "", name: "全部"}
    that.statuslist = res.data
    that.statuslist.unshift(all)
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
</style>
