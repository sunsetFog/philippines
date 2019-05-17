<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">

          </el-col>
          <el-col :span="8">
            <el-form-item label="搜索">
              <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formInline.value" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="formInline.starttime"
                :editable="false"
                type="date"
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
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameusergetlist">查询</el-button>
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
        prop="uuid"
        label="uuid">
      </el-table-column>
      <el-table-column
        prop="banlance"
        label="账户余额">
      </el-table-column>
      <el-table-column
        prop="deposit"
        label="保险箱余额">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="绑定手机">
      </el-table-column>
      <el-table-column
        prop="agent_account_name"
        label="推广来源">
      </el-table-column>
      <el-table-column
        prop="agent_org_name"
        label="渠道组">
      </el-table-column>
      <el-table-column
        prop="reg_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="用户类型">
        <template slot-scope="scope">
          {{scope.row.type | type}}
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login_time"
        label="登录时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="view(scope.row.id)" v-if="gameusergetinfo">查看详情</el-button>
        </template>
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


    <el-dialog title='支付渠道详情' :visible.sync="dialogFormVisible">
      <el-form>


        <el-form-item label="uuid" :label-width="formLabelWidth">
          {{form.uuid}}
        </el-form-item>
        <el-form-item label="账户余额" :label-width="formLabelWidth">
          {{form.banlance}}
        </el-form-item>
        <el-form-item label="保险箱余额" :label-width="formLabelWidth">
          {{form.deposit}}
        </el-form-item>
        <el-form-item label="绑定手机" :label-width="formLabelWidth">
          {{form.mobile}}
        </el-form-item>
        <el-form-item label="推广来源" :label-width="formLabelWidth">
          {{form.agent_account_name}}
        </el-form-item>
        <el-form-item label="渠道组" :label-width="formLabelWidth">
          {{form.agent_org_name}}
        </el-form-item>


        <el-form-item label="注册时间" :label-width="formLabelWidth">
          {{form.reg_time}}
        </el-form-item>
        <el-form-item label="最后登录时间" :label-width="formLabelWidth">
          {{form.last_login_time}}
        </el-form-item>


      </el-form>

    </el-dialog>

  </div>
</template>

<script>
  import request from '@/utils/request'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        formInline: {
          type: '',
          value: '',
          starttime: '',
          endtime: ''
        },
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        typelist: [
          {name: 'uuid', type: 'uuid'},
          {name: '手机号', type: 'mobile'},
          {name: '推广员', type: 'agent_account_name'},
          {name: '渠道组', type: 'agent_org_name'},
          {name: '设备id', type: 'device_id'},
        ],
        form: {},
        rules: {},
        formLabelWidth: '120px',
        total: 0,
        pagesize: 50,
        id: '',
      }
    },
    created() {
      let that = this
      if (!this.gameuser.length && this.gameuser.length != 0) {
        that.formInline.type = this.gameuser.type
        that.currentPage = this.gameuser.currentPage
        that.pagesize = this.gameuser.pagesize
        that.formInline.value = this.gameuser.value
        that.formInline.starttime = this.gameuser.starttime
        that.formInline.endtime = this.gameuser.endtime
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.value, that.formInline.starttime, that.formInline.endtime)
      }
    },
    computed: {
      ...mapGetters([
        'gameusergetinfo',
        'gameusergetlist',
        'gameuser'
      ])
    },
    watch: {},
    filters: {
      type(val) {
        if (val === '1') {
          return '会员'
        }
        if (val === '2') {
          return '游客'
        }
      }
    },
    methods: {
      view(id) {
        this.id = id
        this.dialogFormVisible = true
        let that = this
        request({
          url: that.public.url + '/gameuser/getinfo',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          that.form = res.data
        }).catch(error => {
        })
      },
      query() {
        let that = this
        this.currentPage = 1
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.value, that.formInline.starttime, that.formInline.endtime)
        let setgameuser = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'value': that.formInline.value,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameuser', setgameuser)
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage = 1
        let that = this
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.value, that.formInline.starttime, that.formInline.endtime)
        let setgameuser = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'value': that.formInline.value,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameuser', setgameuser)
      },
      handleCurrentChange(val) {
        this.currentPage = val * 1
        let that = this
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.value, that.formInline.starttime, that.formInline.endtime)
        let setgameuser = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'value': that.formInline.value,
          'starttime': that.formInline.starttime,
          'endtime': that.formInline.endtime,
        }
      this.$store.commit('setgameuser', setgameuser)
      }
    }
  }


  function getlist(that, type, currentPage, pagesize, value, starttime, endtime) {
    let data = {
      scolumn: type,
      pageno: currentPage,
      pagerows: pagesize,
      svalue: value.trim()
    }
    if (starttime) {
      var start = starttime.getTime() / 1000
      data.time_from = start
    }
    if (endtime) {
      var end = endtime.getTime() / 1000
      data.time_to = end
    }

    request({
      url: that.public.url + '/gameuser/getList',
      method: 'post',
      data: data
    }).then(res => {
      that.tableData = res.data.list
      that.total = res.data.rownum * 1
      that.currentPage = res.data.pageno * 1
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
    min-height: 130px !important;
  }

  .mail .el-dialog__header {
    background: #dedbdb !important;
  }

  .namegreen {
    color: #37b389;
  }

  .dialogcolor .el-dialog__header {
    background: #dedbdb !important;
  }
</style>
