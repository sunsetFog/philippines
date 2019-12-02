<template>
  <div class="app-container mail" id="downloadAnalysis">
    <div class="query">
      <el-row>
        <el-form :inline="true">
          <el-col :span="6">
            <el-form-item label="设备ID" label-width="70px">
            <el-input v-model.trim="formInline.device_id" maxlength="40" placeholder="请输入设备ID" clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="渠道"  label-width="70px">
                <el-select v-model="formInline.agent_org_id" filterable clearable>
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
            <el-form-item label="手机品牌"  label-width="70px">
              <el-input v-model.trim="formInline.device_brand" maxlength="20" placeholder="请输入手机品牌" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="游戏行为"  label-width="70px">
                <el-select v-model="formInline.act_code" filterable clearable>
                <el-option
                  v-for="item in behavior_list"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="70px">


          <el-col :span="8">
            <el-form-item label="操作时间" label-width="70px">
              <el-date-picker
                v-model="formInline.operation_time"
                type="daterange"
                @change="pickerChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="消耗时长"  label-width="70px">
                <el-select v-model="formInline.consume_sign" filterable clearable style="width:40%">
                <el-option
                  v-for="item in consume_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input v-model="formInline.act_time_len" maxlength="10" placeholder="请输入时长" clearable style="width:40%"></el-input>秒
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="analysisdownloadquery" :loading="loading">查询</el-button>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" @click="excel()" v-if="analysisdownloadexcel">导出excel</el-button>
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
    @expand-change='changeTable'
    :row-key="getrowkey"
    :expand-row-keys="expands"
    :cell-class-name='cellTable'
    border
    style="width: 100%">
    <el-table-column
      prop="act_end_time"
      label="操作时间">
    </el-table-column>
    <el-table-column
      prop="device_id"
      label="设备ID">
    </el-table-column>
    <el-table-column
      prop="device_brand"
      label="手机品牌">
    </el-table-column>
    <el-table-column
      prop="device_model"
      label="设备型号">
    </el-table-column>
    <el-table-column
      prop="device_os"
      label="手机操作系统">
    </el-table-column>
    <el-table-column
      prop="device_memory"
      label="手机内存">
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="渠道">
    </el-table-column>
    <el-table-column
      prop="ip"
      label="IP地址">
    </el-table-column>
    <el-table-column
      prop="ip_city"
      label="网络接入地">
    </el-table-column>
    <el-table-column
      prop="act_name"
      label="游戏行为">
    </el-table-column>
    <el-table-column
      prop="act_time_len"
      label="消耗时长(秒)">
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
  name: 'downloadAnalysis',
  data() {
    return {
      formInline: {
        device_id: '',
        agent_org_id: '',
        device_brand: '',
        act_code: '',
        operation_time: [],
        act_time_len: '',
        consume_sign: ''
      },
      orglist: [],
      currentPage: 1,
      total: 0,
      pagesize: 20,
      tableData: [],
      loading: false,
      behavior_list: [],
      consume_list: [
        {id: '<',name: '小于'},
        {id: '>',name: '大于'}
      ],

      expands: [],
      getrowkey (row) {
          return (row.id)
      }
    }
  },
  created() {
    gamebehavior(this);
    getorglist(this);
    if (!this.downloadgetter.length && this.downloadgetter.length != 0) {
      this.formInline.device_id = this.downloadgetter.device_id;
      this.formInline.agent_org_id = this.downloadgetter.agent_org_id;
      this.formInline.device_brand = this.downloadgetter.device_brand;
      this.formInline.act_code = this.downloadgetter.act_code;
      this.formInline.operation_time = this.downloadgetter.operation_time;
      this.formInline.act_time_len = this.downloadgetter.act_time_len;
      this.formInline.consume_sign = this.downloadgetter.sign;
      this.currentPage = this.downloadgetter.currentPage;
      this.pagesize = this.downloadgetter.pagesize;
      getlist(this);
    }
  },
  computed: {
    ...mapGetters([
      'analysisdownloadquery',
      'analysisdownloadexcel',
      'downloadgetter'
    ])
  },
  methods: {
    query () {
      this.currentPage = 1
      getlist(this)
      this.commitDownload();
    },
    pickerChange(value){
      // console.log('val+++jj',value,this.formInline.operation_time);
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      this.commitDownload();
    },
    handleCurrentChange(val) {
      this.currentPage = Number(val);
      getlist(this)
      this.commitDownload();
    },
    commitDownload(){
      let setdownload = {
          device_id: this.formInline.device_id,
          agent_org_id: this.formInline.agent_org_id,
          device_brand: this.formInline.device_brand,
          act_code: this.formInline.act_code,
          operation_time: this.formInline.operation_time,
          act_time_len: this.formInline.act_time_len,
          sign: this.formInline.consume_sign,
          export: '',
          currentPage: this.currentPage,
          pagesize: this.pagesize
        }
      this.$store.commit('setdownload', setdownload)
    },
    cellTable ({row, column, rowIndex, columnIndex}) {
      // if (columnIndex === 0 && row.src_type == '游戏结算') {
      //   return 'displaynone'
      // }
    },
    changeTable (row, data) {
        this.expands = [];
    },
    excel () {
      let that = this;
      let data = {
        device_id: that.formInline.device_id,
        agent_org_id: that.formInline.agent_org_id,
        device_brand: that.formInline.device_brand,
        act_code: that.formInline.act_code,
        act_begin_time: '',
        act_end_time: '',
        act_time_len: that.formInline.act_time_len,
        sign: that.formInline.consume_sign,
        export: 1,
        pageno: that.currentPage,
        limit: that.pagesize
        // pagerows: that.pagesize
      }
      if (that.formInline.operation_time[0]) {
        var start = that.formInline.operation_time[0].getTime() /1000;
        data.act_begin_time = parseTime(start);
      }
      if (that.formInline.operation_time[1]) {
        var end = that.formInline.operation_time[1].getTime() /1000;
        data.act_end_time = parseTime(end);
      }
      
      request({
        url: that.public.url + '/backend/gamefunwork/getlist',
        method: 'post',
        data: data
      }).then(res => {
        if(typeof res.data == 'string'){
          if(res.data!=''){
            window.location.href = that.public.url + res.data;
          }else{
            this.$message.info('没数据可以导出！');
          }
        }else{
          this.$message.info('没数据可以导出！');
        }
      }).catch(error => {
      })
    }
  }
}



function getlist (that) {
  that.loading = true
  let data = {
    device_id: that.formInline.device_id,
    agent_org_id: that.formInline.agent_org_id,
    device_brand: that.formInline.device_brand,
    act_code: that.formInline.act_code,
    act_begin_time: '',
    act_end_time: '',
    act_time_len: that.formInline.act_time_len,
    sign: that.formInline.consume_sign,
    export: '',
    pageno: that.currentPage,
    limit: that.pagesize
  }
  if (that.formInline.operation_time[0]) {
    var start = that.formInline.operation_time[0].getTime() /1000;
    data.act_begin_time = parseTime(start);
  }
  if (that.formInline.operation_time[1]) {
    var end = that.formInline.operation_time[1].getTime() /1000;
    data.act_end_time = parseTime(end);
  }
  
  request({
    url: that.public.url + '/backend/gamefunwork/getlist',
    method: 'post',
    data: data
  }).then(res => {
    that.loading = false;
    that.tableData = res.data.list;
    that.total = Number(res.data.rownum);
    that.currentPage = Number(res.data.pageno);
  }).catch(error => {
  })
}



//渠道
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

//游戏行为
function gamebehavior (that) {
  request({
    url: that.public.url + '/backend/gamefunwork/getfuncode',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.behavior_list = res.data;
  }).catch(error => {
  })
}

//日期
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
