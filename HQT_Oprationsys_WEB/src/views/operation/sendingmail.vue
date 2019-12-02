<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
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

          <el-col :span="5">
            <el-form-item label="开始日期">
              <el-date-picker
              v-model="formInline.starttime"
              type="date"
              :editable="false"
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
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
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
      style="width: 100%">发
    <el-table-column
      prop="sender_name"
      label="发送人">
    </el-table-column>
    <el-table-column
      prop="content"
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
        <el-button type="text" size="small"  @click="view(scope.row.id)">查看详情</el-button>
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


  
  <el-dialog title="邮件详情" :visible.sync="outerVisible">
    <div class="line">
      <span>{{list.title}}</span>
      <span class="floatright">{{list.create_time}}</span>
      <p style="font-size:16px;font-weight:500;">发送至：<span>{{list.receive_name}}</span> <el-button type="text" @click="more(list.title, list.create_time)" class="floatright">更多</el-button></p>
      
    </div>
    <div style="font-size:21px;">
      {{list.content}}
    </div>
    <el-dialog
    class="dialogcolor"
      width="50%"
      title="邮件收件人"
      :visible.sync="innerVisible"
      append-to-body>

      <div style="font-size:21px;font-weight:700;">
      <span>{{nametitle}}</span>
      <span class="floatright">{{nametime}}</span>
      <p style="font-size:16px;font-weight:500;">发送至：<span v-for="(item, index) in receiverlist" :key="index" style="margin-left:10px;" :class="item.isread ==='1'?'namegreen': ''">{{item.email_receiver}}</span></p>

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
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      tableData: [],
      outerVisible: false,
      innerVisible: false,
      formLabelWidth: '120px',
      title: '',
      total: 0,
      pagesize: 20,
      id: '',
      list: {},
      total1: 0,
      currentPage1: 1,
      pagesize1: 20,
      receiverlist: [],
      nametime: '',
      nametitle: ''
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'roleadd',
      'roledel',
      'roleupdate',
      'rolegetlist'
    ])
  },
  watch: {
  },
  methods: {
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
      getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.starttime,that.formInline.endtime)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      let that = this
       getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.starttime,that.formInline.endtime)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
       getlist(that, that.formInline.title, that.currentPage, that.pagesize, that.formInline.receive, that.formInline.starttime,that.formInline.endtime)
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


function getlist (that, title, currentPage, pagesize, receive, starttime, endtime) {
  let data = {
    title: title.trim(),
    pageno: currentPage,
    pagerows: pagesize,
    receive_name: receive.trim()
  }
  if (starttime) {
    var start = starttime.getTime() /1000
    data.time_from = start
  }
  if (endtime) {
    var end = endtime.getTime() /1000
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

</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
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
</style>
