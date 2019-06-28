<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="70px">
           

          <el-col :span="6">
            <el-form-item label="彩种">
            <!-- <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input> -->
            <el-select v-model="formInline.name" filterable clearable>
                <el-option
                  v-for="(item,index) in gamename"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="期号">
                <el-input v-model="formInline.number" placeholder="期号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结算状态">
                <el-select v-model="formInline.setstatus" filterable clearable>
                <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


           <el-col :span="6">
            <el-form-item label="撤单状态">
                <el-select v-model="formInline.cancelstatus" filterable clearable>
                <el-option
                  v-for="item in status1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          
        </el-form>
      </el-row>
      <el-row>
        <el-form :inline="true" label-width="70px">
          <el-col :span="6">
            <el-form-item label="游戏名称">
                <el-select v-model="formInline.id"  filterable clearable>
                <el-option
                  v-for="(item,key) in gamelist"
                  :key="key"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开奖状态">
                <el-select v-model="formInline.kjstatus" filterable clearable>
                <el-option
                  v-for="item in status2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="8">
            <el-form-item label="彩票时间">
               <el-date-picker
                v-model="formInline.time1"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-col> -->

          <el-col :span="8">
            <el-form-item label="开奖时间">
              <el-date-picker
              v-model="formInline.time2"
              type="datetimerange"
              :editable="false"
              range-separator="-"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameopenawardgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- <div class="pagingbox">
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
    </div> -->

    <div class="paging">
          <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
          <el-button type='primary' @click="down" :disabled="tableData.length < 50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>

    <el-table
    :data="tableData"
    :row-class-name='rowclass'
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="game_name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      prop="table_name"
      label="桌子">
    </el-table-column>
    <!-- <el-table-column
      label="彩票时间">
      <template slot-scope="scope">
        <span>{{scope.row.term_to_time | time}}</span>
      </template>
    </el-table-column> -->
    <el-table-column
      prop="cname"
      label="彩种">
    </el-table-column>
    <el-table-column
      prop="termno"
      label="期号">
    </el-table-column>
    <el-table-column
      prop="openno"
      label="中奖号码">
    </el-table-column>
    <el-table-column
      label="开奖时间">
      <template slot-scope="scope">
        <span>{{scope.row.open_award_time | time}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="is_open_award"
      label="开奖状态">
    </el-table-column>
    <el-table-column
      prop="is_settle_order"
      label="结算状态">
    </el-table-column>
    <el-table-column
      label="撤单状态">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="danger" v-if="gameopenawardkillorder && scope.row.is_cancel_order=='需要撤单' || scope.row.is_cancel_order=='撤单'">{{scope.row.is_cancel_order}}</el-button>
        <span v-else>{{scope.row.is_cancel_order}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="撤单花销时间">
      <template slot-scope="scope">
        <span>{{scope.row.cancel_cost_sec | time1}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="撤单原因">
      <template slot-scope="scope">
        {{scope.row.cancel_order_cause}}
      </template>
    </el-table-column>
  </el-table>

<!-- <div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[50,100,200,500]"
      :page-size="pagesize"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div> -->


<div class="paging">
          <el-button icon='el-icon-arrow-left' type='primary' :disabled="num <=1 ? true : false" @click="up">上一页</el-button>
          <el-button type='primary' @click="down" :disabled="tableData.length < 50 ? true : false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>

<el-dialog title='彩票撤单'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="注意" :label-width="formLabelWidth">
        <span class='red'>异常处理时间限制在1440分钟内</span>
      </el-form-item>
       <el-form-item label="彩种名称" :label-width="formLabelWidth">
        <span>{{name}}</span>
      </el-form-item>
      <el-form-item label="奖期" :label-width="formLabelWidth">
        <span>{{termno}}</span>
      </el-form-item>
       <el-form-item label="处理原因" :label-width="formLabelWidth" prop='type'>
        <el-radio v-model="form.type" label='1'>提前开奖</el-radio>                                                                                                                                                                  
        <el-radio v-model="form.type" label='2'>开奖号码错误</el-radio>                                                                                                                                                                  
        <el-radio v-model="form.type" label='3'>未开奖</el-radio>                                                                                                                                                                  
      </el-form-item>
      <el-form-item label="正确的开奖号码" :label-width="formLabelWidth" prop='number' v-if="shownumber">
          <el-input v-model="form.number" placeholder="请输入正确的开奖号码" clearable></el-input>                                                                                                                                                  
      </el-form-item>
        <el-form-item label="官方实际开奖时间" :label-width="formLabelWidth" prop='time' v-if="showtime">
            <el-date-picker
            v-model="form.time"
            type='datetime'
            ></el-date-picker>                                                                                                                                       
      </el-form-item>                                    
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form)">取 消</el-button>
      <el-button type="primary" @click="sure(form)">确 定</el-button>
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
        setstatus: '',
        cancelstatus: '',
        kjstatus: '',
        number: '',
        name: '',
        time1: [],
        time2: [],
        id: ''
      },
      gamelist: [],
      currentPage: 1,
      tableData: [],
      gamename: [],
      status: [
        {name:'全部',id: '' },
        {name:'待结算',id: '0' },
        {name:'已结算',id: '1' }
      ],
      status1: [
        {name:'全部',id: '' },
        {name:'撤单',id: '2' },
        {name:'无',id: '4' },
        {name:'已撤单',id: '3' },
      ],
      status2: [
        {name:'全部',id: '' },
        {name:'待开奖',id: '0' },
        {name:'已开奖',id: '1' }
      ],
      total: 0,
      pagesize: 100,
      id: '',
      form: {
        type: '',
        time: '',
        number: ''
      },
      name: '',
      termno: '',
      formLabelWidth: '150px',
      dialogFormVisible: false,
      rules: {
        type: [
          {required: true, message: '请选择处理原因', trigger: 'change'}
        ],
        number: [
          {required: true, message: '请输入正确的开奖号码', trigger: 'blur'}
        ],
        time: [
          {required: true, message: '请选择官方实际开奖时间', trigger: 'change'}
        ],
      },
      table_id: '',
      las_id: '',
      showtime: false,
      shownumber: false,
      game_id: '',
      num: 1
    }
  },
  created() {
    getgamename(this)
    getgamelist(this)
    let that = this
    if (Object.keys(this.$route.query).length > 0) {
      that.formInline.number = this.$route.query.termno
      that.formInline.name =  this.$route.query.id
      getlist(this)
    } else {
      if (!this.lottery.length && this.lottery.length != 0) {
        that.currentPage = this.lottery.currentPage
        that.num = this.lottery.currentPage
        that.pagesize = this.lottery.pagesize
        that.formInline.number = this.lottery.number
        that.formInline.name = this.lottery.name
        that.formInline.time1 = this.lottery.time1
        that.formInline.time2 = this.lottery.time2
        that.formInline.setstatus = this.lottery.setstatus
        that.formInline.cancelstatus = this.lottery.cancelstatus
        that.formInline.kjstatus = this.lottery.kjstatus
        getlist(this)
      }
    }
  },
  computed: {
    ...mapGetters([
      'gameopenawardgetlist',
      'gameopenawardkillorder',
      'lottery'
    ])
  },
  watch: {
    'form.type': function (val) {
      if (val === '1') {
        this.showtime = true
        this.form.number = ''
      } else {
        this.showtime = false
      }
      if (val === '2') {
        this.form.time = ''
        this.shownumber = true
      } else {
        this.shownumber = false
      }
    }
  },
  filters: {
    time (val) {
      if (val === '-1') {
        return ''
      } else {
        return val
      }
    },
    time1 (val) {
      if (val === '-1秒') {
        return ''
      } else {
        return val
      }
    }
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      this.num = 1
      getlist(this)
      let setlottery = {
          'currentPage': that.num,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'time1': that.formInline.time1,
          'time2': that.formInline.time2,
          'setstatus': that.formInline.setstatus,
          'cancelstatus': that.formInline.cancelstatus,
          'kjstatus': that.formInline.kjstatus,
          'id': that.formInline.id,
        }
      this.$store.commit('setlottery', setlottery)
    },
    up () {
      let that = this
      this.num--
      this.currentPage = this.num
      getlist(this)
      let setlottery = {
          'currentPage': that.num,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'time1': that.formInline.time1,
          'time2': that.formInline.time2,
          'setstatus': that.formInline.setstatus,
          'cancelstatus': that.formInline.cancelstatus,
          'kjstatus': that.formInline.kjstatus,
          'id': that.formInline.id,
        }
      this.$store.commit('setlottery', setlottery)
    },
    down () {
      let that = this
      this.num++
      this.currentPage = this.num
      getlist(this)
      let setlottery = {
          'currentPage': that.num,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'time1': that.formInline.time1,
          'time2': that.formInline.time2,
          'setstatus': that.formInline.setstatus,
          'cancelstatus': that.formInline.cancelstatus,
          'kjstatus': that.formInline.kjstatus,
          'id': that.formInline.id,
        }
      this.$store.commit('setlottery', setlottery)
    },
    reset () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    rowclass ({row, rowIndex}) {
        if (row.is_cancel_order === '需要撤单') {
          return 'should'
        }
        if (row.is_cancel_order === '己撤单') {
          return 'ready'
        }
        return ''
      },
    sure () {
      let that = this
       that.$refs.form.validate((valid) => {
        if (valid) {
          that.$confirm('', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            let time = ''
            if (that.form.time && that.form.time.length > 0) {
              time = parseTime(that.form.time.getTime() /1000)
            }
            request({
              url:that.public.url + '/gameopenaward/killorder',
              method:'post',
              data:{
                game_id: that.game_id,
                table_id: this.table_id,
                termno:this.termno,
                las_id: this.las_id,
                reason: this.form.type,
                openno: this.form.number,
                open_bonus_time: time
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.$refs.form.resetFields()
              that.dialogFormVisible = false
              getlist(that)
            }).catch(error => {
            })
          }).catch(error => {
          })
        } else {
          return false
        }
      })
    },
    edit (row) {
      let that = this
      that.name = row.cname
      that.termno = row.termno
      that.id = row.id
      this.dialogFormVisible = true
      request({
        url: that.public.url + '/gameopenaward/getinfo',
        method: 'post',
        data: {
          id: row.id
        }
      }).then(res => {
        that.table_id = res.data.table_id
        that.las_id = res.data.las_id
        that.game_id = res.data.game_id
      }).catch(error => {
      })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setlottery = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'time1': that.formInline.time1,
          'time2': that.formInline.time2,
          'setstatus': that.formInline.setstatus,
          'cancelstatus': that.formInline.cancelstatus,
          'kjstatus': that.formInline.kjstatus,
          'id': that.formInline.id,
        }
      this.$store.commit('setlottery', setlottery)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
      let setlottery = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'number': that.formInline.number,
          'name': that.formInline.name,
          'time1': that.formInline.time1,
          'time2': that.formInline.time2,
          'setstatus': that.formInline.setstatus,
          'cancelstatus': that.formInline.cancelstatus,
          'kjstatus': that.formInline.kjstatus,
          'id': that.formInline.id,
        }
      this.$store.commit('setlottery', setlottery)
    }
  }
}


function getlist (that) {
  var start1 = ''
  var start2 = ''
  var end1 = ''
  var end2 = ''
  if (that.formInline.time1 && that.formInline.time1.length > 0) {
    start1 = parseTime(that.formInline.time1[0].getTime() /1000)
    end1 = parseTime(that.formInline.time1[1].getTime() /1000)
  }
  if (that.formInline.time2 && that.formInline.time2.length > 0) {
    start2 = parseTime(that.formInline.time2[0].getTime() /1000)
    end2 = parseTime(that.formInline.time2[1].getTime() /1000)
  }
 
  request({
    url: that.public.url + '/gameopenaward/getlotterylist',
    method: 'post',
    data: {
      pageno: that.currentPage,
      pagerows: that.pagesize,
      lottery_id: that.formInline.name,
      termno: that.formInline.number,
      is_settle_order: that.formInline.setstatus,
      is_cancel_order: that.formInline.cancelstatus,
      is_open_award: that.formInline.kjstatus,
      term_to_time_from: start1,
      term_to_time_to: end1,
      open_award_time_from: start2,
      open_award_time_to: end2,
      game_id: that.formInline.id
    }
  }).then(res => {
    if (res.data && res.data.list && res.data.list.length > 0) {
      that.tableData = res.data.list
    } else {
      that.tableData = []
    }
    
    // that.total = res.data.rownum * 1
    // that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}



function getgamelist (that) {
  request({
    url: that.public.url + '/backend/gameopenaward/getlotteryname',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.gamelist = res.data
  }).catch(error => {
  })
}


function getgamename (that) {
  request({
    url: that.public.url + '/gameopenaward/getlottery',
    method: 'post',
    data: {}
  }).then(res => {
    that.gamename = res.data
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
</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .line {
    border-bottom: 1px solid #666;
    margin-bottom: 20px;
    font-size: 21px;
    font-weight: 700;
    margin-right: -126px;
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
  .should {
    background: #f69!important;
    color: black!important;
  }
  .ready {
    background: #ccc!important;
    color: green!important;
  }
</style>
