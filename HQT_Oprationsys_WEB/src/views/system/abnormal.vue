<template>
  <div class="app-container abnormal">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="paywdrexcpmemoadd">新增 + </el-button>
          </el-col>
          <el-col :span="10">
              <el-form-item label="异常类型">
              <el-select v-model="formInline.type" clearable style="width:200px">
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input v-model="formInline.value" placeholder="" clearable style="width:200px"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否启用">
                <el-select v-model="formInline.status" clearable>
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
            <el-form-item label="预警颜色">
                <el-checkbox-group v-model="formInline.color">
                  <el-checkbox :label='"ff0000"'>红</el-checkbox>
                  <el-checkbox :label='"ffff00"'>黄</el-checkbox>
                  <el-checkbox :label='"00ff00"'>绿</el-checkbox>
                  <el-checkbox :label='""'>无</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="80px">
          
          <el-col :span="6" :offset='2'>
            <el-form-item label="备注信息">
                <el-input v-model="formInline.remark" placeholder="备注信息" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paywdrexcpmemogetlist">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="excel" v-if="paywdrexcpmemoexportlist">导出excel</el-button>
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
    <el-table-column label="异常状态">
        <template slot-scope="scope">{{scope.row.type | type}}</template>
    </el-table-column>
    <el-table-column
      prop="value"
      label="异常值"
      >
    </el-table-column>
    <el-table-column label="预警颜色">
        <template slot-scope="scope">{{scope.row.color}}</template>
    </el-table-column>
    <el-table-column
      prop="inc_lower_level"
      label="包括下级"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否启用"
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注信息"
      >
    </el-table-column>
    <el-table-column
    width='180'
      prop="create_time"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column  
      prop="create_name"
      label="创建人"
      >
    </el-table-column>
    <el-table-column width='180' label="修改时间">
        <template slot-scope="scope">{{scope.row.update_time | time}}</template>
    </el-table-column>
    <el-table-column
      prop="update_name"
      label="修改人"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="edit(scope.row)" v-if="paywdrexcpmemoupdate">编辑</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="paywdrexcpmemodel">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row class="buttoncenter">
      <el-button type="primary" @click="deletall()" v-if="paywdrexcpmemodel">删除勾选</el-button>
  </el-row>

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
       <el-form-item label="异常类型" :label-width="formLabelWidth" prop='type'>
        <el-select v-model="form.type" filterable clearable>
              <el-option
                v-for="item in list"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-checkbox v-model="checked" v-if="checkedshow">包括下线</el-checkbox>
      </el-form-item>
      
      <el-form-item label="" :label-width="formLabelWidth" prop='value'>
        <el-input v-model="form.value" placeholder='(不超过50个字符)' maxlength='50'></el-input>
      </el-form-item>
       <el-form-item label="预警颜色" :label-width="formLabelWidth" prop='color'>
          <el-radio-group v-model="form.color">
            <el-radio :label='item.id' v-for="(item,key) in colorlist" :key="key">{{item.name}}</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" type='textarea'></el-input>
      </el-form-item>
       <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
         <el-select v-model="form.status" clearable style="width:200px">
                <el-option
                  v-for="item in statuslist1"
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
import { mapGetters } from 'vuex'
export default {
  filters: {
  },
  data() {
    return {
      formInline: {
        status: '',
        color: [],
        type: '',
        value: '',
        remark: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 50,
      keys: [],
      id: '',
      statuslist: [
        {
          id: '',
          name: '全部'
        },
        {
          id: '1',
          name: '启用'
        },
        {
          id: '0',
          name: '不启用'
        }
      ],
      statuslist1: [
        {
          id: '1',
          name: '启用'
        },
        {
          id: '0',
          name: '不启用'
        }
      ],
      colorlist: [
        {
          id: 'ff0000',
          name: '红'
        },
        {
          id: 'ffff00',
          name: '黄'
        },
        {
          id: '00ff00',
          name: '绿'
        },
        {
          id: '',
          name: '无'
        }
      ],
      list: [
        {
          id: '1',
          name: '用户账号'
        },
        {
          id: '2',
          name: '登录IP'
        },
        {
          id: '3',
          name: '银行卡号'
        },
        {
          id: '4',
          name: '银行卡名'
        }
      ],
      multipleSelection: [],
      checkedshow: false,
      title: '',
      dialogFormVisible: false,
      form: {
        status: '1',
        color: '',
        type: '',
        value: '',
        remark: '',
      },
      checked: false,
      rules: {
        type: [
          {required: true, message: '请选择异常类型', trigger: 'change'}
        ],
        value: [
          {required: true, message: '请填写异常值', trigger: 'blur'}
        ],
        color: [
          {required: true, message: '请选择颜色', trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择是否启用', trigger: 'change'}
        ],
        remark: []
      },
      formLabelWidth: '150px',
    }
  },
  created() {
    let that = this
    if (!this.abnormal.length && this.abnormal.length != 0) {
      that.formInline.status = this.abnormal.status
      that.currentPage = this.abnormal.currentPage
      that.pagesize = this.abnormal.pagesize
      that.formInline.value = this.abnormal.value
      that.formInline.type = this.abnormal.type
      that.formInline.color = this.abnormal.color
      that.formInline.remark = this.abnormal.remark
      getlist(that)
    }
  },
  computed: {
    ...mapGetters([
      'paywdrexcpmemogetlist',
      'paywdrexcpmemoadd',
      'paywdrexcpmemodel',
      'paywdrexcpmemoupdate',
      'paywdrexcpmemoexportlist',
      'abnormal'
    ])
  },
  watch: {
    'form.type': function (val) {
      if (val == '1') {
        this.checkedshow = true
      } else {
        this.checkedshow = false
      }
    }
  },
  filters: {
    time: function(val) {
      if (val === "-1") {
        return "";
      } else {
        return val;
      }
    },
    color: function(val) {
        if (val === "1") {
          return '红'
        }
        if (val === "2") {
          return '黄'
        }
        if (val === "3") {
          return '绿'
        }
        if (val === "4") {
          return '无'
        }
    },
    type: function(val) {
      if (val === "1") {
        return "用户账号";
      }
      if (val === "2") {
        return "登录IP";
      }
      if (val === "3") {
        return "银行卡号";
      }
      if (val === "4") {
        return "银行卡名";
      }
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add () {
      this.title = '新增提款异常备注'
      this.dialogFormVisible = true
    },
    edit (row) {
      let that = this
      this.title = '编辑提款异常备注'
      this.dialogFormVisible = true
      this.id = row.id
      request({
          url: that.public.url + '/backend/paywdrexcpmemo/getinfo',
          method: 'post',
          data: {
              id: this.id
          }
        }).then(res => {
          if (res.data.inc_lower_level == '1') {
            that.checked = true
          } else {
            that.checked = false
          }
          that.form = res.data
          that.form.color = res.data.color
        }).catch(error => {
        })
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('二次确认?', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
          if (this.title === '编辑提款异常备注') {
            let lever = ''
            if (this.form.type == '1') {
              if (this.checked) {
                lever = 1
              } else {
                lever = 0
              }
            }
             request({
              url: that.public.url + '/paywdrexcpmemo/update',
              method: 'post',
              data: {
                    id: this.id,
                    type: this.form.type,
                    value: this.form.value,
                    color: this.form.color,
                    status: this.form.status,
                    remark: this.form.remark,
                    inc_lower_level: lever
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              that.checked = false
              getlist(that)
            }).catch(error => {
            })
          } else {
            let lever = ''
            if (this.form.type == '1') {
              if (this.checked) {
                lever = 1
              } else {
                lever = 0
              }
            }
            request({
            url: that.public.url + '/paywdrexcpmemo/add',
            method: 'post',
            data: {
                  type: this.form.type,
                  value: this.form.value,
                  color: this.form.color,
                  status: this.form.status,
                  remark: this.form.remark,
                  inc_lower_level: lever
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            that.checked = false
            getlist(that)
          }).catch(error => {
          })
          }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          return false
        }
      })
    },
    reset (form) {
      this.dialogFormVisible = false
      this.checked = false
      this.$refs.form.resetFields()
    },
    deletall () {
      if (this.multipleSelection.length > 0) {
      let that = this
       let id = this.multipleSelection.map(val => {
          return val.id
        })
        let ids = id.join(',')
        this.$confirm('此操作将删除这些数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
              url: that.public.url + '/backend/paywdrexcpmemo/del',
              method: 'post',
              data: {
                ids: ids
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
          message: '已取消删除'
        });
      });
      }
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setabnormal = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'value': that.formInline.value,
        'type': that.formInline.type,
        'remark': that.formInline.remark,
        'color': that.formInline.color,
      }
      this.$store.commit('setabnormal', setabnormal)
    },
    excel() {
      let that = this
      let color = that.formInline.color.join(',')
      request({
        url: that.public.url + '/backend/paywdrexcpmemo/exportlist',
        method: 'post',
        data: {
          type: that.formInline.type,
          value: that.formInline.value.trim(),
          color: color,
          pageno: that.currentPage,
          pagerows: that.pagesize,
          status: that.formInline.status,
          remark: that.formInline.remark.trim()
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        });
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/paywdrexcpmemo/del',
            method: 'post',
            data: {
              ids: row.id
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
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(that)
      let setabnormal = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'value': that.formInline.value,
        'type': that.formInline.type,
        'remark': that.formInline.remark,
        'color': that.formInline.color,
      }
      this.$store.commit('setabnormal', setabnormal)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that)
      let setabnormal = {
        'status': that.formInline.status,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'value': that.formInline.value,
        'type': that.formInline.type,
        'remark': that.formInline.remark,
        'color': that.formInline.color,
      }
      this.$store.commit('setabnormal', setabnormal)
    }
  }
}


function getlist (that) {
  let color = that.formInline.color.join(',')
  request({
    url: that.public.url + '/backend/paywdrexcpmemo/getlist',
    method: 'post',
    data: {
      type: that.formInline.type,
      value: that.formInline.value.trim(),
      color: color,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      status: that.formInline.status,
      remark: that.formInline.remark.trim()
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
  .abnormal textarea {
    min-height: 130px!important;
  }
</style>
