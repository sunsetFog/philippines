<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" @click="back">返回</el-button>
          </el-col>
          <el-col :span="5">
            <el-form-item label="期号">
                <el-input v-model="formInline.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
                <!-- <el-input v-model="formInline.id" clearable></el-input> -->
                <el-select v-model="formInline.status">
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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
              type="date"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameuserrankreportgameorderdetail">查询</el-button>
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
    <div class="paging">
  <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
  <el-button type='primary' @click="down" :disabled="tableData.length < 20 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</div>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="订单编号">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="tableno"
      label="游戏桌号">
    </el-table-column>
    <el-table-column
      prop="termno"
      label="游戏期号">
    </el-table-column>
    <el-table-column
      prop="bet_item_code"
      label="下注项目">
    </el-table-column>
    <el-table-column
      prop="bet_data"
      label="下注数据">
    </el-table-column>
      <el-table-column
      prop="bbef_balance"
      label="下注前余额">
    </el-table-column>
    <el-table-column
      prop="bet_money"
      label="下注金额">
    </el-table-column>
    <el-table-column
      prop="lw_money"
      label="输赢金额">
    </el-table-column>
    <el-table-column
      prop="tax"
      label="税收">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
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
<div class="paging">
  <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
  <el-button type='primary' @click="down" :disabled="tableData.length < 20 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
        id: '',
        status: '1'
      },
      statuslist: [
        {
          id: '1',
          name: '已中奖'
        },
        {
          id: '2',
          name: '未中奖'
        }
      ],
      currentPage: 1,
      tableData: [
      ],
      total: 0,
      pagesize: 20,
      havetime: false,
      havetime1: false,
      id: '',
      num: 1
    }
  },
  created() {
    // let week = new Date(new Date().toLocaleDateString()).getTime()
    // let time = new Date(new Date().toLocaleDateString()).getTime()
    // this.formInline.starttime = new Date(week)
    // this.formInline.endtime = new Date(time)
    this.id = this.$route.query.id
    let that = this
    this.currentPage = 1
    this.num = 1
    getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
  },
  computed: {
    ...mapGetters([
      'gameuserrankreportgameorderdetail'
    ])
  },
  watch : {
    // 'formInline.starttime': function (time) {
    //   if (time) {
    //     this.havetime = true
    //   } else {
    //     this.havetime = false
    //   }
    // },
    // 'formInline.endtime': function (time) {
    //   if (time) {
    //     this.havetime1 = true
    //   } else {
    //     this.havetime1 = false
    //   }
    // }
  },
  methods: {
    query () {
      // if (this.havetime && this.havetime1) {
        let that = this
        this.currentPage = 1
        this.num = 1
        getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
      // } else {
      //   Message({
      //     message: '必须选择时间',
      //     type: 'error'
      //   })
      // }
    },
    up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
    },
    back () {
      this.$router.push({path: '/analysisdatamgr/gameuserrankreport'})
    },
    // sort ({column, prop, order}) {
    //   if (this.tableData.length > 0) {
    //     var sum = this.tableData.shift()
    //     switch(order) {
    //       case 'ascending':
    //         this.tableData.sort((a,b) => {
    //           if (prop === 'adate') {
    //             return b[prop] > a[prop] ? 1 : -1
    //           } else {
    //             return b[prop]*1 - a[prop]*1
    //           }
    //         })
    //         break
    //       case 'descending':
    //         this.tableData.sort((a,b) => {
    //           if (prop === 'adate') {
    //             return a[prop] > b[prop] ? 1 : -1
    //           } else {
    //             return a[prop]*1 - b[prop]*1
    //           }
    //         })
    //         break
    //     }
    //     this.tableData.unshift(sum)
    //   }
    // },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
      getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize)
    }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, currentPage, pagesize) {
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
  request({
    url: that.public.url + '/backend/gameuserrankreport/gameorderdetail',
    method: 'post',
    data: {
      date_from: timestart,
      date_to: timeend,
      pageno: currentPage,
      pagerows: pagesize,
      user_id: that.id,
      termno: that.formInline.id.trim(),
      status: that.formInline.status
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
    that.tableData = res.data
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
