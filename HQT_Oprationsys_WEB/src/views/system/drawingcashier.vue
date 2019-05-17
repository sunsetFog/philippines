<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="5">
            <el-form-item label="状态">
              <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="出纳" label-width="100px">
              <el-input v-model="formInline.order" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-checkbox v-model="checked">第三方汇款</el-checkbox>
          </el-col>

          <el-col :span="6">
            <el-form-item label="银行">
              <el-select v-model="formInline.bank" filterable clearable>
                <el-option
                  v-for="item in banklist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="5">
            <el-form-item label="总代" label-width="100px">
              <el-input v-model="formInline.account" clearable></el-input>
            </el-form-item>
          </el-col>
          
        </el-form>
      </el-row>

      <el-row>
        <el-form :inline="true" label-width="100px">
           <el-col :span="5">
            <el-form-item label="玩家渠道">
              <el-select v-model="formInline.org" filterable clearable>
                <el-option
                  v-for="item in orglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

         <el-col :span="7">
            <el-form-item label="玩家账号" label-width="100px">
              <el-input v-model="formInline.user" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提款金额" label-width="100px">
              <el-input v-model="formInline.money1" clearable style="width:40%" type='number'></el-input>
              <span>至</span>
              <el-input v-model="formInline.money2" clearable style="width:40%" type='number'></el-input>
            </el-form-item>
          </el-col>
         
        
        </el-form>
      </el-row>

      <el-row>
        <el-form :inline="true" label-width="100px">
           <el-col :span="8">
            <el-form-item label="申请提款时间">
              <el-date-picker
                v-model="formInline.time1"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出纳时间">
              <el-date-picker
                v-model="formInline.time2"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="query"
              v-if="paywithdrawgetcashlist"
            >搜素</el-button>
          </el-col>

          <el-col :span="4">
            <el-button type="primary" @click="excel" v-if="paywithdrawgetcashlist">导出</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
  <!--   <div class="pagingbox">
      <div class="paging" style="margin-top: 40px;">
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
    </div> -->

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="提款ID"></el-table-column>
      <el-table-column prop="cash_status" width="150" label="风控状态"></el-table-column>
      
      <el-table-column prop="rimaer" label="风控员"></el-table-column>
      <el-table-column label="风控时间">
        <template slot-scope="scope">
          <span>{{scope.row.rima_ope_time | time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="audit_status" label="状态"></el-table-column>
      <el-table-column prop="user_account" label="玩家账号"></el-table-column>
      <el-table-column prop="org_name" label="玩家渠道"></el-table-column>
      <el-table-column prop="top_agent_account" label="总代"></el-table-column>
      <el-table-column prop="src" label="提款来源"></el-table-column>
      <el-table-column prop="money" label="提款金额"></el-table-column>
      <el-table-column width="150" prop="create_time" label="申请提款时间"></el-table-column>
       <el-table-column prop="to_bank" label="银行"></el-table-column>
        <el-table-column prop="to_cardno" label="银行卡号"></el-table-column>
         <el-table-column prop="cashier" label="出纳"></el-table-column>
          <el-table-column label="出纳时间">
          <template slot-scope="scope">
            <span>{{scope.row.cash_ope_time | time}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="财务状态">
          <template slot-scope="scope">
            <span>{{scope.row.audit_status}}</span>
          </template>
        </el-table-column> -->
      <el-table-column label="出纳操作"  width="120">
        <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.cash_status === '待审核' && paywithdrawauditwithdraw">操作</el-button>
        <span v-if="scope.row.btn_display == '1'">{{scope.row.op_status}}</span>
        <el-button type="text" size="small" v-if="scope.row.cash_status === '待审核'">第三方</el-button>
       </template>
      </el-table-column>
      <el-table-column label="查看订单">
        <template slot-scope="scope">
        <el-button @click="view(scope.row)" type="text" size="small" v-if="paywithdrawgetinfocash">查看</el-button>
      </template>
      </el-table-column>    
    </el-table>

   <!-- 设置操作通过 -->
    <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
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
              <div class="cell">玩家提款银行</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.to_bank}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">玩家渠道</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.org_name}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">提款申请时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.create_time}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">总代</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.top_agent_account}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">会员等级</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.vip_level}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">提款姓名</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell" id="button1">
                {{form2.to_cardholder}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button type='primary' @click="copy('button1')">复制</el-button>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">银行卡号</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell" id="button2">
                 {{form2.to_cardno}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button type='primary' @click="copy('button2')">复制</el-button>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">提款金额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell" id="button3">
                {{form2.money}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button type='primary' @click="copy('button3')">复制</el-button>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">玩家IP地址</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.ip}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">手续费</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input placeholder='扣玩家手续费用' type='number' v-model="number"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">元 人民币</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">备注</div>
            </td>
            <td crowspan="1" colspan="3">
              <div class="cell">
                <el-input placeholder='请填写备注' type='textarea' v-model="textarea"></el-input>
              </div>
            </td>
        </tr>
       
        
      </tbody>
    </table>
    <span style="margin-top:7px;display: block;">交易完成后，请复制付款信息，在此处单击“提交”。</span>
    <div class="footbutton">
      <el-button type='success'  @click="pass(form)">设置通过</el-button>
      <el-button type='danger'  @click="sure(form)">设置失败/拒绝</el-button>
    </div>
    </div>
  </el-dialog>


    <!-- 分页组件 -->
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

    <el-dialog title='查看'  :visible.sync="dialogFormVisible2">
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
              <div class="cell">玩家提款银行</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.to_bank}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">玩家渠道</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.org_name}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">提款申请时间</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.create_time}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">总代</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.top_agent_account}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">会员等级</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.vip_level}}
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">提款姓名</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.to_cardholder}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">银行卡号</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                 {{form2.to_cardno}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">提款金额</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.money}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">玩家IP地址</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.ip}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell"></div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">手续费</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                {{form2.broker_rate}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">元 人民币</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
              </div>
            </td>
        </tr>
        <tr class="applytable">
            <td crowspan="1" colspan="1">
              <div class="cell">备注</div>
            </td>
            <td crowspan="1" colspan="3">
              <div class="cell">
                {{form2.cash_remark}}
              </div>
            </td>
        </tr>
       
        
      </tbody>
    </table>
    </div>

  </el-dialog>

  <el-dialog title='设置拒绝/失败'  :visible.sync="dialogFormVisible3" :before-close="reset3">
    <el-form :model="form3" :rules="rules" ref="form">
      <el-form-item prop='name'>
         <span>请选择失败原因：</span>
      </el-form-item>
       <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='2'>低于提款限额，情确认提款金额，稍后再试。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='3'>违反相关提款限额的，请查看“帮助中心”，请稍后再试。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='4'>需要检查游戏账户的某些问题，请联系您的代理商或在线客服带表。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='5'>游戏资金低于您最近存款金额的，请确认您的游戏资金达到要求的限额，稍后再试</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='6'>参加游戏活动后，奖金需达到一定的流水。</el-radio>
      </el-form-item>
      <el-form-item prop='name'>
         <el-radio v-model="form3.name" label='7'>错误的银行账户信息，请在更正您的汇款银行信息后再试一次。</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure3(form)">确 定</el-button>
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
        status: "-1",
        order: "",
        bank: "",
        account: "",
        org: "",
        user: "",
        time1: [],
        time2: [],
        money1: "",
        money2: ""
      },
      currentPage: 1,
      tableData: [
      ],
      checked: false,
      title: '',
      dialogFormVisible: false,
      typelist: [
        { name: "全部", type: "10" },
        { name: "待审核", type: "-1" },
        { name: "审核中", type: "0" }, 
        { name: "通过", type: "1" },
        { name: "拒绝", type: "2" },
        { name: "1.第三方汇款通过", type: "3" },
        { name: "2.第三方汇款排队中", type: "4" },
        { name: "3.发送汇款信息失败", type: "5" },
        { name: "4.第三方汇款失败", type: "6" }
      ],
      orglist: [],
      total: 0,
      pagesize: 50,
      id: "",
      rules: {},
      form: {

      },
      formLabelWidth: '150px',
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form2: {

      },
      form3: {
        name: ''
      },
      banklist: [],
      number: '',
      textarea: ''
    };
  },
  created() {
    let that = this;
    if (!this.drawingcashier.length && this.drawingcashier.length != 0) {
      that.formInline.time1 = this.drawingcashier.time1;
      that.checked = this.drawingcashier.checked;
      that.currentPage = this.drawingcashier.currentPage;
      that.pagesize = this.drawingcashier.pagesize;
      that.formInline.time2 = this.drawingcashier.time2;
      that.formInline.status = this.drawingcashier.status;
      that.formInline.order = this.drawingcashier.order;
      that.formInline.bank = this.drawingcashier.bank;
      that.formInline.money1 = this.drawingcashier.money1;
      that.formInline.money2 = this.drawingcashier.money2;
      that.formInline.org = this.drawingcashier.org;
      that.formInline.account = this.drawingcashier.account;
      that.formInline.remark = this.drawingcashier.remark;
      that.formInline.user = this.drawingcashier.user;
      getlist(this);
    }
    getorglist(this);
    getbanklist(this)
  },
  computed: {
    ...mapGetters([
      "paywithdrawgetcashlist",
      "paywithdrawgetinfocash",
      "paywithdrawauditwithdraw",
      "drawingcashier"
    ])
  },
  watch: {},
  filters: {
    time(val) {
      if (val === "-1") {
        return "";
      } else {
        return val
      }
    },
    type (val) {
      if (val === "0") {
        return '审核中'
      }
      if (val === "1") {
        return '通过'
      }
      if (val === "2") {
        return '拒绝'
      }
      if (val === "3") {
        return '1.第三方汇款通过'
      }
      if (val === "4") {
        return '2.第三方汇款排队中'
      }
      if (val === "5") {
        return '3.发送汇款信息失败'
      }
      if (val === "6") {
        return '4.第三方汇款失败'
      }
    }
  },
  methods: {
    query() {
      let that = this;
      this.currentPage = 1;
      getlist(this);
      let setdrawingcashier = {
        time1: that.formInline.time1,
        time2: that.formInline.time2,
        checked: that.checked,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        status: that.formInline.status,
        order: that.formInline.order,
        bank: that.formInline.bank,
        money1: that.formInline.money1,
        money2: that.formInline.money2,
        org: that.formInline.org,
        account: that.formInline.account,
        user: that.formInline.user
      };
      this.$store.commit("setdrawingcashier", setdrawingcashier);
    },
    copy (button) {
      var text =document.getElementById(button).innerText;
      var e = document.createElement('input');
      e.setAttribute('id', 'copyInput');
      e.value = text
      document.body.appendChild(e)
      e.select();
      let tag = document.execCommand('Copy')
      if (tag) {
        this.$message.success('复制成功')
      }
      document.getElementById('copyInput').remove();
    },
    pass () {
      let that = this
      request({
        url: that.public.url + "/paywithdraw/auditwithdraw",
        method: "post",
        data: {
            id: this.id,
            change: 1,
            remark: this.textarea,
            broker_money: this.number
        }
      })
        .then(res => {
          that.$message.success(res.message)
          that.dialogFormVisible = false
          that.textarea = ''
          that.number = ''
          getlist(that)
        })
        .catch(error => {});
    },
    sure3 () {
      let that = this
      request({
        url: that.public.url + "/paywithdraw/auditwithdraw",
        method: "post",
        data: {
            id: this.id,
            change: this.form3.name
        }
      })
        .then(res => {
          that.$message.success(res.message)
          that.dialogFormVisible = false
          that.dialogFormVisible3 = false
          that.form3.name = ''
          getlist(that)
        })
        .catch(error => {});
    },
    view (row) {
      let that = this
      this.dialogFormVisible2 = true
      request({
      url: that.public.url + "/paywithdraw/getinfocash",
      method: "post",
      data: {
          id: row.id
      }
    })
      .then(res => {
        that.form2 = res.data
      })
      .catch(error => {});
    },
     reset (form) {
      this.dialogFormVisible = false
      this.textarea = ''
      this.number = ''
    },
    reset3 (form) {
      this.dialogFormVisible3 = false
      this.form3.name = ''
    },
    sure () {
      this.dialogFormVisible3 = true
    },
    // 设置操作按钮
    edit(row) {
      let that = this
      this.title = '后台管理-withdraw'
      this.dialogFormVisible = true
      this.id = row.id
      request({
      url: that.public.url + "/paywithdraw/getinfocash",
      method: "post",
      data: {
          id: row.id
      }
    })
      .then(res => {
        that.form2 = res.data
      })
      .catch(error => {});
    },
    excel() {
      let that = this
      var start1 = "";
    var end1 = "";
    var start2 = "";
    var end2 = "";
    if (that.formInline.time1 && that.formInline.time1.length > 0) {
      let timestart = that.formInline.time1[0].getTime() / 1000;
      start1 = parseTime(timestart);
      let timeend = that.formInline.time1[1].getTime() / 1000;
      end1 = parseTime(timeend);
    }
    if (that.formInline.time2 && that.formInline.time2.length > 0) {
      start2 = parseTime(that.formInline.time2[0].getTime() / 1000);
      end2 = parseTime(that.formInline.time2[1].getTime() / 1000);
    }
    var excel = "0"
    if (that.checked) {
      excel = '1'
    }

    request({
      url: that.public.url + "/paywithdraw/getcashlist",
      method: "post",
      data: {
        cash_status: that.formInline.status,
        cashier: that.formInline.order,
        to_bank: that.formInline.bank,
        money_from: that.formInline.money1,
        money_to: that.formInline.money2,
        org_id: that.formInline.org,
        user_account: that.formInline.account,
        top_agent_account: that.formInline.user,
        create_time_from: start1,
        create_time_to: end1,
        cash_ope_time_from: start2,
        cash_ope_time_to: end2,
        export: 1
      }
    })
      .then(res => {
        window.location.href = that.public.url + res.data
      })
      .catch(error => {});
    },
    clickitem(e) {
      e === this.formInline.radio
        ? (this.formInline.radio = "")
        : (this.formInline.radio = e);
    },
    handleSizeChange(val) {
      let that = this;
      this.pagesize = val;
      this.currentPage = 1;
      getlist(this);
      let setdrawingcashier = {
        time1: that.formInline.time1,
        time2: that.formInline.time2,
        checked: that.checked,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        status: that.formInline.status,
        order: that.formInline.order,
        bank: that.formInline.bank,
        money1: that.formInline.money1,
        money2: that.formInline.money2,
        org: that.formInline.org,
        account: that.formInline.account,
        user: that.formInline.user
      };
      this.$store.commit("setdrawingcashier", setdrawingcashier);
    },
    handleCurrentChange(val) {
      let that = this;
      this.currentPage = val * 1;
      getlist(this);
      let setdrawingcashier = {
        time1: that.formInline.time1,
        time2: that.formInline.time2,
        checked: that.checked,
        currentPage: that.currentPage,
        pagesize: that.pagesize,
        status: that.formInline.status,
        order: that.formInline.order,
        bank: that.formInline.bank,
        money1: that.formInline.money1,
        money2: that.formInline.money2,
        org: that.formInline.org,
        account: that.formInline.account,
        user: that.formInline.user
      };
      this.$store.commit("setdrawingcashier", setdrawingcashier);
    }
  }
};

function getlist(that) {
  var start1 = "";
  var end1 = "";
  var start2 = "";
  var end2 = "";
  if (that.formInline.time1 && that.formInline.time1.length > 0) {
    let timestart = that.formInline.time1[0].getTime() / 1000;
    start1 = parseTime(timestart);
    let timeend = that.formInline.time1[1].getTime() / 1000;
    end1 = parseTime(timeend);
  }
  if (that.formInline.time2 && that.formInline.time2.length > 0) {
    start2 = parseTime(that.formInline.time2[0].getTime() / 1000);
    end2 = parseTime(that.formInline.time2[1].getTime() / 1000);
  }
  var excel = "0"
  if (that.checked) {
    excel = '1'
  }

  request({
    url: that.public.url + "/paywithdraw/getcashlist",
    method: "post",
    data: {
      cash_status: that.formInline.status,
      cashier: that.formInline.order,
      export: '',
      to_bank: that.formInline.bank,
      money_from: that.formInline.money1,
      money_to: that.formInline.money2,
      org_id: that.formInline.org,
      user_account: that.formInline.account,
      top_agent_account: that.formInline.user,
      create_time_from: start1,
      create_time_to: end1,
      cash_ope_time_from: start2,
      cash_ope_time_to: end2,
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
      let all = {id: "", name: "全部"}
      that.orglist = res.data
      that.orglist.unshift(all)
    })
    .catch(error => {});
}
function getbanklist (that) {
   request({
    url: that.public.url + "/backend/quicksetbank/getlist",
    method: "post",
    data: {}
  })
    .then(res => {
      let all = {id: "", name: "全部"}
      that.banklist = res.data.list
      that.banklist.unshift(all)
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
  margin-top: 14px;
  margin-left: -35px;
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
.footbutton {
  margin-top: 10px;
  text-align: center;
}

</style>
