<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-button type="info" round @click="add" v-if="syscleardatasetadd">新增 + </el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox" v-if="syscleardatasetgetlist">
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
    v-if="syscleardatasetgetlist"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id">
    </el-table-column>
    <el-table-column
      prop="name"
      label="清理项目标识">
    </el-table-column>
    <el-table-column
      prop="data_save_day"
      label="数据保留天数">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <span>{{scope.row.status | status}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="syscleardatasetupdate && scope.row.type != 1">修改</el-button>
        <el-button type="text" size="small" @click="up(scope.row)" v-if="syscleardatasetupdatestatus && scope.row.status == 0">启用</el-button>
        <el-button type="text" size="small" @click="down(scope.row)" v-if="syscleardatasetupdatestatus && scope.row.status == 1">禁用</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="syscleardatasetdel && scope.row.type != 1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<div class="pagingbox" v-if="syscleardatasetgetlist">
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


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
        <el-input v-model="form.id" style="width:50%" v-if="showadd"></el-input><span class="red" v-if="showadd">请按照程序要求填写</span>
        <span v-if="!showadd">{{form.id}}</span>
      </el-form-item>
      <el-form-item label="清理项目标识" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item label="数据保留天数" :label-width="formLabelWidth" prop="day">
        <el-input v-model="form.day" style="width:50%" type="number"></el-input><span>天</span>
      </el-form-item>
      <el-form-item label="清理状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>启用</el-radio>
              </el-radio-group>
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
import { mapGetters } from 'vuex'
export default {
  filters: {
    status (val) {
      if (val == '1') {
        return '启用'
      }
      if (val == '0') {
        return '禁用'
      }
    }
  },
  data() {
    var dayrules = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入数据保留天数'));
      }else {
        if(value*1<0 || value.indexOf('.')>0) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      }
   }; 
    return {
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        day: '',
        status: ''
      },
      rules: {
        id: [
          {required: true, message: '请输入ID', trigger: 'blur'}
        ],
        name: [
          {required: false, message: '', trigger: 'blur'}
        ],
        day: [
          {required: true, validator: dayrules, trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择清理状态', trigger: 'change'}
        ],
      },
      formLabelWidth: '120px',
      title: '',
      total: 0,
      pagesize: 20,
      id: '',
      showadd: true
    }
  },
  created() {
    getlist(this)    
  },
  computed: {
    ...mapGetters([
      'syscleardatasetadd',
      'syscleardatasetgetlist',
      'syscleardatasetupdate',
      'syscleardatasetdel',
      'syscleardatasetupdatestatus'
    ])
  },
  watch: {
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    edit(row) {
      this.title = '修改清理项目'
      this.showadd = false
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/syscleardataset/getinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.id = res.data.id
            that.form.id  = res.data.id
            that.form.name = res.data.name
            that.form.day = res.data.data_save_day
            that.form.status = res.data.status *1
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增清理项目'
      this.showadd = true
      this.dialogFormVisible = true
    },
    up(row) {
      let that = this
      this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/syscleardataset/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    down(row) {
      let that = this
      this.$confirm('此操作将停用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/syscleardataset/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 0
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '修改清理项目') {
             request({
              url: that.public.url + '/backend/syscleardataset/update',
              method: 'post',
              data: {
                  id: this.id,
                  name: this.form.name,
                  data_save_day: this.form.day,
                  status: this.form.status,
              }
            }).then(res => {
              if (res.code === 0) {
                that.$message.success(res.message)
                that.dialogFormVisible = false
                that.$refs.form.resetFields()
                getlist(that)
              }
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/syscleardataset/add',
            method: 'post',
            data: {
                  id: this.form.id,
                  name: this.form.name,
                  data_save_day: this.form.day,
                  status: this.form.status,
            }
          }).then(res => {
            if (res.code === 0) {
            that.$message.success(res.message)
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that)
            }
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
            url: that.public.url + '/backend/syscleardataset/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.$message.success(res.message)
            getlist(that)
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
      getlist(this)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/backend/syscleardataset/getList',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
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
</style>
