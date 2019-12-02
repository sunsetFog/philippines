<template>
  <div class="app-container bankallocation">
      <div class="left" v-if="domaingetorglist">
          <div class="boxred"></div>
          <div class="line">渠道选择</div>
          <el-radio-group v-model="radio">
              <el-radio v-for="(item,key) in userlist" :key="key" :label="item.id">{{item.nickname}}</el-radio>
          </el-radio-group>
      </div>
      <div class="right">
          <div v-if="bankcard && paybankcardshowcardlist">
              <div class="boxred"></div>
            <div class="line">渠道已分配银行卡</div>
            <div style="margin-top:10px;">
                <el-button type="primary" @click="shou">查看收款卡</el-button>
                <el-button style="margin-left:10px" type="primary" @click="fu">查看付款卡</el-button>
            </div>
            <div class="boxborder">
              <el-popover
              placement="bottom-start"
                v-for="tag in tags"
                :key='tag.id' >
                  <el-table
                :data="tableData2"
                border
                >
                <el-table-column
                label="ID">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
                </el-table-column>
                <el-table-column
                prop="cardno"
                label="银行卡号">
                </el-table-column>
                <el-table-column
                prop="channel_name"
                label="对应支付平台">
                </el-table-column>
                <el-table-column
                prop="init_balance"
                label="期初余额">
                </el-table-column>
                <el-table-column
                prop="interval"
                label="转账区间">
                </el-table-column>
                <el-table-column
                prop="day_trans_max_limit"
                label="单日上限">
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                </el-table-column>
            </el-table>
                <el-tag 
                slot="reference"
                closable
                @click.native="open(tag)"
                :type='tag.type'
                @close='delet(tag)'
                >{{tag.financial_ident}}</el-tag>
              </el-popover>

             
            

              
                 
            </div>
           
            
          </div>
          <div v-if="bank && paybankcardbanklist">
              <div class="boxred"></div>
            <div class="line">银行选择</div>
             <div class="boxborder">
                 <el-button type="primary" style="margin: 10px;" v-for="(item,key) in banklist" :key="key" @click="banklistbt(item.id)">{{item.name}}</el-button>
            </div>
          </div>
          <div v-if="banktable && paybankcardselectpaycard">
              <div class="boxred"></div>
            <div class="line">银行卡选择</div>
             <el-table
                :data="tableData"
                border
                 @selection-change="handleSelectionChange"
                style="width: 100%;margin-top:5px;">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="内部识别码">
                <template slot-scope="scope">
                    {{scope.row.financial_ident}}
                </template>
                </el-table-column>
                <el-table-column
                prop="cardno"
                label="银行卡号">
                </el-table-column>
                <el-table-column
                label="银行卡类型">
                <template slot-scope="scope">
                    {{scope.row.type | type}}
                </template>
                </el-table-column>
                <el-table-column
                prop="channelname"
                label="对应支付平台">
                </el-table-column>
                <el-table-column
                prop="init_balance"
                label="期初余额">
                </el-table-column>
                <el-table-column
                prop="interval"
                label="转账区间">
                </el-table-column>
                <el-table-column
                prop="day_trans_max_limit"
                label="单日上限">
                </el-table-column>
                <el-table-column
                prop="total_in_money"
                label="截止至昨日总转入">
                </el-table-column>

                <el-table-column
                prop="total_out_money"
                label="截止至昨日总转出">
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                </el-table-column>
            </el-table>

            <el-row class="buttoncenter" style="text-align: center;margin-top: 20px;">
                <el-button type="primary" style="margin-right:30px;"  @click="check()" v-if="paybankcardallotpaycard">确认分配</el-button>
                <el-button type="primary" @click="checkdel()">取消分配</el-button>
            </el-row>

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
          </div>
      </div>
      

   




  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { validatAlphabets } from '@/utils/validate'
export default {
  data() {
    return {
      radio: '',
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      tags: [
      ],
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      userlist: [],
      bankcard: false,
      bank: false,
      banktable: false,
      tableshow: false,
      banklist: [
      ],
      multipleSelection: [],
      id: '',
      tableData2: [],
      num: ''
    }
  },
  created() { 
    let that = this
    getuserlist(this)
  },
  watch:{
      'radio': function (val) {
          let that = this
            request({
                    url: that.public.url + '/paybankcard/showcardlist',
                    method: 'post',
                    data: {
                        type: '1',
                        agent_org_id: val
                    }
                }).then(res => {
                    getbanklist(that)
                    getbankcard(that,1)
                    that.bankcard = true
                    that.bank = true
                }).catch(error => {
                })
      }
  },
  computed: {
    ...mapGetters([
      'domaingetorglist',
      'paybankcardshowcardlist',
      'paybankcardbanklist',
      'paybankcardselectpaycard',
      'paybankcardallotpaycard'
    ])
  },
  methods: {
    banklistbt (id) {
      this.banktable = true
      let that = this
      this.id = id
      getlist(that)
    },
    shou () {
      this.num =1
      getbankcard(this,1)
    },
    fu () {
      this.num =2
      getbankcard(this,2)
    },
    open (tag) {
      let that = this
      request({
          url: that.public.url + '/backend/paybankcard/getpaycardinfo',
          method: 'post',
          data: {
            card_id: tag.card_id
          }
        }).then(res => {
          that.tableData2 = res.data
        }).catch(error => {
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    checkdel () {
      this.banktable = false
      this.tableData = []
    },
    check () {
        if (this.multipleSelection.length > 0) {
        let that = this
        let id = this.multipleSelection.map(val => {
            return val.id
          })
          let ids = id.join(',')
          this.$confirm('此操作将分配这些银行卡, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request({
                url: that.public.url + '/backend/paybankcard/allotpaycard',
                method: 'post',
                data: {
                  card_ids: ids,
                  agent_org_id: that.radio
                }
              }).then(res => {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                getlist(that)
                getbankcard(that,1)
                getbankcard(that,2)
              }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分配'
          });
        });
        } else {
          this.$message({
            type: 'info',
            message: '请选择银行卡'
          });
        }
      },
    delet (tag) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/paybankcard/delpaycard',
            method: 'post',
            data: {
                id: tag.id
            }
          }).then(res => {
            that.$message.success(res.message)
           getbankcard(that,that.num)
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
      getlist(this)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
    }
  },
  filters: {
    type (val) {
      if (val == '1') {
        return '收款卡'
      }
      if (val == '2') {
        return '付款卡'
      }
    }
  }
}

function getlist (that) {
  request({
      url: that.public.url + '/backend/paybankcard/selectpaycard',
      method: 'post',
      data: {
        bank_id: that.id,
        pageno: that.currentPage,
        pagerows: that.pagesize
      }
    }).then(res => {
      that.tableData = res.data.list
      that.total = res.data.rownum *1
      that.currentPage = res.data.pageno * 1
    }).catch(error => {
  })
}


function getuserlist (that) {
  request({
    url: that.public.url + '/backend/domain/getorglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
  }).catch(error => {
  })
}


function getbanklist (that) {
   request({
    url: that.public.url + '/backend/paybankcard/banklist',
    method: 'post'
  }).then(res => {
    that.banklist = res.data
  }).catch(error => {
  })
}


function getbankcard (that,type) {
   request({
    url: that.public.url + '/backend/paybankcard/showcardlist',
    method: 'post',
    data: {
      type: type,
      agent_org_id: that.radio
    }
  }).then(res => {
    that.tags = res.data
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
  .bankallocation .left .line {
      border-bottom: 1px solid black;
      line-height: 40px;
  }
  .bankallocation .left{
      width: 10%;
      float: left;
  }
  .boxred {
    height: 20px;
    width: 20px;
    background: red;
    float: left;
    margin-top: 10px;
    margin-right: 10px;
  }
  .bankallocation .el-radio {
      display: block;
      margin: 20px 0;
  }
  .bankallocation .el-radio+.el-radio {
      margin-left: 0;
  }
  .bankallocation .right {
    width: 75%;
    float: left;
    margin-left: 30px;
  }
  .bankallocation .right .line {
      border-bottom: 1px solid black;
      line-height: 40px;
  }
  .bankallocation .boxborder {
    border: 1px solid black;
    height: 200px;
    margin-top: 10px;
    overflow-y: scroll;
  }
  .bankallocation .el-tag {
    margin-left: 20px;
    margin-top: 5px;
  }
</style>
