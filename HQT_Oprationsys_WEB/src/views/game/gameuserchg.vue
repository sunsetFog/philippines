<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true">
          <el-col :span="6">
            <el-form-item label="玩家账号" label-width="70px">
            <el-input v-model="formInline.value" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="账变类型"  label-width="70px">
                <el-select v-model="formInline.type" multiple filterable clearable >
                <el-option
                  v-for="item in typelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="开始日期" label-width="70px">
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
            <el-form-item label="结束日期" label-width="70px">
              <el-date-picker
              v-model="formInline.endtime"
              :editable="false"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="70px">


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
            <el-form-item label="UID">
                <el-input v-model="formInline.uid" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameuserchggetlist" :loading="loading">查询</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"  @click="excel()" :loading="loading2" v-if="gameuserchggetListdownload">导出excel</el-button>
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
    @expand-change='change'
    :row-key="getrowkey"
    :expand-row-keys="expands"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class='demo-table-expand' v-if="props.row.src_type === '游戏结算' || props.row.src_type === '游戏撤单'">
                <el-form-item label="订单号">
                    <span>{{id}}</span>
                </el-form-item>
                 <el-form-item label="游戏名字">
                    <span>{{game_name}}</span>
                </el-form-item>
                 <el-form-item label="输赢金额">
                    <span>{{lw_money}}</span>
                </el-form-item>
                 <el-form-item label="收税">
                    <span>{{tax}}</span>
                </el-form-item>
                <el-form-item label="结算状态">
                    <span>{{status}}</span>
                </el-form-item>
                <el-form-item label="桌号">
                    <span>{{tableno}}</span>
                </el-form-item>
                <el-form-item label="下注项目">
                    <span>{{bet_item_name}}</span>
                </el-form-item>
                <el-form-item label="下注数据">
                    <span>{{bet_data}}</span>
                </el-form-item>
                <el-form-item label="订单时间">
                    <span>{{atime}}</span>
                </el-form-item>
            </el-form>
            <el-form label-position="left" inline class='demo-table-expand' v-if="props.row.src_type === '支付充值'">
                <el-form-item label="订单号">
                    <span>{{info1.order_no}}</span>
                </el-form-item>
                 <el-form-item label="充值金额">
                    <span>{{info1.money}}</span>
                </el-form-item>
                 <el-form-item label="转账银行">
                    <span>{{info1.from_bank}}</span>
                </el-form-item>
                 <el-form-item label="手续费">
                    <span>{{info1.broken_money}}</span>
                </el-form-item>
                <el-form-item label="到账时间">
                    <span>{{info1.arrived_time}}</span>
                </el-form-item>
                <el-form-item label="充值时间">
                    <span>{{info1.create_time}}</span>
                </el-form-item>
                <el-form-item label="状态">
                    <span>{{info1.status}}</span>
                </el-form-item>
            </el-form>
        </template>
    </el-table-column>
    <el-table-column
      prop="uid"
      label="UID">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="玩家账号">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="src_type"
      label="账变类型">
    </el-table-column>
    <el-table-column
      prop="balance_before"
      label="账变前余额">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="账变金额">
    </el-table-column>
    <el-table-column
      prop="balance_after"
      label="账变后金额">
    </el-table-column>
    <el-table-column
      prop="deposit"
      label="保险箱金额">
    </el-table-column>
    <el-table-column
      prop="clientip"
      label="客户ip">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="账变时间">
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
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
      formInline: {
        type: '',
        value: '',
        starttime: '',
        endtime: '',
        org: '',
        uid: ''
      },
      getrowkey (row) {
          return (row.id)
      },
      expands: [],
      id: '',
      game_name: '',
      lw_money: '',
      tax: '',
      status: '',
      tableno: '',
      bet_item_name: '',
      bet_data: '',
      atime: '',
      currentPage: 1,
      tableData: [],
      loading: false,
      loading2: false,
      typelist: [
        // {name: '支付充值', type: '1'},
        // {name: '游戏结算', type: '2'},
        // {name: '游戏撤单', type: '3'},
        // {name: '后台充值', type: '4'},
        // {name: '活动奖励', type: '5'},
        // {name: '提款申请', type: '6'},
        // {name: '提款失败', type: '7'},
        // {name: '存保险箱', type: '8'},
        // {name: '取保险箱', type: '9'},
      ],
      total: 0,
      pagesize: 20,
      info1: [],
      orglist: []
    }
  },
  created() {
    let that = this
    gettypelist(this)
    getaccount(this)
    if (Object.keys(this.$route.query).length > 0) {
      that.formInline.uid = this.$route.query.uid     
      //getlist(this)
    } else {
    if (!this.gameuserchg.length && this.gameuserchg.length != 0) {
      that.formInline.value = this.gameuserchg.value
      that.currentPage = this.gameuserchg.currentPage
      that.pagesize = this.gameuserchg.pagesize
      that.formInline.type = this.gameuserchg.type
      that.formInline.starttime = this.gameuserchg.starttime
      that.formInline.endtime = this.gameuserchg.endtime
      that.formInline.org = that.gameuserchg.org
      that.formInline.uid = that.gameuserchg.uid
      //getlist(this)
    }
    }
  },
  computed: {
    ...mapGetters([
      'gameuserchggetlist',
      'gameuserchg',
      'gameuserchggetListdownload'
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
      let setgameuserchg = {
          'value': that.formInline.value,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setgameuserchg', setgameuserchg)
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0 && row.src_type == '游戏结算') {
        return 'displaynone'
      }
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setgameuserchg = {
          'value': that.formInline.value,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setgameuserchg', setgameuserchg)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setgameuserchg = {
          'value': that.formInline.value,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'org': that.formInline.org,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setgameuserchg', setgameuserchg)
    },
    change (row, data) {
        let that = this
        if (data.length) {
            this.expands = []
            if (row) {
                that.expands.push(row.id)
            }
            if (row.src_type === '游戏结算') {
                let type = '2'
                getinfo2(that,row.id,type)
            }
            if (row.src_type === '游戏撤单') {
                let type = '3'
                getinfo2(that,row.id,type)
            }
            if (row.src_type === '支付充值') {
                let type = '1'
                getinfo1(that,row.id,type)
            }
             
        } else {
            this.expands = []
        }
    },
    excel(){
      let that = this
      let data = {
    user_name: that.formInline.value.trim(),
    pageno: that.currentPage,
    pagerows: that.pagesize,
    src_type: that.formInline.type.join(','),
    agent_org_id: that.formInline.org,
    uid: that.formInline.uid,
  }
  if (that.formInline.starttime) {
    var start = that.formInline.starttime.getTime() /1000
    data.chg_time_from = parseTime(start)
  }
  if (that.formInline.endtime) {
    var end = that.formInline.endtime.getTime() /1000
    var newEnd = end + 24*3600-1
    data.chg_time_to = parseTime(newEnd)
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
  that.loading2 = true
  request({
    url: that.public.url + '/gameuserchg/getListdownload',
    method: 'post',
    data: data,
  }).then(res => {
    that.loading2 = false
     window.location.href = that.public.url + res.data
  }).catch(error => {
  })
    }
  }
}


function getlist (that) {
  that.loading = true
  let data = {
    user_name: that.formInline.value.trim(),
    pageno: that.currentPage,
    pagerows: that.pagesize,
    src_type: that.formInline.type.join(','),
    agent_org_id: that.formInline.org,
    uid: that.formInline.uid,
  }
  if (that.formInline.starttime) {
    var start = that.formInline.starttime.getTime() /1000  
    data.chg_time_from = parseTime(start)
  }
  if (that.formInline.endtime) {
    var end = that.formInline.endtime.getTime() /1000
    var newEnd = end + 24*3600-1
    data.chg_time_to = parseTime(newEnd)
  }
  
  request({
    url: that.public.url + '/gameuserchg/getList',
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

function getinfo2 (that, id, type) {
    request({
        url: that.public.url + '/gameuserchg/getinfo',
        method: 'post',
        data: {
            id: id,
            type: type
        }
    }).then(res => {
        that.game_name = res.data.game_name
        that.lw_money = res.data.lw_money
        that.tax = res.data.tax
        that.status = res.data.status
        that.tableno = res.data.tableno
        that.bet_item_name = res.data.bet_item_name
        that.bet_data = res.data.bet_data
        that.atime = res.data.atime
        that.id = res.data.id
    }).catch(error => {
    })
}

function getinfo1 (that, id, type) {
    request({
        url: that.public.url + '/gameuserchg/getinfo',
        method: 'post',
        data: {
            id: id,
            type: type
        }
    }).then(res => {
        that.info1 = res.data
    }).catch(error => {
    })
}


function gettypelist(that) {
  request({
        url: that.public.url + '/gameuserchg/getchgnamelist',
        method: 'post',
        data: {
        }
    }).then(res => {
        that.typelist = res.data
    }).catch(error => {
    })
}


function getaccount (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    let all = {id: "", name: "全部"}
    that.orglist = res.data
    that.orglist.unshift(all)
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
  .demo-table-expand {
      font-size: 0;
  }
  .demo-table-expand table {
      width: 90px;
      color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 10px;
      width: 25%;
  }
  .displaynone .el-table__expand-icon  {
    display: none;
  }
</style>
