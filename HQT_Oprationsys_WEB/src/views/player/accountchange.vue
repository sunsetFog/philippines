<template>
  <div class="batchimport accountchange">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <div class="batchdown">
        <el-tab-pane label="批量导入" name="first" style="height:auto;padding-bottom: 53px;" v-if="paychgmoneybatchcharge">
           <span style="float: left;margin-top: 10px;">上传渠道： </span>
          <el-select v-model="formInline.org" clearable style="float: left;margin-right: 10px;" value-key="id">
                <el-option
                  v-for="item in statuslist"
                  :key="item.id"
                  :label="item.name"
                  :value="{name:item.name,id:item.id}">
                </el-option>
          </el-select>
          <span style="float: left;margin-top: 10px;">账变类型: </span>
          <el-select filterable v-model="changetype" class="channel" placeholder="请选择账变类型" style="float:left;margin-right:10px;">
            <el-option
              :key="item.changetype"
              :label="item.label"
              :value="item.changetype"
              v-for="item in options1">
            </el-option>
          </el-select>
          <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :headers='token'
              :data='datatype'
              :on-exceed="exceed"
              :on-success='success'
              :on-error='error'
              :before-upload='before'
              :auto-upload='false'
              multiple
              :limit="1"
              :file-list="fileList">
            <span>上传文件: </span>
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件,且文件大小不超过5m</div>
          </el-upload>
          <el-button size="small" type="primary" @click="submitupload">点击确认上传</el-button>
          <div class="downtemp">
            <span @click="excel" style="cursor: pointer;">下载模板</span>
          </div>
          <el-table
        :data="tableData1"
        v-if="showtable"
        :row-class-name="tableclassname"
        :cell-class-name='cell'
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;margin-top:20px;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_no">
        </el-table-column>
        <el-table-column
          label="玩家渠道"
          prop="agent_org_name">
        </el-table-column>
        <el-table-column
          label="玩家账号"
          prop="user_account">
        </el-table-column>
        <el-table-column
              label="类型">
              <template slot-scope="scope">
                {{scope.row.type | type}}
              </template>
            </el-table-column>
        <el-table-column
          label="充值/扣减 （金额）"
          prop="money">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="上传人"
          prop="apply_account">
        </el-table-column>
        <el-table-column
          label="上传时间"
          prop="create_time">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

  <el-row class="buttoncenter" v-if="showtable">
      <el-button type="primary" style="margin-right:30px;" @click="allpass()">提交审核</el-button>
      <el-button type="primary" @click="checkdel()">选择删除</el-button>
  </el-row>

      
<div class="pagingbox" v-if="showtable">
    <div class="paging" style="margin-top: 20px;">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pagesize"
        :page-sizes="[20,50,200]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>

    
  
        </el-tab-pane>
      </div>
      <el-tab-pane label="导入历史" name="second" v-if="paychgmoneygetchargeup">
        <div class="batchdown">
          <div class="timesearch">
            <span>上传时间:</span>
            <el-date-picker
                v-model="time"
                type="datetimerange"
                :editable="false"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期">
              </el-date-picker>
            <el-button class="serchbtn" type="primary" @click="query">搜索</el-button>
          </div>
          <div class="include">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
              width='80'
                type='index'
                label="序号"
                >
              </el-table-column>
              <el-table-column
              label="类型">
              <template slot-scope="scope">
                {{scope.row.mchg_type | type}}
              </template>
            </el-table-column>
              <el-table-column
                label="上传人"
                prop="uploader_account">
              </el-table-column>
              <el-table-column
                label="上传时间"
                prop="upload_time">
              </el-table-column>
              <el-table-column
              label="状态">
              <template slot-scope="scope">
                {{scope.row.status | status}}
              </template>
            </el-table-column>
             <el-table-column
                label="上传渠道"
                prop="agent_org_name">
              </el-table-column>
              <el-table-column
                label="操作"
                prop="operation">
                <template slot-scope="scope">
                  <el-button @click="excelup(scope.row)" type="text" size="small">导出</el-button>
                  <el-button type="text" size="small" @click="del(scope.row)" v-if="scope.row.status === '0' ">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagingbox">
            <div class="paging">
              <el-pagination
                :current-page.sync="currentPage1"
                :page-size="pagesize1"
                :page-sizes="[20,50,200]"
                :total="total1"
                @current-change="handleCurrentChange1"
                @size-change="handleSizeChange1"
                background
                layout="sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
      
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
         formInline: {
            org:{
              
            },
        },
        statuslist:[],
        showtable:false,
        dialogFormVisible1: false,
        accountnumber: '',
        type: '',
        uploadperson: '',
        uploadtime: '',
        status: '',
        operation: '',
        total: 0,
        total1: 0,
        pagesize: 20,
        pagesize1: 20,
        id: '',
        time: [],
        currentPage: 1,
        currentPage1: 1,
        tableData: [],
        tableData1: [],
        showfile: false,
        activeName2: 'first',
        fileList: [],
        changetype: '12',
        multipleSelection: [],
        options1: [
          {
            changetype: '12',
            label: '【+】活动奖金',
          },
          {
            changetype: '16',
            label: '【+】手续费'
          },
          {
            changetype: '13',
            label: '【+】理赔'
          },
          {
            changetype: '14',
            label: '【+】其它'
          },
          {
            changetype: '50',
            label: '【-】人工扣减'
          }
        ],
      }
    },
    created () {
      let week = new Date(new Date().toLocaleDateString()).getTime() - 60*60*24*1000*7
      let time = new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000 -1
      this.time = [new Date(week), new Date(time)]
      getaccount(this)
    },
    computed: {
      token () {
        return {
          'X-Token': getToken()
        }
      },
      action () {
        return this.public.url + '/paychgmoney/batchcharge'
      },
      datatype () {
        return {
          paytype: this.changetype,
          agent_org_name:this.formInline.org.name,
          agent_org_id:this.formInline.org.id
        }
      },
      ...mapGetters([
        'paychgmoneygetchargeup',
        'paychgmoneybatchcharge'
      ])
    },
    filters: {
      type(val) {
        if (val === '16') {
          return '手续费'
        }
        if (val === '13') {
          return '理赔'
        }
        if (val === '12') {
          return '活动奖金'
        }
        if (val === '14') {
          return '其它'
        }
        if (val === '50') {
          return '人工提现'
        }
      },
      status(val) {
        if (val === '0') {
          return '待确认'
        }
        if (val === '1') {
          return '已提交'
        }
      }
    },
    methods: {
      exceed(file) {
      if (file.length > 1) {
        this.$message({
          message: '一次只能上传一个文件',
          type: 'warning'
        });
      }
    },
    cell ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 5 && row.money*1 < 0) {
          return 'red'
        }
      },
    submitupload () {
      this.$refs.upload.submit()
    },
    before(file) {		
        if (this.changetype === '') {
          this.$message({
						message: '请选择账变类型',
						type: 'warning'
          });
          return false
        }
        this.currentPage = 1
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
      this.fileList = []
      this.showtable = true
      this.tableData1 = res.data.list
      this.total = res.data.rownum * 1
      this.currentPage = res.data.pageno * 1
    },
    error(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      });
      this.fileList = []
    },
    excel () {
      window.open('../../../static/批量充值.xls')
    },
    excelup (row) {
      let that = this
      request({
        url: that.public.url + '/backend/paychgmoney/dwnchgupfile',
        method: 'post',
        data: {
          mid: row.id
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        });
        window.location.href = that.public.url + res.data.downurl
      }).catch(error => {
      })
    },
    tableclassname ({row, rowIndex}) {
      if(row.is_errdata === '1') {
        return 'red';
      }
      return ''
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick (tab,event) {
      if (this.activeName2 === 'second') {
        getchargelogs(this)
      }
    },
    allpass () {
      let that = this
      request({
        url: that.public.url + '/backend/paychgmoney/submitcharge',
        method: 'post',
        data: {
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        });
        getlist(that)
      }).catch(error => {
      })
    },
      checkdel () {
        if (this.multipleSelection.length > 0) {
        let that = this
        let id = this.multipleSelection.map(val => {
            return val.id
          })
          let tbtype = this.multipleSelection.map(val => {
            return val.tbtype
          })
          let ids = id.join(',')
          let tbtypes = tbtype.join(',')
          this.$confirm('此操作将删除这些申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request({
                url: that.public.url + '/backend/paychgmoney/delcharge',
                method: 'post',
                data: {
                  ids: ids,
                  tbtype: tbtypes
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
        } else {
          this.$message({
            type: 'info',
            message: '请选择文件'
          });
        }
      },
      handleCurrentChange(val) {
        let that = this
        this.currentPage = val *1
        getlist(this)
      },
      handleSizeChange(val) {
        let that = this
        this.pagesize = val
        this.currentPage = 1
        getlist(this)
      },
       handleCurrentChange1(val) {
        let that = this
        this.currentPage1 = val *1
        getchargelogs(this)
      },
      handleSizeChange1(val) {
        let that = this
        this.pagesize1 = val
        this.currentPage1 = 1
        getchargelogs(this)
      },
      query () {
        getchargelogs(this)
      },
      del (row) {
        let that = this
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/backend/paychgmoney/delchargeup',
              method: 'post',
              data: {
                mid: row.id
              }
            }).then(res => {
              this.$message({
                type: 'success',
                message: res.message
              });
              getchargelogs(that)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delet(row) {
        let that = this
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/backend/paychgmoney/delcharge',
              method: 'post',
              data: {
                ids: row.id,
                tbtype: row.tbtype
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
      }
    }
  }

  function getlist (that) {
    request({
      url: that.public.url + '/backend/paychgmoney/getchargelist',
      method: 'post',
      data: {
        pageno: that.currentPage,
        pagerows: that.pagesize,
      }
    }).then(res => {
      that.tableData1 = res.data.list
      that.total = res.data.rownum *1
      that.currentPage = res.data.pageno * 1
    }).catch(error => {
    })
  }

function getaccount (that) {
  request({
    url: that.public.url + '/backend/role/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.statuslist = res.data
  }).catch(error => {
  })
}
  function getchargelogs (that) {
    var start = ''
    var end = '' 
    if (that.time && that.time.length > 0) {
      start = parseTime(that.time[0].getTime() /1000)
      end = parseTime(that.time[1].getTime() /1000)
    }
    request({
      url: that.public.url + '/backend/paychgmoney/getchargeup',
      method: 'post',
      data: {
        date_from: start,
        date_to: end,
        pageno: that.currentPage1,
        pagerows: that.pagesize1,
      }
    }).then(res => {
      that.tableData = res.data.list
      that.total1 = res.data.rownum *1
      that.currentPage1 = res.data.pageno * 1
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
  .batchimport{
    width:1480px;
    margin:0 auto;
    margin-top:40px;
    font-size:14px;
  }
  .downtemp{
    color:rgb(22,155,213);
    text-decoration: underline;
    font-size:14px;
    padding-left:120px;
  }
  .batchdown{
    margin: 20px 80px;
  }
  .timesearch{
    padding-bottom:20px;
  }
  .pagingbox{
    float:right;
  }
  .downtemp{
    float:right;
  }
  .prisubmit{
    padding: 7px 19px 7px 21px;
    margin-right:28px;
  }
  .accountchange .el-dialog__body {
    padding-right:0;
    width:1100px;
  }
  .buttoncenter {
    text-align: center;
    margin-top: 20px;
  }
  .red {
    color: red!important;
  }
</style>
