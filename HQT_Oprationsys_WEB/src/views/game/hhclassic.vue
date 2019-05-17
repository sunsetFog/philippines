<template>
  <div class="app-container">
       <el-tabs type='card'  @tab-click='tabclick' v-model="actionname">
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>红黑大战（经典场）</span>
            </el-form-item>
            <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop='number'>
              <el-input v-model="form.number" type='number' style="width:140px"></el-input><span>秒</span>
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
        <el-tab-pane label="投注项">

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
              label="个人下限">
            </el-table-column>
            <el-table-column
              prop="evot_bet_max_limit"
              label="个人上限">
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
       <el-form-item label="每人每局最小下注限额" :label-width="formLabelWidth" prop='min'>
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
        number: '',
        depict: '',
        status: ''
      },
      currentPage: 1,
      tableData: [
      ],
      total: 0,
      pagesize: 50,
      id: '',
      formLabelWidth: '180px',
      rules: {
        number: {required: true, message: '请填写投注倒计时长', trigger: 'blur'},
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      name: false,
      actionname: '',
      dialogFormVisible2: false,
      title2: '',
      betid: '',
      form2: {
        code: '',
        name: '',
        day: '',
        min: '',
        max: ''
      },
      rules2: {
        code: {required: true, message: '请填写投注项代码', trigger: 'blur'},
        name: {required: true, message: '请填写投注项名称', trigger: 'blur'},
        day: {required: true, message: '请填写每局总限红', trigger: 'blur'},
        min: {required: true, message: '请填写每人每局最小下注限额', trigger: 'blur'},
        max: {required: true, message: '请填写每局个人上限', trigger: 'blur'},
      },
      betname: '',
      betcode: '',
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetupdatetable',
      'gamesetaddtable',
      'gamesetupdatetablestatus',
      'gamesetaddbetitem',
      'gamesetupdatebetitem',
      'gamesetgetbetitemlist'
    ])
  },
  watch: {
  },
  filters: {
  },
  methods: {
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: 301,
                  bet_count_down: this.form.number,
                  depict: this.form.depict,
                  status: this.form.status,
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
    tabclick () {
      if (this.actionname === '1') {
        getlist(this)
      }
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
          }
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
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: {
      game_id: 301
    }
  }).then(res => {
    that.tableData = res.data
  }).catch(error => {
  })
}

function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: 301
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.number = res.data.bet_count_down
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}



</script>

<style>
</style>
