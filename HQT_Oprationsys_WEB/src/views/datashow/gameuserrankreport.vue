<template>
  <div class="app-container gameuserrankreport">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="4">
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
          <el-col :span="4">
            <el-form-item label="排行条件">
                <el-select v-model="formInline.order">
                <el-option
                  v-for="item in orderlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
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
          <el-col :span="4">
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
            <el-form-item label="排名个数">
                <el-input v-model="formInline.number" clearable type='number'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameuserrankreportgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- <div class="pagingbox">
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
    </div> -->

    <el-table
    :data="tableData"
    @sort-change='sort'
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width='100'
      label="排名">
    </el-table-column>
    <!-- <el-table-column
      prop="user_id"
      label="用户id">
    </el-table-column> -->
    <el-table-column
      label="用户id">
      <template slot-scope="scope">
        <el-button type="text" size="small"  @click="edit(scope.row)" >{{scope.row.user_id}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="flow"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="流水">
    </el-table-column>
    <el-table-column
      prop="user_lose_money"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="玩家输额">
    </el-table-column>
    <el-table-column
      prop="user_win_money"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="玩家赢额">
    </el-table-column>
    <el-table-column
      prop="tax"
      label="税收">
    </el-table-column>
  </el-table>

<!-- <div class="pagingbox">
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
</div> -->



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
        id: '',
        order: '1',
        number: ''
      },
      orderlist: [
        {
          name: '用户亏损最多',
          id: '1'
        },
        {
          name: '用户盈利最多',
          id: '2'
        },
        {
          name: '流水最多',
          id: '3'
        }
      ],
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
    if (!this.gameuserrankreport.length && this.gameuserrankreport.length != 0) {
      that.formInline.starttime = this.gameuserrankreport.starttime
      that.formInline.endtime = this.gameuserrankreport.endtime
      that.formInline.id = this.gameuserrankreport.id
       getlist(that, that.formInline.starttime, that.formInline.endtime, that.formInline.id)
    }
  },
  computed: {
    ...mapGetters([
      'gameuserrankreportgetlist',
      'gameuserrankreport'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        if (this.formInline.number!= '' && this.formInline.number * 1 < 10) {
          this.$message.error('排名个数最小为10')
        } else {
          getlist(that, that.formInline.starttime, that.formInline.endtime, that.formInline.id)
          let setgameuserrankreport = {
              'starttime': that.formInline.starttime,
              'endtime': that.formInline.endtime,
              'id': that.formInline.id
            }
          this.$store.commit('setgameuserrankreport', setgameuserrankreport)
        } 
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
    },
    sort ({column, prop, order}) {
      if (this.tableData.length > 0) {
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
      }
    },
    edit (row) {
      this.$router.push({path:'/analysisdatamgr/gameorderdetail',query:{id:row.user_id}})
    }
    // handleSizeChange(val) {
    //   this.pagesize = val
    //   let that = this
    //   this.currentPage = 1
    //   getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val *1
    //   let that = this
    //   getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id)
    // }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, id) {
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
    url: that.public.url + '/backend/gameuserrankreport/getlist',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      game_id: game_id,
      orderby: that.formInline.order,
      count: that.formInline.number
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
    that.tableData = res.data.list
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
  .gameuserrankreport .el-input__inner {
    width: 180px!important;
  }
  .gameuserrankreport .el-date-editor.el-input{
    width: 180px!important;
  }
</style>
