<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
              <el-form-item label="操作人员">
                <el-input v-model="formInline.user" placeholder="关键词" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="动作">
                <el-checkbox :indeterminate='indeterminate' v-model="checkall" @change="checkallchange" style="float:left;margin-right:15px;">全选</el-checkbox>
                 <el-checkbox-group v-model="formInline.checklist" @change="checkedchange" style="float:right">
                  <el-checkbox v-for="(item, key) in list" :label="item.id" :key="key">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="操作日期">
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
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamelotsrcloggetlist">查询</el-button>
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
      width='60'
      type='index'
      label="序号">
    </el-table-column>
    <el-table-column
    width='150'
      prop="operator_name"
      label="操作人">
    </el-table-column>    
    <el-table-column
    width='180'
      label="操作时间">
       <template slot-scope="scope">
        {{scope.row.create_time}}
      </template>
    </el-table-column>
    <el-table-column
     width='250'
      prop="type"
      label="动作">
    </el-table-column>
    <el-table-column
      prop="depict"
      label="修改内容">
    </el-table-column>
  </el-table>

<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      :page-sizes="[10,20,30,40,50]"
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
        user: '',
        checklist: [],
        time: ''
      },
      list:[
        {id:'1',name: '彩票撤单'},
        {id:'2',name: '奖源管理'},
      ],
      indeterminate:true,
      checkall: false,
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 50
    }
  },
  created() {
    let that = this
    if (!this.cancellations.length && this.cancellations.length != 0) {
      that.formInline.user = this.cancellations.user
      that.currentPage = this.cancellations.currentPage
      that.pagesize = this.cancellations.pagesize
      that.formInline.checklist = this.cancellations.checklist
      that.formInline.time = this.cancellations.time
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'gamelotsrcloggetlist',
      'cancellations'
    ])
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      getlist(this)
      let setcancellations = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'checklist': that.formInline.checklist,
        'time': that.formInline.time
      }
      this.$store.commit('setcancellations', setcancellations)
    },
    checkedchange (value) {
      let checkedcount = value.length;
      this.checkall = checkedcount === this.list.length
      this.indeterminate = checkedcount > 0 && checkedcount < this.list.length
    },
    checkallchange (val) {
      let id = this.list.map(val => {
        return val.id
      })
      this.formInline.checklist = val ? id : [];
      this.indeterminate = false
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setcancellations = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'checklist': that.formInline.checklist,
        'time': that.formInline.time
      }
      this.$store.commit('setcancellations', setcancellations)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setcancellations = {
        'user': that.formInline.user,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'checklist': that.formInline.checklist,
        'time': that.formInline.time
      }
      this.$store.commit('setcancellations', setcancellations)
    }
  },
  filters: {
    parseTime(time) {
      var date = new Date(time *1000);
      let y = date.getFullYear() + '-'
      let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
      let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
      let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
      let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
      return y+m+d+h+i+s
    }
  }
}

function getlist (that) {
    var start = ''
    var end = '' 
  if (that.formInline.time && that.formInline.time.length > 0) {
    start = parseTime(that.formInline.time[0].getTime() /1000)
    end = parseTime(that.formInline.time[1].getTime() /1000)
  }
  let type = that.formInline.checklist.join(',')
  request({
    url: that.public.url + '/backend/gamelotsrclog/getlist',
    method: 'post',
    data: {
      type: type,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      operator_id: that.formInline.user,
      opetime_from: start,
      opetime_to: end
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
