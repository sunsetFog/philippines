<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button @click="add" round type="info" v-if="thpmerchantadd">新增 +</el-button>
          </el-col>

          <el-col :span="5">
            <el-form-item label="商户名称">
              <el-input clearable placeholder="商户名称" v-model="formInline.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="商户代码">
               <el-input v-model="formInline.code" placeholder="商户代码" clearable></el-input>
             </el-form-item>-->
            <!--查询商户代码改为查询状态-->
            <el-form-item :label-width="formLabelWidth" label="状态" prop="status">
              <el-select clearable filterable v-model="formInline.type">
                <el-option
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                  v-for="item in status">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类型">
              <el-select clearable filterable v-model="formInline.typeCompany">
                <el-option
                  :key="item.typeCompany"
                  :label="item.name"
                  :value="item.typeCompany"
                  v-for="item in type">
                </el-option>
              </el-select>
              <!--      <el-select v-model="formInline.type" filterable clearable>
                      <el-option
                        v-for="item in status"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type">
                      </el-option>
                    </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="thpmerchantgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pagesize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          layout="prev, next, jumper">
        </el-pagination>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="商户代码"
        prop="code">
      </el-table-column>
      <el-table-column
        label="商户名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="授权key"
        prop="secretkey">
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          {{scope.row.type | type}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width='250'
      >
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="small" type="text" v-if="thpmerchantupdate">修改</el-button>
          <el-button @click="delet(scope.row)" size="small" type="text" v-if="thpmerchantdel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pagesize"
          :page-sizes="[50,100,200]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          layout="sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>


    <el-dialog :before-close="reset" :title='title' :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select clearable filterable v-model="form.type">
            <el-option
              :key="item.type"
              :label="item.name"
              :value="item.type"
              v-for="item in list">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="商户名称" prop='name'>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="key" prop='key'>
          <el-input v-model="form.key"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="状态" prop="status">
          <el-select clearable filterable v-model="form.status">
            <el-option
              :key="item.type"
              :label="item.name"
              :value="item.type"
              v-for="item in status">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="reset(form)">取 消</el-button>
        <el-button @click="sure(form)" type="primary">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import request from '@/utils/request'
  import {validatAlphabets} from '@/utils/validate'

  export default {
    data() {
      return {
        formInline: {
          name: '',
          type: '',
          typeCompany: ''
        },
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        form: {
          type: '2',
          name: '',
          key: '',
          status: '1'
        },
        list: [
          {name: '内部运营公司', type: '1'},
          {name: '外部公司', type: '2'}
        ],
        // type
        type: [
          {name: '内部运营公司', typeCompany: '1'},
          {name: '外部公司', typeCompany: '2'}
        ],
        status: [
          {name: '禁用', type: '0'},
          {name: '正常', type: '1'}
        ],
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'status'}
          ],
          name: [
            {required: true, message: '请输入商户名称', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '请输入key', trigger: 'blur'}
          ]
        },
        formLabelWidth: '150px',
        title: '',
        name: '',
        total: 0,
        pagesize: 50
      }
    },
    created() {
      let that = this
      if (!this.thpmerchant.length && this.thpmerchant.length != 0) {
        that.formInline.type = this.thpmerchant.status
        that.currentPage = this.thpmerchant.currentPage
        that.pagesize = this.thpmerchant.pagesize
        that.formInline.name = this.thpmerchant.name
        that.formInline.typeCompany = this.thpmerchant.type
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.typeCompany)
      }

    },
    computed: {
      ...mapGetters([
        'thpmerchantgetlist',
        'thpmerchantupdate',
        'thpmerchantdel',
        'thpmerchantadd',
        'thpmerchant'
      ])
    },
    methods: {
      reset(form) {
        this.dialogFormVisible = false
        this.$refs.form.resetFields()
      },
      query() {
        let that = this
        this.currentPage = 1
        getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.typeCompany)
        let setthpmerchant = {
          status: that.formInline.type,
          currentPage: that.currentPage,
          pagesize: that.pagesize,
          name: that.formInline.name.trim(),
          type: that.formInline.typeCompany
        }
        this.$store.commit('setthpmerchant', setthpmerchant)
      },
      edit(data) {
        this.title = '编辑商户管理'
        this.dialogFormVisible = true
        let that = this
        request({
          url: that.public.url + '/thpmerchant/getinfo',
          method: 'post',
          data: {
            code: data.code
          }
        }).then(res => {
          that.form.key = res.data.secretkey
          that.form.name = res.data.name
          that.form.type = res.data.type
          that.form.status = res.data.status
          that.id = res.data.code
        }).catch(error => {
        })
      },
      add() {
        this.title = '新增商户管理'
        this.dialogFormVisible = true
      },
      sure(form) {
        let that = this
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.title === '编辑商户管理') {
              request({
                url: that.public.url + '/thpmerchant/update',
                method: 'post',
                data: {
                  type: this.form.type,
                  secretkey: this.form.key,
                  name: this.form.name,
                  status: this.form.status,
                  code: this.id
                }
              }).then(res => {
                that.dialogFormVisible = false
                that.$refs.form.resetFields()
                getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.typeCompany)
              }).catch(error => {
              })
            } else {
              request({
                url: that.public.url + '/thpmerchant/add',
                method: 'post',
                data: {
                  type: this.form.type,
                  secretkey: this.form.key,
                  name: this.form.name,
                  status: this.form.status
                }
              }).then(res => {
                that.dialogFormVisible = false
                that.$refs.form.resetFields()
                getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.typeCompany)
              }).catch(error => {
              })
            }
          } else {
            return false
          }
        })
      },
      delet(row) {
        let that = this
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
            url: that.public.url + '/thpmerchant/del',
            method: 'post',
            data: {
              code: row.code
            }
          }).then(res => {
            getlist(that, that.formInline.type, that.currentPage, that.pagesize, that.formInline.name, that.formInline.typeCompany)
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
        getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.typeCompany)
        let setthpmerchant = {
          status: this.formInline.type,
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          name: this.formInline.name.trim(),
          type: this.formInline.typeCompany
        }
        this.$store.commit('setthpmerchant', setthpmerchant)
      },
      handleCurrentChange(val) {
        let that = this
        this.currentPage = val * 1
        getlist(this, this.formInline.type, this.currentPage, this.pagesize, this.formInline.name, this.formInline.typeCompany)
        let setthpmerchant = {
          status: this.formInline.type,
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          name: this.formInline.name.trim(),
          type: this.formInline.typeCompany
        }
        this.$store.commit('setthpmerchant', setthpmerchant)
      }
    },
    filters: {
      type(val) {
        if (val === '1') {
          return '内部运营公司'
        }
        if (val === '2') {
          return '外部公司'
        }
      },
      status(val) {
        if (val === '1') {
          return '正常'
        }
        if (val === '0') {
          return '禁用'
        }
      }
    }
  }

  function getlist(that, type, currentPage, pagesize, name, code) {
    request({
      url: that.public.url + '/thpmerchant/getList',
      method: 'post',
      data: {
        status: type,
        pageno: currentPage,
        pagerows: pagesize,
        name: name.trim(),
        type: that.formInline.typeCompany
      }
    }).then(res => {
      that.tableData = res.data.list
      that.total = res.data.rownum * 1
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
    width: 160px !important;
    display: inline-block !important;
  }

  .resetname {
    line-height: 60px;
    font-size: 20px;
    margin-left: 28px;
  }

  .inputnum {
    height: 30px !important;
    width: 100px !important;
    font-size: 10px;
  }
</style>
