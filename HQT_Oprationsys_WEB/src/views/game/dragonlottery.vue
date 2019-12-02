<template>
  <div class="app-container">
       <el-tabs type='card' v-model="actionname" @tab-click='tabclick'>
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>龙虎斗（彩票场）</span>
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
        <el-tab-pane label="投注项" v-if="gamesetgetbetitemlist">
          <!-- <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                    <el-col :span="2">
                      <el-button type="primary" round @click="add" v-if="gamesetaddtable"> 新增 </el-button>
                    </el-col>
                </el-form>
              </el-row>
            </div> -->

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
              label="投注项个人下限">
            </el-table-column>
            <el-table-column
              prop="evot_bet_max_limit"
              label="投注项个人上限">
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
         <el-tab-pane label="彩种销售" v-if="gamesetgetawardsrclist">

            <el-table
            :data="tableData2"
            border
            style="width: 100%">
              <el-table-column
                label="彩票名称"
                prop="name">
              </el-table-column>
            <el-table-column
              label="销售时间">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.sale_time"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="sale_time"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="销售周期">
              <template slot-scope="scope">
                  <el-table
                  :header-cell-style="{
                    'display':'none'
                  }"
                  :data="scope.row.sale_time"
                  border
                  style="width: 100%">
                    <el-table-column
                    prop="sale_period"
                    >
                </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              prop="bet_count_down"
              label="投注倒计时长">
            </el-table-column>
          </el-table>

        </el-tab-pane>



        <el-tab-pane label="系统抽水率" v-if="gamesetgetawardsrclist">

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
       <el-form-item label="每局个人下限" :label-width="formLabelWidth" prop='min'>
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
    return {
      formInline: {
        id: '',
        name: ''
      },
      form: {
        depict: '',
        status: ''
      },
      currentPage: 1,
      tableData: [
      ],
      tableData2: [],
      rules: {
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      total: 0,
      pagesize: 20,
      id: '',
      title2: '',
      dialogFormVisible2: false,
      form2: {
        code: '',
        name: '',
        day: '',
        min: '',
        max: ''
      },
      actionname: '',
      rules2: {
        code: {required: true, message: '请填写投注项代码', trigger: 'blur'},
        name: {required: true, message: '请填写投注项名称', trigger: 'blur'},
        day: {required: true, message: '请填写每局总限红', trigger: 'blur'},
        min: {required: true, message: '请填写每局个人下限', trigger: 'blur'},
        max: {required: true, message: '请填写每局个人上限', trigger: 'blur'},
      },
      name: false,
      formLabelWidth: '180px',
      betcode: '',
      betname: '',
      betid: '',
      pumping_rate: null,
      rate_active: false,
      rate_input: ''
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetaddtable',
      'gamesetupdatebetitem',
      'gamesetgetbetitemlist',
      'gamesetgetawardsrclist',
      'gamesetupdateddzroyalty'
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
    tabclick (val) {
      if (this.actionname === '1') {
        getlist(this)
      }
      if (this.actionname === '2') {
        getaward(this)
      }
      if(val.index==3){
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
        type: 2,
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
                  depict: this.form.depict,
                  status: this.form.status,
                  type: 2
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
    add () {
        this.title2 = '投注项-新增'
        this.dialogFormVisible2 = true
        this.name = true
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
                    type: 2,
                    game_id: 801,
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
                    type: 2,
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
        } else {
          return false
        }
      })
    }
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: {
      game_id: 801,
      type: 2
    }
  }).then(res => {
    that.tableData = res.data
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
        id: 801,
        type: 2
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}

function getaward (that) {
  request({
      url: that.public.url + '/gameset/getawardsrclist',
      method: 'post',
      data: {
        game_id: 801,
        type: 2
      }
    }).then(res => {
      that.tableData2 = res.data
    }).catch(error => {
    })
}

function getRate (that) {
    request({
      url: that.public.url + '/gamename/getgamenamelist',
      method: 'post',
      data: {
      }
    }).then(res => {
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].id==801&&res.data[i].type==2){
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
