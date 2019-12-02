<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="150px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="orgadd">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家渠道">
              <el-select v-model="formInline.user" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="域名">
              <el-select v-model="formInline.url" multiple filterable>
              <el-option
                v-for="item in domainlists"
                :key="item.id"
                :label="item.url"
                :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-input v-model="formInline.id" clearable></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formInline.status" filterable>
              <el-option
                v-for="item in statuslists"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="orggetlist">查询</el-button>
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
      prop="id"
      label="渠道代码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="secretkey"
      label="授权key">
    </el-table-column>
    <el-table-column
      prop="url"
      width="350"
      label="域名">
    </el-table-column>
    <el-table-column
      label="创建时间">
      <template slot-scope="scope">
        {{scope.row.create_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      label="修改时间">
      <template slot-scope="scope">
        {{scope.row.update_time | time}}
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="orgupdate">修改</el-button>
        <el-button @click="editdomain(scope.row)" type="text" size="small" v-if="orgupdate">修改域名</el-button>
        <el-button @click="key(scope.row)" type="text" size="small" v-if="orgupdate">重新生成key</el-button>
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
      <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
         <el-select v-model="form.type" filterable>
              <el-option
                v-for="item in typelist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
      </el-form-item>
        <el-form-item label="玩家渠道" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="域名" :label-width="formLabelWidth" prop="domain">
         <el-select v-model="form.domain" multiple filterable style="width:100%">
              <el-option
                v-for="item in domainlist"
                :key="item.id"
                :label="item.url"
                :value="item.id">
              </el-option>
            </el-select>
      </el-form-item>
    <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio :label='0'>禁用</el-radio>
        <el-radio :label='1'>可用</el-radio>
      </el-radio-group>
    </el-form-item>
     <el-form-item label="是否接入大厅：" :label-width="formLabelWidth">
      <el-radio-group v-model="form.status2">
        <el-radio :label='1'>接入</el-radio>
        <el-radio :label='0'>不接入</el-radio>    
      </el-radio-group>
    </el-form-item>
      <el-form-item label="游戏入口地址：" :label-width="formLabelWidth" >
        <el-input v-model="form.enturl"></el-input>
      </el-form-item>
       <el-form-item label="访问IP限制：" :label-width="formLabelWidth" placeholder="多个IP请用,分隔" >
        <el-input v-model="form.allow_ip"></el-input>
      </el-form-item>
     <el-form-item label="渠道抽水" :label-width="formLabelWidth" prop='reward'>
        <span>玩家流水的</span><el-input v-model="form.reward" type="number" style="width: 30%;"></el-input><span>%</span>
      </el-form-item>

       <el-form-item label="返佣比例" :label-width="formLabelWidth" prop="tableData2">
        <span class="red">所有下级代理的返佣比例必须低于总代</span>
      

        <el-form :model="form">

        
       <el-table
    :data="form.tableData2"
    border
    style="width: 100%">
    <el-table-column
      label="代理级别"
      >
      <template slot-scope="scope">
        <span v-if="scope.$index == 0">总代</span>
        <span v-else>{{String.fromCharCode(scope.$index+64)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="返佣比例"
      >
      <template slot-scope="scope">
        <el-form-item prop='tableData2' :rules="rules.amount(scope.$index)">
          <el-input v-model="scope.row.reward" type="number" style="width:80%"></el-input><span>%</span>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column
      label="配额数量"
      >
      <template slot-scope="scope">
        <el-input v-model="scope.row.num" type="number"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <el-button @click="addnum(scope.$index,scope.row)" type="text" size="small">添加</el-button>
        <el-button @click="delnum(scope.$index,scope.row)" type="text" size="small" v-if="scope.$index != 0">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  </el-form>

  </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>


  <el-dialog title='修改渠道域名'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
      <el-form-item label="类型" :label-width="formLabelWidth">
         <span>{{form2.type}}</span>
      </el-form-item>
        <el-form-item label="玩家渠道" :label-width="formLabelWidth">
        <span>{{form2.name}}</span>
      </el-form-item>

      <el-form-item label="域名" :label-width="formLabelWidth" prop="domain">
         <el-select v-model="form2.domain" multiple filterable style="width:100%">
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
      <el-button @click="reset2(form)">取 消</el-button>
      <el-button type="primary" @click="sure2(form)">确 定</el-button>
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
    var tableData2rules = (rule, value, callback) => {
      if(value[0].reward == '' || value[0].num == ''){
        callback(new Error('请输入返佣比例'));
      }else {
        if (value.length >=1) {
          value.map(val =>{
            if (val.reward*1 < 0 || val.num*1 < 0  || val.num.indexOf('.') > 0) {
              callback(new Error('返佣比例为正数和配额数量为正整数'));
            }
          })
          if (!this.rewardflag) {
            callback(new Error('所有下级代理的返佣比例必须低于总代'));
          }
        }
        callback()
      }
   }; 
   var rewardrules = (rule, value, callback) => {
     if (value == '') {
       callback(new Error('请输入渠道抽水'));
     } else {
       if (value*1 < 0) {
          callback(new Error('渠道抽水为正数'));
        } else {
          callback()
        }
     }
        
   }; 
    return {
      formInline: {
        user: '',
        url: [],
        status: '-1'
      },
      statuslists: [
        {
          id: '-1',
          name: '全部'
        },
        {
          id: '0',
          name: '禁用'
        },
        {
          id: '1',
          name: '启用'
        }
      ],
      currentPage: 1,
      userlist: [],
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        domain: [],
        type: '1',
        enturl:'',
        allow_ip:'',
        status: '',
        status2:'',
        reward: '',
        tableData2: [
          {
            id: '',
            reward: '',
            num: ''
          }
        ],
      },
      form2: {
        domain: [],
        name: '',
        type: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入玩家渠道', trigger: 'blur'}
        ],
        domain: [
          {required: true, message: '请选择域名', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
         status2: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        reward: [
          {required: true, validator: rewardrules, trigger: 'blur'}
        ],
        tableData2: [
          {required: true, validator: tableData2rules, trigger: 'blur'}
        ],
        amount:(index) =>{
          return {
            validator: (rule, value, callback) => {
              this.rewardflag = true
              if (value[index].reward > value[0].reward) {
                this.rewardflag = false
              }
            }
          }
        }
      },
      rules2: {
        domain: [
          {required: true, message: '请选择域名', trigger: 'change'}
        ],
      },
      domainlist: [],
      domainlists: [],
      rewardflag: true,
      formLabelWidth: '120px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      ids: [],
      typelist:[
        {name:'内部公司',id:'1'},
        {name:'外部接入商',id:'2'},
      ]
    }
  },
  created() { 
    getuserlist(this)
    getdomains(this)
    let that = this
    if (!this.org.length && this.org.length != 0) {
      that.currentPage = this.org.currentPage
      that.pagesize = this.org.pagesize
      that.formInline.user = this.org.user
      that.formInline.url = this.org.url
      that.formInline.status = this.org.status
      orglist(this)
    }
  },
  computed: {
    ...mapGetters([
      'orgadd',
      'orgdel',
      'orgupdate',
      'orggetlist',
      'org',
      'orgrestcreatekey',
      'orgupdatedomain'
    ])
  },
  methods: {
    reset (form) {
      this.form.enturl = ''
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.form.tableData2 = [
          {
            id: '',
            reward: '',
            num: ''
          }
      ]
    },
    reset2 (form) {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    addnum (index) {
      let num = 65 + index*1
      this.form.tableData2.push(
        {
          id: '',
          reward: '',
          num: ''
        }
      )
    },
    delnum (index, row) {
      this.form.tableData2.splice(index, 1)
    },
    key (row) {
      let that = this
       request({
            url: that.public.url + '/backend/org/restcreatekey',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.$message({
                type: 'success',
                message: res.message
              })
              orglist(that)
          }).catch(error => {
          })
    },
    cell ({row, column, rowIndex, columnIndex}) {
      // if (columnIndex === 4 && row.newuser_balance_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 6 && row.newuser_recharge_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 8 && row.newuser_withdraw_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 9 && row.newuser_flow_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 10 && row.newuser_lose_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 11 && row.newuser_win_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 12 && row.rechwith_diff*1 < 0) {
      //   return 'red'
      // }
    },
    query () {
      let that = this
      this.currentPage = 1
      orglist(this)
      let setorg = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user,
        'url': that.formInline.url,
        'status': that.formInline.status,
      }
      this.$store.commit('setorg', setorg)
    },
    edit(data) {
      this.title = '编辑渠道组管理'
      this.dialogFormVisible = true
      let that = this
      getdomain(this)
      request({
            url: that.public.url + '/backend/org/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            that.form.type = res.data.type
            that.form.status = res.data.status * 1
            that.form.status2 = res.data.incl_game_lobby*1
            that.form.enturl = res.data.game_ent_url
            that.form.allow_ip = res.data.allow_ip
            that.form.tableData2 = res.data.quota
            that.form.reward = res.data.reward
            if (res.data.url) {
              let domain = res.data.url.split(',')
              var namelist = that.domainlist.map(val => {
                return val.url
              })
              for (var i = 0; i<domain.length; i++) {
                var item = domain[i]
                var name = item.split('|')[1]
                var id = item.split('|')[0]
                let flag = namelist.includes(name)
                if(!flag){
                  that.domainlist.push({
                    id:id,
                    url: name
                  })
                }
                that.form.domain.push(id)
              }
            } else {
              that.form.domain = []
            }
            that.id = res.data.id
          }).catch(error => {
          })
    },
    editdomain (data) {
      this.dialogFormVisible2 = true
      let that = this
      getdomain(this)
      request({
            url: that.public.url + '/backend/org/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            if (res.data.type == '1') {
              that.form2.type = '内部公司'
            } else {
              that.form2.type = '外部接入商'
            }
            that.form2.name = res.data.name
            if (res.data.url) {
              let domain = res.data.url.split(',')
              var namelist = that.domainlist.map(val => {
                return val.url
              })
              for (var i = 0; i<domain.length; i++) {
                var item = domain[i]
                var name = item.split('|')[1]
                var id = item.split('|')[0]
                let flag = namelist.includes(name)
                if(!flag){
                  that.domainlist.push({
                    id:id,
                    url: name
                  })
                }
                that.form2.domain.push(id)
              }
            } else {
              that.form2.domain = []
            }
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增渠道组管理'
      this.dialogFormVisible = true
      getdomain(this)
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
                    id: this.id,
                    type: this.form.type,
                    status: this.form.status,
                    reward: this.form.reward,
                    quota: this.form.tableData2,
                    allow_ip:this.form.allow_ip,
                    game_ent_url:this.form.enturl,
                    incl_game_lobby:this.form.status2
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
               this.form.enturl = ''
              that.form.tableData2 = [
                  {
                    id: '',
                    reward: '',
                    num: ''
                  }
              ]
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
                domain_id: domain_id,
                type: this.form.type,
                status: this.form.status,
                reward: this.form.reward,
                quota: this.form.tableData2,
                allow_ip:this.form.allow_ip,
                game_ent_url:this.form.enturl,
                incl_game_lobby:this.form.status2
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            that.form.tableData2 = [
                  {
                    id: '',
                    reward: '',
                    num: ''
                  }
              ]
            orglist(that)
          }).catch(error => {
          })
          }
        } else {
          return false
        }
      })
    },
    sure2 (form) {
      let that = this
      this.$refs.form2.validate((valid) => {
        if (valid) {
            let domain_id = this.form2.domain.join(',')
             request({
              url: that.public.url + '/backend/org/updatedomain',
              method: 'post',
              data: {
                    domain_id: domain_id,
                    id: this.id
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible2 = false
              that.$refs.form2.resetFields()
              orglist(that)
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
        'user': that.formInline.user,
        'url': that.formInline.url,
        'status': that.formInline.status,
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
        'user': that.formInline.user,
        'url': that.formInline.url,
        'status': that.formInline.status,
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
  let url = that.formInline.url.join(',')
  request({
    url: that.public.url + '/backend/org/getList',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
      org_id: that.formInline.user,
      domain_id: url,
      status: that.formInline.status,
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
    url: that.public.url + '/backend/org/getorglist',
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

function getdomains (that) {
  request({
    url: that.public.url + '/backend/domain/getdomains',
    method: 'post'
  }).then(res => {
    that.domainlists = res.data
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
