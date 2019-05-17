<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add" v-if="incomeadd">新增 + </el-button>
          </el-col>
          <el-col :span="5">
            <el-form-item label="名称">
                <el-input v-model="formInline.name" placeholder="名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="流水">
              <el-input v-model="formInline.reward" placeholder="流水" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分红">
                <el-input v-model="formInline.bonus" placeholder="分红" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日工资">
              <el-input v-model="formInline.wages" placeholder="日工资" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="incomegetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
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
    </div>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      width="50"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="name"
      width="250"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="reward"
      label="分成">
    </el-table-column>
    <el-table-column
      prop="bonus"
      label="分红">
    </el-table-column>
    <el-table-column
      prop="day_wages"
      label="日工资">
    </el-table-column>
    <el-table-column
      prop="depict"
      label="说明">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='250'
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small" v-if="incomeupdate">修改</el-button>
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="incomedel">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[50,100,200]"
      :page-size="pagesize"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分成" :label-width="formLabelWidth" prop="reward">
        <el-input v-model="form.reward"></el-input>
      </el-form-item>
       <el-form-item label="分红" :label-width="formLabelWidth" prop='bonus'>
        <el-input v-model="form.bonus"></el-input>
      </el-form-item>
      <el-form-item label="日工资" :label-width="formLabelWidth" prop='wages'>
        <el-input v-model="form.wages"></el-input>
      </el-form-item>
       <el-form-item label="说明" :label-width="formLabelWidth" prop="desc">
        <el-input v-model="form.desc"></el-input>
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
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      formInline: {
        name: '',
        reward: '',
        bonus: '',
        wages: ''
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        reward: '',
        bonus: '',
        wages: '',
        desc: ''
      },
      rules: {
        reward: [
          {required: true, message: '请输入分成', trigger: 'blur'}
        ],
        bonus: [
          {required: true, message: '请输入分红', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        wages: [
          {required: true, message: '请输入日工资', trigger: 'blur'}
        ],
        desc: [
          // {required: true, message: '请输入说明', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      title: '',
      name: '',
      total: 0,
      pagesize: 50
    }
  },
  created() { 
    let that = this
    if (!this.income.length && this.income.length != 0) {
      that.formInline.name = this.income.name
      that.currentPage = this.income.currentPage
      that.pagesize = this.income.pagesize
      that.formInline.reward = this.income.reward
      that.formInline.bonus = this.income.bonus
      that.formInline.wages = this.income.wages
      agentaccount(that, that.formInline.name, that.currentPage, that.pagesize, that.formInline.reward, that.formInline.bonus, that.formInline.wages)
    }
  },
  computed: {
    ...mapGetters([
      'incomeupdate',
      'incomeadd',
      'incomedel',
      'incomegetlist',
      'income'
    ])
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    query () {
      let that = this
      this.currentPage = 1
      agentaccount(that, that.formInline.name, that.currentPage, that.pagesize, that.formInline.reward, that.formInline.bonus, that.formInline.wages)
      let setincome = {
        'name': that.formInline.name,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'reward': that.formInline.reward,
        'bonus': that.formInline.bonus,
        'wages': that.formInline.wages
      }
      this.$store.commit('setincome', setincome)
    },
    edit(data) {
      this.title = '编辑代理收益管理'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/income/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            that.form.reward = res.data.reward
            that.form.bonus = res.data.bonus
            that.form.wages = res.data.day_wages
            that.form.desc = res.data.depict
            that.id = res.data.id
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增代理收益管理'
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑代理收益管理') {
             request({
              url: that.public.url + '/backend/income/update',
              method: 'post',
              data: {
                    name: this.form.name,
                    reward: this.form.reward,
                    bonus: this.form.bonus,
                    day_wages: this.form.wages,
                    depict: this.form.desc,
                    id: this.id
              }
            }).then(res => {
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
             agentaccount(that, that.formInline.name, that.currentPage, that.pagesize, that.formInline.reward, that.formInline.bonus, that.formInline.wages)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/income/add',
            method: 'post',
            data: {
                  name: this.form.name,
                  reward: this.form.reward,
                  bonus: this.form.bonus,
                  day_wages: this.form.wages,
                  depict: this.form.desc,
            }
          }).then(res => {
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            agentaccount(that, that.formInline.name, that.currentPage, that.pagesize, that.formInline.reward, that.formInline.bonus, that.formInline.wages)
          }).catch(error => {
          })
          }
        } else {
          return false
        }
      })
    },
    delet (row) {
      let that = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/backend/income/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
           agentaccount(that, that.formInline.name, that.currentPage, that.pagesize, that.formInline.reward, that.formInline.bonus, that.formInline.wages)
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
      agentaccount(this, this.formInline.name, this.currentPage, this.pagesize, this.formInline.reward, this.formInline.bonus, this.formInline.wages)
      let setincome = {
        'name': that.formInline.name,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'reward': that.formInline.reward,
        'bonus': that.formInline.bonus,
        'wages': that.formInline.wages
      }
      this.$store.commit('setincome', setincome)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      agentaccount(this, this.formInline.name, this.currentPage, this.pagesize, this.formInline.reward, this.formInline.bonus, this.formInline.wages)
      let setincome = {
        'name': that.formInline.name,
        'currentPage': that.currentPage,
        'pagesize': that.pagesize,
        'reward': that.formInline.reward,
        'bonus': that.formInline.bonus,
        'wages': that.formInline.wages
      }
      this.$store.commit('setincome', setincome)
    }
  }
}

function agentaccount (that, name, currentPage, pagesize, reward,bonus,wages ) {
  request({
    url: that.public.url + '/backend/income/getList',
    method: 'post',
    data: {
      name: name.trim(),
      pageno: currentPage,
      pagerows: pagesize,
      reward: reward.trim(),
      bonus: bonus.trim(),
      day_wages: wages.trim()
    }
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
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
  .inline {
    width: 160px!important;
    display: inline-block !important;
  }
  .resetname {
    line-height: 60px;
    font-size: 20px;
    margin-left: 28px;
  }
  .inputnum {
      height: 30px!important;
      width: 100px!important;
      font-size: 10px;
  }
</style>
