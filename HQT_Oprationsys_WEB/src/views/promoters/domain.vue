<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="domainadd">添加域名</el-button>
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
                :value="item.nickname">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="5">
            <el-form-item label="使用状态">
                <el-select v-model="formInline.status" clearable>
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
            <el-col :span="7" :offset='2'>
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
              <el-button type="primary" icon="el-icon-search" @click="query" v-if="domaingetlist">查询</el-button>
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
    @sort-change='sort'
    :cell-class-name='cell'
    :row-class-name="tableclassname"
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
      prop="create_time"
      sortable='custom'
      label="创建时间">
    </el-table-column>
     <el-table-column
      prop="valid_date"
      sortable='custom'
      label="生效日期">
    </el-table-column>
     <el-table-column
      prop="expire_date"
      sortable='custom'
      label="失效日期">
    </el-table-column>
     <el-table-column
      prop="valid_day"
      sortable='custom'
      label="有效期">
    </el-table-column>
    <el-table-column
      sortable='custom'
      label="使用状态">
      <template slot-scope="scope">
        {{scope.row.isuse}}
      </template>
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="depict"
      label="备注">
    </el-table-column>
    <el-table-column
      sortable='custom'
      label="启用状态">
      <template slot-scope="scope">
        {{scope.row.status}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="domainupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)">删除</el-button>
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
        status: '',
        time: '',
        valid: '',
        upstatus: ''
      },
      addshow: true,
      userlist: [],
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
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 50,
      dialogFormVisible: false,
      form: {
        name: '',
        time1: '',
        time2: '',
        status: '1',
        desc: ''
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
        desc: [
        ]
      },
      formLabelWidth: '120px',
      title: '',
      method: '',
      orderby: ''
    }
  },
  created() {
    getuserlist(this)
    let that = this
    if (!this.domain.length && this.domain.length != 0) {
      that.formInline.url = this.domain.url
      that.currentPage = this.domain.currentPage
      that.pagesize = this.domain.pagesize
      that.formInline.valid = this.domain.valid
      that.formInline.status = this.domain.status
      that.formInline.time = this.domain.time
      that.formInline.upstatus = this.domain.upstatus
      getlist(that)
    }
  },
  computed: {
    ...mapGetters([
      'domainupdate',
      'domaingetlist',
      'domainadd',
      'domaindel',
      'domain'
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
        url:that.public.url + '/domain/getinfo',
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
    add () {
      this.title = '新增域名管理'
      this.addshow = true
      this.dialogFormVisible = true
    },
    tableclassname ({row, rowIndex}) {
      if(row.valid_day != '---' && row.valid_day.split('天')[0]*1 < 30) {
        return 'redbackground';
      }
      return ''
    },
    sort ({column, prop, order}) {
      if (column.order === 'ascending'){
        this.method = 'asc'
        this.orderby = column.property
        getlist(this)
      }
      if (column.order === "descending"){
        this.method = 'desc'
        this.orderby = column.property
        getlist(this)
      }
    },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'valid': that.formInline.valid,
        'user': that.formInline.user,
        'status': that.formInline.status,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
      }
      this.$store.commit('setdomain', setdomain)
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
            request({
            url:that.public.url + '/domain/update',
            method:'post',
            data:{
              id: this.id,
              url:this.form.name,
              valid_date: valid_date,
              expire_date:expire_date,
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
            request({
            url:that.public.url + '/domain/add',
            method:'post',
            data:{
              url:this.form.name,
              valid_date: valid_date,
              expire_date:expire_date,
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
            url: that.public.url + '/backend/domain/del',
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
      let setdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'valid': that.formInline.valid,
        'user': that.formInline.user,
        'status': that.formInline.status,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
      }
      this.$store.commit('setdomain', setdomain)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.account, that.formInline.status)
      let setdomain = {
        'url': that.formInline.url,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'valid': that.formInline.valid,
        'user': that.formInline.user,
        'status': that.formInline.status,
        'time': that.formInline.time,
        'upstatus': that.formInline.upstatus,
      }
      this.$store.commit('setdomain', setdomain)
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
    url: that.public.url + '/domain/getlist',
    method: 'post',
    data: {
      url: that.formInline.url,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      valid_day: that.formInline.valid,
      org_name: that.formInline.user,
      status: that.formInline.upstatus,
      isuse: that.formInline.status,
      expire_date_from: start,
      expire_date_to: end,
      method: that.method,
      orderby: that.orderby
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
