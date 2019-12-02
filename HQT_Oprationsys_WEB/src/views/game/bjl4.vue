<template>
  <div class="app-container">
<h3>{{game_title}}</h3>
<div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;">
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
          <tr class="el-table__row">
            <td rowspan="4" colspan="1" style="width:18%;">
              <div class="cell">匹配阶段</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>初始数量</span>
                 <span v-if="spanshow">{{form.guys_begin}}</span>
                <el-input clearable style="width: 35%;" type='number' v-model="form.guys_begin" v-else></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
           <td rowspan="1" colspan="1">
              <div class="cell">
                <span>预期数量</span>
                 <span v-if="spanshow">{{form.guys_hope}}</span>
                <el-input clearable style="width: 35%;" type='number' v-model="form.guys_hope" v-else></el-input>
              </div>
            </td>
        </tr>
        <tr  class="el-table__row">
           <td rowspan="1" colspan="1">
              <div class="cell">
                <span>匹配进入时长</span>
                 <span v-if="spanshow">{{form.bet_interval_down}}</span>
                <el-input clearable style="width: 35%;" type='number' v-model="form.bet_interval_down" v-else></el-input>
                <span>秒</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>根据配置值确定AI进入匹配队列的时长</span>
              </div>
            </td>
        </tr>
         <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>匹配进入概率</span>
                <span v-if="spanshow">{{form.bet_interval_up}}</span>
                <el-input clearable style="width: 35%;" type='number' v-model="form.bet_interval_up" v-else></el-input>
                <span>%</span>&nbsp;&nbsp;&nbsp;
                <span>根据配置值确定AI进入匹配队列的概率</span>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="2" colspan="1" style="width:18%;">
              <div class="cell">抢庄阶段</div>
            </td>
            <td rowspan="1" colspan="1">
                <div class="cell">
                    <div>抢庄操作时间权重    抢庄阶段的执行时间根据以下时间的权重随机选择，正整数填写</div>
                    <div>
                       <span v-for="(item,key) in prob" :key="key" style="display: inline-block;width: 30%;margin: 5px;">
                         <span class='inlineblock'>{{item.diff}}秒</span><span v-if="spanshow">{{item.prob}}</span><el-input style="width:40%" v-else v-model="item.prob"></el-input>
                       </span>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
             <td rowspan="1" colspan="1">
              <div class="cell">
                <dir style="margin:0;padding:0;">抢庄倍数权重    抢庄倍数按以下权重随机选择，正整数填写</dir>
                <ul class="numUl">
                    <li>
                        <span>不抢</span>
                        <span v-if="spanshow">{{form.variety_down}}</span>
                        <el-input style="width:40%" v-else  v-model="form.variety_down"></el-input>
                    </li>
                    <li>
                        <span>1倍</span>
                        <span v-if="spanshow">{{form.variety_up}}</span>
                        <el-input style="width:40%" v-else  v-model="form.variety_up"></el-input>
                    </li>
                    <li>
                        <span>2倍</span>
                        <span v-if="spanshow">{{form.exit_table_down}}</span>
                        <el-input style="width:30%" v-else v-model="form.exit_table_down"></el-input>
                    </li>
                     <li>
                        <span>3倍</span>
                        <span v-if="spanshow">{{form.exit_table_up}}</span>
                        <el-input style="width:30%" v-else v-model="form.exit_table_up"></el-input>
                    </li>
                </ul>
              </div>
            </td>
        </tr>
         <tr class="el-table__row">
            <td rowspan="2" colspan="1" style="width:18%;">
              <div class="cell">下注阶段</div>
            </td>
             <td rowspan="1" colspan="1">
                <div class="cell">
                    <div>下注操作时间权重    下注阶段的执行时间根据以下时间的权重随机选择，正整数填写</div>
                    <div>
                       <span v-for="(item,key) in chip" :key="key" style="display: inline-block;width: 30%;margin: 5px;">
                         <span class='inlineblock'>{{item.chip}}秒</span><span v-if="spanshow">{{item.priority}}</span><el-input style="width:40%" v-else v-model="item.priority"></el-input>
                       </span>
                    </div>
                </div>
            </td>
         </tr>
         <tr  class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell">
                    <div>下注倍数权重    下注倍数按以下权重随机选择，正整数填写</div>
                    <div>
                        <span v-for="(item,key) in item" :key="key" style="display: inline-block;width: 30%;margin: 5px;">
                            <span class='inlineblock'>{{item.name}}</span><span v-if="spanshow">{{item.priority}}</span><el-input style="width:40%" v-else v-model="item.priority"></el-input>
                        </span>
                    </div>
                </div>
            </td>
         </tr>
          <tr class="el-table__row">
            <td rowspan="2" colspan="1" style="width:18%;">
              <div class="cell">结束阶段</div>
            </td>
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>匹配队列有玩家时AI的退出概率</span>
                 <span v-if="spanshow">{{form.prob_join}}</span>
                <el-input style="width:40%" v-else v-model="form.prob_join"></el-input>
                <span>%</span>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td rowspan="1" colspan="1">
              <div class="cell">
                <span>匹配队列无玩家时AI的准备概率</span>
                 <span v-if="spanshow">{{form.prob_bet}}</span>
                <el-input style="width:40%" v-else  v-model="form.prob_bet"></el-input>
                <span>%</span>
              </div>
            </td>
        </tr>      
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
      ],
      chip: [
      ],
      prob:[],
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
        that.prob = res.data.prob;
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
  .numUl{
      overflow: hidden;
      margin: 0;
      padding: 0;
  }
  .numUl li{
      width: 30%;
      list-style: none;
      float: left;
      margin: 5px;
  }
   .numUl li span{
       margin: 0 20px;
   }
</style>
