<template>
  <div class="dashboard-container">
    <div class="line">
      <h2>{{name}}</h2>
      <span>您好，欢迎您使用后台管理系统</span>
      <!-- <p><i class="el-icon-date"></i>         您上次使用的时间是    <span>{{this.time}}</span></p> -->
    </div>
    <div class="line">
      <h2>您最近的操作</h2>

        <el-button v-for='(item, index) in arr' type="info" :key='index' round @click="btn(item)">{{item.menu_name}}</el-button>
 
    </div>
    <div class="line">
      <h2>常用操作导航</h2>
      
        <el-button v-for='(item, index) in arr1' type="info" :key='index' round @click="btn(item)">{{item.menu_name}}</el-button>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '../../utils/request'

export default {
  name: 'Dashboard',
  data () {
    return {
      time: 'XX年XX月XX日',
      arr: [],
      arr1: [],
      btnname: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    routes() {
      return JSON.parse(JSON.stringify(this.$router.options.routes))
    }
  },
  created () {
    let that = this
    request({
      url: this.public.url + '/backend/accounthisnav/getlist',
      method: 'get'
    }).then(res=>{
      that.arr = res.data
    }).catch(error => {
    })

    request({
      url: this.public.url + '/backend/accountcommnav/getNameList',
      method: 'get'
    }).then(res=>{
      that.arr1 = res.data
    }).catch(error => {
    })
  },
  methods: {
    btn (item) {
      let key = item.controller + item.action
      for (let i = 0;i < this.routes.length;i++) {
        let item = this.routes[i]
        if (item.children && item.children.length > 0) {
          for (let j = 0; j < item.children.length; j++) {
            let index =item.children [j] 
            if (index.name === key) {
              this.btnname = index.meta.parent
            }
          }
        }
      }
      let path = '/' + this.btnname
      this.$router.push({path: path})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 10px;
    .line {
      border-bottom: 1px solid #999;
      padding: 30px;
    }
    .line .el-button {
      margin:10px!important;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}

</style>
