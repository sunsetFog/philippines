<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-form-item label="参与用户">
                <el-input v-model="formInline.user" placeholder="参与用户" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主题">
                <el-input v-model="formInline.title" placeholder="主题" clearable></el-input>
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
              end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameactivitysearchsearchactivity">查询</el-button>
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
      label="活动主题">
    </el-table-column>
    <el-table-column
      prop="join_num"
      label="参与人数">
    </el-table-column>
    <el-table-column
      prop="validtime"
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
        <el-button @click="jion(scope.row)" type="text" size="small">参与用户</el-button>
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
        time: '',
        title: ''
      },
      currentPage: 1,
      tableData: [],
      formLabelWidth: '120px',
      total: 0,
      pagesize: 20,
      id: ''
    }
  },
  created() {
    let that = this
    if (!this.queryactivity.length && this.queryactivity.length != 0) {
      that.formInline.user = this.queryactivity.user
      that.currentPage = this.queryactivity.currentPage
      that.pagesize = this.queryactivity.pagesize
      that.formInline.title = this.queryactivity.title
      that.formInline.time = this.queryactivity.time
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.title, that.formInline.time)
    }
  },
  computed: {
    ...mapGetters([
      'gameactivitysearchsearchactivity',
      'queryactivity'
    ])
  },
  watch: {
  },
  methods: {
    jion(row) {
      this.$router.push({path: '/gamemsgmgr/participateuser', query: {id:row.id}})
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.title, that.formInline.time)
      let setqueryactivity = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'title': that.formInline.title,
          'time': that.formInline.time
        }
      this.$store.commit('setqueryactivity', setqueryactivity)
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.title, that.formInline.time)
      let setqueryactivity = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'title': that.formInline.title,
          'time': that.formInline.time
        }
      this.$store.commit('setqueryactivity', setqueryactivity)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.title, that.formInline.time)
      let setqueryactivity = {
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'title': that.formInline.title,
          'time': that.formInline.time
        }
      this.$store.commit('setqueryactivity', setqueryactivity)
    }
  }
}

function getlist (that, user, currentPage, pagesize, title, time) {
  let data = {
    title: title.trim(),
    join_user: user.trim(),
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
    url: that.public.url + '/gameactivitysearch/searchactivity',
    method: 'post',
    data: data
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
</style>
