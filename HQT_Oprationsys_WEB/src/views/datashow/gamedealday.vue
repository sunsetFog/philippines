<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-form-item label="游戏名称">
                <!-- <el-input v-model="formInline.id" clearable></el-input> -->
                <el-select v-model="formInline.id" multiple filterable>
                <el-option
                  v-for="item in gamelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="6">
            <el-form-item label="结束日期">
              <el-date-picker
              v-model="formInline.endtime"
              type="date"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamedealdayreportgetlist">查询</el-button>
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
    :row-class-name="tableclassname"
    :cell-class-name='cell'
    @sort-change='sort'
    border
    style="width: 100%">
    <el-table-column
      prop="adate"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="flow"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="流水">
    </el-table-column>
    <el-table-column
      prop="user_lose_money"
      label="玩家输额">
    </el-table-column>
    <el-table-column
      prop="user_win_money"
      label="玩家赢额">
    </el-table-column>
    <el-table-column
      prop="tax"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="税收">
    </el-table-column>
    <el-table-column
      prop="revenue"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="营收">
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



  </div>
</template>

<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInline: {
        starttime: '',
        endtime: '',
        id: ''
      },
      currentPage: 1,
      tableData: [
      ],
      gamelist: [],
      total: 0,
      pagesize: 50,
      havetime: false,
      havetime1: false
    }
  },
  created() {
    let week = new Date(new Date().toLocaleDateString()).getTime()
    let time = new Date(new Date().toLocaleDateString()).getTime()
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    getgamelist(this)
    let that = this
    if (!this.gamedealday.length && this.gamedealday.length != 0) {
      that.formInline.starttime = this.gamedealday.starttime
      that.currentPage = this.gamedealday.currentPage
      that.pagesize = this.gamedealday.pagesize
      that.formInline.endtime = this.gamedealday.endtime
      that.formInline.id = this.gamedealday.id
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
    }
  },
  computed: {
    ...mapGetters([
      'gamedealdayreportgetlist',
      'gamedealday'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
        let setgamedealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id
        }
      this.$store.commit('setgamedealday', setgamedealday)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 2 && row.flow*1 < 0) {
        return 'red'
      }
      if (columnIndex === 3 && row.user_lose_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 4 && row.user_win_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 5 && row.tax*1 < 0) {
        return 'red'
      }
      if (columnIndex === 6 && row.revenue*1 < 0) {
        return 'red'
      }
    },
    tableclassname ({row, rowIndex}) {
      if(row.revenue * 1 < (row.flow * 1 * 0.05)) {
        return 'warning-row';
      }
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    sort ({column, prop, order}) {
      if (this.tableData.length > 0) {
        var sum = this.tableData.shift()
        switch(order) {
          case 'ascending':
            this.tableData.sort((a,b) => {
              if (prop === 'adate') {
                return b[prop] > a[prop] ? 1 : -1
              } else {
                return b[prop]*1 - a[prop]*1
              }
            })
            break
          case 'descending':
            this.tableData.sort((a,b) => {
              if (prop === 'adate') {
                return a[prop] > b[prop] ? 1 : -1
              } else {
                return a[prop]*1 - b[prop]*1
              }
            })
            break
        }
        this.tableData.unshift(sum)
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
      let setgamedealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id
        }
      this.$store.commit('setgamedealday', setgamedealday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
      let setgamedealday = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id
        }
      this.$store.commit('setgamedealday', setgamedealday)
    }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, currentPage, pagesize, id) {
   var timestart = ''
    var timeend = ''
    if (starttime) {
      var start = starttime.getTime() /1000
      var timestart = parseTime(start)
    }
    if (endtime) {
      var end = endtime.getTime() /1000
      var timeend = parseTime(end + 24 *60*60 -1)
    }
    if (start && end) {
      if (start > end) {
        Message({
          message: '开始时间必须小于结束时间',
          type: 'error'
        })
        return
      }
    }
    var game_id = id.join(',')
  request({
    url: that.public.url + '/backend/gamedealdayreport/getlist',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      pageno: currentPage,
      pagerows: pagesize,
      game_id: game_id
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
      if (res.data.list.length === 0) {
        that.tableData = res.data.list
      } else {
         let data = res.data.total[0]
        data.adate = '总计'
        that.tableData = res.data.list
        that.tableData.unshift(data)
      }  
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
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

function getgamelist (that) {
  request({
    url: that.public.url + '/backend/gamename/getgamenamelist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.gamelist = res.data
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
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
