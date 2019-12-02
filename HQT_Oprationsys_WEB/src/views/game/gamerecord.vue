<template>
  <div class="app-container">
         
        <div class="query">
      <el-row>
        <el-form :inline="true" label-width="100px">
           
           <el-col :span="8">
            <el-form-item label="玩家渠道">
                <el-select v-model="formInline.id" clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="玩家账号">
                <el-input v-model="formInline.number" placeholder="请输入要查询的关键词" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
                <el-form-item label="常规开奖时间">
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

          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="100px">
            <el-col :span="8">
                <!-- <el-form-item label="比倍开奖时间">
                <el-date-picker
                    v-model="formInline.time2"
                    type="datetimerange"
                    :editable="false"
                    range-separator="-"
                    start-placeholde="开始日期"
                    end-placeholde="结束日期">
                    </el-date-picker>
                </el-form-item> -->
          </el-col>
          <el-col :span="8">
                <el-form-item label="彩金开奖时间">
                <el-date-picker
                    v-model="formInline.time3"
                    type="datetimerange"
                    :editable="false"
                    range-separator="-"
                    start-placeholde="开始日期"
                    end-placeholde="结束日期">
                    </el-date-picker>
                </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="UID">
              <el-input v-model="formInline.uid" clearable></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click='query()' v-if="gamewmgplayrecgetlist" :loading="loading">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
        </div>

        <div class="paging">
          <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
          <el-button type='primary' @click="down" :disabled="tableData.length < 20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
          <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="UID"
          prop="uid">
        </el-table-column>
        <el-table-column
          label="玩家渠道"
          prop="org_name">
        </el-table-column>
        <el-table-column
          label="玩家账号"
          prop="user_account">
        </el-table-column>
        <el-table-column
              label="常规下注金额">
              <template slot-scope="scope">
                {{scope.row.co_bet_money}}
              </template>
            </el-table-column>
        <el-table-column
          label="常规奖励金额"
          prop="co_reward">
        </el-table-column>
        <el-table-column
          label="彩金奖励金额"
          prop="tg_reward">
        </el-table-column>
       
        <el-table-column
              label="常规开奖时间">
              <template slot-scope="scope">
                {{scope.row.co_open_time | time}}
              </template>
            </el-table-column>
       
        <el-table-column
              label="彩金开奖时间">
              <template slot-scope="scope">
                {{scope.row.tg_open_time | time}}
              </template>
            </el-table-column>
        <el-table-column
          label="比倍骰子点数"
          prop="cm_dice_points">
        </el-table-column>
         <el-table-column
              label="常规开奖图案">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="view(scope.row.co_open_pattern)"  v-if="scope.row.co_open_pattern && scope.row.co_open_pattern!=''">查看</el-button>
              </template>
            </el-table-column>
        <el-table-column
          label="彩金开奖次数"
          prop="tg_num">
        </el-table-column>
        <el-table-column
              label="彩金开奖图案">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="view1(scope.row.tg_open_pattern)" v-if="scope.row.tg_open_pattern && scope.row.tg_open_pattern!=''">查看</el-button>
              </template>
            </el-table-column>
             <el-table-column
          label="比倍下注金额"
          prop="cm_bet_money">
        </el-table-column>
         <el-table-column
          label="比倍奖励金额"
          prop="cm_reward">
        </el-table-column>
         <el-table-column
              label="比倍开奖时间">
              <!-- <template slot-scope="scope">
                {{scope.row.cm_open_time | time}}
              </template> -->
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="view2(scope.row.cm_open_time)"  v-if="scope.row.cm_open_time && scope.row.cm_open_time!=''">查看</el-button>
              </template>
            </el-table-column>
              <el-table-column
          label="比倍下注名称"
          prop="cm_bet_name">
        </el-table-column>
        <el-table-column
          label="比倍方式"
          prop="cm_mode">
        </el-table-column>
      </el-table>

      
<div class="paging">
  <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up" :loading="loading">上一页</el-button>
  <el-button type='primary' @click="down" :disabled="tableData.length < 20 ? true : false" :loading="loading">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</div>


<el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <div>{{picture}}</div>
    <el-button @click="reset()" style="margin-top: 20px;">取 消</el-button>

  </el-dialog>

    
  




      
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth';
  export default {
    name: "accountchange",
    data() {
      return {
        total: 0,
        pagesize: 20,
        currentPage: 1,
        tableData: [],
        formInline: {
            number: '',
            time1: [],
            time2: [],
            time3: [],
            id: '',
            uid: ''
        },
        statuslist: [],
        num: 1,
        picture: '',
        title: '',
        dialogFormVisible: false,
        loading: false
      }
    },
    created () {
      let that = this
      getaccount(this)
      if (!this.gamerecord.length && this.gamerecord.length != 0) {
        that.formInline.id = this.gamerecord.id
        that.formInline.number = this.gamerecord.number
        that.formInline.time1 = this.gamerecord.time1
        that.formInline.time2 = this.gamerecord.time2
        that.formInline.time3 = this.gamerecord.time3
        that.formInline.uid = this.gamerecord.uid
        that.currentPage = this.gamerecord.currentPage
        that.num = this.gamerecord.currentPage
        that.pagesize = this.gamerecord.pagesize
        getlist(that)
      }
    },
    computed: {
      ...mapGetters([
        'gamewmgplayrecgetlist',
        'gamerecord'
      ])
    },
    filters: {
      time: function (val) {
        if (val == '-1') {
          return ''
        } else {
          return val
        }
      }
    },
    methods: {
      up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(this)
      let setgamerecord = {
        'id': that.formInline.id,
        'currentPage': this.num,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'time1': that.formInline.time1,
        'time2': that.formInline.time2,
        'time3': that.formInline.time3,
        'uid': that.formInline.uid,
      }
      this.$store.commit('setgamerecord', setgamerecord)
    },
    view (data) {
      this.title = '常规开奖图案'
      this.picture = data
      this.dialogFormVisible = true
    },
    view1 (data) {
      console.log(data)
      this.title = '彩金开奖图案'
      this.picture = data
      this.dialogFormVisible = true
    },
     view2 (data) {
      this.title = '比倍开奖时间'
      this.picture = data
      this.dialogFormVisible = true
    },
    reset () {
       this.picture = ''
       this.dialogFormVisible = false
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(this)
      let setgamerecord = {
        'id': that.formInline.id,
        'currentPage': this.num,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'time1': that.formInline.time1,
        'time2': that.formInline.time2,
        'time3': that.formInline.time3,
        'uid': that.formInline.uid,
      }
      this.$store.commit('setgamerecord', setgamerecord)
    },
      query () {
        let that = this
        this.currentPage = 1
        this.num = 1
        getlist(this)
        let setgamerecord = {
        'id': that.formInline.id,
        'currentPage': that.num,
        'pagesize': that.pagesize,
        'number': that.formInline.number,
        'time1': that.formInline.time1,
        'time2': that.formInline.time2,
        'time3': that.formInline.time3,
        'uid': that.formInline.uid,
      }
      this.$store.commit('setgamerecord', setgamerecord)
      },
    }
  }

  function getlist (that) {
    that.loading = true
    var start = ''
    var end = '' 
    var start2 = ''
    var end2 = '' 
    var start3 = ''
    var end3 = '' 
    if (that.formInline.time1 && that.formInline.time1.length > 0) {
      start = parseTime(that.formInline.time1[0].getTime() /1000)
      end = parseTime(that.formInline.time1[1].getTime() /1000)
    }
    if (that.formInline.time2 && that.formInline.time2.length > 0) {
      start2 = parseTime(that.formInline.time2[0].getTime() /1000)
      end2 = parseTime(that.formInline.time2[1].getTime() /1000)
    }
    if (that.formInline.time3 && that.formInline.time3.length > 0) {
      start3 = parseTime(that.formInline.time3[0].getTime() /1000)
      end3 = parseTime(that.formInline.time3[1].getTime() /1000)
    }
    request({
      url: that.public.url + '/backend/gamewmgplayrec/getlist',
      method: 'post',
      data: {
        org_id: that.formInline.id,
        user_account: that.formInline.number,
        uid: that.formInline.uid,
        co_open_time_from: start,
        co_open_time_to: end,
        cm_open_time_from: start2,
        cm_open_time_to: end2,
        tg_open_time_from: start3,
        tg_open_time_to: end3,
        pageno: that.currentPage,
        pagerows: that.pagesize
      }
    }).then(res => {
      that.loading = false
      that.tableData = res.data
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
</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
