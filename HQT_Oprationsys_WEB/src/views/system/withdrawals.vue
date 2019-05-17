<template>
  <div class="app-container">
<div class="addaccount">
    <el-form :model="form" ref="form">
        <el-form-item label="单笔提款最低限额" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_one_min_limitw" clearable style='width: 50%;' type='number'></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="单笔提款最高限额" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_one_max_limit" clearable style='width: 50%;' type='number'></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="免人工提款限额" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_no_audit_limit" clearable style='width: 50%;' type='number'></el-input><span>元</span>
      </el-form-item>
       <el-form-item label="相同账号每日提款总额" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_user_day_total" clearable style='width: 50%;' type='number'></el-input><span>元</span>
      </el-form-item>
     <el-form-item label="相同账号每日提款次数" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_user_day_free_count" clearable style='width: 50%;' type='number'></el-input><span>次</span>
      </el-form-item>
    <el-form-item label="免费提款次数" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_day_free_count" clearable style='width: 50%;' type='number'></el-input><span>次</span>
      </el-form-item>
    <el-form-item label="超提款次数后手续费" :label-width="formLabelWidth">
        <el-input v-model="form.wdr_over_count_brochg" clearable style='width: 50%;' type='number'></el-input><span>%,每笔的百分比</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center;width: 68%;">
      <el-button type="primary" @click="sure(form)" v-if="sysconfigdepositconfig">确认提交</el-button>
      <el-button type="primary" @click="cz(form)"  v-if="sysconfiggetconfiginfo">重置</el-button>
    </div>


</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      userlist: [],
      dialogFormVisible: true,
      form: {
        wdr_one_min_limitw: '',
        wdr_one_max_limit: '',
        wdr_no_audit_limit: '',
        wdr_user_day_total: '',
        wdr_user_day_free_count: '',
        wdr_day_free_count: '',
        wdr_over_count_brochg: ''
      },
      rules: {
      },
      formLabelWidth: '170px'
    }
  },
  created() { 
    getuserlist(this)
  },
  computed: {
    ...mapGetters([
      'sysconfiggetconfiginfo',
      'sysconfigdepositconfig'
    ])
  },
  methods: {
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/backend/sysconfig/depositconfig',
            method: 'post',
            data: {
                  wdr_one_min_limitw: this.form.wdr_one_min_limitw,
                  wdr_one_max_limit: this.form.wdr_one_max_limit,
                  wdr_no_audit_limit: this.form.wdr_no_audit_limit,
                  wdr_user_day_total: this.form.wdr_user_day_total,
                  wdr_user_day_free_count: this.form.wdr_user_day_free_count,
                  wdr_day_free_count: this.form.wdr_day_free_count,
                  wdr_over_count_brochg: this.form.wdr_over_count_brochg
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
          }).catch(error => {
          })
        } else {
          return false
        }
      })
  },
  cz () {
    getuserlist(this)
  }
}
}

function getuserlist (that) {
  request({
    url: that.public.url + '/sysconfig/getconfiginfo',
    method: 'post',
    data: {
      type: 1
    }
  }).then(res => {
    that.form = res.data
  }).catch(error => {
  })
}

</script>

<style>
.addaccount {
    width: 60%;
    padding: 30px;
}
</style>
