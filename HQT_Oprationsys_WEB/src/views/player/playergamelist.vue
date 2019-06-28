<template>
  <div class="app-container playergamelist">
    <div class="tree" style="width:14%;overflow: auto;">
      <div class="pchannel"  v-if="gameusergetchildusers">
        <span class="sizetext">玩家渠道:</span>
        <el-select clearable v-model="selectId" class="channel">
          <el-option
            v-for="item in selectchannel"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >
          </el-option>
        </el-select>
      </div>
      <div class="playerlist">用户列表</div>
      <el-tree
        :key="selectId"
        :load="loadNode1"
        :props="props1"
        @node-click='nodeclick'
        :render-content="rendercontent"
        lazy
        >
      </el-tree>
    </div>
    <div style="float: left;width: 85%;" class="playerinfo">
      <div class="playergamelistquery">
        <el-form :model="ruleForm" ref="ruleForm" label-width="50px" :inline="true">
          <el-row>
            <el-col :span="8">
              <el-form-item label="玩家渠道:" label-width="73px" prop="selectchannel">
                <el-select v-model="ruleForm.selectchannel" placeholder="请选择渠道" clearable>
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
              <el-form-item label="玩家账号:" label-width="73" prop="accountnum">
                <el-input class="accountnum" clearable placeholder="" v-model="ruleForm.accountnum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="登录日期:" prop="date1" label-width="73px">
                <el-date-picker
                v-model="ruleForm.date1"
                type="daterange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>


            
            
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="代理余额:" label-width="73px" prop="playerbalance3" style="margin-right:-40px">
                <el-input class="balance" clearable placeholder="" v-model="ruleForm.playerbalance3" style="width:80%" type="number"></el-input>
              </el-form-item>
              <span style="display: inline-block;padding-top:9px">至</span>
              <el-form-item label-width="73px" prop="playerbalance4">
                <el-input class="balance" clearable placeholder="" v-model="ruleForm.playerbalance4" style="width:80%" type="number"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="玩家信息:" label-width="73px" prop="info">
                <el-select v-model="ruleForm.info" placeholder="">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="邮箱" value="1"></el-option>
                  <el-option label="手机" value="2"></el-option>
                  <el-option label="银行卡" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="chan">
              <el-input clearable placeholder="(不分渠道)" v-model="ruleForm.chan"></el-input>
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

            

           
            
            
            
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="冻结类型:" label-width="73px" prop="freeztype">
                <el-select v-model="ruleForm.freeztype" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未冻结" value="1"></el-option>
                  <el-option label="冻结中" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="玩家余额:" label-width="73px" prop="playerbalance1" style="margin-right:-40px">
                <el-input class="balance" clearable placeholder="" v-model="ruleForm.playerbalance1" style="width:80%"></el-input>
              </el-form-item>
                <span style="display: inline-block;padding-top:9px">至</span>
              <el-form-item label-width="73px" prop="playerbalance2">
                <el-input class="balance" clearable placeholder="" v-model="ruleForm.playerbalance2" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="排序:" label-width="73px" prop="playername">
                <el-select v-model="ruleForm.playername" placeholder="">
                  <el-option label="默认" value="0"></el-option>
                  <el-option label="玩家名称" value="1"></el-option>
                  <el-option label="玩家余额" value="2"></el-option>
                  <el-option label="注册时间" value="3"></el-option>
                  <el-option label="代理余额" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="checked">
                <el-checkbox v-model="ruleForm.checked" :label="1">倒</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             
            <el-col :span="8">
              <el-form-item label="冻结时间:" prop="date3" label-width="73px">
                <el-date-picker
                style="width: 360px;"
                v-model="ruleForm.date3"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
             <el-col :span="10">
              <el-form-item label="注册时间:" prop="date2" label-width="73px">
                <el-date-picker
                v-model="ruleForm.date2"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            
            
            
            
            <el-col :span="2">
              <el-button class="serchbtn" type="primary" @click="query" v-if="gameusergetlist">搜索</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="resetForm('ruleForm')">清空筛选</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="excel" v-if="gameuserexportuserdata">导出excel</el-button>
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
    <div class="parenti" v-for="(item,key) in nav" :key="key">
      <el-button plain @click="getpid(item.user_id)">{{item.name}}</el-button>
      <i class="el-icon-d-arrow-right"></i>
    </div>

    </div>

      <el-table
        :data="tableData"
        border
        :row-class-name='rowclass'
        :cell-class-name='cell1'
        style="width: 100%">
        <el-table-column
          label="UID"
          width='80'
          prop="id">
        </el-table-column>
        <el-table-column
        label="玩家账号"
        width='100'
        >
        <template slot-scope="scope">
          <el-button type="text"  @click="confirmEdit(scope.row)" v-if="scope.row.is_agent === '1'">{{scope.row.login_name}}</el-button>
          <span  v-else>{{scope.row.login_name}}</span>
        </template>
      </el-table-column>
        <el-table-column
        width='100'
          label="玩家渠道"
          prop="org_name">
        </el-table-column>
        <el-table-column
          label="层级"
          prop="level">
        </el-table-column>
        <el-table-column
        width='120'
          label="玩家余额"
          prop="user_balance">
        </el-table-column>
        <el-table-column
        width='120'
          label="保险箱"
          prop="deposit">
        </el-table-column>
        <el-table-column
          label="代理余额"
          width='120'
          prop="agent_balance">
        </el-table-column>
        <el-table-column
        width='160'
          label="最后登录日期"
          prop="last_login_time">
        </el-table-column>
        <el-table-column
        width='160'
          label="注册日期"
          prop="reg_time">
        </el-table-column>
        <el-table-column
        fixed='right'
        width='180'
          label="查看"
          prop="viewinfo">
          <template slot-scope="scope">
            <el-button @click="team(scope.row)" type="text" size="small">团队</el-button>
            <el-button type="text" size="small" @click="ct">充提</el-button>
            <el-button type="text" size="small" @click="zb">账变</el-button>
            <el-button type="text" size="small" @click="tax(scope.row)" v-if="fundchangeagentfundlinklist">税收</el-button>
          </template>
        </el-table-column>
        <el-table-column
        fixed='right'
        width='380'
          label="操作" class="operate">
          <template slot-scope="scope">
            <el-button @click="znx" type="text" size="small">站内信</el-button>
            <el-button type="text" @click="wj(scope.row)" size="small" v-if="gameusergetimpinfo">玩家信息</el-button>
            <el-button type="text" size="small" @click="th(scope.row)">踢号</el-button>
            <!--冻结-->
            <el-button type="text" @click="dj(scope.row)" size="small" v-if="scope.row.status==='1' && gameuserfrozeuser">
              冻结
            </el-button>
            <el-button type='primary' @click="jd(scope.row)" size="small" v-if="scope.row.status==='2' && gameuserfrozeuser">
              解冻
            </el-button>
            <!--人工充值-->
            <el-button type="text" @click="rgcz(scope.row)" size="small" v-if="paychgmoneyaddmoney">
              充值
            </el-button>
            <!--提现-->
            <el-button type="text" @click="tx(scope.row)" size="small" v-if="paychgmoneysubmoney">
              扣减
            </el-button>
            <el-button type="text" size="small" @click="bz(scope.row)" v-if="gameuserchangeuserremark">备注</el-button>
             <el-button type="text" @click="zdl(scope.row)" size="small" v-if="scope.row.type !='2' && gameuserchangeuseragent">
              转代理
            </el-button>
            <el-button type="text" @click="sx(scope.row)" size="small" v-if="scope.row.type==='2' && gameuserchangeusertype">
              属性
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
        width='200'
        label="玩家备注">
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
            :page-sizes="[50,100,200]"
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
      <el-dialog title="属性修改" :visible.sync="dialogFormVisible6" :before-close="reset6">
              <el-form :model="form6" :rules="rules6" ref="form6">
                <el-form-item label="玩家渠道:" :label-width="formLabelWidth">
                  <span>{{gameuser.org_name}}</span>
                </el-form-item>
                <el-form-item label="上级代理:" :label-width="formLabelWidth" prop='upname' v-if="dlshow">
                  <el-input v-model="form6.upname" placeholder="（只能填写代理账号）"></el-input>
                </el-form-item>
                <el-form-item label="代理线:" :label-width="formLabelWidth"  v-else>
                  <div class="parenti" v-for="(item,key) in agentline" :key="key">
                    <span>{{item.name}}</span>
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </el-form-item>
                <el-form-item label="玩家账号:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form6.name"></el-input>
                </el-form-item>
                <el-form-item label="玩家层级:" :label-width="formLabelWidth">
                  <span>{{gameuser.old_level}}</span>
                </el-form-item>
                <el-form-item label="修改类型:" :label-width="formLabelWidth" prop="radio6">
                  <el-radio v-model="form6.radio6" label="1" size="mini">代理</el-radio>
                  <el-radio v-model="form6.radio6" label="2" size="mini">会员</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset6(form)">取 消</el-button>
                <el-button type="primary" @click="sure6(form)">确 定</el-button>
              </div>
            </el-dialog>
      <el-dialog title="玩家信息修改" :visible.sync="dialogFormVisible" :before-close="reset">
              <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="height:auto;width:100%">
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
                    <el-form-item label="登录密码" :label-width="formLabelWidth" type="password" prop="code">
                      <el-input type="password" v-model="form1.code"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认" :label-width="formLabelWidth" type="password" prop="recode">
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

                <el-tab-pane label="手机/邮箱" name="third" v-if="gameuserdelbind">
                  <div>
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
                  </div>
                </el-tab-pane>

                <el-tab-pane label="银行卡" name="fourth">
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
                </el-tab-pane>

                <el-tab-pane label="玩家详细资料" name="fifth">
                  <div>
                    <el-form>

                      <el-form-item label="账号:" :label-width="formLabelWidth" class="positionside">
                        <span>{{userdatainfo.login_name}}</span>
                      </el-form-item>
                      <el-form-item label="类型:" :label-width="formLabelWidth" class="positionside">
                        <span>{{userdatainfo.sort_type | type}}</span>
                      </el-form-item>
                      <el-form-item label="账户余额:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.balance}}</span>
                      </el-form-item>
                      <el-form-item label="保险箱余额:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.deposit}}</span>
                      </el-form-item>
                      <el-form-item label="手机:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.mobile}}</span>
                      </el-form-item>
                      <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.email}}</span>
                      </el-form-item>
                      <el-form-item label="支付宝账号:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.alipay_account}}</span>
                      </el-form-item>
                      <el-form-item label="支付宝实名:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.alipay_realname}}</span>
                      </el-form-item>
                      <el-form-item label="所属渠道组:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.org_name}}</span>
                      </el-form-item>
                      <el-form-item label="所属代理:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.agent_name}}</span>
                      </el-form-item>
                      <el-form-item label="注册时间:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.reg_time}}</span>
                      </el-form-item>
                      <el-form-item label="登录时间:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.last_login_time}}</span>
                      </el-form-item>
                      <el-form-item label="状态:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.status | status}}</span>
                      </el-form-item>
                      <el-form-item label="登录IP:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.last_login_ip}}</span>
                      </el-form-item>
                      <el-form-item label="设备ID:" :label-width="formLabelWidth" prop="name">
                        <span>{{userdatainfo.device_id}}</span>
                      </el-form-item>
                      <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.name}}</span>
                      </el-form-item>
                      <el-form-item label="性别:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.sex | sex}}</span>
                      </el-form-item>
                      <el-form-item label="称号:" :label-width="formLabelWidth" prop="name" class="positionside">
                        <span>{{userdatainfo.honor}}</span>
                      </el-form-item>
                      <el-form-item label="vip等级:" :label-width="formLabelWidth" prop="name" class="positionside">
                       <span>{{userdatainfo.vip}}</span>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div slot="footer" class="dialog-footer" v-if="buttonshow">
                <el-button @click="reset(form)">取 消</el-button>
                <el-button type="primary" @click="sure(form)">确 定</el-button>
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
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapState} from 'vuex'
  import request from '../../utils/request'
  import { validatNumber } from '@/utils/validate'

  export default {
    name: "playergamelist",
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
      selectId: null,
      selectchannel:[],
      buttonshow: true,
      orgid: '',
      nav: [],
      upshow: false,
      upshow2: false,
      playerlevellist: [],
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
        info: '',
        selectchannel: '',
        playerlevel: '',
        accountnum: '',
        playername: '0',
        proxybalance1: '',
        proxybalance2: '',
        playerbalance1: '',
        playerbalance2: '',
        playerbalance3: '',
        playerbalance4: '',
        number: '',
        freeztype: '',
        date1: [],
        date2: [],
        date3: [],
        chan:'',
        checked:''
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
      pagesize: 50,
      id: '',
      currentPage: 1,
      tableData: [
      ],
      tableDatamessage: [
      ],
      userid:'',
      rules: {
        proxybalance1: [
          {required: false, message: '', trigger: 'blur'},
        ],
        proxybalance2: [
          {required: false, message: '', trigger: 'blur'},
        ],
        playerbalance1: [
          {required: false, message: '', trigger: 'blur'},
        ],
        playerbalance2: [
          {required: false, message: '', trigger: 'blur'},
        ],
        number: [
          {required: false, message: '', trigger: 'change'}
        ],
        info: [
          {required: false, message: 'UUID', trigger: 'change'}
        ],
        selectchannel: [
          {required: false, message: '请选择渠道', trigger: 'change'}
        ],
        playerlevel: [
          {required: false, message: '全部', trigger: 'change'}
        ],
        playername: [
          {required: false, message: '玩家名称', trigger: 'change'}
        ],
        freeztype: [
          {required: false, message: '全部', trigger: 'change'}
        ],
        date1: [
          {required: false, message: '年月日', trigger: 'change'}
        ],
        date2: [
          {required: false, message: '年月日时分秒', trigger: 'change'}
        ],
        date3: [
          {required: false, message: '年月日时分秒', trigger: 'change'}
        ],
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
      dialogFormVisible6: false,
      form6: {
        name: '',
        upname: '',
        radio6: ''
      },
      gameuser: {},
      userdatainfo: {},
      agentline: [],
      dlshow: false,
      czshow: false,
      datalist: [],
      zdflag: true
    }
  },
    created(){
      getplayergamechannel(this)
      getplayerlevellist(this)
      let that = this
      if (!this.playergamelist.length && this.playergamelist.length != 0) {
        that.ruleForm.info = this.playergamelist.info
        that.ruleForm.chan = this.playergamelist.chan
        that.currentPage = this.playergamelist.currentPage
        that.pagesize = this.playergamelist.pagesize
        that.ruleForm.playerbalance3 = this.playergamelist.playerbalance3
        that.ruleForm.playerbalance4 = this.playergamelist.playerbalance4
        that.ruleForm.selectchannel = this.playergamelist.selectchannel
        that.ruleForm.accountnum = this.playergamelist.accountnum
        that.ruleForm.playerlevel = this.playergamelist.playerlevel
        that.ruleForm.freeztype = this.playergamelist.freeztype
        that.ruleForm.playerbalance1 = this.playergamelist.playerbalance1
        that.ruleForm.playerbalance2 = this.playergamelist.playerbalance2
        that.ruleForm.playername = this.playergamelist.playername
        that.ruleForm.checked = this.playergamelist.checked
        that.ruleForm.date1 = this.playergamelist.date1
        that.ruleForm.date2 = this.playergamelist.date2
        that.ruleForm.date3 = this.playergamelist.date3
        playergamelist(that)
      }
    },
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
      'ruleForm.selectchannel': function (val) {
        if (val) {
          this.selectId = ''
        }
      },
      'selectId': function (val) {
        if (val) {
          this.ruleForm.selectchannel = ''
        }
      },
    },
    computed: {
    ...mapGetters([
        'playergamelist',
        'gameusergetchildusers',
        'gameuserresetpassword',
        'gameuserdelbind',
        'gameuserfrozeuser',
        'gameuserchangeusertype',
        'gameuserchangeuserremark',
        'gameusergetlist',
        'gameusergetimpinfo',
        'paychgmoneyaddmoney',
        'paychgmoneysubmoney',
        'gameuserbankunbind',
        'gameuserexportuserdata',
        'fundchangeagentfundlinklist',
        'gameuserchangeuseragent'
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
        this.$router.push({path: '/analysisdatamgr/agentteam',query:{org:row.org_id,name:row.login_name}})
      },
      th (row) {
         let that = this
        this.$confirm('二次确认', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gameuser/blocknum',
              method: 'post',
              data: {
                  user_id: row.id
              }
            }).then(res => {
              that.$message.success(res.message)
              playergamelist(that)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      rendercontent (h,{node,data,store}) {
        let num = node.label + '('+ data.sum +')'
        return (
          <span class='custom-tree-node'>
            <span>{num}</span>
          </span>
        )
      },
      rowclass ({row, rowIndex}) {
        if (row.status === '2') {
          return 'rowdjstatus'
        }
        return ''
      },
      cell1 ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 4 && row.user_balance*1 < 0) {
          return 'red'
        }
        if (columnIndex === 5 && row.deposit*1 < 0) {
          return 'red'
        }
        if (columnIndex === 6 && row.agent_balance*1 < 0) {
          return 'red'
        }
      },
      getpid (id) {
        let that = this
        request({
            url:that.public.url + '/gameuser/getlist',
            method:'post',
            data:{
              agent_user_id: id,
              org_id: that.orgid
            }
          }).then(res => {
            let tableData = res.data.list
            that.tableData = tableData.map(v => {
              that.$set(v, 'inputshow', false)
              return v
            })
            if (res.data.nav_path === []) {
              that.nav = []
            } else {
              that.nav = res.data.nav_path.p_agents
              that.orgid = res.data.nav_path.org_id
            }
            that.total = res.data.rownum * 1
            that.currentPage = res.data.pageno * 1
          }).catch(error => {
          })
      },
      confirmEdit (row) {
        let that = this
        request({
            url:that.public.url + '/gameuser/getlist',
            method:'post',
            data:{
              agent_user_id: row.id
            }
          }).then(res => {
            let tableData = res.data.list
            that.tableData = tableData.map(v => {
              that.$set(v, 'inputshow', false)
              return v
            })
            if (res.data.nav_path === []) {
              that.nav = []
            } else {
              that.nav = res.data.nav_path.p_agents
              that.orgid = res.data.nav_path.org_id
            }
      that.total = res.data.rownum * 1
      that.currentPage = res.data.pageno * 1
          }).catch(error => {
          })
      },
      ct () {
        this.$router.push({path: '/analysisdatamgr/rushtoask'})
      },
      zb () {
        this.$router.push({path: '/analysisdatamgr/gamedealday'})
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
        this.userid = row.id
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
            url:that.public.url + '/gameuser/changeuserremark',
            method:'post',
            data:{
              user_id: row.id,
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
        this.userid = row.id
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
        this.$router.push({path: '/analysisdatamgr/agentmoney',query:{'id':row.org_id, 'name': row.login_name, 'type': '21'}})
      },
      dj (row) {
        let that = this
        this.dialogFormVisible2 = true
        this.userid = row.id
        getuserinfo(that)
      },
      jd (row) {
        let that = this
        this.dialogFormVisible7 = true
        this.userid = row.id
        getuserinfo(that)
      },
      sx (row) {
        let that = this
        if (row.agent_account_id==='0') {
          this.dlshow = true
        } else {
          this.dlshow = false
        }
        this.dialogFormVisible6 = true
        this.userid = row.id
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
      zdl (row) {
        let that = this
        if (row.level == '会员') {
          this.zdflag = false
        } else {
          this.zdflag = true
        }
        this.dialogFormVisible8 = true
        this.userid = row.id
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
        let setplayergamelist = {
        'info': that.ruleForm.info,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'chan': that.ruleForm.chan,
        'playerbalance3': that.ruleForm.playerbalance3,
        'playerbalance4': that.ruleForm.playerbalance4,
        'selectchannel': that.ruleForm.selectchannel,
        'accountnum': that.ruleForm.accountnum,
        'playerlevel': that.ruleForm.playerlevel,
        'freeztype': that.ruleForm.freeztype,
        'playerbalance1': that.ruleForm.playerbalance1,
        'playerbalance2': that.ruleForm.playerbalance2,
        'playername': that.ruleForm.playername,
        'checked': that.ruleForm.checked,
        'date1': that.ruleForm.date1,
        'date2': that.ruleForm.date2,
        'date3': that.ruleForm.date3,
      }
      this.$store.commit('setplayergamelist', setplayergamelist)
      },
      handleSizeChange (val) {
        let that = this
        this.pagesize = val
        this.currentPage = 1
        playergamelist(that)
        let setplayergamelist = {
        'info': that.ruleForm.info,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'chan': that.ruleForm.chan,
        'playerbalance3': that.ruleForm.playerbalance3,
        'playerbalance4': that.ruleForm.playerbalance4,
        'selectchannel': that.ruleForm.selectchannel,
        'accountnum': that.ruleForm.accountnum,
        'playerlevel': that.ruleForm.playerlevel,
        'freeztype': that.ruleForm.freeztype,
        'playerbalance1': that.ruleForm.playerbalance1,
        'playerbalance2': that.ruleForm.playerbalance2,
        'playername': that.ruleForm.playername,
        'checked': that.ruleForm.checked,
        'date1': that.ruleForm.date1,
        'date2': that.ruleForm.date2,
        'date3': that.ruleForm.date3,
      }
      this.$store.commit('setplayergamelist', setplayergamelist)
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
      handleClick(tab, event) {
        let that = this
        if(that.activeName2 === 'fourth'){
          bankcard(that)
        }
        if (that.activeName2 === 'third' || that.activeName2 === 'fourth' || that.activeName2 === 'fifth') {
          this.buttonshow = false
        } else {
          this.buttonshow = true
        }
        if (that.activeName2 === 'fifth') {
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
        }
      },
      nodeclick (data) {
        let that = this
        let userid = data.user_id
        // this.ruleForm.selectchannel = ''
            request({
              url: that.public.url + '/backend/gameuser/getlist',
              method: 'post',
              data: {
                agent_user_id: userid
              }
            }).then(res => {
              let tableData = res.data.list
              that.tableData = tableData.map(v => {
                that.$set(v, 'inputshow', false)
                return v
              })
              if (res.data.nav_path === []) {
                that.nav = []
              } else {
                that.nav = res.data.nav_path.p_agents
                that.orgid = res.data.nav_path.org_id
              }
              that.total = res.data.rownum * 1
              that.currentPage = res.data.pageno * 1
            }).catch(error => {
            })
      },
      loadNode1(node, resolve) {
        // this.ruleForm.selectchannel = ''
        let that = this
        const {selectId} = this
        if (node.level === 0) {
          if (selectId) {
            request({
              url: that.public.url + '/backend/gameuser/getchildusers',
              method: 'post',
              data: {
                org_id: selectId
              }
            }).then(res => {
              resolve(res.data.map(item => {
                item.isLeaf = !item['is_agent']
                return item
              }))
            }).catch(error => {
            })
            return
          }
        } else {
          let userid = node.data.user_id
          request({
              url: that.public.url + '/backend/gameuser/getchildusers',
              method: 'post',
              data: {
                org_id: selectId,
                user_id: userid
              }
            }).then(res => {
              resolve(res.data.map(item => {
                item.isLeaf = !item['is_agent']
                return item
              }))
            }).catch(error => {
            })

            request({
              url: that.public.url + '/backend/gameuser/getlist',
              method: 'post',
              data: {
                agent_user_id: userid
              }
            }).then(res => {
              let tableData = res.data.list
              that.tableData = tableData.map(v => {
                that.$set(v, 'inputshow', false)
                return v
              })
              if (res.data.nav_path === []) {
                that.nav = []
              } else {
                that.nav = res.data.nav_path.p_agents
                that.orgid = res.data.nav_path.org_id
              }
              that.total = res.data.rownum * 1
              that.currentPage = res.data.pageno * 1
            }).catch(error => {
            })
            return
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit')
          } else {
            console.log('error')
            return false
          }
        })
      },
      query(){
        let that = this;
        playergamelist(that)
        let setplayergamelist = {
        'info': that.ruleForm.info,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'chan': that.ruleForm.chan,
        'playerbalance3': that.ruleForm.playerbalance3,
        'playerbalance4': that.ruleForm.playerbalance4,
        'selectchannel': that.ruleForm.selectchannel,
        'accountnum': that.ruleForm.accountnum,
        'playerlevel': that.ruleForm.playerlevel,
        'freeztype': that.ruleForm.freeztype,
        'playerbalance1': that.ruleForm.playerbalance1,
        'playerbalance2': that.ruleForm.playerbalance2,
        'playername': that.ruleForm.playername,
        'checked': that.ruleForm.checked,
        'date1': that.ruleForm.date1,
        'date2': that.ruleForm.date2,
        'date3': that.ruleForm.date3,
      }
      this.$store.commit('setplayergamelist', setplayergamelist)
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
      },
      wj (row) {
        let that = this
        this.dialogFormVisible = true
        this.activeName2 = 'first'
        this.userid = row.id
        getuserinfo(that)
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
                getplayergamelist(that)
              }).catch(error => {
              })
            }).catch(error => {
              })
          } else {
            return false
          }
        })
      },
      sure6 () {
        let that = this;
        this.$refs.form6.validate((valid) => {
          if (valid) {
            this.$confirm('确认修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(res => {
              request({
                url:that.public.url + '/gameuser/changeusertype',
                method:'post',
                data:{
                  user_id:this.userid,
                  login_name:this.form6.name,
                  modify_type:this.form6.radio6,
                  parent_agent:this.form6.upname
                }
              }).then(res => {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                that.dialogFormVisible6 = false
                that.$refs.form6.resetFields()
                getplayergamelist(that)
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
        var start = ''
        var end = ''
        var regstart = ''
        var regend = ''
        var freezetime = ''
        var freezeendtime = ''
        if (that.ruleForm.date1 && that.ruleForm.date1.length > 0) {
          let  timestart = that.ruleForm.date1[0].getTime() /1000
          start = parseTime(timestart)
          let timeend = that.ruleForm.date1[1].getTime() /1000
          end = parseTime(timeend)
        }
        if (that.ruleForm.date2 && that.ruleForm.date2.length > 0) {
          regstart = parseTime(that.ruleForm.date2[0].getTime() /1000)
          regend = parseTime(that.ruleForm.date2[1].getTime() /1000)
        }
        if (that.ruleForm.date3 && that.ruleForm.date3.length > 0) {
          freezetime = parseTime(that.ruleForm.date3[0].getTime() /1000)
          freezeendtime = parseTime(that.ruleForm.date3[1].getTime() /1000)
        }
        request({
          url: that.public.url + '/gameuser/exportuserdata',
          method: 'post',
          data: {
            susercol: that.ruleForm.info,
            suserval: that.ruleForm.chan,
            login_time_from:start,
            login_time_to: end,
            agent_balance_min:that.ruleForm.playerbalance3,
            agent_balance_max:that.ruleForm.playerbalance4,
            org_id:that.ruleForm.selectchannel,
            login_name: that.ruleForm.accountnum,
            level:that.ruleForm.playerlevel,
            status:that.ruleForm.freeztype,
            user_balance_min:that.ruleForm.playerbalance1,
            user_balance_max:that.ruleForm.playerbalance2,
            reg_time_from: regstart,
            reg_time_to: regend,
            sort_column: that.ruleForm.playername,
            sort_type: that.ruleForm.checked,
            freeze_time_from:freezetime,
            freeze_time_to:freezeendtime
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
            getplayergamelist(that)
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
        this.$refs.form1.resetFields()
        this.$refs.form5.resetFields()
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
      reset6 (form) {
        this.dialogFormVisible6 = false
        this.$refs.form6.resetFields()
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
    var start = ''
    var end = ''
    var regstart = ''
    var regend = ''
    var freezetime = ''
    var freezeendtime = ''
    if (that.ruleForm.date1 && that.ruleForm.date1.length > 0) {
      let  timestart = that.ruleForm.date1[0].getTime() /1000
      start = parseTime(timestart)
      let timeend = that.ruleForm.date1[1].getTime() /1000
      end = parseTime(timeend)
    }
    if (that.ruleForm.date2 && that.ruleForm.date2.length > 0) {
      regstart = parseTime(that.ruleForm.date2[0].getTime() /1000)
      regend = parseTime(that.ruleForm.date2[1].getTime() /1000)
    }
    if (that.ruleForm.date3 && that.ruleForm.date3.length > 0) {
      freezetime = parseTime(that.ruleForm.date3[0].getTime() /1000)
      freezeendtime = parseTime(that.ruleForm.date3[1].getTime() /1000)
    }
    request({
      url: that.public.url + '/gameuser/getlist',
      method: 'post',
      data: {
        susercol: that.ruleForm.info,
        suserval: that.ruleForm.chan,
        login_time_from:start,
        login_time_to: end,
        agent_balance_min:that.ruleForm.playerbalance3,
        agent_balance_max:that.ruleForm.playerbalance4,
        org_id:that.ruleForm.selectchannel,
        login_name: that.ruleForm.accountnum,
        level:that.ruleForm.playerlevel,
        status:that.ruleForm.freeztype,
        user_balance_min:that.ruleForm.playerbalance1,
        user_balance_max:that.ruleForm.playerbalance2,
        reg_time_from: regstart,
        reg_time_to: regend,
        sort_column: that.ruleForm.playername,
        sort_type: that.ruleForm.checked,
        freeze_time_from:freezetime,
        freeze_time_to:freezeendtime,
        pageno: that.currentPage,
        pagerows: that.pagesize,
      }
    }).then(res => {
      let tableData = res.data.list
      that.tableData = tableData.map(v => {
        that.$set(v, 'inputshow', false)
        return v
      })
     if (res.data.nav_path === []) {
        that.nav = []
      } else {
        that.nav = res.data.nav_path.p_agents
        that.orgid = res.data.nav_path.org_id
      }
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
  .playergamelist  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .playergamelist  .el-input--suffix .el-input__inner {
    padding-right: 7px;
  }

  .playergamelist  .proxybalance {
    width: 75px;
  }

  .playergamelist  .balance {
    width: 30%;
  }

  .playergamelist  .green{
    color: green;
  }
  .playergamelist  .red{
    color: red;
  }

  .playergamelist  .playerbalance {
    width: 75px;
  }

  .playergamelist  .el-form--inline .el-form-item {
    margin-right: 0;
  }

  .playergamelist  .serchbtn {
    padding-left: 42px;
    padding-right: 42px;
  }

  .playergamelist  .el-pagination {
    float: right;
  }

  /*调整清空筛选和导出excel按钮位置*/
  .playergamelist  .tree {
    float: left;
  }

 .playergamelist   .channel {
    width: 60%
  }

  .playergamelist  .pchannel {
    /*background:rgb(69,90,130);*/
    width: 200px;
    margin-bottom: 10px;
  }

  .playergamelist  .playerinfo {
    padding-left: 10px;
  }

  .playergamelist  .sizetext {
    font-size: 14px;
  }

  .playergamelist  .playerlist {
    background: rgb(140, 161, 193);
    font-weight: bold;
    letter-spacing: 1px;
    padding: 7px 3px 7px 3px;
    text-align: center;
    font-size: 14px;
  }

  .playergamelist  .freeztype {
    width: 55%;
  }

  .playergamelist  .operate {
    width: 200px;
  }
  .playergamelist  el-table>el-table-column{
    width:100% auto
  }
  .playergamelist  .positionside{
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
  .playergamelist .el-tree{
    width: 100%;
    overflow: auto;
  }
  .playergamelist .el-tree>.el-tree-node{
    min-width: 100%;
    display: inline-block!important;
  }
</style>
