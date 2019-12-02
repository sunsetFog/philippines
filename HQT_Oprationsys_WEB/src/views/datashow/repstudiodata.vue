<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="5">
            <el-form-item label="渠道">
                <el-select v-model="formInline.org" filterable clearable>
                <el-option
                  v-for="item in orglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="代理账号">
                <el-input v-model="formInline.tid" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="开始时间">
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
            <el-form-item label="结束时间">
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
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="repstudiogetlist" :loading="loading">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary"  @click="excel" v-if="repstudioexportlist">导出excel</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- <div class="pagingbox"> -->
        <!-- <div class="paging">
            <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
            <el-button type='primary' @click="down" :disabled="tableData.length <20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div> -->
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
    <!-- </div> -->

    <el-table
    :data="tableData"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="adate"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="user_logined_num"
      label="登录总人数">
    </el-table-column>
    <el-table-column
      prop="newuser_logined_num"    
      label="新增登录人数">
    </el-table-column>
    <el-table-column
      prop="newuser_reg_num"
      label="新增注册人数">
    </el-table-column>
    <el-table-column
      prop="user_recharge_num"
      label="充值总人数">
    </el-table-column>
    <el-table-column
      prop="newuser_recharge_num"
      label="新增充值人数">
    </el-table-column>
     <el-table-column
      prop="user_recharge_count"
      label="充值次数">
    </el-table-column>
    <el-table-column
      prop="user_recharge_money"
      label="充值总额">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_num"
      label="提款总人数">
    </el-table-column>
     <el-table-column
      prop="newuser_withdraw_num"
      label="新增提款人数">
    </el-table-column>
     <el-table-column
      prop="user_withdraw_count"
      label="提款次数">
    </el-table-column>
    <el-table-column
      prop="user_withdraw_money"
      label="提款总额">
    </el-table-column>
     <el-table-column
      prop="bet_num"
      label="当日投注人数">
    </el-table-column>
    <el-table-column
      prop="bet_ptom"
      label="人机投注总额">
    </el-table-column>
    <el-table-column
      prop="flow_ptom"
      label="人机流水总额">
    </el-table-column>
    <el-table-column
      prop="flow_ptop"
      label="人人流水总额">
    </el-table-column>
    <el-table-column
      prop="day1"
      label="次日留存">
    </el-table-column>
    <el-table-column
      prop="day3"
      label="3日留存">
    </el-table-column>
    <el-table-column
      prop="day7"
      label="7日留存">
    </el-table-column>   
  </el-table>

<!-- <div class="pagingbox">
    <div class="paging">
    <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
    <el-button type='primary' @click="down" :disabled="tableData.length <20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div> -->
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
<!-- </div> -->



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
        tid:'',
        type: 0,
        termno: '',
        value: '',
        name:'',
        agent_account_name:'',
        org:'',
      },
      currentPage: 1,
      tableData: [
      ],
      newArry:[],
      orglist: [],
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
     getorglist(this)
    let that = this  
      //getlist(that, that.formInline.starttime, that.formInline.endtime,that.formInline.org,that.formInline.tid)
  },
  computed: {
    ...mapGetters([
      'repstudiogetlist',
      'repstudioexportlist'
    ])
  },
  watch : {
  },
  methods: {
    // up () {
    //   let that = this
    //   this.num--
    //   this.currentPage = this.num
    //    getlist(that, that.formInline.starttime, that.formInline.endtime,that.formInline.value,that.formInline.tid)
    //     let setgamertpset = {
    //       'starttime': that.formInline.starttime,
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'endtime': that.formInline.endtime,
    //       'id': that.formInline.id,
    //       'tid': that.formInline.tid
    //     }
    //   this.$store.commit('setgamertpset', setgamertpset)
    // },
    // down () {
    //   let that = this
    //   this.num++
    //   this.currentPage = this.num
    //   getlist(that, that.formInline.starttime, that.formInline.endtime,  that.currentPage, that.pagesize, that.formInline.id,that.formInline.tid)
    //     let setgamertpset = {
    //       'starttime': that.formInline.starttime,
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'endtime': that.formInline.endtime,
    //       'id': that.formInline.id,
    //       'tid': that.formInline.tid
    //     }
    //   this.$store.commit('setgamertpset', setgamertpset)
    // },
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
      url: that.public.url + '/backend/repstudio/exportlist',
      method: 'post',
      data: {
        date_from: timestart.trim(),
        date_to: timeend.trim(),  
        agent_org_id:that.formInline.org,
        agent_account_name: that.formInline.tid,
      }
    }).then(res => {
      window.location.href = that.public.url + res.data
    }).catch(error => {
    })
    },
    query () {
        let that = this
        getlist(that, that.formInline.starttime, that.formInline.endtime,that.formInline.org,that.formInline.tid)
        let setgamertpset = {
          'starttime': that.formInline.starttime,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'endtime': that.formInline.endtime,
          'id': that.formInline.org,
          'tid': that.formInline.tid
        }
      this.$store.commit('setgamertpset', setgamertpset)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      // if (columnIndex === 3 && row.flow*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 4 && row.user_lose_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 5 && row.user_win_money*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 6 && row.tax*1 < 0) {
      //   return 'red'
      // }
      // if (columnIndex === 7 && row.revenue*1 < 0) {
      //   return 'red'
      // }
    },
    // sort ({column, prop, order}) {
    //   if (this.tableData.length > 0) {
    //     var sum = this.tableData.shift()
    //     switch(order) {
    //       case 'ascending':
    //         this.tableData.sort((a,b) => {
    //             return b[prop]*1 - a[prop]*1
    //         })
    //         break
    //       case 'descending':
    //         this.tableData.sort((a,b) => {
    //             return a[prop]*1 - b[prop]*1
    //         })
    //         break
    //     }
    //     this.tableData.unshift(sum)
    //   }
    // },
    // handleSizeChange(val) {
    //   this.pagesize = val
    //   let that = this
    //   this.currentPage = 1
    //   getlist(that, that.formInline.starttime, that.formInline.endtime, that.formInline.value,that.formInline.tid)
    //   let setgamertpset = {
    //       'starttime': that.formInline.starttime,
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'endtime': that.formInline.endtime,
    //       'id': that.formInline.value,
    //       'tid': that.formInline.tid
    //     }
    //   this.$store.commit('setgamertpset', setgamertpset)
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val *1
    //   let that = this
    //   getlist(that, that.formInline.starttime, that.formInline.endtime,  that.formInline.value,that.formInline.tid)
    //   let setgamertpset = {
    //       'starttime': that.formInline.starttime,
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'endtime': that.formInline.endtime,
    //       'id': that.formInline.value,
    //       'tid': that.formInline.tid
    //     }
    //   this.$store.commit('setgamertpset', setgamertpset)
    // }
  },
  filters: {
  }
}



function getlist (that, starttime, endtime, org,tid) { 
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
    that.loading = true
  request({
    url: that.public.url + '/backend/repstudio/getlist',
    method: 'post',
    data: {
      date_from: timestart.trim(),
      date_to: timeend.trim(),  
      agent_org_id:org,
      agent_account_name: tid,
    }
  }).then(res => {
    Message({
        message: res.message,
        type: 'success'
      })
      that.loading = false
      //  that.newArry = object.entries(res.data)
      // console.log(newArry)
      //  console.log(that.res.data)
      if (res.data.length === 0) {
        that.tableData = []
      } else {
        that.tableData = res.data
      }  
    // that.total = res.data.rownum * 1
    // that.currentPage = res.data.pageno * 1
  }).catch(error => {
       that.loading = false
  })
}

function parseTime(time) {
     var date = new Date(time *1000);
    let y = date.getFullYear() + '-'
    let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
    // let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
    // let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
    // let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
    //return y+m+d+h+i+s
     return y+m+d
}

function getorglist (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.orglist = res.data
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
  .el-form-item__label{
    width: 96px !important;
  }
</style>
