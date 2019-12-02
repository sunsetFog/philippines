<template>
  <div class="app-container">
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
    ref="multipleTable"
    border
    :data="tableData"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="login_name"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="prev_name"
      label="上级"
      >
    </el-table-column>
    <el-table-column
      prop="top_agent_account"
      label="总代"
      >
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="玩家渠道"
      >
    </el-table-column>
    <el-table-column
      label="冻结状态">
      <template slot-scope="scope">
        {{scope.row.status | status}}
      </template>
    </el-table-column>
    <el-table-column
      prop="deposit"
      label="保险箱"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="未出提款"
      >
    </el-table-column>
    <el-table-column
      prop="balance"
      label="可用余额"
      >
    </el-table-column>
     <!-- <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="delet(scope.row)">清零</el-button>
      </template>
    </el-table-column> -->
  </el-table>

  <el-row class="buttoncenter">
      <el-button type="primary" @click="delet" v-if="gameusernegativeclearzero">选中清零</el-button>
  </el-row>

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
        user: '',
        region: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      keys: [],
      id: '',
      statuslist: [
          {
              id: '',
              name: ''
          }
      ]
    }
  },
  created() {
    let that = this
    if (!this.negative.length && this.negative.length != 0) {
      that.currentPage = this.negative.currentPage
      that.pagesize = this.negative.pagesize
    }
    getlist(this)
  },
  computed: {
    ...mapGetters([
      'gameusernegativeclearzero',
      'negative'
    ])
  },
  watch: {
  },
  filters: {
    status (val) {
      if (val === '1') {
        return '正常'
      }
      if (val === '2') {
        return '冻结'
      }
    } 
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delet (row) {
       if (this.multipleSelection.length > 0) {
      let that = this
       let id = this.multipleSelection.map(val => {
          return val.id
        })
        let ids = id.join(',')
        this.$confirm('确认操作?', '二次确认：', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            request({
              url: that.public.url + '/backend/gameuser/negativeclearzero',
              method: 'post',
              data: {
                  user_ids: ids
              }
            }).then(res => {
              getlist(that)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拒绝'
          });
        });
      }
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(that)
      let setnegative = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize
      }
      this.$store.commit('setnegative', setnegative)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(that)
      let setnegative = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize
      }
      this.$store.commit('setnegative', setnegative)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/backend/gameuser/getnegativelist',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize
    }
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
  .buttoncenter {
    text-align: center;
    margin-top: 20px;
  }
</style>
