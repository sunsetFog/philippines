<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-button type="info" round @click="add" v-if="roleadd">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名">
                <el-input v-model="formInline.user" placeholder="角色名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="说明">
              <el-input v-model="formInline.region" placeholder="说明" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="rolegetlist">查询</el-button>
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
      prop="name"
      label="角色名称">
    </el-table-column>
    <el-table-column
      prop="depict"
      label="说明">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="roleupdate && scope.row.type != 1">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="roledel && scope.row.type != 1">删除</el-button>
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
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="说明" :label-width="formLabelWidth" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

    <div class="tree"  style="height:300px;overflow: auto;">
      <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      :default-checked-keys="keys"
      ref="tree"
      highlight-current
      draggable 
      :props="defaultProps">
    </el-tree>

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
        user: '',
        region: ''
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        desc: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
          // {min: 2, max:11, message: '长度大于六个字符小于11个字符', trigger: 'blur'}
        ],
        desc: [
          // {required: true, message: '请输入说明', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      title: '',
      data2: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      total: 0,
      pagesize: 50,
      keys: [],
      id: ''
    }
  },
  created() {
    gettreelist(this)
    let that = this
    if (!this.role.length && this.role.length != 0) {
      that.formInline.user = this.role.user
      that.currentPage = this.role.currentPage
      that.pagesize = this.role.pagesize
      that.formInline.region = this.role.region
      getrolelist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
    }
    
  },
  computed: {
    ...mapGetters([
      'roleadd',
      'roledel',
      'roleupdate',
      'rolegetlist',
      'role'
    ])
  },
  watch: {
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    edit(row) {
      this.title = '编辑角色'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/role/getinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.id = res.data.id
            that.form.name = res.data.name
            that.form.desc = res.data.depict
            if (res.data.privilegeids.length > 0) {
              that.keys = res.data.privilegeids.split(',')
              that.$refs.tree.setCheckedKeys(that.keys)
            } else {
              that.keys = []
              that.$refs.tree.setCheckedKeys(that.keys)
            }
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增角色'
      this.dialogFormVisible = true
    },
    query () {
      let that = this
      this.currentPage = 1
      getrolelist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
      let setrole = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setrole', setrole)
    },
    sure (form) {
      let that = this
      let key = this.$refs.tree.getCheckedKeys()
      let privilegeid = key.join(',')
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑角色') {
             request({
              url: that.public.url + '/backend/role/update',
              method: 'post',
              data: {
                    name: this.form.name,
                    privilege_ids: privilegeid,
                    depict: this.form.desc,
                    id: this.id
              }
            }).then(res => {
              if (res.code === 0) {
                that.dialogFormVisible = false
                that.$refs.form.resetFields()
                that.keys = []
                getrolelist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
              }
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/role/add',
            method: 'post',
            data: {
                  name: this.form.name,
                  privilege_id: privilegeid,
                  depict: this.form.desc
            }
          }).then(res => {
            if (res.code === 0) {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            that.keys = []
            getrolelist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
            }
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
            url: that.public.url + '/backend/role/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            getrolelist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.region)
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
      getrolelist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.region)
      let setrole = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setrole', setrole)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getrolelist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.region)
      let setrole = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'region': that.formInline.region
      }
      this.$store.commit('setrole', setrole)
    }
  }
}

function gettreelist (that) {
  request({
    url: that.public.url + '/backend/privilege/getPriNameList',
    method: 'get'
  }).then(res => {
    that.data2 = res.data
  }).catch(error => {
  })
}

function getrolelist (that, name, currentPage, pagesize, desc) {
  request({
    url: that.public.url + '/backend/role/getList',
    method: 'post',
    data: {
      name: name.trim(),
      pageno: currentPage,
      pagerows: pagesize,
      depict: desc.trim()
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum
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
