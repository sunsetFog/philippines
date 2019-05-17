<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="accountcommnavadd">新增 + </el-button>
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
    style="width: 100%">
    <el-table-column
      prop="id"
      label="记录id">
    </el-table-column>
     <el-table-column
      prop="menu_name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="controller"
      label="控制器名称">
    </el-table-column>
    <el-table-column
      prop="action"
      label="方法名称">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="accountcommnavupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="accountcommnavdel">删除</el-button>
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
       <el-form-item label="名称" :label-width="formLabelWidth" prop='name'>
        <!-- <el-input v-model="form.name"></el-input> -->
        <el-select v-model="form.name" filterable clearable @change='namechange'>
              <el-option
                v-for="item in list"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="控制器" :label-width="formLabelWidth" prop='controller'>
        <el-input v-model="form.controller" disabled></el-input>
         <!-- <el-select v-model="form.controller" filterable clearable>
              <el-option
                v-for="item in list"
                :key="item.controller"
                :label="item.controller"
                :value="item.controller">
              </el-option>
            </el-select> -->
      </el-form-item>
       <el-form-item label="方法" :label-width="formLabelWidth" prop="action">
        <el-input v-model="form.action" disabled></el-input>
        <!-- <el-select v-model="form.action" filterable clearable>
              <el-option
                v-for="item in list"
                :key="item.action"
                :label="item.action"
                :value="item.action">
              </el-option>
            </el-select> -->
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
  filters: {
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      userlist: [],
      list: [],
      dialogFormVisible: false,
      form: {
        name: '',
        controller: '',
        action: 'index'
      },
      rules: {
        name: [
          {required: true, message: '请选择名称', trigger: 'change'}
        ],
        controller: [
          {required: true, message: '请选择控制器名称', trigger: 'change'}
        ],
        action: [
          {required: true, message: '请选择方法名称', trigger: 'change'}
        ]
      },
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 50
    }
  },
  created() { 
    let that = this
    this.currentPage = 1
    getlist(this)
    agentaccount(that,that.currentPage, that.pagesize)
  },
  computed: {
    ...mapGetters([
      'accountcommnavadd',
      'accountcommnavdel',
      'accountcommnavupdate'
    ])
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    namechange () {
      this.list.map((item) => {
        if (item.name === this.form.name) {
          this.form.controller = item.controller
        }
      })
    },
    edit(data) {
      this.title = '编辑公共导航'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/accountcommnav/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.menu_name
            that.form.controller = res.data.controller
            that.form.action = res.data.action
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增公共导航'
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑公共导航') {
             request({
              url: that.public.url + '/backend/accountcommnav/update',
              method: 'post',
              data: {
                    menu_name: this.form.name,
                    controller: this.form.controller,
                    action: this.form.action,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              agentaccount(that,that.currentPage, that.pagesize)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/accountcommnav/add',
            method: 'post',
            data: {
                  menu_name: this.form.name,
                  controller: this.form.controller,
                  action: this.form.action,
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            agentaccount(that,that.currentPage, that.pagesize)
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
            url: that.public.url + '/backend/accountcommnav/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
           agentaccount(that,that.currentPage, that.pagesize)
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
      this.pagesize = val
      this.currentPage = 1
      agentaccount(this,this.currentPage, this.pagesize)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      agentaccount(this,this.currentPage, this.pagesize)
    }
  }
}

function agentaccount (that, currentPage, pagesize) {
  request({
    url: that.public.url + '/backend/accountcommnav/getList',
    method: 'post',
    data: {
      pageno: currentPage,
      pagerows: pagesize,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getlist (that) {
  request({
    url: that.public.url + '/backend/accountcommnav/getmodules',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.list = res.data
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
