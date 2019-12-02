<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="参与用户调查" v-if="gameactivitysearchgetjoinuserlist">


        <div class="query">
          <el-row>
            <el-form :inline="true" label-width="80px">
              <el-col :span="3">
                <el-button type="info" @click="back">返回</el-button>
              </el-col>
              <el-col :span="6">
                <el-form-item label="参与用户">
                    <el-input v-model="formInline.user" placeholder="参与用户" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="参与时间">
                  <el-date-picker
                  v-model="formInline.time"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholde="开始日期"
                  end-placeholde="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
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
        style="width: 100%">
        <el-table-column
          prop="user_loginname"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="join_time"
          label="参与时间">
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


      </el-tab-pane>
      <el-tab-pane label="参与用户统计" v-if="gameactivitysearchgetdayjoinusersum">
               <div class="query">
          <el-row>
            <el-form :inline="true" label-width="80px">
              <el-col :span="3">
                <el-button type="info" @click="back">返回</el-button>
              </el-col>

              <el-col :span="8">
                <el-form-item label="参与时间">
                  <el-date-picker
                  v-model="formInline1.time"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholde="开始日期"
                  end-placeholde="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="query1">查询</el-button>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <div class="pagingbox">
        <div class="paging">
          <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page.sync="currentPage1"
          :page-size="pagesize1"
          background
          layout="prev, next, jumper"
          :total="total1">
        </el-pagination>
        </div>
        </div>

        <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <el-table-column
          prop="days"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="count"
          label="参与人次">
        </el-table-column>
      </el-table>

    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page.sync="currentPage1"
          :page-sizes="[20,50,200]"
          :page-size="pagesize1"
          background
          layout="sizes, prev, pager, next, jumper"
          :total="total1">
        </el-pagination>
      </div>
    </div>
      </el-tab-pane>
    </el-tabs>
    

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
      formInline1: {
        time: ''
      },
      currentPage: 1,
      currentPage1: 1,
      tableData: [],
      tableData1: [],
      total: 0,
      total1: 0,
      pagesize: 20,
      pagesize1: 20,
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  computed: {
    ...mapGetters([
      'gameactivitysearchgetjoinuserlist',
      'gameactivitysearchgetdayjoinusersum'
    ])
  },
  watch: {
  },
  methods: {
    back () {
      this.$router.push({path: '/activitymgr/queryactivity'})
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time, that.id)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time, that.id)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      getlist(that, that.formInline.user, that.currentPage, that.pagesize, that.formInline.time, that.id)
    },
    query1 () {
      let that = this
      this.currentPage1 = 1
      getlist1(that, that.currentPage1, that.pagesize1, that.formInline1.time, that.id)
    },
    handleSizeChange1(val) {
      this.pagesize1 = val
      this.currentPage1 = 1
      getlist1(that, that.currentPage1, that.pagesize1, that.formInline1.time, that.id)
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val *1
      getlist1(that, that.currentPage1, that.pagesize1, that.formInline1.time, that.id)
    }
  }
}


function getlist (that, user, currentPage, pagesize, time, id) {
  let data = {
    jion_user: user.trim(),
    pageno: currentPage,
    pagerows: pagesize,
    activity_id: id
  }
  if (time && time.length > 0) {
    var start = time[0].getTime() /1000
    data.time_from = start
    var end = time[1].getTime() /1000
    data.time_to = end
  }
  request({
    url: that.public.url + '/gameactivitysearch/getjoinuserlist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getlist1 (that, currentPage, pagesize, time, id) {
  let data = {
    pageno: currentPage,
    pagerows: pagesize,
    activity_id: id
  }
  if (time && time.length > 0) {
    var start = time[0].getTime() /1000
    data.time_from = start
    var end = time[1].getTime() /1000
    data.time_to = end
  }
  request({
    url: that.public.url + '/gameactivitysearch/getdayjoinusersum',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData1 = res.data.list
    that.total1 = res.data.rownum *1
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
</style>
