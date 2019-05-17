<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="150px">
         <!--  <el-col :span="2">
            <el-button type="info" round @click="add" v-if="orgadd">新增 + </el-button>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="玩家渠道">
              <el-select v-model="formInline.user" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家账号" label-width="100px">
            <el-input v-model="formInline.order" clearable></el-input>
            </el-form-item>
          </el-col>
         <!--  <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="orggetlist">查询</el-button>
          </el-col> -->
           <el-col :span="6">
            <el-form-item label="上次成功提现时间" label-width="150px">
              <el-date-picker
              v-model="formInline.starttime"
              type="datetime"
              :editable="false"
              placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="本次提现申请时间" label-width="150px">
              <el-date-picker
              v-model="formInline.endtime"
              type="datetime"
              :editable="false"
              placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
   
    </div>
  <!--   <div class="pagingbox">
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
    </div> -->

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="url"
      width="250"
      label="帐变时间">
    </el-table-column>
    <el-table-column
      label="帐变类型">
      <template slot-scope="scope">
        {{scope.row.create_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      label="帐变金额">
      <template slot-scope="scope">
        {{scope.row.update_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      label="玩家IP">
      <template slot-scope="scope">
        {{scope.row.update_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      label="备注">
      <template slot-scope="scope">
        {{scope.row.update_time | time}}
      </template>
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


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="玩家渠道" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="域名" :label-width="formLabelWidth" prop="domain">
         <el-select v-model="form.domain" multiple filterable>
              <el-option
                v-for="item in domainlist"
                :key="item.id"
                :label="item.url"
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
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      formInline: {
        user: '',
      },
      currentPage: 1,
      userlist: [],
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        domain: []
      },
      rules: {
        name: [
          {required: true, message: '请输入玩家渠道', trigger: 'blur'}
        ],
        domain: [
          {required: true, message: '请选择域名', trigger: 'change'}
        ]
      },
      domainlist: [],
      formLabelWidth: '120px',
      title: '',
      name: '',
      total: 0,
      pagesize: 50
    }
  },
  created() { 
    getuserlist(this)
    getdomain(this)
    let that = this
    if (!this.org.length && this.org.length != 0) {
      that.currentPage = this.org.currentPage
      that.pagesize = this.org.pagesize
      that.formInline.user = this.org.user
      orglist(this)
    }
  },
  computed: {
    ...mapGetters([
      'orgadd',
      'orgdel',
      'orgupdate',
      'orggetlist',
      'org'
    ])
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    query () {
      let that = this
      this.currentPage = 1
      orglist(this)
      let setorg = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user
      }
      this.$store.commit('setorg', setorg)
    },
    edit(data) {
      this.title = '编辑渠道组管理'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/org/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            let domain = res.data.domain_id.split(',')
            that.form.domain = domain
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增渠道组管理'
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑渠道组管理') {
            let domain_id = this.form.domain.join(',')
             request({
              url: that.public.url + '/backend/org/update',
              method: 'post',
              data: {
                    name: this.form.name,
                    domain_id: domain_id,
                    id: this.id
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              orglist(that)
            }).catch(error => {
            })
          } else {
            let domain_id = this.form.domain.join(',')
            request({
            url: that.public.url + '/backend/org/add',
            method: 'post',
            data: {
                name: this.form.name,
                domain_id: domain_id
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            orglist(that)
          }).catch(error => {
          })
          }
        } else {
          return false
        }
      })
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/org/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
           orglist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      orglist(this)
      let setorg = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user
      }
      this.$store.commit('setorg', setorg)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      orglist(this)
      let setorg = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user
      }
      this.$store.commit('setorg', setorg)
    }
  },
  filters: {
    parseTime(time) {
      if (time > 0) {
          var date = new Date(time *1000);
          let y = date.getFullYear() + '-'
          let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
          let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
          let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
          let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
          let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
          return y+m+d+h+i+s
      } else {
        return ''
      }
    },
    time(val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  }
}

function orglist (that) {
  request({
    url: that.public.url + '/backend/org/getList',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
      org_id: that.formInline.user
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getuserlist (that) {
  request({
    url: that.public.url + '/backend/org/getOrglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
  }).catch(error => {
  })
}

function getdomain (that) {
  request({
    url: that.public.url + '/backend/domain/getdomainlist',
    method: 'post'
  }).then(res => {
    that.domainlist = res.data
  }).catch(error => {
  })
}


</script>

<style lang="css" scoped>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .inline {
    width: 160px!important;
    display: inline-block !important;
  }
  .resetname {
    line-height: 60px;
    font-size: 20px;
    margin-left: 28px;
  }
  .inputnum {
      height: 30px!important;
      width: 100px!important;
      font-size: 10px;
  }
</style>
