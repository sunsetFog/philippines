<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="robotsceneconfigaddonerobot || robotsceneconfigaddmultirobot">新增 + </el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支持游戏" label-width="100px">
              <el-select v-model="formInline.id" filterable clearable placeholder="请选择支持游戏"> 
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.scene">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
              <el-form-item label="Ai角色渠道" label-width="100px">
                <el-select clearable v-model="selectId" class="channel">
                  <el-option
                    v-for="item in selectchannel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
          </el-col>

         <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="robotsceneconfigaiaccountlist">查询</el-button>
          </el-col>
          
        </el-form>
      </el-row>
    </div>
   
     <div class="pagingbox" style="overflow:hidden;">
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
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="login_name"
      label="AI账号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="AI昵称">
    </el-table-column>
    <el-table-column
      prop="balance"
      label="AI角色余额">
    </el-table-column>

    <el-table-column
      prop="agent_org_name"
      label="AI角色渠道">
    </el-table-column>


    <el-table-column
      label="支持游戏">

<template slot-scope="scope">  
  <el-tooltip placement="top">
    <div slot="content">
      <div style="width: 200px;height: 25px;line-height: 25px;">Ai账号:<span style="margin-left: 10px;">{{scope.row.login_name}}</span></div>
      <div style="width: 200px;height: 25px;line-height: 25px;">支持游戏:</div>
      <div style="width: 200px;padding: 6px 0px 6px 0px;box-sizing: border-box;">{{scope.row.ai_sup_game}}</div>
    </div>
    <el-button>查看</el-button>
  </el-tooltip>
</template>

    </el-table-column>
    <!-- <el-table-column
      prop="tableno"
      label="账号状态">
    </el-table-column> -->
    <el-table-column
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="robotsceneconfigaisupgameupdate">修改</el-button>
        <!-- <el-button type="text" size="small" @click="up(scope.row)" v-if="scope.row.status === '0'" class="green">启用</el-button>
        <el-button type="text" size="small" @click="down(scope.row)" v-if="scope.row.status === '1'" class="red">禁用</el-button> -->
        <el-button @click="del(scope.row)" type="text" size="small" v-if="robotsceneconfigdelaiaccount">删除</el-button>
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
    <el-tabs type='border-card' @tab-click="cardTab">
      <el-tab-pane label="单个创建" v-if="robotsceneconfigaddonerobot">
        <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="AI账号" :label-width="formLabelWidth" prop='account'>
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="AI账号昵称" :label-width="formLabelWidth" prop='nick'>
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="头像ID" :label-width="formLabelWidth"  prop='head'>
          <el-input v-model="form.head"></el-input>
        </el-form-item>
        <el-form-item label="头像框ID" :label-width="formLabelWidth" prop='picture'>
          <el-input v-model="form.picture"></el-input>
        </el-form-item>
        <el-form-item label="AI余额区间" :label-width="formLabelWidth" prop='balance'>
          <span>最低</span><el-input v-model="form.balance" style="width:20%" type="number"></el-input><span>元</span>
          <span>最高</span><el-input v-model="form.max" style="width:20%" type="number"></el-input><span>元</span>
          <span class="red">在此区间内随机生金额，单位最小到分</span>
        </el-form-item>
        <el-form-item label="Ai所属渠道" :label-width="formLabelWidth" prop="channel">
            <el-select clearable v-model="selectId" class="channel">
              <el-option
                v-for="item in selectchannel"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="可参与游戏" :label-width="formLabelWidth" prop="game">
          <el-select v-model="form.game" filterable multiple>
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
        </el-form-item>

      </el-form>
      <div style="text-align: center;">
        <el-button @click="reset(form)">取 消</el-button>
        <el-button type="primary" @click="sure(form)">确 定</el-button>
      </div>
      </el-tab-pane>
      <el-tab-pane label="批量创建" v-if="robotsceneconfigaddmultirobot">
        <el-form>
        <el-form-item label="AI账号昵称" :label-width="formLabelWidth">
          <span>上传账号昵称头像编号表</span>
          <el-upload
              class="upload-demo"
              ref='upload'
              :action="action"
              :headers='token'
              :on-exceed="exceed"
              :on-success='success'
              :on-error='error'
              :before-upload='before'
              :on-change="change"
              :auto-upload="false"
              multiple
              :limit="1"
              :file-list="fileList">
              <el-button  type="warning" >上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件,且文件大小不超过5m  <span class="red">文件格式为账号、昵称、头像、头像框编号四列</span></div>
            </el-upload>
        </el-form-item>
        <el-form-item label="AI余额区间" :label-width="formLabelWidth">
          <div v-for="(item,key) in balancelist" :key="key" style="margin-bottom:5px">
            <span>最低</span><el-input v-model="item.min" style="width:20%" type="number"></el-input><span>元</span>
            <span>最高</span><el-input v-model="item.max" style="width:20%" type="number"></el-input><span>元</span>
            <span>权重</span><el-input v-model="item.prob" style="width:20%" type="number"></el-input>
            <el-button @click="addai(key)" type="text" size="small">新增</el-button>
            <el-button @click="delet(key)" type="text" size="small" v-if="key!=0">删除</el-button><br/>
            
          </div>
          <span class="red">在此区间内随机生金额，单位最小到分</span>
        </el-form-item>
        <el-form-item label="Ai所属渠道" :label-width="formLabelWidth" prop="channel">
            <el-select clearable v-model="selectId" class="channel">
              <el-option
                v-for="item in selectchannel"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="可参与游戏" :label-width="formLabelWidth" prop="game">
          <el-select v-model="game" filterable multiple>
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="reset(form)">取 消</el-button>
        <el-button type="primary" @click="sure3(form)">确 定</el-button>
      </div>
      </el-tab-pane>
    </el-tabs>
   

</el-dialog>


<el-dialog title='AI角色-修改'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
      <el-form-item label="AI账号" :label-width="formLabelWidth" prop="account">
        {{form2.account}}
      </el-form-item>
      <el-form-item label="AI昵称" :label-width="formLabelWidth" prop="name">
        {{form2.name}}
      </el-form-item>
      <el-form-item label="AI角色余额" :label-width="formLabelWidth" prop="balance">
        {{form2.balance}}
      </el-form-item>
      <el-form-item label="支持游戏" :label-width="formLabelWidth" prop="game">
          <el-select v-model="form2.game" filterable multiple>
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form)">取 消</el-button>
      <el-button type="primary" @click="sure2(form)">确 定</el-button>
    </div>

  </el-dialog>


  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth'
export default {
  data() {
    var rules = (rule, value, callback) => {
      if(value === '' || this.form.max == ''){
        callback(new Error('请输入AI余额区间'));
      }else {
        //填了最小值
        if (this.form.max == '') {
          callback(new Error('请输入AI余额区间'));
        } else {
          //填了最大值和最小值
          if (value * 1 < 0 || this.form.max * 1 < 0 || value.indexOf('.') > 0 || this.form.max.indexOf('.') > 0 ) {
            callback(new Error('AI余额区间为正整数'));
          } else {
            callback();
          }
        }
      }
   }; 
    return {
      formInline: {
        id: ''
      },
      gamelist: [],
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 20,
      id: '',
      title: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        account: [{required: true, message: '请输入AI账号', trigger: 'blur'}],
        nick: [{required: true, message: '请输入AI昵称', trigger: 'blur'}],
        head: [{required: true, message: '请输入头像ID', trigger: 'blur'}],
        picture: [{required: true, message: '请输入头像框ID', trigger: 'blur'}],
        balance: [{required: true, validator: rules, trigger: 'blur'}],
        game: [{required: true, message: '请选择可参与游戏', trigger: 'change'}],
      },
      form: {
        account: '',
        nick: '',
        head: '',
        picture: '',
        balance: '',
        min: '',
        game: []
      },
      game: [],
      form2: {
        account: '',
        name: '',
        balance: '',
        game: []
      },
      rules2: {
        account: [{required: false, message: '请输入AI账号', trigger: 'blur'}],
        name: [{required: false, message: '请输入AI昵称', trigger: 'blur'}],
        balance: [{required: false, message: '请输入AI余额区间', trigger: 'blur'}],
        game: [{required: true, message: '请选择可参与游戏', trigger: 'change'}],
      },
      dialogFormVisible2: false,
      showfile: false,
      fileList: [],
      balancelist: [
        {min: '',max: '',prob: ''}
      ],
      file: {},
      selectchannel: [],
      selectId: null,
    }
  },
  created() {
    let that = this
    getgamelist(this)
    getplayergamechannel(this)
    if (!this.airole.length && this.airole.length != 0) {
      that.formInline.id = this.airole.id
      that.currentPage = this.airole.currentPage
      that.pagesize = this.airole.pagesize
      that.selectId = this.airole.agent_org_id
      getlist(this)
    }
  },
  computed: {
    ...mapGetters([
      'robotsceneconfigaiaccountlist',
      'robotsceneconfigaddonerobot',
      'robotsceneconfigaddmultirobot',
      'robotsceneconfigaisupgameupdate',
      'robotsceneconfigdelaiaccount',
      'airole'
    ]),
    token () {
      return {
        'X-Token': getToken()
      }
    },
    action () {
      return ''
    }
  },
  watch: {
  },
  filters: {
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      this.num = 1
      getlist(this)
      let setairole = {
          'id': that.formInline.id,
          'agent_org_id': that.selectId,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize
        }
      this.$store.commit('setairole', setairole)
    },
    addai () {
      this.balancelist.push({min: '',max: '',prob: ''})
    },
    delet (key) {
      this.balancelist.splice(key,1)
    },
    exceed(file) {
      if (file.length > 1) {
        this.$message({
          message: '一次只能上传一个文件',
          type: 'warning'
        });
      }
    },
    cardTab(val,res){
      this.selectId = null;
    },
     before(file) {		
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'xls'
				const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
				if(!extension && !extension2) {
					this.$message({
						message: '上传文件只能是xls、xlsx格式',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过5MB!',
						type: 'warning'
					});
				}
				return extension || extension2 && isLt2M
    },
    success(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'success'
      });
    },
    error(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      });
    },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.form.max = ''
      this.balancelist = []
      this.game = []
      this.fileList = []
    },
    reset2 (form2) {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    sure3 () {//批量创建-确定
      let that = this
      if (Object.keys(this.file).length === 0) {
        this.$message({
          message: '请上传文件',
          type: 'error'
        });
        return false
      } else {
        var testmsg = this.file.name.substring(this.file.name.lastIndexOf('.')+1)				
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt2M = this.file.size / 1024 / 1024 < 5
        if(!extension && !extension2) {
          this.$message({
            message: '上传文件只能是xls、xlsx格式',
            type: 'warning'
          });
          return false
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过5MB!',
            type: 'warning'
          });
          return false
        }
      }

      if (this.balancelist.length === 0) {
         this.$message({
          message: '请填写AI余额区间',
          type: 'error'
        });
        return false
      } else {
        this.balancelist.map(val=>{
          if (val.min * 1 < 0 || val.min.indexOf('.') > 0 || val.max * 1 < 0 || val.max.indexOf('.') > 0 || val.prob*1 < 0 || val.prob.indexOf('.') > 0) {
            this.$message({
              message: 'AI余额区间应该为正整数',
              type: 'error'
            });
            return false
          }
        })
      }

      if (this.game.length === 0) {
        this.$message({
          message: '请选择游戏',
          type: 'error'
        });
        return false
      }

      
      // var game = []
      var game = ''
      for (var i = 0;i<that.gamelist.length;i++) {
        var game_name = that.gamelist[i].name
        for(var j = 0;j<this.game.length;j++) {
          var game_id = this.game[j]
          if (game_name == game_id) {
            // game.push({id:that.gamelist[i].id,type:that.gamelist[i].type})
                if(game!=''){
                  game = game + ',' + that.gamelist[i].scene
                }else{
                  game = game + that.gamelist[i].scene
                }
          }
        }
      }

      let form = new FormData()
      form.append('file',this.file)
      let balancelist = JSON.stringify(this.balancelist)
      form.append('priority',balancelist)
      game = JSON.stringify(game)
      form.append('ai_sup_game',game)
      form.append('agent_org_id',that.selectId)

      request({
        url: that.public.url + '/robotsceneconfig/addmultirobot',
        method: 'post',
        data: form
      }).then(res => {
        that.$message.success(res.message)
        that.dialogFormVisible = false
        that.$refs.form.resetFields()
        that.form.max = ''
        that.balancelist = []
        that.game = []
        that.fileList = []
        getlist(that)
      }).catch(error => {
      })
    },
    change (file,fileList) {
      this.file = file.raw
      var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)				
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if(!extension && !extension2) {
        this.$message({
          message: '上传文件只能是xls、xlsx格式',
          type: 'warning'
        });
      }
      if(!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过5MB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M
    },
    edit (row) {// 修改-编辑
      let that = this
      this.dialogFormVisible2 = true
       request({
              url: that.public.url + '/robotsceneconfig/getrobotinfo',
              method: 'post',
              data: {
                    id: row.id
              }
            }).then(res => {
              that.form2.account = res.data.login_name
              that.form2.name = res.data.name
              that.form2.balance = res.data.balance
              that.form2.game = res.data.ai_sup_game.split('、')
              that.id = res.data.id
            }).catch(error => {
            })
    },
    sure () {//单个创建-确定
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          // var game = []
          var game = ''
          for (var i = 0;i<that.gamelist.length;i++) {
            var game_name = that.gamelist[i].name
            for(var j = 0;j<this.form.game.length;j++) {
              var game_id = this.form.game[j]
              if (game_name == game_id) {
                // game.push({id:that.gamelist[i].id,type:that.gamelist[i].type})
                if(game!=''){
                  game = game + ',' + that.gamelist[i].scene
                }else{
                  game = game + that.gamelist[i].scene
                }
              }
            }
          }
             request({
              url: that.public.url + '/robotsceneconfig/addonerobot',
              method: 'post',
              data: {
                    ai_sup_game: game,
                    agent_org_id: that.selectId,
                    login_name: this.form.account,
                    nick_name: this.form.nick,
                    avatar: this.form.head,
                    avatar_frame: this.form.picture,
                    min_money: this.form.balance,
                    max_money: this.form.max,
              }
            }).then(res => {
              that.$message.success(res.message)
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              that.form.max = ''
              that.balancelist = []
              that.game = []
              that.fileList = []
              getlist(that)
            }).catch(error => {
            })
        } else {
          return false
        }
      })
    },
    sure2 () {//修改-确定
      let that = this
      this.$refs.form2.validate((valid) => {
        if (valid) {
          // var game = []
          var game = ''
          for (var i = 0;i<that.gamelist.length;i++) {
            var game_name = that.gamelist[i].name
            for(var j = 0;j<this.form2.game.length;j++) {
              var game_id = this.form2.game[j]
              if (game_name == game_id) {
                // game.push({id:that.gamelist[i].id,type:that.gamelist[i].type})
                if(game!=''){
                  game = game + ',' + that.gamelist[i].scene
                }else{
                  game = game + that.gamelist[i].scene
                }
              }
            }
          }
             request({
              url: that.public.url + '/robotsceneconfig/aisupgameupdate',
              method: 'post',
              data: {
                    ai_sup_game: game,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible2 = false
              that.$refs.form2.resetFields()
              getlist(that)
              that.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(error => {
            })
        } else {
          return false
        }
      })
    },
    del (row) {
      let that = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/robotsceneconfig/delaiaccount',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            });
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
    add () {
      this.selectId = null
      this.title='新增AI角色'
      this.dialogFormVisible = true
      this.balancelist = [
        {min: '',max: '',prob: ''}
      ]
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setairole = {
          'id': that.formInline.id,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize
        }
      this.$store.commit('setairole', setairole)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setairole = {
          'id': that.formInline.id,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize
        }
      this.$store.commit('setairole', setairole)
    }
  }
}


function getlist (that) {
  var type = ''
  var id = ''
  that.gamelist.map(val=>{
    if (val.name === that.formInline.id) {
      id = val.id
      type = val.type
    }
  })
  var game = {id:id,type:type}
  let data = {
    // ai_sup_game: game,
    scene: that.formInline.id,
    agent_org_id: that.selectId,
    pageno: that.currentPage,
    pagerows: that.pagesize,
  }
  request({
    url: that.public.url + '/robotsceneconfig/aiaccountlist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum * 1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}


function getgamelist (that) {
  request({
    // url: that.public.url + '/backend/gamename/getgamenamelist',
    url: that.public.url + '/robotsceneconfig/getaisupgamelist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.gamelist = res.data
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
</style>
