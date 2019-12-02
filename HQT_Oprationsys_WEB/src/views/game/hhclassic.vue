<template>
  <div class="app-container">
       <el-tabs type='card'  @tab-click='tabclick' v-model="actionname" >
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>红黑大战（经典场）</span>
            </el-form-item>
            <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop='number'>
              <el-input v-model="form.number" type='number' style="width:140px"></el-input><span>秒</span>
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
        <el-tab-pane label="投注项">

            <el-table
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                label="代码"
                prop="code">
              </el-table-column>
            <el-table-column
              prop="name"
              label="投注项名称">
            </el-table-column>
            <el-table-column
              prop="alot_bet_max_limit"
              label="投注项总限红">
            </el-table-column>
            <el-table-column
              prop="evot_bet_min_limit"
              label="个人下限">
            </el-table-column>
            <el-table-column
              prop="evot_bet_max_limit"
              label="个人上限">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small" v-if="gamesetupdatebetitem">修改</el-button>
              </template>
            </el-table-column>
          </el-table>

        

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
              <div class="cell">红黑大战</div>
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

     <el-tab-pane label="RTP设置" >
        <el-form :model="form3" :rules="rules3" ref="form3">
       <el-form-item label="游戏名：" :label-width="formLabelWidth" >
         <span>{{tablename3}}</span>
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
    <div style="margin-left:64px">
       <!-- <el-button type="primary" @click="sure2(form)">确定</el-button> -->
      <el-button v-if=" !rate_active3" type="primary" @click="modifyRateTwo(form3)">修改配置</el-button>
      <el-button  type="primary" v-if="gamertpsetupdatertpset && rate_active3 " @click="sureConfig(form3)" >保存配置</el-button>  
      <el-button  type="primary" v-if="rate_active3" @click="reset3(form3)">取 消</el-button>
    </div>
     
    
     </el-tab-pane>


      </el-tabs>

        <el-dialog :title='title2'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">

       <el-form-item label="投注项代码" :label-width="formLabelWidth" prop='code' v-if="name">
        <el-input v-model="form2.code" ></el-input>
      </el-form-item>
       <el-form-item label="投注项代码" :label-width="formLabelWidth" v-else>
        <span>{{betcode}}</span>
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
       <el-form-item label="每人每局最小下注限额" :label-width="formLabelWidth" prop='min'>
        <el-input v-model="form2.min" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <el-form-item label="每局个人上限" :label-width="formLabelWidth" prop='max'>
        <el-input v-model="form2.max" type='number' style='width:50%'></el-input> <span>元</span>
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
      formLabelWidth: '180px',
      rules: {
        number: {required: true, message: '请填写投注倒计时长', trigger: 'blur'},
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      name: false,
      actionname: '',
      dialogFormVisible2: false,
      title2: '',
      betid: '',
      form2: {
        code: '',
        name: '',
        day: '',
        min: '',
        max: ''
      },
      rules2: {
        code: {required: true, message: '请填写投注项代码', trigger: 'blur'},
        name: {required: true, message: '请填写投注项名称', trigger: 'blur'},
        day: {required: true, message: '请填写每局总限红', trigger: 'blur'},
        min: {required: true, message: '请填写每人每局最小下注限额', trigger: 'blur'},
        max: {required: true, message: '请填写每局个人上限', trigger: 'blur'},
      },
      betname: '',
      betcode: '',
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
      'gamesetupdateddzroyalty',
      'gamertpsetupdatertpset'
    ])
  },
  watch: {
  },
  filters: {
  },
  methods: {
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: 301,
                  bet_count_down: this.form.number,
                  depict: this.form.depict,
                  status: this.form.status,
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
    tabclick (val) {
      if (this.actionname === '1') {
        getlist(this)
      }
      if(val.index==2){
        getRate(this)
      }
      if(val.index == 3){
         this.rtpgl()
      }
      console.log(val.index)
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
        game_id: 301,
        type: 0,
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
    reset2 () {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    sure2 () {
      let that = this
        this.$refs.form2.validate((valid) => {
        if (valid) {
          if (this.title2 === '投注项-修改') {
             request({
              url: that.public.url + '/gameset/updatebetitem',
              method: 'post',
              data: {
                    id: this.betid,
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
          }
        } else {
          return false
        }
      })
    },
    rtpgl () {
      let that = this
      this.title3 = 'RTP管理-查看'
      this.dialogFormVisible3 = true
      // this.id = row.id
       request({
        url: that.public.url + '/gamertpset/getrtpsetinfo',
        method: 'post',
        data: {
              game_id:301,
              type:0,
              // table_id: row.id
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
                  game_id:301,
                  type:0,
                  table_id:'',
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
              that.$refs.form3.resetFields()
              this.rtpgl(that)
              this.rate_active3 = false
          }).catch(error => {
          })
        }else{
          return false
        }
           })
    },
     reset3 () {
      this.rate_active3 = false
       this.$refs.form3.resetFields()
       this.rtpgl()
     
    },
    edit (row) {
        let that = this
        this.title2 = '投注项-修改'
        this.dialogFormVisible2 = true
        this.name = false
        this.betid = row.id
        request({
          url: that.public.url + '/gameset/getbetiteminfo',
          method: 'post',
          data: {
                id: row.id
          }
        }).then(res => {
          this.betcode = res.data.code
          this.betname= res.data.name
          this.form2.max = res.data.evot_bet_max_limit
          this.form2.min = res.data.evot_bet_min_limit
          this.form2.day = res.data.alot_bet_max_limit
        }).catch(error => {
        }) 
    },
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: {
      game_id: 301
    }
  }).then(res => {
    that.tableData = res.data
  }).catch(error => {
  })
}

function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: 301
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.number = res.data.bet_count_down
      that.form.status = res.data.status * 1
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

function getRate (that) {
    request({
      url: that.public.url + '/gamename/getgamenamelist',
      method: 'post',
      data: {
      }
    }).then(res => {
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].id==301&&res.data[i].type==0){
          that.pumping_rate = res.data[i].royalty/100;
          // console.log('rate&&',that.pumping_rate);
        }
      }
    }).catch(error => {
    })
}

</script>

<style>
</style>
