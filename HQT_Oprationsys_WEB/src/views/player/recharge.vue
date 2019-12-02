<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="9">
              <el-form-item>
              <el-radio-group v-model="formInline.type">
                  <el-radio :label='1' @click.native.prevent="clickitem(1)">银行账户</el-radio>
                  <el-radio :label='2' @click.native.prevent="clickitem(2)">银行开户名：</el-radio>
              </el-radio-group>
              <el-input v-model="formInline.text" clearable style="width: 210px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.id" clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩家账号">
                <el-input v-model="formInline.region" placeholder="玩家账号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameuserbankgethistorylist">查询</el-button>
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
    border
    :data="tableData">
    <el-table-column
      prop="user_org_name"
      label="玩家渠道"
      >
    </el-table-column>
    <el-table-column
      prop="user_account"
      label="玩家账号"
      >
    </el-table-column>
    <el-table-column
      prop="agent_account"
      label="所属总代"
      >
    </el-table-column>
    <el-table-column
      prop="bankname"
      label="银行"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="城市"
      >
    </el-table-column>
    <el-table-column
      prop="freeze"
      label="是否冻结"
      >
    </el-table-column>
    <el-table-column
      label="最后修改时间">
       <template slot-scope="scope">
        {{scope.row.update_time | time}}
      </template>
    </el-table-column>
     <el-table-column
      prop="bindtime"
      label="添加时间"
      >
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
        type: '',
        text: '',
        id: '',
        region: ''
      },
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      keys: [],
      id: '',
      statuslist: []
    }
  },
  created() {
    getaccount(this)
    let that = this
    if (!this.recharge.length && this.recharge.length != 0) {
      that.formInline.type = this.recharge.type
      that.formInline.text = this.recharge.text
      that.currentPage = this.recharge.currentPage
      that.pagesize = this.recharge.pagesize
      that.formInline.region = this.recharge.region
      that.formInline.id = this.recharge.id
      banklist(that, that.formInline.type, that.formInline.text, that.currentPage, that.pagesize, that.formInline.id, that.formInline.region)
    }
    if (Object.keys(this.$route.query).length > 0) {
      if (this.$route.query.user) {
        that.formInline.region = this.$route.query.user
      }
      if (this.$route.query.org) {
          that.formInline.id = this.$route.query.org
      }
      banklist(that, that.formInline.type, that.formInline.text, that.currentPage, that.pagesize, that.formInline.id, that.formInline.region)
    }
  },
  computed: {
    ...mapGetters([
      'gameuserbankgethistorylist',
      'recharge'
    ])
  },
  watch: {
  },
  filters: {
    'time': function (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  },
  methods: {
    clickitem (e) {
      e === this.formInline.type ? this.formInline.type = '': this.formInline.type  = e
    },
    query () {
      let that = this
      this.currentPage = 1
      banklist(that, that.formInline.type, that.formInline.text, that.currentPage, that.pagesize, that.formInline.id, that.formInline.region)
      let setrecharge = {
        'type': that.formInline.type,
        'text': that.formInline.text,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region
      }
      this.$store.commit('setrecharge', setrecharge)
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      banklist(that, that.formInline.type, that.formInline.text, that.currentPage, that.pagesize, that.formInline.id, that.formInline.region)
      let setrecharge = {
        'type': that.formInline.type,
        'text': that.formInline.text,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region
      }
      this.$store.commit('setrecharge', setrecharge)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
     banklist(that, that.formInline.type, that.formInline.text, that.currentPage, that.pagesize, that.formInline.id, that.formInline.region)
      let setrecharge = {
        'type': that.formInline.type,
        'text': that.formInline.text,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'id': that.formInline.id,
        'region': that.formInline.region
      }
      this.$store.commit('setrecharge', setrecharge)
    }
  }
}


function banklist (that, type, text, currentPage, pagesize, id, region) {
  request({
    url: that.public.url + '/backend/gameuserbank/gethistorylist',
    method: 'post',
    data: {
      bank_cond_type: type,
      bank_cond_text: text.trim(),
      pageno: currentPage,
      pagerows: pagesize,
      agent_org_id: id,
      user_account: region.trim()
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
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
    that.statuslist = res.data
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
</style>
