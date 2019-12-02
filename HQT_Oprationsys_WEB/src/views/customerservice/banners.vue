<template>
  <div class="app-container notice">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="gamebanneradd">新增广告 </el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道">
              <el-select v-model="formInline.user" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamebannergetlist">查询</el-button>
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
      prop="agent_org_name"
      label="渠道">
    </el-table-column>
    <el-table-column
      prop="title"
      label="广告图片">
       <template slot-scope="scope">
        <el-button type="text" size="small"  @click="view(scope.row)" v-if="scope.row.images_path">查看预览</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="ad_url"
      label="广告链接">
    </el-table-column>
     <el-table-column
      prop="sort"
      width="300"
      label="排序">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="gamebannerupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="gamebannerdel">删除</el-button>
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
      <el-form-item label="玩家渠道" :label-width="formLabelWidth" v-if='userMain' prop="">
         <el-select v-model="formInline.user2" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="玩家渠道" :label-width="formLabelWidth" v-if='!userMain'>
          <span>{{user3}}</span>
      </el-form-item>
      <el-form-item label="广告图片" :label-width="formLabelWidth" prop="">
      <!-- <el-radio-group v-model="form.time"  @change="time">
        <el-radio label="1">指定时间</el-radio>
        <el-radio label="2">永久有效</el-radio>
      </el-radio-group> -->
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
      </el-form-item>
      <el-form-item label="广告链接" :label-width="formLabelWidth" >
        <el-input v-model="form.desc" type="text" maxlength="200" placeholder="非必填项，若无则只展示图片信息，填写则可调用链接"></el-input>
      </el-form-item>
       <el-form-item label="排序" :label-width="formLabelWidth" prop="">
        <el-input v-model="form.sort" type="text" maxlength="200" placeholder="填写不重复的正整数"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
    </div>

  </el-dialog>
   <el-dialog title='上传查看'  :visible.sync="dialogFormVisible3" >
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
  filters: {
  },
  data() {
    return {
      formInline: {
        user: '',
        user2: '',
      },
       userlist:[],
        userlist2:[],
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
    dialogFormVisible3: false,
      form: {
        name: '',
        desc: '',
        sort:'',
        picM:'',
        id:'',
      },
      rules: {
        name: [
          {required: true, message: '请选择渠道', trigger: 'blur'},
        ],
        desc: [
          {required: true, message: '请填写排序', trigger: 'blur'}
        ],
        picM:[{required: true, message: '请上传图片', trigger: 'blur'}],
      },
      formLabelWidth: '120px',
      title: '',
      total: 0,
      pagesize: 20,
      id: '',
      timeshow: true,
      fileList: [],
      showfile: true,
      imgsrc: '',
      file_name: '',
      imgname:'',
      userMain:true,
      user3:'',
      // 发送公告日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 写公告日期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
     
    let that = this  
      getlist(that, that.currentPage, that.pagesize)
       getuserlist(that)
  },
  computed: {
      token () {
        return {
          'X-Token': getToken()
        }
      },
       action () {
        return this.public.url + '/gamebanner/upload'
      },
    ...mapGetters([
      'gamebanneradd',
      'gamebannerdel',
      'gamebannerupdate',
      'gamebannergetlist',
      'notice'
    ])
  },
  watch: {
  },
  methods: {
    reset (form) {
        this.form.sort= ''
        this.form.desc = ''
        this.imgname = ''
        this.formInline.user2 = ''
        this.$refs.form.resetFields()
        this.dialogFormVisible = false    
         this.userMain = true
    },
    edit(row) {
      this.userMain = false
      this.title = '修改广告'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/gamebanner/getinfo',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            that.form.sort = res.data.sort
            that.form.desc = res.data.ad_url   
            that.form.id = res.data.id  
            that.formInline.user2 = res.data.agent_org_id    
            that.imgname = res.data.images_path
            that.user3 = res.data.agent_org_name
          }).catch(error => {
          })
    },
    view (row) {
      let src = row.images_path
      this.imgsrc =src
      this.dialogFormVisible3 = true
    },
     reset3 () {
      this.dialogFormVisible3 = false
    },
    add () {
          this.form.sort= ''
        this.form.desc = ''
        this.imgname = ''
    this.formInline.user2 = ''
    this.userMain = true
      this.title = '新增广告'
      this.dialogFormVisible = true
      this.timeshow = true
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that, that.currentPage, that.pagesize)
      let setnotice = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
        }
      this.$store.commit('setnotice', setnotice)
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '新增广告') {
             request({
              url: that.public.url + '/gamebanner/add',
              method: 'post',
              data: {
                    agent_org_id: this.formInline.user2,
                    images_path: this.imgname,
                    ad_url: this.form.desc,
                    sort: this.form.sort,
              }
            }).then(res => {
                this.form.sort= ''
              this.form.desc = ''
              this.imgname = ''
              this.formInline.user2 = ''
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              getlist(that,  that.currentPage, that.pagesize)
            }).catch(error => {
            })
          } else {
            //   this.form.sort= ''
            //   this.form.desc = ''
            //   this.imgname = ''
            //   this.formInline.user2 = ''
            request({
            url: that.public.url + '/gamebanner/update',
            method: 'post',
            data: {
                  id:that.form.id,
                  images_path:that.imgname,
                  ad_url:that.form.desc,
                  sort:that.form.sort,
            }
          }).then(res => {
             
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            getlist(that,  that.currentPage, that.pagesize)
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
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gamebanner/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            getlist(that,that.currentPage, that.pagesize)
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
      getlist(this, this.formInline.user, this.currentPage, this.pagesize)
      let setnotice = {
          'agent_org_id': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
        }
      this.$store.commit('setnotice', setnotice)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this, this.formInline.user, this.currentPage, this.pagesize)
      let setnotice = {
          'agent_org_id': that.formInline.user,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
        }
      this.$store.commit('setnotice', setnotice)
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
      this.fileList = []
      this.imgname = res.data.file_name
    },
     error(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      });
      this.fileList = []
    },
     before(file) {		
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)				
				// const extension = testmsg === 'tif'
				// const extension2 = testmsg === 'gif'
				// const extension3 = testmsg === 'psd'
				const extension4 = testmsg === 'png'
				// const extension5 = testmsg === 'tiff'
				const extension6 = testmsg === 'jpeg'
				const extension7 = testmsg === 'bmp'
				const extension8 = testmsg === 'jpg'
        const isLt2M = file.size / 1024 / 1024 < 5
				if( !extension4&&  !extension6&& !extension7&& !extension8) {
					this.$message({
						message: '上传文件只能是png,jpeg,bmp,jpg格式',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过5MB!',
						type: 'warning'
					});
				}
				return extension4|| extension6|| extension7||extension8&& isLt2M
    },
    // checkSize(){//限制内容字数
    //   var textLength = this.form.desc.length;
    //   this.titleMaxLength = 50 - textLength;
    // }
  }
}


function getlist (that, currentPage, pagesize) {
  let data = {
   agent_org_id:that.formInline.user,
    pageno: currentPage,
    pagerows: pagesize
  }
  request({
    url: that.public.url + '/gamebanner/getlist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}
function getuserlist (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
    that.userlist2 = res.data
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
  .notice textarea {
    min-height: 200px!important;
  }
</style>
