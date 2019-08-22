<template>
    <section id="home_index">
       <div class="theme_picture">
                <el-carousel :interval="5000" arrow="always" :autoplay="true" trigger="click">
                    <el-carousel-item v-for="(item,index) in card_picture" :key="index">
                        <div class="example_picture">
                            <img :src="item.url"/>
                        </div>
                    </el-carousel-item>
                </el-carousel>
       </div>
       <div class="enter_game">
           <img class="big_fish" src="../../../static/dream/login/fish.png" @click="fishMeans()"/>
           <div class="advertisement">
               <div class="message_tips">
                   <span v-show="play_info" class="laba_quality"><img src="../../../static/dream/home/laba.png"/></span>
                   <span v-show="play_info" class="word_quality">最新广告&nbsp;:</span>
                   <div class="flash_quality" v-show="play_info">
                       <div v-html="timer_content" class="move_left" :style="{width:timer_width+'px'}"></div>
                   </div>
               </div>
           </div>
           <div class="game_contain">
                <el-carousel :interval="5000" arrow="never" indicator-position="none" :autoplay="false" trigger="click">
                    <el-carousel-item v-for="(val,keys) in game_list" :key="keys">
                        <div class="game_frame">
                            <div class="carousel_header"></div>
                            <div class="carousel_contain">
                                <ul>
                                    <li v-for="(item,index) in val.pages">
                                        <img :src="item.url" :style="{height: item.height,top: item.top}" @click="enterTheGame(index)"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
           </div>
       </div>
       <footers :vip_foot="false"></footers>
       <game-theme ref="subject" :subject="true" @interaction="setMove"></game-theme>
    </section>
</template>

<script>
import footers from '../../components/footer.vue';
export default{
    components: {footers},
    data(){
        return{
            card_picture: [
                {url: '../../../static/dream/home/photo2.jpg'}
                // {url: '../../../static/dream/home/banner.jpg'},
            ],
            game_list: [
                {pages: [
                    {url: '../../../static/dream/home/longhudou.png',margin: '0px 5px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/baijiale.png',margin: '0px 5px 60px 0px',height: '112.5%',top: '-12.5%'},
                    {url: '../../../static/dream/home/bairenniuniu.png',margin: '0px 5px 60px 0px',height: '121.4%',top: '-21.4%'},
                    {url: '../../../static/dream/home/shuiguoji.png',margin: '0px 0px 60px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/buyu.png',margin: '0px 5px 0px 0px',height: '117.1%',top: '-17.1%'},
                    {url: '../../../static/dream/home/shuihu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/doudizhu.png',margin: '0px 5px 0px 0px',height: '100%',top: '0px'},
                    {url: '../../../static/dream/home/honghei.png',margin: '0px 0px 0px 0px',height: '110.7%',top: '-10.7%'}
                ]}
            ],
            play_info: false,
            timer: null,
            timer_width: 0,
            timer_content: '',
            timer_list: []
        }
    },
    created(){
        
    },
    beforeDestroy(){
        this.clearTimer();
    },
    watch:{
        timer_list(cur,old){
            // console.log('current&&',this.timer,this.timer_list.length);
            if(this.timer==null&&this.timer_list.length!=0){
                // console.log('start')
                this.play_info = true;
                this.timer_content = this.timer_list[0];
                this.timer = setInterval(this.timerMeans1,200);
            }           
        }
    },
    methods: {
        fishMeans(){
            // var value = "赌侠<font color='#23f0fd' size='26'> testN28 </font>赢得<font color='#ffe400' size='26'> 253.4 </font>奖金，大吉大利 今晚吃鸡!";
            // errorCodeGame.move = value;
        },
        timerMeans1(){
            if(this.timer_width>1500){
                this.clearTimer();
                this.timer_list.shift();
                // console.log('stop111',this.timer);
            }else{
                this.timer_width+=30;
                // console.log('width##',this.timer_width);
            }
        },
        clearTimer(){
                clearInterval(this.timer);
                this.timer = null;
                this.timer_width = 0;
                this.play_info = false;
        },
        setMove(value){
            let home_index = document.getElementById('home_index');
            if(home_index==null){
                return;
            }
            // if(!value){
            //     var value = "赌侠<font color='#23f0fd' size='26'> testN28 </font>赢得<font color='#ffe400' size='26'> 253.4 </font>奖金，大吉大利 今晚吃鸡!";
            // }
            var that = this;
            value = value.replace(" size='26'",'');
            value = value.replace(" size='26'",'');
            value = value.replace(" size='26'",'');
            that.timer_list.push(value);
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
            web.game_startGame(value);
            web.game_back2GameFromLobby(false);
            this.$refs.subject.openFullScreen();
        }
    }
}
</script>

<style lang="less">
#home_index{
    .theme_picture{
        width: 100%;
        height: 500px;
        .example_picture{
            width: 100%;
            height: 500px;
            img{
                .mixin_img(100%,500px);
            }
        }
    }
    .enter_game{
        width: 100%;
        height: 1010px;
         .mixin_image(url('../../../static/dream/home/background.jpg'));
         position: relative;
        .big_fish{
            .mixin_img(426px;487px);
            position: absolute;
            left: 0px;
            bottom: 0px;
        }
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
                 position: relative;
                 .laba_quality{
                     .mixin_span(25px,35px,none,auto,center);
                     margin-right: 16px;
                     line-height: 0px;
                     padding-top: 5px;
                     box-sizing: border-box;
                     position: absolute;
                     top: 0px;
                     left: 0px;
                     img{
                        .mixin_img(25px,25px);
                    }
                }
                .word_quality{
                    .mixin_span(70px,35px,none,@color_tone1,left);
                    position: absolute;
                    top: 0px;
                    left: 41px;
                }
                .flash_quality{
                    .mixin_span(1000px,35px,none,@color_white,left);
                    position: absolute;
                    top: 0px;
                    left: 131px;
                    overflow: hidden;
                    .move_left{
                        width: 0px;
                        height: 35px;
                        float: right;
                        text-indent: 1px;
                        text-align: left;
                        overflow: hidden;
                    }
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
                        li:nth-of-type(1){
                            margin: 0px 5px 60px 0px;
                        }
                        li:nth-of-type(2){
                            margin: 0px 5px 60px 0px;
                        }
                        li:nth-of-type(3){
                            margin: 0px 5px 60px 0px;
                        }
                        li:nth-of-type(4){
                            margin: 0px 0px 60px 0px;
                        }
                        li:nth-of-type(5){
                            margin: 0px 5px 0px 0px;
                        }
                        li:nth-of-type(6){
                            margin: 0px 5px 0px 0px;
                        }
                        li:nth-of-type(7){
                            margin: 0px 5px 0px 0px;
                        }
                        li:nth-of-type(8){
                            margin: 0px 0px 0px 0px;
                        }
                    }
                }
            }
         }
    }
 
}
</style>