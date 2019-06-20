<template>
    <section id="home_index">
       <div class="theme_picture"></div>
       <div class="enter_game">
           <div class="advertisement">
               <div class="message_tips">
                   <span><img src="../../../static/dream/home/laba.png"/></span>
                   <span>最新广告&nbsp;:</span>
                   <span>注册即送8.88元赢了可首存100%，最高红利可达3888元平台&nbsp;&nbsp;&nbsp;千款游戏&nbsp;&nbsp;&nbsp;万人在线&nbsp;亿元奖池,首存送3888元,笔笔存送3888元史上最高救援金,周末全体20%......</span>
               </div>
           </div>
           <div class="game_contain">
                <el-carousel :interval="5000" arrow="always" :autoplay="false">
                    <el-carousel-item v-for="(val,keys) in game_list" :key="keys">
                        <div class="game_frame">
                            <div class="carousel_header"></div>
                            <div class="carousel_contain">
                                <ul>
                                    <li v-for="(item,index) in val.pages" :style="{margin: item.margin}">
                                        <img :src="item.url" :style="{height: item.height,top: item.top}" @click="enterTheGame(index)"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
           </div>
       </div>
       <footers :vip_foot="vip_foot"></footers>
    </section>
</template>

<script>
import footers from '../../components/footer.vue';
export default{
    components: {footers},
    data(){
        return{
            vip_foot: true,
            game_list: [
                {pages: [
                    {url: '../../../static/dream/home/longhudou.png',margin: '0px 5px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/baijiale.png',margin: '0px 5px 60px 0px',height: '315px',top: '-35px'},
                    {url: '../../../static/dream/home/bairenniuniu.png',margin: '0px 5px 60px 0px',height: '340px',top: '-60px'},
                    {url: '../../../static/dream/home/shuiguoji.png',margin: '0px 0px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/buyu.png',margin: '0px 5px 0px 0px',height: '328px',top: '-48px'},
                    {url: '../../../static/dream/home/shuihu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/doudizhu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/honghei.png',margin: '0px 0px 0px 0px',height: '310px',top: '-30px'}
                ]},
                {pages: [
                    {url: '../../../static/dream/home/longhudou.png',margin: '0px 5px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/baijiale.png',margin: '0px 5px 60px 0px',height: '315px',top: '-35px'},
                    {url: '../../../static/dream/home/bairenniuniu.png',margin: '0px 5px 60px 0px',height: '340px',top: '-60px'}
                ]}
            ],
        }
    },
    created(){
        this.variableChange();
        this.variableChange2();
    },
    methods: {
        variableChange(){
            var that = this;
            Object.defineProperty(sceneWeb, 'type', {
                get: function() {
                    return 'type';
                },
                set: function(value) {
                    if(value=='999992'){
                        that.$router.push({path: '/home'});
                    }
                }
            });
        },
        variableChange2(){
            var that = this;
            Object.defineProperties(errorCodeGame,{
                InternalServerError:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1001){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                ServerMaintain:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1002){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                UnavailableService:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1101){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                InvalidToken:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1102){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                InvalidArgument:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1103){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                GateOverload:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1104){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                ClientIpAbnormal:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1105){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                AccountFrozen:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1201){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                LoggedOnAnotherDevice:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1202){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                PlayerInScene:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1203){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                PlayerNotInScene:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1204){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                NotEnoughMoney:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1301){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                NoAvailableScene:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1302){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                TooMuchBetMoney:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1303){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                code:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==1){
                        that.$router.push({path: '/home'});
                    }
                    }
                },
                description:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                    if(value==2){
                        that.$router.push({path: '/home'});
                    }
                    }
                }
            });
        },
        enterTheGame(index){
            if(index==0){
                this.encapsulation('lhd');
            }else if(index==1){
                this.encapsulation('baiJiaLe');
            }else if(index==2){
                this.encapsulation('brnn');
            }else if(index==3){
                this.encapsulation('sgj');
            }else if(index==4){
                this.encapsulation('fishjoy');
            }else if(index==5){
                this.encapsulation('shz');
            }else if(index==6){
                this.encapsulation('ddz');
            }else if(index==7){
                this.encapsulation('hhdz');
            }
        },
        encapsulation(value){
            if(sessionStorage.getItem('token')){
                this.$router.push({path: '/game'});
                web.game_startGame(value);
                web.game_back2GameFromLobby(false);
            }else{
                this.$message.error('请先登录');
            }
        }
    }
}
</script>

<style lang="less">
#home_index{
    .theme_picture{
        width: 100%;
        height: 500px;
        .mixin_image(url('../../../static/dream/home/banner.png'));
    }
    .enter_game{
        width: 100%;
        height: 1010px;
         .mixin_image(url('../../../static/dream/home/background.png'));
         position: relative;
         .advertisement{
             width: 100%;
             height: 35px;
             .mixin_image(url('../../../static/dream/home/gonggaotiao.png'));
             position: absolute;
             left: 0px;
             top: 8px;
             .message_tips{
                 width: 1200px;
                 height: 35px;
                 margin: 0 auto;
                 span:nth-of-type(1){
                     .mixin_span(25px,35px,none,auto,center);
                     margin-right: 16px;
                     line-height: 0px;
                     padding-top: 5px;
                     box-sizing: border-box;
                     float: left;
                     img{
                        .mixin_img(25px,25px);
                    }
                }
                span:nth-of-type(2){
                    .mixin_span(70px,35px,none,@color_orange,left);
                    float: left;
                }
                span:nth-of-type(3){
                    .mixin_span(auto,35px,none,@color_white,left);
                    float: left;
                }
             }
         }
         .game_contain{
             .mixin_center(1350px,740px);
            .el-carousel__item:nth-child(2n) {
                -background-color: #99a9bf;
            }
            
            .el-carousel__item:nth-child(2n+1) {
                -background-color: #d3dce6;
            }
            .game_frame{
                .mixin_div(100%,100%,none,auto,left);
                padding: 0px 80px;
                box-sizing: border-box;
                .carousel_header{
                    width: 100%;
                    height: 60px;
                }
                .carousel_contain{
                    width: 100%;
                    height: 620px;
                    ul{
                        li{
                            .mixin_li(293.7px,280px);
                            position: relative;
                            cursor: pointer;
                            img{
                                width: 293.7px;
                                background-size: 100% 100%;
                                background-repeat: no-repeat;
                                position: absolute;
                                left: 0px;
                                z-index: 3;
                            }
                            
                        }
                    }
                }
            }
         }
    }
 
}
</style>