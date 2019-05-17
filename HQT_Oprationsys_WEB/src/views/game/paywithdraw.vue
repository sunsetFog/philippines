<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="50px">
          <el-col :span="5">
            <el-form-item label="提款类型" label-width="70px">
               <el-select v-model="formInline.src" filterable clearable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="提款人登录名" label-width="70px" class="tkr">
            <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="订单号" label-width="70px">
                 <el-input v-model="formInline.number" placeholder="请输入要查询的关键词" clearable></el-input>
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
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paywithdrawgetlist">查询</el-button>
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
      prop="src"
      label="提款请求来源">
    </el-table-column>
    <el-table-column
      prop="order_no"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="提款人">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="渠道组">
    </el-table-column>
    <el-table-column
      prop="agent_account_name"
      label="所属代理人员">
    </el-table-column>
    <el-table-column
      prop="money"
      label="提款金额">
    </el-table-column>
    <el-table-column
      prop="broker_rate"
      label="手续费率">
    </el-table-column>
    <el-table-column
      prop="broker_money"
      label="手续费">
    </el-table-column>
    <el-table-column
      prop="to_cardno"
      label="提款人银行卡号">
    </el-table-column>
    <el-table-column
      prop="to_bank"
      label="提款银行">
    </el-table-column>
     <el-table-column
      label="提款持卡人姓名">
      <template slot-scope="scope">
        {{scope.row.to_cardholder}}
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间">
      <template slot-scope="scope">
        {{scope.row.create_time}}
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInline: {
        src: '',
        name: '',
        number: '',
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      tableData: [],
      typelist: [
        {name: '玩家提款', type: '1'},
        {name: '代理提款', type: '2'}
      ],
      total: 0,
      pagesize: 50,
      id: '',
    }
  },
  created() {
    let that = this
    if (!this.paywithdraw.length && this.paywithdraw.length != 0) {
      that.formInline.name = this.paywithdraw.name
      that.currentPage = this.paywithdraw.currentPage
      that.pagesize = this.paywithdraw.pagesize
      that.formInline.number = this.paywithdraw.number
      that.formInline.src = this.paywithdraw.src
      that.formInline.starttime = this.paywithdraw.starttime
      that.formInline.endtime = this.paywithdraw.endtime
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'paywithdrawgetlist',
      'paywithdraw'
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
      getlist(this)
      let setpaywithdraw = {
          'name': that.formInline.name,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'src': that.formInline.src,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpaywithdraw', setpaywithdraw)
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setpaywithdraw = {
          'name': that.formInline.name,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'src': that.formInline.src,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpaywithdraw', setpaywithdraw)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setpaywithdraw = {
          'name': that.formInline.name,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'src': that.formInline.src,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpaywithdraw', setpaywithdraw)
    }
  }
}


function getlist (that) {
  let data = {
    user_name: that.formInline.name.trim(),
    pageno: that.currentPage,
    pagerows: that.pagesize,
    order_no: that.formInline.number.trim(),
    src: that.formInline.src
  }
  if (that.formInline.starttime) {
    var start = that.formInline.starttime.getTime() /1000
    data.create_time_from = parseTime(start)
  }
  if (that.formInline.endtime) {
    var end = that.formInline.endtime.getTime() /1000
    data.create_time_to = parseTime(end)
  }
  
  request({
    url: that.public.url + '/paywithdraw/getList',
    method: 'post',
    data: data
  }).then(res => {
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
 .namegreen {
    color: #37b389;
  }
  .dialogcolor .el-dialog__header {
    background: #dedbdb!important;
  }
  .tkr .el-form-item__label {
    text-align: center!important;
    line-height: 24px!important;
  }
</style>
