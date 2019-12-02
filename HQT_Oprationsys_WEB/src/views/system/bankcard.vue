<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="paybankcardaddbankcard">新增 + </el-button>
          </el-col>
          <el-col :span="5">
            <el-form-item label="选择银行">
                <!-- <el-input v-model="formInline.name" placeholder="充值来源" clearable></el-input> -->
                <el-select v-model="formInline.bank" filterable clearable>
                <el-option
                  v-for="item in allname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in list"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="银行卡类型">
                <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in type"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="支付平台">
                <!-- <el-input v-model="formInline.name" placeholder="充值来源" clearable></el-input> -->
                <el-select v-model="formInline.name" filterable clearable>
                <el-option
                  v-for="item in payname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
 
 
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="paybankcardbankcardlist">查询</el-button>
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
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      width='50'
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="bank_code"
      label="银行代码">
    </el-table-column>
    <el-table-column
      prop="financial_ident"
       width='100'
      label="内部识别码">
    </el-table-column>
    <el-table-column
      width='150'
      prop="cardno"
      label="银行卡号">
    </el-table-column>
    <el-table-column
      prop="accname"
      label="账户名">
    </el-table-column>
    <el-table-column
      label="银行卡类型">
      <template slot-scope="scope">
        {{scope.row.type}}
      </template>
    </el-table-column>
    <el-table-column
      width='180'
      label="对应支付平台">
      <template slot-scope="scope">
        {{scope.row.channel_name}}
      </template>
    </el-table-column>
     <el-table-column
      width='100'
      prop="init_balance"
      label="期初余额">
    </el-table-column>
     <el-table-column
      width='100'
      prop="interval"
      label="转账区间">
    </el-table-column>
     <el-table-column
      width='100'
      prop="day_trans_max_limit"
      label="单日上限">
    </el-table-column>
     <el-table-column
      width='100'
      prop="total_in_money"
      label="截止至昨日总转入">
    </el-table-column>
     <el-table-column
      prop="total_out_money"
       width='100'
      label="截止至昨日总转出">
    </el-table-column>
     <el-table-column
      prop="ytd_flow_money"
       width='100'
      label="昨日流水">
    </el-table-column>
     <el-table-column
      prop="cha_broker_rate"
       width='100'
      label="充值渠道费率">
    </el-table-column>
     <el-table-column
      prop="pla_broker_rate"
       width='100'
      label="平台支付费率">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status}}
      </template>
    </el-table-column>
    <el-table-column
    fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="paybankcardupdatebankcard">修改</el-button>
        <el-button @click="view(scope.row)" type="text" size="small" v-if="paybankcardgetpaycardinfo">查看</el-button>
        <el-button type="text" size="small" @click="transfer(scope.row)" v-if="paybankcardtransferrecord">转账记录</el-button>
        <!-- <el-button @click="delet(scope.row)" type="text" size="small" v-if="paychannelgetinfo">删除</el-button> -->
        <el-button type="text" size="small" @click="up(scope.row)" v-if="paybankcardupdatestatus && scope.row.status === '禁用'" class="green">启用</el-button>
        <el-button type="text" size="small" @click="down(scope.row)" v-if="paybankcardupdatestatus && scope.row.status === '可用'" class="red">禁用</el-button>
      </template>
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


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
        
      <el-form-item label="银行代码" :label-width="formLabelWidth" v-if="editshow">
        <span>{{bank_code}}</span>
      </el-form-item>
      <el-form-item label="银行选择" :label-width="formLabelWidth" prop='bank_id' v-else>
         <el-select v-model="form.bank_id" filterable clearable>
                <el-option
                  v-for="item in allname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
       <el-form-item label="内部识别码" :label-width="formLabelWidth" v-if="editshow">
        <span>{{financial_ident}}</span>
      </el-form-item>
       <el-form-item label="内部识别码" :label-width="formLabelWidth" prop='financial_ident' v-else>
        <el-input v-model="form.financial_ident" placeholder="" style="width:80%"></el-input>
      </el-form-item>
       <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="cardno">
        <el-input v-model="form.cardno" placeholder="" type="text" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="账户名" :label-width="formLabelWidth" prop='accname'>
        <el-input v-model="form.accname" :placeholder="placeholder" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" :label-width="formLabelWidth" prop='idno'>
        <el-input v-model="form.idno" :placeholder="placeholder" type="number" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="账户查询密码" :label-width="formLabelWidth" v-if="editshow" prop='querypwd2'>
        <el-input v-model="form.querypwd2" :placeholder="placeholder" type="password"  style="width:80%"></el-input><span class="red">不填则不改</span>
      </el-form-item>
       <el-form-item label="账户查询密码" :label-width="formLabelWidth" prop='querypwd' v-else>
        <el-input v-model="form.querypwd" :placeholder="placeholder" type="password"  style="width:80%"></el-input>
      </el-form-item>
       <el-form-item label="确认查询密码" :label-width="formLabelWidth" v-if="editshow" prop='con_querypwd2'>
        <el-input v-model="form.con_querypwd2" :placeholder="placeholder" type="password" style="width:80%"></el-input><span class="red">不填则不改</span>
      </el-form-item>
      <el-form-item label="确认查询密码" :label-width="formLabelWidth" prop='con_querypwd' v-else>
        <el-input v-model="form.con_querypwd" :placeholder="placeholder" type="password" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="账户支付密码" :label-width="formLabelWidth" v-if="editshow" prop='paypwd2'>
        <el-input v-model="form.paypwd2" :placeholder="placeholder" type="password" style="width:80%"></el-input><span class="red">不填则不改</span>
      </el-form-item>
       <el-form-item label="账户支付密码" :label-width="formLabelWidth" prop='paypwd' v-else>
        <el-input v-model="form.paypwd" :placeholder="placeholder" type="password" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="确认支付密码" :label-width="formLabelWidth" v-if="editshow" prop='con_paypwd2'>
        <el-input v-model="form.con_paypwd2" :placeholder="placeholder" type="password" style="width:80%"></el-input><span class="red">不填则不改</span>
      </el-form-item>
      <el-form-item label="确认支付密码" :label-width="formLabelWidth" prop='con_paypwd' v-else>
        <el-input v-model="form.con_paypwd" :placeholder="placeholder" type="password" style="width:80%"></el-input>
      </el-form-item>
       <el-form-item label="初期余额" :label-width="formLabelWidth" prop='init_balance'>
        <el-input v-model="form.init_balance" :placeholder="placeholder" type="number" style="width:80%"></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="单笔转账最小金额" :label-width="formLabelWidth" prop='one_trans_min_limit'>
        <el-input v-model="form.one_trans_min_limit" :placeholder="placeholder" type="number"  style="width:80%"></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="单笔转账最大金额" :label-width="formLabelWidth" prop='one_trans_max_limit'>
        <el-input v-model="form.one_trans_max_limit" :placeholder="placeholder" type="number"  style="width:80%"></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="单日转账限额" :label-width="formLabelWidth" prop='day_trans_max_limit'>
        <el-input v-model="form.day_trans_max_limit" :placeholder="placeholder" type="number"  style="width:80%"></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="充值渠道费率" :label-width="formLabelWidth" prop='cha_broker_rate'>
        <el-input v-model="form.cha_broker_rate" :placeholder="placeholder" type="number"  style="width:80%"></el-input><span>%</span>
      </el-form-item>
       <el-form-item label="平台支付费率" :label-width="formLabelWidth" prop='pla_broker_rate'>
        <el-input v-model="form.pla_broker_rate" :placeholder="placeholder" type="number" style="width:80%"></el-input><span>%</span>
      </el-form-item>
       <el-form-item label="是否启用" :label-width="formLabelWidth" prop='status'>
        <!-- <el-input v-model="form.status" :placeholder="placeholder"></el-input> -->
        <el-radio-group v-model="form.status">
          <el-radio :label="'1'">启用</el-radio>
          <el-radio :label="'0'">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="银行卡类型" :label-width="formLabelWidth" prop='type'>
        <!-- <el-input v-model="form.type" :placeholder="placeholder"></el-input> -->
        <el-radio-group v-model="form.type">
          <el-radio :label="'1'">收款卡</el-radio>
          <el-radio :label="'2'">付款卡</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="对应第三方支付平台" :label-width="formLabelWidth" prop='channel_id'>
        <!-- <el-input v-model="form.channel_id" :placeholder="placeholder"></el-input> -->
        <el-select v-model="form.channel_id" filterable clearable multiple>
                <el-option
                  v-for="item in payname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>


    <el-dialog title='转账记录'  :visible.sync="dialogFormVisible2" :before-close="reset2">
   <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="8">
            <el-form-item label="银行卡">
                <span>{{form2.cardno}}</span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="账户名">
                <span>{{form2.accname}}</span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="银行卡类型">
                <span>{{form2.type}}</span>
            </el-form-item>
          </el-col>
 
         
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="22">
         <el-form-item label="查询时间">
              <el-date-picker
                v-model="time"
                type="daterange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
         <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query2">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage2"
      :page-size="pagesize2"
      background
      layout="prev, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    </div>

    <el-table
    :data="tableData2"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label="转账时间:Time">
    </el-table-column>
    <el-table-column
      prop="transfer_in"
      label="转入金额:Transfer In">
    </el-table-column>
    <el-table-column
      prop="transfer_out"
      label="转出金额:Transfer Out">
    </el-table-column>
    <el-table-column
      prop="bankcharge"
      label="手续费:Bank Charge">
    </el-table-column>
  </el-table>
<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage2"
      :page-sizes="[20,50,200]"
      :page-size="pagesize2"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>

    <div slot="footer" class="dialog-footer" style="margin-top: 32px; text-align: center;">
      <el-button @click="reset2()">取 消</el-button>
    </div>

  </el-dialog>

  
  <el-dialog title='银行卡查看'  :visible.sync="dialogFormVisible1" :before-close="reset1">
    <el-form :model="form1" ref="form1">
        
       <el-form-item label="银行代码" :label-width="formLabelWidth">
        <span>{{form1.bank_code}}</span>
      </el-form-item>
       <el-form-item label="内部识别码" :label-width="formLabelWidth">
        <span>{{form1.financial_ident}}</span>
      </el-form-item>
       <el-form-item label="银行卡号" :label-width="formLabelWidth">
         <span>{{form1.cardno}}</span>
      </el-form-item>
      <el-form-item label="账户名" :label-width="formLabelWidth">
        <span>{{form1.accname}}</span>
      </el-form-item>
      <el-form-item label="证件号码" :label-width="formLabelWidth">
        <span>{{form1.idno}}</span>
      </el-form-item>
      <el-form-item label="银行卡添加时间" :label-width="formLabelWidth">
        <span>{{form1.create_time}}</span>
      </el-form-item>
      <el-form-item label="银行卡修改时间" :label-width="formLabelWidth">
        <span>{{form1.update_time}}</span>
      </el-form-item>
       <el-form-item label="初期余额" :label-width="formLabelWidth">
         <span>{{form1.init_balance}}</span>
      </el-form-item>
       <el-form-item label="可转账区间" :label-width="formLabelWidth">
         <span>{{form1.interval}}</span>
      </el-form-item>
       <el-form-item label="单日转账限额" :label-width="formLabelWidth">
       <span>{{form1.day_trans_max_limit}}</span>
      </el-form-item>
       <el-form-item label="充值渠道费率" :label-width="formLabelWidth">
        <span>{{form1.cha_broker_rate}}</span>
      </el-form-item>
       <el-form-item label="平台支付费率" :label-width="formLabelWidth">
        <span>{{form1.pla_broker_rate}}</span>
      </el-form-item>
       <el-form-item label="当前状态" :label-width="formLabelWidth">
        <span>{{form1.status}}</span>
      </el-form-item>
      <el-form-item label="银行卡类型" :label-width="formLabelWidth">
       <span>{{form1.type}}</span>
      </el-form-item>
       <el-form-item label="支付平台" :label-width="formLabelWidth">
         <span>{{form1.channel_name}}</span>
      </el-form-item>
      


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset1(form)">取 消</el-button>
      <el-button type="primary" @click="sure1(form)">确 定</el-button>
    </div>

  </el-dialog>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { validatAlphabets } from '@/utils/validate'
export default {
  data() {
    var rule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入值'));
        } else if (value *1 < 0) {
          callback(new Error('请输入大于0的值'));
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        
       
          callback();
        
      };
      var validatePass2 = (rule, value, callback) => {
        // if (value === '') {
        //   callback();
        // } else if (this.form.querypwd !== this.form.con_querypwd) {
        //   callback(new Error('两次输入的密码不一致!'));
        // } else {
        //   callback();
        // }
         if (this.form.querypwd !== this.form.con_querypwd) {
         callback(new Error('两次输入的密码不一致!'));
        } else  {
          callback();
        }
      }

      var validatePass3 = (rule, value, callback) => {
        // if (value === '') {
        //   callback(new Error('请输入支付密码'));
        // } else {
        //   callback();
        // }
       
          callback();
         
      
      };
      var validatePass4 = (rule, value, callback) => {
        // if (value === '') {
        //   callback(new Error('请再次输入支付密码'));
        // } else if (this.form.paypwd !== this.form.con_paypwd) {
        //   callback(new Error('两次输入的密码不一致!'));
        // } else {
        //   callback();
        // }
         if (this.form.paypwd !== this.form.con_paypwd) {
           callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      formInline: {
        bank: '',
        name: '',
        status: '',
        type: ''
      },
      currentPage: 1,
      currentPage2: 1,
      tableData: [],
      tableData2: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form1: {

      },
      editshow: false,
      bank_code: '',
      financial_ident: '',
      form: {
        channel_id: [],
        bank_id: '',
        financial_ident: '',
        cardno: '',
        accname: '',
        idno: '',
        querypwd: '',
        con_querypwd: '',
        paypwd: '',
        con_paypwd: '',
        init_balance: '',
        one_trans_min_limit: '',
        one_trans_max_limit: '',
        day_trans_max_limit: '',
        cha_broker_rate: '',
        pla_broker_rate: '',
        type: '',
        status: '',
        con_querypwd2: '',
        paypwd2: '',
        con_paypwd2: '',
        querypwd2: '',
      },
      form2: {
        cardno: '',
        accname: '',
        type: ''
      },
      list: [
        {name: '全部', type: ''},
        {name: '启用', type: '1'},
        {name: '禁用', type: '0'},
      ],
      type: [
        {name: '全部', type: ''},
        {name: '收款卡', type: '1'},
        {name: '付款卡', type: '2'},
      ],
      rules: {
        channel_id: [
          {required: true, message: '请选择对应第三方支付平台', trigger: 'change'}
        ],
        bank_id: [
          {required: true, message: '请选择银行', trigger: 'change'}
        ],
        financial_ident: [
          {required: true, message: '请输入内部识别码', trigger: 'blur'}
        ],
        cardno: [{required: true, message: '请输入银行卡号', trigger: 'blur'}],
        accname: [{required: true, message: '请输入账户名', trigger: 'blur'}],
        idno: [{required: false, message: '', trigger: 'blur'}],
        querypwd: [{required: true, validator: validatePass, trigger: 'blur'}],
        con_querypwd: [{required: true, validator: validatePass2, trigger: 'blur'}],
        paypwd: [{required: true, validator: validatePass3, trigger: 'blur'}],
        con_paypwd: [{required: true, validator: validatePass4, trigger: 'blur'}],
        querypwd2: [{required: false, message: '请输入账户密码', trigger: 'blur'}],
        con_querypwd2: [{required: false, message: '请输入确认账户密码', trigger: 'blur'}],
        paypwd2: [{required: false, message: '请输入支付密码', trigger: 'blur'}],
        con_paypwd2: [{required: false, message: '请输入确认支付密码', trigger: 'blur'}],
        init_balance: [{required: true, validator: rule, trigger: 'blur'}],
        one_trans_min_limit: [{required: true, validator: rule, trigger: 'blur'}],
        one_trans_max_limit: [{required: true, validator: rule, trigger: 'blur'}],
        day_trans_max_limit: [{required: true, validator: rule, trigger: 'blur'}],
        cha_broker_rate: [{required: true, validator: rule, trigger: 'blur'}],
        pla_broker_rate: [{required: true, validator: rule, trigger: 'blur'}],
        type: [{required: true, message: '请选择是否启用', trigger: 'change'}],
        status: [{required: true, message: '请选择银行卡类型', trigger: 'change'}],
      },
      rules2: {
        name: [
          {required: true, message: '请输入充值来源', trigger: 'blur'}
        ],
        othername: [
          {required: true, message: '请输入别名', trigger: 'blur'}
        ],
        code: [{required: true, message: '请输入商户代码', trigger: 'blur'}]
      },
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      total2: 0,
      pagesize2: 20,
      allname: [],
      payname: [],
      placeholder: '',
      key: '',
      pay_req_url: '',
      qry_order_url: '',
      wdr_req_url: '',
      time: []
    }
  },
  created() { 
    let that = this
    if (!this.bankcard.length && this.bankcard.length != 0) {
      that.formInline.type = this.bankcard.type
      that.currentPage = this.bankcard.currentPage
      that.pagesize = this.bankcard.pagesize
      that.formInline.name = this.bankcard.name
      that.formInline.bank = this.bankcard.bank
      that.formInline.status = this.bankcard.status
      getlist(that)
    }
    getallname(this)
    getpayname(this)
  },
  computed: {
    ...mapGetters([
      'paybankcardtransferrecord',
      'paybankcardbankcardlist',
      'paybankcardaddbankcard',
      'paybankcardupdatebankcard',
      'paybankcardgetpaycardinfo',
      'paybankcardupdatestatus',
      'bankcard'
    ])
  },
  methods: {
    reset (form) {
      if(this.title == '银行卡添加'){
        this.$refs.form.resetFields()
      }
      this.dialogFormVisible = false
      this.form = {
        channel_id: [],
        bank_id: '',
        financial_ident: '',
        cardno: '',
        accname: '',
        idno: '',
        querypwd: '',
        con_querypwd: '',
        paypwd: '',
        con_paypwd: '',
        init_balance: '',
        one_trans_min_limit: '',
        one_trans_max_limit: '',
        day_trans_max_limit: '',
        cha_broker_rate: '',
        pla_broker_rate: '',
        type: '',
        status: '',
        con_querypwd2: '',
        paypwd2: '',
        con_paypwd2: '',
        querypwd2: '',
      }
    },
    reset2 (form) {
      this.dialogFormVisible2 = false
      this.time = []
      this.tableData2 = []
      this.form2 = {}
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 15 && row.status === '可用') {
        return 'green'
      }
      if (columnIndex === 15 && row.status === '禁用') {
        return 'red'
      }
    },
    transfer (data) {
      this.dialogFormVisible2 = true
      let that = this
      request({
            url: that.public.url + '/paybankcard/getpaycardinfo',
            method: 'post',
            data: {
                card_id: data.id
            }
          }).then(res => {
            that.form2 = res.data[0]
            that.id = res.data[0].id
          }).catch(error => {
          })
    },
    reset1 (form) {
      this.dialogFormVisible1 = false
      this.$refs.form1.resetFields()
    },
    up(row) {
      let that = this
      this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paybankcard/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    down(row) {
      let that = this
      this.$confirm('此操作将停用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paybankcard/updatestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 0
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },
    sure1 () {
      let that = this
      request({
            url: that.public.url + '/paychannel/updatevalgread',
            method: 'post',
            data: {
                  id: this.id,
                  depict: this.form1.depict
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible1 = false
            that.form.depict = ''
            getlist(that)
          }).catch(error => {
          })
    },
    view (data) {
      this.dialogFormVisible1 = true
      let that = this
      request({
            url: that.public.url + '/paybankcard/getpaycardinfo',
            method: 'post',
            data: {
                card_id: data.id
            }
          }).then(res => {
            that.form1 = res.data[0]
            that.id = res.data[0].id
          }).catch(error => {
          })
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setbankcard = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'bank': that.formInline.bank,
        'status': that.formInline.status,
      }
      this.$store.commit('setbankcard', setbankcard)
    },
    query2 () {
      let that = this
      this.currentPage2 = 1
      getlist2(that)
    },
    edit(data) {
      this.title = '银行卡修改'
      this.editshow = true
      // this.placeholder = '不填写，默认为不修改'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/paybankcard/getpaycardinfo',
            method: 'post',
            data: {
                card_id: data.id
            }
          }).then(res => {
            that.form = res.data[0]
            if (res.data[0].status === '可用') {
              that.form.status = '1'
            } else {
              that.form.status = '0'
            }
            if (res.data[0].type === '付款卡') {
              that.form.type = '2'
            } else {
              that.form.type = '1'
            }
            that.bank_code = res.data[0].bank_code
            that.financial_ident = res.data[0].financial_ident
            that.form.channel_id = res.data[0].channel_id.split(',')
            that.id = res.data[0].id
          }).catch(error => {
          })
    },
    add () {
      this.title = '银行卡添加'
      this.placeholder = ''
      this.editshow = false
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title == '银行卡添加') {
            let channel_id = this.form.channel_id.join(',')
              request({
              url: that.public.url + '/paybankcard/addbankcard',
              method: 'post',
              data: {
                    channel_id: channel_id,
                    bank_id: this.form.bank_id,
                    financial_ident: this.form.financial_ident,
                    cardno: this.form.cardno,
                    accname: this.form.accname,
                    idno: this.form.idno,
                    querypwd: this.form.querypwd,
                    paypwd: this.form.paypwd,
                    con_paypwd: this.form.con_paypwd,
                    con_querypwd: this.form.con_querypwd,
                    init_balance: this.form.init_balance,
                    one_trans_max_limit: this.form.one_trans_max_limit,
                    one_trans_min_limit: this.form.one_trans_min_limit,
                    day_trans_max_limit: this.form.day_trans_max_limit,
                    cha_broker_rate: this.form.cha_broker_rate,
                    pla_broker_rate: this.form.pla_broker_rate,
                    type: this.form.type,
                    status: this.form.status,
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
          } else {
            let channel_id = this.form.channel_id.join(',')
            if (this.form.querypwd2 != '') {
              if (this.form.querypwd2 != this.form.con_querypwd2) {
                this.$message.error('两次的账户查询密码不一样')
                return 
              }
              this.form.querypwd = this.form.querypwd2
            }
            if (this.form.paypwd2 != '') {
              if (this.form.paypwd2 != this.form.con_paypwd2) {
                this.$message.error('两次的账户支付密码不一样')
                return 
              }
              this.form.paypwd = this.form.paypwd2
            }
            if (this.form.con_paypwd2 != '') {
              this.form.con_paypwd = this.form.con_paypwd2
            } else {
              this.form.con_paypwd = this.form.paypwd
            }
            if (this.form.con_querypwd2 != '') {
              this.form.con_querypwd = this.form.con_querypwd2
            } else {
              this.form.con_querypwd = this.form.querypwd
            }
            
              request({
              url: that.public.url + '/paybankcard/updatebankcard',
              method: 'post',
              data: {
                    channel_id: channel_id,
                    bank_id: this.form.bank_id,
                    financial_ident: this.form.financial_ident,
                    cardno: this.form.cardno,
                    accname: this.form.accname,
                    idno: this.form.idno,
                    querypwd: this.form.querypwd,
                    paypwd: this.form.paypwd,
                    con_paypwd: this.form.con_paypwd,
                    con_querypwd: this.form.con_querypwd,
                    init_balance: this.form.init_balance,
                    one_trans_max_limit: this.form.one_trans_max_limit,
                    one_trans_min_limit: this.form.one_trans_min_limit,
                    day_trans_max_limit: this.form.day_trans_max_limit,
                    cha_broker_rate: this.form.cha_broker_rate,
                    pla_broker_rate: this.form.pla_broker_rate,
                    type: this.form.type,
                    status: this.form.status,
                    id : this.id
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              that.bank_code = ''
              that.financial_ident2 =''
              getlist(that)
            }).catch(error => {
            })
          }
          
        } else {
          return false
        }
      })
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paybankcard/delpaybank',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
           getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setbankcard = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'bank': that.formInline.bank,
        'status': that.formInline.status,
      }
      this.$store.commit('setbankcard', setbankcard)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setbankcard = {
        'type': that.formInline.type,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'name': that.formInline.name,
        'bank': that.formInline.bank,
        'status': that.formInline.status,
      }
      this.$store.commit('setbankcard', setbankcard)
    },
    handleSizeChange2(val) {
      let that = this
      this.pagesize2 = val
      this.currentPage2 = 1
      getlist2(this)
    },
    handleCurrentChange2(val) {
      let that = this
      this.currentPage2 = val *1
      getlist2(this)
    }
  },
  filters: {
    status (val) {
      if (val === '1') {
        return '启用'
      }
      if (val === '0') {
        return '禁用'
      }
    },
    type (val) {
      if (val === '1') {
        return '收款卡'
      }
      if (val === '2') {
        return '付款卡'
      }
    },
  }
}

function getlist (that) {
  request({
    url: that.public.url + '/paybankcard/bankcardlist',
    method: 'post',
    data: {
      bank_id: that.formInline.bank,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      status: that.formInline.status,
      type: that.formInline.type,
      channel_id: that.formInline.name,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}


function getlist2 (that) {
  var start = ''
  var end = ''
  if (that.time && that.time.length > 0) {
    let  timestart = that.time[0].getTime() /1000
    start = parseTime(timestart)
    let timeend = that.time[1].getTime() /1000
    end = parseTime(timeend)
  }
  request({
    url: that.public.url + '/paybankcard/transferrecord',
    method: 'post',
    data: {
      card_id: that.id,
      pageno: that.currentPage2,
      pagerows: that.pagesize2,
      begin_time: start,
      end_time: end
    }
  }).then(res => {
    that.tableData2 = res.data.list
    that.total2 = res.data.rownum *1
    that.currentPage2 = res.data.pageno * 1
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

function getallname (that) {
  request({
    url: that.public.url + '/paybankcard/getpaybanklist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.allname = res.data.list
  }).catch(error => {
  })
}

function getpayname (that) {
  request({
    url: that.public.url + '/paybankcard/paychannellist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.payname = res.data
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
  .inline {
    width: 160px!important;
    display: inline-block !important;
  }
  .resetname {
    line-height: 60px;
    font-size: 20px;
    margin-left: 28px;
  }
  .inputnum {
      height: 30px!important;
      width: 100px!important;
      font-size: 10px;
  }
</style>
