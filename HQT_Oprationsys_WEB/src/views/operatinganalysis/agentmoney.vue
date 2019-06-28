<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          


          <el-col :span="6">
            <el-form-item label="充提账变类型">
                <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          
          <el-col :span="6">
            <el-form-item label="订单号" label-width="100px">
            <el-input v-model="formInline.order" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="玩家IP地址" label-width="100px">
            <el-input v-model="formInline.ip" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="管理员">
                <el-select v-model="formInline.user" filterable clearable>
                <el-option
                  v-for="item in userlist"
                  :key="item.id"
                  :label="item.login_name"
                  :value="item.login_name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          
          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="100px">
        <el-col :span="6">
            <el-form-item label="玩家渠道">
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

          <el-col :span="6">
            <el-form-item label="玩家搜索">
              <el-input v-model="formInline.value" placeholder="请输入要查询的关键词" clearable style="width:70%"></el-input>
              <el-radio v-model="formInline.radio" :label='1' @click.native.prevent="clickitem(1)">含下级</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="账变时间">
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

          

          

          
          </el-form>
      </el-row>

       <el-row>
        <el-form :inline="true" label-width="100px">
       <el-col :span="16">
            <el-form-item label="账变金额">
                <el-select v-model="formInline.money1" style="width:20%">
                <el-option
                  v-for="item in symbollist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
              <el-input v-model="formInline.xy" clearable style="width:20%"></el-input>
              <span>并且</span>
              <el-select v-model="formInline.money2" style="width:20%">
                <el-option
                  v-for="item in symbollist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
              <el-input v-model="formInline.dy" clearable style="width:20%"></el-input>
            </el-form-item>
          </el-col>
          
          
          
          </el-form>
      </el-row>

       <el-row>
        <el-form :inline="true" label-width="100px">
        

          <el-col :span="6">
            <el-form-item label="备注" label-width="100px">
            <el-input v-model="formInline.remark" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="fundchangeagentfundlist">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary"  @click="excel" v-if="fundchangeexportagentfund">导出excel</el-button>
          </el-col>

          
          </el-form>
      </el-row>
    </div>
    <!-- <div class="pagingbox">
    <div class="paging" style="margin-top: 40px;">
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
  <el-button type='primary' @click="down" :disabled="tableData.length < 50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</div>

    <el-table
    :data="tableData"
    :span-method='arrymethod'
    :row-class-name="tableclass"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="order_no"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="create_time"
      width='200'
      label="账变时间">
    </el-table-column>
    <el-table-column
      prop="user_account"
      label="玩家账号">
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="src_type"
      label="账变类型">
    </el-table-column>
    <el-table-column
      prop="income_amount"
      label="收入">
    </el-table-column>
    <el-table-column
      prop="expend_amount"
      label="支出">
    </el-table-column>
    <el-table-column
      prop="balance_after"
      label="可用余额">
    </el-table-column>
    <el-table-column
      prop="deposit"
      label="保险箱金额">
    </el-table-column>
    <el-table-column
      prop="pay_channel"
      label="充提来源">
    </el-table-column>
    <el-table-column
      width='200'
      prop="clientip"
      label="玩家IP地址">
    </el-table-column>
     <el-table-column
      label="备注">
      <template slot-scope="scope">
        {{scope.row.remark}}
      </template>
    </el-table-column>
    <el-table-column
      label="最终审核人员">
      <template slot-scope="scope">
        {{scope.row.auditor}}
      </template>
    </el-table-column>
  </el-table>

<!-- <div class="pagingbox">
  <div class="paging" style="margin-top: 30px;">
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
  <el-button type='primary' @click="down" :disabled="tableData.length < 50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
        type: '',
        order: '',
        ip: '',
        user: '',
        org: '',
        value: '',
        radio: '',
        remark: '',
        xy: '',
        dy: '',
        time: [],
        money1: '',
        money2: ''
      },
      currentPage: 1,
      tableData: [],
      typelist: [
        {name: '[+]代理扶持', type: '18'},
        {name: '[+]代理日工资', type: '19'},
        {name: '[+]代理分红', type: '20'},
        {name: '[+]代理税收', type: '21'},
        {name: '[+]代理提款失败', type: '22'},
        {name: '[-]管理员扣减', type: '53'},
        {name: '[-]代理提款成功', type: '54'},
        {name: '[-]代理申请提款', type: '60'},
        {name: '[-]提款手续费', type: '59'},
      ],
      symbollist: [
        {name: '小于', type: '<'},
        {name: '小于等于', type: '<='},
        {name: '等于', type: '='},
        {name: '大于', type: '>'},
        {name: '大于等于', type: '>='},
      ],
      userlist: [],
      orglist: [],
      total: 0,
      pagesize: 50,
      id: '',
      num: 1
    }
  },
  created() {
    let that = this
    if (Object.keys(this.$route.query).length > 0) {
      that.formInline.type = this.$route.query.type
      that.formInline.org =  this.$route.query.id
      that.formInline.value = this.$route.query.name
      let week = new Date(new Date().toLocaleDateString()).getTime()
      let time = new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000-1
      this.formInline.time = [week, time]
      getlist(this)
    } else {
      if (!this.agentmoney.length && this.agentmoney.length != 0) {
        that.formInline.type = this.agentmoney.type
        that.currentPage = this.agentmoney.currentPage
        that.num = this.agentmoney.currentPage
        that.pagesize = this.agentmoney.pagesize
        that.formInline.order = this.agentmoney.order
        that.formInline.ip = this.agentmoney.ip
        that.formInline.user = this.agentmoney.user
        that.formInline.time = this.agentmoney.time
        that.formInline.money1 = this.agentmoney.money1
        that.formInline.money2 = this.agentmoney.money2
        that.formInline.xy = this.agentmoney.xy
        that.formInline.dy = this.agentmoney.dy
        that.formInline.remark = this.agentmoney.remark
        that.formInline.org = this.agentmoney.org
        that.formInline.value = this.agentmoney.value
        that.formInline.radio = this.agentmoney.radio
        getlist(this)
      }
    }
    getuserlist(this)
    getorglist(this)
  },
  computed: {
    ...mapGetters([
      'fundchangeagentfundlist',
      'fundchangeexportagentfund',
      'agentmoney'
    ])
  },
  watch: {
  },
  filters: {
    type (val) {
      if (val === '0') {
        return '待开奖'
      }
      if (val === '1') {
        return '已中奖'
      }
      if (val === '2') {
        return '未开奖'
      }
       if (val === '3') {
        return '已撤单'
      }
    }
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      this.num = 1
      getlist(this)
      let setagentmoney = {
          'type': that.formInline.type,
          'order': that.formInline.order,
          'ip': that.formInline.ip,
          'user': that.formInline.user,
          'currentPage': this.num,
          'pagesize': that.pagesize,
          'time': that.formInline.time,
          'money1': that.formInline.money1,
          'money2': that.formInline.money2,
          'xy': that.formInline.xy,
          'dy': that.formInline.dy,
          'remark': that.formInline.remark,
          'org': that.formInline.org,
          'value': that.formInline.value,
          'radio': that.formInline.radio,
        }
      this.$store.commit('setagentmoney', setagentmoney)
    },
    arrymethod ({row,column,rowIndex,columnIndex}) {
      
    },
    up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(this)
      let setagentmoney = {
          'type': that.formInline.type,
          'order': that.formInline.order,
          'ip': that.formInline.ip,
          'user': that.formInline.user,
          'currentPage': this.num,
          'pagesize': that.pagesize,
          'time': that.formInline.time,
          'money1': that.formInline.money1,
          'money2': that.formInline.money2,
          'xy': that.formInline.xy,
          'dy': that.formInline.dy,
          'remark': that.formInline.remark,
          'org': that.formInline.org,
          'value': that.formInline.value,
          'radio': that.formInline.radio,
        }
      this.$store.commit('setagentmoney', setagentmoney)
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(this)
      let setagentmoney = {
          'type': that.formInline.type,
          'order': that.formInline.order,
          'ip': that.formInline.ip,
          'user': that.formInline.user,
          'currentPage': this.num,
          'pagesize': that.pagesize,
          'time': that.formInline.time,
          'money1': that.formInline.money1,
          'money2': that.formInline.money2,
          'xy': that.formInline.xy,
          'dy': that.formInline.dy,
          'remark': that.formInline.remark,
          'org': that.formInline.org,
          'value': that.formInline.value,
          'radio': that.formInline.radio,
        }
      this.$store.commit('setagentmoney', setagentmoney)
    },
    excel () {
      let that = this
      var start = ''
      var end = '' 
      if (that.formInline.time && that.formInline.time.length > 0) {
        let timestart = that.formInline.time[0].getTime() /1000
        start = parseTime(timestart)
        let timeend = that.formInline.time[1].getTime() /1000
        end = parseTime(timeend)
      }
      var level = '0'
      if (that.formInline.radio != '') {
        var level = that.formInline.radio
      }
      
      request({
        url: that.public.url + '/fundchange/exportagentfund',
        method: 'post',
        data: {
          src_type: that.formInline.type,
          order_no: that.formInline.order,
          clientip: that.formInline.ip,
          date_from: start,
          date_to: end,
          auditor: that.formInline.user,
          amount_cond_1: that.formInline.money1,
          amount_cond_2: that.formInline.money2,
          amount_1: that.formInline.xy,
          amount_2: that.formInline.dy,
          remark: that.formInline.remark,
          agent_org_id: that.formInline.org,
          user_account: that.formInline.value,
          is_contain_level: level,
        }
      }).then(res => {
        let url = that.public.url + res.data
        window.location.href = url
      }).catch(error => {
      })
    },
    clickitem (e) {
      e === this.formInline.radio ? this.formInline.radio = '': this.formInline.radio  = e
    },
    tableclass ({row, rowIndex}) {
      let length = this.tableData.length -2
      if (rowIndex === length || rowIndex === length+1) {
        return 'success-row'
      }
      return ''
    },
    cell ({row, column, rowIndex, columnIndex}) {
        let length = this.tableData.length -2
        if (columnIndex === 5 && rowIndex === length) {
          return 'green'
        }
        if (columnIndex === 6 && rowIndex === length) {
          return 'red'
        }
        if (columnIndex === 5 && rowIndex === length+1) {
          return 'green'
        }
        if (columnIndex === 6 && rowIndex === length+1) {
          return 'red'
        }
        if (columnIndex === 1 && rowIndex === length) {
          let create_time = row.create_time.split('：')[1]
          if(create_time * 1 > 0) {
            return 'green'
          } else {
            return 'red'
          }
        }
        if (columnIndex === 1 && rowIndex === length+1) {
          let create_time = row.create_time.split('：')[1]
          if(create_time * 1 > 0) {
            return 'green'
          } else {
            return 'red'
          }
        }
      },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setagentmoney = {
          'type': that.formInline.type,
          'order': that.formInline.order,
          'ip': that.formInline.ip,
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'time': that.formInline.time,
          'money1': that.formInline.money1,
          'money2': that.formInline.money2,
          'xy': that.formInline.xy,
          'dy': that.formInline.dy,
          'remark': that.formInline.remark,
          'org': that.formInline.org,
          'value': that.formInline.value,
          'radio': that.formInline.radio,
        }
      this.$store.commit('setagentmoney', setagentmoney)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setagentmoney = {
          'type': that.formInline.type,
          'order': that.formInline.order,
          'ip': that.formInline.ip,
          'user': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'time': that.formInline.time,
          'money1': that.formInline.money1,
          'money2': that.formInline.money2,
          'xy': that.formInline.xy,
          'dy': that.formInline.dy,
          'remark': that.formInline.remark,
          'org': that.formInline.org,
          'value': that.formInline.value,
          'radio': that.formInline.radio,
        }
      this.$store.commit('setagentmoney', setagentmoney)
    }
  }
}


function getlist (that) {
  var start = ''
  var end = '' 
  if (that.formInline.time && that.formInline.time.length > 0) {
    if (that.$route.query) {
      let timestart = that.formInline.time[0] /1000
      start = parseTime(timestart)
      let timeend = that.formInline.time[1]/1000
      end = parseTime(timeend)
    } else {
      let timestart = that.formInline.time[0].getTime() /1000
      start = parseTime(timestart)
      let timeend = that.formInline.time[1].getTime() /1000
      end = parseTime(timeend)
    }
  }
  var level = '0'
  if (that.formInline.radio != '') {
    var level = that.formInline.radio
  }
  
  request({
    url: that.public.url + '/fundchange/agentfundlist',
    method: 'post',
    data: {
      src_type: that.formInline.type,
      order_no: that.formInline.order,
      clientip: that.formInline.ip,
      date_from: start,
      date_to: end,
      auditor: that.formInline.user,
      amount_cond_1: that.formInline.money1,
      amount_cond_2: that.formInline.money2,
      amount_1: that.formInline.xy,
      amount_2: that.formInline.dy,
      remark: that.formInline.remark,
      agent_org_id: that.formInline.org,
      user_account: that.formInline.value,
      is_contain_level: level,
      pageno: that.currentPage,
      pagerows: that.pagesize,
    }
  }).then(res => {
    if (res.data.list.length === 0) {
      that.tableData = []
      that.total = res.data.rownum * 1
      that.currentPage = res.data.pageno * 1
    } else {
      let data = res.data.list
      // data.map((val) =>{
      //   if (val.amount.indexOf('-') < 0) {
      //     val['page_income'] = val.amount
      //   } else {
      //     val['page_expend'] = val.amount
      //   }
      // })
      that.tableData = data
      let item = res.data.page_total
      let page_amount = item.page_amount
      item.create_time = '本页小结：' + page_amount
      item.income_amount = item.page_income
      item.expend_amount = item.page_expend
      let item2 = res.data.total
      let amount = item2.total_amount
      item2.create_time = '总结：' + amount
      item2.page_income = item2.total_income
      item2.page_expend = item2.total_expend
      that.tableData.push(item)
      that.tableData.push(item2)
      // that.total = res.data.rownum * 1
      // that.currentPage = res.data.pageno * 1
    }  
  }).catch(error => {
  })
}


// function getlist1 (that) {
//   var start = ''
//   var end = '' 
//   if (that.formInline.time && that.formInline.time.length > 0) {
//     if (that.$route.query) {
//       let timestart = that.formInline.time[0] /1000
//       start = parseTime(timestart)
//       let timeend = that.formInline.time[1]/1000
//       end = parseTime(timeend)
//     } else {
//       let timestart = that.formInline.time[0].getTime() /1000
//       start = parseTime(timestart)
//       let timeend = that.formInline.time[1].getTime() /1000
//       end = parseTime(timeend)
//     }
//   }
//   var level = '0'
//   if (that.formInline.radio != '') {
//     var level = that.formInline.radio
//   }
  
//   request({
//     url: that.public.url + '/fundchange/agentfundlinklist',
//     method: 'post',
//     data: {
//       src_type: that.formInline.type,
//       order_no: that.formInline.order,
//       clientip: that.formInline.ip,
//       date_from: start,
//       date_to: end,
//       auditor: that.formInline.user,
//       amount_cond_1: that.formInline.money1,
//       amount_cond_2: that.formInline.money2,
//       amount_1: that.formInline.xy,
//       amount_2: that.formInline.dy,
//       remark: that.formInline.remark,
//       agent_org_id: that.formInline.org,
//       user_account: that.formInline.value,
//       is_contain_level: level,
//       pageno: that.currentPage,
//       pagerows: that.pagesize,
//     }
//   }).then(res => {
//     if (res.data.list.length === 0) {
//       that.tableData = []
//       that.total = res.data.rownum * 1
//       that.currentPage = res.data.pageno * 1
//     } else {
//     let data = res.data.list
//     data.map((val) =>{
//       if (val.amount.indexOf('-') < 0) {
//         val['page_income'] = val.amount
//       } else {
//         val['page_expend'] = val.amount
//       }
//     })
//     that.tableData = data
//     let item = res.data.page_total
//     let page_amount = item.page_amount
//     item.create_time = '本页小结：' + page_amount
//     let item2 = res.data.total
//     let amount = item2.total_amount
//     item2.create_time = '总结：' + amount
//     item2.page_income = item2.total_income
//     item2.page_expend = item2.total_expend
//     that.tableData.push(item)
//     that.tableData.push(item2)
//     that.total = res.data.rownum * 1
//     that.currentPage = res.data.pageno * 1
//     }
//   }).catch(error => {
//   })
// }


function getuserlist (that) {
  request({
    url: that.public.url + '/account/getloginnamelist',
    method: 'post',
    data: {}
  }).then(res => {
    that.userlist = res.data
  }).catch(error => {
  })
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
  .dialogcolor .el-dialog__header {
    background: #dedbdb!important;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
