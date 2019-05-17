<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="quicksetbankadd">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类型">
                <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in list"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行名称">
                <el-input v-model="formInline.name" placeholder="银行名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行编码">
              <el-input v-model="formInline.code" placeholder="银行编码" clearable></el-input>
            </el-form-item>
          </el-col>
 
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="quicksetbankgetlist">查询</el-button>
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
      label="类型">
      <template slot-scope="scope">
        {{scope.row.type | type}}
      </template>
    </el-table-column>
    <el-table-column
      prop="code"
      label="银行编码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="银行名称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="quicksetbankupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="quicksetbankdel">删除</el-button>
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
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" filterable clearable>
              <el-option
                v-for="item in list"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
      </el-form-item>
       <el-form-item label="银行编码" :label-width="formLabelWidth" prop='code'>
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="银行名称" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name"></el-input>
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
import { validatAlphabets } from '@/utils/validate'
export default {
  data() {
    const codebank = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行编码'))
      } else if(!validatAlphabets(value)){
        callback(new Error('银行编码必须为字母'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        name: '',
        code: '',
        type: ''
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        type: '',
        name: '',
        code: ''
      },
      list: [
        {name: '银行支付', type: '10'},
        {name: '支付宝支付', type: '20'},
        {name: '微信支付', type: '30'},
        {name: '其他支付', type: '40'}
      ],
      rules: {
        type: [
          {required: true, message: '请选择类型', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入银行名称', trigger: 'blur'}
        ],
        code: [{ required: true, trigger: 'blur', validator: codebank }],
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
    if (!this.quicksetbank.length && this.quicksetbank.length != 0) {
      that.formInline.type = this.quicksetbank.type
      that.currentPage = this.quicksetbank.currentPage
      that.pagesize = this.quicksetbank.pagesize
      that.formInline.name = this.quicksetbank.name
      that.formInline.code = this.quicksetbank.code
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
    }
  },
  computed: {
    ...mapGetters([
      'quicksetbankgetlist',
      'quicksetbankdel',
      'quicksetbankupdate',
      'quicksetbankadd',
      'quicksetbank'
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
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
      let setquicksetbank = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setquicksetbank', setquicksetbank)
    },
    edit(data) {
      this.title = '编辑银行编码设置'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/quicksetbank/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.code = res.data.code
            that.form.name = res.data.name
            that.form.type = res.data.type
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增银行编码设置'
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑银行编码设置') {
             request({
              url: that.public.url + '/quicksetbank/update',
              method: 'post',
              data: {
                    type: this.form.type,
                    code: this.form.code,
                    name: this.form.name,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/quicksetbank/add',
            method: 'post',
            data: {
                  type: this.form.type,
                  code: this.form.code,
                  name: this.form.name
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
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
            url: that.public.url + '/quicksetbank/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
           getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
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
      getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.code)
      let setquicksetbank = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setquicksetbank', setquicksetbank)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.code)
      let setquicksetbank = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setquicksetbank', setquicksetbank)
    }
  },
  filters: {
    type (val) {
      if (val === '10') {
        return '银行支付'
      }
      if (val === '20') {
        return '支付宝支付'
      }
      if (val === '30') {
        return '微信支付'
      }
      if (val === '40') {
        return '其他支付'
      }
    }
  }
}

function getlist (that, type, currentPage, pagesize, name, code) {
  request({
    url: that.public.url + '/quicksetbank/getList',
    method: 'post',
    data: {
      type: type,
      pageno: currentPage,
      pagerows: pagesize,
      name: name.trim(),
      code: code.trim()
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
