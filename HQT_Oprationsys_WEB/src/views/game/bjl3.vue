<template>
  <div class="app-container">
<h3>{{game_title}}</h3>
<div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;">
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td rowspan="2" colspan="1" style="width:18%;">
              <div class="cell">AI进出规则</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>初始数量</span>
                <span v-if="spanshow">{{form.guys_begin}}</span>
                <el-input clearable style="width: 85%;" type='number' v-model="form.guys_begin" v-else></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>预期数量</span>
                <span v-if="spanshow">{{form.guys_hope}}</span>
                <el-input clearable style="width: 85%;" type='number' v-model="form.guys_hope" v-else></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="3" colspan="1" style="width:18%;">
              <div class="cell">AI调整规则</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>数量调整时间</span>            
                <span>最低</span><span v-if="spanshow">{{form.variety_down}}</span><el-input style="width:20%" v-else v-model="form.variety_down"></el-input><span>秒</span>
                <span>最高</span><span v-if="spanshow">{{form.variety_up}}</span><el-input style="width:20%" v-else v-model="form.variety_up"></el-input><span>秒</span>
              </div>
            </td>
        </tr>

        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>调整时AI数量保持不变的概率</span>
                <span v-if="spanshow">{{form.stable}}</span>
                <el-input clearable style="width: 50%;" type='number' v-model="form.stable" v-else></el-input><span>%</span>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>调整时AI增加概率  计算方式：AI当前数量-目标数量得到的差值决定，差值≤值写值即属于该区间</span>
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  label="差值区间上限"
                  >
                  <template slot-scope="scope">
                    <span v-if="spanshow">{{scope.row.diff}}</span>
                    <el-input v-else v-model="scope.row.diff"></el-input>
                  </template>
                </el-table-column>
                 <el-table-column
                  label="概率"
                  >
                  <template slot-scope="scope">
                    <span v-if="spanshow">{{scope.row.prob}}</span>
                    <el-input style="width:50%" v-else  v-model="scope.row.prob"></el-input><span>%</span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="!spanshow"
                  label="操作"
                  width='250'
                  >
                  <template slot-scope="scope">
                    <el-button @click="add(scope.row)" type="text" size="small">新增</el-button>
                    <el-button @click="del(scope.$index)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1" style="width:18%;">
                <div class="cell">AI常规游戏</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                 <span>首次底注选择   进入游戏后首次选择的底注权重，正整数填写</span><br/>
                <span v-for="(item,key) in chip" :key="key" style="display: inline-block;width: 30%;margin: 5px;">
                  <span class='inlineblock'>{{item.chip}}</span><span v-if="spanshow">{{item.priority}}</span><el-input style="width:70%" v-else v-model="item.priority"></el-input>
                </span>
                <div>
                    <span>非首次底注选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相同底注概率</span>
                    <span v-if="spanshow">{{form.prob_join}}</span>
                    <el-input style="width:40%" v-else v-model="form.prob_join"></el-input>
                    <span>%</span>
                </div>
              </div>
            </td>
        </tr>
         <tr class="el-table__row">
            <td rowspan="1" colspan="1" style="width:18%;">
                <div class="cell">AI开奖时间</div>
            </td>
            <td rowspan="1" colspan="1">
                <div class="cell">
                    <div>
                        <span>常规游戏开奖结果生成时间 &nbsp;&nbsp;&nbsp;最短</span>
                        <span v-if="spanshow">{{form.exit_balance}}</span>
                        <el-input style="width:20%" v-else  v-model="form.exit_balance"></el-input>
                        <span>秒</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>最长</span>
                        <span v-if="spanshow">{{form.prob_leave}}</span>
                        <el-input style="width:20%" v-else  v-model="form.prob_leave"></el-input>
                        <span>秒</span>    
                    </div>
                    <br />
                    <div>
                        <span>彩金游戏开奖结果生成时间 &nbsp;&nbsp;&nbsp;最短</span>
                        <span v-if="spanshow">{{form.exit_table_down}}</span>
                        <el-input style="width:20%" v-else  v-model="form.exit_table_down"></el-input>
                        <span>秒</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>最长</span><span v-if="spanshow">{{form.exit_table_up}}</span><el-input style="width:20%" v-else v-model="form.exit_table_up"></el-input>
                        <span>秒</span>
                    </div>
                     <br />
                    <div>
                        <span>比倍游戏开奖结果生成时间 &nbsp;&nbsp;&nbsp;最短</span>
                        <span v-if="spanshow">{{form.bet_interval_down}}</span>
                        <el-input style="width:20%" v-else  v-model="form.bet_interval_down"></el-input>
                        <span>秒</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>最长</span><span v-if="spanshow">{{form.bet_interval_up}}</span>
                        <el-input style="width:20%" v-else   v-model="form.bet_interval_up"></el-input>
                        <span>秒</span>
                    </div>                 
                </div>
            </td>
        </tr>
         <tr class="el-table__row">
            <td rowspan="1" colspan="1" style="width:18%;">
                <div class="cell">AI比倍设置</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                    <span>常规游戏结束后进入比倍游戏概率</span>
                    <span v-if="spanshow">{{form.prob_bet}}</span>
                    <el-input style="width:30%" v-else  v-model="form.prob_bet"></el-input>
                    <span>%</span>
              </div>
              <br />
              <div class="cell">
                <span>彩金游戏结束后进入比倍游戏概率</span>
                <span v-if="spanshow">{{form.repeat_chip}}</span>
                <el-input style="width:30%" v-else v-model="form.repeat_chip"></el-input><span>%</span>
              </div>
              <br />
              <div class="cell">
                <span>比倍游戏胜利后继续参与比倍概率</span>
                <span v-if="spanshow">{{form.repeat_bet}}</span>
                <el-input style="width:30%" v-else v-model="form.repeat_bet"></el-input><span>%</span>
              </div>
              <div class="cell">
                <span style="position:relative;top:12px;">比倍游戏方式权重</span><br/>
                <span v-for="(item,key) in item" :key="key" style="display: inline-block;width: 30%;margin: 20px 5px 5px 5px; float:left;position:relative">
                  <div v-if="key == 3 " style="float:left;position:absolute;left:0;top:-19px;">比倍游戏押注权重</div>
                  <span class='inlineblock'>{{item.name}}</span><span v-if="spanshow">{{item.priority}}</span><el-input style="width:70%" v-else v-model="item.priority"></el-input>      
                </span>
              </div>       
            </td>
        </tr>
        <!-- <tr class="el-table__row">
            <td rowspan="3" colspan="1" style="width:18%;">
              <div class="cell">AI退出规则</div>
            </td>
            <td rowspan="1" colspan="1">
              
            </td>
        </tr>

        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>概率退出</span>
                
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
             
            </td>
        </tr>

        <tr class="el-table__row">
            <td rowspan="3" colspan="1" style="width:18%;">
              <div class="cell">AI投注规则</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
             
            </td>
        </tr>
        

        <tr class="el-table__row">
            <td rowspan="1" colspan="1" style="width:18%;">
              <div class="cell">AI投注权重</div>
            </td>
            <td rowspan="1" colspan="1" style="width:18%;">
              
        </tr>
       <tr class="el-table__row">
            <td rowspan="3" colspan="1" style="width:18%;">
              <div class="cell">AI筹码使用</div>
            </td>
            
        </tr>

         <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              
            </td>
        </tr>

          <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              
            </td>
        </tr> -->

        
      </tbody>
    </table>
    
  </div>
</div>


  <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" @click="sure()" style="width: 170px;" v-if="!spanshow">保存配置</el-button>
      <el-button type="primary" @click="reset()" style="width: 170px;" v-if="!spanshow">取消</el-button>
      <el-button type="primary" @click="edit()" style="width: 170px;" v-if="spanshow" v-show="gameconfmgraiconfig">修改配置</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  filters: {
  },
  props: ['game_scene_id','game_duration','game_title'],
  data() {
    return {
      status: '',
      form: {
        guys_begin: '',//开始人数
        guys_hope: '',
        variety_down: '',
        variety_up: '',
        stable: '',
        diff: '',
        exit_balance: '',
        prob_leave: '',
        exit_table_down: '',
        exit_table_up: '',
        prob_join: '',
        bet_interval_down: '',
        bet_interval_up: '',
        prob_bet: '',
        repeat_chip: '',
        repeat_bet: ''
      },
      tableData: [
        {
          diff: '',
          prob: ''
        }
      ],
      item: [
        {
          name: '庄',
          item: '1',
          priority: ''
        },
        {
          name: '闲',
          item: '2',
          priority: ''
        },
        {
          name: '和',
          item: '3',
          priority: ''
        },
        {
          name: '大',
          item: '4',
          priority: ''
        },
        {
          name: '小',
          item: '5',
          priority: ''
        },
        {
          name: '庄对',
          item: '6',
          priority: ''
        },
        {
          name: '闲对',
          item: '7',
          priority: ''
        },
        {
          name: '任意对子',
          item: '8',
          priority: ''
        },
        {
          name: '完美对子',
          item: '9',
          priority: ''
        }
      ],
      chip: [
        {
          chip: '1',
          priority: ''
        },
        {
          chip: '5',
          priority: ''
        },
        {
          chip: '10',
          priority: ''
        },
        {
          chip: '20',
          priority: ''
        },
        {
          chip: '50',
          priority: ''
        },
        {
          chip: '100',
          priority: ''
        },
        {
          chip: '200',
          priority: ''
        },
        {
          chip: '500',
          priority: ''
        },
        {
          chip: '1000',
          priority: ''
        }
      ],
      spanshow: true
    }
  },
  computed: {
    ...mapGetters([
      'sysconfigriskcontroller',
      'gameconfmgraiconfig'
    ])
  },
  methods: {
    add () {
      if(this.tableData[this.tableData.length-1].diff==''||this.tableData[this.tableData.length-1].prob==''){
        this.$message.error('请先填完新增项！');
      }else{
        this.tableData.push({
          diff: '',
          prob: ''
        })
      }
    },
    del (index) {
      this.tableData.splice(index,1)
    },
    edit () {
      this.spanshow = false
      if(this.tableData.length==0){
          this.tableData.push({
            diff: '',
            prob: ''
          })
        }
    },
    reset () {
      this.spanshow = true
      getlist(this);
    },
    //保存配置
    sure () {
      let that = this
      if(that.tableData.length!=0){
        if(that.tableData[that.tableData.length-1].diff==''||that.tableData[that.tableData.length-1].prob==''){
          if(that.tableData.length==1){
            that.tableData = [];
          }else{
            that.$message.error('请先填完新增项！');
            return;
          }
        }
      }

      let chip = [];
      let item = [];
      let diff = [];
      for(let i=0;i<this.chip.length;i++){
        chip.push({
          chip: Number(this.chip[i].chip),
          priority: Number(this.chip[i].priority)
        })
      }
      for(let i=0;i<this.item.length;i++){
        item.push({
          item: Number(this.item[i].item),
          name: this.item[i].name,
          priority: Number(this.item[i].priority)
        })
      }
      for(let i=0;i<this.tableData.length;i++){
        diff.push({
          diff: Number(this.tableData[i].diff),
          prob: Number(this.tableData[i].prob)
        })
      }
       request({
        url: that.public.url + '/backend/robotsceneconfig/robotset',
        method: 'post',
        data: {
          scene: that.game_scene_id,
          duration: that.game_duration,
          item: item,
          chip: chip,
          diff: diff,
          guys_begin: this.form.guys_begin,
          guys_hope: this.form.guys_hope,
          variety_down: this.form.variety_down,
          variety_up: this.form.variety_up,
          stable: this.form.stable,
          exit_balance: this.form.exit_balance,
          prob_leave: this.form.prob_leave,
          exit_table_down: this.form.exit_table_down,
          exit_table_up: this.form.exit_table_up,
          prob_join: this.form.prob_join,
          bet_interval_down: this.form.bet_interval_down,
          bet_interval_up: this.form.bet_interval_up,
          prob_bet: this.form.prob_bet,
          repeat_chip: this.form.repeat_chip,
          repeat_bet: this.form.repeat_bet,
        }
      }).then(res => {
        if(res.code==0){
          getlist(that);
          that.spanshow = true;
        }
        that.$message({
          type: 'success',
          message: res.message
        })
      }).catch(error => {
      })
    },
    communication(){
      getlist(this);
    }
  }
}

function getlist (that) {
      request({
        url: that.public.url + '/robotsceneconfig/getrobotsetinfo',
        method: 'post',
        data: {
          scene: that.game_scene_id,
          duration: that.game_duration,
        }
      }).then(res => {
        that.form = res.data;
        that.tableData = res.data.prob;
        that.item = res.data.item;
        that.chip = res.data.chip;
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
  .inlineblock {
    display:inline-block;
    text-align: center;
    width: 70px;
  }
</style>
