<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="50px">
           <el-col :span="4">
            <el-form-item label="充值渠道" label-width="70px">
                <el-select v-model="formInline.id" filterable clearable>
                <el-option
                  v-for="item in channellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态" label-width="70px">
                <el-select v-model="formInline.id2" filterable clearable>
                <el-option
                  v-for="item in statusMain"
                  :key="item.id"
                  :label="item.lable"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订单号" label-width="70px">
            <el-input v-model="formInline.number" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="玩家账号" label-width="70px">
                <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="UID" label-width="70px">
                <el-input v-model="formInline.uid" placeholder="请输入要查询的关键词" clearable></el-input>
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
          <el-col :span="4">
            <el-form-item label="排序">
              <el-select v-model="formInline.status" filterable clearable placeholder=""> 
              <el-option
                v-for="item in orderlist"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="渠道">
              <el-select v-model="agentOrgList" filterable multiple clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="payrechargegetlist" :loading="loading">查询</el-button>
          </el-col>
           <el-col :span="3">
            <el-button type="primary" @click="excel" v-if="payrechargeexportpayrecharge" >导出</el-button>
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
      prop="channel_name"
      label="充值渠道">
    </el-table-column>
    <el-table-column
      prop="order_no"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="玩家账号">
    </el-table-column>
      <el-table-column
      prop="uid"
      label="UID">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="所属代理渠道">
    </el-table-column>
    <el-table-column
      prop="agent_account_name"
      label="所属代理人员">
    </el-table-column>
    <el-table-column
      prop="money"
      label="充值金额">
    </el-table-column>
    <!-- <el-table-column
      prop="from_bank"
      label="转账银行">
    </el-table-column> -->
    <el-table-column
      prop="broker_money"
      label="手续费">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="到账时间">
      <template slot-scope="scope">
        {{scope.row.arrival_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status}}
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
        id: '',
        id2: '',
        number: '',
        name: '',
        starttime: '',
        endtime: '',
        status:'1',
        uid:'',
        agentOrg:'',
      },
      orderlist:[
        {name:'倒叙',value:'1'},
        {name:'顺序',value:'2'},
      ],
      agentOrgList:[],
      statusMain:[
        {id:'0',lable:'支付中'},
        {id:'1',lable:'充值成功（第三方返回）'},
        {id:'2',lable:'人工充值成功'},
        {id:'3',lable:'已初审'},
        {id:'4',lable:'充值失败'},
        {id:'5',lable:'超时无效'},
      ],
      currentPage: 1,
      tableData: [],
      channellist: [],
      total: 0,
      pagesize: 20,
      id: '',
      loading: false,
      userlist:[],
    }
  },
  created() {
    getchannellist(this)
     getuserlist (this)
    let that = this
    if (!this.payrecharge.length && this.payrecharge.length != 0) {
      that.formInline.id = this.payrecharge.id
      that.currentPage = this.payrecharge.currentPage
      that.pagesize = this.payrecharge.pagesize
      that.formInline.number = this.payrecharge.number
      that.formInline.uid = this.payrecharge.uid
      that.formInline.name = this.payrecharge.name
      that.formInline.starttime = this.payrecharge.starttime
      that.formInline.endtime = this.payrecharge.endtime
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'payrechargegetlist',
      'payrecharge',
      'payrechargeexportpayrecharge'
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
      let setpayrecharge = {
          'id': that.formInline.id,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'uid':that.formInline.uid,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpayrecharge', setpayrecharge)
    },
    excel(){
      let that = this
      that.loading = true
      let data = {
        channel_id: that.formInline.id,
        pageno: that.currentPage,
        pagerows: that.pagesize,
        order_no: that.formInline.number.trim(),
        user_name: that.formInline.name.trim(),
        uid:that.formInline.uid.trim(),
        orderby:that.formInline.status,
        status:that.formInline.id2
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
    url: that.public.url + '/payrecharge/exportpayrecharge',
    method: 'post',
    data: data
  }).then(res => {
    that.loading = false
    window.location.href = that.public.url + res.data
  }).catch(error => {
  })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setpayrecharge = {
          'id': that.formInline.id,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
           'uid': that.formInline.uid,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpayrecharge', setpayrecharge)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setpayrecharge = {
          'id': that.formInline.id,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
           'uid': that.formInline.uid,
          'name': that.formInline.name,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setpayrecharge', setpayrecharge)
    }
  }
}


function getlist (that) {
  that.loading = true
  let data = {
    channel_id: that.formInline.id,
    pageno: that.currentPage,
    pagerows: that.pagesize,
    order_no: that.formInline.number.trim(),
    user_name: that.formInline.name.trim(),
    uid:that.formInline.uid.trim(),
    orderby:that.formInline.status,
    status:that.formInline.id2,
    agent_org_id:that.agentOrgList.join(',')
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
    url: that.public.url + '/payrecharge/getList',
    method: 'post',
    data: data
  }).then(res => {
    that.loading = false
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getchannellist (that) {
  request({
    url: that.public.url + '/payrecharge/getchannellist',
    method: 'post',
    data: {}
  }).then(res => {
    that.channellist = res.data
  }).catch(error => {
  })
}
function getuserlist (that) {
  request({
    url: that.public.url + '/backend/role/getorglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
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
