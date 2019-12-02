<template>
  <div class="app-container notice">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="gamenoticeadd">写公告 </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主题">
                <el-input v-model="formInline.user" placeholder="主题" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="formInline.time"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                :picker-options="pickerOptions"
                end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamenoticegetlist">查询</el-button>
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
      prop="creator_name"
      label="创建人">
    </el-table-column>
    <el-table-column
      prop="title"
      label="主题">
    </el-table-column>
    <el-table-column
      prop="content"
      label="公告内容">
    </el-table-column>
     <el-table-column
      prop="validtime"
      width="300"
      label="有效时间">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="gamenoticeupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="gamenoticedel">删除</el-button>
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
      <el-form-item label="主题" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="有效时间" :label-width="formLabelWidth" prop="time">
      <el-radio-group v-model="form.time"  @change="time">
        <el-radio label="1">指定时间</el-radio>
        <el-radio label="2">永久有效</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth" prop="time1" v-if="timeshow">
        <el-date-picker
          :picker-options="pickerOptions1"
          end-placeholde="结束日期"
          range-separator="-"
          start-placeholde="开始日期"
          type="datetimerange"
          v-model="form.time1">
              </el-date-picker>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth" prop="desc">
        <el-input v-model="form.desc" type="textarea" maxlength="200" placeholder="最多只能输入200个字"></el-input>
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
        user: '',
        time: ''
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        desc: '',
        time: '1',
        time1: []
      },
      rules: {
        name: [
          {required: true, message: '请输入主题', trigger: 'blur'},
          {min: 0, max:16, message: '主题长度小于16个字符', trigger: 'blur'}
        ],
        time: [
          {required: true, message: '请选类型', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请输入说明', trigger: 'blur'}
        ],
        time1: [
          {required: true, message: '请选类型', trigger: 'change'}
        ]
      },
      formLabelWidth: '120px',
      title: '',
      total: 0,
      pagesize: 20,
      id: '',
      timeshow: true,
      // 发送公告日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 写公告日期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    let that = this
    if (!this.notice.length && this.notice.length != 0) {
      that.formInline.user = this.notice.user
      that.currentPage = this.notice.currentPage
      that.pagesize = this.notice.pagesize
      that.formInline.time = this.notice.time
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time)
    }
  },
  computed: {
    ...mapGetters([
      'gamenoticeadd',
      'gamenoticedel',
      'gamenoticeupdate',
      'gamenoticegetlist',
      'notice'
    ])
  },
  watch: {
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    time () {
      if (this.form.time === '1') {
        this.timeshow = true
      } else {
        this.timeshow = false
      }
    },
    edit(row) {
      this.title = '编辑公告'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/gamenotice/getinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.form.name = res.data.title
            that.form.desc = res.data.content
            if (res.data.validtime_from === '-1') {
              that.form.time = '2'
              that.timeshow = false
            } else {
              that.form.time = '1'
              that.timeshow = true
              let startdate = new Date(res.data.validtime_from)
              let enddate = new Date(res.data.validtime_to)
              that.form.time1 = [startdate, enddate]
            }
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新公告'
      this.dialogFormVisible = true
      this.timeshow = true
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time)
      let setnotice = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'time': that.formInline.time
        }
      this.$store.commit('setnotice', setnotice)
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          var start = ''
          var end = ''
          if (this.form.time === '1') {
            if (this.form.time1 && this.form.time1.length > 0) {
              start = this.form.time1[0].getTime() /1000
              end = this.form.time1[1].getTime() /1000
            }
          } else {
            start = '-1'
            end = ''
            this.form.time1 = []
          }
          if (this.title === '编辑公告') {
             request({
              url: that.public.url + '/gamenotice/update',
              method: 'post',
              data: {
                    title: this.form.name,
                    content: this.form.desc,
                    validtime_from: start,
                    validtime_to: end,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/gamenotice/add',
            method: 'post',
            data: {
                  title: this.form.name,
                  content: this.form.desc,
                  validtime_from: start,
                  validtime_to: end
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time)
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
            url: that.public.url + '/gamenotice/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time)
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
      getlist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.time)
      let setnotice = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'time': that.formInline.time
        }
      this.$store.commit('setnotice', setnotice)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this, this.formInline.user, this.currentPage, this.pagesize, this.formInline.time)
      let setnotice = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'time': that.formInline.time
        }
      this.$store.commit('setnotice', setnotice)
    },
    // checkSize(){//限制内容字数
    //   var textLength = this.form.desc.length;
    //   this.titleMaxLength = 50 - textLength;
    // }
  }
}


function getlist (that, user, currentPage, pagesize, time) {
  let data = {
    title: user.trim(),
    pageno: currentPage,
    pagerows: pagesize
  }
  if (time && time.length > 0) {
    var start = time[0].getTime() /1000
    data.time_from = start
    var end = time[1].getTime() /1000
    data.time_to = end
  }
  request({
    url: that.public.url + '/gamenotice/getlist',
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
  .notice textarea {
    min-height: 200px!important;
  }
</style>
