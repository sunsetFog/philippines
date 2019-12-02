<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="paychanneladd">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="充值来源">
                <!-- <el-input v-model="formInline.name" placeholder="充值来源" clearable></el-input> -->
                <el-select v-model="formInline.name" filterable clearable>
                <el-option
                  v-for="item in allname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代码">
              <el-input clearable placeholder="代码" v-model="formInline.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
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
 
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paychannelgetlist">查询</el-button>
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
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      width='50'
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="name"
      label="充值来源">
    </el-table-column>
    <el-table-column
      prop="acc_code"
      label="代码">
    </el-table-column>
    <!-- <el-table-column
      prop="val_grade_id"
      label="价值量等价">
    </el-table-column> -->
    <el-table-column
      prop="depict"
      label="说明">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | type}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="view(scope.row)" type="text" size="small" v-if="paychannelupdatevalgread">价值量</el-button>
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="paychannelupdatecompay">商家参数</el-button>
        <!-- <el-button @click="view(scope.row)" type="text" size="small" v-if="paychannelgetinfo">详情</el-button> -->
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="paychanneldel">删除</el-button>
        <el-button type="text" size="small" @click="up(scope.row)" v-if="paychannelupdatestatus && scope.row.status === '0'" class="green">启用</el-button>
        <el-button type="text" size="small" @click="down(scope.row)" v-if="paychannelupdatestatus && scope.row.status === '1'" class="red">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="银行账号"
      >
      <template slot-scope="scope">
        <el-button size="small" @click="chant(scope.row)">充值银行</el-button>
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
        
       
      <el-form-item label="充值来源" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
       <el-form-item label="别名" :label-width="formLabelWidth" prop='othername'>
        <el-input v-model="form.othername" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
       <el-form-item label="代码" :label-width="formLabelWidth">
        <el-input v-model="form.code" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
      <el-form-item label="密匙" :label-width="formLabelWidth" prop='key'>
        <el-input v-model="form.key" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="提现请求地址" :label-width="formLabelWidth" prop='wdr_req_url'>
        <el-input v-model="form.wdr_req_url" :placeholder="placeholder"></el-input>
      </el-form-item>
       <el-form-item label="充值请求地址" :label-width="formLabelWidth" prop='pay_req_url'>
        <el-input v-model="form.pay_req_url" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="查单地址" :label-width="formLabelWidth" prop='qry_order_url'>
        <el-input v-model="form.qry_order_url" :placeholder="placeholder"></el-input>
      </el-form-item>

      

      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="form.status" filterable clearable>
              <el-option
                v-for="item in list1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="说明" :label-width="formLabelWidth" prop="depict">
        <el-input v-model="form.depict"></el-input>
      </el-form-item>
       <!-- <el-form-item label="价值量等级设置" :label-width="formLabelWidth" prop="depict">
        
      </el-form-item> -->


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>


    <el-dialog :title='title'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
        
       
      <el-form-item label="充值来源" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form2.name" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
       <el-form-item label="别名" :label-width="formLabelWidth" prop='othername'>
        <el-input v-model="form2.othername" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
       <el-form-item label="代码" :label-width="formLabelWidth">
        <el-input v-model="form2.code" placeholder="请按技术需求填写"></el-input>
      </el-form-item>
      <el-form-item label="密匙" :label-width="formLabelWidth" prop='key'>
        <el-input v-model="form2.key" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="提现请求地址" :label-width="formLabelWidth" prop='wdr_req_url'>
        <el-input v-model="form2.wdr_req_url" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="充值请求地址" :label-width="formLabelWidth" prop='pay_req_url'>
        <el-input v-model="form2.pay_req_url" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="查单地址" :label-width="formLabelWidth" prop='qry_order_url'>
        <el-input v-model="form2.qry_order_url" :placeholder="placeholder"></el-input>
      </el-form-item>
       <el-form-item label="我方使用公钥" :label-width="formLabelWidth">
        <el-input v-model="form2.my_pub_key" ></el-input>
      </el-form-item>
      <el-form-item label="对方使用公钥" :label-width="formLabelWidth">
        <el-input v-model="form2.it_pub_key" ></el-input>
      </el-form-item>



    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form)">取 消</el-button>
      <el-button type="primary" @click="sure2(form)">确 定</el-button>
    </div>

  </el-dialog>

  
  <el-dialog title='支付渠道详情'  :visible.sync="dialogFormVisible1" :before-close="reset1">
    <el-form>
        
       
      <el-form-item label="充值来源" :label-width="formLabelWidth">
        {{form.name}}
      </el-form-item>
      <el-form-item label="说明" :label-width="formLabelWidth">
        <el-input v-model="form1.depict"></el-input>
      </el-form-item>
      <el-form-item label="价值量等级设置" :label-width="formLabelWidth">
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset1(form)">取 消</el-button>
      <el-button type="primary" @click="sure1(form)">确 定</el-button>
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
    var brokerrate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手续费率'));
        } else if (value *1 < 0) {
          callback(new Error('手续费率必须为大于等于0的数'));
        } else {
          callback();
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
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form1: {
        depict: ''
      },
      form: {
        name: '',
        code: '',
        othername: '',
        key: '',
        pay_req_url: '',
        wdr_req_url: '',
        qry_order_url: '',
        depict: '',
        status: '1'
      },
      form2: {
        name: '',
        code: '',
        othername: '',
        key: '',
        pay_req_url: '',
        wdr_req_url: '',
        qry_order_url: '',
        my_pub_key:'',
        it_pub_key:'',
      },
      list: [
        {name: '全部', type: ''},
        {name: '启用', type: '1'},
        {name: '禁用', type: '0'},
      ],
      list1: [
        {name: '启用', type: '1'},
        {name: '禁用', type: '0'},
      ],
      rules: {
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入充值来源', trigger: 'blur'}
        ],
        othername: [
          {required: true, message: '请输入别名', trigger: 'blur'}
        ],
        code: [{required: true, message: '请输入商户代码', trigger: 'blur'}],
        key: [{required: true, message: '请输入密匙', trigger: 'blur'}],
        pay_req_url: [{required: false, message: '请输入充值请求地址', trigger: 'blur'}],
        wdr_req_url: [{required: false, message: '请输入提现请求地址', trigger: 'blur'}],
        qry_order_url: [{required: false, message: '请输入查询订单地址', trigger: 'blur'}]
      },
      rules2: {
        name: [
          {required: true, message: '请输入充值来源', trigger: 'blur'}
        ],
        othername: [
          {required: true, message: '请输入别名', trigger: 'blur'}
        ],
        code: [{required: true, message: '请输入商户代码', trigger: 'blur'}]
      },
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      allname: [],
      placeholder: '',
      key: '',
      pay_req_url: '',
      qry_order_url: '',
      wdr_req_url: ''
    }
  },
  created() { 
    let that = this
    if (!this.paychannel.length && this.paychannel.length != 0) {
      that.formInline.type = this.paychannel.type
      that.currentPage = this.paychannel.currentPage
      that.pagesize = this.paychannel.pagesize
      that.formInline.name = this.paychannel.name
      that.formInline.code = this.paychannel.code
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
    }
    getallname(this)
  },
  computed: {
    ...mapGetters([
      'paychanneladd',
      'paychanneldel',
      'paychannelupdate',
      'paychannelgetlist',
      'paychannelgetinfo',
      'paychannelupdatecompay',
      'paychannelupdatevalgread',
      'paychannelupdatestatus',
      'paychannel'
    ])
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    reset2 (form) {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 6 && row.status === '1') {
        return 'green'
      }
      if (columnIndex === 6 && row.status === '0') {
        return 'red'
      }
    },
    reset1 (form) {
      this.dialogFormVisible1 = false
      this.form.depict = ''
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
            url: that.public.url + '/paychannel/updatestatus',
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
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
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
            url: that.public.url + '/paychannel/updatestatus',
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
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },
    sure1 () {
      let that = this
      request({
            url: that.public.url + '/paychannel/updatevalgread',
            method: 'post',
            data: {
                  id: this.id,
                  depict: this.form1.depict
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible1 = false
            that.form.depict = ''
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
          }).catch(error => {
          })
    },
    view (data) {
      this.dialogFormVisible1 = true
      let that = this
      request({
            url: that.public.url + '/paychannel/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            that.id = res.data.id
          }).catch(error => {
          })
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
      let setpaychannel = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setpaychannel', setpaychannel)
    },
    edit(data) {
      this.title = '商家参数'
      this.placeholder = '不填写，默认为不修改'
      this.dialogFormVisible2 = true
      let that = this
      request({
            url: that.public.url + '/paychannel/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form2.code = res.data.acc_code
            that.form2.name = res.data.name
            that.key = res.data.key
            that.pay_req_url = res.data.pay_req_url
            that.wdr_req_url = res.data.wdr_req_url
            that.qry_order_url = res.data.qry_order_url
            that.form2.othername = res.data.alias
            that.id = res.data.id
            that.form2.key = res.data.key
            that.form2.pay_req_url = res.data.pay_req_url
            that.form2.wdr_req_url = res.data.wdr_req_url
            that.form2.qry_order_url = res.data.qry_order_url
            that.form2.my_pub_key = res.data.my_pub_key
            that.form2.it_pub_key = res.data.it_pub_key
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增充值来源设置'
      this.placeholder = '请按技术需求填写'
      this.dialogFormVisible = true
    },
    chant (data) {
      this.$router.push({path:'/chant'})
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/paychannel/add',
            method: 'post',
            data: {
                  name: this.form.name,
                  acc_code: this.form.code,
                  key: this.form.key,
                  alias: this.form.othername,
                  pay_req_url: this.form.pay_req_url,
                  wdr_req_url: this.form.wdr_req_url,
                  qry_order_url: this.form.qry_order_url,
                  status: this.form.status,
                  depict: this.form.depict
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
    sure2 () {
       let that = this
      this.$refs.form2.validate((valid) => {
         if (valid) {
      let pay_req_url = ''
      let qry_order_url = ''
      let key = ''
      let wdr_req_url = ''
      if (this.form2.pay_req_url === '') {
        pay_req_url = this.pay_req_url
      } else {
        pay_req_url = this.form2.pay_req_url
      }
      if (this.form2.qry_order_url === '') {
        qry_order_url = this.qry_order_url
      } else {
        qry_order_url = this.form2.qry_order_url
      }
      if (this.form2.key === '') {
        key = this.key
      } else {
        key = this.form2.key
      }
      if (this.form2.wdr_req_url === '') {
        wdr_req_url = this.wdr_req_url
      } else {
        wdr_req_url = this.form2.wdr_req_url
      }
        request({
        url: that.public.url + '/paychannel/updatecompay',
        method: 'post',
        data: {
              name: this.form2.name,
              acc_code: this.form2.code,
              alias: this.form2.othername,
              key: key,
              pay_req_url: pay_req_url,
              wdr_req_url: wdr_req_url,
              qry_order_url: qry_order_url,
              id: this.id,
              my_pub_key: this.form2.my_pub_key,
              it_pub_key:this.form2.it_pub_key
        }
      }).then(res => {
        that.$message({
              type: 'success',
              message: res.message
            })
        that.dialogFormVisible2 = false
        that.$refs.form2.resetFields()
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.code)
      }).catch(error => {
      })
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
            url: that.public.url + '/paychannel/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
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
      let setpaychannel = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setpaychannel', setpaychannel)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.code)
      let setpaychannel = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'code': that.formInline.code
      }
      this.$store.commit('setpaychannel', setpaychannel)
    }
  },
  filters: {
    type (val) {
      if (val === '1') {
        return '启用'
      }
      if (val === '0') {
        return '禁用'
      }
    }
  }
}

function getlist (that, type, currentPage, pagesize, name, code) {
  request({
    url: that.public.url + '/paychannel/getList',
    method: 'post',
    data: {
      status: type,
      pageno: currentPage,
      pagerows: pagesize,
      id: name,
      acc_code: code.trim()
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getallname (that) {
  request({
    url: that.public.url + '/paychannel/getallnames',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.allname = res.data
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
