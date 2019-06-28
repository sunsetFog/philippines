<template>
  <div class="app-container">
       <el-tabs type='card' v-model="actionname" @tab-click='tabclick'>
        <el-tab-pane label="基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>斗地主</span>
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
         <el-tab-pane label="捕获参数" v-if="gamesetroyatlyinfo">
           <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:10%;">
            <div class="cell"></div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">抽水率</div>
          </th>
          <th colspan='1' rowspan="1" style="width:30%;">
            <div class="cell">操作</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:10%;background: #bdd7ee;color: black;font-weight: 600;">
              <div class="cell">斗地主</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input v-if="name" v-model="fishlist2" type="number"></el-input>
                <span v-else>{{fishlist | rate}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1" style="width:30%;">
              <div class="cell">
                <el-button type="primary" v-if="name && gamesetupdateddzroyalty" @click="sure2">保存</el-button>
                <el-button type="primary" v-if="name" @click="reset">取消</el-button>
                <el-button type="primary" v-else @click="name = true">修改</el-button>
              </div>
            </td>
        </tr>

        
        
  
        
        
        
      </tbody>
    </table>
    
  </div>
</div>
            

        </el-tab-pane>
      </el-tabs>


  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        depict: '',
        status: ''
      },
      rules: {
        status: {required: true, message: '请选择状态', trigger: 'change'},
      },
      actionname: '',
      name: false,
      formLabelWidth: '180px',
      fishlist: '',
      fishlist2: ''
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetupdateddzroyalty',
      'gamesetroyatlyinfo'
    ])
  },
  watch: {
  },
  filters: {
    rate: function (val) {
      return val* 1 + '%'
    }
  },
  methods: {
    tabclick () {
      if (this.actionname === '1') {
        getlist(this)
      }
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: '401',
                  depict: this.form.depict,
                  status: this.form.status
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
    sure2 () {
      let that = this
      if (this.fishlist2 * 1 > 1 || this.fishlist2 * 1 < -1 ) {
        that.$message.error('修改时，请填写-1到1之间，系统将小数转化为百分比。')
        return false
      }
      that.$confirm('', '二次确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(res => {
      request({
            url: that.public.url + '/gameset/updateddzroyalty',
            method: 'post',
            data: {
                  game_ids: '401,402,403',
                  royalty: this.fishlist2,
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            getlist(that)
            that.name = false
          }).catch(error => {
          })
        }).catch(error => {
        })
    },
    reset () {
      getlist(this)
      this.name = false
    }
  }
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


function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: '401,402,403'
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}


function getlist (that) {
  request({
      url: that.public.url + '/gameset/royatlyinfo',
      method: 'post',
      data: {
        game_id: 401
      }
    }).then(res => {
      that.fishlist = res.data
      that.fishlist2 = res.data / 100
    }).catch(error => {
    })
}



</script>

<style>
</style>
