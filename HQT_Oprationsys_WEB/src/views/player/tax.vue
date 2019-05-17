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
            <el-form-item label="所属组">
                <el-select v-model="formInline.playerlevel">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="总代" value="1"></el-option>
                  <el-option label="一级" value="2"></el-option>
                  <el-option label="二级" value="3"></el-option>
                  <el-option label="三级" value="4"></el-option>
                  <el-option label="四级" value="5"></el-option>
                  <el-option label="五级" value="6"></el-option>
                  <el-option label="六级" value="7"></el-option>
                  <el-option label="七级" value="8"></el-option>
                  <el-option label="八级" value="9"></el-option>
                  <el-option label="会员" value="0"></el-option>
                  <el-option label="游客" value="-1"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="税收状态">
              <el-select v-model="formInline.status" clearable>
                <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="agentaccountgettaxlist">查询</el-button>
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
    <div class="parenti" v-for="(item,key) in nav" :key="key">
      <el-button plain @click="getpid(item,key)">{{item.p_user_account}}</el-button>
      <i class="el-icon-d-arrow-right"></i>
    </div>

    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="org_name" width="200" label="玩家渠道"></el-table-column>
      <el-table-column
      label="玩家账号"
      width='200'
      >
      <template slot-scope="scope">
        <el-button type="text"  @click="confirmEdit(scope.row)">{{scope.row.user_account}}</el-button>
      </template>
    </el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
      <el-table-column prop="reward_top" width="150" label="总代税收比例"></el-table-column>
      <el-table-column prop="reward_team" label="团队占比"></el-table-column>
      <el-table-column prop="reward_fact" width="150" label="实际收益比例"></el-table-column>
      <el-table-column
      label="税收创建时间">
      <template slot-scope="scope">
        <span>{{scope.row.reward_create_time | time}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="税收上次时间">
      <template slot-scope="scope">
        <span>{{scope.row.reward_update_time | time}}</span>
      </template>
    </el-table-column>
      <el-table-column prop="status" label="税收状态"></el-table-column>
      <el-table-column fixed="right" label="总代税收操作操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.level === '总代' && agentaccountupdatetax">编辑</el-button>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="reset">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
          {{form2.org_name}}
        </el-form-item>
        <el-form-item label="签订方:" :label-width="formLabelWidth">
          <span>（渠道）- （总代）</span>
        </el-form-item>
        <el-form-item label="上次更新时间:"  :label-width="formLabelWidth" >
          {{form2.reward_update_time | time}}
        </el-form-item>
        <el-form-item label="契约规则:" :label-width="formLabelWidth" prop="desc">
          <span>玩家流水的</span><el-input v-model="form.desc" style="width:30%" type='number'></el-input><span>%（保留小数点后两位）</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset(form)">取 消</el-button>
        <el-button type="primary" @click="sure(form)">确 定</el-button>
      </div>
    </el-dialog>
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
        if (value * 1 > 5 || value *1 < 0) {
          callback(new Error('请填写0%-5%之间的数值'));
        } else {
          var integer = /^(([1-9]*)|(([0]\.\d{1,2}|[1-9]*\.\d{1,2})))$/ //金额保留两位小数
          if(integer.test(value)) {
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
        playerlevel: "",
        status: ""
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
      pagesize: 50,
      statuslist: [],
      list: [
        {id: '',name: '全部'},
        {id: '1',name: '启用中'},
        {id: '0',name: '无'}
      ],
      nav: [],
      form2: {},
      pid: ''
    };
  },
  created() {
    let that = this;
    getaccount(this)
    if (!this.tax.length && this.tax.length != 0) {
      that.formInline.org = this.tax.org;
      that.currentPage = this.tax.currentPage;
      that.pagesize = this.tax.pagesize;
      that.pid = this.tax.pid;
      that.formInline.user = this.tax.user;
      that.formInline.playerlevel = this.tax.playerlevel;
      that.formInline.status = this.tax.status;
      getlist(that);
    }
  },
  computed: {
    ...mapGetters([
      "agentaccountgettaxlist",
      "agentaccountupdatetax",
      "tax"
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
    getpid (item,key) {
      let that = this
      this.pid = item.puser_id
      getlist(this)
    },
    query() {
      let that = this;
      this.currentPage = 1;
      this.pid = ''
      getlist(that);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        pid: that.pid,
        user: that.formInline.user,
        playerlevel: that.formInline.playerlevel,
        status: that.formInline.status
      };
      this.$store.commit("settax", settax);
    },
    confirmEdit (row) {
      this.pid = row.puser_id
      getlist(this)
    },
    edit(data) {
      this.title = "税收 编辑";
      this.dialogFormVisible = true;
      this.id = data.user_id
      let that = this;
      request({
        url: that.public.url + "/backend/agentaccount/gettaxinfo",
        method: "post",
        data: {
          user_id: data.user_id
        }
      })
        .then(res => {
          that.form2 = res.data
        })
        .catch(error => {});
    },
    sure(form) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
            that.$confirm('', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            request({
              url:that.public.url + '/agentaccount/updatetax',
              method:'post',
              data:{
                user_id:this.id,
                tax: this.form.desc
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that)
            }).catch(error => {
          })
        }).catch(error => {
        })
        } else {
          return false;
        }
      });
    },
    handleSizeChange(val) {
      let that = this;
      this.pagesize = val;
      this.currentPage = 1;
      this.pid = ''
      getlist(this);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        pid: that.pid,
        user: that.formInline.user,
        playerlevel: that.formInline.playerlevel,
        status: that.formInline.status
      };
      this.$store.commit("settax", settax);
    },
    handleCurrentChange(val) {
      let that = this;
      this.currentPage = val * 1;
      this.pid = ''
      getlist(this);
      let settax = {
        org: that.formInline.org,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        pid: that.pid,
        user: that.formInline.user,
        playerlevel: that.formInline.playerlevel,
        status: that.formInline.status
      };
      this.$store.commit("settax", settax);
    }
  }
};

function getlist(that) {
  request({
    url: that.public.url + "/backend/agentaccount/gettaxlist",
    method: "post",
    data: {
      org_id: that.formInline.org,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      user_account: that.formInline.user.trim(),
      level: that.formInline.playerlevel,
      status: that.formInline.status,
      puser_id: that.pid
    }
  })
    .then(res => {
      that.tableData = res.data.list;
      that.total = res.data.rownum * 1;
      that.currentPage = res.data.pageno * 1;
      if (res.data.nav && res.data.nav.p_agents && res.data.nav.p_agents.length > 0) {
        that.nav = res.data.nav.p_agents
      } else {
        hat.nav = []
      }
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
    let all = {id: "", name: "全部"}
    that.statuslist = res.data
    that.statuslist.unshift(all)
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
