<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
              <el-form-item label="处理状态">
              <el-select v-model="formInline.status" clearable>
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.org" clearable>
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
            <el-form-item label="充值类型">
                <el-select v-model="formInline.type" clearable>
                <el-option
                  v-for="item in czlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人">
                <el-input v-model="formInline.user" placeholder="申请人" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="80px">
        <el-col :span="6">
            <el-form-item label="审核员">
                <el-input v-model="formInline.audit" placeholder="审核员" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="auditAgentgetaddscorelist">查询</el-button>
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
    ref="multipleTable"
    border
    :data="tableData"
    :cell-class-name='cell'
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      >
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="玩家渠道"
      >
    </el-table-column>
    <el-table-column
      prop="user_account"
      label="玩家账号"
      >
    </el-table-column>
    <el-table-column
      prop="top_agent_account"
      label="所属总代"
      >
    </el-table-column>
    <el-table-column
      prop="recharge_amount"
      label="充值金额"
      >
    </el-table-column>
    <el-table-column
      prop="type"
      label="充值类型"
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      >
    </el-table-column>
    <el-table-column
      prop="apply_account"
      label="申请人"
      >
    </el-table-column>
    <el-table-column
      prop="recharge_time"
      label="充值时间"
      >
    </el-table-column>
    <el-table-column
      prop="audit_account"
      label="审核员"
      >
    </el-table-column>
    <el-table-column
      prop="audit_time"
      label="审核时间"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="pass(scope.row)" v-if="scope.row.status==='待审核' && auditAgentauditaddscore">通过</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="scope.row.status==='待审核' && auditAgentauditaddscore">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row class="buttoncenter">
      <el-button type="primary" style="margin-right:30px;" @click="allpass()" v-if="auditAgentauditaddscore && buttonshow">选中通过</el-button>
      <el-button type="primary" @click="deletall()" v-if="auditAgentauditaddscore  && buttonshow">选择拒绝</el-button>
  </el-row>

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
import { mapGetters } from 'vuex'
export default {
  filters: {
  },
  data() {
    return {
      formInline: {
        status: '2',
        org: '',
        type: '',
        user: '',
        audit: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      keys: [],
      id: '',
      statuslist: [],
      list: [
        {
          id: '1',
          name: '已通过'
        },
        {
          id: '2',
          name: '待审核'
        },
        {
          id: '3',
          name: '已拒绝'
        }
      ],
      buttonshow: true,
      czlist: [
        {
          id: '',
          name: '全部'
        },
        {
          id: '18',
          name: '[+]代理扶持'
        },
        {
          id: '19',
          name: '[+]代理日工资'
        },
        {
          id: '20',
          name: '[+]代理分红'
        }
      ],
      multipleSelection: []
    }
  },
  created() {
    let that = this
    getaccount(this)
    if (!this.agentup.length && this.agentup.length != 0) {
      that.formInline.status = this.agentup.status
      that.currentPage = this.agentup.currentPage
      that.pagesize = this.agentup.pagesize
      that.formInline.org = this.agentup.org
      that.formInline.type = this.agentup.type
      that.formInline.user = this.agentup.user
      that.formInline.audit = this.agentup.audit
      getlist(that)
    }
  },
  computed: {
    ...mapGetters([
      'auditAgentauditaddscore',
      'auditAgentgetaddscorelist',
      'agentup'
    ])
  },
  watch: {
    'formInline.status': function (val) {
      if (val == '2') {
        this.buttonshow = true
      } else {
        this.buttonshow = false
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 5 && row.recharge_amount*1 < 0) {
        return 'red'
      }
    },
    deletall () {
      if (this.multipleSelection.length > 0) {
      let that = this
       let id = this.multipleSelection.map(val => {
          return val.id
        })
        let ids = id.join(',')
        this.$confirm('此操作将拒绝这些申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
              url: that.public.url + '/backend/auditAgent/auditaddscore',
              method: 'post',
              data: {
                ids: ids,
                change: 3
              }
            }).then(res => {
              this.$message({
                type: 'success',
                message: res.message
              });
              getlist(that)
            }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消拒绝'
        });
      });
      }
    },
    allpass () {
      if (this.multipleSelection.length > 0) {
      let that = this
       let id = this.multipleSelection.map(val => {
          return val.id
        })
        let ids = id.join(',')
        this.$confirm('此操作将通过这些申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
              url: that.public.url + '/backend/auditAgent/auditaddscore',
              method: 'post',
              data: {
                ids: ids,
                change: 1
              }
            }).then(res => {
              this.$message({
                type: 'success',
                message: res.message
              });
              getlist(that)
            }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
      }
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setagentup = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.formInline.org,
        'type': that.formInline.type,
        'user': that.formInline.user,
        'audit': that.formInline.audit,
      }
      this.$store.commit('setagentup', setagentup)
    },
    pass(row) {
      let that = this
      this.$confirm('此操作将通过该申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/auditAgent/auditaddscore',
            method: 'post',
            data: {
              ids: row.id,
              change: 1
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将拒绝该申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/auditAgent/auditaddscore',
            method: 'post',
            data: {
              ids: row.id,
              change: 3
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消拒绝'
        });
      });
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(that)
      let setagentup = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.formInline.org,
        'type': that.formInline.type,
        'user': that.formInline.user,
        'audit': that.formInline.audit,
      }
      this.$store.commit('setagentup', setagentup)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that)
      let setagentup = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.formInline.org,
        'type': that.formInline.type,
        'user': that.formInline.user,
        'audit': that.formInline.audit,
      }
      this.$store.commit('setagentup', setagentup)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/backend/auditAgent/getaddscorelist',
    method: 'post',
    data: {
      status: that.formInline.status,
      org_id: that.formInline.org,
      type: that.formInline.type,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      apply_account: that.formInline.user.trim(),
      audit_account: that.formInline.audit.trim()
    }
  }).then(res => {
    if (res.data.list.length > 0) {
      that.tableData = res.data.list
    } else {
      that.tableData = []
    }
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
  .buttoncenter {
    text-align: center;
    margin-top: 20px;
  }
</style>
