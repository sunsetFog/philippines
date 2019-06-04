<template>
<section id="lottery">
        <div class="example">
            <div class="example_left">
                <div class="color_variety">
                    <div class="collection">我的收藏</div>
                    <div class="modify_variety" @click="addVary()">添加/编辑彩种</div>
                    <div class="hidden_menu">隐藏菜单</div>
                </div>
                <div class="trend"><ul><li>号</li><li>码</li><li>走</li><li>势</li></ul></div>
            </div>
            <div class="example_right">
                <div class="winning_news">
                    <div class="winning_prize">
                        <img class="position_prize" src="../../../static/lottery/lottery1.png"/>
                        <img class="loudsspeaker_message" src="../../../static/lottery/lottery2.png"/>
                        <div class="winning_reminder">中将提醒</div>
                        <div class="quarter">第<span>20190314-201</span>期</div>
                        <div class="prize_number">
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div class="current_quarter">当前在售:<span>20190314-202</span>期</div>
                        <div class="quarter_time">00:01:31</div>
                    </div>
                    <div class="near_future"><span></span><button>近期开奖</button></div>
                    <div class="near_record">
                        <div class="record_head">
                            <ul>
                                <li>期号</li>
                                <li>开奖号码</li>
                                <li>三星组态</li>
                            </ul>
                        </div>
                        <div class="record_river">
                            <ul v-for="(item,index) in record_list">
                                <li>{{item.stage}}</li>
                                <li>
                                    <div class="honey" v-if="index==0"><span v-for="(val,res) in item.number">{{val}}</span></div>
                                    <div class="praise" v-if="index!=0"><span v-for="(val,res) in item.number">{{val}}</span></div>
                                </li>
                                <li>
                                    <span v-if="item.configuration=='组六'" style="color: #049abf;">{{item.configuration}}</span>
                                    <span v-if="item.configuration=='组三'" style="color: #ff3738;">{{item.configuration}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="near_future"><span></span><button>投注记录</button></div>
                    <div class="betting_record">
                        <div class="betting_head">
                            <ul>
                                <li>彩种</li>
                                <li>投注金额</li>
                                <li>奖金</li>
                                <li>状态</li>
                            </ul>
                        </div>
                        <div class="betting_river">
                            <ul>
                                <li>五星</li>
                                <li>9999</li>
                                <li>789</li>
                                <li>ok</li>
                            </ul>
                        </div>
                    </div>





                </div>
                <div class="lottery_type">
                    <div class="lottery_tabs">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="五星" name="/lottery/fivestars"></el-tab-pane>
                            <el-tab-pane label="四星" name="/lottery/fourstars"></el-tab-pane>
                            <el-tab-pane label="后三码" name="/lottery/afteryards"></el-tab-pane>
                            <el-tab-pane label="前三码" name="/lottery/frontyards"></el-tab-pane>
                            <el-tab-pane label="中三码" name="/lottery/middleyards"></el-tab-pane>
                            <el-tab-pane label="二码" name="/lottery/twoyards"></el-tab-pane>
                            <el-tab-pane label="定位胆" name="/lottery/location"></el-tab-pane>
                            <el-tab-pane label="不定胆" name="/lottery/nolacation"></el-tab-pane>
                            <el-tab-pane label="大小单双" name="/lottery/singledouble"></el-tab-pane>
                            <el-tab-pane label="趣味" name="/lottery/interest"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="special_play"><button>特殊玩法</button></div>
                    <div class="lottery_content">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>

    <section class="add_varieties">
        <el-dialog
        :visible.sync="varyActive"
        width="60%"
        center>
        <div slot="title">添加常玩彩种</div>
        <div class="varieties_content">
            <div class="varieties_left">
                <div class="separation">分分彩:</div>
                <div class="horse_racing">PK10/赛马:</div>
                <div class="time_honored">时时彩/基诺彩:</div>
                <div class="slect_five">11选5:</div>
                <div class="frequency">低频彩:</div>
            </div>
            <div class="varieties_right">
                <div class="separation_right">
                    <ul>
                        <li v-for="(item,index) in separation_list"><input type="radio" v-model="item.active" @click="separationMeans(index,'separation_list')"/><span>{{item.title}}</span></li>
                    </ul>
                </div>
                <div class="horse_racing_right">
                    <ul>
                        <li v-for="(item,index) in horse_list"><input type="radio" v-model="item.active" @click="separationMeans(index,'horse_list')"/><span>{{item.title}}</span></li>
                    </ul>
                </div>
                <div class="time_honored_right">
                    <ul>
                        <li v-for="(item,index) in time_list"><input type="radio" v-model="item.active" @click="separationMeans(index,'time_list')"/><span>{{item.title}}</span></li>
                    </ul>
                </div>
                <div class="slect_five_right">
                    <ul>
                        <li v-for="(item,index) in five_list"><input type="radio" v-model="item.active" @click="separationMeans(index,'five_list')"/><span>{{item.title}}</span></li>
                    </ul>
                </div>
                <div class="frequency_right">
                    <ul>
                        <li v-for="(item,index) in frequency_list"><input type="radio" v-model="item.active" @click="separationMeans(index,'frequency_list')"/><span>{{item.title}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <div><span>温馨提示:</span><span>最多可选10个彩种</span></div>
            <button @click="determine">确认</button>
            <button @click="emptyList">清空</button>
        </div>
        </el-dialog>
    </section>

</section>
</template>

<script>
    export default{
        data(){
            return{
                record_list: [
                    {stage: '0314-201期',number: [5,5,0,0,9],configuration: '组六'},
                    {stage: '0314-200期',number: [3,4,9,5,3],configuration: '组三'},
                    {stage: '0314-199期',number: [4,4,5,1,1],configuration: '组六'},
                    {stage: '0314-198期',number: [7,4,4,2,5],configuration: '组六'},
                    {stage: '0314-197期',number: [8,9,9,5,4],configuration: '组三'},
                    {stage: '0314-196期',number: [1,1,5,5,5],configuration: '组六'},
                    {stage: '0314-195期',number: [6,6,5,4,5],configuration: '组三'},
                ],
                activeName: '/lottery/afteryards',
                varyActive: true,//添加彩种
                separation_list: [//分分彩
                    {title: '河内五分彩',active: false},
                    {title: '泰国300秒',active: false},
                    {title: '河内1分彩',active: false},
                    {title: '泰国秒秒彩',active: false},
                    {title: '腾讯分分彩',active: false},
                    {title: '瑞典1分彩',active: false},
                    {title: '多彩腾讯30秒',active: false},
                    {title: '瑞典2分彩',active: false},
                    {title: '多彩重庆30秒',active: false},
                    {title: '西贡分分彩',active: false},
                    {title: '加拿大30秒',active: false},
                    {title: '日本分分彩',active: false},
                    {title: '泰国60秒',active: false},
                    {title: '印尼分分彩',active: false},
                    {title: '加拿大3D',active: false}
                ],
                horse_list: [//赛马
                    {title: '幸运飞艇',active: false},
                    {title: '北京PK10',active: false},
                    {title: '意大利PK10',active: false},
                    {title: '新西兰赛马',active: false}
                ],
                time_list: [//时时彩
                    {title: '重庆时时彩',active: false},
                    {title: '新疆时时彩',active: false},
                    {title: '天津时时彩',active: false}
                ],
                five_list: [//11选5
                    {title: '广东11选5',active: false},
                    {title: '泰国11选5',active: false},
                    {title: '江西11选5',active: false},
                    {title: '加拿大11选5',active: false}
                ],
                frequency_list: [//低频3
                    {title: '排序3',active: false}
                ]

            }
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.$router.push({path: tab.name});
            },
            addVary(){
                this.varyActive = true;
                console.log('ioo',this.varyActive);
            },
            //确定
            determine(){
                this.varyActive = false;
            },
            //取消
            cancelChange(){
                this.varyActive = false;
            },
            //添加彩种
            separationMeans(index,res){
                if(this[res][index].active == false){
                    this[res][index].active = true;
                }else{
                    this[res][index].active = false;
                }
            },
            //清空
            emptyList(){
                var newArr = ['separation_list','horse_list','time_list','five_list','frequency_list'];
                for(let k=0;k<newArr.length;k++){
                    for(let i=0;i<this[newArr[k]].length;i++){
                        this[newArr[k]][i].active = false;
                    }
                }
        
            }
        }
    }
</script>

<style lang="less" scoped>
#lottery{
    width: 100%;
    min-height: 750px;
    .example{
        width: 1470px;
        height: 715px;
        margin: 0 auto;
        padding-top: 15px;
        box-sizing: border-box;
        .example_left{
            .mixin_float(210px,700px,left);
            position: relative;
            .color_variety{
                width: 165px;
                height: 150px;
                border-radius: 4px;
                border: 1px solid #e7c86b;
                position: absolute;
                left: 0px;
                top: 0px;
                .collection{
                    .mixin_button(100%,40px,#c19937,#f0fbff);
                    border-radius: 0px;
                }
                .modify_variety{
                    .mixin_button(145px,35px,#c19937,#f0fbff);
                    margin: 15px 10px;
                }
                .hidden_menu{
                    .mixin_button(100%,40px,none,#393021);
                    border-top: 1px solid #725d1c;
                }
            }
            .trend{
                width: 27px;
                height: 78px;
                background: #c19937;
                color: #f0fbff;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                padding: 8px 6px;
                box-sizing: border-box;
                position: absolute;
                right: 0px;
                top: 0px;
                ul{
                    li{
                        width: 13px;
                        height: 15px;
                    }
                }
            }
        }
        .example_right{
            .mixin_float(1050px,700px,left);
            border-top: 1px solid #f3b2ac;
            border-bottom: 1px solid #d45a4f;
            border-left: 1px solid #bf9c38;
            border-right: 1px solid #f4bab6;
            .winning_news{
                .mixin_float(315px,700px,left);
                .winning_prize{
                    width: 100%;
                    height: 165px;
                    position: relative;
                    .position_prize{
                        width: 170px;
                        height: 60px;
                        position: absolute;
                        left: 0px;
                        top: 0px;
                    }
                    .loudsspeaker_message{
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        left: 205px;
                        top: 10px;
                    }
                    .winning_reminder{
                        .mixin_div(75px,20px,#ffc32d,#f7f5e9,center);
                        border-radius: 8px;
                        font-size: 12px;
                        font-weight: 600;
                        position: absolute;
                        left: 228px;
                        top: 10px;
                    }
                    .quarter{
                        .mixin_div(135px,20px,none,#c41929,center);
                        position: absolute;
                        left: 180px;
                        top: 38px;
                        span{
                            color: #000000;
                            margin: 0px 3px;
                        }
                    }
                    .current_quarter{
                        .mixin_div(200px,20px,none,#c41929,left);
                        position: absolute;
                        left: 10px;
                        top: 135px;
                        span{
                            color: #000000;
                            margin: 0px 3px;
                        }
                    }
                    .prize_number{
                        width: 100%;
                        height: 40px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        position: absolute;
                        left: 0px;
                        top: 68px;
                        ul{
                            li{
                                .mixin_float(40px,40px,left);
                                border-radius: 50%;
                                margin-right: 15px;
                                .mixin_image(url('../../../static/lottery/lottery3.png'));
                            }
                        }
                    }
                    .quarter_time{
                        .mixin_div(85px,28px,#cf3034,#f4ffff,center);
                        border-radius: 4px;
                        position: absolute;
                        left: 220px;
                        top: 130px;
                    }
                }
                .near_future{
                    width: 100%;
                    height: 20px;
                    position: relative;
                    span{
                        .mixin_span(295px,100%,none,auto,center);
                        border-bottom: 1px dashed #d5d4d9;
                        position: absolute;
                        left: 10px;
                        top: 0px;
                    }
                    button{
                        .mixin_button(68px,22px,#e2e2e2,#373737);
                        cursor: none;
                        border: 1px solid #dadada;
                        position: absolute;
                        left: 125px;
                        top: 10px;
                        font-size: 12px;
                    }
                }
                .near_record{
                    width: 100%;
                    height: 235px;
                    margin-top: 25px;
                    .mixin_record(){
                        height: 30px;
                        float: left;
                        text-align: center;
                        line-height: 30px;
                        margin-bottom: 2px;
                    }
                    .record_head{
                        width: 100%;
                        height: 30px;
                        padding: 0px 15px 0px 10px;
                        box-sizing: border-box;
                        ul{
                            li:nth-of-type(1){
                                .mixin_record();
                                width: 30%;
                            }
                            li:nth-of-type(2){
                                .mixin_record();
                                width: 40%;
                            }
                            li:nth-of-type(3){
                                .mixin_record();
                                width: 30%;
                            }
                        }
                    }
                    .record_river{
                        width: 100%;
                        height: 190px;
                        overflow: auto;
                        padding-left: 10px;
                        box-sizing: border-box;
                        ul{
                            li:nth-of-type(1){
                                .mixin_record();
                                width: 30%;
                                text-align: left;
                            }
                            li:nth-of-type(2){
                                .mixin_record();
                                width: 40%;
                                .record_span(){
                                    .mixin_span(12px,19px,none,auto,center);
                                    float: left;
                                }
                                .record_honey(){
                                    .mixin_span(19px,19px,#d12e31,#f9fcff,center);
                                    border-radius: 50%;
                                    float: left;
                                    margin-right: 2px;
                                }
                                .honey{
                                    width: 105px;
                                    height: 30px;
                                    margin: 0 auto;
                                    padding-top: 5px;
                                    box-sizing: border-box;
                                    span:nth-of-type(1){
                                        .record_honey();
                                    }
                                    span:nth-of-type(2){
                                        .record_honey();
                                    }
                                    span:nth-of-type(3){
                                        .record_honey();
                                    }
                                    span:nth-of-type(4){
                                        .record_honey();
                                    }
                                    span:nth-of-type(5){
                                        .record_honey();
                                        margin-right: 0px;
                                    }
                                }
                                .praise{
                                    width: 60px;
                                    height: 30px;
                                    margin: 0 auto;
                                    padding-top: 5px;
                                    box-sizing: border-box;
                                    span:nth-of-type(1){
                                        .record_span();
                                        background: #e7e7e7;
                                    }
                                    span:nth-of-type(2){
                                        .record_span();
                                        background: #e7e7e7;
                                    }
                                    span:nth-of-type(3){
                                        .record_span();
                                        color: #c00f1f;
                                    }
                                    span:nth-of-type(4){
                                        .record_span();
                                        color: #c00f1f;
                                    }
                                    span:nth-of-type(5){
                                        .record_span();
                                        color: #c00f1f;
                                    }
                                }
                                
                            }
                            li:nth-of-type(3){
                                .mixin_record();
                                width: 30%;
                            }
                        }
                    }
                }

                .betting_record{
                    width: 100%;
                    height: 200px;
                    margin-top: 25px;
                    .mixin_river(){
                        height: 30px;
                        float: left;
                        text-align: center;
                        line-height: 30px;
                        margin-bottom: 2px;
                    }
                    .betting_head{
                        width: 100%;
                        height: 30px;
                        padding: 0px 15px 0px 10px;
                        box-sizing: border-box;
                        ul{
                            li:nth-of-type(1){
                                .mixin_river();
                                width: 25%;
                                text-align: left;
                            }
                            li:nth-of-type(2){
                                .mixin_river();
                                width: 25%;
                                
                            }
                            li:nth-of-type(3){
                                .mixin_river();
                                width: 25%;
                            }
                            li:nth-of-type(4){
                                .mixin_river();
                                width: 25%;
                            }
                        }
                    }
                    .betting_river{
                        width: 100%;
                        height: 160px;
                        overflow: auto;
                        padding-left: 10px;
                        box-sizing: border-box;
                        ul{
                            li:nth-of-type(1){
                                .mixin_river();
                                width: 25%;
                                text-align: left;
                            }
                            li:nth-of-type(2){
                                .mixin_river();
                                width: 25%;
                                
                            }
                            li:nth-of-type(3){
                                .mixin_river();
                                width: 25%;
                            }
                            li:nth-of-type(4){
                                .mixin_river();
                                width: 25%;
                            }
                        }
                    }
                }


            }
            .lottery_type{
                .mixin_float(733px,700px,right);
                padding: 0px 0px 0px 10px;
                box-sizing: border-box;
                .lottery_tabs{
                    width: 100%;
                    height: 40px;
                }
                .special_play{
                    width: 100%;
                    height: 10px;
                    position: relative;
                    button{
                        .mixin_button(70px,25px,#ffbd36,#f6f7ff);
                        position: absolute;
                        right: 10px;
                        top: -33px;
                    }
                }
                .lottery_content{
                    width: 100%;
                    height: 650px;
                }
            }
        }
    }


// 添加彩票
    .add_varieties{
        .varieties_content{
            width: 100%;
            height: 370px;
            .varieties_left{
                .mixin_float(16%,370px,left);
                .mixin_title(){
                    font-size: 14px;
                    font-weight: 600;
                    padding-right: 15px;
                    box-sizing: border-box;
                }
                .separation{
                    .mixin_div(100%,140px,none,#ce0000,right);
                    .mixin_title();
                    line-height: 40px;
                }
                .horse_racing,.time_honored,.slect_five,.frequency{
                    .mixin_div(100%,55px,none,#ce0000,right);
                    .mixin_title();
                }
            }
            .varieties_right{
                .mixin_float(84%,370px,right);
                .separation_right{
                    .mixin_div(100%,140px,none,#010101,left);
                    line-height: normal;
                    border-bottom: 1px dashed #c9c9c9;
                    padding: 0px 15px 0px 10px;
                    box-sizing: border-box;
                    ul{
                        li{
                            .mixin_li(20%,40px);
                            text-align: left;
                            margin-bottom: 3px;
                            input{
                                .mixin_input(14px,14px);
                                margin-right: 8px;
                            }
                        }
                    }
                }
                .horse_racing_right,.time_honored_right,.slect_five_right,.frequency_right{
                    .mixin_div(100%,55px,none,#010101,left);
                    border-bottom: 1px dashed #c9c9c9;
                    padding: 0px 15px 0px 10px;
                    box-sizing: border-box;
                    ul{
                        li{
                            .mixin_li(20%,40px);
                            text-align: left;
                            margin-top: 5px;
                            input{
                                .mixin_input(14px,14px);
                                margin-right: 8px;
                            }
                        }
                    }
                }
            }
        }
        .dialog-footer{
            .mixin_div(100%,40px,none,auto,left);
            padding: 0px 20px;
            box-sizing: border-box;
            div:nth-of-type(1){
                .mixin_div(38%,38px,none,#969696,left);
                float: left;
                span:nth-of-type(2){
                    margin-left: 4px;
                }
            }
            button:nth-of-type(1){
                .mixin_button(155px,38px,#cc9727,@color_white);
                float: left;
            }
            button:nth-of-type(2){
                .mixin_button(48px,38px,none,#0e0e0e);
                float: left;
                margin-left: 20px;
            }
        }
    }




}
</style>