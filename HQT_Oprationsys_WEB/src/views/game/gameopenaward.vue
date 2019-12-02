<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="50px">
           

          <el-col :span="5">
            <el-form-item label="游戏名称" label-width="70px">
            <!-- <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input> -->
            <el-select v-model="formInline.name" filterable clearable>
                <el-option
                  v-for="(item,index) in gamename"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="期号" label-width="70px">
                <el-input v-model="formInline.number" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="状态" label-width="70px">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="开始">
              <el-date-picker
              v-model="formInline.starttime"
              type="datetime"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="结束">
              <el-date-picker
              v-model="formInline.endtime"
              :editable="false"
              type="datetime"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameopenawardgetlist">查询</el-button>
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
      width="80"
      label="id">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="termno"
      label="期号">
    </el-table-column>
    <el-table-column
      prop="openno"
      label="开奖号码">
    </el-table-column>
    <el-table-column
      prop="open_award_time"
      label="开奖时间">
    </el-table-column>
    <el-table-column
      prop="is_open_award"
      label="开奖状态">
    </el-table-column>
    <el-table-column
      prop="is_settle_order"
      label="是否结算">
    </el-table-column>
    <el-table-column
      prop="settle_cost_sec"
      label="结算花销时间">
    </el-table-column>
    <el-table-column
      prop="is_cancel_order"
      label="是否撤单">
    </el-table-column>
    <el-table-column
      prop="cancel_cost_sec"
      label="撤单花销时间">
    </el-table-column>
     <el-table-column
      label="撤单原因">
      <template slot-scope="scope">
        {{scope.row.cancel_order_cause}}
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
  data() {
    return {
      formInline: {
        status: '',
        number: '',
        name: '',
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      tableData: [],
      gamename: [],
      status: [
        {name:'已撤单',id: '1' },
        {name:'未撤单',id: '2' },
        {name:'已结算',id: '3' },
        {name:'未结算',id: '4' },
        {name:'已开奖',id: '5' },
        {name:'未开奖',id: '6' }
      ],
      total: 0,
      pagesize: 20,
      id: '',
    }
  },
  created() {
    getgamename(this)
    let that = this
    if (!this.gameopenaward.length && this.gameopenaward.length != 0) {
      that.formInline.status = this.gameopenaward.status
      that.currentPage = this.gameopenaward.currentPage
      that.pagesize = this.gameopenaward.pagesize
      that.formInline.number = this.gameopenaward.number
      that.formInline.name = this.gameopenaward.name
      that.formInline.starttime = this.gameopenaward.starttime
      that.formInline.endtime = this.gameopenaward.endtime
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'gameopenawardgetlist',
      'gameopenaward'
    ])
  },
  watch: {
  },
  filters: {
    time (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      getlist(this)
      let setgameopenaward = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameopenaward', setgameopenaward)
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setgameopenaward = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameopenaward', setgameopenaward)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setgameopenaward = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameopenaward', setgameopenaward)
    }
  }
}


function getlist (that) {
  let data = {
    type: that.formInline.status,
    pageno: that.currentPage,
    pagerows: that.pagesize,
    termno: that.formInline.number.trim(),
    game_id: that.formInline.name
  }
  if (that.formInline.starttime) {
    var start = that.formInline.starttime.getTime() /1000
    data.open_time_from = parseTime(start)
  }
  if (that.formInline.endtime) {
    var end = that.formInline.endtime.getTime() /1000
    data.open_time_to = parseTime(end)
  }
  
  request({
    url: that.public.url + '/gameopenaward/getList',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}


function getgamename (that) {
  request({
    url: that.public.url + '/gameopenaward/getgamenameList',
    method: 'post',
    data: {}
  }).then(res => {
    that.gamename = res.data
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
