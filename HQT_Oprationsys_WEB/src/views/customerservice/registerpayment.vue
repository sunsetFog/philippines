<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="120px">
           <el-col :span="6">
            <el-form-item label="渠道">
              <el-select v-model="formInline.agentOrg" value-key="id" @change="selectType" :disabled="changeConfig" filterable clearable placeholder="请选择玩家渠道"> 
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.name"
                :value="{id:item.id,name:item.name}">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" >查询</el-button>
          </el-col> -->
        </el-form>
      </el-row>
    </div>
    <div class="addaccount">
        <el-form :model="form" :rules="rules" ref="form" >
           <el-form-item label="渠道:" :label-width="formLabelWidth" >
            <span>{{formInline.agentOrg.name}}</span>
        </el-form-item> 
        <el-form-item label="注册账号赠送金额:" :label-width="formLabelWidth"  prop='member'>
            <span v-if="!changeConfig">{{form.member}}</span>
            <el-input v-if="changeConfig" v-model="form.member" placeholder='请输入金额' style='width:50%' clearable></el-input>
            <span>元</span>
        </el-form-item>      
        <el-form-item label="创建游客赠送金额:" :label-width="formLabelWidth" prop="visitor" >
            <span v-if="!changeConfig">{{form.visitor}}</span>
            <el-input v-if="changeConfig" v-model="form.visitor"  placeholder='请输入金额' style='width:50%' clearable></el-input>
            <span>元</span>
        </el-form-item>
        <el-form-item label="游客晋升会员赠送金额:" :label-width="formLabelWidth" prop='visitortomember' >
            <span v-if="!changeConfig">{{form.visitortomember}}</span>
            <el-input v-if="changeConfig" v-model="form.visitortomember" placeholder='请输入金额' style='width:50%' clearable></el-input>
            <span>元</span>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth" prop='status' >
            <span v-if="!changeConfig">{{statuname}}</span>
            <el-radio-group v-if="changeConfig" v-model="form.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label='0' >禁用</el-radio>
        </el-radio-group>
        </el-form-item>
        </el-form>
       <div slot="footer" class="dialog-footer">
            <el-button v-if="!changeConfig" type="primary" @click="modifyRate(form)">修改配置</el-button>
            <el-button v-if="!changeConfig" type="primary"  @click="entermery()" >查看详情</el-button>
            <el-button v-if="changeConfig && reglargessmoneysaveupdate"  @click="sure(form)" type="primary">保存配置</el-button>     
      </div>
</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
 import { validatNumberLowerCase } from '@/utils/validate'

export default {
  data() {
 var validateMone =(rule, value, callback)=>{
     if(value*1<0 || isNaN(value)) {
          callback(new Error('请输入正确的金额'));
        } else {
          callback();
        }
   };
    return {
      changeConfig:false,
      currentPage: 1,
      tableData: [],
      userlist: [],
      dialogFormVisible: true,
      statuname:'',
      formInline:{
        agentOrg:{

        },
      },
      userlist:'',
      form: {
        member: "",
        status: "1",
        visitor: "",
        visitortomember: "",
        message: "",
        agent_org_id:'',
        name:'',
      },
      rules: {
        member: [
            {required: true, validator: validateMone, trigger: 'blur'}
        ],
        visitor: [
          {required: true, validator: validateMone, trigger: 'blur'}
        ],
        visitortomember: [
          {required: true, validator: validateMone, trigger: 'blur'}
        ],
      },
      formLabelWidth: '170px',
      title: '',
      name: '',
      total: 0,
      pagesize: 20,
      dialogFormVisible2: false
    }
  },
  created() { 
    getaccount(this,true) 
   
  },
  // mounted(){
  //  getuserlist(this)
  // },
  computed: {
    ...mapGetters([
      'agentaccountadd',
      'reglargessmoneysaveupdate',
      'registerpayment',
      'reglargessmoneyselectConfig'
    ])
  },
  watch: {
  },
  methods: {
    modifyRate(form){//修改注册送金配置按钮
        this.changeConfig = true
    },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    reset2 () {
      this.dialogFormVisible2 = false
    },
    entermery(){
         this.$router.push({path: '/analysisdatamgr/newuser'})
    },
    selectType(value){
       getuserlist (this)
    },
    sure (form) {
      let that = this    
        if(this.form.member==''){
            this.form.member= 0 
        }
        if(this.form.visitor==''){
            this.form.visitor=0
        }
         if(this.form.visitortomember==''){
            this.form.visitortomember=0
        }
      this.$refs.form.validate((valid) => {
            if (valid) {
                request({
                url: that.public.url + '/backend/reglargessmoney/saveupdate',
                method: 'post',
                data: {
                    member: this.form.member,
                    visitor: this.form.visitor,
                    visitortomember:this.form.visitortomember,
                    status: this.form.status,
                    agent_org_id:this.formInline.agentOrg.id,
                }
            }).then(res => {
                that.$message({
                type: 'success',
                message: res.message
                })
                that.$refs.form.resetFields()
                getuserlist (that)
                this.changeConfig = false
            }).catch(error => {
                 this.changeConfig = false
            })
            } else {
            return false
            }
      })

    }
  },
  filters: {
  }
}
function getaccount (that,flag) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    that.userlist = res.data
    if(that.userlist!=''){
      that.formInline.agentOrg.id = that.userlist[0].id
      that.formInline.agentOrg.name = that.userlist[0].name
      if(flag){
        getuserlist(that)
      }
    }
  }).catch(error => {
  })
}
function getuserlist (that) {
  request({
    url: that.public.url + '/backend/reglargessmoney/selectConfig',
    method: 'post',
    data:{
      agent_org_id:that.formInline.agentOrg.id,
    }
  }).then(res => {
    that.form = res.data
    if(that.form.status === '0'){
        that.statuname = '禁用'
    }else{
        that.statuname = '启用'
    }
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
