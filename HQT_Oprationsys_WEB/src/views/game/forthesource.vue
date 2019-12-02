<template>
  <div class="app-container mail tableshowstyle">
    <span>备注："测试接口"的格式为后缀，只能查当天期号。比如：重庆时时彩的期号为： 20190420-021，那么只需在“测试接口”中填写： “21”点击“测试”即可查询。</span>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="彩种">
    </el-table-column>
    <el-table-column
    width='160'
      prop="update_time"
      label="修改时间">
    </el-table-column>
    <el-table-column
     width='110'
      label="销售开始时间">
      <template slot-scope="scope">
        <div class="small">
           <el-table
           :header-cell-style="{
             'display':'none'
           }"
        :data="scope.row.lot_sd"
        style="width: 100%">
         <el-table-column
      prop="sale_from_time"
      >
    </el-table-column>
      </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column
    width='110'
      label="销售结束时间">
      <template slot-scope="scope">
        <div class="small">
          <el-table
            :header-cell-style="{
              'display':'none'
            }"
          :data="scope.row.lot_sd"
          style="width: 100%">
          <el-table-column
        prop="sale_to_time"
        >
      </el-table-column>


        </el-table>
          
        </div>
           

      </template>
    </el-table-column>
    <el-table-column
    width='110'
      label="销售周期（秒）">
      <template slot-scope="scope">
        <div class="small">
           <el-table
           :header-cell-style="{
             'display':'none'
           }"
        :data="scope.row.lot_sd"
        style="width: 100%">
         <el-table-column
      prop="sale_period"
      >
    </el-table-column>

      </el-table>
</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="bet_count_down"
      label="投注倒计时（秒）">
    </el-table-column>
    <el-table-column
    width='250'
      prop="game_id"
      label="支持游戏">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
    </el-table-column>
    <el-table-column
      fixed="right"
       width='100'
      label="销售时间操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="lotteryawardupdatecycle">修改</el-button>
        <el-button type="text" size="small" style="color:red" v-if="scope.row.status === '1' && lotteryawardupdatestatus" @click="down(scope.row)">禁用</el-button>
        <el-button type="text" size="small" style="color:green" v-if="scope.row.status === '0' && lotteryawardupdatestatus" @click="up(scope.row)" >启用</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="platform_id"
      label="平台ID">
    </el-table-column>
    <el-table-column
      prop="lottery_id"
      label="彩种ID">
    </el-table-column>
     <el-table-column
     width='250'
      label="网址">
      <template slot-scope="scope">
        {{scope.row.api_url}}
      </template>
    </el-table-column>
    <el-table-column
    width='300'
      fixed="right"
      label="测试接口">
      <template slot-scope="scope">
        <el-input v-model="scope.row.cs" style="width: 70%;" clearable placeholder="请输入期号" type='number'></el-input>
        <el-button @click="cs(scope.row)" size="small" type='primary' v-if="lotteryawardgetresult">测试</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit2(scope.row)" type="text" size="small" v-if="lotteryawardupdate">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


<el-dialog title='奖源修改'  :visible.sync="dialogFormVisible" :before-close="back">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="彩种中文" :label-width="formLabelWidth">
        <span>{{form.name}}</span>
      </el-form-item>
       <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="form.status">
            <el-option
              v-for="item in statuslist"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop="bet_count_down">
        <el-input v-model="form.bet_count_down" style="width:160px;" type='number'></el-input><span>秒</span>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sortid">
        <el-input v-model="form.sortid" type='number' clearable></el-input>
      </el-form-item>
       <el-form-item label="支持游戏" :label-width="formLabelWidth" prop='game_id'>
        <el-checkbox-group v-model="form.game_id">
          <el-checkbox v-for="(item,index) in gamelist" :label='item.id' :key='index'>{{item.name}}</el-checkbox>
        </el-checkbox-group>                                                                                                                                                                
      </el-form-item>
        <el-button style="float: left;margin-left: 10px;" type='primary' @click="handleadd" :disabled='list.length > 4'>增加时间段</el-button>

      <div style="margin-left:160px;border-bottom: 1px solid;" v-for="(item,index) in list" :key='index'>
        <el-form :label-position='labelposition'>
          <p class='green'>第{{index + 1}}段销售时间设置</p>
            <el-form-item label="销售开始时间" :label-width="formLabelWidth">
              <el-time-picker v-model="item.sale_from_time" value-format='HH:mm:ss' prop="start_time" :clearable='clearable'></el-time-picker>                                                                                                                                                                                            
            </el-form-item>
            <el-form-item label="销售结束时间" :label-width="formLabelWidth">
              <el-time-picker v-model="item.sale_to_time" value-format='HH:mm:ss' :picker-options="{selectableRange: selectableRange}" @focus="setselect(item,index)" :clearable='clearable'> </el-time-picker> 
              <el-button type='primary' style="margin-left:30px;" :disabled='list.length < 2' @click="handleremove(index)">删除本段销售设置</el-button>                                                                                                                                                 
            </el-form-item>
            <el-form-item label="销售周期" :label-width="formLabelWidth"  prop="around_time">
              <el-input v-model="item.sale_period" style="width:160px;" type='number'></el-input><span>秒</span>                                                                                                                                           
            </el-form-item>
            
        </el-form>
      </div>
      

                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure(form)">确认提交</el-button>
      <el-button type="primary" @click="reset(form)">重置</el-button>
      <el-button type="primary" @click="back(form)">返回列表</el-button>
    </div>

  </el-dialog>


  
<el-dialog title='奖源编辑'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">
        <el-form-item label="彩种名称" :label-width="formLabelWidth">
        <span>{{form2.name}}</span>
      </el-form-item>
      <el-form-item label="平台ID" :label-width="formLabelWidth" prop='platform_id'>
        <el-input v-model="form2.platform_id" placeholder='请按技术要求填写'></el-input>
      </el-form-item>
      <el-form-item label="彩种ID" :label-width="formLabelWidth" prop='lottery_id'>
        <el-input v-model="form2.lottery_id" placeholder='请按技术要求填写'></el-input>
      </el-form-item>
      <el-form-item label="号源网址" :label-width="formLabelWidth" prop='api_url'>
        <el-input v-model="form2.api_url" placeholder='必须是具体页面'></el-input>
      </el-form-item>
       <el-form-item label="密钥" :label-width="formLabelWidth">
        <el-input v-model="form2.key" placeholder='不填写，默认不修改'></el-input>
      </el-form-item>
      

                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form2)">取 消</el-button>
      <el-button type="primary" @click="sure2(form2)">确 定</el-button>
    </div>

  </el-dialog>



  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    var sortrule = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请填排序'));
      }else {
        if(value*1<1||value*1>99||value.indexOf('.')>0) {
          callback(new Error('请输入1到99的整数'));
        } else {
            callback();
        }
      }
   }; 
    return {
      tableData: [],
      gamename: [],
      // game_id:true,
      list: [
        {
          sale_from_time: '',
          sale_to_time: '',
          sale_period: ''
        }
      ],
      status: [
        {name:'已撤单',id: '1' },
        {name:'未撤单',id: '2' },
        {name:'已结算',id: '3' },
        {name:'未结算',id: '4' },
        {name:'已开奖',id: '5' },
        {name:'未开奖',id: '6' }
      ],
      total: 0,
      labelposition: 'left',
      id: '',
      form: {
        name: '',
        status: '',
        game_id: [],
        bet_count_down: '',
        sortid: ''
      },
      form2: {
        name: '',
        platform_id: '',
        lottery_id: '',
        api_url: '',
        key: ''
      },
      rules: {
        status: [{required: true, message: '请选状态', trigger: 'change'}],
        bet_count_down:[{required: true, message: '请选时间', trigger: 'blur'}],
        game_id:[{required: false, message: '', trigger: 'change'}],
        sortid: [{required: true, validator: sortrule, trigger: 'blur'}]
      },
      rules2: {
        platform_id: [{required: true, message: '请填写平台ID', trigger: 'blur'}],
        lottery_id:[{required: true, message: '请填写彩种ID', trigger: 'blur'}],
        api_url:[{required: true, message: '请填写号源网址', trigger: 'blur'}]
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '150px',
      statuslist: [
        {type: '1',name: '启用'},
        {type: '2',name: '禁用'},
      ],
      gamelist: [],
      selectableRange: '',
      clearable: false
    }
  },
  created() {
    getlist(this)
    getinfocycle(this)
  },
  computed: {
    ...mapGetters([
      'lotteryawardupdatecycle',
      'lotteryawardupdatestatus',
      'lotteryawardgetresult',
      'lotteryawardupdate'
    ])
  },
  watch: {
  },
  filters: {
    status (val) {
      if (val === '1') {
        return '启用'
      }
      if (val === '0') {
        return '禁用'
      }
    }
  },
  methods: {
    handleadd () {
      this.list.push({
        sale_from_time: '',
        sale_to_time: '',
        sale_period: ''
      })
    },
    setselect (item, index) {
      if(this.list[index].sale_from_time === '') {
        this.$message({
          type: 'warning',
          message: '请先选择开始时间'
        })
        this.selectableRange = '23:59:59' +'-'+ '23:59:59'
      } else {
        this.selectableRange = item.sale_from_time +'-'+ '23:59:59'
      }
    },
    handleremove (index) {
      this.list.splice(index, 1)
    },
    edit (row) {
      this.dialogFormVisible = true
      this.id = row.id
      getinfo(this, row.id)
    },
    edit2 (row) {
      this.dialogFormVisible2 = true
      this.id = row.id
      let that = this
      request({
        url: that.public.url + '/backend/lotteryaward/getinfo',
        method: 'post',
        data: {
            id: row.id
        }
      }).then(res => {
        that.form2 = res.data
      }).catch(error => {
      })
    },
    sure2 () {
      let that = this
      request({
        url: that.public.url + '/backend/lotteryaward/update',
        method: 'post',
        data: {
            id: this.id,
            platform_id: this.form2.platform_id,
            lottery_id: this.form2.lottery_id,
            api_url: this.form2.api_url,
            private_key: this.form2.key,
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        })
        that.$refs.form2.resetFields()
        that.dialogFormVisible2 = false
        getlist(that)
      }).catch(error => {
      })
    },
    cs (row) {
      let that = this
      if(row.cs){
        if (row.cs*1 < 0) {
          this.$message({
            type: 'error',
            message: '不能为负数'
          });
          return false
        }
        request({
          url: that.public.url + '/backend/lotteryaward/getresult',
          method: 'post',
          data: {
              id: row.id,
              termno: row.cs
          }
        }).then(res => {
          let message = '开奖结果为'+ res.data
          this.$message({
            type: 'success',
            message: message
          });
        }).catch(error => {
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请输入期号'
        });
      }
    },
    reset () {
      getinfo(this, this.id)
    },
    back (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.list = [
        {
          sale_from_time: '',
          sale_to_time: '',
          sale_period: ''
        }
      ]
    },
    reset2 (form) {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    up (row) {
      let that = this
      this.$confirm('此操作将启用该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/lotteryaward/updateStatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1
            }
          }).then(res => {
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    down (row) {
      let that = this
      this.$confirm('此操作将禁用该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/lotteryaward/updateStatus',
            method: 'post',
            data: {
                id: row.id,
                status:0
            }
          }).then(res => {
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    sure (form) {
      let that = this
       that.$refs.form.validate((valid) => {
        if (valid) {
          var flag1 = true
          var flag2 = true
          var flag3 = true
          this.list.map(val=>{
            if (val.sale_from_time) {
            } else {
              that.$message({
                type: 'error',
                message: '请选择销售开始时间'
              })
              flag1 = false
            }
            if (val.sale_to_time) {
            } else {
              that.$message({
                type: 'error',
                message: '请选择销售结束时间'
              })
              flag2 = false
            }
            if (val.sale_period && val.sale_period > 0 && val.sale_period >= 30) {
            } else {
              that.$message({
                type: 'error',
                message: '请输入销售周期且销售周期为大于30的正数'
              })
              flag3 = false
            }
          })
          if (!flag1 || !flag2 || !flag3) {
            return false
          } else {
          that.$confirm('请确认是否提交?', '二次确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(res => {
            let game_id = this.form.game_id.join(',')
            request({
              url:that.public.url + '/lotteryaward/updatecycle',
              method:'post',
              data:{
                id:this.id,
                status: this.form.status,
                bet_count_down:this.form.bet_count_down,
                game_id: game_id,
                lot_sd:this.list,
                sort: this.form.sortid
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
    url: that.public.url + '/lotteryaward/getList',
    method: 'post',
    data: {}
  }).then(res => {
    that.tableData = res.data
  }).catch(error => {
  })
}

function getinfo (that, id) {
  request({
    url: that.public.url + '/lotteryaward/getinfocycle',
    method: 'post',
    data: {
      id: id
    }
  }).then(res => {
    that.form = res.data
    let list = res.data.lot_sd
    that.list = list.map (val=>{
     let start =  val.sale_from_time
     let end = val.sale_to_time
     let all = {
       'sale_from_time':start,
       'sale_to_time':end,
       'sale_period':val.sale_period
     }
     return all
    })
    if (res.data.game_id) {
      let gameid = res.data.game_id
      that.form.game_id = gameid.split(',')
    } else {
      that.form.game_id = []
    }
    
  }).catch(error => {
  })
}

function getinfocycle(that, id){
  request({
    url:that.public.url+'/gamename/getlotterygamelist',
    method:'post',
    data:{
    }
  }).then(res=>{
    that.gamelist=res.data
    
  }).catch(error=>{

  })
}
// 时间转时间戳在转时间

 function gettime (time) {
   var s=''
   var hour = time.split(':')[0]
   var min = time.split(':')[1]
   var sec = time.split(':')[2]
   s = Number(hour*3600) + Number(min*60) + Number(sec)
   return s
 }


 
function parseTime2(time) {
  var date = new Date(time);
  // let y = date.getFullYear() + '-'
  // let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  // let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
  let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
  let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
  let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
  return h+i+s
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
  .tableshowstyle td{
    background: white!important;
    
  }
  .tableshowstyle .small td {
    border-right: none;
  }
  .tableshowstyle .el-table::before{
    width: 0;
  }
  .tableshowstyle .small tr:last-child td{
    border-bottom: none;
  }
</style>
