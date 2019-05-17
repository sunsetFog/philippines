<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="headbox" style="background-image:url('../../../static/bg.png')">棋牌游戏中心</div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened='true'
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in navList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      // navList: [],
      // permissions: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'roles',
      'navList'
    ]),
    routes() {
      return JSON.parse(JSON.stringify(this.$router.options.routes))
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    // console.log(this.navList)
    // this.navList = this.routes
    // this.getPermissions()
  },
  methods: {
    // getPermissions() {// 从后台获取需要展示的导航
    //   this.permissions = this.roles.map(item => {// 你只需要name
    //     return item.name
    //   })
    //   this.showRouters(this.navList)
    // },
    // showRouters(routes){
    //   for (let i = 0;i < routes.length;i++) {
    //     // 取出对象
    //     let item = routes[i]
    //     // 根据后台给的权限判断true还是false
    //     // let hasPermission = this.permissions.indexOf(item && item.meta && item.meta.title) >= 0
    //     // 取反赋值,true代表有权限 则hidden为false
    //     // item.hidden = !hasPermission
    //     item.hidden = false
    //     // 向下递归
    //     if (item.children && item.children.length > 0) {
    //       this.showRouters(item.children)
    //     }
    //   }
    // }
  }
}
</script>

<style>
.headbox {
    height: 70px;
    color: white;
    font-size: 25px;
    padding-left: 11px;
    line-height: 70px;
    width: 100%;
  }
</style>
