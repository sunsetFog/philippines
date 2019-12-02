<template>
  <div class="app-container bjlclassic">
       <el-tabs type='card' @tab-click="cardTab">
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>龙虎斗（经典场）</span>
            </el-form-item>
            <!-- <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop='number'>
              <el-input v-model="form.number" type='number' style="width:140px"></el-input><span>秒</span>
            </el-form-item> -->
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="depict">
              <el-input v-model="form.depict" type="textarea" style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>可用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" @click="sure(form)" v-if="gamesetsavebase">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="投注项">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                  <el-col :span="2">
                    <el-button type="primary" round @click="add" v-if="gamesetaddtable"> 新增 </el-button>
                  </el-col>
                   <el-col :span="6">
                      <el-form-item label="桌子ID">
                          <el-input v-model="formInline.id" placeholder="请输入桌子ID" clearable></el-input>                
                      </el-form-item>
                    </el-col>
                  <el-col :span="6">
                    <el-form-item label="桌子名称">
                        <el-input v-model="formInline.name" placeholder="请输入桌子名称" clearable></el-input>    
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamesetgetbetitemlist">查询</el-button>
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
            border
            style="width: 100%">
              <el-table-column
                label="桌子ID"
                prop="id">
              </el-table-column>
              <el-table-column
              prop="bet_count_down"
              label="投注倒计时（秒）">
            </el-table-column>
            <el-table-column
              prop="sortid"
              label="排序">
            </el-table-column>
            <el-table-column
              prop="name"
              label="桌子名称">
            </el-table-column>
            <el-table-column
              prop="status"
              label="桌子状态">
            </el-table-column>
            <el-table-column
            width='150'
              label="桌子操作">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small" v-if='gamesetupdatetable'>修改</el-button>
                <el-button @click="up(scope.row)" type="text" size="small" class='green' v-if="scope.row.status === '禁用' && gamesetupdatetablestatus">开启</el-button>
                <el-button @click="down(scope.row)" type="text" size="small" class="red" v-if="scope.row.status === '开启' && gamesetupdatetablestatus">禁用</el-button>
                <el-button @click="rtpgl(scope.row)" type="text" size="small" class="" v-if='gamertpsetgetrtpsetinfo'>RTP管理</el-button>
                <el-button @click="del(scope.row)" type="text" size="small" v-if="gamesetdeltable && scope.row.status === '禁用'">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="代码">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="code"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column
              label="投注项名称">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="name"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="投注项总限红">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="alot_bet_max_limit"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="投注项个人下限">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="evot_bet_min_limit"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="投注项个人上限">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="evot_bet_max_limit"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="投注项操作">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.item"
                  border
                  style="width: 100%">
                    <el-table-column
                      label="">
                      <template slot-scope="scope2">
                        <el-button @click="edittzx(scope,scope2.row)" type="text" size="small" v-if="gamesetupdatebetitem">修改</el-button>
                      </template>
            </el-table-column>
                </el-table>
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

        </el-tab-pane>
        <el-tab-pane label="系统抽水率">

           <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:10%;">
            <div class="cell"></div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">系统抽水率</div>
          </th>
          <th colspan='1' rowspan="1" style="width:30%;">
            <div class="cell">操作</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:10%;background: #bdd7ee;color: black;font-weight: 600;">
              <div class="cell">龙虎斗</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="rate_active" v-model="rate_input"></el-input>
                <span v-else>{{pumping_rate}}%</span>
              </div>
            </td>
            <td crowspan="1" colspan="1" style="width:30%;">
              <div class="cell">
                <el-button type="primary" v-if="rate_active && gamesetupdateddzroyalty" @click="sureRate">保存</el-button>
                <el-button type="primary" v-if="rate_active" @click="cancelRate">取消</el-button>
                <el-button type="primary" v-else @click="modifyRate">修改</el-button>
              </div>
            </td>
        </tr>

      </tbody>
    </table>


    <div>
      <P>备注：</P>
      <p style="margin-left: 27px;">系统抽税率只能输入大于等于0且小于等于1的数据，并且最多支持小数点后四位。</p>
    </div>
    
  </div>
</div>


        </el-tab-pane>

      </el-tabs>

      <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset1">
    <el-form :model="form1" :rules="rules1" ref="form1">
       <el-form-item label="桌子ID：" :label-width="formLabelWidth" v-if="tableid">
         <span>{{id}}</span>
      </el-form-item>
      <el-form-item label="桌子名称：" :label-width="formLabelWidth" prop='table'>
        <el-input v-model="form1.table" clearable></el-input>
      </el-form-item>
      <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop='number'>
        <el-input v-model="form1.number" clearable typr='number' style='width:80%'></el-input><span>秒</span>
      </el-form-item>
       <el-form-item label="排序" :label-width="formLabelWidth" prop='sort'>
        <el-input v-model="form1.sort" clearable typr='number'></el-input>
      </el-form-item>
      <el-form-item label="桌子状态" :label-width="formLabelWidth" prop='status'>
       <el-select v-model="form1.status" filterable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset1(form)">取 消</el-button>
      <el-button type="primary" @click="sure1(form)">确 定</el-button>
    </div>

  </el-dialog>


      <el-dialog :title='title2'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
       <el-form-item label="桌子ID：" :label-width="formLabelWidth">
         <span>{{id}}</span>
      </el-form-item>
      <el-form-item label="桌子名称：" :label-width="formLabelWidth">
        <span>{{tablename}}</span>
      </el-form-item>
       <el-form-item label="投注项代码" :label-width="formLabelWidth">
        <!-- <el-input v-model="form2.code"></el-input> -->
        <span>{{form2.code}}</span>
      </el-form-item>
       <el-form-item label="投注项名称" :label-width="formLabelWidth" prop='name'  v-if="name">
        <el-input v-model="form2.name"></el-input>
      </el-form-item>
      <el-form-item label="投注项名称" :label-width="formLabelWidth" v-else>
        <span>{{betname}}</span>
      </el-form-item>
       <el-form-item label="每局总限红" :label-width="formLabelWidth" prop='day'>
        <el-input v-model="form2.day" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <el-form-item label="每局个人下限" :label-width="formLabelWidth" prop='min'>
        <el-input v-model="form2.min" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <el-form-item label="每局个人上限" :label-width="formLabelWidth" prop='max'>
        <el-input v-model="form2.max" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <!-- <el-form-item label="桌子状态" :label-width="formLabelWidth" prop='status'>
       <el-select v-model="form2.status" filterable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item> -->
                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form)">取 消</el-button>
      <el-button type="primary" @click="sure2(form)">确 定</el-button>
    </div>

  </el-dialog>
 <el-dialog :title='title3'  :visible.sync="dialogFormVisible3" :before-close="reset3">
     <el-form :model="form3" :rules="rules3" ref="form3">
       <el-form-item label="游戏名：" :label-width="formLabelWidth" >
         <span>{{tablename3}}</span>
      </el-form-item>
       <el-form-item label="牌桌：" :label-width="formLabelWidth">
         <span>{{betid3}}</span>
      </el-form-item>
       <el-form-item label="RTP生效投注额：" :label-width="formLabelWidth" prop='rate_input3'>
         <el-input v-if="rate_active3" v-model="form3.rate_input3" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.valid_bet_limit}}</span> -->
         <span v-else>{{form3.rate_input3}}</span>
         <span>元</span>
      </el-form-item>
       <el-form-item label="RTP重置投注额：" :label-width="formLabelWidth" prop='rate_input4'>
          <el-input v-if="rate_active3" v-model="form3.rate_input4" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.reset_bet_limit}}</span> -->
         <span v-else>{{form3.rate_input4}}</span>
          <span>元</span>
      </el-form-item>
       <el-form-item label="RTP上限：" :label-width="formLabelWidth" prop='rate_input5'>
         <el-input v-if="rate_active3" v-model="form3.rate_input5" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.upper_limit?form3.upper_limit:''}}</span> -->
          <span v-else>{{form3.rate_input5}}</span>
          <span>%</span>
      </el-form-item>
       <el-form-item label="RTP下限：" :label-width="formLabelWidth" prop='rate_input6'>
          <el-input v-if="rate_active3" v-model="form3.rate_input6" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.lower_limit?form3.lower_limit:''}}</span> -->
          <span v-else>{{form3.rate_input6}}</span>
         <span>%</span>
      </el-form-item>
       <el-form-item label="放水生效概率：" :label-width="formLabelWidth" prop='rate_input7'>
          <el-input v-if="rate_active3" v-model="form3.rate_input7" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.loss_valid_prob?form3.loss_valid_prob:''}}</span> -->
         <span v-else>{{form3.rate_input7}}</span>
         <span>%</span>
      </el-form-item>
       <el-form-item label="抽水生效概率：" :label-width="formLabelWidth" prop='rate_input8'>
          <el-input v-if="rate_active3" v-model="form3.rate_input8" style='width:80%'></el-input>
         <!-- <span v-else>{{form3.royalty_valid_prob?form3.royalty_valid_prob:''}}</span> -->
          <span v-else>{{this.form3.rate_input8}}</span>
         <span>%</span>
      </el-form-item>                                 
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="sure2(form)">确定</el-button> -->
      <el-button v-if=" !rate_active3" type="primary" @click="modifyRateTwo(form3)">修改配置</el-button>
      <el-button  type="primary" v-if="gamertpsetupdatertpset && rate_active3 " @click="sureConfig(form3)" >保存配置</el-button>
      <el-button @click="reset3(form3)">取 消</el-button>     
    </div>
  </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    var number = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入投注倒计时长'));
      }else {
        if(value*1<0 || value.indexOf('.')>0) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      }
   }; 
   var solts = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请填排序'));
      }else {
        if(value*1<1||value*1>100||value.indexOf('.')>0) {
          callback(new Error('请输入1到100的整数'));
        } else {
            callback();
        }
      }
   }; 
   var validateMone =(rule, value, callback)=>{
     if(value*1<=0 || value.indexOf('.')>0 || isNaN(value)) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
   };
    var validateMtwo =(rule, value, callback)=>{
     if(value*1<=0 || isNaN(value) ) {
          callback(new Error('请输入正数'));
        } else {
          callback();
        }
   };
    return {
      formInline: {
        id: '',
        name: ''
      },
      form: {
        number: '',
        depict: '',
        status: ''
      },
      currentPage: 1,
      tableData: [
      ],
      total: 0,
      pagesize: 20,
      id: '',
      title: '',
      dialogFormVisible: false,
      formLabelWidth: '180px',
      form1: {
        table: '',
        number: '',
        status: '1',
        sort: ''
      },
      rules: {
        number: {required: true, message: '请填写投注倒计时长', trigger: 'blur'},
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      rules1: {
        table: [
          {required: true, message: '请填写桌子名称', trigger: 'blur'},
          {min: 0, max:6, message: '桌子名称应为6个字符以内', trigger: 'blur'}
        ],
        number: {required: true, validator: number, trigger: 'blur'},
        status: {required: true, message: '请选择状态', trigger: 'change'},
        sort: [{required: true, validator: solts, trigger: 'blur'}],
      },
      statuslist: [
        {name:'开启',id: '1' },
        {name:'禁用',id: '0' }
      ],
      form2: {
        code: '',
        name: '',
        day: '',
        min: '',
        max: '',
      },
      rules2: {
        code: {required: true, message: '请填写投注项代码', trigger: 'blur'},
        name: {required: true, message: '请填写投注项名称', trigger: 'blur'},
        day: {required: true, message: '请填写每局总限红', trigger: 'blur'},
        min: {required: true, message: '请填写每局个人下限', trigger: 'blur'},
        max: {required: true, message: '请填写每局个人上限', trigger: 'blur'},
      },
      dialogFormVisible2: false,
      title2: '',
      name: false,
      tableid: false,
      tablename: '',
      betname: '',
      betid: '',
      pumping_rate: null,
      rate_active: false,
      rate_input: '',
       form3: {
          rate_input3:'',
          rate_input4:'',
          rate_input5:'',
          rate_input6:'',
          rate_input7:'',
          rate_input8:'',
      },
      rules3: {
          rate_input3:{required: true,validator:validateMone, trigger:'blur'},
          rate_input4:{required: true,validator:validateMone, trigger:'blur'},
          rate_input5:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input6:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input7:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input8:{required: true,validator:validateMtwo, trigger:'blur'},
      },
      dialogFormVisible3: false,
      title3: '',
      tablename3:'',
      betid3:'',
      rate_active3: false,//span改为input的标识
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetupdatetable',
      'gamesetaddtable',
      'gamesetupdatetablestatus',
      'gamesetaddbetitem',
      'gamesetupdatebetitem',
      'gamesetgetbetitemlist',
      'gamesetdeltable',
      'gamesetupdateddzroyalty',
      'gamertpsetgetrtpsetinfo',
      'gamertpsetupdatertpset'
    ])
  },
  watch: {
  },
  filters: {
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      getlist(this)
    },
    cardTab(val,res){
      if(val.index==2){
        getRate(this)
      }
    },
    modifyRate(){
      this.rate_active = true;
      this.rate_input = chumul(this.pumping_rate*1,100);
    },
    sureRate(){
      let that = this;
      if (that.rate_input * 1 <0 || that.rate_input * 1 >1 || that.rate_input.indexOf('.') > 0 && that.rate_input.split('.')[1].length > 4) {
        this.$message.error('系统抽税率只能输入大于等于0且小于等于1的数据，并且最多支持小数点后四位。')
        return false
      }
      let json = {
        game_id: 801,
        type: 1,
        royalty: that.rate_input
      }
      request({
        url: that.public.url + '/gamename/setroyatly',
        method: 'post',
        data: json
      }).then(res => {
        if(res.code==0){
          that.$message.success('修改成功');
          that.rate_active = false;
          that.pumping_rate = accmul(that.rate_input*1,100)
        }else{
          that.$message.success(res.message);
        }
        
      }).catch(error => {
      })
    },
    cancelRate(){
      this.rate_active = false;
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: 801,
                  // bet_count_down: this.form.number,
                  depict: this.form.depict,
                  status: this.form.status,
                  type: 1
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            getinfo(that)
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
     del (row) {
       let that = this
      this.$confirm('此操作将删除该桌子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gameset/deltable',
            method: 'post',
            data: {
                table_id: row.id
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
    edit (row) {
      this.title = '修改桌子'
      this.tableid = true
      this.dialogFormVisible = true
      this.id = row.id
      this.form1.table = row.name
      this.form1.number = row.bet_count_down
      this.form1.sort = row.sortid
      if (row.status == '开启') {
        this.form1.status = '1'
      } else {
        this.form1.status = '0'
      }
    },
    addtzx (row) {
      this.title2 = '投注项-新增'
      this.name = true
      this.dialogFormVisible2 = true
      this.id = row.id
      this.tablename = row.name
    },
     rtpgl (row) {
      let that = this
      this.title3 = 'RTP管理-查看'
      this.dialogFormVisible3 = true
      this.id = row.id
       request({
        url: that.public.url + '/gamertpset/getrtpsetinfo',
        method: 'post',
        data: {
              game_id:801,
              type:1,
              table_id: row.id
        }
      }).then(res => {
        // that.form3 = res.data
        this.form3.rate_input3 = res.data.valid_bet_limit
        this.form3.rate_input4 = res.data.reset_bet_limit
        this.form3.rate_input5 = res.data.upper_limit*100
        this.form3.rate_input6 = res.data.lower_limit*100
        this.form3.rate_input7 = res.data.loss_valid_prob*100
        this.form3.rate_input8 = res.data.royalty_valid_prob*100      
        this.tablename3 = res.data.game_name
        this.betid3 = res.data.table_name
        this.tableid3 = res.data.table_id
      }).catch(error => {
      })
    },
     reset3 () {
      this.dialogFormVisible3 = false
      this.rate_active3 = false
      this.$refs.form3.resetFields()
    },
     modifyRateTwo(form3){//diolog3的RTP修改配置函数 去除NULL和NAN
      this.rate_active3 = true;
      this.rate_input3 = this.form3.valid_bet_limit?this.form3.valid_bet_limit:''
      this.rate_input4 = this.form3.reset_bet_limit?this.form3.reset_bet_limit:''
      this.rate_input5 = this.form3.upper_limit? this.form3.upper_limit:''
      this.rate_input6 = this.form3.lower_limit?this.form3.lower_limit:''
      this.rate_input7 = this.form3.loss_valid_prob?this.form3.loss_valid_prob:''
      this.rate_input8 = this.form3.royalty_valid_prob?this.form3.royalty_valid_prob:''
      // this.rate_input = this.pumping_rate/100;
    },
    sureConfig(form3){//RTP管理-查看保存配置
          let that = this
           this.$refs.form3.validate((valid) => {
        if (valid) {
        request({
            url: that.public.url + '/gamertpset/updatertpset',
            method: 'post',
            data: {
                  game_id:801,
                  type:1,
                  table_id:this.tableid3,
                  valid_bet_limit:this.form3.rate_input3*1,
                  reset_bet_limit:this.form3.rate_input4*1,
                  upper_limit:this.form3.rate_input5/100,
                  lower_limit:this.form3.rate_input6/100,
                  loss_valid_prob:this.form3.rate_input7/100,
                  royalty_valid_prob:this.form3.rate_input8/100,
            }
          }).then(res => {
           that.$message({
              type: 'success',
              message: res.message
            })
              that.dialogFormVisible3 = false
              that.$refs.form3.resetFields()
              getlist(that)
              this.rate_active3 = false
          }).catch(error => {
          })
        }else{
          return false
        }
           })
    },
    edittzx (scope,row) {
      let that = this
      this.title2 = '投注项-修改'
      this.name = false
      this.dialogFormVisible2 = true
      this.betname = row.name
      this.tablename = scope.row.name
      this.id = scope.row.id
      this.betid = row.id
      request({
        url: that.public.url + '/gameset/getbetiteminfo',
        method: 'post',
        data: {
              id: row.id
        }
      }).then(res => {
        this.form2.code = res.data.code
        this.form2.max = res.data.evot_bet_max_limit
        this.form2.min = res.data.evot_bet_min_limit
        this.form2.day = res.data.alot_bet_max_limit
      }).catch(error => {
      })
    },
    add () {
      this.title = '新增桌子'
      this.tableid = false
      this.dialogFormVisible = true
    },
    up (row) {
      let that = this
      this.$confirm('此操作将开启改桌子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gameset/updatetablestatus',
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
          message: '已取消开启'
        });
      });
    },
    down (row) {
       let that = this
      this.$confirm('此操作将禁用改桌子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gameset/updatetablestatus',
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
          message: '已取消禁用'
        });
      });
    },
    reset1 () {
      this.dialogFormVisible = false
      this.$refs.form1.resetFields()
    },
    reset2 () {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    sure1 () {
        let that = this
        this.$refs.form1.validate((valid) => {
        if (valid) {
          that.$confirm('', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            if (this.title === '修改桌子') {
              request({
                url: that.public.url + '/gameset/updatetable',
                method: 'post',
                data: {
                      id: this.id,
                      game_id: 801,
                      name: this.form1.table,
                      bet_count_down: this.form1.number,
                      status: this.form1.status,
                      sortid: this.form1.sort,
                }
              }).then(res => {
                that.$message({
                  type: 'success',
                  message: res.message
                })
                that.dialogFormVisible = false
                that.$refs.form1.resetFields()
                getlist(that)
              }).catch(error => {
              })

            } else {
              request({
                url: that.public.url + '/gameset/addtable',
                method: 'post',
                data: {
                      game_id: 801,
                      type: 1,
                      name: this.form1.table,
                      bet_count_down: this.form1.number,
                      status: this.form1.status,
                      sortid: this.form1.sort,
                }
              }).then(res => {
                that.$message({
                  type: 'success',
                  message: res.message
                })
                that.dialogFormVisible = false
                that.$refs.form1.resetFields()
                getlist(that)
              }).catch(error => {
              })
            }
          }).catch(error => {
          })
          
        } else {
          return false
        }
      })
    },
    sure2 () {
      let that = this
        this.$refs.form2.validate((valid) => {
        if (valid) {
          that.$confirm('', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            if (this.title2 === '投注项-修改') {
             request({
              url: that.public.url + '/gameset/updatebetitem',
              method: 'post',
              data: {
                    id: this.betid,
                    type: 1,
                    evot_bet_max_limit: this.form2.max,
                    evot_bet_min_limit: this.form2.min,
                    alot_bet_max_limit: this.form2.day
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible2 = false
              that.$refs.form2.resetFields()
              getlist(that)
            }).catch(error => {
            })

          } else {
             request({
              url: that.public.url + '/gameset/addbetitem',
              method: 'post',
              data: {
                    game_id: 801,
                    table_id: this.id,
                    name: this.form2.name,
                    code: this.form2.code,
                    evot_bet_max_limit: this.form2.max,
                    evot_bet_min_limit: this.form2.min,
                    alot_bet_max_limit: this.form2.day
              }
              }).then(res => {
                that.$message({
                  type: 'success',
                  message: res.message
                })
                that.dialogFormVisible2 = false
                that.$refs.form2.resetFields()
                getlist(that)
              }).catch(error => {
              })
            }
          }).catch(error => {
          })
          
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: {
      game_id: 801,
      type: 1,
      table_id: that.formInline.id,
      table_name: that.formInline.name,
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}

function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: 801,
        type: 1
      }
    }).then(res => {
      that.form.depict = res.data.depict
      // that.form.number = res.data.bet_count_down
      that.form.status = res.data.status * 1
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

function getRate (that) {
    request({
      url: that.public.url + '/gamename/getgamenamelist',
      method: 'post',
      data: {
      }
    }).then(res => {
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].id==801&&res.data[i].type==1){
          that.pumping_rate = res.data[i].royalty/100;
          // console.log('rate&&',that.pumping_rate);
        }
      }
    }).catch(error => {
    })
}


function accmul(num1,num2) {
  var m=0,s1=num1.toString(),s2=num2.toString(); 
  try{m+=s1.split(".")[1].length}catch(e){};
  try{m+=s2.split(".")[1].length}catch(e){};
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


  function chumul(num1,num2) {
			var m=0,n=0 ,s1=num1.toString(),s2=num2.toString(); 
      try{m=s1.split(".")[1].length}catch(e){};
      try{n=s2.split(".")[1].length}catch(e){};
      return (Number(s1.replace(".",""))/Number(s2.replace(".","")))*Math.pow(10,n-m);
	}


</script>

<style>
.bjlclassic .el-table__row {
  height: 57px;
}
</style>
