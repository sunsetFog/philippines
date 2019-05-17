<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="back">返回</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="gamebetitemadd">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="投注名称">
                 <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamebetitemgetlist">查询</el-button>
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
      prop="id"
      label="id">
    </el-table-column>
    <el-table-column
      prop="code"
      label="投注项代码">
    </el-table-column>
    <el-table-column
      prop="bet_min_limit"
      label="最小下注额度">
    </el-table-column>
    <el-table-column
      prop="bet_max_limit"
      label="最大下注额度">
    </el-table-column>
    
     <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | type}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="gamebetitemupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="gamebetitemdel">删除</el-button>
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
      <el-form-item label="投注项代码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="投注项名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="最小下注限额" :label-width="formLabelWidth" prop="min">
        <el-input v-model="form.min" type="number"></el-input>
      </el-form-item>
      <el-form-item label="最大下注限额" :label-width="formLabelWidth" prop="max">
        <el-input v-model="form.max" type="number"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="form.status" filterable clearable>
                <el-option
                  v-for="item in statuslist"
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
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  filters: {
  },
  data() {
    return {
      formInline: {
        status: '',
        name: ''
      },
      statuslist: [
        {name: '禁用', type: '0'},
        {name: '正常', type: '1'},
      ],
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        status: '1',
        min: '',
        max: '',
        code: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入投注项名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入投注项代码', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选状态', trigger: 'change'}
        ],
        min: [
          {required: true, message: '请输入最小下注限额', trigger: 'blur'}
        ],
        max: [
          {required: true, message: '请输入最大下注限额', trigger: 'blur'}
        ]
      },
      formLabelWidth: '180px',
      title: '',
      total: 0,
      pagesize: 50,
      id: '',
      gameid: ''
    }
  },
  created() {
    this.gameid = this.$route.query.id
  },
  computed: {
    ...mapGetters([
      'gamebetitemupdate',
      'gamebetitemadd',
      'gamebetitemdel',
      'gamebetitemgetlist'
    ])
  },
  watch: {
  },
  filters: {
    type (val) {
      if (val === '0') {
        return '禁用'
      }
      if (val === '1') {
        return '正常'
      }
    }
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    edit(row) {
      this.title = '编辑投注项设置'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/gamebetitem/getinfo',
            method: 'post',
            data: {
                id: row.id,
                game_id: this.gameid
            }
          }).then(res => {
            that.form.name = res.data.name
            that.form.code = res.data.code
            that.form.status = res.data.status
            that.form.max = res.data.bet_max_limit
            that.form.min = res.data.bet_min_limit
            that.id = res.data.id
          }).catch(error => {
          })
    },
    back () {
      this.$router.push({path: '/gameconfmgr/gamename'})
    },
    add () {
      this.title = '新增投注项设置'
      this.dialogFormVisible = true
    },
    query () {
      let that = this
      this.currentPage = 1
       getlist(that, that.formInline.status, that.currentPage, that.pagesize, that.formInline.name)
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑投注项设置') {
             request({
              url: that.public.url + '/gamebetitem/update',
              method: 'post',
              data: {
                    game_id: this.gameid,
                    name: this.form.name,
                    code: this.form.code,
                    bet_max_limit: this.form.max,
                    bet_min_limit: this.form.min,
                    status: this.form.status,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
               getlist(that, that.formInline.status, that.currentPage, that.pagesize, that.formInline.name)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/gamebetitem/add',
            method: 'post',
            data: {
                  game_id: this.gameid,
                  name: this.form.name,
                  code: this.form.code,
                  bet_max_limit: this.form.max,
                  bet_min_limit: this.form.min,
                  status: this.form.status
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
             getlist(that, that.formInline.status, that.currentPage, that.pagesize, that.formInline.name)
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
            url: that.public.url + '/gamebetitem/del',
            method: 'post',
            data: {
                id: row.id,
                game_id: this.gameid
            }
          }).then(res => {
            getlist(that, that.formInline.status, that.currentPage, that.pagesize, this.formInline.name)
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
      this.pagesize = val
      this.currentPage = 1
      getlist(this, this.formInline.status, this.currentPage, this.pagesize, this.formInline.name)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      getlist(this, this.formInline.status, this.currentPage, this.pagesize, this.formInline.name)
    }
  }
}


function getlist (that, status, currentPage, pagesize, name) {
  let data = {
    status: status,
    pageno: currentPage,
    pagerows: pagesize,
    name: name,
    game_id: that.gameid
  }
  request({
    url: that.public.url + '/gamebetitem/getlist',
    method: 'post',
    data: data
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
</style>
