<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          


          <el-col :span="6">
            <el-form-item label="处理状态">
                <el-select v-model="formInline.status" filterable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.id" filterable clearable>
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
            <el-form-item label="玩家账号" label-width="70px">
            <el-input v-model="formInline.account" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6">
            <el-form-item label="UID" label-width="70px">
            <el-input v-model="formInline.uid" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          
          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="80px">
        <el-col :span="8">
            <el-form-item label="申请时间">
              <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              :editable="false"
              range-separator="-"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="充值方式">
                <el-select v-model="formInline.chareg" filterable clearable>
                <el-option
                  v-for="item in moneylist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="充值设备">
                <el-select v-model="formInline.device" filterable clearable>
                <el-option
                  v-for="item in weblist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-form>
      </el-row>

       <el-row>
        <el-form :inline="true" label-width="80px">
        <el-col :span="8">
            <el-form-item label="到账时间">
              <el-date-picker
              v-model="formInline.time1"
              type="datetimerange"
              :editable="false"
              range-separator="-"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="充值ID">
                 <el-input v-model="formInline.rechargeid" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="复审人">
                 <el-input v-model="formInline.s_audit_account" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平台附言">
                 <el-input v-model="formInline.platform" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="充值来源">
                <!-- <el-input v-model="formInline.name" placeholder="充值来源" clearable></el-input> -->
                <el-select v-model="formInline.name" filterable clearable>
                <el-option
                  v-for="item in allname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="6">
            <el-form-item label="订单号">
                 <el-input v-model="formInline.order_no" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="payrechargesgetauditlist">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="excel" v-if="payrechargesexcelexport">导出excel</el-button>
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
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="uid"
      label="UID">
    </el-table-column>
    <el-table-column
      prop="order_no"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="user_account"
      label="玩家账号">
    </el-table-column>
    <el-table-column
      prop="top_agent_account"
      label="所属总代">
    </el-table-column>
    <el-table-column
      prop="org_name"
      label="玩家渠道">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="申请时间">
    </el-table-column>
    <el-table-column
      prop="source"
      label="充值来源">
    </el-table-column>
    <el-table-column
      prop="pay_method"
      label="充值方式">
    </el-table-column>
    <el-table-column
      prop="money"
      label="发起金额">
    </el-table-column>
    <el-table-column
      prop="device"
      label="充值设备">
    </el-table-column>
    <el-table-column
      prop="ps_platform"
      label="平台附言">
    </el-table-column>
     <el-table-column
      label="到账时间">
      <template slot-scope="scope">
        {{scope.row.arrival_time | time}}
      </template>
    </el-table-column>
    <el-table-column
      label="手续费">
      <template slot-scope="scope">
        {{scope.row.broker_money}}
      </template>
    </el-table-column>
    <el-table-column
      label="到账金额">
      <template slot-scope="scope">
        {{scope.row.arrival_money}}
      </template>
    </el-table-column>
    <el-table-column
      label="实际附言">
      <template slot-scope="scope">
        {{scope.row.ps_fact}}
      </template>
    </el-table-column>
     <el-table-column
      label="复审人">
      <template slot-scope="scope">
        {{scope.row.s_audit_account}}
      </template>
    </el-table-column>
     <el-table-column
      label="上传图片"  width="150">
      <template slot-scope="scope">
       <el-button v-if="scope.row.status==='支付中'" @click="openForm(scope.row)" type="primary">上传图片</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.status === '支付中' && payrechargesauditone">审核</el-button>
        <el-button @click="edit2(scope.row)" type="text" size="small" v-if="scope.row.status === '已初审' && payrechargesaudittwo">复审</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="上传查看">
      <template slot-scope="scope">
        <el-button @click="view(scope.row)" type="text" size="small" v-if="scope.row.audit_cert_pic!=''">查看</el-button>
      </template>
    </el-table-column>
  </el-table>

<div class="pagingbox">
  <div class="paging" style="margin-top: 30px;">
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
      <el-form-item label="玩家渠道" :label-width="formLabelWidth">
        {{userinfo.org_name}}
      </el-form-item>
      <el-form-item label="玩家账号" :label-width="formLabelWidth">
        {{userinfo.user_account}}
      </el-form-item>
      <el-form-item label="充值申请时间" :label-width="formLabelWidth">
        {{userinfo.create_time}}
      </el-form-item>
       <el-form-item label="充值来源" :label-width="formLabelWidth">
        {{userinfo.source}}        
      </el-form-item>
       <el-form-item label="支付方式" :label-width="formLabelWidth">
        {{userinfo.pay_method}}     
      </el-form-item>
      <el-form-item label="接口返回信息" :label-width="formLabelWidth">
        {{userinfo.status}}     
      </el-form-item>
      <el-form-item label="订单金额" :label-width="formLabelWidth">
        {{userinfo.money}}     
      </el-form-item>
      <el-form-item label="实际汇款金额" :label-width="formLabelWidth" prop="money">
        <el-input v-model="form.money" type='number'></el-input>
      </el-form-item>
      <el-form-item label="附言" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="附件上传" :label-width="formLabelWidth">
         <el-upload
              class="upload-demo"
              :action="action"
              :headers='token'
              :on-exceed="exceed"
              :on-success='success'
              :on-error='error'
              :show-file-list='showfile'
              :before-upload='before'
              multiple
              :limit="1"
              :file-list="fileList">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片文件,且文件大小不超过5m</div>
          </el-upload>
      </el-form-item>
       <el-form-item label="上传图片名" :label-width="formLabelWidth">
        <span>{{imgname}}</span>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>
  </el-dialog>

<!--  :http-request="uploadImg" -->
<el-dialog :title='titleM'  :visible.sync="dialogFormVisibleM" :before-close="resetM">
    <el-form :model="form" :rules="rules" ref="formM">     
      <el-form-item label="附件上传" :label-width="formLabelWidth">
         <el-upload
              class="upload-demo"
              :action="action"
              :headers='token'
              :on-exceed="exceed"
              :on-success='success2'
              :on-error='error2'          
              :show-file-list='showfile'
              :before-upload='before'
              multiple
              :limit="1"
              :file-list="fileList2">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片文件,且文件大小不超过5m</div>
          </el-upload>
      </el-form-item>
       <el-form-item label="上传图片名" :label-width="formLabelWidth">
        <span>{{imgname2}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetM(form)">取 消</el-button>
      <el-button type="primary" @click="sureM(form)">确 定</el-button>
    </div>
  </el-dialog>


  
  <el-dialog title='充值复审'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
      <el-form-item label="玩家渠道" :label-width="formLabelWidth">
        {{usertwoinfo.org_name}}
      </el-form-item>
      <el-form-item label="玩家账号" :label-width="formLabelWidth">
        {{usertwoinfo.user_account}}
      </el-form-item>
       <el-form-item label="所属总代" :label-width="formLabelWidth">
        {{usertwoinfo.top_agent_account}}        
      </el-form-item>
       <el-form-item label="充值金额" :label-width="formLabelWidth">
        {{usertwoinfo.money}}     
      </el-form-item>
      <el-form-item label="发起时间" :label-width="formLabelWidth">
        {{usertwoinfo.create_time}}     
      </el-form-item>
      <el-form-item label="玩家备注" :label-width="formLabelWidth">
        {{usertwoinfo.ps_platform}}     
      </el-form-item>
      <el-form-item label="此信息来自审核员提供" :label-width="formLabelWidth">
        <div>
            <el-form>
                <el-form-item label="交易单号" :label-width="formLabelWidth">
                  {{usertwoinfo.order_no}}
                </el-form-item>
                <el-form-item label="充值来源" :label-width="formLabelWidth">
                  {{usertwoinfo.source}}
                </el-form-item>
                <el-form-item label="支付方式" :label-width="formLabelWidth">
                  {{usertwoinfo.pay_method}}
                </el-form-item>
                <el-form-item label="接口返回信息" :label-width="formLabelWidth">
                  {{usertwoinfo.status}}
                </el-form-item>
                <el-form-item label="实际审核汇款金额" :label-width="formLabelWidth">
                  {{usertwoinfo.factrem_money}}
                </el-form-item>
                <el-form-item label="附言" :label-width="formLabelWidth">
                  {{usertwoinfo.ps_fact}}
                </el-form-item>
                <el-form-item label="充值申请时间" :label-width="formLabelWidth">
                  {{usertwoinfo.create_time}}
                </el-form-item>
                <el-form-item label="审核员操作时间" :label-width="formLabelWidth">
                  {{usertwoinfo.f_audit_time}}
                </el-form-item>
            </el-form>
        </div>
        <div>
          <img :src="src" width="80%;" :class="{'active':isChoose}" @click="imgscc()">
        </div>
      </el-form-item>
      <el-form-item label="可选操作" :label-width="formLabelWidth" prop='radio'>
         <el-radio v-model="form2.radio" label="2" size="mini" style="color:green;">设为：审核成功</el-radio>
          <el-radio v-model="form2.radio" label="4" size="mini" style="color:red;">设为：审核失败</el-radio>
      </el-form-item>
      <el-form-item label="请选择失败原因" :label-width="formLabelWidth" prop='reason' v-if="reason">
         <el-radio v-model="form2.reason" label="附言违规，不予受理" size="mini">附言违规，不予受理</el-radio>
          <el-radio v-model="form2.reason" label="金额不正确，不予受理" size="mini">金额不正确，不予受理</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form2)">取 消</el-button>
      <el-button type="primary" @click="sure2(form2)">确 定</el-button>
    </div>

  </el-dialog>


  <el-dialog title='查看预览'  :visible.sync="dialogFormVisible3">
    <img :src="imgsrc" style="width:100%">
    
  <el-button @click="reset3()">取 消</el-button> 
  </el-dialog>


  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth';
export default {
  data() {
    return {
      formInline: {
        status: [],
        id: '',
        account: '',
        chareg: '',
        device: '',
        time: [],
        time1: [],
        rechargeid: '',
        s_audit_account:'',
        platform: '',
        uid: '',
        order_no:'',
      },
      form2: {
        radio: '',
        reason: ''
      },
      rules2: {
        radio: [
          {required: true, message: '请选择操作', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请选择审核失败原因', trigger: 'change'}
        ]
      },
      showfile: true,
      imgsrc: '',
      userinfo: {},
      statuslist: [],
      currentPage: 1,
      tableData: [],
      moneylist: [],
      allname:[],
      typelist: [
        {name: '全部', type: ''},
        {name: '支付中', type: '0'},
        {name: '人工充值成功', type: '2'},
        {name: '充值成功(第三方返回)', type: '1'},
        {name: '已初审', type: '3'},
        {name: '充值失败', type: '4'},
        {name: '超时无效', type: '5'},
      ],
      weblist: [
        {name: '全部', type: ''},
        {name: 'ios', type: 'ios'},
        {name: 'android', type: 'android'},
        {name: 'web', type: 'web'},
      ],
      total: 0,
      pagesize: 20,
      id: '',
      title: '',
      titleM:'',
      dialogFormVisible: false,
      dialogFormVisibleM:false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        name: '',
        money: ''
      },
      formM:'',
      imgname: '',
       imgname2: '',
      rules: {
        name: [
          {required: true, message: '请输入附言', trigger: 'blur'}
        ],
        money:[
          {required: true, message: '请输入实际汇款金额', trigger: 'blur'}
        ]
      },
      formLabelWidth: '180px',
      fileList: [],
      fileList2: [],
      order_no: '',
      file_name: '',
      usertwoinfo: {},
      src: '',
      reason: false,
      isChoose: false,
      picId:'',
      fileData:{
        id:''
      },
    }
  },
  created() {
    let that = this
    getaccount(this)
    getallname(this)
    getrecharge(this)
    if (!this.online.length && this.online.length != 0) {
      that.formInline.status = this.online.status
      that.currentPage = this.online.currentPage
      that.pagesize = this.online.pagesize
      that.formInline.id = this.online.id
      that.formInline.account = this.online.account
      that.formInline.chareg = this.online.chareg
      that.formInline.time = this.online.time
      that.formInline.time1 = this.online.time1
      that.formInline.rechargeid = this.online.rechargeid 
      that.formInline.platform = this.online.platform
      that.formInline.order_no = this.online.order_no
      that.formInline.uid = this.online.uid
      getlist(this)
    }
    if (Object.keys(this.$route.query).length > 0) {
      if (this.$route.query.user) {
        that.formInline.account = this.$route.query.user
      }
      if (this.$route.query.timeto && this.$route.query.timefrom) {
          var date = this.$route.query.timeto
          date = date.substring(0,19)
          date = date.replace(/-/g,'/')
          date = new Date(date).getTime()
          var date1 = this.$route.query.timefrom
          date1 = date1.substring(0,19)
          date1 = date1.replace(/-/g,'/')
          date1 = new Date(date1).getTime()
          that.formInline.time1 = [date, date1]
      }
      if (this.$route.query.org) {
        that.formInline.id = this.$route.query.org
      }
        that.formInline.status = ''
        // that.formInline.status = '1,2'
      getlist(this)
    }
  },
  computed: {
      token () {
        return {
          'X-Token': getToken()
        }
      },
      action () {
        return this.public.url + '/payrecharges/upload'
      },
      ...mapGetters([
        'payrechargesgetauditlist',
        'payrechargesexcelexport',
        'payrechargesaudittwo',
        'payrechargesauditone',
        'online'
      ])
    },
  watch: {
    'form2.radio': function (val) {
      if(val==='4'){
        this.reason=true
      } else {
        this.reason=false
      }
    }
  },
  filters: {
    time (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    }
  },
  methods: {
    // uploadImg(img){
    //   let formData = new FormData()
    //   formData.append('id',this.fileData)
    //   Api.uploadFile({
    //     data:formData
    //   }).then((data)=>{
    //     console.log(data)
    //   }).catch((err)=>{

    //   })
    // },
    uploadData(){
      return this.fileData
    },
    edit (row) {
      this.title = '玩家充值审核'
      this.dialogFormVisible = true
      this.id = row.id
      getuserinfo(this)
    },
    view (row) {
      let src = row.audit_cert_pic.replace(/\\/g,'/')
      this.imgsrc =this.public.url + '/' +src
      this.dialogFormVisible3 = true
    },
    reset3 () {
      this.dialogFormVisible3 = false
    },
    edit2 (row) {
      let that = this
      this.dialogFormVisible2 = true
      this.id = row.id
      request({
        url: that.public.url + '/payrecharges/gettwo',
        method: 'post',
        data: {
          id: row.id,
          chagne: 3
        }
      }).then(res => {
       that.usertwoinfo = res.data.list
       if (res.data.list.audit_cert_pic==='') {
         that.src = ''
       } else {
         let src = res.data.list.audit_cert_pic.replace(/\\/g,'/')
         that.src = that.public.url + '/' +res.data.list.audit_cert_pic
       }
      }).catch(error => {
      })
    },
    imgscc () {
      this.isChoose = !this.isChoose
    },
    reset () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    sure () {
      let that = this
        that.$refs.form.validate((valid) => {
        if (valid) {
        that.$confirm('确认审核吗?', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
          request({
            url:that.public.url + '/payrecharges/auditone',
            method:'post',
            data:{
              arrival_money: that.form.money,
              ps_fact: that.form.name,
              file_name: that.imgname,
              id: that.id
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            that.imgname = ''
            that.dialogFormVisible = false
            getlist(that)
          }).catch(error => {
          })
        }).catch(error => {
        })
        } else {
          return false
        }
        })
    },
    exceed(file) {
      if (file.length > 1) {
        this.$message({
          message: '一次只能上传一个文件',
          type: 'warning'
        });
      }
    },
    before(file) {		
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'tif'
				const extension2 = testmsg === 'gif'
				const extension3 = testmsg === 'psd'
				const extension4 = testmsg === 'png'
				const extension5 = testmsg === 'tiff'
				const extension6 = testmsg === 'jpeg'
				const extension7 = testmsg === 'bmp'
				const extension8 = testmsg === 'jpg'
        const isLt2M = file.size / 1024 / 1024 < 5
				if(!extension && !extension2 && !extension3&& !extension4&& !extension5&& !extension6&& !extension7&& !extension8) {
					this.$message({
						message: '上传文件只能是tif,gif,psd,png,tiff,jpeg,bmp,jpg格式',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过5MB!',
						type: 'warning'
					});
				}
				return extension || extension2 || extension3 || extension4|| extension5|| extension6|| extension7||extension8&& isLt2M
    },
    success(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'success'
      });
      this.fileList = []
      this.imgname = res.data.file_name
    },
     success2(res,file,fileList2) {
      this.$message({
        message: res.message,
        type: 'success'
      });
      this.fileList2 = []
      this.imgname2 = res.data.file_name
    },
    error(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      });
      this.fileList = []
    },
    error2(res,file,fileList2) {
      this.$message({
        message: res.message,
        type: 'error'
      });
      this.fileList2 = []
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(this)
      let setonline = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
          'account': that.formInline.account,
          'chareg': that.formInline.chareg,
          'time': that.formInline.time,
          'time1': that.formInline.time1,
          'rechargeid': that.formInline.rechargeid,
          'platform': that.formInline.platform,
          'order_no': that.formInline.order_no,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setonline', setonline)
    },
    reset2 () {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    sure2 () {
      let that = this
        that.$refs.form2.validate((valid) => {
        if (valid) {
          if (this.form2.radio === '2') {
              that.$confirm('确认审核成功吗?', '二次确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(res => {
              request({
                url:that.public.url + '/payrecharges/audittwo',
                method:'post',
                data:{
                  id: that.id,
                  reason: '',
                  change: '2'
                }
              }).then(res => {
                that.$message({
                  type: 'success',
                  message: res.message
                })
                that.$refs.form2.resetFields()
                that.dialogFormVisible2 = false
                getlist(that)
              }).catch(error => {
              })
            }).catch(error => {
            })
          } else {
            var val = ''
            if (this.form2.reason === '附言违规，不予受理' ) {
              val = '原因是附言违规，不予受理'
            } else {
              val = '原因是金额不正确，不予受理'
            }
             that.$confirm('确认审核失败吗?'+val, '二次确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(res => {
              request({
                url:that.public.url + '/payrecharges/audittwo',
                method:'post',
                data:{
                  id: that.id,
                  reason: this.form2.reason,
                  change: '4'
                }
              }).then(res => {
                that.$message({
                  type: 'success',
                  message: res.message
                })
                that.$refs.form2.resetFields()
                that.dialogFormVisible2 = false
                getlist(that)
              }).catch(error => {
              })
            }).catch(error => {
            })
          }
       
        } else {
          return false
        }
        })
    },
    excel () {
        let that = this
        var start = ''
        var end = '' 
        var start1 = ''
        var end1 = ''  
      if (that.formInline.time && that.formInline.time.length > 0) {
        start = parseTime(that.formInline.time[0].getTime() /1000)
        end = parseTime(that.formInline.time[1].getTime() /1000)
      }
      if (that.$route.query && that.formInline.time1 && that.formInline.time1.length > 0) {
        start1 = parseTime(that.formInline.time1[0] /1000)
        end1 = parseTime(that.formInline.time1[1] /1000)
      } else {
        if (that.formInline.time1 && that.formInline.time1.length > 0) {
          start1 = parseTime(that.formInline.time1[0].getTime() /1000)
          end1 = parseTime(that.formInline.time1[1].getTime() /1000)
        }
      } 
      let status = that.formInline.status
      let data = {
        status: status,
        agent_org_id: that.formInline.id,
        // user_id: that.formInline.account.trim(),
        chareg_meth: that.formInline.chareg,
        device: that.formInline.device,
        apply_time_to: end,
        apply_time_from: start,
        arrival_time_to: end1,
        arrival_time_from: start1,
        id: that.formInline.rechargeid.trim(),
        ps_platform: that.formInline.platform.trim(),
        order_no: that.formInline.order_no.trim(),
        uid: that.formInline.uid,
        s_audit_account:that.formInline.s_audit_account,
        source_id:that.formInline.name
      }
      
      request({
        url: that.public.url + '/payrecharges/excelexport',
        method: 'post',
        data: data
      }).then(res => {
        window.location.href= that.public.url + res.data.path
      }).catch(error => {
      })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setonline = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
          'account': that.formInline.account,
          'chareg': that.formInline.chareg,
          'time': that.formInline.time,
          'time1': that.formInline.time1,
          'rechargeid': that.formInline.rechargeid,
          'platform': that.formInline.platform,
          'order_no': that.formInline.order_no,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setonline', setonline)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setonline = {
          'status': that.formInline.status,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
          'account': that.formInline.account,
          'chareg': that.formInline.chareg,
          'time': that.formInline.time,
          'time1': that.formInline.time1,
          'rechargeid': that.formInline.rechargeid,
          'platform': that.formInline.platform,
          'order_no': that.formInline.order_no,
          'uid': that.formInline.uid,
        }
      this.$store.commit('setonline', setonline)
    },
    openForm(row){
      this.fileData.id = row.id
      this.dialogFormVisibleM = true
      this.titleM = '上传图片'
    },
    sureM(){
      let that = this
      //  this.dialogFormVisibleM = false
      // this.$refs.formM.resetFields()
      // getlist(this)
       request({
    url: that.public.url + '/payrecharges/uploadPic',
    method: 'post',
    data: {
      id:this.fileData.id,
      path:this.imgname2
    },
  }).then(res => {
    that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.formM.resetFields()
            that.imgname2 = ''
            that.dialogFormVisibleM = false
            getlist(that)
  }).catch(error => {
  })
    },
    resetM(){
       this.$refs.formM.resetFields()
      this.imgname2 = ''
       this.dialogFormVisibleM = false   
    },
  }
}


function getlist (that) {
    var start = ''
    var end = '' 
    var start1 = ''
    var end1 = ''  
  if (that.formInline.time && that.formInline.time.length > 0) {
    start = parseTime(that.formInline.time[0].getTime() /1000)
    end = parseTime(that.formInline.time[1].getTime() /1000)
  }
  if (that.$route.query && that.formInline.time1 && that.formInline.time1.length > 0) {
    start1 = parseTime(that.formInline.time1[0] /1000)
    end1 = parseTime(that.formInline.time1[1] /1000)
  } else {
    if (that.formInline.time1 && that.formInline.time1.length > 0) {
      start1 = parseTime(that.formInline.time1[0].getTime() /1000)
      end1 = parseTime(that.formInline.time1[1].getTime() /1000)
    }
  } 
  let status = that.formInline.status
  let data = {
    status: status,
    agent_org_id: that.formInline.id,
    user_id: that.formInline.account.trim(),
    chareg_meth: that.formInline.chareg,
    device: that.formInline.device,
    apply_time_to: end,
    apply_time_from: start,
    arrival_time_to: end1,
    arrival_time_from: start1,
    pageno: that.currentPage,
    pagerows: that.pagesize,
    id: that.formInline.rechargeid.trim(),
    ps_platform: that.formInline.platform.trim(),
    order_no: that.formInline.order_no.trim(),
    uid: that.formInline.uid,
    s_audit_account:that.formInline.s_audit_account,
    source_id:that.formInline.name
  }
  
  request({
    url: that.public.url + '/payrecharges/getauditlist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
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

function getuserinfo (that) {
  request({
    url: that.public.url + '/backend/payrecharges/getinfo',
    method: 'post',
    data: {
      ids: that.id
    }
  }).then(res => {
    that.userinfo = res.data.list
    that.order_no = res.data.list.order_no
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
    let all = {id: "", name: "全部"}
    that.statuslist = res.data
    that.statuslist.unshift(all)
  }).catch(error => {
  })
}
function getallname (that) {
  request({
    url: that.public.url + '/paychannel/getallnames',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.allname = res.data
  }).catch(error => {
  })
}

function getrecharge (that) {
  request({
    url: that.public.url + '/payrecharges/getrechargemethod',
    method: 'post',
    data: {
    }
  }).then(res => {
    let all = {id: "", name: "全部"}
    that.moneylist = res.data
    that.moneylist.unshift(all)
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
  .floatright {
    float: right;
  }
  .texthight textarea {
    min-height: 130px!important;
  }
  .mail .el-dialog__header {
    background: #dedbdb!important;
  }
 .namegreen {
    color: #37b389;
  }
  .dialogcolor .el-dialog__header {
    background: #dedbdb!important;
  }
  img.active {
    transform: scale(3);
    position: absolute;
    z-index: 999;
  }
  img {
    transform: scale(1);
    transition: all ease 0.1s;
  }
</style>
