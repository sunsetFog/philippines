<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-button type="info" round @click="add" v-if='accountadd'>新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="帐号">
                <el-input v-model="formInline.user" placeholder="帐号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色">
              <el-input v-model="formInline.region" placeholder="角色" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="管理渠道">
                <el-select v-model="formInline.org" filterable clearable>
                <el-option
                  v-for="item in orglistAll"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="accountgetlist">查询</el-button>
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
    :data="tableData2"
    border
    style="width: 100%">

    <el-table-column
      prop="login_name"
      label="账号">
    </el-table-column>
    <!-- <el-table-column
      prop="role_id"
      label="角色id">
    </el-table-column> -->
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称">
    </el-table-column>
     <el-table-column
      prop="nickname"
      label="管理渠道"  width="100">
       <template slot-scope="scope">
        <el-popover trigger='click' >
          <p>账号：{{scope.row.login_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色：{{scope.row.role_name}}</p>
          <p>管理渠道列表</p>
          <el-tag v-for="(item,key) in orglist"  :key='key' style="margin: 8px;">{{orglist[key].name}}</el-tag>
          <div slot="reference" v-show="accountgetaccountorginfo && scope.row.agent_org_ids!=''" @click="agentclick(scope.row)">
            <el-tag size='medium' >查看渠道</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      prop="mge_real_topagent_ids"
      label="管理总代" width="100">
       <template slot-scope="scope">
        <el-popover trigger='click'>
          <p>账号：{{scope.row.login_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色：{{scope.row.role_name}}</p>
          <p>管理总代列表</p>
          <el-tag v-for="(item,key) in orglist2"  :key='key' style="margin: 8px;">{{orglist2[key].user_account}}</el-tag>
          <div slot="reference"  v-show="accountgetrealtopagentinfo && scope.row.mge_real_topagent_ids!=''" @click="agentclick2(scope.row)">
            <el-tag size='medium' >查看总代</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
      prop="mge_virtual_agent_ids"
      label="管理虚拟代理" width="120">
       <template slot-scope="scope">
        <el-popover trigger='click' >
          <p>账号：{{scope.row.login_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色：{{scope.row.role_name}}</p>
          <p>管理虚拟代理列表</p>
          <el-tag v-for="(item,key) in orglist3"  :key='key' style="margin: 8px;">{{orglist3[key].user_account}}</el-tag>
          <div slot="reference" v-show="accountgetvirtualagentinfo && scope.row.mge_virtual_agent_ids!=''" @click="agentclick3(scope.row)">
            <el-tag size='medium' >查看虚拟代理</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="cmoney_total_limit"
      label="上分总额度">
    </el-table-column>
    <el-table-column
      prop="cmoney_had_used"
      label="已经上分额度">
    </el-table-column>
    <el-table-column
      prop="cmoney_day_limit"
      label="日上分额度">
    </el-table-column>
    <el-table-column
      label="可用余额"  width='250'>
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class='inline' v-model="cmoney_balance" size="small"/>
            <el-button class="cancel-btn" size="small" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.cmoney_balance }}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="cmoney_last_used"
      label="最近上分额度">
    </el-table-column>
    <el-table-column
      prop="cmoney_last_time"
      width="180"
      label="最近上分时间">
    </el-table-column>
    <el-table-column
      width="180"
      label="最近登录时间">
        <template slot-scope="scope">
        {{scope.row.last_login_time | time}}
      </template>
    </el-table-column>
    <el-table-column
     width="180"
      prop="create_time"
      label="创建时间">
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
        <el-button v-if="scope.row.edit" type="warning" size="small" @click="confirmEdit(scope.row)">确定</el-button>
        <el-button type="text" size="small" @click="scope.row.edit=!scope.row.edit" v-if="accountaddCmoney && !scope.row.edit">增加余额</el-button>
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="accountupdate && scope.row.type != 1 && accountgetrtopagentlist && accountgetitopagentlist">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="accountdel && scope.row.type != 1">删除</el-button>
        <el-button type="text" size="small" @click="resetpwd(scope.row)" v-if="accountresetLoginPwd">重设密码</el-button>
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
      <el-form-item label="角色" :label-width="formLabelWidth" prop='role'>
        <el-select v-model="form.role" @change="selectType">
        <el-option
          v-for="item in rolelist"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="login">
        <el-input v-model="form.login"  :disabled="disabledname"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" :label-width="formLabelWidth" prop="pwd" v-if="pwdshow">
        <el-input
          type="password"
          v-model="form.pwd"
           />
      </el-form-item>
      
       <el-form-item label="昵称" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上分总额度" :label-width="formLabelWidth" prop='total'>
        <el-input v-model="form.total" type="number"></el-input>
      </el-form-item>
       <el-form-item label="日上分额度" :label-width="formLabelWidth" prop="day">
        <el-input v-model="form.day" type="number"></el-input>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
         <el-select v-model="form.status">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
       <el-form-item label="管理总代" :label-width="formLabelWidth" prop="desc">
        <el-select  v-model="valueAll"  clearable multiple placeholder="请选择" style="width:303px"> 
              <el-option
                v-for="(item,index) in userlist"
                :key="index"
                :label="item.user_account"
                :value="item.user_id">
              </el-option>
            </el-select>
            <el-checkbox v-model="checked" @change="choseAll">全选</el-checkbox>
      </el-form-item>
      <el-form-item label="管理虚拟代理" :label-width="formLabelWidth" prop="desc">
        <el-select  v-model="valueAll2"  clearable multiple placeholder="请选择" style="width:303px"> 
              <el-option
                v-for="item in userlist2"
                :key="item.user_id"
                :label="item.user_account"
                :value="item.user_id">
              </el-option>
            </el-select>
             <el-checkbox v-model="checked2" @change="choseAll2">全选</el-checkbox>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>


   <el-dialog title='重设密码'  :visible.sync="password" :before-close="repwd">
     <span class="resetname">您将对<span>{{name}}</span>进行重置密码操作？</span>
    <el-form :model="pwdform" :rules="pwdrules" ref="pwdform">
      <el-form-item label="原始密码" :label-width="formLabelWidth" prop="original">
        <el-input v-model="pwdform.original"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="new">
        <el-input v-model="pwdform.new"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="sure">
        <el-input v-model="pwdform.sure"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="repwd(pwdform)">取 消</el-button>
      <el-button type="primary" @click="pwdsure(pwdform)">确 定</el-button>
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
    var validateUser = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名-以字母或下划线开头，长度在3-18位，不可以存在特殊字符'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.form.sure !== '') {
            this.$refs.form.validateField('sure');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.new) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }
      var totalruler = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入上分总额度'));
        } else if (value *1 < 0) {
          callback(new Error('上分总额度必须为大于等于0的数'));
        } else if (Number.isInteger(value *1)) {
          callback()
        } else {
          callback(new Error('上分总额度为整数'));
        }
      }
      var totalruler2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入日上分总额度'));
        } else if (value *1 < 0) {
          callback(new Error('日上分总额度必须为大于等于0的数'));
        } else if (Number.isInteger(value *1)) {
          callback()
        } else {
          callback(new Error('日上分总额度为整数'));
        }
      }
    return {
      formInline: {
        user: '',
        region: ''
      },
      disabledname: false,
      pwdType: 'password',
      currentPage: 1,
      tableData: [],
      tableData2: [],
      rolelist: [],
      cmoney_balance: '',
      orglistAll:[],
      dialogFormVisible: false,
      checked:false,//全选按钮状态
      checked2:false,//全选按钮状态
      form: {
        login: '',
        pwd: '',
        role: '',
        day: '',
        total: '',
        status: '1',
        name: ''
      },
      pwdshow: true,
      status: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      rules: {
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        login: [
          {required: true, trigger: 'blur', validator: validateUser}
        ],
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max:18, message: '长度6至18位', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ],
        day: [
          {required: true, validator: totalruler2, trigger: 'blur'}
        ],
        total: [
          {required: true, validator: totalruler, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      title: '',
      password: false,
      name: '',
      total: 0,
      pagesize: 20,
      pwdform: {
        original: '',
        new: '',
        sure: ''
      },
      pwdrules: {
        original: [
          {required: true, message: '请输入原始密码', trigger: 'blur'},
          {min:6, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ],
        new: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min:6, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ],
        sure: [
          {required: true, validator: validatePass2, trigger: 'blur'},
          {min:4, max:18, message: '长度在6到18个字符之间', trigger: 'blur'}
        ]
      },
      orglist:[],
      orglist2:[],
      orglist3:[],
      userlist:[],
      userlist2:[],
      valueAll:[],
      valueAll2:[],
      choselise:[],
    }
  },
  created() { 
    getrolelist(this)
    getuserlist(this)
    let that = this
    if (!this.account.length && this.account.length != 0) {
      that.formInline.user = this.account.user
      that.currentPage = this.account.currentPage
      that.pagesize = this.account.pagesize
      that.formInline.region = this.account.region
      accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
    }
  },
  computed: {
    ...mapGetters([
      'accountadd',
      'accountdel',
      'accountupdate',
      'accountaddCmoney',
      'accountresetLoginPwd',
      'accountgetlist',
      'account',
      'accountgetaccountorginfo',
      'accountgetrealtopagentinfo',
      'accountgetvirtualagentinfo',
      'accountgetrtopagentlist',
      'accountgetitopagentlist'
    ])
  },
  filters: {
    status (val) {
      if (val === '0') {
        return '禁用'
      }
      if (val === '1') {
        return '启用'
      }
    },
    time (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  },
  methods: {
    repwd (pwdform) {
      this.password = false
      this.$refs.pwdform.resetFields()
    },
    pwdsure (pwdform) {
      this.$refs.pwdform.validate((valid) => {
        if (valid) {
          let that = this
          request({
            url: this.public.url + '/backend/account/resetLoginPwd',
            method: 'post',
            data: {
              oldpwd: this.pwdform.original,
              newpwd: this.pwdform.new,
              confirmpwd: this.pwdform.sure
            }
          }).then(res=>{
            that.password = false
            that.$refs.pwdform.resetFields()
          }).catch(error => {
          })
        } else {
          return false;
        }
      })
    },
    resetpwd (row) {
      // this.password = true
      this.name = row.login_name
       let that = this
      this.$confirm('此操作将重置'+this.name+'的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/account/resetpwd',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.$alert(res.data.pwd,'新密码',{
              confirmButtonText: '确定',
              callback: action => {
                // that.$message({
                //   // type: 'info',
                //   // message: ''
                // })
              }
            })
            accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    reset (form) {
      this.checked = false
       this.checked2 = false
       this.valueAll = []
       this.valueAll2 = []
      this.dialogFormVisible = false    
      this.$refs.form.resetFields()
    },
    query () {
      let that = this
      this.currentPage = 1
      accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
      let setaccount = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setaccount', setaccount)
    },
    edit(data) {
      this.valueAll = []
      this.valueAll2 = []
      this.title = '编辑账号'
      this.dialogFormVisible = true
      this.disabledname = true
      this.pwdshow = false
      let that = this
      this.checked = false
       this.checked2 = false
      request({
            url: that.public.url + '/backend/account/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.nickname
            that.form.login = res.data.login_name
            that.form.role = res.data.role_id
            that.form.pwd = res.data.login_pwd
            that.form.total = res.data.cmoney_total_limit
            that.form.day = res.data.cmoney_day_limit
            that.form.status = res.data.status
            that.id = res.data.id
             if(res.data.mge_real_topagent_ids){
              this.valueAll = res.data.mge_real_topagent_ids.split(',')
            }else{
              this.valueAll = []
            }      
            if(res.data.mge_virtual_agent_ids){
              this.valueAll2 = res.data.mge_virtual_agent_ids.split(',')
            }else{
              this.valueAll2 = []
            }      
          this.getagentlist (this)//管理总代
          this.getxunilist (this)//虚拟代理
          }).catch(error => {
          })
         
    },
    add () {
      this.valueAll = [],
       this.valueAll2 = [],
        this.userlist = [],
        this.userlist2 = [],
      this.title = '新增账号'
      this.dialogFormVisible = true
      this.disabledname = false
      this.pwdshow = true
    },
    sure (form) {
      let that = this
      let mge_real_topagent_ids = that.valueAll.join(',')
      let mge_virtual_agent_ids = that.valueAll2.join(',')
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑账号') {
             request({
              url: that.public.url + '/backend/account/update',
              method: 'post',
              data: {
                    login_name: this.form.login,
                    role_id: this.form.role,
                    nickname: this.form.name,
                    cmoney_total_limit: this.form.total,
                    cmoney_day_limit: this.form.day,
                    status: this.form.status,
                    id: this.id,
                    mge_real_topagent_ids:mge_real_topagent_ids,
                    mge_virtual_agent_ids:mge_virtual_agent_ids,
              }
            }).then(res => {
               that.$alert("用户信息修改成功！")
               that.checked = false
               that.checked2 = false
              that.valueAll = []
               that.valueAll2 = []
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/account/add',
            method: 'post',
            data: {
                  login_name: this.form.login,
                  login_pwd: this.form.pwd,
                  role_id: this.form.role,
                  nickname: this.form.name,
                  cmoney_total_limit: this.form.total,
                  cmoney_day_limit: this.form.day,
                  status: this.form.status,
                   mge_real_topagent_ids:mge_real_topagent_ids,
                    mge_virtual_agent_ids:mge_virtual_agent_ids,
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
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
            url: that.public.url + '/backend/account/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
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
      accountlist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.region)
      let setaccount = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setaccount', setaccount)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      accountlist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.region)
      let setaccount = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setaccount', setaccount)
    },
    confirmEdit(row) {
      row.edit = false
      let that = this
      request({
        url: that.public.url + '/backend/account/addCmoney',
        method: 'post',
        data: {
            cmoney: that.cmoney_balance,
            account_id: row.id
        }
      }).then(res => {
        accountlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
         that.cmoney_balance = ''
      }).catch(error => {
      })
    },
    cancelEdit(row) {
      row.edit = false
      this.cmoney_balance = ''
    },
     agentclick(row){//查看渠道
         let that = this       
        request({
            url: that.public.url + '/backend/account/getaccountorginfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.orglist = res.data       
          }).catch(error => {
          }).catch(() => {
      });
    },
     agentclick2(row){//查看管理总代
         let that = this       
        request({
            url: that.public.url + '/backend/account/getrealtopagentinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.orglist2 = res.data       
          }).catch(error => {
          }).catch(() => {
      });
    },
     agentclick3(row){//查看虚拟代理
         let that = this       
        request({
            url: that.public.url + '/backend/account/getvirtualagentinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.orglist3 = res.data       
          }).catch(error => {
          }).catch(() => {
      });
    },
  getagentlist (that) {//管理总代列表
  request({
    url: that.public.url + '/backend/account/getrtopagentlist',
    method: 'post',
    data:{
      role_id:that.form.role
    }
  }).then(res => {
     that.userlist = res.data
  }).catch(error => {
  })
},
 getxunilist (that) {//虚拟代理列表
  request({
    url: that.public.url + '/backend/account/getitopagentlist',
    method: 'post',
     data:{
      role_id:that.form.role
    }
  }).then(res => {
     that.userlist2 = res.data
  }).catch(error => {
  })
},
 selectType(val){//改变角色名
      this.getagentlist(this)
      this.getxunilist(this)
       this.checked = false
       this.checked2 = false
      this.valueAll = []
      this.valueAll2 = []
      // let result = this.userlist.map(function(item){//获取总代列表的id
      //   return item.user_id
      // })
      //  let result2 = this.userlist2.map(function(item){//获取虚拟列表的id
      //   return item.user_id
      // })
      // let valueAllm = this.valueAll.map(function(n){
      //   return n
      // })
      //  let valueAlln = this.valueAll2.map(function(n){
      //   return n
      // })
      // if(!isContained(result,valueAllm)){
      //   this.valueAll=[]
      // }
      // if(!isContained(result2,valueAlln)){
      //   this.valueAll2=[]
      // }

      // console.log(valueAllm)
      // console.log(result)
      // // console.log(this.valueAll)
      // console.log(this.valueAll)
      // console.log(isContained(result,valueAllm))
      // // this.valueAll=[]
      // // this.valueAll2=[]
    },
    choseAll(){//全选按钮事件
       let result = this.userlist.map(function(item){//获取总代列表的id
        return item.user_id
      })
      if(this.checked){
         this.valueAll = result
      }else{
        this.valueAll =[]
      }
      
    },
     choseAll2(){//全选按钮事件
       let result = this.userlist2.map(function(item){//获取总代列表的id
        return item.user_id
      })
      if(this.checked2){
         this.valueAll2 = result
      }else{
        this.valueAll2 =[]
      }
      
    },
  }
}

function accountlist (that, name, currentPage, pagesize, desc) {
  request({
    url: that.public.url + '/backend/account/getList',
    method: 'post',
    data: {
      accountName: name.trim(),
      pageno: currentPage,
      pagerows: pagesize,
      roleName: desc.trim(),
      agent_org_id:that.formInline.org
    }
  }).then(res => {
    that.tableData = res.data.list
    that.tableData2 = that.tableData.map(v => {
        that.$set(v, 'edit', false)
        return v
    })
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}
function getuserlist (that) {//渠道
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post'
  }).then(res => {
    // that.userlist = res.data
    let all = {id: "", name: "全部"}
    that.orglistAll = res.data
    that.orglistAll.unshift(all)

  }).catch(error => {
  })
}

function getrolelist (that) {
  request({
    url: that.public.url + '/backend/role/getRoleList',
    method: 'post',
  }).then(res => {
    that.rolelist = res.data
  }).catch(error => {
  })
}
function isContained(a,b){//a数组是否包含B数组
  if(!(a instanceof Array) || !(b instanceof Array)) return false;
  if(a.length<b.length) return false;
  var aStr = a.toString();
  for(var i = 0,len = b.length;i<len;i++){
      if(aStr.indexOf(b[i]) == -1)
      return false;
  }
  return true;
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
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>
