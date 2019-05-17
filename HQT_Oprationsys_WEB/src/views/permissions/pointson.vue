<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="6">
            <el-button type="info" round @click="add" v-if="sysauditadd">新增 +</el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作员账号">
              <!-- <el-input v-model="formInline.user" placeholder="操作员账号" clearable></el-input> -->
              <el-select v-model="formInline.user" clearable>
                <el-option
                  v-for="item in statuslist1"
                  :key="item.id"
                  :label="item.login_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="sysauditgetlist">查询</el-button>
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

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="account_login_name" label="操作员账号"></el-table-column>
      <el-table-column label="限制列表" prop='up'>
      </el-table-column>

      <el-table-column prop="adam_agent_ulimit" label="限制金额"></el-table-column>

      <el-table-column label="限制列表" prop='down'>
      </el-table-column>

      <el-table-column prop="adam_user_ulimit" label="限制金额"></el-table-column>
      <el-table-column prop="adam_create_time" label="创建时间"></el-table-column>
      <el-table-column prop="adam_creater_account" label="创建人"></el-table-column>
      <el-table-column label="上次修改时间">
        <template slot-scope="scope">{{scope.row.adam_update_time | time}}</template>
      </el-table-column>
      <el-table-column label="上次修改人">
        <template slot-scope="scope">{{scope.row.adam_updater_account | account}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="sysauditupdate">修改</el-button>
          <el-button type="text" size="small" @click="delet(scope.row)" v-if="sysauditdel">删除</el-button>
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
        <el-form-item label="操作员账号" :label-width="formLabelWidth" prop="name">
          <!-- <el-input v-model="form.name"></el-input> -->
          <el-select v-model="form.name" clearable>
            <el-option
              v-for="item in statuslist"
              :key="item.id"
              :label="item.login_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="desc">
          <el-table
            ref="rowtable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="允许列表权限" width="150"></el-table-column>
            <el-table-column label="审核金额">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.address"
                  placeholder="整数"
                  type="number"
                  clearable
                  style="width:50%!important"
                ></el-input>
                <span>元</span>
              </template>
            </el-table-column>
          </el-table>
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
import request from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  data() {
    var rules = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请勾选列表权限"));
      } else {
        if (value) {
          var flag1 = true
          var flag2 = true
          var flag3 = true
          value.map(val => {
            if (val.address === "") {
              callback(new Error("请填写正确金额"));
            } else {
              if (val.address ) {
                if (val.address * 1 < 0) {
                  flag1 = false
                } else {
                  flag1 = true
                }
                if (val.address === 'e') {
                  flag3 = false
                } else {
                  flag3 = true
                }
                if (val.address.indexOf(".") > 0) {
                    flag2 = false
                  } else {
                    flag2 = true
                  }
              }
              
            }
          });
          if (flag1 && flag2 && flag3) {
            callback();
          } else {
            if (!flag3) {
              callback(new Error("请输入数字"));
            } else {
              callback(new Error("金额必须为大于0的整数"));
            }
          }
        }
      }
    };
    return {
      formInline: {
        user: ""
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请选择操作员账号", trigger: "change" }
        ],
        desc: [{ required: true, validator: rules, trigger: "blur" }]
      },
      formLabelWidth: "120px",
      title: "",
      total: 0,
      pagesize: 50,
      keys: [],
      id: "",
      statuslist: [],
      statuslist1: [],
      tableData1: [
        {
          name: "审核（代理上分）",
          address: ""
        },
        {
          name: "审核（玩家上分）",
          address: ""
        }
      ],
      multipleSelection: [],
      agentchecked: "",
      userchecked: "",
      agentnum: "",
      usernum: ""
    };
  },
  created() {
    let that = this;
    getaccount(this);
    getaccount1(this)
    if (!this.pointson.length && this.pointson.length != 0) {
      that.formInline.user = this.pointson.user;
      that.currentPage = this.pointson.currentPage;
      that.pagesize = this.pointson.pagesize;
      getsysaudit(that, that.formInline.user, that.currentPage, that.pagesize);
    }
  },
  computed: {
    ...mapGetters([
      "sysauditadd",
      "sysauditdel",
      "sysauditupdate",
      "sysauditgetlist",
      "pointson"
    ])
  },
  watch: {
    multipleSelection: function(val) {
      this.form.desc = val;
    }
  },
  filters: {
    time: function(val) {
      if (val === "-1") {
        return "";
      } else {
        return val;
      }
    },
    account: function(val) {
      if (val === "0") {
        return "";
      } else {
        return val;
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    reset(form) {
      this.dialogFormVisible = false;
      this.tableData1 = [
        {
          name: "审核（代理上分）",
          address: ""
        },
        {
          name: "审核（玩家上分）",
          address: ""
        }
      ]
      this.$refs.form.resetFields();
    },
    edit(row) {
      this.title = "编辑上分权限";
      this.dialogFormVisible = true;
      let that = this;
      request({
        url: that.public.url + "/backend/sysaudit/getinfo",
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          that.form.name = res.data.account_id
          that.tableData1 = [
            {
              name: "审核（代理上分）",
              address: res.data.adam_agent_ulimit
            },
            {
              name: "审核（玩家上分）",
              address: res.data.adam_user_ulimit
            }
          ]
          that.$nextTick(function(){

          
          that.$refs.rowtable.toggleRowSelection(that.tableData1)
          that.tableData1.forEach(row =>{
            that.$refs.rowtable.toggleRowSelection(row)
          })
          that.id = res.data.id
        })
         })
        .catch(error => {});
    },
    
    add() {
      this.title = "新增上分权限";
      this.dialogFormVisible = true;
    },
    query() {
      let that = this;
      this.currentPage = 1;
      getsysaudit(that, that.formInline.user, that.currentPage, that.pagesize);
      let setpointson = {
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize
      };
      this.$store.commit("setpointson", setpointson);
    },
    sure(form) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.title === "编辑上分权限") {
             let selection = that.multipleSelection;
            if (selection.length === 2) {
              selection.map(val => {
                if (val.name === "审核（代理上分）") {
                  this.agentchecked = "1";
                  this.userchecked = "0";
                  this.agentnum = val.address;
                  this.usernum = "";
                } else {
                  this.agentchecked = "0";
                  this.userchecked = "1";
                  this.usernum = val.address;
                  this.agentnum = "";
                }
              });
            } else {
              this.agentchecked = "1";
              this.userchecked = "1";
              selection.map(val => {
                if (val.name === "审核（代理上分）") {
                  this.agentnum = val.address;
                } else {
                  this.usernum = val.address;
                }
              });
            }
            request({
              url: that.public.url + "/backend/sysaudit/update",
              method: "post",
              data: {
                account_id: this.form.name,
                is_checked_agent: that.agentchecked,
                adam_agent_ulimit: that.agentnum,
                is_checked_user: that.userchecked,
                adam_user_ulimit: that.usernum,
                id: this.id
              }
            })
              .then(res => {
                if (res.code === 0) {
                  that.dialogFormVisible = false;
                  that.$refs.form.resetFields();
                  getsysaudit(
                    that,
                    that.formInline.user,
                    that.currentPage,
                    that.pagesize
                  );
                  this.tableData1 = [
                    {
                      name: "审核（代理上分）",
                      address: ""
                    },
                    {
                      name: "审核（玩家上分）",
                      address: ""
                    }
                  ]
                }
              })
              .catch(error => {});
          } else {
            let selection = that.multipleSelection;
            if (selection.length === 1) {
              selection.map(val => {
                if (val.name === "审核（代理上分）") {
                  this.agentchecked = "1";
                  this.userchecked = "0";
                  this.agentnum = val.address;
                  this.usernum = "";
                } else {
                  this.agentchecked = "0";
                  this.userchecked = "1";
                  this.usernum = val.address;
                  this.agentnum = "";
                }
              });
            } else {
              this.agentchecked = "1";
              this.userchecked = "1";
              selection.map(val => {
                if (val.name === "审核（代理上分）") {
                  this.agentnum = val.address;
                } else {
                  this.usernum = val.address;
                }
              });
            }
            request({
              url: that.public.url + "/backend/sysaudit/add",
              method: "post",
              data: {
                account_id: this.form.name,
                is_checked_agent: that.agentchecked,
                adam_agent_ulimit: that.agentnum,
                is_checked_user: that.userchecked,
                adam_user_ulimit: that.usernum
              }
            })
              .then(res => {
                if (res.code === 0) {
                  that.dialogFormVisible = false;
                  that.$refs.form.resetFields();
                  getsysaudit(
                    that,
                    that.formInline.user,
                    that.currentPage,
                    that.pagesize
                  );
                  this.tableData1 = [
                    {
                      name: "审核（代理上分）",
                      address: ""
                    },
                    {
                      name: "审核（玩家上分）",
                      address: ""
                    }
                  ]
                }
              })
              .catch(error => {
              });
          }
        } else {
          return false;
        }
      });
    },
    delet(row) {
      let that = this;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          request({
            url: that.public.url + "/backend/sysaudit/del",
            method: "post",
            data: {
              id: row.id
            }
          })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              getsysaudit(
                that,
                that.formInline.user,
                that.currentPage,
                that.pagesize
              );
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      let that = this;
      this.pagesize = val;
      this.currentPage = 1;
      getsysaudit(this, this.formInline.user, this.currentPage, this.pagesize);
      let setpointson = {
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize
      };
      this.$store.commit("setpointson", setpointson);
    },
    handleCurrentChange(val) {
      let that = this;
      this.currentPage = val * 1;
      getsysaudit(this, this.formInline.user, this.currentPage, this.pagesize);
      let setpointson = {
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize
      };
      this.$store.commit("setpointson", setpointson);
    }
  }
};

function getsysaudit(that, name, currentPage, pagesize) {
  request({
    url: that.public.url + "/backend/sysaudit/getList",
    method: "post",
    data: {
      account_id: name,
      pageno: currentPage,
      pagerows: pagesize
    }
  })
    .then(res => {
      if (res.data.list.length > 0) {
        let list = res.data.list;
        var newlist = []
        list.map(val =>{
         newlist.push(
           Object.assign({},val,{
            up: '审核(代理上分)',
            down: '审核(玩家上分)'
          })
         )
        })
        that.tableData = newlist
      } else {
        that.tableData = [];
      }
      that.total = res.data.rownum * 1;
      that.currentPage = res.data.pageno * 1;
    })
    .catch(error => {});
}

function getaccount(that) {
  request({
    url: that.public.url + "/backend/account/getloginnamelist",
    method: "post",
    data: {}
  })
    .then(res => {
      that.statuslist = res.data;
    })
    .catch(error => {});
}


function getaccount1 (that) {
 request({
   url: that.public.url + '/backend/sysaudit/getaccountnamelist',
   method: 'post',
   data: {
  }
  }).then(res => {
    that.statuslist1 = res.data
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
