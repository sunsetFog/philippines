<template>
  <div class="app-container">
       <el-tabs type='card' v-model="actionname" @tab-click='tabclick'>
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>斗地主</span>
            </el-form-item>
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
         <el-tab-pane label="系统抽水率" v-if="gamesetroyatlyinfo">
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
              <div class="cell">斗地主</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="name" v-model="fishlist2"></el-input>
                <span v-else>{{fishlist | rate}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1" style="width:30%;">
              <div class="cell">
                <el-button type="primary" v-if="name && gamesetupdateddzroyalty" @click="sure2">保存</el-button>
                <el-button type="primary" v-if="name" @click="reset">取消</el-button>
                <el-button type="primary" v-else @click="name = true">修改</el-button>
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
         <el-tab-pane label="RTP设置">
             <el-table
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                label="游戏ID"
                prop="id">
              </el-table-column>
              <el-table-column
              prop="name"
              label="场地名称">
            </el-table-column>
            <el-table-column
            width='170'
              label="RTP设置">
              <template slot-scope="scope">
                <el-button @click="rtpgl(scope.row)" type="text" size="small" class="" v-if='gamertpsetgetrtpsetinfo'>RTP管理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
<el-dialog :title='title3'  :visible.sync="dialogFormVisible3" :before-close="reset3">
     <el-form :model="form3" :rules="rules3" ref="form3">
       <el-form-item label="游戏名：" :label-width="formLabelWidth" >
         <span>{{tablename3}}</span>
      </el-form-item>
       <!-- <el-form-item label="牌桌：" :label-width="formLabelWidth">
         <span>{{betid3}}</span>
      </el-form-item> -->
       <el-form-item label="RTP生效投注额：" :label-width="formLabelWidth" prop='rate_input3'>
         <el-input v-if="rate_active3" v-model="form3.rate_input3" style='width:80%'></el-input>
        
         <span v-else>{{form3.rate_input3}}</span>
         <span>元</span>
      </el-form-item>
       <el-form-item label="RTP重置投注额：" :label-width="formLabelWidth" prop='rate_input4'>
          <el-input v-if="rate_active3" v-model="form3.rate_input4" style='width:80%'></el-input>
       
         <span v-else>{{form3.rate_input4}}</span>
          <span>元</span>
      </el-form-item>
       <el-form-item label="RTP上限：" :label-width="formLabelWidth" prop='rate_input5'>
         <el-input v-if="rate_active3" v-model="form3.rate_input5" style='width:80%'></el-input>
        
          <span v-else>{{form3.rate_input5}}</span>
          <span>%</span>
      </el-form-item>
       <el-form-item label="RTP下限：" :label-width="formLabelWidth" prop='rate_input6'>
          <el-input v-if="rate_active3" v-model="form3.rate_input6" style='width:80%'></el-input>
         
          <span v-else>{{form3.rate_input6}}</span>
         <span>%</span>
      </el-form-item>
       <el-form-item label="放水生效概率：" :label-width="formLabelWidth" prop='rate_input7'>
          <el-input v-if="rate_active3" v-model="form3.rate_input7" style='width:80%'></el-input>
         
         <span v-else>{{form3.rate_input7}}</span>
         <span>%</span>
      </el-form-item>
       <el-form-item label="抽水生效概率：" :label-width="formLabelWidth" prop='rate_input8'>
          <el-input v-if="rate_active3" v-model="form3.rate_input8" style='width:80%'></el-input>
        
          <span v-else>{{this.form3.rate_input8}}</span>
         <span>%</span>
      </el-form-item>                                 
    </el-form>
    <div slot="footer" class="dialog-footer">
      
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
      form: {
        depict: '',
        status: ''
      },
      rules: {
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      actionname: '',
      name: false,
      formLabelWidth: '180px',
      fishlist: '',
      fishlist2: '',
       tableData:[
    {
      id:401,
      name:'斗地主1元场'
    },
     {
      id:'402',
      name:'斗地主10元场'
    },
     {
      id:'403',
      name:'斗地主20元场'
    },
  ],
   title3: '',
    form3: {
          rate_input3:'',
          rate_input4:'',
          rate_input5:'',
          rate_input6:'',
          rate_input7:'',
          rate_input8:'',
      },
       rate_active3: false,//span改为input的标识
        rules3: {
          rate_input3:{required: true,validator:validateMone, trigger:'blur'},
          rate_input4:{required: true,validator:validateMone, trigger:'blur'},
          rate_input5:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input6:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input7:{required: true,validator:validateMtwo, trigger:'blur'},
          rate_input8:{required: true,validator:validateMtwo, trigger:'blur'},
      },
      dialogFormVisible3: false,
       tablename3:'',
        betid3:'',
        rowId:'',
    }
  },
  created() {
    getinfo(this)
  },
 
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetupdateddzroyalty',
      'gamesetroyatlyinfo',
      'gamertpsetupdatertpset',
      'gamertpsetgetrtpsetinfo'
    ])
  },
  watch: {
  },
  filters: {
    rate: function (val) {
      return val* 1 + '%'
    }
  },
  methods: {
    tabclick () {
      if (this.actionname === '1') {
        getlist(this)
      }
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: '401',
                  depict: this.form.depict,
                  status: this.form.status
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
    sure2 () {
      let that = this
      if (this.fishlist2 * 1 > 1 || this.fishlist2 * 1 < -1 || that.fishlist2.indexOf('.') > 0 && that.fishlist2.split('.')[1].length > 4) {
        that.$message.error('系统抽税率只能输入大于等于0且小于等于1的数据，并且最多支持小数点后四位。')
        return false
      }
      that.$confirm('', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
      request({
            url: that.public.url + '/gameset/updateddzroyalty',
            method: 'post',
            data: {
                  game_ids: '401,402,403',
                  royalty: this.fishlist2,
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
            that.name = false
          }).catch(error => {
          })
        }).catch(error => {
        })
    },
    reset () {
      getlist(this)
      this.name = false
    },
     rtpgl (row) {
      let that = this
      this.title3 = 'RTP管理-查看'
      this.dialogFormVisible3 = true
      this.id = row.id
      this.rowId = row.id
       request({
        url: that.public.url + '/gamertpset/getrtpsetinfo',
        method: 'post',
        data: {
              game_id:row.id,
              type:0,
              //table_id: row.id
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
                  game_id:this.rowId,
                  type:0,
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


function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: '401,402,403'
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}


function getlist (that) {
  request({
      url: that.public.url + '/gameset/royatlyinfo',
      method: 'post',
      data: {
        game_id: 401
      }
    }).then(res => {
      that.fishlist = res.data
      that.fishlist2 = res.data / 100
    }).catch(error => {
    })
}



</script>

<style>
</style>
