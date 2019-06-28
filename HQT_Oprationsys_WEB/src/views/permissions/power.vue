<template>
  <div class="app-container">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add" v-if="privilegeadd">新增 + </el-button>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="权限名称">
                <el-input v-model="formInline.user" placeholder="权限名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="控制器">
              <el-input v-model="formInline.region" placeholder="控制器"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方法">
              <el-input v-model="formInline.action" placeholder="方法"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-col> -->
        </el-form>
      </el-row>
    </div>


      <div class="treetitle">
        <div>权限名称</div>
        <div>控制器</div>
        <div>方法</div>
        <!-- <div>父权限ID</div> -->
        <div>操作</div>
      </div>
     <el-tree
      :data="options"
      node-key="id"
      :default-expanded-keys="[0]"
      :props="defaultProps"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="width:100%;">
        <span style="display:inline-block; width:20%">{{ node.label }}</span>
        <span style="display:inline-block; width:20%">{{ data.controller }}</span>
        <span style="display:inline-block; width:20%">{{ data.action }}</span>
        <!-- <span style="display:inline-block; width:20%">{{ data.pid }}</span> -->
        <span>
          <el-button
            style="font-size: 18px;"
            type="text"
            size="mini"
            v-if="privilegeupdate && data.id != 0"
            @click="() => edit(data)">
            编辑
          </el-button>
          <el-button
          style="font-size: 18px;"
            type="text"
            size="mini"
            v-if="privilegedel && data.id != 0"
            @click="() => delet(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    
    



  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="父级" :label-width="formLabelWidth" prop="selectedOptions">
        <el-cascader
          style="width:100%"
          :options="options"
          :props="defaultProps"
          filterable
          change-on-select
          v-model="form.selectedOptions"
          >
        </el-cascader>
      </el-form-item>
      <el-form-item label="权限名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       <el-form-item label="控制器名" :label-width="formLabelWidth" prop='controller'>
        <el-input v-model="form.controller"></el-input>
      </el-form-item>
      
       <el-form-item label="方法名" :label-width="formLabelWidth" prop="action">
        <el-input v-model="form.action"></el-input>
      </el-form-item>
      <el-form-item label="是否导航菜单" :label-width="formLabelWidth" prop='menu'>
        <el-select v-model="form.menu">
        <el-option
          v-for="item in menu"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
import request from '../../utils/request';
import { mapGetters } from 'vuex'
export default {
  filters: {
  },
  data() {
    return {
      formInline: {
        user: '',
        region: '',
        action: ''
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      form: {
        selectedOptions: [],
        name: '',
        controller: '',
        menu: '0',
        action: '',
        desc: ''
      },
      menu: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      formLabelWidth: '120px',
      title: '',
      total: 1000,
      pagesize: 50,
      rules: {
        selectedOptions: [
          {type: 'array', required: true, message: '请选父权限id', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入权限名称', trigger: 'blur'}
        ],
        controller: [
          {required: true, message: '请输入控制器名称', trigger: 'blur'}
        ],
        menu: [
          {required: true, message: '请选是否导航菜单', trigger: 'change'}
        ],
        action: [
          {required: true, message: '请输入方法名称', trigger: 'blur'}
        ],
        desc: []
      },
      options: [],
      defaultProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      id: ''
    }
  },
  computed: {
    ...mapGetters([
      'privilegeadd',
      'privilegedel',
      'privilegeupdate'
    ])
  },
  created() {
    gettreelist(this)
  },
  methods: {
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    edit(data) {
      this.title = '编辑权限'
      this.dialogFormVisible = true
      let that = this
      request({
            url: that.public.url + '/backend/privilege/getinfo',
            method: 'post',
            data: {
                id: data.id
            }
          }).then(res => {
            that.form.name = res.data.name
            that.form.controller = res.data.controller
            that.form.menu = res.data.is_menu
            that.form.action = res.data.action
            that.form.desc = res.data.depict
            that.id = res.data.id
            let newoption = searchInit(that.options)
            let treelist =  getKeys(newoption, res.data.id)
            that.form.selectedOptions = treelist
          }).catch(error => {
          })
    },
    add () {
      this.title = '新增权限'
      this.dialogFormVisible = true
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑权限') {
             request({
              url: that.public.url + '/backend/privilege/update',
              method: 'post',
              data: {
                    pid: this.form.selectedOptions[this.form.selectedOptions.length - 1],
                    name: this.form.name,
                    controller: this.form.controller,
                    is_menu: this.form.menu,
                    action: this.form.action,
                    sortid: 0,
                    depict: this.form.desc,
                    id: this.id
              }
            }).then(res => {
              that.$message.success(res.message)
              that.dialogFormVisible = false
              that.$refs.form.resetFields()
              gettreelist(that)
            }).catch(error => {
            })
          } else {
            request({
            url: that.public.url + '/backend/privilege/add',
            method: 'post',
            data: {
                  pid: this.form.selectedOptions[this.form.selectedOptions.length - 1],
                  name: this.form.name,
                  controller: this.form.controller,
                  is_menu: this.form.menu,
                  action: this.form.action,
                  sortid: 0,
                  depict: this.form.desc
            }
          }).then(res => {
            that.$message.success(res.message)
            that.dialogFormVisible = false
            that.$refs.form.resetFields()
            gettreelist(that)
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
            url: that.public.url + '/backend/privilege/del',
            method: 'post',
            data: {
                id: row.id
            }
          }).then(res => {
            gettreelist(that)
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

function gettreelist (that) {
  request({
    url: that.public.url + '/backend/privilege/getPriNameList',
    method: 'get'
  }).then(res => {
    let data = [{id: 0, name: "总权限", child: res.data}]
    that.options = data
  }).catch(error => {
  })
}

function searchInit(json) {
  var newJson = json.concat([]);
  var len = newJson.length;
  var parentNode = [];
  for (var i = 0; i < len; i++) {
      var item = newJson[i];
      if (item.child && item.child.length != 0) {
          var child = item.child;
          for (var j = 0; j < child.length; j++) {
              if (item.parentNode) {
                  child[j].parentNode = item.parentNode.concat([item.id]);
              }
              else {
                  child[j].parentNode = [item.id]
              }
              newJson[len + j] = child[j];
          }
          len = newJson.length;
      }
  }
  return newJson;
}



function getKeys(json, keys) {
    for (var i = 0;i< json.length;i++) {
      let item = json[i]
      if (item.id === keys) {
        return item.parentNode
      }
    }
}

</script>

<style>
  .treetitle {
    height: 60px;
    overflow: hidden;
    border-bottom: 1px solid #999;
    width: 100%;
    line-height: 60px;
    margin-bottom: 20px;
  }
  .treetitle div{
    float: left;
    width: 20%;
  }
</style>
