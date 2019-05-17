<template>
  <div class="app-container">
         
        <div class="query">
      <el-row>
        <el-form :inline="true" label-width="70px">
           
           <el-col :span="5">
            <el-form-item label="彩票名称">
                <el-select v-model="formInline.id">
                <el-option
                  v-for="item in idlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="期号">
                <el-input v-model="formInline.number" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
                <el-form-item label="彩票时间">
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


           <el-col :span="5">
            <el-form-item label="返回情况">
                <el-select v-model="formInline.status">
                <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click='query()' v-if="lotteryawardgetawardlist">查询</el-button>
          </el-col>
          
        </el-form>
      </el-row>
        </div>
          <el-table
        :data="tableData"
        :row-class-name="tableclassname"
        border
        style="width: 100%;margin-top:20px;">
        <el-table-column
          label="彩票期号"
          prop="termno">
        </el-table-column>
        <el-table-column
          label="彩票时间"
          prop="to_time">
        </el-table-column>
        <el-table-column
          label="中奖号码"
          prop="openno">
        </el-table-column>
        <el-table-column
              label="返回情况">
              <template slot-scope="scope">
                {{scope.row.status}}
              </template>
            </el-table-column>
        <el-table-column
          label="花销时间（毫秒）"
          prop="fetch_cost_time">
        </el-table-column>
        <el-table-column
          label="请求次数"
          prop="fetch_num">
        </el-table-column>
        <el-table-column
          label="抓号获取时间"
          prop="last_success_time">
        </el-table-column>
      </el-table>

      
<div class="pagingbox">
    <div class="paging" style="margin-top: 20px;">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pagesize"
        :page-sizes="[50,100,200]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>

    
  




      
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth';
  export default {
    name: "accountchange",
    data() {
      return {
        total: 0,
        pagesize: 50,
        currentPage: 1,
        tableData: [],
        formInline: {
            status: '2',
            number: '',
            time: [],
            id: '11'
        },
        status: [
          {
            id: '-1',
            name: '全部'
          },
          {
            id: '2',
            name: '返回异常'
          },
          {
            id: '1',
            name: '返回成功'
          }
        ],
        idlist: [
          {
            id: '11',
            name: '加拿大30秒'
          },
          {
            id: '12',
            name: '意大利PK10'
          },
          {
            id: '13',
            name: '河内一分'
          },
          {
            id: '14',
            name: '河内五分'
          },
          {
            id: '15',
            name: '瑞典一分'
          },
          {
            id: '16',
            name: '瑞典两分'
          },
          {
            id: '17',
            name: '多彩腾讯30秒'
          },
          {
            id: '18',
            name: '多彩重庆30秒'
          },
          {
            id: '19',
            name: '腾讯分分彩'
          },
        ]
      }
    },
    created () {
      let that = this
      if (!this.catchno.length && this.catchno.length != 0) {
        that.formInline.id = this.catchno.id
        that.formInline.status = this.catchno.status
        that.formInline.number = this.catchno.number
        that.formInline.time = this.catchno.time
        that.currentPage = this.catchno.currentPage
        that.pagesize = this.catchno.pagesize
        getlist(that)
      }
    },
    computed: {
      ...mapGetters([
        'lotteryawardgetawardlist',
        'catchno'
      ])
    },
    filters: {
    },
    methods: {
      tableclassname ({row, rowIndex}) {
        if (row.status === '未结果(处理中)') {
          return 'red'
        }
      },
      handleCurrentChange(val) {
        let that = this
        this.currentPage = val *1
        getlist(this)
        let setcatchno = {
        'id': that.formInline.id,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'status': that.formInline.status,
        'time': that.formInline.time,
      }
      this.$store.commit('setcatchno', setcatchno)
      },
      handleSizeChange(val) {
        let that = this
        this.pagesize = val
        this.currentPage = 1
        getlist(this)
        let setcatchno = {
        'id': that.formInline.id,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'status': that.formInline.status,
        'time': that.formInline.time,
      }
      this.$store.commit('setcatchno', setcatchno)
      },
      query () {
        let that = this
        getlist(this)
        let setcatchno = {
        'id': that.formInline.id,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'status': that.formInline.status,
        'time': that.formInline.time,
      }
      this.$store.commit('setcatchno', setcatchno)
      },
    }
  }

  function getlist (that) {
    var start = ''
    var end = '' 
    if (that.formInline.time && that.formInline.time.length > 0) {
      start = parseTime(that.formInline.time[0].getTime() /1000)
      end = parseTime(that.formInline.time[1].getTime() /1000)
    }
    request({
      url: that.public.url + '/backend/lotteryaward/getawardlist',
      method: 'post',
      data: {
        las_id: that.formInline.id,
        termno: that.formInline.number,
        from_time: start,
        to_time: end,
        pageno: that.currentPage,
        pagerows: that.pagesize,
        type: that.formInline.status
      }
    }).then(res => {
      that.tableData = res.data.list
      that.total = res.data.rownum *1
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
</style>
