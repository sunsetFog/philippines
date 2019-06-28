<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select v-model="formInline.status" filterable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="玩家渠道">
              <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in orglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="玩家账号" label-width="100px">
              <el-input v-model="formInline.user" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="8">
            <el-form-item label="申请提款时间">
              <el-date-picker
                v-model="formInline.time"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="query"
              v-if="withdrawpostgetlist"
            >搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="excel" v-if="withdrawpostexportgetlist">导出</el-button>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-model="formInline.checked">自动刷新</el-checkbox>
          </el-col>
          <el-col :span="3">
            <el-input v-model="formInline.order" clearable type='number' @change="order"></el-input>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="20px">秒 (s)</el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="20px"  class="red">{{num}}</el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="sx" v-if="withdrawpostgetlist">手动刷新</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-form>
          <el-col :span="2" class="c1">
            <el-form-item label-width="20px">
              <span class="gb1">建议拒绝</span>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="c2">
            <el-form-item label-width="20px">
              <span class="gb2">需要值班经理核对</span>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="c3">
            <el-form-item label-width="20px">
              <span class="gb3">VIP会员，可以降低审核标准</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- 分页组件 -->
    <!-- <div class="pagingbox">
    <div class="paging" style="margin-top: 40px;">
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
    </div>-->

    <el-table
      :data="tableData"
      :cell-style='cell1'
      border
      style="width: 100%"
    >
      <el-table-column prop="order_no" label="订单号"  width='200'></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.audit_status==='0' && withdrawpostupdateauditstatus">{{scope.row.audit_status | status}}</el-button>
          <span v-else>{{scope.row.audit_status | status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家账号" width='100'>
        <template slot-scope="scope">
          <el-popover
          placement='right'
          width='700'
          trigger='click'
          >
          <el-table :data='tableData1' :cell-style='cell'>
            <el-table-column  label="标注"  width='50'></el-table-column>
            <el-table-column prop="type" label="异常类型"  width='200'></el-table-column>
            <el-table-column prop="value" label="异常值"  width='200'></el-table-column>
            <el-table-column prop="remark" label="备注信息"  width='200'></el-table-column>
          </el-table>
            <el-button @click="wj(scope.row)" type="text" size="small" slot="reference" v-if="withdrawpostexceptionlist" style="color:black">{{scope.row.user_account}}</el-button>
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column prop="agent_org_name" label="玩家渠道" width='100'></el-table-column>
      <el-table-column prop="user_level" label="所属组"></el-table-column>
      <el-table-column label="提款来源">
        <template slot-scope="scope">
          <span>{{scope.row.src | src}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="申请提款时间" width='180'></el-table-column>
      <el-table-column prop="money" label="申请提款额度"  width='180'></el-table-column>
      <el-table-column prop="lwtn_activity_amt" label="活动金额"  width='180'></el-table-column>
      <el-table-column prop="lwtn_deposit" label="保险箱"  width='180'></el-table-column>
      <el-table-column prop="lwtn_balance" label="可用金额"  width='180'></el-table-column>
      <el-table-column prop="lwtn_charge_count"  label="充值次数"></el-table-column>
      <el-table-column prop="lwtn_cad_ratio" label="充投比"></el-table-column>
      <el-table-column label="充值总额" width='180'>>
        <template slot-scope="scope">
          <a style="color: blue;text-decoration: underline;" @click="online(scope.row)"><span>{{scope.row.lwtn_change_amt}}</span></a>
        </template>
      </el-table-column>
      <el-table-column label="投注总额" width='180'>>
        <template slot-scope="scope">
          <a style="color: blue;text-decoration: underline;" @click="orderby(scope.row)"><span>{{scope.row.lwtn_bet_amt}}</span></a>
        </template>
      </el-table-column>
      <el-table-column prop="lwtn_withdraw_amt" label="上次提款金额" width='180'></el-table-column>
      <el-table-column prop="last_withdraw_time" label="上次提款成功时间" width='180'></el-table-column>
      <el-table-column label="系统判定">
        <template slot-scope="scope">
          <span>{{scope.row.audit_type | type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width='100'>
        <template slot-scope="scope">
          <el-button @click="pass(scope.row)" type="text" size="small" v-if="scope.row.audit_status==='2' && withdrawpostupdateauditstatus && scope.row.status.indexOf(name) > 0">通过</el-button>
          <el-button @click="refused(scope.row)" type="text" size="small" v-if="scope.row.audit_status==='2' && withdrawpostupdateauditstatus && scope.row.status.indexOf(name) > 0" class="red">拒绝</el-button>
          <el-button @click="view(scope.row)" type="text" size="small" v-if="scope.row.audit_status==='1' || scope.row.audit_status==='3' && withdrawpostgetinfo">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="user_reg_time" label="注册时间" width='180'></el-table-column>
      <el-table-column prop="lwtn_ullev_transacc" label="上下级转账" width='180'></el-table-column>
      <el-table-column prop="status" label="订单状态" width='180'></el-table-column>
    </el-table>

    <div class="pagingbox">
      <div class="paging" style="margin-top: 30px;">
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

      <el-dialog title='选择拒绝原因'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
       <el-form-item prop='name'>
         <el-radio v-model="form.name" label='流水不足：您目前的流水不满足提款所需要求，请您在满足提款所需流水后再次申请提款。'>流水不足：您目前的流水不满足提款所需要求，请您在满足提款所需流水后再次申请提款。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form.name" label='对打套利：由于风控部门检测出您的账户存在对打、套利香味所以目前无法为您出款'>对打套利：由于风控部门检测出您的账户存在对打、套利香味所以目前无法为您出款。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form.name" label='提款超出上限：您当日的提款已达最高上限，目前无法为您出款，请您明日在进行提款。'>提款超出上限：您当日的提款已达最高上限，目前无法为您出款，请您明日在进行提款。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form.name" label='账户异常：由于风控部门查询出您的游戏账户存在异常，所以目前无法为您出款。'>账户异常：由于风控部门查询出您的游戏账户存在异常，所以目前无法为您出款。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form.name" label='平台维护：由于目前平台处于维护状态所以您的提款暂时无法查询，请您在维护结束后再次申请提款。'>平台维护：由于目前平台处于维护状态所以您的提款暂时无法查询，请您在维护结束后再次申请提款。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form.name" label='重复申请优惠：由于您违法了平台活动规则（同一账户、同一姓名、同一邮箱、同一电话号码、同一银行账户及同一IP地址不可在同一天重复申请优惠活动），目前您无法正常出款。'>
           <span>重复申请优惠：由于您违法了平台活动规则（同一账户、同一姓名、同一邮箱、同一电话号码、同一<br/>银行账户及同一IP地址不可在同一天重复申请优惠活动），目前您无法正常出款。</span>
           </el-radio>
      </el-form-item>
     <el-form-item prop='name'>
         <el-radio v-model="form.name" :label='form.user'>自定义原因</el-radio>
         <el-input style="width:60%" v-model="form.user" placeholder='(不超过100个字符)' maxlength='100'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>

  <el-dialog title='查看-提款申请详情'  :visible.sync="dialogFormVisible2">
    <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="1" style="width: 100%;">
      <tbody>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">玩家账号</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.user_account}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">玩家渠道</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.agent_org_name}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">申请提款金额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red">
                {{form2.money}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">所属组</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.user_level}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">上次提款成功时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.last_withdraw_time}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">玩家IP地址</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.user_ip}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">上次提款金额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell green">
                {{form2.lwtn_withdraw_amt}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">申请提款时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.create_time}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">充值总额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                 {{form2.lwtn_change_amt}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">银行名称</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                 {{form2.to_bank}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">投注总额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.lwtn_bet_amt}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">开户名</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.to_cardholder}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">充投比</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.lwtn_cad_ratio}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">银行卡号</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.to_cardno}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核认领时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.rima_get_time}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">提款后可用余额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.lwtn_balance}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核认领人员</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.rimaer}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">保险箱余额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.lwtn_deposit}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.audit_ope_time}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核结果</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red">
                {{form2.audit_status}}
              </div>
            </td>
        </tr>
      <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核操作</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.rimaer}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">风控审核结果备注</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.audit_reject_cause}}
              </div>
            </td>
        </tr>
        
      </tbody>
    </table>
    </div>

  </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formInline: {
        status: '0',
        checked: true,
        type: '',
        time: [],
        user: '',
        order: '30'
      },
      currentPage: 1,
      tableData: [],
      typelist: [
      ],
      statuslist: [
        { name: "全部", type: "-1" },
        { name: "待审核", type: "0" },
        { name: "审核中", type: "2" },
        { name: "通过", type: "1" },
        { name: "拒绝", type: "3" },
      ],
      orglist: [],
      total: 0,
      pagesize: 50,
      id: "",
      dialogFormVisible: false,
      form: {
        name: null,
        user: ''
      },
      rules: {
        name: [
          {required: true, message: '请选择或者填写原因', trigger: 'change'}
        ]
      },
      tableData1: [],
      num: 30,
      flag: true,
      timer:null,
      timer1: null,
      num1: 0,
      dialogFormVisible2: false,
      form2: {

      }
    };
  },
  created() {
    let that = this;
    this.order()
    if (!this.applywithdrawal.length && this.applywithdrawal.length != 0) {
      that.formInline.type = this.applywithdrawal.type;
      that.currentPage = this.applywithdrawal.currentPage;
      that.pagesize = this.applywithdrawal.pagesize;
      that.formInline.status = this.applywithdrawal.status;
      that.formInline.user = this.applywithdrawal.user;
      that.formInline.time = this.applywithdrawal.time;
      getlist(this);
    }
    getorglist(this);
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  computed: {
    ...mapGetters([
      "withdrawpostgetlist",
      "withdrawpostexportgetlist",
      "applywithdrawal",
      'withdrawpostupdateauditstatus',
      'withdrawpostgetinfo',
      'withdrawpostexceptionlist',
      'name'
    ])
  },
  watch: {
    'form.user': function (val) {
      if (val.length > 0) {
        this.form.name = val
      }
    },
    'formInline.checked': function(val) {
      if (!val) {
        window.clearInterval(this.timer)
        this.formInline.order = ''
        this.num = ''
      }
    }
  },
  filters: {
    status(val) {
      if (val === "0") {
        return "待审核";
      }
      if (val === "1") {
        return "审核通过";
      }
      if (val === "2") {
        return "审核中";
      }
      if (val === "3") {
        return "审核拒绝";
      }
    },
    src(val) {
      if (val === "1") {
        return "玩家提款";
      }
      if (val === "2") {
        return "代理提款";
      }
    },
    type(val) {
      if (val === "1") {
        return "自动审核";
      }
      if (val === "2") {
        return "人工审核";
      }
    }
  },
  methods: {
    query() {
      let that = this;
      this.currentPage = 1;
      getlist(this);
      let setapplywithdrawal = {
        type: that.formInline.type,
        status: that.formInline.status,
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        time: that.formInline.time
      };
      this.$store.commit("setapplywithdrawal", setapplywithdrawal);
    },
    sx () {
      getlist(this)
    },
    orderby (row) {
      this.$router.push({path: '/gameconfmgr/order',query:{timeto: row.last_withdraw_time,timefrom: row.create_time, user:row.user_account}})
    },
    online(row) {
      this.$router.push({path: '/rewithmgr/online',query:{timeto: row.last_withdraw_time,timefrom: row.create_time, user:row.user_account, org: row.agent_org_id}})
    },
    wj (row) {
      let that = this
      request({
        url: that.public.url + "/withdrawpost/exceptionlist",
        method: "post",
        data: {
            id: row.id
        }
      })
      .then(res => {
        that.tableData1 = res.data
      })
      .catch(error => {});
    },
    view (row) {
      let that = this
      this.dialogFormVisible2 = true
      request({
      url: that.public.url + "/withdrawpost/getinfo",
      method: "post",
      data: {
          id: row.id
      }
    })
      .then(res => {
        that.form2 = res.data[0]
      })
      .catch(error => {});
    },
    cancel() {
      window.clearInterval(this.timer)
    },
    order () {
      if (this.formInline.checked) {
        this.formInline.order = this.formInline.order * 1
        if (Number.isInteger(this.formInline.order) && this.formInline.order >=10 && this.formInline.order <=100) {
          this.num = this.formInline.order 
          this.cancel()
          this.timer = window.setInterval(()=>{
              this.num--
              if (this.num === 0) {
                getlist(this)
                this.num = this.formInline.order 
              }
          },1000)
        } else {
          this.$message.warning('请输入10-100的整数')
        }
      }
      
    },
    excel() {
      let that = this;
     var start = "";
    var end = "";
    if (that.formInline.time && that.formInline.time.length > 0) {
      let timestart = that.formInline.time[0].getTime() / 1000;
      start = parseTime(timestart);
      let timeend = that.formInline.time[1].getTime() / 1000;
      end = parseTime(timeend);
    }

    request({
      url: that.public.url + "/withdrawpost/exportgetlist",
      method: "post",
      data: {
        audit_status: that.formInline.status,
        agent_org_id: that.formInline.type,
        user_account: that.formInline.user,
        date_from: start,
        date_to: end,
        pageno: that.currentPage,
        pagerows: that.pagesize
      }
    })
      .then(res => {
        window.location.href = that.public.url + res.data
      })
      .catch(error => {});
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0 && row.color!='') {
        let color = {
          'background': '#'+row.color
        }
        return color
      }
    },
    cell1 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 2 && row.warn_color!='') {
        let color = {
          'background': '#'+row.warn_color
        }
        return color
      }
    },
    reset () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/backend/withdrawpost/updateauditstatus',
            method: 'post',
            data: {
                  id: this.id,
                  status: 3,
                  audit_reject_cause: this.form.name
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            });
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that)
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
    edit (row) {
      let that = this
      this.$confirm('此操作将该数据状态改为审核中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/withdrawpost/updateauditstatus',
            method: 'post',
            data: {
                id: row.id,
                status: 2
            }
          }).then(res => {
             that.$message({
              type: 'success',
              message: res.message
            });
           getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    pass (row) {
      let that = this
      this.$confirm('此操作将通过该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/withdrawpost/updateauditstatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1
            }
          }).then(res => {
             that.$message({
              type: 'success',
              message: res.message
            });
           getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    refused (row) {
      this.id = row.id
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      let that = this;
      this.pagesize = val;
      this.currentPage = 1;
      getlist(this);
      let setapplywithdrawal = {
        type: that.formInline.type,
        status: that.formInline.status,
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        time: that.formInline.time
      };
      this.$store.commit("setapplywithdrawal", setapplywithdrawal);
    },
    handleCurrentChange(val) {
      let that = this;
      this.currentPage = val * 1;
      getlist(this);
      let setapplywithdrawal = {
        type: that.formInline.type,
        status: that.formInline.status,
        user: that.formInline.user,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        time: that.formInline.time
      };
      this.$store.commit("setapplywithdrawal", setapplywithdrawal);
    }
  }
};

function getlist(that) {
  var start = "";
  var end = "";
  if (that.formInline.time && that.formInline.time.length > 0) {
    let timestart = that.formInline.time[0].getTime() / 1000;
    start = parseTime(timestart);
    let timeend = that.formInline.time[1].getTime() / 1000;
    end = parseTime(timeend);
  }

  request({
    url: that.public.url + "/withdrawpost/getlist",
    method: "post",
    data: {
      audit_status: that.formInline.status,
      agent_org_id: that.formInline.type,
      user_account: that.formInline.user,
      date_from: start,
      date_to: end,
      pageno: that.currentPage,
      pagerows: that.pagesize
    }
  })
    .then(res => {
      that.tableData = res.data.list;
      that.total = res.data.rownum * 1;
      that.currentPage = res.data.pageno * 1;
    })
    .catch(error => {});
}


function getorglist(that) {
  request({
    url: that.public.url + "/backend/org/getorglist",
    method: "post",
    data: {}
  })
    .then(res => {
      that.orglist = res.data;
    })
    .catch(error => {});
}


function parseTime(time) {
  var date = new Date(time * 1000);
  let y = date.getFullYear() + "-";
  let m =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let d = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let i =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return y + m + d + h + i + s;
}
</script>

<style lang="css" scoped>
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
.dialogcolor .el-dialog__header {
  background: #dedbdb !important;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-checkbox {
  font-weight: none;
  margin-top: 12px;
}
.gb1 {
  background-color: red;
  padding: 10px;
  text-align: center;
}
.gb2 {
  background-color: yellow;
  padding: 10px;
  text-align: center;
}
.gb3 {
  background-color: green;
  padding: 10px;
  text-align: center;
}
.applytable {
  line-height: 50px;
  text-align: center;
  font-size: 18px
}
table{
    table-layout: fixed;
    word-wrap: break-word;
}
</style>
