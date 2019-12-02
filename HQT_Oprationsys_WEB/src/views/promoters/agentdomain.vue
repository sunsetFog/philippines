<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="agentusabledomainaddagentdomain">添加域名</el-button>
          </el-col>
           <el-col :span="5">
            <el-form-item label="域名">
              <el-input v-model="formInline.url" placeholder="域名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="玩家渠道">
              <el-select v-model="formInline.user" filterable clearable>
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.nickname"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="5">
            <el-form-item label="虚拟代理">
                <el-select v-model="formInline.agent" clearable>
                  <el-option
                    v-for="item in agentlist"
                    :key="item.value"
                    :label="item.user_account"
                    :value="item.user_id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="启用状态">
                <el-select v-model="formInline.upstatus" clearable>
                  <el-option
                    v-for="item in statuslist2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>

          
          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="80px">
           <el-col :span="5"  :offset='2'>
            <el-form-item label="所属总代">
                <el-select v-model="formInline.true" clearable>
                  <el-option
                    v-for="item in truelist"
                    :key="item.value"
                    :label="item.user_account"
                    :value="item.user_id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="7">
            <el-form-item label="失效日期">
              <el-date-picker
              v-model="formInline.time"
              type="daterange"
              :editable="false"
              range-separator="-"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
            <el-col :span="1">
              <el-button type="primary" icon="el-icon-search" @click="query" v-if="agentusabledomainagentdomainlist">查询</el-button>
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
      type='index'
      width='60'
      label="序号">
    </el-table-column>
    <el-table-column
      prop="url"
      label="域名">
    </el-table-column>
     <el-table-column
      prop="valid_date"
      label="生效日期">
    </el-table-column>
     <el-table-column
      prop="expire_date"
      label="失效日期">
    </el-table-column>
     <el-table-column
      prop="days"
      label="有效期">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="be_itop_agent"
      label="虚拟代理">
       <template slot-scope="scope">
        <el-popover trigger='click' v-if="scope.row.be_itop_agent!=''">
          <p>域名：{{scope.row.url}}</p>
          <p>总代列表</p>
          <el-tag v-for="(item,key) in scope.row.itop_agent_account"  :key='key' style="margin: 8px;">{{item}}</el-tag>
          <div slot="reference">
            <el-tag size='medium'>查看虚拟代理</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="所属总代">
      <template slot-scope="scope">
        <el-popover trigger='click' v-if="scope.row.be_rtop_agent!=''">
          <p>域名：{{scope.row.url}}</p>
          <p>总代列表</p>
          <el-tag v-for="(item,key) in scope.row.rtop_agent_account"  :key='key' style="margin: 8px;">{{item}}</el-tag>
          <div slot="reference">
            <el-tag size='medium'>查看总代</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="depict"
      label="备注">
    </el-table-column>
    <el-table-column
      label="启用状态">
      <template slot-scope="scope">
        {{scope.row.status}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="agentusabledomainupdateagentdomain">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="agentusabledomaindelagentdomain">删除</el-button>
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
        <el-form-item label="域名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" v-if="addshow"></el-input>
        <span v-else>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="生效时间" :label-width="formLabelWidth" prop="time1">
        <el-date-picker
          v-model="form.time1"
          type='datetime'
          palceholder='选择日期'
        >
        </el-date-picker>
      </el-form-item>
       <el-form-item label='失效时间' :label-width="formLabelWidth" prop='time2'>
        <el-date-picker
          v-model="form.time2"
          type='datetime'
          palceholder='选择日期'
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="玩家渠道" :label-width="formLabelWidth" prop='org'>
        <el-select v-model="form.org" @change="orgchange">
          <el-option
            v-for="item in userlist"
            :key="item.id"
            :label="item.nickname"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总代类型" :label-width="formLabelWidth" prop='type'>
        <el-select v-model="form.type">
          <el-option
            v-for="item in agenttype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="选择总代" :label-width="formLabelWidth" prop='true' v-if="tureshow">
        <el-select v-model="form.true" filterable multiple >
          <el-option
            v-for="item in truelist"
            :key="item.value"
            :label="item.user_account"
            :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="选择虚拟代理" :label-width="formLabelWidth" prop='agent' v-if="!tureshow">
        <el-select v-model="form.agent" filterable multiple >
          <el-option
            v-for="item in agentlist"
            :key="item.value"
            :label="item.user_account"
            :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态" :label-width="formLabelWidth" prop='status'>
        <el-select v-model="form.status">
          <el-option
            v-for="item in statuslist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="备注" :label-width="formLabelWidth" prop='desc'>
        <el-input v-model="form.desc"></el-input>
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
  data() {
    return {
      formInline: {
        user: '',
        url: '',
        time: '',
        upstatus: '',
        true: '',
        agent: ''
      },
      addshow: true,
      userlist: [],
      truelist: [],
      agentlist: [],
      id: '',
      valid: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '有效'
        },
        {
          value: '0',
          label: '已过期'
        }
      ],
      status: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '已使用'
        },
        {
          value: '0',
          label: '未使用'
        }
      ],
      statuslist: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      statuslist2: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      agenttype: [
        {
          value: '2',
          label: '虚拟代理'
        },
        {
          value: '0',
          label: '真实总代'
        }
      ],
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      dialogFormVisible: false,
      form: {
        name: '',
        time1: '',
        time2: '',
        status: '1',
        desc: '',
        org: '',
        type: '0',
        true: [],
        agent: []
      },
      rules: {
        name: [
          {required: true, message: '请输入域名', trigger: 'blur'}
        ],
        time1: [
          {required: true, message: '请选择生效时间', trigger: 'change'}
        ],
        time2: [
          {required: true, message: '请选择失效时间', trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        org: [
          {required: true, message: '请选择玩家渠道', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择总代类型', trigger: 'change'}
        ],
        true: [
          {required: true, message: '请选择总代', trigger: 'change'}
        ],
        agent: [
          {required: true, message: '请选择虚拟代理', trigger: 'change'}
        ],
        desc: [
        ]
      },
      formLabelWidth: '120px',
      title: '',
      method: '',
      orderby: '',
      tureshow: true,
      limit: 1
    }
  },
  created() {
    getuserlist(this)
    gettrue(this, this.formInline.user)
    getagent(this, this.formInline.user)
    let that = this
    if (!this.agentdomain.length && this.agentdomain.length != 0) {
      that.formInline.url = this.agentdomain.url
      that.currentPage = this.agentdomain.currentPage
      that.pagesize = this.agentdomain.pagesize
      that.formInline.user = this.agentdomain.user
      that.formInline.time = this.agentdomain.time
      that.formInline.upstatus = this.agentdomain.upstatus
      that.formInline.true = this.agentdomain.true
      that.formInline.agent = this.agentdomain.agent
      getlist(that)
    }
  },
  watch: {
    'formInline.user': function (val) {
      this.formInline.agent = ''
      this.formInline.true = ''
      gettrue(this, val)
      getagent(this, val)
    },
    'form.type': function (val) {
      if (val == '0') {
        // console.log("val == '0'")
        //  console.log(this.form.type)
        this.form.agent = []
        this.form.true = []
        this.tureshow = true
      } else {
        //  console.log("val == '2'")
        //   console.log(this.form.type)
        //this.form.agent = []
        this.form.true = []
        this.tureshow = false
      }
    },
  },
  computed: {
    ...mapGetters([
      'agentusabledomainagentdomainlist',
      'agentusabledomainaddagentdomain',
      'agentusabledomainupdateagentdomain',
      'agentusabledomaindelagentdomain',
      'agentdomain'
    ])
  },
  methods: {
    edit(row) {
      let that = this
      this.title = '修改域名管理'
      this.addshow = false
      this.dialogFormVisible = true
      this.id = row.id
      request({
        url:that.public.url + '/agentusabledomain/getinfo',
        method:'post',
        data:{
          id:row.id
        }
      }).then(res => {
        that.form.name = res.data.url
        that.form.desc = res.data.depict
        that.form.status = res.data.status
        var date = res.data.valid_date
        date = date.substring(0,19)
        date = date.replace(/-/g,'/')
        that.form.time1 = new Date(date).getTime()
        var date2 = res.data.expire_date
        date2 = date2.substring(0,19)
        date2 = date2.replace(/-/g,'/')
        that.form.time2 = new Date(date2).getTime()
        that.form.org = res.data.agent_org_id
        // if ( res.data.be_rtop_agent!='') {
        //   //真实总代
        //   that.form.type = '0'
        // } else {
        //    that.form.agent = res.data.be_itop_agent.split(',')
        //    getagent (that,that.form.org)
        //   that.form.type = '2'
        // }
        if(res.data.be_itop_agent != ''){
           getagent (that,that.form.org)
          that.form.type = '2'     
          that.form.agent = res.data.be_itop_agent.split(',')
          //  console.log( that.form.agent)
          // console.log(res.data.be_itop_agent)
        }else if( res.data.be_rtop_agent !=''){
          that.form.type = '0'
           that.form.true = res.data.be_rtop_agent.split(',')
          //   console.log( that.form.true)
          // console.log(res.data.be_rtop_agent)
        }
        // that.form.agent = res.data.be_itop_agent.split(',')
        // that.form.true = res.data.be_rtop_agent.split(',')
      }).catch(error => {
      })
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 6 && row.status === '末使用') {
        return 'green'
      }
      if (columnIndex === 6 && row.status === '己使用') {
        return 'red'
      }
    },
    orgchange () {
      this.form.agent = []
      this.form.true = []
      gettrue(this, this.form.org)
      getagent(this, this.form.org)
    },
    add () {
      this.title = '新增域名管理'
      this.addshow = true
      this.dialogFormVisible = true
    },
    // tableclassname ({row, rowIndex}) {
    //   if(row.valid_day != '---' && row.valid_day.split('天')[0]*1 < 30) {
    //     return 'redbackground';
    //   }
    //   return ''
    // },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setagentdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
        'true': that.formInline.true,
        'agent': that.formInline.agent,
      }
      this.$store.commit('setagentdomain', setagentdomain)
    },
    sure (form) {
      let that = this
      that.$refs.form.validate((valid) => {
      if (valid) {
        if (this.title === '修改域名管理') {
          if (that.form.time1 > that.form.time2) {
              that.$message({
                type: 'warning',
                message: '生效时间需比失效时间小'
              })
              return false
            }
        } else {
          if (that.form.time1.getTime() > that.form.time2.getTime()) {
              that.$message({
                type: 'warning',
                message: '生效时间需比失效时间小'
              })
              return false
            }
        }
        that.$confirm('', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
          if (this.title === '修改域名管理') {
            var valid_date = parseTime(that.form.time1/1000)
            var expire_date = parseTime(that.form.time2/1000)
            var agenttrue = this.form.true.join(',') 
            var agent = this.form.agent.join(',') 
            request({
            url:that.public.url + '/agentusabledomain/updateagentdomain',
            method:'post',
            data:{
              id: this.id,
              url:this.form.name,
              valid_date: valid_date,
              expire_date:expire_date,
              agent_org_id:this.form.org,
              be_rtop_agent: agenttrue,
              be_itop_agent: agent,
              status:this.form.status,
              depict: this.form.desc
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            getlist(that)
            that.dialogFormVisible = false
          }).catch(error => {
          })
          } else {
            var valid_date = parseTime(that.form.time1.getTime() /1000)
            var expire_date = parseTime(that.form.time2.getTime() /1000)
            var agenttrue = this.form.true.join(',') 
            var agent = this.form.agent.join(',') 
            request({
            url:that.public.url + '/agentusabledomain/addagentdomain',
            method:'post',
            data:{
              url:this.form.name,
              valid_date: valid_date,
              expire_date:expire_date,
              agent_org_id:this.form.org,
              be_rtop_agent: agenttrue,
              be_itop_agent: agent,
              status:this.form.status,
              depict: this.form.desc
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            getlist(that)
            that.dialogFormVisible = false
          }).catch(error => {
          })
          }
        }).catch(error => {
        })
      } else {
        return false
      }
    })
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将删除此域名, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/agentusabledomain/delagentdomain',
            method: 'post',
            data: {
                id: row.id
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
          message: '已取消禁用'
        });
      });
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(that)
      let setagentdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
        'true': that.formInline.true,
        'agent': that.formInline.agent,
      }
      this.$store.commit('setagentdomain', setagentdomain)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that)
      let setagentdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'user': that.formInline.user,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
        'true': that.formInline.true,
        'agent': that.formInline.agent,
      }
      this.$store.commit('setagentdomain', setagentdomain)
    }
  },
  filters: {
  }
}

function getuserlist (that) {
  request({
    url: that.public.url + '/backend/domain/getorglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
  }).catch(error => {
  })
}


function getlist (that) {
  var start = ''
  var end = '' 
  if (that.formInline.time && that.formInline.time.length > 0) {
    start = parseTime(that.formInline.time[0].getTime() /1000)
    end = parseTime(that.formInline.time[1].getTime() /1000)
  }
  request({
    url: that.public.url + '/agentusabledomain/agentdomainlist',
    method: 'post',
    data: {
      url: that.formInline.url,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      agent_org_id: that.formInline.user,
      status: that.formInline.upstatus,
      begin_time: start,
      end_time: end,
      be_rtop_agent: that.formInline.true,
      be_itop_agent: that.formInline.agent,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1 
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

 function parseTime(time) {
    var date = new Date(time *1000);
    let y = date.getFullYear() + '-'
    let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
    let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
    let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
    let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
    return y+m+d+h+i+s
}

//真实总代
function gettrue (that, org) {
  request({
    url: that.public.url + '/agentusabledomain/agentlist',
    method: 'post',
    data: {
      agent_org_id: org,
      type: 0
    }
  }).then(res => {
    that.truelist = res.data
  }).catch(error => {
  })
}


//虚拟总代
function getagent (that,org) {
  request({
    url: that.public.url + '/agentusabledomain/agentlist',
    method: 'post',
    data: {
      agent_org_id: org,
      type: 2
    }
  }).then(res => {
    that.agentlist = res.data
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
  .redbackground {
    background: #f69!important;
    color: black!important;
    font-weight: 800;
  }
</style>
