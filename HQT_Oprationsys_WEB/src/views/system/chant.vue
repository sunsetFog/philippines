<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="back">返回 </el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="paychanneladdchannelbank">新增 + </el-button>
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
            <el-form-item label="前端分类">
              <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in allpaymode2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
                <!-- <el-option
                  v-for="item in type"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in list"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
 
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paychannelgetlistchannelbank">查询</el-button>
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
    width='180'
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="channel_name"
      label="充值来源">
    </el-table-column>
    <el-table-column
      prop="paymodel_name"
      label="前端分类">
    </el-table-column>
    <el-table-column
      label="银行名称">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column
      prop="code"
      label="银行代码">
    </el-table-column>
    <el-table-column
      prop="financial_ident"
      label="财务识别">
    </el-table-column>
    <el-table-column
      prop="day_in_max_limit"
      label="单日限额">
    </el-table-column>
    <el-table-column
      prop="cha_broker_rate"
      label="玩家手续费费率">
    </el-table-column>
    <el-table-column
      label="最低限额">
      <template slot-scope="scope">
        {{scope.row.one_in_min_limit}}
      </template>
    </el-table-column>
    <el-table-column
      prop="one_in_max_limit"
      label="最高限额">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | status}}
      </template>
    </el-table-column>
    <el-table-column
      prop="sortid"
      label="排序">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="paychannelupdatechannelbank">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="paychanneldelchannelbank">删除</el-button>
        <el-button type="text" size="small" @click="up(scope.row)" v-if="paychannelbankupdatestatus && scope.row.status === '0'" class="green">启用</el-button>
        <el-button type="text" size="small" @click="down(scope.row)" v-if="paychannelbankupdatestatus && scope.row.status === '1'" class="red">禁用</el-button>
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
      <el-form-item label="充值来源" :label-width="formLabelWidth" prop='key'>
        <el-select v-model="form.key" filterable clearable placeholder='请选择充值来源'>
                <el-option
                  v-for="item in allname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
       <el-form-item label="前端分类" :label-width="formLabelWidth" prop='web'>
        <el-select v-model="form.web" filterable clearable placeholder='请选择前端的充值方式'>
                <el-option
                  v-for="item in allpaymode"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
      <el-form-item label="银行名称" :label-width="formLabelWidth" prop="name">
        <el-select v-model="form.name" filterable clearable placeholder='请选择' @change="selectGet">
              <el-option
                v-for="item in bankname"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="银行代码" :label-width="formLabelWidth" prop='code'>
        <el-input v-model="form.code" placeholder='请按技术需求填写'></el-input>
      </el-form-item>
      <el-form-item label="财务识别" :label-width="formLabelWidth" prop='ident'>
        <el-input v-model="form.ident" placeholder='财务识别'></el-input>
      </el-form-item>
       <el-form-item label="单日限额" :label-width="formLabelWidth"  prop='day'>
        <el-input v-model="form.day" placeholder='精确至分，单个银行的每日限额'></el-input>
      </el-form-item>
       <el-form-item label="最低限额" :label-width="formLabelWidth" prop='min'>
        <el-input v-model="form.min" placeholder='精确至分'></el-input>
      </el-form-item>
       <el-form-item label="最高限额" :label-width="formLabelWidth" prop='max'>
        <el-input v-model="form.max" placeholder='精确至分'></el-input>
      </el-form-item>
       <el-form-item label="充值渠道费率" :label-width="formLabelWidth" prop='rate'>
        <el-input v-model="form.rate" placeholder='精确到小数点后二位' style="width:50%"></el-input><span>%</span>
      </el-form-item>
       <el-form-item label="平台支付费率" :label-width="formLabelWidth" prop='plarate'>
        <el-input v-model="form.plarate" placeholder='精确到小数点后二位' style="width:50%"></el-input><span>%</span>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop='sort'>
        <el-input v-model="form.sort" placeholder='0-100,整数'></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="form.status" filterable>
              <el-option
                v-for="item in list"
                :key="item.type"
                :label="item.name"
                :value="item.type">
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
export default {
  data() {
    var rules = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('输入不能为空'));
      }else {
        var integer = /^[1-9]\d*$|^[1-9]\d*\.\d\d?$|^0\.\d\d?$/ //金额保留两位小数
        if(integer.test(value)  || value == '0') {
          callback();
        } else {
           callback(new Error('保留两位小数'));
        }
      }
   }; 
   var solts = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('输入不能为空'));
      }else {
        
        if(value*1<0||value*1>100||value.indexOf('.')>0) {
          callback(new Error('请输入0到100的整数'));
        } else {
            callback();
        }
      }
   }; 
    return {
      formInline: {
        name: '',
        type: '',
        status: ''
      },
      currentPage: 1,
      allname: [],
      tableData: [],
      dialogFormVisible: false,
      id: '',
      bankname: [],
      form: {
        key: '',
        web: '',
        name: '',
        code: '',
        ident: '',
        day: '',
        min: '',
        max: '',
        rate: '',
        plarate: '',
        sort: '',
        status: '1'
      },
      type: [
        {name: '银行支付', type: '10'},
        {name: '支付宝支付', type: '20'},
        {name: '微信支付', type: '30'},
        {name: '其他支付', type: '40'},
      ],
      list: [
        {name: '启用', type: '1'},
        {name: '禁用', type: '0'},
      ],
      rules: {
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        key: [
          {required: true, message: '请选择充值来源', trigger: 'change'}
        ],
        web: [
          {required: true, message: '请选择前端分类', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请选择银行名称', trigger: 'change'}
        ],
        day:[
          {required: false, validator: rules, trigger: 'blur'}
        ],
        code: [{required: true, message: '请输入银行代码', trigger: 'blur'}],
        min: [{required: true, message: '请输入最低限额', trigger: 'blur'}],
        max: [{required: true, message: '请输入最高限额', trigger: 'blur'}],
        rate: [{required: true, message: '请输入充值渠道费率', trigger: 'blur'}],
        plarate: [{required: true, message: '请输入平台支付费率', trigger: 'blur'}],
        sort: [{required: true, validator: solts, trigger: 'blur'}],
      },
      nowid: '',
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      allpaymode: [],
      allpaymode2: []
    }
  },
  created() { 
    getbankname(this)
    getallname(this)
    getallpaymode(this)
    let that = this
    if (!this.chant.length && this.chant.length != 0) {
      that.formInline.type = this.chant.type
      that.currentPage = this.chant.currentPage
      that.pagesize = this.chant.pagesize
      that.formInline.name = this.chant.name
      that.formInline.status = this.chant.status
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
    }
  },
  computed: {
    ...mapGetters([
      'paychanneladdchannelbank',
      'paychanneldelchannelbank',
      'paychannelupdatechannelbank',
      'paychannelgetlistchannelbank',
      'paychannelbankupdatestatus',
      'chant'
    ])
  },
  // watch: {
  //   'bankname':{
  //     handler:function(val,oldval){
  //       console.log('11'+ val)
  //       console.log('22'+oldval)
  //     },
  //     deep:true
  //   },
  // },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    back () {
      this.$router.push({path: '/bank/paychannel'})
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
      let setchant = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'status': that.formInline.status
      }
      this.$store.commit('setchant', setchant)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 11 && row.status === '1') {
        return 'green'
      }
      if (columnIndex === 11 && row.status === '0') {
        return 'red'
      }
    },
    edit(data) {
      this.title = '编辑充值银行列表'
      this.dialogFormVisible = true
      this.nowid = data.id
      let that = this
      request({
            url: that.public.url + '/paychannelbank/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.key = res.data.channel_id
            that.form.web = res.data.paymode_id
            that.form.name = res.data.bank_id
            that.form.code = res.data.code
            that.form.ident = res.data.financial_ident
            that.form.day = res.data.day_in_max_limit
            that.form.min = res.data.one_in_min_limit //最低限额
            that.form.max = res.data.one_in_max_limit //最高限额
            that.form.rate = res.data.cha_broker_rate //请输入充值渠道费率
            that.form.plarate = res.data.pla_broker_rate //请输入平台支付费率
            that.form.sort = res.data.sortid //请输入排序
            that.form.status = res.data.status
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增充值银行列表'
      this.dialogFormVisible = true
       
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑充值银行列表') {
             request({
              url: that.public.url + '/paychannelbank/update',
              method: 'post',
              data: {
                    channel_id: that.form.key,
                    paymode_id: that.form.web,
                    bank_id: that.form.name,
                    code: that.form.code,
                    financial_ident: that.form.ident,
                    day_in_max_limit: that.form.day,
                    one_in_min_limit: that.form.min,
                    one_in_max_limit: that.form.max,
                    cha_broker_rate: that.form.rate,
                    pla_broker_rate: that.form.plarate,
                    sortid: that.form.sort,
                    status: that.form.status,
                    id: this.nowid
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              });
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/paychannelbank/add',
            method: 'post',
            data: {
                  channel_id: that.form.key,
                  paymode_id: that.form.web,
                  bank_id: that.form.name,
                  code: that.form.code,
                  financial_ident: that.form.ident,
                  day_in_max_limit: that.form.day,
                  one_in_min_limit: that.form.min,
                  one_in_max_limit: that.form.max,
                  cha_broker_rate: that.form.rate,
                  pla_broker_rate: that.form.plarate,
                  sortid: that.form.sort,
                  status: that.form.status
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            });
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
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
            url: that.public.url + '/paychannelbank/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
           getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    up (row) {
      let that = this
      this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paychannelbank/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
           getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    down (row) {
      let that = this
      this.$confirm('此操作将禁用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paychannelbank/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 0
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
           getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.status)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.status)
      let setchant = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'status': that.formInline.status
      }
      this.$store.commit('setchant', setchant)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.status)
      let setchant = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'status': that.formInline.status
      }
      this.$store.commit('setchant', setchant)
    },
    selectGet(vId){
      if(this.form.name){
           let obj = {}
          obj = this.bankname.find((item)=>{
          return item.id === vId
        })
        if(obj.id){
           this.form.code = obj.code
        }
      }
     
    },
  },
  filters: {
    status (val) {
      if (val === '1') {
        return '启用'
      }
      if (val === '0') {
        return '禁用'
      }
    }
  }
}

function getlist (that, type, currentPage, pagesize, name, status) {
  request({
    url: that.public.url + '/paychannelbank/getlist',
    method: 'post',
    data: {
      status: status,
      pageno: currentPage,
      pagerows: pagesize,
      paymode_id: type,
      channel_id: name
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getbankname (that) {
   request({
    url: that.public.url + '/paychannel/getbankname',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.bankname = res.data
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



function getallpaymode (that) {
  request({
    url: that.public.url + '/paychannel/getallpaymode',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.allpaymode = res.data
     that.allpaymode2 = res.data
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
