<template>
    <section id="home_page">
       <div class="theme_picture"></div>
       <div class="enter_game">
           <div class="advertisement">
               <div class="message_tips">
                   <span><img src="../../../static/dream/laba.png"/></span>
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
       <div class="footer_contain">
           <div class="contain_center">
               <div class="function_example">
                   <ul>
                       <li v-for="(item,index) in function_list" :style="{backgroundImage: item.url}" :class="{'function_margin': index!=4}"></li>
                    </ul>
               </div>
               <div class="logo_example">
                   <ul>
                       <li v-for="(item,index) in logo_list" :style="{backgroundImage: item.url,width: item.width}" :class="{'logo_margin': index!=9}"></li>
                    </ul>
               </div>
               <div class="relevant_example">
                   <ul>
                       <li v-for="(item,index) in relevant_list" :class="{'relevant_border':index!=5&&index!=6}">{{item.title}}</li>
                       <li>官方邮箱&nbsp;:&nbsp;cs@bifa.bet</li>
                    </ul>
               </div>
               <div class="copyright_example">
                   <span>@2010-2020&nbsp;88必发&nbsp;版权所有</span>
                   <span>88必发娱乐&nbsp;邀你共创未来</span>
               </div>
           </div>
       </div>
    </section>
</template>

<script>
export default{
    data(){
        return{
            game_list: [
                {pages: [
                    {url: '../../../static/dream/longhudou.png',margin: '0px 5px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/baijiale.png',margin: '0px 5px 60px 0px',height: '315px',top: '-35px'},
                    {url: '../../../static/dream/bairenniuniu.png',margin: '0px 5px 60px 0px',height: '340px',top: '-60px'},
                    {url: '../../../static/dream/shuiguoji.png',margin: '0px 0px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/buyu.png',margin: '0px 5px 0px 0px',height: '328px',top: '-48px'},
                    {url: '../../../static/dream/shuihu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/doudizhu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/honghei.png',margin: '0px 0px 0px 0px',height: '310px',top: '-30px'}
                ]},
                {pages: [
                    {url: '../../../static/dream/longhudou.png',margin: '0px 5px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/baijiale.png',margin: '0px 5px 60px 0px',height: '315px',top: '-35px'},
                    {url: '../../../static/dream/bairenniuniu.png',margin: '0px 5px 60px 0px',height: '340px',top: '-60px'}
                ]}
            ],
            function_list: [
                {url: "url('../../../static/dream/VIP-hover.png')"},
                {url: "url('../../../static/dream/chongzhi.png')"},
                {url: "url('../../../static/dream/daili.png')"},
                {url: "url('../../../static/dream/jifen.png')"},
                {url: "url('../../../static/dream/zaixiankefu.png')"}
            ],
            logo_list: [
                {url: "url('../../../static/dream/AG.png')",width: '85px'},//1
                {url: "url('../../../static/dream/BBIN_logo.png')",width: '70px'},//2
                {url: "url('../../../static/dream/saba_logo_en.png')",width: '108px'},//3
                {url: "url('../../../static/dream/lg.png')",width: '85px'},//4
                {url: "url('../../../static/dream/MG_logo.png')",width: '110px'},//5
                {url: "url('../../../static/dream/playtech-logo.png')",width: '105px'},//6
                {url: "url('../../../static/dream/playgo_logo.png')",width: '95px'},
                {url: "url('../../../static/dream/PS_logo.png')",width: '100px'},//8
                {url: "url('../../../static/dream/SW.png')",width: '115px'},//9
                {url: "url('../../../static/dream/TTG.png')",width: '105px'}//10
            ],
            relevant_list: [
                {title: '关于我们'},
                {title: '存款提款'},
                {title: '常见问题'},
                {title: '联系我们'},
                {title: '理性博彩'},
                {title: '负责声明'},
                {title: '欢迎详细加盟资讯'}
            ],
        }
    },
    methods: {
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
            this.$router.push({path: '/cards'});
            web.game_startGame(value);
            web.game_back2GameFromLobby(false);
        }
    }
}
</script>

<style lang="less">
#home_page{
    .theme_picture{
        width: 100%;
        height: 500px;
        .mixin_image(url('../../../static/dream/banner.png'));
    }
    .enter_game{
        width: 100%;
        height: 1010px;
         .mixin_image(url('../../../static/dream/background.png'));
         position: relative;
         .advertisement{
             width: 100%;
             height: 35px;
             .mixin_image(url('../../../static/dream/gonggaotiao.png'));
             position: absolute;
             left: 0px;
             top: 8px;
             .message_tips{
                 width: 1210px;
                 height: 35px;
                 margin: 0 auto;
                 span:nth-of-type(1){
                     .mixin_span(25px,35px,none,auto,center);
                     margin-right: 16px;
                     line-height: 0px;
                     padding-top: 5px;
                     box-sizing: border-box;
                     img{
                        .mixin_img(25px,25px);
                    }
                }
                span:nth-of-type(2){
                    .mixin_span(70px,35px,none,@color_orange,left);
                }
                span:nth-of-type(3){
                    .mixin_span(auto,35px,none,@color_white,left);
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
    .footer_contain{
        width: 100%;
        height: 260px;
        .mixin_image(url('../../../static/dream/diceng.png'));
        .contain_center{
            width: 1220px;
            height: 260px;
            margin: 0 auto;
            .function_example{
                width: 100%;
                height: 100px;
                padding-left: 55px;
                box-sizing: border-box;
                .function_margin{
                    margin-right: 64px;
                }
                ul{
                    li{
                        .mixin_li(170px,60px);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                }
            }
            .logo_example{
                width: 100%;
                height: 40px;
                margin-top: 10px;
                .logo_margin{
                    margin-right: 26px;
                }
                ul{
                    li{
                        .mixin_li(auto,40px);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .relevant_example{
                width: 100%;
                height: 20px;
                margin-top: 24px;
                padding-left: 180px;
                box-sizing: border-box;
                .relevant_border{
                    border-right: 1px solid @color_white;
                }
                ul{
                    li{
                        .mixin_li(auto,20px);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        padding: 0px 16px;
                        box-sizing: border-box;
                        color: @color_white;
                        cursor: pointer;
                    }
                    li:nth-of-type(7){
                        margin-left: 45px;
                        padding: 0px;
                        cursor: auto;
                    }
                    li:nth-of-type(8){
                        margin-left: 11px;
                        padding: 0px;
                        color: @color_orange;
                        cursor: auto;
                    }
                }
            }
            .copyright_example{
                width: 100%;
                height: 20px;
                margin-top: 17px;
                padding-left: 520px;
                box-sizing: border-box;
                font-size: @font_size12;
                span:nth-of-type(1){
                    .mixin_span(auto,20px,none,@color_white,left);
                    float: left;
                }
                span:nth-of-type(2){
                    .mixin_span(auto,20px,none,@color_white,left);
                    float: left;
                    margin-left: 55px;
                }
            }
        }
    }
 
}
</style>