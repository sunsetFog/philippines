<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="5">
              <el-form-item label="处理状态">
              <el-select v-model="formInline.type">
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.id"  clearable>
                <el-option
                  v-for="item in accountlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="审核员" label-width="60px">
                <el-input v-model="formInline.region" placeholder="审核员" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="玩家账号">
                <el-input v-model="formInline.user" placeholder="玩家账号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="pwdrestgetlist">查询</el-button>
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
      label="玩家"
      >
    </el-table-column>
    <el-table-column
      prop="top_agent_account"
      label="所属总代"
      >
    </el-table-column>
    <el-table-column
      prop="balance"
      label="当前账户余额"
      >
    </el-table-column>
    <el-table-column
      prop="type"
      label="重设密码类型"
      >
    </el-table-column>
    <el-table-column
      prop="auditer_account"
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
        <el-button type="text" size="small" @click="pass(scope.row)" v-if="scope.row.status==='待审核' && pwdrestauditpwd">通过</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="scope.row.status==='待审核' && pwdrestauditpwd">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row class="buttoncenter">
      <el-button type="primary" style="margin-right:30px;"  @click="allpass()" v-if="pwdrestauditpwd && buttonshow">选中通过</el-button>
      <el-button type="primary" @click="deletall()" v-if="pwdrestauditpwd && buttonshow">选择拒绝</el-button>
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
        id: '',
        region: '',
        type: '0',
        user: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      keys: [],
      id: '',
      accountlist: [],
      buttonshow: false,
      statuslist: [
          {
              id: '0',
              name: '待审核'
          },
          {
              id: '1',
              name: '已通过'
          },
          {
              id: '2',
              name: '已拒绝'
          }
      ]
    }
  },
  created() {
    let that = this
    getaccount(this)
    if (!this.bankreview.length && this.bankreview.length != 0) {
      that.formInline.id = this.bankreview.id
      that.formInline.type = this.bankreview.type
      that.currentPage = this.bankreview.currentPage
      that.pagesize = this.bankreview.pagesize
      that.formInline.region = this.bankreview.region
      that.formInline.user = this.bankreview.user
      if (this.formInline.type === '0') {
        this.buttonshow = true
      } else {
        this.buttonshow = false
      }
      getlist(that)
    }
    
  },
  computed: {
    ...mapGetters([
      'pwdrestgetlist',
      'pwdrestauditpwd',
      'bankreview'
    ])
  },
  watch: {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
              url: that.public.url + '/backend/pwdrest/auditpwd',
              method: 'post',
              data: {
                ids: ids,
                change: 2
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              });
              if (that.formInline.type === '0') {
                that.buttonshow = true
              } else {
                that.buttonshow = false
              }
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
              url: that.public.url + '/backend/pwdrest/auditpwd',
              method: 'post',
              data: {
                ids: ids,
                change: 1
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              });
              if (that.formInline.type === '0') {
                that.buttonshow = true
              } else {
                that.buttonshow = false
              }
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
      if (this.formInline.type === '0') {
        this.buttonshow = true
      } else {
        this.buttonshow = false
      }
      getlist(that)
      let setbankreview = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region,
        'user': that.formInline.user,
      }
      this.$store.commit('setbankreview', setbankreview)
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
            url: that.public.url + '/backend/pwdrest/auditpwd',
            method: 'post',
            data: {
              ids: row.id,
              change: 1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            });
            if (that.formInline.type === '0') {
              that.buttonshow = true
            } else {
              that.buttonshow = false
            }
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
            url: that.public.url + '/backend/pwdrest/auditpwd',
            method: 'post',
            data: {
              ids: row.id,
              change: 2
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            });
            if (that.formInline.type === '0') {
              that.buttonshow = true
            } else {
              that.buttonshow = false
            }
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
      if (this.formInline.type === '0') {
        this.buttonshow = true
      } else {
        this.buttonshow = false
      }
      getlist(this)
      let setbankreview = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region,
        'user': that.formInline.user,
      }
      this.$store.commit('setbankreview', setbankreview)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      if (this.formInline.type === '0') {
        this.buttonshow = true
      } else {
        this.buttonshow = false
      }
      getlist(this)
      let setbankreview = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region,
        'user': that.formInline.user,
      }
      this.$store.commit('setbankreview', setbankreview)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/backend/pwdrest/getList',
    method: 'post',
    data: {
      status: that.formInline.type,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      org_id: that.formInline.id,
      auditer_account: that.formInline.region.trim(),
      user_account: that.formInline.user.trim(),
    }
  }).then(res => {
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
    that.accountlist = res.data
    that.accountlist.unshift(all)
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
