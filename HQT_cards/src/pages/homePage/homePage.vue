<template>
    <section id="home_page">
       <div class="theme_picture"><img src="../../../static/cards/theme.png"/></div>
       <div class="business_frame">
            <div class="business_content">
                <div class="business_news"><img src=""/><span>是考虑到解放路卡就是代理费</span></div>
                <div class="business_list">
                
                    <div class="prize_publicity"><img src=""/><span>奖源公示</span></div>
                    <div class="prize_content">
                        <div class="prize_list" v-for="(item,index) in prize_list">
                            <div class="location">{{item.location}}</div>
                            <div class="publictity_info">
                                <div class="lottery">重庆时时彩</div>
                                <div class="period"><span>第0000期</span><span>倒计时00:00:00</span></div>
                                <div class="previous_isssue">上一期开奖结果:</div>
                                <div class="result">01 01 01 01 01...</div>
                            </div>
                        </div>
                    </div>

                    <div class="prize_publicity"><img src=""/><span>奖源游戏</span></div>
                    <div class="game_pattern">
                        <div class="pattern_list" v-for="(item,index) in pattern_list">
                            <div class="pattern_left"><img src="" /></div>
                            <div class="pattern_right">
                                <div class="introduction">玩法简介</div>
                                <div class="introduction_text">根据房间的彩源信息开奖。玩家可以在黑，红，梅，方四个区域参与下注，开牌时每个区域分别牌型大者赢//{{item.title}}</div>
                                <div class="in_game"><span>点击进入游戏</span></div>
                            </div>
                        </div>
                    </div>


                    <div class="prize_publicity"><img src=""/><span>传统游戏</span></div>
                    <div class="tradition_game">
                        <div class="tradition_list" v-for="(item,index) in tradition_list"><img src=""/></div>
                    </div>

                </div>
            </div>
       </div>
    </section>
</template>

<script>
export default{
    data(){
        return{
            prize_list: [{location: '重庆',lottery: '重庆时时彩',period_stage: '第0000期',period_time: '00:00:00',result: '01 01 01 01 01...'},
                {location: '腾讯',lottery: '腾讯分分彩',period_stage: '第0000期',period_time: '00:00:00',result: '01 01 01 01 01...'},
                {location: '河内',lottery: '河内1分彩',period_stage: '第0000期',period_time: '00:00:00',result: '01 01 01 01 01...'},
                {location: '河内',lottery: '河内5分彩',period_stage: '第0000期',period_time: '00:00:00',result: '01 01 01 01 01...'},
                {location: '摩洛哥',lottery: '摩洛哥Super52',period_stage: '第0000期',period_time: '00:00:00',result: '01 01 01 01 01...'}
            ],
            pattern_list: [{title: '多人三张'},{title: '红黑大战'},{title: '龙虎斗'},{title: '二八杠'},{title: '百人牛牛'},{title: '百家乐'}],
            tradition_list: [{url: ''},{url: ''},{url: ''}]
        }
    }
}
</script>

<style lang="less">
#home_page{
    .theme_picture{
        width: 100%;
        height: 430px;
        img{
            .mixin_img(100%,100%);
        }
    }
    .business_frame{
        width: 100%;
        .business_content{
            width: 1235px;
            margin: 0 auto;
            .business_news{
                width: 100%;
                height: 30px;
                line-height: 30px;
                img{
                    .mixin_img(20px,20px);
                }
                span{
                    margin-left: 15px;
                }
            }
            .business_list{
                width: 100%;
                background: #223249;
                .prize_publicity{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    img{
                        width: 35px;
                        height: 25px;
                        margin: -20px 0px 0px 10px;
                    }
                    span{
                        margin-left: 20px;
                        color: #f0d784;
                        font-size: 24px;
                    }
                }
                .prize_content{
                    width: 100%;
                    height: 400px;
                    .prize_list{
                        .mixin_float(230px,380px,left);
                        border-radius: 4px;
                        border: 1px solid #20a1e5;
                        margin: 10px 0px 0px 10px;
                        position: relative;
                        .location{
                            .mixin_div(75px,35px,#161a37,#f2f3ee,center);
                            position: absolute;
                            left: 0px;
                            top: 0px;
                        }
                        .publictity_info{
                            width: 100%;
                            height: 105px;
                            position: absolute;
                            bottom: 0px;
                            left: 0px;
                            background: rgba(21,25,50,0.7);
                            padding: 3px 15px 0px 15px;
                            box-sizing: border-box;
                            .mixin_lottery(){
                                width: 100%;
                                height: 25px;
                                color: #f5f8ed;
                                line-height: 25px;
                            }
                            .lottery{
                                .mixin_lottery();
                                font-size: 18px;
                                font-weight: 600;
                            }
                            .period{
                                .mixin_lottery();
                                span:nth-of-type(1){
                                    float: left;
                                }
                                span:nth-of-type(2){
                                    float: left;
                                    margin-left: 20px;
                                    color: #9bca6e;
                                }
                            }
                            .previous_isssue{
                                .mixin_lottery();
                            }
                            .result{
                                .mixin_lottery();
                                color: #9bca6e;
                            }
                        }
                    }
                }
                .game_pattern{
                    width: 100%;
                    height: 440px;
                    .pattern_list{
                        .mixin_float(400px,200px,left);
                        background: #293a4e;
                        margin: 10px 0px 0px 10px;
                        .pattern_left{
                            .mixin_float(200px,200px,left);
                            img{
                                .mixin_img(100%,100%);  
                            }
                        }
                        .pattern_right{
                            .mixin_float(200px,200px,right);
                            color: #f5fffa;
                            padding: 0px 10px 0px 10px;
                            box-sizing: border-box;
                            .introduction{
                                width: 100%;
                                height: 45px;
                                line-height: 45px;
                                font-size: 16px;
                                font-weight: 600;
                            }
                            .introduction_text{
                                width: 100%;
                                height: 120;
                            }
                            .in_game{
                                width: 100%;
                                height: 30px;
                                line-height: 30px;
                                margin-top: 10px;
                                span{
                                    float: right;
                                }
                            }
                        }
                    }
                }
                .tradition_game{
                    width: 100%;
                    height: 430px;
                    .tradition_list{
                        .mixin_float(390px,410px,left);
                        margin: 10px 0px 0px 10px;
                        img{
                            .mixin_img(100%,100%);
                        }
                    }
                }
            }

        }
        
    }
}
</style>