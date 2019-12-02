<template>
<section id="management">
    <div class="example_frame">
        <img class="big_fish" src="../../../static/dream/login/fish.png"/>
        <div class="manage_content">
            <router-view v-if="!manage_state"></router-view>
            <div class="manage_content_left" v-if="manage_state">
                <el-scrollbar>
                    <el-menu
                    :router="true"
                    :default-active="$route.path"
                    :unique-opened="true"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#513663"
                    text-color="#d4c3b2"
                    active-text-color="#ffd04b"
                    >
                    
                    <el-menu-item index="/crux"><div style="width: 100%;height: 100%;"><img class="icon_url_margin" src="../../../static/dream/center/shezhi.png"/>管理中心</div></el-menu-item>

                    <el-submenu :index="item.key" :key="item.key" v-for="(item,index) in menuList">
                        <template slot="title">
                        <img class="icon_url_margin" :src="item.icon"/>
                        <span>{{item.label}}</span>
                        </template>

                        <section v-for="(term,index) in item.effect">

                            <section v-if="term.effect.length!=0">
                                <el-submenu :index="term.key">
                                <template slot="title">
                                <img class="icon_url_margin" :src="term.icon"/>
                                <span>{{term.label}}</span>
                                </template>
                                <section v-for="(val,index) in term.effect">
                                    <el-menu-item  :index="val.path">
                                        <img class="icon_url_margin" :src="val.icon"/>
                                        {{val.label}}
                                    </el-menu-item>
                                </section>
                                </el-submenu>
                            </section>
                            

                            <section v-else>
                                <el-menu-item :index="term.path">
                                    <img class="icon_url_margin" :src="term.icon"/>
                                    {{term.label}}
                                </el-menu-item>
                            </section>

                        </section>

                    </el-submenu>
                    </el-menu>
                           
                </el-scrollbar>
            
            </div>
            <div class="manage_content_right" v-if="manage_state">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <footers :vip_foot="false"></footers>
</section>
</template>

<script>
import footers from '../../components/footer.vue';
export default{
    name: 'management',
    components: {footers},
    data(){
        return{
            manage_state: false,//管理中心
            menuList: [{key: '1',label: '派趣娱乐',icon: '../../../static/dream/center/pai.png',effect:[
                {key:'1-2-1',label: '棋牌信息',path:'/chesscard',icon: '../../../static/dream/center/qipai.png',effect:[]},
                {key:'1-3-1',label: '团队信息',path: '/teaminfo',icon: '../../../static/dream/center/tuandui.png',effect:[]},
                {key:'1-3-2',label: '代理',path: '/agent',icon: '../../../static/dream/center/daili.png',effect:[]},
                {key:'1-3-3',label: '玩家',path: '/player',icon: '../../../static/dream/center/wanjia.png',effect:[]},
                {key:'1-2-3',label: '财务信息',path: '/finance',icon: '../../../static/dream/center/caiwu.png',effect:[]},
                {key:'1-2-4',label: '收益',path: '/profit',icon: '../../../static/dream/center/shouyi.png',effect:[]},
                {key:'1-2-5',label: '推广',path: '/extension',icon: '../../../static/dream/center/tuiguang.png',effect:[]},
                {key:'1-2-6',label: '公告',path: '/notice',icon: '../../../static/dream/center/gonggao.png',effect:[]}
                ]},

                {key: '2',label: '彩票游戏',icon: '../../../static/dream/center/qipai.png',effect: [
                {key: '2-2-1',label: '彩票信息',path: '/lotteryinfo',icon: '../../../static/dream/center/qipai.png',effect:[]},
                {key: '2-2-2',label: '团队信息',path: '/lotteryteam',icon: '../../../static/dream/center/qipai.png',effect:[]},
                {key: '2-2-3',label: '彩票报表',path: '',icon: '../../../static/dream/center/qipai.png',effect:[
                    {key: '2-3-1',label: '彩票报表',path: '/lotteryreport',icon: '../../../static/dream/center/qipai.png',effect:[]},
                    {key: '2-3-2',label: '真人电子体育',path: '/electronicsports',icon: '../../../static/dream/center/qipai.png',effect:[]}
                ]},
                {key: '2-2-4',label: '公告',path: '/lotterynotice',icon: '../../../static/dream/center/qipai.png',effect:[]},
                ]}
            ],
        }
    },
    methods:{
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style lang="less" scoped>
#management{
    width: 100%;
    .example_frame{
        width: 100%;
        height: 1200px;
        .mixin_image(url('../../../static/dream/center/bg-guanli.jpg'));
        position: relative;
        .big_fish{
            .mixin_img(426px;487px);
            position: absolute;
            left: 0px;
            bottom: 0px;
        }
        .manage_content{
            width: 1200px;
            height: 1200px;
            background: rgba(88,51,82,0.6);
            border-left: 1px solid @color_blueviolet;
            border-right: 1px solid @color_blueviolet;
            position: absolute;
            left: 50%;
            top: 0px;
            margin-left: -600px;
            padding: 45px 43px 0px 43px;
            box-sizing: border-box;
            .manage_content_left{
                .mixin_float(230px,auto,left);
                background: #513663;
                margin-right: 40px;
                min-height: 1130px;
                .icon_url_margin{
                    .mixin_img(20px,20px);
                    margin-right: 11px;
                    margin-top: -5px;
                }
            }
            .manage_content_right{
                .mixin_float(840px,905px,right);
                overflow-x: hidden;
            }
        }
    }
}
</style>