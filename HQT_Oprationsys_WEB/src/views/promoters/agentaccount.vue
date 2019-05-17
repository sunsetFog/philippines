<template>
  <div class="app-container">
<div class="addaccount">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="玩家渠道" :label-width="formLabelWidth" prop="id">
        <el-select v-model="form.id" filterable clearable placeholder='请选择玩家渠道'>
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
      </el-form-item>
       <el-form-item label="登录账号" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name" placeholder='请输入6-12位包含大小写和数字' clearable></el-input>
      </el-form-item>
      
       <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="form.nickname" placeholder='昵称最大长度为6个汉字或12个字节长度的字母或数字(不能输入特殊字符)' clearable></el-input>
      </el-form-item>
      <el-form-item label="登录密码" :label-width="formLabelWidth" prop='pwd'>
        <el-input v-model="form.pwd" type='password' placeholder='请输入6-12位密码' clearable></el-input>
      </el-form-item>
      <el-form-item label="税收" :label-width="formLabelWidth" prop='reward'>
        <span>玩家抽水的</span><el-input v-model="form.reward" type="number" style="width: 30%;"></el-input><span>%</span>
      </el-form-item>
      <el-form-item label="日工资" :label-width="formLabelWidth">
        <!-- <el-input v-model.number="form.wages" type="number"></el-input> -->
      </el-form-item>
       
      <el-form-item label="分红" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.bonus" type="number"></el-input> -->
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <!-- <el-button @click="reset(form)">取 消</el-button> -->
      <el-button type="primary" @click="sure(form)" v-if="agentaccountadd">确认提交</el-button>
    </div>



   <el-dialog title='二次确认:新增总代'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form>
      <el-form-item label="玩家渠道" :label-width="formLabelWidth">
        <span>{{form.id}}</span>
      </el-form-item>
       <el-form-item label="登录账号" :label-width="formLabelWidth">
        <span>{{form.name}}</span>
      </el-form-item>
      <!-- <el-form-item label="登录密码" :label-width="formLabelWidth">
        <span>{{form.pwd}}</span>
      </el-form-item> -->
       <el-form-item label="昵称" :label-width="formLabelWidth">
         <span>{{form.nickname}}</span>
      </el-form-item>
       <el-form-item label="税收" :label-width="formLabelWidth">
        <span>玩家抽水的</span><span>{{form.reward}}</span><span>%</span>
      </el-form-item>
      <el-form-item label="日工资" :label-width="formLabelWidth">
        <!-- <span>{{form.wages}}</span> -->
      </el-form-item>
      <el-form-item label="分红" :label-width="formLabelWidth">
         <!-- <span>{{form.bonus}}</span> -->
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2()">取 消</el-button>
      <el-button type="primary" @click="sure2()">确 定</el-button>
    </div>

  </el-dialog>
</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
 import { validatNumberLowerCase } from '@/utils/validate'

export default {
  data() {
    var validate1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入税收'));
      } else {
        if (value *1 < 0 || value *1 > 5) {
          callback(new Error('税收分成为0-5之间的数值'))
        } else {
          callback();
        }
      }
    }
    var validate2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入分红'));
      } else {
        if (value *1 < 0) {
          callback(new Error('分红为正数'))
        } else {
          callback();
        }
      }
    }
    var validate3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入日工资'));
      } else {
        if (value *1 < 0) {
          callback(new Error('分红为日工资'))
        } else {
          callback();
        }
      }
    }

    var validate4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录账号'));
      } else {
        if (!validatNumberLowerCase(value)) {
          callback(new Error('登录账号为6-12位包含大小写和数字'))
        } else {
          callback();
        }
      }
    }

    var checknickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        if (CheckStrLength(value) > 12) {
          callback(new Error('最大长度为6个汉字或12个字节长度的字母或数字'))
        } else {
          callback();
        }
      }
    }

    return {
      formInline: {
        name: '',
        nickname: ''
      },
      currentPage: 1,
      tableData: [],
      userlist: [],
      dialogFormVisible: true,
      form: {
        id: '',
        name: '',
        pwd: '',
        nickname: '',
        wages: '',
        reward: '',
        bonus: '',
        desc: ''
      },
      rules: {
        id: [
          {required: true, message: '请输入渠道组ID', trigger: 'change'}
        ],
        name: [
          {required: true, validator: validate4, trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min:6,max:12,message: '长度在6到12个字符',trigger: 'blur'}
        ],
        nickname: [
          {required: true, validator: checknickname, trigger: 'blur'}
        ],
        wages: [
          {required: true, validator: validate3, trigger: 'blur'}
        ],
        reward: [
          {required: true, validator: validate1, trigger: 'blur'}
        ],
        bonus: [
          {required: true, validator: validate2, trigger: 'blur'}
        ]
      },
      formLabelWidth: '150px',
      title: '',
      name: '',
      total: 0,
      pagesize: 50,
      dialogFormVisible2: false
    }
  },
  created() { 
    getuserlist(this)
  },
  computed: {
    ...mapGetters([
      'agentaccountadd'
    ])
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    sure () {
      let that = this
      this.$refs.form.validate((valid) => {
      if (valid) {
        this.dialogFormVisible2 = true
      }else {
        return false
      }
      })
    },
    reset2 () {
      this.dialogFormVisible2 = false
    },
    sure2 (form) {
      let that = this
      var id = ''
      this.userlist.map(val=>{
        if (val.name === this.form.id) {
         id = val.id
        }
      })
        request({
        url: that.public.url + '/backend/agentaccount/add',
        method: 'post',
        data: {
              org_id: id,
              login_name: this.form.name,
              login_pwd: this.form.pwd,
              nickname: this.form.nickname,
              // day_wages: this.form.wages,
              reward_top: this.form.reward,
              // bonus: this.form.bonus,
              // depict: this.form.desc,
        }
      }).then(res => {
        that.$message.success(res.message)
        that.dialogFormVisible2 = false
        that.$refs.form.resetFields()
      }).catch(error => {
      })
    }
  },
  filters: {
  }
}


function getuserlist (that) {
  request({
    url: that.public.url + '/backend/org/getOrglist',
    method: 'post'
  }).then(res => {
    that.userlist = res.data
  }).catch(error => {
  })
}

//验证字节函数

function CheckStrLength(val) {
var str = val.trim();
var valLength = 0;
for (var i = 0; i < str.length; i++) {
 var word = str[i];
if (/[^\x00-\xff]/g.test(word)) {
 valLength += 2;
} else {
 valLength++;
}
}
return valLength;
}
</script>

<style>
.addaccount {
    width: 60%;
    padding: 30px;
}
</style>
