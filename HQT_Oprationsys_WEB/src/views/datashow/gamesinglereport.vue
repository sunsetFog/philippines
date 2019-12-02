<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="5">
            <el-form-item label="游戏名称">
                <el-select v-model="formInline.value" filterable clearable @change="selectType">
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="期号">
                 <el-input v-model="formInline.termno" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="开始日期">
              <el-date-picker
              v-model="formInline.starttime"
              type="datetime"
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
              type="datetime"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamesinglereportgetlist" :loading="loading">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary"  @click="excel" v-if="gamesinglereportexportlist">导出excel</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
        <div class="paging">
    <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
    <el-button type='primary' @click="down" :disabled="tableData.length <20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
    <!-- <div class="paging">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background
      layout="prev, next, jumper"
      :total="total">
    </el-pagination>
    </div> -->
    </div>

    <el-table
    :data="tableData"
    :cell-class-name='cell'
    @sort-change='sort'
    border
    style="width: 100%">
    <el-table-column
      prop="open_award_time"
      label="结算时间">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="termno"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="期号">
    </el-table-column>
    <el-table-column
      prop="flow"
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
      label="代理收益">
    </el-table-column>
    <!-- <el-table-column
      prop="revenue"
      label="营收">
    </el-table-column> -->
  </el-table>

<div class="pagingbox">
    <div class="paging">
    <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
    <el-button type='primary' @click="down" :disabled="tableData.length <20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
  <!-- <div class="paging">
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
  </div> -->
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
        time:[],
        starttime: '',
        endtime: '',
        id: '',
        type: 0,
        termno: '',
        value: ''
      },
      currentPage: 1,
      tableData: [
      ],
      gamelist: [],
      total: 0,
      pagesize: 20,
      num: 1,
      havetime: false,
      havetime1: false,
      loading: false
    }
  },
  created() {
    let week = Date.parse(new Date()) - 60*60*1000
    let time = Date.parse(new Date())
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    getgamelist(this)
    let that = this
    if (!this.gamesinglereport.length && this.gamesinglereport.length != 0) {
      that.formInline.starttime = this.gamesinglereport.starttime
      that.currentPage = this.gamesinglereport.currentPage
      that.pagesize = this.gamesinglereport.pagesize
      that.formInline.endtime = this.gamesinglereport.endtime
      that.formInline.id = this.gamesinglereport.id
      that.formInline.type = this.gamesinglereport.type
       getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
    }
  },
  computed: {
    ...mapGetters([
      'gamesinglereportgetlist',
      'gamesinglereport',
      'gamesinglereportexportlist'
    ])
  },
  watch : {
  },
  methods: {
    up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
        let setgamesinglereport = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id,
          'type': that.formInline.type
        }
      this.$store.commit('setgamesinglereport', setgamesinglereport)
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
        let setgamesinglereport = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id,
          'type': that.formInline.type
        }
      this.$store.commit('setgamesinglereport', setgamesinglereport)
    },
    excel () {
      let that = this
        var timestart = ''
        var timeend = ''
        if (that.formInline.starttime) {
          var start = that.formInline.starttime.getTime() /1000
          var timestart = parseTime(start)
        }
        if (that.formInline.endtime) {
          var end = that.formInline.endtime.getTime() /1000
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
    request({
      url: that.public.url + '/backend/gamesinglereport/exportlist',
      method: 'post',
      data: {
        date_from: timestart,
        date_to: timeend,
        termno: that.formInline.termno,
        pageno: that.currentPage,
        pagerows:that.pagesize,
        game_id: that.formInline.id,
        game_type: that.formInline.type
      }
    }).then(res => {
      window.location.href = that.public.url + res.data
    }).catch(error => {
    })
    },
    selectType(val){
      // console.log('change',val,this.gamelist[val].type)
      // console.log(this.formInline.value)
      this.formInline.type = Number(this.gamelist[val].type);
      this.formInline.id = Number(this.gamelist[val].id);
    },
    query () {
        let that = this
        getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
        let setgamesinglereport = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id,
          'type': that.formInline.type
        }
      this.$store.commit('setgamesinglereport', setgamesinglereport)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 3 && row.flow*1 < 0) {
        return 'red'
      }
      if (columnIndex === 4 && row.user_lose_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 5 && row.user_win_money*1 < 0) {
        return 'red'
      }
      if (columnIndex === 6 && row.tax*1 < 0) {
        return 'red'
      }
      if (columnIndex === 7 && row.revenue*1 < 0) {
        return 'red'
      }
    },
    sort ({column, prop, order}) {
      if (this.tableData.length > 0) {
        var sum = this.tableData.shift()
        switch(order) {
          case 'ascending':
            this.tableData.sort((a,b) => {
                return b[prop]*1 - a[prop]*1
            })
            break
          case 'descending':
            this.tableData.sort((a,b) => {
                return a[prop]*1 - b[prop]*1
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
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
      let setgamesinglereport = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id,
          'type': that.formInline.type
        }
      this.$store.commit('setgamesinglereport', setgamesinglereport)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.type)
      let setgamesinglereport = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.id,
          'type': that.formInline.type
        }
      this.$store.commit('setgamesinglereport', setgamesinglereport)
    }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, currentPage, pagesize, id,type) { 
   var timestart = ''
    var timeend = ''
    if (starttime) {
      var start = starttime.getTime() /1000
      var timestart = parseTime(start)
    }
    if (endtime) {
      var end = endtime.getTime() /1000  
      var timeend = parseTime(end)
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
    that.loading = true
  request({
    url: that.public.url + '/backend/gamesinglereport/getlist',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      termno: that.formInline.termno,
      pageno: currentPage,
      pagerows: pagesize,
      game_id: id,
      game_type: type
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
      that.loading = false
      if (res.data.length === 0) {
        that.tableData = []
      } else {
        that.tableData = res.data
      }  
    // that.total = res.data.rownum * 1
    // that.currentPage = res.data.pageno * 1
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
