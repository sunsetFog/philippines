<template>
  <div class="app-container">
    <div class="query" style="margin-bottom:5px;">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="paymodeadd">新增 + </el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
     <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="name"
      label="前端分类">
    </el-table-column>
    <!-- <el-table-column
      label="是否有二级分页">
      <template slot-scope="scope">
        {{scope.row.is_show_selbank | type}}
      </template>
    </el-table-column> -->
    <el-table-column
      label="是否有充值银行选择">
      <template slot-scope="scope">
        {{scope.row.is_show_selbank | type}}
      </template>
    </el-table-column>
    <el-table-column
      label="随机小数点后两位">
      <template slot-scope="scope">
        {{scope.row.is_rand_dec2 | type}}
      </template>
    </el-table-column>
    <el-table-column
      label="生成备注">
      <template slot-scope="scope">
        {{scope.row.is_rand_remark | type}}
      </template>
    </el-table-column>
    <el-table-column
      label="排序">
      <template slot-scope="scope">
        {{scope.row.sortid}}
      </template>
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | status}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.status === '0' && paymodeupdate">修改</el-button>
        <el-button @click="down(scope.row)"  size="small" style="color:red"  v-if="scope.row.status === '1' && paymodeupdatestatus">下架</el-button>
        <el-button @click="up(scope.row)"  size="small" style="color:green"  v-if="scope.row.status === '0' && paymodeupdatestatus">上架</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="scope.row.status === '0' && paymodedel">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
       <el-form-item label="前端分类" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类代码" :label-width="formLabelWidth" prop='controller'>
        <el-input v-model="form.controller"></el-input>
      </el-form-item>
      <el-form-item label="是否有充值银行选择" :label-width="formLabelWidth" prop='checked'>
        <el-checkbox v-model="form.checked">是</el-checkbox>
      </el-form-item>
      <!-- <el-form-item label="快捷金额" :label-width="formLabelWidth">
          <el-input placeholder='整数' v-model="item.value" style="width: 200px;margin-bottom: 10px;margin-right:5px;" v-for="(item, index) in money" :key='index'></el-input>  
      </el-form-item> -->
      <el-form-item label="随机小数点后两位" :label-width="formLabelWidth" prop='dec'>
        <el-checkbox v-model="form.dec">是</el-checkbox>
      </el-form-item>
      <el-form-item label="生成随机备注" :label-width="formLabelWidth" prop='remark'>
        <el-checkbox v-model="form.remark">生成</el-checkbox>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop='sort'>
        <el-input placeholder='整数,1-99' type='number' v-model="form.sort"></el-input>  
      </el-form-item>
       <el-form-item label="状态" :label-width="formLabelWidth" prop="action">
        <el-select v-model="form.action" clearable>
              <el-option
                v-for="item in list"
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
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    var solts = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请填排序'));
      }else {
        if(value*1<0||value*1>100||value.indexOf('.')>0) {
          callback(new Error('请输入0到100的整数'));
        } else {
            callback();
        }
      }
   }; 
    return {
      tableData: [],
      userlist: [],
      list: [
        {id: '0',name: '下架'},
        {id: '1',name: '上架'}
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        controller: '',
        action: '',
        checked: false,
        sort: '',
        remark: '',
        dec: ''
      },
      rules: {
        name: [
          {required: true, message: '请填写前端分类', trigger: 'blur'}
        ],
        controller: [
          {required: true, message: '请填写分类代码', trigger: 'blur'}
        ],
        action: [
          {required: true, message: '请选择方法名称', trigger: 'change'}
        ],
        sort: [{required: true, validator: solts, trigger: 'blur'}],
        checked:[],
        remark: [],
        dec: []
      },
      formLabelWidth: '150px',
      title: '',
      name: '',
      // money: [
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      // ]
    }
  },
  created() { 
    let that = this
    getlist(that)
  },
  computed: {
    ...mapGetters([
      'paymodeadd',
      'paymodedel',
      'paymodeupdate',
      'paymodeupdatestatus'
    ])
  },
  filters: {
      type (val) {
        if (val === '1') {
          return '是'
        }
        if (val === '0') {
          return '否'
        }
      },
      status (val) {
        if (val === '1') {
          return '上架中'
        }
        if (val === '0') {
          return '下架中'
        }
      }
    },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      // this.money = [
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      //   {value: ''},
      // ]
    },
    edit(data) {
      this.title = '编辑前端分类管理'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/paymode/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            that.form.controller = res.data.code
            that.form.action = res.data.status
            if (res.data.is_show_selbank === '1') {
              that.form.checked = true
            } else {
              that.form.checked = false
            }
            if (res.data.is_rand_dec2 === '1') {
              that.form.dec = true
            } else {
              that.form.dec = false
            }
            if (res.data.is_rand_remark === '1') {
              that.form.remark = true
            } else {
              that.form.remark = false
            }
            that.form.sort = res.data.sortid
            // let money = res.data.quickmoney.split(',')
            // let moneylength = 8 - money.length * 1
            // let newmoney = money.map(val =>{
            //   return {value: val}
            // })
            // for (var i = 0;i<moneylength;i++) {
            //   var obj = {}
            //   obj.value = ''
            //   newmoney.push(obj)
            // }
            // this.money = newmoney
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增前端分类管理'
      this.dialogFormVisible = true
    },
    up (row) {
      let that = this
      this.$confirm('此操作将上架该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paymode/updatestatus',
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
          message: '已取消上架'
        });
      });
    },
    down (row) {
       let that = this
      this.$confirm('此操作将下架该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paymode/updatestatus',
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
          message: '已取消下架'
        });
      });
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑前端分类管理') {
            // let flag = true
            // var money = []
            // this.money.map(val => {
            //   if (val.value.indexOf('.')> 0 || val.value * 1 < 0) {
            //     this.$message({
            //       type: 'error',
            //       message: '快捷金额为大于0的整数'
            //     });
            //     flag = false
            //   } else {
            //     if (val.value != '') {
            //       money.push(val.value)
            //     }
            //   }
            // })
            // if (!flag) {
            //   return false
            // }
            // let lastmoney = money.join(',')
            let checked = ''
            if (this.form.checked) {
              checked = '1'
            } else {
              checked = '0'
            }
            let dec = ''
            if (this.form.dec) {
              dec = '1'
            } else {
              dec = '0'
            }
            let remark = ''
            if (this.form.remark) {
              remark = '1'
            } else {
              remark = '0'
            }
             request({
              url: that.public.url + '/backend/paymode/update',
              method: 'post',
              data: {
                    code: this.form.controller,
                    name: this.form.name,
                    status: this.form.action,
                    is_show_selbank: checked,
                    is_rand_dec2: dec,
                    is_rand_remark: remark,
                    sortid: this.form.sort,
                    quickmoney: '',
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that)
            }).catch(error => {
            })
          } else {
            // let flag = true
            // var money = []
            // this.money.map(val => {
            //   if (val.value.indexOf('.')> 0 || val.value * 1 < 0) {
            //     this.$message({
            //       type: 'error',
            //       message: '快捷金额为大于0的整数'
            //     });
            //     flag = false
            //   } else {
            //     if (val.value != '') {
            //       money.push(val.value)
            //     }
            //   }
            // })
            // if (!flag) {
            //   return false
            // }
            // let lastmoney = money.join(',')
            let checked = ''
            if (this.form.checked) {
              checked = '1'
            } else {
              checked = '0'
            }
            let dec = ''
            if (this.form.dec) {
              dec = '1'
            } else {
              dec = '0'
            }
            let remark = ''
            if (this.form.remark) {
              remark = '1'
            } else {
              remark = '0'
            }
            request({
            url: that.public.url + '/backend/paymode/add',
            method: 'post',
            data: {
                  code: this.form.controller,
                  name: this.form.name,
                  status: this.form.action,
                  is_show_selbank: checked,
                  is_rand_dec2: dec,
                  is_rand_remark: remark,
                  sortid: this.form.sort,
                  quickmoney: ''
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that)
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
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/paymode/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
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
  }
}

function getlist (that) {
  request({
    url: that.public.url + '/backend/paymode/getlist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.tableData = res.data
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
