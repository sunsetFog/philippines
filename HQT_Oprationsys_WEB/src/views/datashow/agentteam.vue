<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="120px">
          <el-col :span="6">
            <el-form-item label="代理人员账号">
                <el-input v-model="formInline.user" clearable></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="渠道">
              <el-select v-model="formInline.agentOrg" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="agentteamreportgetlist" :loading="loading">查询</el-button>
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
      prop="user_account"
      label="代理人员">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="渠道">
    </el-table-column>
    <el-table-column
      prop="team_flow"
      label="团队总流水">
    </el-table-column>
      <el-table-column
      prop="team_bet_ptom"
      label="团队人机类用户投注额">
    </el-table-column>
    <el-table-column
      prop="team_tax"
      label="团队税收收益">
    </el-table-column>
    <el-table-column
      prop="self_tax"
      label="个人税收收益">
    </el-table-column>
    <el-table-column
      prop="team_recharge_money"
      label="团队总充值">
    </el-table-column>
    <el-table-column
      prop="team_agent_num"
      label="代理总数">
    </el-table-column>
    <el-table-column
      prop="add_agent_num"
      label="今日新增代理数">
    </el-table-column>
    <el-table-column
      prop="team_user_num"
      label="玩家总数">
    </el-table-column>
    <el-table-column
      prop="add_user_num"
      label="今日新增玩家数">
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


<el-dialog title='选择渠道'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="选择渠道" label-width="80" prop='org'>
       <el-select v-model="form.org" filterable>
                <el-option
                  v-for="item in orglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>



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
        user: '',
        org: '',
        agentOrg:'',
      },
      userlist:[],
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      orglist: [],
      dialogFormVisible: false,
      form:{
        org: ''
      },
      rules:{
        org: [{required: true, message: '请选择渠道', trigger: 'change'},]
      },
      orgid: '',
      loading: false
    }
  },
  created() {
     getuserlist(this)
    let that = this
    if (Object.keys(this.$route.query).length > 0) {
      if (this.$route.query.user) {
        that.orgid = this.$route.query.org
      }
      if (this.$route.query.name) {
        that.formInline.user = this.$route.query.name
      }
      getlist(this)
    } else {
      if (!this.agentteam.length && this.agentteam.length != 0) {
        that.currentPage = this.agentteam.currentPage
        that.pagesize = this.agentteam.pagesize
        that.formInline.user = this.agentteam.user
        that.orgid = this.agentteam.org
        getlist(that)
      }
    }
  },
  computed: {
    ...mapGetters([
      'agentteamreportgetlist',
      'agentteam'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        that.currentPage = 1
        getlist(that)
        let setagentteam = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'org': that.orgid
        }
      this.$store.commit('setagentteam', setagentteam)
    },
    tableclass ({row, rowIndex}) {
      // if (rowIndex === 0) {
      //   return 'success-row'
      // }
      // return ''
    },
    reset () {
      let that = this
      that.dialogFormVisible = false
      that.$refs.form.resetFields()
    },
    sure () {
       let that = this
        this.$refs.form.validate((valid) => {
        if (valid) {
          that.$confirm('', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
              that.orgid = that.form.org
              let setagentteam = {
                'user': that.formInline.user,
                'currentPage': that.currentPage,
                'pagesize': that.pagesize,
                'org': that.form.org
              }
            this.$store.commit('setagentteam', setagentteam)
              getlist(that)
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
          }).catch(error => {
          })
          
        } else {
          return false
        }
      })
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
      getlist(that)
       let setagentteam = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'org': that.orgid
        }
      this.$store.commit('setagentteam', setagentteam)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that)
       let setagentteam = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'org': that.orgid
        }
      this.$store.commit('setagentteam', setagentteam)
    }
  },
  filters: {
  }
}



function getlist (that) {
  that.loading = true
  request({
    url: that.public.url + '/backend/agentteamreport/getlist',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
      agent_login_name: that.formInline.user.trim(),
      agent_account_id: '',
      agent_org_id: that.formInline.agentOrg
    }
  }).then(res => {
      that.orgid = ''
      that.loading = false
      if (res.data.agentlist) {
        that.tableData = []
        that.total = 0
        that.currentPage = 1
        let agentlist = res.data.agentlist
        that.orglist = agentlist.map(val=>{
          for (var key in val) {
            return {
              id: key,
              name: val[key]
            }
          }
        })
        that.dialogFormVisible = true
      } else {
        Message({
          message: res.message,
          type: 'success'
        })
        that.dialogFormVisible = false
        if (res.data.list) {
          // let data = res.data.total[0]
          // data.user_account = '总计'
          that.tableData = res.data.list
          // that.tableData.unshift(data)
        } else {
          that.tableData = []
        }  
        that.total = res.data.rownum * 1
        that.currentPage = res.data.pageno * 1
      }
      
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
function getuserlist (that) {
  request({
    url: that.public.url + '/backend/role/getorglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
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
