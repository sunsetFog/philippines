<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="gameemailadd">写邮件 </el-button>
          </el-col>
          <el-col :span="5">
            <el-form-item label="主题">
                <el-input v-model="formInline.title" placeholder="主题" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="接收人员">
              <el-input v-model="formInline.receive" placeholder="接收人员" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="发送时间">
              <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              :editable="false"
              range-separator="-"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
            <el-form-item label="开始日期">
              <el-date-picker
              v-model="formInline.starttime"
              :editable="false"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="结束日期">
              <el-date-picker
              v-model="formInline.endtime"
              :editable="false"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameemailgetlist">查询</el-button>
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
      prop="sender_name"
      label="发送人">
    </el-table-column>
    <el-table-column
      prop="title"
      label="邮件主题">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="发送时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small"  @click="view(scope.row.id)" v-if="gameemailgetinfo">查看详情</el-button>
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
      <el-form-item label="渠道" :label-width="formLabelWidth" prop="org">
      <el-select v-model="form.org" filterable style="width:100%;">
        <el-option
          v-for="item in orglist"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="收件人" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
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

  
  <el-dialog title="邮件详情" :visible.sync="outerVisible">
    <div class="line">
      <span>{{list.title}}</span>
      <span class="floatright">{{list.create_time}}</span>
      <p style="font-size:16px;font-weight:500;" class="sizestyle">发送至：<span>{{list.receive_name}}</span>
        <el-button @click="more(list.title, list.create_time)" class="floatright" type="text"
                   v-if="gameemailgetreceiverlist">详情
        </el-button>
      </p>
      
    </div>
    <p class="sizestyle">
      {{list.content}}
    </p>
    <el-dialog
    class="dialogcolor"
      width="50%"
      title="邮件收件人"
      :visible.sync="innerVisible"
      append-to-body>

      <div style="font-size:21px;font-weight:700;">
      <span>{{nametitle}}</span>
      <span class="floatright">{{nametime}}</span>
      <p style="font-size:16px;font-weight:500;" class="sizestyle">发送至：<span v-for="(item, index) in receiverlist" :key="index" style="margin-left:10px;" :class="item.isread ==='1'?'namegreen': ''">{{item.email_receiver}}</span></p>

      <div class="paging" style="float:left">
        <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page.sync="currentPage1"
        :page-size="pagesize1"
        background
        layout="prev, next, jumper"
        :total="total">
      </el-pagination>
      </div>
      
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false" type="primary">关闭</el-button>
    </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false" type="primary">关闭</el-button>
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
        title: '',
        receive: '',
        time: ''
      },
      currentPage: 1,
      tableData: [],
      namelist: [],
      dialogFormVisible: false,
      outerVisible: false,
      innerVisible: false,
      orglist: [],
      form: {
        name: '',
        desc: '',
        content: '',
        org: ''
      },
      rules: {
        org:[{required: true, message: '请选择渠道', trigger: 'blur'}],
        name: [
          {required: true, message: '请输入收件人', trigger: 'blur'}
        ],
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
      id: '',
      list: {},
      total1: 0,
      currentPage1: 1,
      pagesize1: 50,
      receiverlist: [],
      nametime: '',
      nametitle: ''
    }
  },
  created() {
    let that = this
    getorglist(that)
    if (!this.mail.length && this.mail.length != 0) {
      that.formInline.title = this.mail.title
      that.currentPage = this.mail.currentPage
      that.pagesize = this.mail.pagesize
      that.formInline.receive = this.mail.receive
      that.formInline.time = this.mail.time
      getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.time)
    }
  },
  computed: {
    ...mapGetters([
      'gameemailadd',
      'gameemailgetlist',
      'gameemailgetinfo',
      'gameemailgetreceiverlist',
      'mail'
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
      this.title = '写邮件'
      this.dialogFormVisible = true
    },
    view (id) {
      this.outerVisible = true
      this.id = id
      let that = this
      request({
            url: that.public.url + '/gameemail/getinfo',
            method: 'post',
            data: {
              id: id
            }
          }).then(res => {
            that.list = res.data
          }).catch(error => {
          })
    },
    more (nametitle, nametime) {
      this.innerVisible = true
      this.nametitle = nametitle
      this.nametime = nametime
      getreceiverlist(this, this.id, this.currentPage1, this.pagesize1)
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.time)
      let setmail = {
          'title': that.formInline.title,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'receive': that.formInline.receive,
          'time': that.formInline.time
        }
      this.$store.commit('setmail', setmail)
    },
    sure (form) { 
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          // if (this.form.name.length > 0) {
          //   var receiver = this.form.name.join(',')
          // } else {
          //   var receiver = ''
          // }
            request({
            url: that.public.url + '/gameemail/add',
            method: 'post',
            data: {
                  email_receiver: this.form.name,
                  title: this.form.desc,
                  content: this.form.content,
                  org_id: this.form.org
            }
          }).then(res => {
            if (response.code === 0) {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
             getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.time)
            }
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      let that = this
       getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.time)
       let setmail = {
          'title': that.formInline.title,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'receive': that.formInline.receive,
          'time': that.formInline.time
        }
      this.$store.commit('setmail', setmail)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
       getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.time)
       let setmail = {
          'title': that.formInline.title,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'receive': that.formInline.receive,
          'time': that.formInline.time
        }
      this.$store.commit('setmail', setmail)
    },
    handleSizeChange1(val) {
      this.pagesize1 = val
      this.currentPage1 = 1
       getreceiverlist(this, this.id, this.currentPage1, this.pagesize1)
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val *1
        getreceiverlist(this, this.id, this.currentPage1, this.pagesize1)
    }
  }
}


function getlist (that, title, currentPage, pagesize, receive, time) {
  let data = {
    title: title.trim(),
    pageno: currentPage,
    pagerows: pagesize,
    receive_name: receive.trim()
  }
  if (time && time.length > 0) {
    var start = time[0].getTime() /1000
    data.time_from = start
    var end = time[1].getTime() /1000
    data.time_to = end
  }
  
  request({
    url: that.public.url + '/gameemail/getList',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}


function getreceiverlist (that, id, currentPage1, pagesize1) {
  request({
    url: that.public.url + '/gameemail/getreceiverlist',
    method: 'post',
    data: {
      pageno: currentPage1,
      pagerows: pagesize1,
      id: id
    }
  }).then(res => {
    that.receiverlist = res.data.list
    that.total1 = res.data.rownum * 1
    that.currentPage1 = res.data.pageno * 1
  }).catch(error => {
  })
}


function getorglist(that) {
 request({
    url: that.public.url + "/backend/org/getorglist",
    method: "post",
    data: {}
  })
    .then(res => {
      that.orglist = res.data
    })
    .catch(error => {});
}

</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .line {
    border-bottom: 1px solid #666;
    margin-bottom: 20px;
    font-size: 21px;
    font-weight: 700;
    margin-right: -126px;
  }
  .floatright {
    float: right;
  }
  .texthight textarea {
    min-height: 130px!important;
  }
  .mail .el-dialog__header {
    background: #dedbdb!important;
  }
 .namegreen {
    color: #37b389;
  }
  .dialogcolor .el-dialog__header {
    background: #dedbdb!important;
  }
  .sizestyle {
    font-size: 21px;
    width: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }
</style>
