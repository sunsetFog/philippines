<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="5">
            <el-button type="info" round v-if="webdownpagesetadd" @click="add">新增 + </el-button>
          </el-col>
          <el-col :span="5">
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
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="webdownpagesetgetlist" :loading='loading'>查询</el-button>
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
    :row-class-name="tableclassname"
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="agent_org_name"
      label="渠道">
    </el-table-column>
     <el-table-column
      prop="name"
      label="下载页样式名">
    </el-table-column>
    <el-table-column
      prop=""      
      label="android图片预览">
       <template slot-scope="scope">
        <el-button @click="view(scope.row)" type="text" size="small" >预览图片</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop=""     
      label="ios图片预览">
      <template slot-scope="scope">
        <el-button @click="view2(scope.row)" type="text" size="small" >预览图片</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="sortid"     
      label="排序">
    </el-table-column>
    <el-table-column
      prop=""     
      label="状态">
       <template slot-scope="scope">
        <div v-show="scope.row.status == 1">启用</div>
        <div v-show="scope.row.status == 0">禁用</div>
      </template>
    </el-table-column>
    <el-table-column
      prop=""  
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" style="float:left" size="small" v-if="webdownpagesetupdate" >修改</el-button>
        <el-button @click="disable(scope.row)"  style="color:red;float:left" v-if="scope.row.status==1 && webdownpagesetupdatestatus" type="text" size="small" >禁用</el-button>
        <el-button @click="enable(scope.row)"  style="color:green;float:left" v-if="scope.row.status==0 && webdownpagesetupdatestatus" type="text" size="small" >启用</el-button>
        <el-button @click="delet(scope.row)" v-if="webdownpagesetdel" style="float:left" type="text" size="small" >删除</el-button>
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
      <el-form-item label="玩家渠道：" :label-width="formLabelWidth" prop="domain" >
         <el-select v-model="form.id2"  filterable style="width:100%" :disabled = mosrnId>
              <el-option
                v-for="item in statuslist2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
      </el-form-item>
      <!-- <el-form-item label="玩家渠道" :label-width="formLabelWidth"  >
        <el-input v-model="form.id3"></el-input>
      </el-form-item> -->
      <el-form-item label="样式名：" :label-width="formLabelWidth" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="android图片：" :label-width="formLabelWidth">
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
            <el-button size="small" type="primary">选择文件</el-button>&nbsp;&nbsp;&nbsp;
            <span slot="tip" class="el-upload__tip">只能上传图片文件,且文件大小不超过5m</span>
          </el-upload>
      </el-form-item>
       <el-form-item label="ios图片：" :label-width="formLabelWidth">
         <el-upload
              class="upload-demo"
              :action="action"
              :headers='token'
              :on-exceed="exceed"
              :on-success='success2'
              :on-error='error'          
              :show-file-list='showfile'
              :before-upload='before'
              multiple
              :limit="1"
              :file-list="fileList2">
            <el-button size="small" type="primary">选择文件</el-button>&nbsp;&nbsp;&nbsp;
            <span slot="tip" class="el-upload__tip">只能上传图片文件,且文件大小不超过5m</span>
          </el-upload>
      </el-form-item>
      <el-form-item label="排序：" :label-width="formLabelWidth" >
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
    <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio :label='1'>启用</el-radio>
        <el-radio :label='0'>禁用</el-radio>    
      </el-radio-group>
    </el-form-item>      
      </el-form>   
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>
  </el-dialog>
   <el-dialog title='查看预览'  :visible.sync="dialogFormVisible2" :before-close="reset2" >
    <img :src="imgsrc" style="width:100%">
    
  <el-button @click="reset2()">取 消</el-button> 
   </el-dialog>
</div>
</template>

<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth';
export default {
  data() {
    return {
      formInline: {
        starttime: '',
        endtime: '',
        id: ''
      },
      currentPage: 1,
      tableData: [
      ],
      data:[],
      total: 0,
      pagesize: 20,
      havetime: false,
      havetime1: false,
      statuslist: [],
      statuslist2:[],
      fileList: [],
      fileList2: [],
      imgname:'',
      imgname2:'',
      title: '',
      mosrnId:false,
      formLabelWidth: '120px',
      loading: false,
      dialogFormVisible: false,
      dialogFormVisible2:false,
      showfile: true,
      imgsrc: '',
      form:{
        id2:'',
        name:'',
        sort:'',
        status: 3,
     },
     rowId:'',
     rules:{},
    }
  },
  created() {
    let week = new Date(new Date().toLocaleDateString()).getTime() - 60*60*24*1000*7
    let time = new Date(new Date().toLocaleDateString()).getTime()
    this.formInline.starttime = new Date(week)
    this.formInline.endtime = new Date(time)
    let that = this
    getaccount(this)
    if (!this.businessdealday.length && this.businessdealday.length != 0) {
      that.formInline.starttime = this.businessdealday.starttime
      that.currentPage = this.businessdealday.currentPage
      that.pagesize = this.businessdealday.pagesize
      that.formInline.endtime = this.businessdealday.endtime
      that.formInline.id = this.businessdealday.id
       getlist(this,this.currentPage, this.pagesize)
    }
  },
  computed: {
      token () {
        return {
          'X-Token': getToken()
        }
      },
      action () {
        return this.public.url + '/webdownpageset/upload'
      },
    ...mapGetters([
      'businessdealdayreportgetlist',
      'businessdealday',
      'webdownpagesetadd',
      'webdownpagesetgetlist',
      'webdownpagesetupdate',
      'webdownpagesetupdatestatus',
      'webdownpagesetdel'
    ])
  },
  watch : {
  },
  methods: {
    query () {
        let that = this
        that.currentPage = 1
        getlist(that,that.currentPage, that.pagesize)
        let setbusinessdealday = {       
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    cell ({row, column, rowIndex, columnIndex}) {
    //   if (columnIndex === 16 && row.ptop_gprofit*1 < 0) {//人人类毛利
    //     return 'red'
    //   }else if(columnIndex === 16 && row.ptop_gprofit*1 > 0){
    //     return 'green'
    //   }
    //    if (columnIndex === 17 && row.ptom_gprofit*1 < 0) {//人机类毛利
    //     return 'red'
    //   }else if(columnIndex === 17 && row.ptom_gprofit*1 > 0){
    //     return 'green'
    //   }
      
    //    if (columnIndex === 18 && parseFloat(row.gprofit) < 0) {//平台毛利
    //     return 'red'
    //   }else if(columnIndex === 18 && parseFloat(row.gprofit) > 0){
    //     return 'green'
    //   }
    //    if (columnIndex === 19 && parseInt(row.profit)*1 < 0) {//平台利润率
    //     return 'red'
    //   }else if(columnIndex === 19 && parseInt(row.profit)*1 > 0){
    //     return 'green'
    //   }
    },
    tableclassname ({row, rowIndex}) {
      // if(row.gross_profit * 1 < (row.flow_money * 1 * 0.05) || row.net_profit * 1 < 0) {
      //   return 'warning-row';
      // }
    },
    handleSizeChange(val) {
      this.pagesize = val
      let that = this
      this.currentPage = 1
      getlist(that, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      let that = this
     getlist(that, that.currentPage, that.pagesize)
      let setbusinessdealday = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'id': that.formInline.id,
        }
      this.$store.commit('setbusinessdealday', setbusinessdealday)
    },
    //  view (row) {
    //      this.$router.push({
    //          path:'virtualagentgetinfo',
    //          query:{
    //               user_id: row.user_id,
    //               agent_org_name:row.agent_org_name,
    //               user_account:row.user_account,
    //          }
    //      })
    // //   this.dialogFormVisible2 = true
    // //   request({
    // //   url: that.public.url + "/virtualagent/getinfo",
    // //   method: "post",
    // //   data: {
    // //       user_id: row.user_id,
    // //   }
    // // })
    // //   .then(res => {
    // //     that.form2 = res.data
    // //   })
    // //   .catch(error => {});
    // },
     add () {
      this.title = '新增下载页'
      this.mosrnId = false
      this.dialogFormVisible = true
    },
    reset(form){
       this.dialogFormVisible = false
       this.form.id2 = ""
       this.form.name = ""
       this.form.sort = ""
       this.form.status = ""
       this.imgname = ""
       this.imgname2 = ""
       this.rowId = ''
       this.fileList2 = []
       this.fileList = [] 
    //    this.$refs.form.resetFields()
    //    this.imgname = ''
    //     this.imgname2 = ''
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '新增下载页') {          
             request({
              url: that.public.url + '/backend/webdownpageset/add',
              method: 'post',
              data: {
                    agent_org_id:that.form.id2,
                    name:that.form.name,
                    iso_bgpic_path:that.imgname,
                    andriod_bgpic_path:that.imgname2,
                    sortid:that.form.sort,
                    status:that.form.status,                   
              }
            }).then(res => {
              if (res.code === 0) {
                  Message({
                    message: res.message,
                    type: 'success'
                })
                that.dialogFormVisible = false
                that.$refs.form.resetFields()
                this.form.id2 = ""
                this.form.name = ""
                this.form.sort = ""
                this.form.status = ""
                this.imgname = ""
                this.imgname2 = ""
                this.rowId = ''
                this.fileList2 = []
                this.fileList = []  
               getlist(this,this.currentPage, this.pagesize)
                
              }
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/webdownpageset/update',
            method: 'post',
            data: {
                id:that.rowId,
                name:that.form.name,
                iso_bgpic_path:that.imgname,
                andriod_bgpic_path:that.imgname2,
                sortid:that.form.sort,
                status:that.form.status,   
            }
          }).then(res => {
            if (res.code === 0) {
                 Message({
                    message: res.message,
                    type: 'success'
                })
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            this.form.id2 = ""
            this.form.name = ""
            this.form.sort = ""
            this.form.status = ""
            this.imgname = ""
            this.imgname2 = ""
            this.rowId = ''     
            this.fileList2 = []
            this.fileList = []     
             getlist(this,this.currentPage, this.pagesize)
            }
          }).catch(error => {
          })
          }
        } else {
          return false
        }
      })
    },
     view (row) {
      let src = row.android_bgpic
      this.imgsrc =src
      this.dialogFormVisible2 = true
    },
     view2 (row) {
      let src = row.ios_bgpic
      this.imgsrc =src
      this.dialogFormVisible2 = true
    },
     reset2 () {
      this.dialogFormVisible2 = false
    },
    disable(row){//禁用
         let that = this
        request({
            url: that.public.url + '/backend/webdownpageset/updatestatus',
            method: 'post',
            data: {
            id:row.id
            }
        }).then(res => {
            Message({
                message: res.message,
                type: 'success'
            })
             getlist(this,this.currentPage, this.pagesize)
        }).catch(error => {
            
        })
    },
     enable(row){//启用
         let that = this
        request({
            url: that.public.url + '/backend/webdownpageset/updatestatus',
            method: 'post',
            data: {
            id:row.id
            }
        }).then(res => {
            Message({
                message: res.message,
                type: 'success'
            })
             getlist(this,this.currentPage, this.pagesize)
        }).catch(error => {
            
        })
    },
    delet(row){//删除
    let that = this
        request({
            url: that.public.url + '/backend/webdownpageset/del',
            method: 'post',
            data: {
            id:row.id
            }
        }).then(res => {
            Message({
                message: res.message,
                type: 'success'
            })
             getlist(this,this.currentPage, this.pagesize)
        }).catch(error => {
            
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
    success(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'success'
      });
    //   this.fileList = []
      this.imgname = res.data.file_name
      console.log(this.imgname)
    },
    success2(res,file,fileList2) {
      this.$message({
        message: res.message,
        type: 'success'
      });
    //   this.fileList2 = []
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
        const isLt2M = file.size / 1024 / 1024 < 1
				if(!extension && !extension2 && !extension3&& !extension4&& !extension5&& !extension6&& !extension7&& !extension8) {
					this.$message({
						message: '上传文件只能是tif,gif,psd,png,tiff,jpeg,bmp,jpg格式',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过1MB!',
						type: 'warning'
					});
				}
				return extension || extension2 || extension3 || extension4|| extension5|| extension6|| extension7||extension8&& isLt2M
    },
    edit(row){
      this.title = '修改下载页'
      this.mosrnId = true
      this.dialogFormVisible = true
      let that = this
      this.rowId = row.id
      request({
            url: that.public.url + '/backend/webdownpageset/getinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
              that.form.id2 = res.data.agent_org_id
              that.form.name = res.data.name
              that.form.sort = res.data.sortid
              that.form.status = res.data.status*1
              that.imgname = res.data.ios_bgpic
              that.imgname2 = res.data.android_bgpic
           
          }).catch(error => {
          })

    }
  },
  components:{
    //    virtualagentgetinfo:()=> import('../promoters/virtualagentgetinfo'),
  },
  filters: {
  }
}



function getlist (that, currentPage, pagesize) {
  request({
    url: that.public.url + '/backend/webdownpageset/getlist',
    method: 'post',
    data: {
      agent_org_id: that.formInline.id,
      pageno: currentPage,
      pagerows: pagesize
    }
  }).then(res => {
    that.loading = false
    Message({
        message: res.message,
        type: 'success'
      })
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
      that.loading = false
  })
}

function getaccount (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.statuslist = res.data
    that.statuslist2 = res.data
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
</style>
