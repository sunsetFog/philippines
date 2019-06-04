<template>
<section id="management">
    <div class="manage_content">
        <div class="manage_content_left">
                <el-menu
                  router
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#101823"
                text-color="#f8faff"
                active-text-color="#ffd04b"
                  >
                
                <el-menu-item index="/mcenter/crux"><div style="width: 100%;height: 100%;border-bottom: 1px solid #3d434f;"><i class="el-icon-setting"></i>管理中心</div></el-menu-item>

                  <el-submenu :index="item.key" :key="item.key" v-for="(item,index) in menuList">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.label}}</span>
                    </template>

                    <section v-for="(term,index) in item.effect">

                        <section v-if="term.effect.length!=0">
                            <el-submenu :index="term.key">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{term.label}}</span>
                            </template>
                            <section v-for="(val,index) in term.effect">
                                <el-menu-item  :index="val.path"><i class="el-icon-document"></i>{{val.label}}</el-menu-item>
                            </section>
                            </el-submenu>
                        </section>
                        

                        <section v-else>
                            <el-menu-item :index="term.path"><i class="el-icon-location"></i>{{term.label}}</el-menu-item>
                        </section>

                    </section>

                  </el-submenu>
                </el-menu>       
        
        
        </div>
        <div class="manage_content_right">
            <router-view></router-view>
        </div>
    </div>
</section>
</template>

<script>
export default{
    name: 'center',
    data(){
        return{
            menuList: [{key: '1',label: '七宝棋牌',icon: 'el-icon-star-off',effect:[
                {key:'1-2-1',label: '棋牌信息',path:'/mcenter/chesscard',effect:[]},
                {key:'1-2-2',label: '团队信息',effect:[
                    {key:'1-3-1',label: '团队信息',path: '/mcenter/teaminfo',effect:[]},
                    {key:'1-3-2',label: '代理',path: '/mcenter/agent',effect:[]},
                    {key:'1-3-3',label: '玩家',path: '/mcenter/player',effect:[]}
                ]},
                {key:'1-2-3',label: '财务信息',path: '/mcenter/finance',effect:[]},
                {key:'1-2-4',label: '收益',path: '/mcenter/profit',effect:[]},
                {key:'1-2-5',label: '推广',path: '/mcenter/extension',effect:[]},
                {key:'1-2-6',label: '公告',path: '/mcenter/notice',effect:[]}
                ]},

                {key: '2',label: '彩票游戏',icon: 'el-icon-refresh',effect: [
                {key: '2-2-1',label: '彩票信息',path: '/mcenter/lotteryinfo',effect:[]},
                {key: '2-2-2',label: '团队信息',path: '/mcenter/lotteryteam',effect:[]},
                {key: '2-2-3',label: '彩票报表',path: '',effect:[
                    {key: '2-3-1',label: '彩票报表',path: '/mcenter/lotteryreport',effect:[]},
                    {key: '2-3-2',label: '真人电子体育',path: '/mcenter/electronicsports',effect:[]}
                ]},
                {key: '2-2-4',label: '公告',path: '/mcenter/lotterynotice',effect:[]},
                ]}
            ],
        }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="less">
#management{
    width: 100%;
    .manage_content{
        width: 1190px;
        height: 950px;
        background: #223249;
        margin: 0 auto;
        padding: 45px 40px 0px 40px;
        box-sizing: border-box;
        .manage_content_left{
            .mixin_float(270px,905px,left);
            padding-right: 40px;
            box-sizing: border-box;
        }
        .manage_content_right{
            .mixin_float(840px,905px,right);
        }
    }
}
</style>