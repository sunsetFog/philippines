<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="6">
            <el-form-item label="玩家渠道" label-width="100px">
              <el-select v-model="formInline.user" filterable clearable placeholder="请选择玩家渠道"> 
                <el-option
                  v-for="item in userlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="玩家账号" label-width="100px">
            <el-input v-model="formInline.value" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="期号">
            <el-input v-model="formInline.termno" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态">
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

          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true">
          <el-col :span="6">
            <el-form-item label="游戏名称" label-width="100px">
                <el-select v-model="formInline.id"  filterable clearable>
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
         <el-col :span="6">
            <el-form-item label="订单开始时间" label-width="100px">
              <el-date-picker
              v-model="formInline.starttime"
              type="datetime"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单结束时间" label-width="100px">
              <el-date-picker
              v-model="formInline.endtime"
              type="datetime"
              :editable="false"
              placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameordergetlist">查询</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary"  @click="excel" v-if="gameorderexportorderlist">导出excel</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="paging">
      <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
      <el-button type='primary' @click="down" :disabled="tableData.length < 50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
      prop="user_account"
      label="玩家账号">
    </el-table-column>
    <el-table-column
      prop="agent_org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="bet_item_code"
      label="下注项目">
    </el-table-column>
    <el-table-column
      prop="tableno"
      label="桌号">
    </el-table-column>
    <el-table-column
      prop="termno"
      label="期号">
    </el-table-column>
    <el-table-column
      prop="bet_data"
      label="下单数据">
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
      prop="bbef_balance"
      label="下注前金额">
    </el-table-column>
    <el-table-column
    width='200'
      prop="atime"
      label="订单时间">
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
    <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
    <el-button type='primary' @click="down" :disabled="tableData.length <50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
        type: '',
        value: '',
        termno: '',
        starttime: '',
        endtime: '',
        user: '',
        id: ''
      },
      gamelist: [],
      currentPage: 1,
      tableData: [],
      typelist: [
        {name: '待开奖', type: '0'},
        {name: '已中奖', type: '1'},
        {name: '未中奖', type: '2'},
        {name: '已撤单', type: '3'},
      ],
      total: 0,
      pagesize: 50,
      id: '',
      userlist: [],
      num: 1
    }
  },
  created() {
    let that = this
    getuserlist(this)
    getgamelist(this)
    if (!this.order.length && this.order.length != 0) {
      that.formInline.value = this.order.value
      that.currentPage = this.order.currentPage
      that.num = this.order.currentPage
      that.pagesize = this.order.pagesize
      that.formInline.termno = this.order.termno
      that.formInline.type = this.order.type
      that.formInline.starttime = this.order.starttime
      that.formInline.endtime = this.order.endtime
      that.formInline.user = this.order.user
      getlist(this)
    }
    if (Object.keys(this.$route.query).length > 0) {
      if (this.$route.query.user) {
        that.formInline.value = this.$route.query.user
      }
      if (this.$route.query.timeto) {
          var date = this.$route.query.timeto
          date = date.substring(0,19)
          date = date.replace(/-/g,'/')
          that.formInline.starttime = new Date(date).getTime()
      }
      if (this.$route.query.timefrom) {
          var date1 = this.$route.query.timefrom
          date1 = date1.substring(0,19)
          date1 = date1.replace(/-/g,'/')
          that.formInline.endtime = new Date(date1).getTime()
      }
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'gameordergetlist',
      'gameorderexportorderlist',
      'order'
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
      let setorder = {
          'value': that.formInline.value,
          'currentPage': that.num,
          'pagesize': that.pagesize,
          'termno': that.formInline.termno,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'user': that.formInline.user,
        }
      this.$store.commit('setorder', setorder)
    },
    up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(this)
      let setorder = {
          'value': that.formInline.value,
          'currentPage': this.num,
          'pagesize': that.pagesize,
          'termno': that.formInline.termno,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'user': that.formInline.user,
        }
      this.$store.commit('setorder', setorder)
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(this)
      let setorder = {
          'value': that.formInline.value,
          'currentPage': this.num,
          'pagesize': that.pagesize,
          'termno': that.formInline.termno,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'user': that.formInline.user,
        }
      this.$store.commit('setorder', setorder)
    },
    excel () {
      let that = this
      var type = ''
      var id = ''
      that.gamelist.map(val=>{
        if (val.name === that.formInline.id) {
          id = val.id
          type = val.type
        }
      })
      let data = {
        user_name: that.formInline.value.trim(),
        termno: that.formInline.termno.trim(),
        status: that.formInline.type,
        agent_org_id: that.formInline.user,
        game_id: id,
        game_type: type
      }
      if (that.$route.query) {
        if (that.formInline.starttime) {
          var start = that.formInline.starttime /1000
          data.atime_from = parseTime(start)
        } else {
          that.$message.error('请选择订单开始时间')
          return false
        }
        if (that.formInline.endtime) {
          var end = that.formInline.endtime /1000
          data.atime_to = parseTime(end)
        } else {
          that.$message.error('请选择订单结束时间')
          return false
        }
        if (start > end) {
          that.$message.error('开始时间不能大于结束时间')
          return false
        } else if(end*1 - start*1 > 24*60*60*15){
          that.$message.error('导出只能导出15天之内的数据')
          return false
        }
      } else {
        if (that.formInline.starttime) {
          var start = that.formInline.starttime.getTime() /1000
          data.atime_from = parseTime(start)
        } else {
          that.$message.error('请选择订单开始时间')
          return false
        }
        if (that.formInline.endtime) {
          var end = that.formInline.endtime.getTime() /1000
          data.atime_to = parseTime(end)
        } else {
          that.$message.error('请选择订单结束时间')
          return false
        }
        if (start > end) {
          that.$message.error('开始时间不能大于结束时间')
          return false
        } else if(end*1 - start*1 > 24*60*60*15){
          that.$message.error('导出只能导出15天之内的数据')
          return false
        }
      }
      
      request({
        url: that.public.url + '/gameorder/exportorderlist',
        method: 'post',
        data: data
      }).then(res => {
        let url = that.public.url + res.data
        window.location.href = url
      }).catch(error => {
      })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setorder = {
          'value': that.formInline.value,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'termno': that.formInline.termno,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'user': that.formInline.user,
        }
      this.$store.commit('setorder', setorder)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setorder = {
          'value': that.formInline.value,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'termno': that.formInline.termno,
          'type': that.formInline.type,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
          'user': that.formInline.user,
        }
      this.$store.commit('setorder', setorder)
    }
  }
}


function getlist (that) {
  var type = ''
  var id = ''
  that.gamelist.map(val=>{
    if (val.name === that.formInline.id) {
      id = val.id
      type = val.type
    }
  })
  let data = {
    user_name: that.formInline.value.trim(),
    pageno: that.currentPage,
    pagerows: that.pagesize,
    termno: that.formInline.termno.trim(),
    status: that.formInline.type,
    agent_org_id: that.formInline.user,
    game_id: id,
    game_type: type
  }
  if (that.$route.query) {
    if (that.formInline.starttime) {
      var start = that.formInline.starttime /1000
      data.atime_from = parseTime(start)
    }
    if (that.formInline.endtime) {
      var end = that.formInline.endtime /1000
      data.atime_to = parseTime(end)
    }
  } else {
    if (that.formInline.starttime) {
      var start = that.formInline.starttime.getTime() /1000
      data.atime_from = parseTime(start)
    }
    if (that.formInline.endtime) {
      var end = that.formInline.endtime.getTime() /1000
      data.atime_to = parseTime(end)
    }
  }
  
  request({
    url: that.public.url + '/gameorder/getList',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data
    // that.total = res.data.rownum * 1
    // that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
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

function getuserlist (that) {
  request({
    url: that.public.url + '/backend/org/getOrglist',
    method: 'post'
  }).then(res => {
    let all = {id: "", name: "全部"}
    that.userlist = res.data
    that.userlist.unshift(all)
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
</style>
