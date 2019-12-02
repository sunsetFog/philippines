<template>
  <div class="app-container">
    <div class="query">
      <el-row>
           <el-form :inline="true" label-width="80px">
          <el-col :span="4">
            <el-form-item label="渠道:">
                <span>{{dataquery.agent_org_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
             <el-form-item label="虚拟代理账号:" label-width='120px'>
                <span>{{dataquery.user_account}}</span>
            </el-form-item>
          </el-col>
           <el-col :span="6">
             <el-button   type="primary" @click="addagent()">
                 新增下级代理
             </el-button>
          </el-col>
          <el-col :span="6">
             <el-button  type="primary" @click="$router.push({path:'virtualagent'})">
                 返回
             </el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background
      layout="prev, next, jumper"
      :total="total">
    </el-pagination> -->
    </div>
    </div>
    <el-table
    :data="tableData"
    :row-class-name="tableclassname"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="uagent_login_name"
      width="120"
      label="下级虚拟代理">
      </el-table-column>
     <el-table-column
      prop="origin"
      label="推广来源">
    </el-table-column>
    <el-table-column
      prop="promotion_domain"      
      label="推广域名">
    </el-table-column>
    <el-table-column
      prop="user_count"     
      label="推广链接操作" width="300">
        <template slot-scope="scope">
            <el-button  @click="relink(scope.row)" type="primary" size="small" v-if="scope.row.promotion_url && virtualagentupdateurl">重新生成</el-button>
            <el-button  type="primary" size="small"  @click="copy(scope.row)" v-if="scope.row.promotion_url">复制链接</el-button>
            <el-button  type="primary" size="small"  @click="qrcode(scope.row)" v-if="scope.row.promotion_url">二维码</el-button>
            <!-- <el-button  @click="relink(scope.row)" type="primary" size="small"  v-if="!scope.row.promotion_url">生成链接</el-button> -->
      </template>
    </el-table-column>
    <el-table-column
      prop="promotion_url"  
      label="推广链接">
     
    </el-table-column>
     <el-table-column
      prop="status"  
      label="推广域名状态">
     
    </el-table-column>
     <el-table-column
     prop= "expire_status"
      label="推广链接状态">
      {{mstatus}}
     
    </el-table-column>
     <el-table-column
      prop="total_uplayer_num"  
      label="来源统计"  >
      <template slot-scope="scope">
         <el-button v-if="scope.row.total_uplayer_num>0 && virtualagentgetusercountinfo" type="text" @click="totalBtn(scope.row.user_id,scope.row.promotion_domain)" >{{scope.row.total_uplayer_num}}</el-button>
         <span v-else>{{scope.row.total_uplayer_num}}</span>
      </template>
    </el-table-column>
  </el-table>
   <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset1">
        <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="所属虚拟代理：" :label-width="formLabelWidth">
          <span>{{dataquery.user_account}}</span>
        </el-form-item>
        <el-form-item label="下级代理账号：" :label-width="formLabelWidth" prop='account'>
          <el-input v-model="form.account" clearable style="width:80%"></el-input>
          <!-- <span>{{multiple}}</span> -->
        </el-form-item>
        <el-form-item label="推广来源：" :label-width="formLabelWidth" prop='source'>
          <el-input  clearable  v-model="form.source" style='width:80%'></el-input>
        </el-form-item>
        <el-form-item label="推广域名：" :label-width="formLabelWidth" prop='au_domain_id'>
                <el-select v-model="form.au_domain_id" filterable>
                  <el-option
                    v-for="item in typelist"
                    :key="item.au_domain_id"
                    :label="item.url"
                    :value="item.au_domain_id">
                  </el-option>
                </el-select>
        </el-form-item>                                        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset1(form)">取 消</el-button>
        <el-button type="primary" v-if="virtualagentaddagent" @click="sure1(form)">确 定</el-button>
      </div>
  </el-dialog>

 <el-dialog :title='title2'  :visible.sync="dialogFormVisible2" :before-close="reset2" width="300px">
      <div id='qrCode' style="width:150px;height:150px;margin-left:58px;">
        <div id='code'></div>
        <canvas id="canvas"></canvas>
      </div>   
        <!-- <el-form >
            <el-form-item label="" :label-width="formLabelWidth" >    
                 <div id='qrCode'>
                  <div id='code'></div>
                  <canvas id="canvas"></canvas>
                </div>   
            </el-form-item>                               
      </el-form> -->
      <div slot="footer" class="dialog-footer" style="width:168px">
        <el-button type="primary" @click="reset2()">确 定</el-button>
      </div>
  </el-dialog>
  <el-dialog :title='title3'  :visible.sync="dialogFormVisible3" :before-close="reset3" width="400px" class="dialogDiv">
      <!-- <el-form-item label="推广域名" :label-width="formLabelWidth" prop="name">
       <span>{{linPm}}</span>
      </el-form-item> -->
  <div class="linDiv">
    <span>推广域名：</span>
    <span>{{linPm}}</span>
  </div>
     <el-table  :data="tableData3"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期">
      </el-table-column>
     <el-table-column
      prop="count"
      label="数量">
    </el-table-column>

     </el-table>
    
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure3">确 定</el-button>
    </div>

  </el-dialog>
<div class="pagingbox">
  <div class="paging">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[20,50,200]"
      :page-size="pagesize"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
  </div>
</div>



  </div>
</template>

<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import QRCode from 'qrcode'
export default {
  data() {
    return {
      formInline: {
          agent_domain_id:'',
          origin:'',
          promotion_domain:'',
          promotion_url:'',
          total_uplayer_num:'',
          uagent_login_name:'',
          user_id:'',
      },
      domain_id:'',
      form:{

      },
      currentPage: 1,
      tableData: [
      ],
      tableData3: [
      ],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      formLabelWidth: '180px',
      formLabelWidth2: '100px',
      data:[],
      total: 0,
      mstatus:'',
      lstatus:'',
      rules:{},
      pagesize: 20,
      havetime: false,
      havetime1: false,
      typelist: [],
      loading: false,
      title:'',
      canvas:'',
      title2:'',
       title3:'',
      codes:'',
      dataquery:{
        user_id:'',
        agent_org_name:'',
        user_account:'',
      },
    linPm:'',//域名
    }
  },
  created() {
    let that = this
    //  getlist(that)
    // if (!this.businessdealday.length && this.businessdealday.length != 0) {
    //   that.formInline.starttime = this.businessdealday.starttime
    //   that.currentPage = this.businessdealday.currentPage
    //   that.pagesize = this.businessdealday.pagesize
    //   that.formInline.endtime = this.businessdealday.endtime
    //   that.formInline.id = this.businessdealday.id
    //   getlist(that)
    // }
  },
  mounted(){
     let that = this
     this.getparams()
     getlist(that)
     this.getlinklist()
  },
  components:{
      QRCode:QRCode
  },
  computed: {
    ...mapGetters([
      'virtualagentgetinfo',
      'virtualagentgetdomainlist',
      'virtualagentaddagent',
      'virtualagentupdateurl',
      'virtualagentgetusercountinfo'
    ])
  },
  watch : {
      dialogFormVisible2(a,b){
           if(this.dialogFormVisible2){
                setTimeout(function(){
                     this.canvas = document.getElementById('canvas')  
                },500)
              
           }
      }
  },
  methods: {
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 5 && row.status === '启用') {//推广域名状态
        return 'black'
      }else if(columnIndex === 5 && row.status === '禁用'){
        return 'red'
      }
       if (columnIndex === 6 && row.expire_status === '未失效') {//推广链接状态
        return 'black'
      }else if(columnIndex === 6 && row.expire_status === '已失效'){
        return 'red'
      }
    },
    tableclassname ({row, rowIndex}) {
    },
    // handleSizeChange(val) {
    //   this.pagesize = val
    //   let that = this
    //   this.currentPage = 1
    //   getlist(that, that.currentPage, that.pagesize)
    //   let setbusinessdealday = {
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'id': that.formInline.id,
    //     }
    //   this.$store.commit('setbusinessdealday', setbusinessdealday)
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val *1
    //   let that = this
    //   getlist(that, that.formInline.starttime, that.formInline.endtime, that.currentPage, that.pagesize)
    //   let setbusinessdealday = {
    //       'currentPage': that.currentPage,
    //       'pagesize': that.pagesize,
    //       'id': that.formInline.id,
    //     }
    //   this.$store.commit('setbusinessdealday', setbusinessdealday)
    // },
    getparams(){//获取上一级路由的参数
        if(this.$route.query.agent_org_name!=null){
            this.dataquery.user_id = this.$route.query.user_id
            this.dataquery.agent_org_name = this.$route.query.agent_org_name
            this.dataquery.user_account = this.$route.query.user_account
        }
    },
    relink(row){//重新生成链接
    let that = this
            request({
              url: that.public.url + '/backend/virtualagent/updateurl',
              method: 'post',
              data: {
              account_id:row.user_id,
              agent_domain_id:row.agent_domain_id
            }
                }).then(res => {
                    that.loading = false
                    Message({
                        message: res.message,
                        type: 'success'
                    })
                      getlist(that)                 
                }).catch(error => {
                })
    },
    getlinklist(){//获取推广域名列表
        this.title = '新增下级代理'
        let that = this   
            request({
              url: that.public.url + '/backend/virtualagent/getdomainlist',
              method: 'post',
              data: {
              user_id:this.dataquery.user_id
            }
                }).then(res => {
                    that.loading = false
                    // Message({
                    //     message: res.message,
                    //     type: 'success'
                    // })
                    that.typelist = res.data
                }).catch(error => {
                })

    },
    addagent(){
        this.dialogFormVisible = true
    },
    reset1(){
        this.dialogFormVisible = false
        this.$refs.form.resetFields()
    },
      reset2(){
        this.dialogFormVisible2 = false
        canvas.height = canvas.height
    },
    reset3(){
      this.dialogFormVisible3 = false   
      this.linPm = ''
       this.tableData3 = []
    },
    sure3(){
      this.dialogFormVisible3 = false
      this.linPm = ''
       this.tableData3 = []
    },
    sure1(){//新增下级代理确认按钮
        let that = this
            request({
              url: that.public.url + '/backend/virtualagent/addagent',
              method: 'post',
              data: {
              user_id:this.dataquery.user_id,
              agent_login_name:this.form.account,
              origin:this.form.source,
              au_domain_id:this.form.au_domain_id,
            }
                }).then(res => {
                    that.loading = false
                    Message({
                        message: res.message,
                        type: 'success'
                    })
                    this.dialogFormVisible = false
                    this.$refs.form.resetFields()
                     getlist(that)
                    // that.tableData = res.data
                }).catch(error => {
                })
    },
     copy (row) {
      var text = row.promotion_url;
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
     useqrcode(row){
    setTimeout(function(){
         QRCode.toCanvas(canvas,row.promotion_url,function(error){
           if(error)console.error(error)
       })
    },600)
    },
    qrcode(row){
        this.dialogFormVisible2 = true
        this.title2 = '查看二维码'
        this.useqrcode(row)
    },
    totalBtn(id,ip){
        let that = this
        this.dialogFormVisible3 = true
        this.title3 = '用户来源详情'
        this.linPm = ip
        request({
        url: that.public.url + '/backend/virtualagent/getusercountinfo',
        method: 'post',
        data: {
          user_id: id,
          }
        }).then(res => {
          that.tableData3 = res.data
        }).catch(error => {
        })
      }
  },
  components:{
  
  },
  filters: {
  }
}
function getlist (that) {
  request({
    url: that.public.url + '/backend/virtualagent/getinfo',
    method: 'post',
    data: {
      user_id: that.dataquery.user_id,
    }
  }).then(res => {
    that.loading = false
    // Message({
    //     message: res.message,
    //     type: 'success'
    //   })
    that.tableData = res.data
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
  .el-table .warning-row {
    background: oldlace;
  }
  .el-dialog__body{
    padding-right: 20px !important;
  }
  .linDiv{
    margin-bottom:20px;
    color: #666;
  }
  .dialogDiv .el-table--fit{
   max-height: 289px;
    overflow-y: auto;
  }
</style>
