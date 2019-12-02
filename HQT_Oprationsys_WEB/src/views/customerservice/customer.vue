<template>
  <div class="app-container customer">
    <div class="playerinfo">
      <div class="playergamelistquery">
        <el-form :model="ruleForm" ref="ruleForm" label-width="50px" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="玩家渠道:" label-width="73px" prop="org">
                <el-select v-model="ruleForm.org" placeholder="请选择渠道" clearable>
                    <el-option
                      v-for="(item,index) in selectchannel"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            

             <el-col :span="6">
              <el-form-item label="玩家层级:" label-width="73px" prop="playerlevel">
                <el-select v-model="ruleForm.playerlevel" placeholder="请选择玩家层级" clearable>
                    <el-option
                      v-for="(item,index) in playerlevellist"
                      :key="index"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="玩家账号:" label-width="73" prop="accountnum">
                <el-input clearable placeholder="" v-model="ruleForm.accountnum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="处理情况:" label-width="73px" prop="status">
                <el-select v-model="ruleForm.status" placeholder="">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未受理" value="0"></el-option>
                  <el-option label="已受理" value="1"></el-option>
                  <el-option label="已关闭" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
          </el-row>
          <el-row>

            
          <el-col :span="6">
              <el-form-item label="受理人员:" label-width="73" prop="user">
                <el-input clearable placeholder="" v-model="ruleForm.user"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键描述:" label-width="73" prop="question">
                <el-input clearable placeholder="" v-model="ruleForm.question"></el-input>
              </el-form-item>
            </el-col>
           
            <el-col :span="6">
              <el-form-item label="排序方式:" label-width="73px" prop="order">
                <el-select v-model="ruleForm.order" placeholder="全部">
                  <el-option label="创建时间升序" value="1"></el-option>
                  <el-option label="创建时间降序" value="2"></el-option>
                  <el-option label="受理情况" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
             <el-col :span="6">
              <el-form-item prop="checked">
                <el-checkbox v-model="ruleForm.checked"></el-checkbox>
                <span>
                  开启自动刷新，每
                  <el-input clearable placeholder="" v-model="ruleForm.miao" style="width:150px" @change="order" type='number'></el-input>
                  秒自动刷新页面
                </span>
              </el-form-item>
            </el-col>

           
            
            
            
          </el-row>
          <el-row>
             
            <el-col :span="8">
              <el-form-item label="创建时间:" prop="created" label-width="73px">
                <el-date-picker
                style="width: 360px;"
                v-model="ruleForm.created"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
             <el-col :span="10">
              <el-form-item label="受理时间:" prop="accept" label-width="73px">
                <el-date-picker
                v-model="ruleForm.accept"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            
            
            
            
            <el-col :span="2">
              <el-button class="serchbtn" type="primary" @click="query" v-if="csmmessagegetlist">搜索</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="resetForm('ruleForm')">清空筛选</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="excel" v-if="csmmessageexportgetlist">导出excel</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="pagingbox">
        <div class="paging" style="margin-top: 15px;">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pagesize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="prev, next, jumper">
          </el-pagination>
        </div>
      </div>


      <div>

    </div>
      <div id="wrapper2">
        <div id="div2"></div>
      </div>
      <el-table
        :data="tableData"
        ref="wrappertable"
        border
        style="width: 100%">
        <el-table-column
        width='160'
          label="创建时间"
          prop="create_time">
        </el-table-column>
        <el-table-column
        width='100'
          label="玩家账号"
          prop="user_loginname">
        </el-table-column>
        <el-table-column
          label="玩家渠道"
          prop="agent_org_name">
        </el-table-column>
        <el-table-column
        width='100'
          label="玩家层级"
          prop="user_level">
        </el-table-column>
        <el-table-column
        width='120'
          label="问题描述"
          prop="question">
        </el-table-column>
        <el-table-column
          label="查看附件"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)" size="small" v-if="scope.row.attach !=''">查看</el-button>
          </template>
        </el-table-column>
         <el-table-column
         width='160'
          label="受理时间"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="accept(scope.row)" size="small" v-if="scope.row.status =='未受理' && csmmessageaccept">受理</el-button>
            <span v-else>{{scope.row.accept_time}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
        width='160'
          label="受理时间"
          prop="accept_time">
        </el-table-column> -->
        <el-table-column
        width='100'
          label="受理人员"
          prop="accepter_account">
        </el-table-column>
        <el-table-column
         width='100'
          label="受理情况"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status =='未受理'"></span>
            <span v-else>{{scope.row.status}}</span>
          </template>
        </el-table-column>
         <el-table-column
         width='160'
          label="答复情况"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="email(scope.row)" size="small" v-if="scope.row.status =='已受理' && scope.row.reply_time <1 && scope.row.accepter_account == name && csmmessagesendemail">邮件</el-button>
            <span v-if="scope.row.status =='未受理' && scope.row.reply_time <1"></span>
            <span v-else>{{scope.row.reply_time}}</span>
          </template>
        </el-table-column>
       
        <el-table-column
        fixed='right'
        width='220'
          label="查看"
          prop="viewinfo">
          <template slot-scope="scope">
            <el-button type="text" @click="wj(scope.row)" size="small" v-if="csmmessagegetimpinfo && scope.row.status !='未受理' && scope.row.accepter_account == name">信息</el-button>
            <el-button @click="team(scope.row)" type="text" size="small" v-if="scope.row.status !='未受理' && scope.row.accepter_account == name">团队</el-button>
            <el-button type="text" size="small" @click="zb(scope.row)" v-if="scope.row.status !='未受理' && scope.row.accepter_account == name">账变</el-button>
            <el-button type="text" size="small" @click="tax(scope.row)" v-if="fundchangeagentfundlinklist && scope.row.status !='未受理' && scope.row.accepter_account == name">税收</el-button>
            <el-button type="text" size="small" @click="record(scope.row)" v-if="scope.row.status !='未受理' && scope.row.accepter_account == name && csmmessagegetinfolist">记录</el-button>
          </template>
        </el-table-column>
        <el-table-column
        fixed='right'
        width='380'
          label="操作" class="operate">
          <template slot-scope="scope">
            <!--冻结-->
            <el-button type="text" @click="dj(scope.row)" size="small" v-if="scope.row.freeze==='1' && csmmessagefrozeuser && scope.row.status !='未受理' && scope.row.accepter_account == name">
              冻结
            </el-button>
            <el-button type='primary' @click="jd(scope.row)" size="small" v-if="scope.row.freeze==='2' && csmmessagefrozeuser && scope.row.status !='未受理' && scope.row.accepter_account == name">
              解冻
            </el-button>
            <!--人工充值-->
            <el-button type="text" @click="rgcz(scope.row)" size="small" v-if="csmmessageaddmoney && scope.row.status !='未受理' && scope.row.accepter_account == name">
              充值
            </el-button>
            <!--提现-->
            <el-button type="text" @click="tx(scope.row)" size="small" v-if="csmmessagesubmoney && scope.row.status !='未受理' && scope.row.accepter_account == name">
              扣减
            </el-button>
            <el-button type="text" @click="phone(scope.row)" size="small" v-if="csmmessagedelbind && scope.row.status !='未受理' && scope.row.accepter_account == name">
              手机
            </el-button>
             <el-button type="text" @click="card(scope.row)" size="small" v-if="csmmessagebankunbind && scope.row.status !='未受理' && scope.row.accepter_account == name">
              银行卡
            </el-button>
            <el-button type="text" @click="password(scope.row)" size="small" v-if="csmmessagemodifypwd && scope.row.status !='未受理' && scope.row.accepter_account == name">
              密码
            </el-button>
            
             <el-button type="text" @click="zdl(scope.row)" size="small" v-if="scope.row.type !='2' && csmmessagechangeuseragent && scope.row.status !='未受理' && scope.row.accepter_account == name">
              转代理
            </el-button>
            <el-button type="text" size="small" @click="bz(scope.row)" v-if="csmmessagecreateremark && scope.row.status !='未受理' && scope.row.accepter_account == name">备注</el-button>
          </template>
        </el-table-column>
      <el-table-column
        fixed='right'
        width='100'
        label="玩家备注">
        <template slot-scope="scope">
          <el-popover trigger='hover' placement='top'>
            <span>{{scope.row.user_remark}}</span>
            <div slot="reference" class="name-wrapper">
              <span>{{scope.row.user_remark.length > 4 ? scope.row.user_remark.substring(0,4) : scope.row.user_remark}}</span>
            </div>
          </el-popover>
          
        </template>
      </el-table-column>
        <el-table-column
        fixed='right'
        width='160'
        label="问题备注">
        <template slot-scope="scope">
          <el-popover trigger='hover' placement='top'>
            <span>{{scope.row.remark}}</span>
            <div slot="reference" class="name-wrapper">
              <span v-if="scope.row.inputshow">
              <el-input v-model="scope.row.remark"></el-input>
              <el-row style="margin-top:5px;">
                <el-button type="primary" size='mini' @click="remarksure(scope.row)">确 定</el-button>
                <el-button type="primary" size='mini' @click="remarkqx(scope.row)">取消</el-button>
              </el-row>
            </span>
            
            <span v-else>{{scope.row.remark.length > 4 ? scope.row.remark.substring(0,4) : scope.row.remark}}</span>
            </div>
          </el-popover>
          
        </template>
      </el-table-column>
      </el-table>
      <div class="pagingbox">
        <div class="paging">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pagesize"
            :page-sizes="[20,50,200]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="人工扣减" :visible.sync="dialogFormVisible4" :before-close="reset4">
              <el-form :model="form4" :rules="rules4" ref="form4">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家账号:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="玩家层级:" :label-width="formLabelWidth">
                  <span>{{gameuser.level}}</span>
                </el-form-item>
                <el-form-item label="可用余额:" :label-width="formLabelWidth">
                  <span>{{gameuser.balance}}</span>
                </el-form-item>
                <el-form-item label="扣减金额:" :label-width="formLabelWidth" prop="money">
                  <el-input v-model="form4.money" type='number' @change="NumberToChinese(form4.money)"></el-input>
                </el-form-item>
                  <el-form-item label="大写:" :label-width="formLabelWidth">
                    <span>{{text}}</span>
                  </el-form-item>
                <el-form-item label="提现类型（玩家）:" label-width="170px" prop="pay">
                  <div>
                    <el-radio v-model="form4.pay" label="50" size="mini">人工提现</el-radio>
                  </div>
                </el-form-item>
                <el-form-item label="提现类型（代理）:" label-width="170px" prop="pay"  v-if="czshow">
                  <el-radio v-model="form4.pay" label="53" size="mini">管理员扣减</el-radio>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
                  <el-input v-model="form4.remark"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset4(form)">取 消</el-button>
                <el-button type="primary" @click="sure4(form)">确 定</el-button>
              </div>
            </el-dialog>
             <el-dialog title="二次确认" :visible.sync="dialogFormVisible10">
              <el-form>
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家账号:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="玩家层级:" :label-width="formLabelWidth">
                  <span>{{gameuser.level}}</span>
                </el-form-item>
                <el-form-item label="可用余额:" :label-width="formLabelWidth">
                  <span>{{gameuser.balance}}</span>
                </el-form-item>
                <el-form-item label="扣减金额:" :label-width="formLabelWidth">
                  <span class="red">{{form4.money}}</span>
                  <!-- <el-input v-model="form4.money" type='number' @change="NumberToChinese(form4.money)"></el-input> -->
                </el-form-item>
                  <el-form-item label="大写:" :label-width="formLabelWidth">
                    <span>{{text}}</span>
                  </el-form-item>
                <el-form-item label="提现类型:" :label-width="formLabelWidth">
                   <span>{{form10.pay}}</span>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
                  <span>{{form4.remark}}</span>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure10(form)">确 定</el-button>
                <el-button @click="reset10(form)">返回玩家列表</el-button>
              </div>
            </el-dialog>
      <el-dialog title="人工充值" :visible.sync="dialogFormVisible3" :before-close="reset3">
              <el-form :model="form3" :rules="rules3" ref="form3">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家账号:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="玩家层级:" :label-width="formLabelWidth">
                  <span>{{gameuser.level}}</span>
                </el-form-item>
                <el-form-item label="可用余额:" :label-width="formLabelWidth">
                  <span>{{gameuser.balance}}</span>
                </el-form-item>
                <el-form-item label="充值金额:" :label-width="formLabelWidth" prop="money">
                  <el-input v-model="form3.money"  @change="NumberToChinese(form3.money)" type="number" :value="mynum" @blur="numchange(form3.money)"></el-input>
                </el-form-item>
                <el-form-item label="大写:" :label-width="formLabelWidth">
                  <span>{{text}}</span>
                </el-form-item>
                <el-form-item label="充值类型（玩家）:" label-width="170px" prop="pay">
                  <div>
                    <el-radio v-model="form3.pay" label="13" size="mini">理赔</el-radio>
                    <el-radio v-model="form3.pay" label="12" size="mini">活动奖金</el-radio>
                    <el-radio v-model="form3.pay" label="16" size="mini">返手续费</el-radio>
                    <el-radio v-model="form3.pay" label="14" size="mini">其他</el-radio>
                  </div>
                </el-form-item>
                <el-form-item label="充值类型（代理）:" label-width="170px" prop="pay" v-if="czshow">
                  <el-radio v-model="form3.pay" label="18" size="mini">代理扶持</el-radio>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
                  <el-input v-model="form3.remark" clearable></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset3(form)">取 消</el-button>
                <el-button type="primary" @click="sure3(form)">确 定</el-button>
              </div>
            </el-dialog>
     
      <el-dialog title="玩家详细信息" :visible.sync="dialogFormVisible" :before-close="reset">
            


                <!-- <el-tab-pane label="银行卡" name="">
                 
                </el-tab-pane> -->

                <!-- <el-tab-pane label="玩家详细资料"> -->
                  <div>
                    <el-form>

                      <el-form-item label="玩家账号:" :label-width="formLabelWidth" class="positionside">
                        <span>{{userdatainfo.login_name}}</span>
                      </el-form-item>
                      <el-form-item label="玩家层级:" :label-width="formLabelWidth" class="positionside">
                        <span>{{userdatainfo.level}}</span>
                      </el-form-item>
                      <el-form-item label="账户余额:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.balance}}</span>
                      </el-form-item>
                      <el-form-item label="保险箱存款:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.deposit}}</span>
                      </el-form-item>
                      <el-form-item label="绑定手机:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.mobile}}</span>
                      </el-form-item>
                      <el-form-item label="绑定邮箱:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.email}}</span>
                      </el-form-item>
                      <el-form-item label="所属渠道:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.org_name}}</span>
                      </el-form-item>
                      <el-form-item label="登录设备:" :label-width="formLabelWidth" prop="name">
                        <span>{{userdatainfo.device_id}}</span>
                      </el-form-item>
                     
                      <el-form-item label="注册时间:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.reg_time}}</span>
                      </el-form-item>
                      <!-- <el-form-item label="注册ip:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.last_login_ip}}</span>
                      </el-form-item> -->
                      <el-form-item label="登录时间:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.last_login_time}}</span>
                      </el-form-item>
                      <el-form-item label="登录IP:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.last_login_ip}}</span>
                      </el-form-item>
                      
                       <el-form-item label="所属总代:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.agent_name}}</span>
                      </el-form-item>
                      <el-form-item label="上级代理:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.agent_account_name}}</span>
                      </el-form-item>
                      <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.name}}</span>
                      </el-form-item>
                      
                      <el-form-item label="用户ID:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.uid}}</span>
                      </el-form-item>
                      <el-form-item label="性别:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.sex | sex}}</span>
                      </el-form-item>
                      <el-form-item label="vip等级:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.vip}}</span>
                      </el-form-item>
                    </el-form>
                  </div>
                <!-- </el-tab-pane>
              </el-tabs> -->
              <div style="text-align: right;">
                <el-button type="primary" @click="reset(form)">关闭</el-button>
                <!-- <el-button type="primary" @click="sure(form)">确 定</el-button> -->
              </div>
            </el-dialog>

             <el-dialog title="冻结玩家" :visible.sync="dialogFormVisible2" :before-close="reset2">
              <el-form :model="form2" :rules="rules2" ref="form2">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家名称:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="冻结范围:" :label-width="formLabelWidth" prop="radio1">
                  <div>
                    <el-radio v-model="form2.radio1" label="1" size="mini">仅冻结此玩家，不冻结其下级</el-radio>
                    <el-radio v-model="form2.radio1" label="2" size="mini">冻结此玩家和所有下级</el-radio>
                  </div>
                </el-form-item>
                <el-form-item label="冻结方式:" :label-width="formLabelWidth">
                  <p style="margin:0;padding:0">完全冻结 <span style="color:rgb(153,153,153);font-size: 14px;">(不可登录，不可投注，不可充提)</span>
                  </p>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset2(form)">取 消</el-button>
                <el-button type="primary" @click="sure2(form)">确 定</el-button>
              </div>
            </el-dialog>
             <el-dialog title="解冻玩家" :visible.sync="dialogFormVisible7" :before-close="reset7">
              <el-form :model="form7" :rules="rules7" ref="form7">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家名称:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="解冻范围:" :label-width="formLabelWidth" prop="radio1">
                  <div>
                    <el-radio v-model="form7.radio1" label="3" size="mini">仅解冻此玩家，不解冻其下级</el-radio>
                    <el-radio v-model="form7.radio1" label="4" size="mini">解冻此玩家和所有下级</el-radio>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset7(form)">取 消</el-button>
                <el-button type="primary" @click="sure7(form)">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="转代理" :visible.sync="dialogFormVisible8" :before-close="reset8">
              <el-form :model="form8" :rules="rules8" ref="form8">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="玩家账号:" :label-width="formLabelWidth">
                  <span>{{gameuser.login_name}}</span>
                </el-form-item>
                <el-form-item label="目前代理线:" :label-width="formLabelWidth">
                  <div class="parenti" v-for="(item,key) in agentline" :key="key">
                    <span>{{item.name}}</span>
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </el-form-item>
                <el-form-item label="转移上级:" :label-width="formLabelWidth" prop="radio1">
                  <div>
                    <el-radio v-model="form8.radio1" label="1" size="mini" v-if="zdflag">成为总代</el-radio>
                    <el-radio v-model="form8.radio1" label="2" size="mini">换上级</el-radio>
                    <el-radio v-model="form8.radio1" label="3" size="mini">成为代理</el-radio><br/>
                    <el-input  v-model="form8.desc" v-if='upshow' placeholder='请输入转换到的上级账号'></el-input>
                    <span v-if="upshow2 && zdflag">玩家抽水的</span><el-input v-model="form8.top" type="number" style="width: 30%;" v-if="upshow2 && zdflag"></el-input><span v-if="upshow2 && zdflag">%</span>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset8(form)">取 消</el-button>
                <el-button type="primary" @click="sure8(form)">确 定</el-button>
              </div>
            </el-dialog>

             <el-dialog title="二次确认：" :visible.sync="dialogFormVisible9" :before-close="reset9">
              <el-form>
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <p>本次操作内容，如下：</p>
                <el-table
                    :data="datalist"
                    border>
                    <el-table-column
                      label="操作"
                      prop="status">
                    </el-table-column>
                    <el-table-column
                      label="转移上级"
                      >
                      <template slot-scope="scope">
                        <div class="parenti" v-for="(item,key) in scope.row.up" :key="key">
                          <span>{{item}}</span>
                          <i class="el-icon-d-arrow-right"></i>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="层级"
                      prop="level">
                    </el-table-column>
                  </el-table>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset9(form)">取 消</el-button>
                <el-button type="primary" @click="sure9(form)">确 定</el-button>
              </div>
            </el-dialog>


            <el-dialog title='新邮件'  :visible.sync="dialogFormVisible11">
              <el-form :model="form11" :rules="rules11" ref="form11">
                <el-form-item label="玩家渠道" :label-width="formLabelWidth" prop="org">
                 <span>{{form11.org}}</span>
                </el-form-item>
                <el-form-item label="收件人" :label-width="formLabelWidth" prop="name">
                 <span>{{form11.name}}</span>
                </el-form-item>
                <el-form-item label="主题" :label-width="formLabelWidth" prop="desc">
                  <el-input v-model="form11.desc" clearable></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                  <el-input v-model="form11.content" type="textarea"  class="texthight" clearable></el-input>
                </el-form-item>
                <el-form-item label="快速答复" :label-width="formLabelWidth" prop="answer">
                <el-select v-model="form11.answer" filterable style="width:100%;" clearable>
                  <el-option
                    v-for="(item,key) in answerlist"
                    :key="key"
                    :label="item.content"
                    :value="item.content">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset11(form)">取 消</el-button>
                <el-button type="primary" @click="sure11(form)">确 定</el-button>
              </div>

            </el-dialog>


            <el-dialog title='手机邮箱'  :visible.sync="dialogFormVisible12">
              <el-form>
                  <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                    <span>{{gameuser.org_name}}</span>
                  </el-form-item>
                  <el-form-item label="玩家名:" :label-width="formLabelWidth">
                    <span>{{gameuser.login_name}}</span>
                  </el-form-item>
                  <el-form-item label="昵称:" :label-width="formLabelWidth">
                    <span>{{gameuser.nickname}}</span>
                  </el-form-item>
                  <el-form-item label="已绑定手机号:" :label-width="formLabelWidth">
                    <span>{{gameuser.mobile}}</span> <span><el-button  size="small" @click="delbind('1')" v-if="gameuser.mobile" style="margin-left: 58px;">删除</el-button></span>
                  </el-form-item>
                  <el-form-item label="已绑定邮箱:" :label-width="formLabelWidth">
                    <span>{{gameuser.email}}</span> <span><el-button  size="small" @click="delbind('2')" v-if="gameuser.email" style="margin-left: 58px;">删除</el-button></span>
                  </el-form-item>
            </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reset12(form)">关 闭</el-button>
              </div>

            </el-dialog>

              <el-dialog title='银行卡'  :visible.sync="dialogFormVisible13">
                 <el-table
                    :data="tableDatamessage"
                    :cell-class-name='cell'
                    border>
                    <el-table-column
                      label="状态"
                      prop="status">
                    </el-table-column>
                    <el-table-column
                      label="玩家渠道"
                      prop="user_org_name">
                    </el-table-column>
                    <el-table-column
                      label="玩家名"
                      prop="user_account">
                    </el-table-column>
                    <el-table-column
                      label="开户人姓名"
                      prop="cardholder">
                    </el-table-column>
                    <el-table-column
                      label="银行账号"
                      prop="cardno">
                    </el-table-column>
                    <el-table-column
                      label="银行名称"
                      prop="bankname">
                    </el-table-column>
                    <el-table-column
                      label="省份"
                      prop="province">
                    </el-table-column>
                    <el-table-column
                      label="城市"
                      prop="city">
                    </el-table-column>
                    <el-table-column
                      label="支行名称"
                      prop="branchname">
                    </el-table-column>
                    <el-table-column
                      width='160'
                      label="绑定时间"
                      prop="bindtime">
                    </el-table-column>
                    <el-table-column
                      label="操作" class="operate">
                      <template slot-scope="scope">
                        <el-button @click="fc(scope.row)" type="text" size="small" style="margin-left:10px">银行反查</el-button>
                        <el-button @click="cacelcard(scope.row)" type="text" size="small" v-if="gameuserbankunbind && scope.row.status !='已取消绑定'">取消绑定</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reset13(form)">关 闭</el-button>
              </div>

            </el-dialog>

              <el-dialog title=''  :visible.sync="dialogFormVisible14" :before-close="reset14">
                   <el-tabs type="card"  style="height:auto;width:100%" v-model="activeName2">
                <el-tab-pane label="重置登录密码" name="first" v-if="gameuserresetpassword">
                  <el-form :model="form1" :rules="pwdrules" ref="form1">

                    <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                      <span>{{gameuser.org_name}}</span>
                    </el-form-item>
                    <el-form-item label="玩家名:" :label-width="formLabelWidth">
                      <span>{{gameuser.login_name}}</span>
                    </el-form-item>
                    <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name">
                      <span>{{gameuser.nickname}}</span>
                    </el-form-item>
                    <el-form-item label="登录密码" :label-width="formLabelWidth" prop="code">
                      <el-input type="password" v-model="form1.code"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认" :label-width="formLabelWidth" prop="recode">
                      <el-input type="password"  v-model="form1.recode"></el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane label="重置资金密码" name="second"  v-if="gameuserresetpassword">
                  <el-form :model="form5" :rules="swdrules" ref="form5">

                    <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                      <span>{{gameuser.org_name}}</span>
                    </el-form-item>
                    <el-form-item label="玩家名:" :label-width="formLabelWidth">
                      <span>{{gameuser.login_name}}</span>
                    </el-form-item>
                    <el-form-item label="昵称:" :label-width="formLabelWidth">
                      <span>{{gameuser.nickname}}</span>
                    </el-form-item>
                    <el-form-item label="资金密码" :label-width="formLabelWidth"  prop="safecode">
                      <el-input type="password"  v-model="form5.safecode"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认" :label-width="formLabelWidth" prop="resafecode">
                      <el-input type="password"  v-model="form5.resafecode"></el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                   </el-tabs>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure(form)">确 认</el-button>
                <el-button type="primary" @click="reset14(form)">关闭</el-button>
              </div>

            </el-dialog>


               <el-dialog title='历史记录'  :visible.sync="dialogFormVisible15">
                 <h4>玩家账号：<span>{{username}}</span></h4>
                 <el-table
                    :data="historydate"
                    border>
                    <el-table-column
                    width='160'
                      label="创建时间"
                      prop="create_time">
                    </el-table-column>
                    <el-table-column
                      label="问题描述"
                      prop="question">
                    </el-table-column>
                    <!-- <el-table-column
                      label="查看附件"
                      prop="attach">
                    </el-table-column> -->
                    <el-table-column
                      label="查看附件"
                    >
                      <template slot-scope="scope">
                        <el-button type="text" @click="view2(scope.row)" size="small" v-if="scope.row.attach !=''">查看</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="受理人员"
                      prop="accepter_account">
                    </el-table-column>
                    <el-table-column
                      label="受理时间"
                       width='160'
                      prop="accept_time">
                    </el-table-column>
                    <el-table-column
                      label="答复情况"
                      width='160'
                      prop="reply_time">
                    </el-table-column>
                    <el-table-column
                      label="问题备注"
                      prop="remark">
                    </el-table-column>
                  </el-table>
                 <div class="pagingbox">
                  <div class="paging">
                    <el-pagination
                      @size-change="handleSizeChange15"
                      @current-change="handleCurrentChange15"
                      :current-page.sync="currentPage15"
                      :page-sizes="[20,50,200]"
                      :page-size="pagesize15"
                      background
                      layout="sizes, prev, pager, next, jumper"
                      :total="total15">
                    </el-pagination>
                  </div>
                </div>
              <div slot="footer" class="dialog-footer" style="margin-top: 50px;">
                <el-button type="primary" @click="reset15(form)">关 闭</el-button>
              </div>

            </el-dialog>


            
  <el-dialog title='查看附件'  :visible.sync="dialogFormVisible16">
    <img :src="imgsrc" style="width:100%">
    
    <el-button @click="reset16()" type="primary">关 闭</el-button> 
  </el-dialog>


  <el-dialog title='查看附件'  :visible.sync="dialogFormVisible17">
    <img :src="imgsrc2" style="width:100%">
    
    <el-button @click="reset17()" type="primary">关 闭</el-button> 
  </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapState} from 'vuex'
  import request from '../../utils/request'
  import { validatNumber } from '@/utils/validate'

  export default {
    name: "customer",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.form1.code !== this.form1.recode) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }

      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.form5.safecode !== this.form5.resafecode) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }
      var moneyrule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('充值金额不能为空'));
        } else {
          if (value*1 < 0) {
            this.text = ''
            callback(new Error('输入的值不能小于0'));
          } else {
            var integer = /^[1-9]\d*$|^[1-9]\d*\.\d\d?$|^0\.\d\d?$/ //金额保留两位小数
            if(integer.test(value) || value == '0') {
              callback();
            } else {
              this.text = ''
              callback(new Error('小数点后最大输入两位数字'));
            }
          }
        }
      }
    return {
      mynum:'',
      selectchannel:[],
      buttonshow: true,
      orgid: '',
      nav: [],
      upshow: false,
      upshow2: false,
      playerlevellist: [],
      username: '',
      historydate: [],
      total15: 0,
      pagesize15: 20,
      currentPage15: 1,
      rules2: {
        radio1: [
          {required: true, message: '请选择冻结范围', trigger: 'change'},
        ]
      },
      rules7: {
        radio1: [
          {required: true, message: '请选择冻结范围', trigger: 'change'},
        ]
      },
      rules8: {
        radio1: [
          {required: true, message: '请选择转移上级', trigger: 'change'},
        ]
      },
      rules3:{
        money:[
          {required: true, validator: moneyrule, trigger: 'blur'},
        ],
        pay:[
          {required: true, message: '请选择玩家类型',trigger: 'change'},
        ],
        remark:[
          {required: false, message: '', trigger: 'blur'},
        ]
      },
      rules4:{
        money:[
          {required: true, validator: moneyrule, trigger: 'blur'},
        ],
        pay:[
          {required: true, message: '请选择玩家类型',trigger: 'change'},
        ],
        remark:[
          {required: false, message: '', trigger: 'blur'},
        ]
      },
      rules6:{
        upname:[
          {required: true, message: '请输入上级代理', trigger: 'blur'},
        ],
        name:[
          {required: true, message: '请输入玩家账号',trigger: 'blur'},
        ],
        radio6:[
          {required: true, message: '请选择修改类型', trigger: 'change'},
        ]
      },
      rules11:{
        desc:[
          {required: true, message: '请输入主题', trigger: 'blur'},
          {min: 0, max: 16, message: '长度在16个字段之内', trigger: 'blur'}
        ],
        content:[
          {required: true, message: '请输入内容',trigger: 'blur'},
          {min: 0, max: 500, message: '内容在500个字段之内', trigger: 'blur'}
        ],
        answer: [{required: false, message: '', trigger: 'change'},]
      },
      text:'',
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      formLabelWidth: '120px',
      form1: {
        code: '',
        recode: ''
      },
      form5: {
        safecode: '',
        resafecode: ''
      },
      ruleForm: {
        org: '',
        playerlevel: '',
        accountnum: '',
        status: '',
        user: '',
        question: '',
        created: [],
        accept: [],
        order: '1',
        miao: '30',
        checked:true
      },
      status: [
        {name: '已撤单', id: '1'},
        {name: '未撤单', id: '2'},
        {name: '已结算', id: '3'},
        {name: '未结算', id: '4'},
        {name: '已开奖', id: '5'},
        {name: '未开奖', id: '6'}
      ],
      total: 0,
      pagesize: 20,
      id: '',
      currentPage: 1,
      tableData: [
      ],
      tableDatamessage: [
      ],
      userid:'',
      rules: {
        org: [
          {required: false, message: '', trigger: 'change'},
        ],
        playerlevel: [
          {required: false, message: '', trigger: 'change'},
        ],
        accountnum: [
          {required: false, message: '', trigger: 'blur'},
        ],
        status: [
          {required: false, message: '', trigger: 'change'},
        ],
        user: [
          {required: false, message: '', trigger: 'blur'}
        ],
        question: [
          {required: false, message: '', trigger: 'blur'}
        ],
        created: [
          {required: false, message: '', trigger: 'change'}
        ],
        accept: [
          {required: false, message: '', trigger: 'change'}
        ],
        order: [
          {required: false, message: '', trigger: 'change'}
        ],
        checked: [
          {required: false, message: '', trigger: 'change'}
        ]
      },
      pwdrules: {
        code: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 6, max: 12, message: '长度在6到12个字符之间', trigger: 'blur'}
        ],
        recode: [
          {required: true, validator: validatePass2, trigger: 'blur'},
          {min: 6, max: 12, message: '长度在6到12个字符之间', trigger: 'blur'}
        ],
      },
      swdrules: {
        safecode: [
          {required: true, validator: validatePass3, trigger: 'blur'},
          {min: 6, max: 6, message: '请输入6位资金密码', trigger: 'blur'}
        ],
        resafecode: [
          {required: true, validator: validatePass4, trigger: 'blur'},
          {min: 6, max: 6, message: '请输入6位资金密码', trigger: 'blur'}
        ]
      },
      channel: '',
      options6: [],
      props1: {
        value: 'user_id',
        label: 'login_name',
        isLeaf: 'isLeaf'
      },
      activeName2: 'first',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogFormVisible2: false,
      dialogFormVisible7: false,
      dialogFormVisible8: false,
      dialogFormVisible9: false,
      dialogFormVisible11: false,
      dialogFormVisible16: false,
      form11: {
        org: '',
        name: '',
        desc: '',
        content: '',
        answer: ''
      },
      answerlist: [],
      form2: {
        radio1: ''
      },
      form7: {
        radio1: ''
      },
      form8: {
         radio1: '',
         desc: '',
         top: ''
      },
      dialogFormVisible3: false,
      form3: {
        remark: '',
        money:'',
        pay:''
      },
      dialogFormVisible4: false,
      dialogFormVisible10: false,
      form4: {
        pay: '',
        remark: '',
        money:''
      },
      form10: {
        pay: '',
      },
      gameuser: {},
      userdatainfo: {},
      agentline: [],
      dlshow: false,
      czshow: false,
      datalist: [],
      zdflag: true,
      dialogFormVisible12: false,
      dialogFormVisible13: false,
      dialogFormVisible14: false,
      dialogFormVisible15: false,
      timer:null,
      num: 30,
      imgsrc: '',
      imgsrc2: '',
      dialogFormVisible17: false
    }
  },
    created(){
      getplayergamechannel(this)
      getplayerlevellist(this)
      let that = this
      this.order()
      if (!this.customer.length && this.customer.length != 0) {
        that.ruleForm.miao = this.customer.miao
        that.ruleForm.checked = this.customer.checked
        that.currentPage = this.customer.currentPage
        that.pagesize = this.customer.pagesize
        that.ruleForm.org = this.customer.org
        that.ruleForm.playerlevel = this.customer.playerlevel
        that.ruleForm.accountnum = this.customer.accountnum
        that.ruleForm.status = this.customer.status
        that.ruleForm.user = this.customer.user
        that.ruleForm.question = this.customer.question
        that.ruleForm.created = this.customer.created
        that.ruleForm.accept = this.customer.accept
        that.ruleForm.order = this.customer.order
        playergamelist(that)
      }
    },
    mounted () {
      let dom = this.$refs.wrappertable.$refs.bodyWrapper
      let wrapper2 = document.getElementById('wrapper2')
      dom.addEventListener('scroll', this.handlescroll, true)
      wrapper2.addEventListener('scroll', this.handlescroll2, true)
    },
    beforeDestroy(){
      let dom = this.$refs.wrappertable.$refs.bodyWrapper
      let wrapper1 = document.getElementById('wrapper1')
      if(dom){
         dom.removeEventListener('scroll',this.handlescroll)
        wrapper1.removeEventListener('scroll',this.handlescroll2)
      }   
    },
    // destroyed() {
    //   let dom = this.$refs.wrappertable.$refs.bodyWrapper
    //   let wrapper2 = document.getElementById('wrapper2')
    //   dom.removeEventListener('scroll',this.handlescroll)
    //   wrapper2.removeEventListener('scroll',this.handlescroll2)
    // },
    watch:{
      'form8.radio1': function (val) {
        if (val === '2') {
          this.upshow = true
        } else {
          this.upshow = false
        }
        if (val === '1') {
          this.upshow2 = true
        } else {
          this.upshow2 = false
        }
      },
      'ruleForm.checked': function(val) {
        if (!val) {
          window.clearInterval(this.timer)
          this.ruleForm.miao = ''
          this.num = ''
        }
      },
      'form11.answer': function (val) {
        if (val) {
          this.form11.content = val
          this.answerlist.map(item => {
            if (item.content == val) {
              this.form11.desc = item.title
            }
          })
        }
      }
    },
    computed: {
    ...mapGetters([
        'customer',
        'gameuserresetpassword',
        'csmmessagefrozeuser',
        'csmmessagegetimpinfo',
        'csmmessageaddmoney',
        'csmmessagesubmoney',
        'csmmessagedelbind',
        'csmmessagemodifypwd',
        'csmmessagebankunbind',
        'gameuserbankunbind',
        'fundchangeagentfundlinklist',
        'csmmessagechangeuseragent',
        'name',
        'csmmessagegetlist',
        'csmmessageexportgetlist',
        'csmmessagesendemail',
        'csmmessagegetinfolist',
        'csmmessagecreateremark',
        'csmmessageaccept'
      ])
    },
    filters: {
      sex (val) {
        if (val === '1') {
          return '男'
        }
        if (val === '2') {
          return '女'
        }
      },
      type (val) {
        if (val === '1') {
          return '会员'
        }
        if (val === '2') {
          return '游客'
        }
      },
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
      team(row) {
        this.$router.push({path: '/analysisdatamgr/agentteam',query:{org:row.agent_org_id,name:row.user_loginname}})
      },
      handlescroll(e) {
        if (this.$refs.wrappertable) {
          let dom = this.$refs.wrappertable.$refs.bodyWrapper
          let wrapper2 = document.getElementById('wrapper2')
          let domleft = this.$refs.wrappertable.$refs.bodyWrapper.scrollLeft
          let wrapper2left = document.getElementById('wrapper2').scrollLeft
          wrapper2.scrollTo(domleft,0)
        }
      },
      handlescroll2() {
        if (this.$refs.wrappertable) {
          let dom = this.$refs.wrappertable.$refs.bodyWrapper
          let wrapper2 = document.getElementById('wrapper2')
          let domleft = this.$refs.wrappertable.$refs.bodyWrapper.scrollLeft
          let wrapper2left = document.getElementById('wrapper2').scrollLeft
          dom.scrollTo(wrapper2left,0)
        }
      },
      view (row) {
        this.imgsrc = row.attach
        this.dialogFormVisible16 = true
      },
      view2 (row) {
        this.imgsrc2 = row.attach
        this.dialogFormVisible17 = true
      },
      beforeDestroy () {
        clearInterval(this.timer)
        this.timer = null
      },
      handleSizeChange15(val) {
        this.pagesize15 = val
        this.currentPage15 = 1
        let that = this
         request({
            url:that.public.url + '/csmmessage/getinfolist',
            method:'post',
            data:{
              user_id: that.userid,
              pageno: that.currentPage15,
              pagerows: that.pagesize15,
            }
          }).then(res => {
            that.historydate = res.data.list
            that.total15 = res.data.rownum * 1
            that.currentPage15 = res.data.pageno * 1
          }).catch(error => {
          })
      },
      handleCurrentChange15(val) {
        this.currentPage15 = val * 1
        let that = this
        request({
            url:that.public.url + '/csmmessage/getinfolist',
            method:'post',
            data:{
              user_id: that.userid,
              pageno: that.currentPage15,
              pagerows: that.pagesize15,
            }
          }).then(res => {
            that.historydate = res.data.list
            that.total15 = res.data.rownum * 1
            that.currentPage15 = res.data.pageno * 1
          }).catch(error => {
          })
      },
      accept (row) {
        let that = this
        request({
            url:that.public.url + '/csmmessage/accept',
            method:'post',
            data:{
              id: row.id
            }
          }).then(res => {
            that.$message.success(res.message)
            playergamelist(that)
          }).catch(error => {
          })
      },
      email (row) {
        this.form11.org = row.agent_org_name
        this.form11.name = row.user_loginname
        this.dialogFormVisible11 = true
        this.userid = row.user_id
        getanswerlist(this)
      },
      rendercontent (h,{node,data,store}) {
        let num = node.label + '('+ data.sum +')'
        return (
          <span class='custom-tree-node'>
            <span>{num}</span>
          </span>
        )
      },
      ct () {
        this.$router.push({path: '/analysisdatamgr/rushtoask'})
      },
      zb (row) {
        this.$router.push({path: '/analysisdatamgr/gameuserchg',query:{user: row.user_loginname}})
      },
      znx () {
        this.$router.push({path: '/gamemsgmgr/mail'})
      },
      fc (row) {
        this.$router.push({path: '/gameusermgr/recharge', query: {org: this.gameuser.agent_org_id, user: row.user_account}})
      },
      tx (row) {
        let that = this
        if (row.is_agent==='1') {
          this.czshow = true
        } else {
          this.czshow = false
        }
        this.dialogFormVisible4 = true
        this.userid = row.user_id
        request({
            url:that.public.url + '/gameuser/userdetailinfo',
            method:'post',
            data:{
              user_id: that.userid
            }
          }).then(res => {
            that.gameuser = res.data
          }).catch(error => {
          })
        // getuserinfo(that)
      },
      phone  (row) {
        this.userid = row.user_id
        this.dialogFormVisible12 = true
        getuserinfo(this)
      },
      card (row) {
        this.userid = row.user_id
        this.dialogFormVisible13 = true
        bankcard(this)
      },
      password (row) {
        this.userid = row.user_id
        this.activeName2 = 'first'
        this.dialogFormVisible14 = true
        getuserinfo(this)
      },
      bz (row) {
        row.inputshow = true
      },
      remarkqx (row) {
        row.inputshow = false
        row.remark = ''
        playergamelist(this)
      },
      remarksure (row) {
        let that = this
        request({
            url:that.public.url + '/csmmessage/createremark',
            method:'post',
            data:{
              id: row.id,
              remark: row.remark
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            row.inputshow = false
            row.remark = ''
            playergamelist(that)
          }).catch(error => {
          })
      },
      rgcz (row) {
        let that = this
        if (row.is_agent==='1') {
          this.czshow = true
        } else {
          this.czshow = false
        }
        this.dialogFormVisible3 = true
        this.userid = row.user_id
        // getuserinfo(that)
        request({
            url:that.public.url + '/gameuser/userdetailinfo',
            method:'post',
            data:{
              user_id: that.userid
            }
          }).then(res => {
            that.gameuser = res.data
          }).catch(error => {
          })
      },
      tax (row) {
        this.$router.push({path: '/analysisdatamgr/agentmoney',query:{'id':row.agent_org_id, 'name': row.user_loginname, 'type': '21'}})
      },
      record (row) {
        let that = this
        this.username = row.user_loginname
        this.userid = row.user_id
        this.dialogFormVisible15 = true
        request({
            url:that.public.url + '/csmmessage/getinfolist',
            method:'post',
            data:{
              user_id: that.userid,
              pageno: that.currentPage15,
              pagerows: that.pagesize15,
            }
          }).then(res => {
            that.historydate = res.data.list
            that.total15 = res.data.rownum * 1
            that.currentPage15 = res.data.pageno * 1
          }).catch(error => {
          })
      },
      dj (row) {
        let that = this
        this.dialogFormVisible2 = true
        this.userid = row.user_id
        getuserinfo(that)
      },
      jd (row) {
        let that = this
        this.dialogFormVisible7 = true
        this.userid = row.user_id
        getuserinfo(that)
      },
      zdl (row) {
        let that = this
        if (row.level == '会员') {
          this.zdflag = false
        } else {
          this.zdflag = true
        }
        this.dialogFormVisible8 = true
        this.userid = row.user_id
        request({
        url: that.public.url + '/backend/gameuser/getsimpinfo',
        method: 'post',
          data: {
            user_id: that.userid,
            g_agentline: 1
          }
        }).then(res => {
          that.gameuser = res.data
          if (res.data.agent_line!='') {
            that.agentline = res.data.agent_line.map (val => {
              return {'name': val}
            })
          } else {
            that.agentline = []
          }
      
        }).catch(error => {
        })
      },
      delbind (type) {
        let that = this
        that.$confirm('确认删除吗?删除后将不能恢复', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
          request({
            url:that.public.url + '/gameuser/delbind',
            method:'post',
            data:{
              user_id: that.userid,
              del_type: type
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
          }).catch(error => {
          })
        }).catch(error => {
        })
      },
      numchange(event){
        this.mynum = Number(event).toFixed(2)
      },
      handleCurrentChange (val) {
        let that = this
        this.currentPage = val *1
        playergamelist(that)
        let setcustomer = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.ruleForm.org,
        'playerlevel': that.ruleForm.playerlevel,
        'accountnum': that.ruleForm.accountnum,
        'status': that.ruleForm.status,
        'user': that.ruleForm.user,
        'question': that.ruleForm.question,
        'created': that.ruleForm.created,
        'accept': that.ruleForm.accept,
        'order': that.ruleForm.order,
        'checked': that.ruleForm.checked,
        'miao': that.ruleForm.miao,
      }
      this.$store.commit('setcustomer', setcustomer)
      },
      handleSizeChange (val) {
        let that = this
        this.pagesize = val
        this.currentPage = 1
        playergamelist(that)
        let setcustomer = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.ruleForm.org,
        'playerlevel': that.ruleForm.playerlevel,
        'accountnum': that.ruleForm.accountnum,
        'status': that.ruleForm.status,
        'user': that.ruleForm.user,
        'question': that.ruleForm.question,
        'created': that.ruleForm.created,
        'accept': that.ruleForm.accept,
        'order': that.ruleForm.order,
        'checked': that.ruleForm.checked,
        'miao': that.ruleForm.miao,
      }
      this.$store.commit('setcustomer', setcustomer)
      },
      toDx(n) {   //阿拉伯数字转换函数
        switch (n) {
          case "0":
            return "零";
          case "1":
            return "壹";
          case "2":
            return "贰";
          case "3":
            return "叁";
          case "4":
            return "肆";
          case "5":
            return "伍";
          case "6":
            return "陆";
          case "7":
            return "柒";
          case "8":
            return "捌";
          case "9":
            return "玖";
        }
      },
      // 转换算法主函数
      NumberToChinese(n){
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '负' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        let result = head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        this.text=result;
      },
      query(){
        let that = this;
        that.currentPage = 1
        playergamelist(that)
        let setcustomer = {
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'org': that.ruleForm.org,
        'playerlevel': that.ruleForm.playerlevel,
        'accountnum': that.ruleForm.accountnum,
        'status': that.ruleForm.status,
        'user': that.ruleForm.user,
        'question': that.ruleForm.question,
        'created': that.ruleForm.created,
        'accept': that.ruleForm.accept,
        'order': that.ruleForm.order,
        'checked': that.ruleForm.checked,
        'miao': that.ruleForm.miao,
      }
      this.$store.commit('setcustomer', setcustomer)
      },
      sure2 () {
        let that = this
        that.$refs.form2.validate((valid) => {
        if (valid) {
        that.$confirm('确认冻结吗?', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
          request({
            url:that.public.url + '/gameuser/frozeuser',
            method:'post',
            data:{
              user_id: that.userid,
              froze_type: that.form2.radio1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form2.resetFields()
            that.dialogFormVisible2 = false
            playergamelist(that)
          }).catch(error => {
          })
        }).catch(error => {
        })
        } else {
          return false
        }
        })
      },
      sure7 () {
        let that = this
        that.$refs.form7.validate((valid) => {
        if (valid) {
        that.$confirm('确认解冻吗?', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
          request({
            url:that.public.url + '/gameuser/frozeuser',
            method:'post',
            data:{
              user_id: that.userid,
              froze_type: that.form7.radio1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form7.resetFields()
            that.dialogFormVisible7 = false
            playergamelist(that)
          }).catch(error => {
          })
        }).catch(error => {
        })
        } else {
          return false
        }
        })
      },
      sure8 () {
        let that = this
        that.$refs.form8.validate((valid) => {
        if (valid) {
          if (this.upshow && this.form8.desc === '') {
            that.$message({
              type: 'warning',
              message: '请输入转换到的上级账号'
            })
            return false
          } else {
            if (this.upshow2 && this.form8.top === '') {
              that.$message({
                type: 'warning',
                message: '请输入玩家抽水的百分比'
              })
              return false
            }
            if (this.upshow) {
              request({
                url:that.public.url + '/gameuser/getagentline',
                method:'post',
                data:{
                  type: 2,
                  agent_account: this.form8.desc,
                  user_account:this.gameuser.login_name,
                  user_id:this.userid,
                  org_id:this.gameuser.agent_org_id
                }
              }).then(res => {
                if (res.data.old_agent_line.length > 0) {
                 var old_agent_line = res.data.old_agent_line
                } else {
                  var old_agent_line = []
                }
                if (res.data.new_agent_line.length > 0) {
                 var new_agent_line = res.data.new_agent_line
                } else {
                  var new_agent_line = []
                }
                that.datalist = [
                  {'status': '原代理线', 'up': old_agent_line, 'level': res.data.old_level},
                  {'status': '转移到', 'up': new_agent_line, 'level': res.data.new_level}
                ]
                this.dialogFormVisible9 = true
              }).catch(error => {
              })
            } else {
                request({
                url:that.public.url + '/gameuser/getagentline',
                method:'post',
                data:{
                  type: that.form8.radio1,
                  agent_account: '',
                  user_account:this.gameuser.login_name,
                  user_id:this.userid,
                  org_id:this.gameuser.agent_org_id
                }
              }).then(res => {
                if (res.data.old_agent_line.length > 0) {
                 var old_agent_line = res.data.old_agent_line
                } else {
                  var old_agent_line = []
                }
                if (res.data.new_agent_line.length > 0) {
                 var new_agent_line = res.data.new_agent_line
                } else {
                  var new_agent_line = []
                }
                that.datalist = [
                  {'status': '原代理线', 'up': old_agent_line, 'level': res.data.old_level},
                  {'status': '转移到', 'up': new_agent_line, 'level': res.data.new_level}
                ]
                this.dialogFormVisible9 = true
              }).catch(error => {
              })
                
            }
          }
        } else {
          return false
        }
        })
      },
      sure9 () {
        let that = this
        if (this.upshow) {
        } else {
          that.form8.desc = ''
        }
        if (this.upshow2) {
        } else {
          that.form8.top = ''
        }
        request({
            url:that.public.url + '/gameuser/changeuseragent',
            method:'post',
            data:{
              user_id: that.userid,
              user_account: that.form8.desc,
              type: that.form8.radio1,
              reward_top: that.form8.top
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form8.resetFields()
            that.form8.desc = ''
            that.form8.top = ''
            that.dialogFormVisible8 = false
            that.dialogFormVisible9 = false
            playergamelist(that)
          }).catch(error => {
          })
      },
      cacelcard(row){
        let that = this;
        this.$confirm('是否继续解除绑定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
            url:that.public.url + '/backend/gameuserbank/unbind',
            method:'post',
            data:{
              id:row.id
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            bankcard(that)
          }).catch(error => {

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
          })
        })
      })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.miao = ''
        this.ruleForm.checked = false
      },
      wj (row) {
        let that = this
        this.dialogFormVisible = true
        // this.activeName2 = 'first'
        this.userid = row.user_id
        request({
            url:that.public.url + '/gameuser/userdetailinfo',
            method:'post',
            data:{
              user_id: that.userid
            }
          }).then(res => {
            that.userdatainfo = res.data
          }).catch(error => {
          })
        // getuserinfo(that)
      },
      sure3(form) {
        let that = this;
        this.$refs.form3.validate((valid) => {
          if (valid) {
            this.$confirm('是否继续确定?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(res => {
              request({
                url:that.public.url + '/paychgmoney/addmoney',
                method:'post',
                data:{
                  id:this.userid,
                  paytype:this.form3.pay,
                  money:this.form3.money,
                  remark:this.form3.remark
                }
              }).then(res => {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                that.dialogFormVisible3 = false
                that.$refs.form3.resetFields()
                that.text = ''
                playergamelist(that)
              }).catch(error => {
              })
            }).catch(error => {
              })
          } else {
            return false
          }
        })
      },
      cell ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 && row.status === '绑定中') {
          return 'green'
        }
        if (columnIndex === 0 && row.status === '已取消绑定') {
          return 'red'
        }
      },
      excel () {
        let that = this
        var regstart = ''
        var regend = ''
        var freezetime = ''
        var freezeendtime = ''
        if (that.ruleForm.created && that.ruleForm.created.length > 0) {
          regstart = parseTime(that.ruleForm.created[0].getTime() /1000)
          regend = parseTime(that.ruleForm.created[1].getTime() /1000)
        }
        if (that.ruleForm.accept && that.ruleForm.accept.length > 0) {
          freezetime = parseTime(that.ruleForm.accept[0].getTime() /1000)
          freezeendtime = parseTime(that.ruleForm.accept[1].getTime() /1000)
        }
        if (regstart == '' && regend =='') {
          this.$message.error('需选择创建时间')
          return
        }
        request({
          url: that.public.url + '/csmmessage/exportgetlist',
          method: 'post',
          data: {
            agent_org_id:that.ruleForm.org,
            user_level: that.ruleForm.playerlevel,
            user_loginname:that.ruleForm.accountnum,
            status:that.ruleForm.status,
            accepter_account:that.ruleForm.user,
            question:that.ruleForm.question,
            date_from: regstart,
            date_to: regend,
            accept_time_from: freezetime,
            accrpt_time_to: freezeendtime,
            orderby:that.ruleForm.order,
            pageno: that.currentPage,
            pagerows: that.pagesize,
          }
        }).then(res => {
          window.location.href = that.public.url + res.data
        }).catch(error => {
        })
      },
      sure4(form) {
        let that = this;
        this.$refs.form4.validate((valid) => {
          if (valid) {
            this.dialogFormVisible10 = true
            if (this.form4.pay === '50') {
              this.form10.pay = '人工提现'
            }
            if (this.form4.pay === '53') {
              this.form10.pay = '管理员扣减'
            }
          } else {
            return false
          }
        })
      },
      sure10 () {
        let that = this
        request({
            url:that.public.url + '/paychgmoney/submoney',
            method:'post',
            data:{
              id:this.userid,
              paytype:this.form4.pay,
              money:this.form4.money,
              remark:this.form4.remark
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible10 = false
            that.$refs.form4.resetFields()
            that.dialogFormVisible4 = false
            that.text = ''
            playergamelist(that)
          }).catch(error => {
          })
      },
      sure11 () {
        let that = this
        request({
            url:that.public.url + '/csmmessage/sendemail',
            method:'post',
            data:{
              id:this.userid,
              receiver:this.form11.name,
              title:this.form11.desc,
              content:this.form11.content
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            that.dialogFormVisible11 = false
            that.$refs.form11.resetFields()
            playergamelist(that)
          }).catch(error => {
          })
      },
      sure(form){
        let that = this
        if(that.activeName2 === 'first') {
          resetpassword(that,that.userid, 1, that.form1.code, that.form1.recode,'form1')
        }
        if(that.activeName2 === 'second') {
          resetpassword(that,that.userid, 2, that.form5.safecode, that.form5.resafecode, 'form5')
        }
      },
      reset (form) {
        this.dialogFormVisible = false
        // this.$refs.form1.resetFields()
        // this.$refs.form5.resetFields()
      },
      reset2 (form) {
        this.dialogFormVisible2 = false
        this.$refs.form2.resetFields()
      },
      reset3 (form) {
        this.dialogFormVisible3 = false
        this.$refs.form3.resetFields()
        this.text = ''
      },
      reset4 (form) {
        this.dialogFormVisible4 = false
        this.$refs.form4.resetFields()
        this.text = ''
      },
      reset10 (form) {
        this.dialogFormVisible10 = false
        this.dialogFormVisible4 = false
        this.$refs.form4.resetFields()
        this.text = ''
      },
      reset11 (form) {
        this.dialogFormVisible11 = false
        this.$refs.form11.resetFields()
      },
      reset12 (form) {
        this.dialogFormVisible12 = false
      },
      reset13 (form) {
        this.dialogFormVisible13 = false
      },
      reset14 (form) {
        this.dialogFormVisible14 = false
        this.$refs.form1.resetFields()
        this.$refs.form5.resetFields()
      },
      reset15 (form) {
        this.dialogFormVisible15 = false
        this.historydate = []
      },
      reset16 () {
        this.dialogFormVisible16 = false
      },
      reset17 () {
        this.dialogFormVisible17 = false
      },
      reset7 (form) {
        this.dialogFormVisible7 = false
        this.$refs.form7.resetFields()
      },
      reset8 (form) {
        this.dialogFormVisible8 = false
        this.form8.desc = ''
        this.form8.top = ''
        this.$refs.form8.resetFields()
      },
      reset9 (form) {
        this.dialogFormVisible9 = false
      },
      order () {
        if (this.ruleForm.checked) {
          this.ruleForm.miao = this.ruleForm.miao * 1
          if (Number.isInteger(this.ruleForm.miao) && this.ruleForm.miao >=10 && this.ruleForm.miao <=100) {
            this.num = this.ruleForm.miao 
            this.cancel()
            this.timer = window.setInterval(()=>{
                this.num--
                if (this.num === 0) {
                  playergamelist(this)
                  this.num = this.ruleForm.miao 
                }
            },1000)
          } else {
            this.$message.warning('请输入10-100的整数')
          }
        }
        
      },
      cancel() {
        window.clearInterval(this.timer)
      },
    }
  }


  function getplayergamechannel (that) {
    request({
      url: that.public.url + '/backend/org/getorglist',
      method: 'post',
      data: {

      }
    }).then(res => {
      that.selectchannel = res.data
    }).catch(error => {
    })
  }
  function bankcard(that){
    request({
      url:that.public.url + '/backend/gameuserbank/gethistorylist',
      method:'post',
      data:{
        user_id:that.userid,
        bank_cond_type: '',
        bank_cond_text: '',
        agent_org_id: '',
        user_account: ''
      }
    }).then(res => {
      that.tableDatamessage = res.data.list
    }) .catch(error => {})
  }

  function getuserinfo (that) {
    request({
      url: that.public.url + '/backend/gameuser/getsimpinfo',
      method: 'post',
      data: {
        user_id: that.userid,
        g_agentline: 0
      }
    }).then(res => {
      that.gameuser = res.data
    }).catch(error => {
    })
  }

  function playergamelist(that){
    var regstart = ''
    var regend = ''
    var freezetime = ''
    var freezeendtime = ''
    if (that.ruleForm.created && that.ruleForm.created.length > 0) {
      regstart = parseTime(that.ruleForm.created[0].getTime() /1000)
      regend = parseTime(that.ruleForm.created[1].getTime() /1000)
    }
    if (that.ruleForm.accept && that.ruleForm.accept.length > 0) {
      freezetime = parseTime(that.ruleForm.accept[0].getTime() /1000)
      freezeendtime = parseTime(that.ruleForm.accept[1].getTime() /1000)
    }
    request({
      url: that.public.url + '/csmmessage/getlist',
      method: 'post',
      data: {
        agent_org_id:that.ruleForm.org,
        user_level: that.ruleForm.playerlevel,
        user_loginname:that.ruleForm.accountnum,
        status:that.ruleForm.status,
        accepter_account:that.ruleForm.user,
        question:that.ruleForm.question,
        date_from: regstart,
        date_to: regend,
        accept_time_from: freezetime,
        accrpt_time_to: freezeendtime,
        orderby:that.ruleForm.order,
        pageno: that.currentPage,
        pagerows: that.pagesize,
      }
    }).then(res => {
      let tableData = res.data.list
      that.tableData = tableData.map(v => {
        that.$set(v, 'inputshow', false)
        return v
      })
      that.total = res.data.rownum * 1
      that.currentPage = res.data.pageno * 1
    }).catch(error => {
    })
  }
  function resetpassword(that, id, type,code,recode,form){
    if (form === 'form1') {
      that.$refs.form1.validate((valid) => {
      if (valid) {
          that.$confirm('请确认是否提交?提交后，请联系管理员至【审核密码修改】审核', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            request({
              url:that.public.url + '/gameuser/modifypwd',
              method:'post',
              data:{
                user_id:id,
                reset_type: type,
                password:code,
                re_password:recode
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              // that.$refs.form1.resetFields()
              // that.dialogFormVisible = false
            }).catch(error => {
            })
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    }
    if (form === 'form5') {
      that.$refs.form5.validate((valid) => {
      if (valid) {
          that.$confirm('请确认是否提交?提交后，请联系管理员至【审核密码修改】审核', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            request({
              url:that.public.url + '/gameuser/modifypwd',
              method:'post',
              data:{
                user_id:id,
                reset_type: type,
                password:code,
                re_password:recode
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              // that.$refs.form1.resetFields()
              // that.dialogFormVisible = false
            }).catch(error => {
            })
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    }
    
  }

  function getanswerlist (that) {
    request({
      url: that.public.url + '/csmreplytemplate/getnamelist',
      method: 'post',
      data: {
      }
    }).then(res => {
      that.answerlist = res.data
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

  function getplayerlevellist (that) {
    request({
      url: that.public.url + '/backend/gameuser/getlevellist',
      method: 'post',
      data: {
      }
    }).then(res => {
      that.playerlevellist = res.data
    }).catch(error => {
    })
  }
</script>

<style>
  .customer  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .customer  .el-input--suffix .el-input__inner {
    padding-right: 7px;
  }

  .customer  .proxybalance {
    width: 75px;
  }

  .customer  .balance {
    width: 30%;
  }

  .customer  .green{
    color: green;
  }
  .customer  .red{
    color: red;
  }

  .customer  .playerbalance {
    width: 75px;
  }

  .customer  .el-form--inline .el-form-item {
    margin-right: 0;
  }

  .customer  .serchbtn {
    padding-left: 42px;
    padding-right: 42px;
  }

  .customer  .el-pagination {
    float: right;
  }

  /*调整清空筛选和导出excel按钮位置*/
  .customer  .tree {
    float: left;
  }

 .customer   .channel {
    width: 60%
  }

  .customer  .pchannel {
    /*background:rgb(69,90,130);*/
    width: 200px;
    margin-bottom: 10px;
  }

  .customer  .playerinfo {
    padding-left: 10px;
  }

  .customer  .sizetext {
    font-size: 14px;
  }

  .customer  .playerlist {
    background: rgb(140, 161, 193);
    font-weight: bold;
    letter-spacing: 1px;
    padding: 7px 3px 7px 3px;
    text-align: center;
    font-size: 14px;
  }

  .customer  .freeztype {
    width: 55%;
  }

  .customer  .operate {
    width: 200px;
  }
  .customer  el-table>el-table-column{
    width:100% auto
  }
  .customer  .positionside{
    width:50%;
    float:left;
  }
  .rowdjstatus {
    background-color:rgb(212, 216, 224)!important;
  }
  .parenti {
    margin-top: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .parenti:last-child i{
    visibility: hidden;
  }
  .playergamelistquery .el-form-item {
    margin-bottom: 5px !important;
  }
  .customer .el-tree{
    width: 100%;
    overflow: auto;
  }
  .customer .el-tree>.el-tree-node{
    min-width: 100%;
    display: inline-block!important;
  }
  .customer #div2{
    height: 10px;
    width: 2020px;
  }
  .customer #wrapper2 {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
</style>
