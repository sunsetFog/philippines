<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="csmreplytemplateadd">创建新模板 </el-button>
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
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="creater_account"
      label="创建人">
    </el-table-column>
    <el-table-column
      prop="title"
      label="邮件主题">
    </el-table-column>
    <el-table-column
      prop="content"
      label="邮件内容">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small"  @click="edit(scope.row.id)" v-if="csmreplytemplateupdate">修改</el-button>
        <el-button type="text" size="small"  @click="del(scope.row.id)" v-if="csmreplytemplatedel">删除</el-button>
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


  <el-dialog :title='title'  :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="主题" :label-width="formLabelWidth" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
        <el-input v-model="form.content" type="textarea"  class="texthight"></el-input>
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
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        desc: '',
        content: ''
      },
      rules: {
        desc: [
          {required: true, message: '请输入主题', trigger: 'blur'},
          {min: 0, max: 16,message: '主题在16个字符以内', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
          {min: 0, max: 500,message: '内容在500个字符以内', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      title: '',
      total: 0,
      pagesize: 50,
      id: ''
    }
  },
  created() {
    let that = this
    getlist(that)
  },
  computed: {
    ...mapGetters([
      'csmreplytemplateadd',
      'csmreplytemplateupdate',
      'csmreplytemplatedel',
    ])
  },
  watch: {
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    add () {
      this.title = '新模板创建'
      this.dialogFormVisible = true
    },
    edit (id) {
      this.id = id
      this.title = '修改模板'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/csmreplytemplate/getinfo',
            method: 'post',
            data: {
              id: id
            }
          }).then(res => {
            this.form.desc = res.data.title
            this.form.content = res.data.content
          }).catch(error => {
          })
    },
    del (id) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/csmreplytemplate/del',
            method: 'post',
            data: {
                id:id
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
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
    },
    sure (form) { 
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title == '修改模板') {
            request({
              url: that.public.url + '/csmreplytemplate/update',
              method: 'post',
              data: {
                    id: this.id,
                    title: this.form.desc,
                    content: this.form.content
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that)
            }).catch(error => {
            })
          } else {
            request({
              url: that.public.url + '/csmreplytemplate/add',
              method: 'post',
              data: {
                    title: this.form.desc,
                    content: this.form.content
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
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      let that = this
      getlist(that)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/csmreplytemplate/getList',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
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
  .texthight textarea {
    min-height: 130px!important;
  }
</style>
