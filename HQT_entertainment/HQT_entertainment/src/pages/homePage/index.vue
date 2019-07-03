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
           <img class="big_fish" src="../../../static/dream/login/fish.png" @click="setMove()"/>
           <div class="advertisement">
               <div class="message_tips">
                   <span v-show="play_info" class="laba_quality"><img src="../../../static/dream/home/laba.png"/></span>
                   <span v-show="play_info" class="word_quality">最新广告&nbsp;:</span>
                   <div class="flash_quality" v-show="play_info">
                       <div v-html="timer_list1.content" class="move_left" :style="{width:timer_list1.width+'px'}"></div>
                   </div>
                   <div class="flash_quality" v-show="play_info">
                       <div v-html="timer_list2.content" class="move_left" :style="{width:timer_list2.width+'px'}"></div>
                   </div>
                   <div class="flash_quality" v-show="play_info">
                       <div v-html="timer_list3.content" class="move_left" :style="{width:timer_list3.width+'px'}"></div>
                   </div>
               </div>
           </div>
           <div class="game_contain">
                <el-carousel :interval="5000" arrow="always" :autoplay="false" trigger="click">
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
            card_picture: [
                {url: '../../../static/dream/home/photo1.jpg'},
                {url: '../../../static/dream/home/banner.jpg'},
            ],
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
            play_info: false,
            timer_list1: {timer: null,content: '',width: 0,active: true},
            timer_list2: {timer: null,content: '',width: 0,active: true},
            timer_list3: {timer: null,content: '',width: 0,active: true},
        }
    },
    created(){
        this.variableChange();
        this.variableChange2();
    },
    beforeDestroy(){
        this.clearTimer();
    },
    methods: {
        timerMeans1(){
            if(this.timer_list1.width>1500){
                clearInterval(this.timer_list1.timer);
                this.timer_list1.width = 0;
                this.timer_list1.timer = null;
                this.emptyMeans();
                // console.log('stop111',this.timer_list1);
            }else{
                this.timer_list1.width+=20;
            }
        },
        timerMeans2(){
            if(this.timer_list2.width>1500){
                clearInterval(this.timer_list2.timer);
                this.timer_list2.width = 0;
                this.timer_list2.timer = null;
                this.emptyMeans();
                console.log('stop222',this.timer_list2);
            }else{
                this.timer_list2.width+=20;
            }
        },
        timerMeans3(){
            if(this.timer_list3.width>1500){
                clearInterval(this.timer_list3.timer);
                this.timer_list3.width = 0;
                this.timer_list3.timer = null;
                this.emptyMeans();
                console.log('stop333',this.timer_list3);
            }else{
                this.timer_list3.width+=20;
            }
        },
        emptyMeans(){
            if(this.timer_list1.width==0&&this.timer_list2.width==0&&this.timer_list3.width==0){
                this.play_info = false;
                this.clearTimer();
            }else{
                this.play_info = true;
            }
        },
        clearTimer(){
                clearInterval(this.timer_list1.timer);
                clearInterval(this.timer_list2.timer);
                clearInterval(this.timer_list3.timer);
                this.timer_list1.timer = null;
                this.timer_list2.timer = null;
                this.timer_list3.timer = null;
        },
        variableChange(){
            var that = this;
            Object.defineProperty(sceneWeb, 'type', {
                get: function() {
                    return 'type';
                },
                set: function(value) {
                    if(value=='999992'){
                        that.$router.push({path: '/home'});
                    }else if(value=='999991'||value=='999993'||value=='999994'||value=='999995'){
                        that.$router.push({path: '/game'});
                        that.openFullScreen().close();
                    }
                }
            });
        },
        variableChange2(){
            var that = this;
            Object.defineProperties(errorCodeGame,{
                code:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        if(value==1001||value==1002||value==1101||value==1102||value==1103||value==1104||value==1105||value==1201||value==1202||value==1203||value==1204||value==1301||value==1302||value==1303||value==1||value==2||value=="chaoshi"){
                            that.$router.push({path: '/home'});
                            that.openFullScreen().close();
                            if(value=='chaoshi'){
                                that.$message.error('请求超时!');
                            }
                        }
                    }
                },
                move:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        that.setMove(value);
                    }
                }
            });
        },
        setMove(value){
            let home_index = document.getElementById('home_index');
            if(home_index==null){
                return;
            }
            if(!value){
                var value = "赌侠<font color='#23f0fd' size='26'> testN28 </font>赢得<font color='#ffe400' size='26'> 253.4 </font>奖金，大吉大利 今晚吃鸡!";
            }
            var that = this;
            value = value.replace(" size='26'",'');
            value = value.replace(" size='26'",'');
            value = value.replace(" size='26'",'');
            that.play_info = true;
            console.log('timer###',that.timer_list1.timer);
            if(that.timer_list1.width==0){
                console.log('timer111')
                that.timer_list1.content = value;
                that.timer_list1.timer = setInterval(that.timerMeans1,200);
            }else if(that.timer_list1.width!=0&&that.timer_list2.width==0){
                console.log('timer222');
                that.timer_list2.content = value;
                if(that.timer_list1.width-that.timer_list2.width<450){
                    that.timer_list2.width = 1;
                    setTimeout(function(){
                        console.log('tomeover222')
                        that.timer_list2.timer = setInterval(that.timerMeans2,200);
                    },3500);
                }else{
                    that.timer_list2.timer = setInterval(that.timerMeans2,200);
                }
            }else if(that.timer_list1.width!=0&&that.timer_list2.width!=0&&that.timer_list3.width==0){
                console.log('timer333');
                that.timer_list3.content = value;
                if(that.timer_list2.width-that.timer_list3.width<450){
                    that.timer_list3.width = 1;
                    if(that.timer_list2.width==1){
                        setTimeout(function(){
                            console.log('tomeover355')
                            that.timer_list3.timer = setInterval(that.timerMeans3,200);
                        },7000);
                    }else{
                        setTimeout(function(){
                            console.log('tomeover333')
                            that.timer_list3.timer = setInterval(that.timerMeans3,200);
                        },3500);
                    }
                }else{
                    that.timer_list3.timer = setInterval(that.timerMeans3,200);
                }
                
            }
            
            console.log('string#####@');
            value = '';
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
                // this.$router.push({path: '/game'});
                web.game_startGame(value);
                web.game_back2GameFromLobby(false);
                this.openFullScreen();
            }else{
                this.$message.error('请先登录');
            }
        },
        openFullScreen() {
            return this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
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
                    .mixin_span(70px,35px,none,@color_orange,left);
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
                    }
                }
            }
         }
    }
 
}
</style>