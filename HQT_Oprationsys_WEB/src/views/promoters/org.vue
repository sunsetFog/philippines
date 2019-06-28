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
    return {
      formInline: {
        user: '',
        url: []
      },
      currentPage: 1,
      userlist: [],
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        domain: [],
        type: '1',
        status: ''
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
      },
      rules2: {
        domain: [
          {required: true, message: '请选择域名', trigger: 'change'}
        ],
      },
      domainlist: [],
      domainlists: [],
      formLabelWidth: '120px',
      title: '',
      name: '',
      total: 0,
      pagesize: 50,
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
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    reset2 (form) {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
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
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
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
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
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
    url: that.public.url + '/backend/org/getOrglist',
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
