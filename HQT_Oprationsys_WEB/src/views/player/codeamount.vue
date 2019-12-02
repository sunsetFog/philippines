<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="5">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.org" clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="玩家账号">
              <el-input v-model="formInline.user" placeholder="玩家账号" clearable></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item label="UID">
              <el-input placeholder="UID" v-model="formInline.user_uid" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameusercodegetlist">查询</el-button>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="agent_org_name"  label="玩家渠道"></el-table-column>
      <el-table-column label="玩家账号" prop="user_account"></el-table-column>
      <el-table-column prop="uid" label="UID"></el-table-column>
      <el-table-column prop="create_time" label="提款时间"></el-table-column>
      <el-table-column prop="money" label="提款金额"></el-table-column>
      <el-table-column prop="lwtn_balance" label="账户余额"></el-table-column>
      <el-table-column prop="lwtn_deposit" label="保险箱金额"></el-table-column>
      <el-table-column label="充值次数" prop="lwtn_charge_count"></el-table-column>
      <el-table-column label="充值金额"  prop="lwtn_change_amt"></el-table-column>
      <el-table-column prop="lwtn_code_amt" label="打码量"></el-table-column>
       <el-table-column prop="lwtn_cad_ratio" label="充投比"></el-table-column>
    </el-table>
    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[15,50,200]"
          :page-size="pagesize"
          background
          layout="sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import request from "@/utils/request";
import { isvalidUsername } from "@/utils/validate";
export default {
  data() {
    var rules = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入契约规则'));
      }else {
        if (value *1 < 0) {
          callback(new Error('契约规则不能为负数'));
        } else {
          var integer = /^[1-9]\d*$|^[1-9]\d*\.\d\d?$|^0\.\d\d?$/ //金额保留两位小数
          if(integer.test(value)  || value == '0') {
            callback();
          } else {
            callback(new Error('保留两位小数'));
          }
        }
      }
   }; 
    return {
      formInline: {
        org: "",
        user: "",
        user_uid:'',
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        desc: ""
      },
      rules: {
        desc: [
          {required: true, validator: rules, trigger: 'blur'}
        ]
      },
      formLabelWidth: "150px",
      title: "",
      name: "",
      total: 0,
      pagesize: 15,
      statuslist: [],
      nav: [],
      form2: {},
    };
  },
  created() {
    let that = this;
    getaccount(this)
  },
  computed: {
    ...mapGetters([
      "gameusercodegetlist",
    ])
  },
  filters: {
    time (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    },
  },
  methods: {
    reset(form) {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
    },
    query() {
      let that = this;
      this.currentPage = 1;
      getlist(that);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        uid:that.formInline.user_uid,
        user: that.formInline.user,
      };
      this.$store.commit("settax", settax);
    },
    handleSizeChange(val) {
      let that = this;
      this.pagesize = val;
      this.currentPage = 1;
      getlist(this);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        user: that.formInline.user,
        uid:that.formInline.user_uid,
      };
      this.$store.commit("settax", settax);
    },
    handleCurrentChange(val) {
      let that = this;
      this.currentPage = val * 1;
      getlist(this);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        user: that.formInline.user,
         uid:that.formInline.user_uid,
      };
      this.$store.commit("settax", settax);
    }
  }
};

function getlist(that) {
  request({
    url: that.public.url + "/backend/gameusercode/getlist",
    method: "post",
    data: {
      agent_org_id: that.formInline.org,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      user_account: that.formInline.user.trim(),
      uid:that.formInline.user_uid,
    }
  })
    .then(res => {
      that.tableData = res.data.list;
      that.total = res.data.rownum * 1;
      that.currentPage = res.data.pageno * 1;
    })
    .catch(error => {});
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

<style lang="css" scoped>
.paging {
  float: right;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.inline {
  width: 160px !important;
  display: inline-block !important;
}
.resetname {
  line-height: 60px;
  font-size: 20px;
  margin-left: 28px;
}
.inputnum {
  height: 30px !important;
  width: 100px !important;
  font-size: 10px;
}
.parenti {
  margin-bottom: 10px;
  float: left;
}
.parenti:last-child i{
  visibility: hidden;
}
</style>
