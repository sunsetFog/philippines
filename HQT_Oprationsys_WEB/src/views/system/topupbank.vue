<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="paybankcardaddpaybank">新增 + </el-button>
          </el-col>
          <!-- <el-col :span="6">
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
          </el-col> -->
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
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paybankcardgetpaybanklist">查询</el-button>
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
      label="ID">
      <template slot-scope="scope">
        {{scope.row.id}}
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
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="paybankcardupdatepaybank">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="paybankcarddelpaybank">删除</el-button>
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


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
        <!-- <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" filterable clearable>
              <el-option
                v-for="item in list"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
      </el-form-item> -->
       <el-form-item label="银行编码" :label-width="formLabelWidth" prop='code'>
        <el-input v-model="form.code" maxlength="20"></el-input>
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
import { validatAlphabets,validatNumberLowerCase2 } from '@/utils/validate'
export default {
  data() {
    const codebank = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行编码'))
      } else if(!validatAlphabets(value)&&!validatNumberLowerCase2(value)){
        callback(new Error('银行编码必须为纯字母或字母数字组合'))
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
      pagesize: 20
    }
  },
  created() { 
    let that = this
    if (!this.topupbank.length && this.topupbank.length != 0) {
      that.currentPage = this.topupbank.currentPage
      that.pagesize = this.topupbank.pagesize
      that.formInline.name = this.topupbank.name
      that.formInline.code = this.topupbank.code
      getlist(that, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
    }
  },
  computed: {
    ...mapGetters([
      'paybankcardgetpaybanklist',
      'paybankcarddelpaybank',
      'paybankcardupdatepaybank',
      'paybankcardaddpaybank',
      'topupbank'
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
      getlist(that, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
      let settopupbank = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('settopupbank', settopupbank)
    },
    edit(data) {
      this.title = '编辑银行编码设置'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/paybankcard/getpaybankinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.code = res.data.code
            that.form.name = res.data.name
            // that.form.type = res.data.type
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
              url: that.public.url + '/paybankcard/updatepaybank',
              method: 'post',
              data: {
                    // type: this.form.type,
                    code: this.form.code,
                    name: this.form.name,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/paybankcard/addpaybank',
            method: 'post',
            data: {
                  // type: this.form.type,
                  code: this.form.code,
                  name: this.form.name
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
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
            url: that.public.url + '/paybankcard/delpaybank',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
           getlist(that, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
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
      getlist(this, this.currentPage, this.pagesize, this.formInline.name, this.formInline.code)
      let settopupbank = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('settopupbank', settopupbank)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this, this.currentPage, this.pagesize, this.formInline.name, this.formInline.code)
      let settopupbank = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('settopupbank', settopupbank)
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

function getlist (that, currentPage, pagesize, name, code) {
  request({
    url: that.public.url + '/paybankcard/getpaybanklist',
    method: 'post',
    data: {
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
