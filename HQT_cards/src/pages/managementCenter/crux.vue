<template>
    <section id="crux">
        <div class="personal_information">
            <div class="information_left">
                <div class="user_title">个人信息</div>
                <div class="user_contain">
                    <div class="user_info">
                        <img src="../../../static/lottery/user1.png"/>
                        <span v-if="player_info">{{player_info.playerInfo.nickname}}</span>
                    </div>
                    <div class="account_balance"><label>账户余额:</label><span v-if="player_info">{{player_info.money}}</span><span>充值</span></div>
                    <div class="nickname">
                        <label>昵称:</label>
                        <span v-if="!nickname_state">{{player_info.playerInfo.nickname}}</span><i v-if="!nickname_state" class="el-icon-edit" @click="nickname_state = true"></i>
                        <input type="text" v-if="nickname_state" placeholder="请输入昵称" v-model="nickname"/>
                        <button v-if="nickname_state" @click="nickname_determine">确定</button>
                    </div>
                    <div class="reserve">
                        <label>预留信息:</label>
                        <span v-if="!reserve_state">建议填写</span><i v-if="!reserve_state" class="el-icon-edit" @click="reserve_state = true"></i>
                        <input type="text" v-if="reserve_state" placeholder="请输入预留信息"/>
                        <button v-if="reserve_state" @click="reverse_determine">确定</button>
                    </div>
                    <div class="return_point"><label>彩票返点:</label><span>7.8%</span><span>彩票信息</span></div>
                    <div class="gear_position"><label>棋牌档位:</label><span>50%</span><span>棋牌信息</span></div>
                </div>
            </div>

            <div class="information_right">
                <div class="balance_contain">

                    <div class="balance_list" v-for="(item,index) in balance_list" :class="{'margin_active':index==1||index==3}">
                        <div class="theme">
                            <div class="theme_left">{{item.theme}}</div>
                            <div class="theme_right">{{item.balance_title}}</div>
                        </div>
                        <div class="balance_info">
                            <div class="count">
                                <div class="count_left"><span v-if="item.money==''">用户尚未加入游戏</span><span v-else>{{item.money}}</span></div>
                                <div class="count_right"><i class="el-icon-refresh"></i></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="payment">
                    <button v-for="(item,index) in pay_btn" @click="payMeans(index)"><i style="margin-right: 10px;" class="el-icon-picture-outline-round"></i>{{item.title}}</button>
                </div>
            </div>
        </div>

        <div class="archives">
            <div class="archives_list" v-for="(item,index) in archives_list" :class="{'archives_margin': index==0||index==2||index==4}">
                <div class="archives_header"></div>
                <div class="archives_contain">
                    <img :src="item.url"/>
                    <span>{{item.theme}}</span>
                    <span>{{item.explain}}</span>
                    <span>{{item.modify}}</span>
                </div>
            </div>
        </div>

        <recharge ref="recharge"></recharge>
    </section>
</template>

<script>
import recharge from '../../components/recharge.vue';
export default{
    name: 'parent',
    components: {recharge},
    data(){
        return{
            nickname_state: false,
            reserve_state: false,
            balance_list: [
                {theme: '彩',balance_title: '彩票余额',money: '0.000'},
                {theme: 'PT',balance_title: 'PT余额',money: '0.000'},
                {theme: 'AG',balance_title: 'AG余额',money: '0.000'},
                {theme: 'BB',balance_title: 'BBIN余额',money: '0.000'},
                {theme: '沙',balance_title: '沙巴余额',money: ''},
                {theme: '宝',balance_title: '七宝棋牌',money: '0.000'}
            ],
            pay_btn: [{title: '充值'},{title: '提款'},{title: '转账'},{title: '转账记录'}],
            archives_list: [
                {theme: '登陆密码',explain: '6-16个字符',modify: '修改登录密码',url: '../../../static/lottery/user2.png'},
                {theme: '绑定银行卡',explain: '最多可绑定5张银行卡',modify: '绑定银行卡',url: '../../../static/lottery/user2.png'},
                {theme: '提款密码',explain: '6-16个字符',modify: '设置提款密码',url: '../../../static/lottery/user2.png'},
                {theme: '站内信',explain: '0条未读',modify: '查看站内信',url: '../../../static/lottery/user2.png'},
                {theme: '密保设定',explain: '用于找回密码',modify: '修改密保设定',url: '../../../static/lottery/user2.png'},
                {theme: '公告',explain: '请随时关注最新广告',modify: '查看广告',url: '../../../static/lottery/user2.png'}
            ],
            player_info: '',
            nickname: ''
        }
    },
    created(){
        if('undefined' != typeof web){
            this.player_info = web.game_getPlayer();
            this.nickname = this.player_info.playerInfo.nickname;
            console.log('home====',this.player_info);
        }
    },
    methods:{
        nickname_determine(){
            this.nickname_state = false;
        },
        reverse_determine(){
            this.reserve_state = false
        },
        payMeans(index){
            if(index==0){
                this.$refs.recharge.changeMeans();
            }
        }
    }
}
</script>

<style lang="less" scoped>
#crux{
    width: 100%;
    height: 100%;
    .personal_information{
        width: 100%;
        height: 400px;
        .information_left{
            .mixin_float(310px,100%,left);
            .user_title{
                border-top: 3px solid #8bc6ee;
                .mixin_div(100%,70px,#2C4564,@color_white,left);
                text-indent: 20px;
                font-weight: 600;
                font-size: 16px;
            }
            .user_contain{
                .mixin_div(100%,330px,#243851,auto,left);
                padding: 0px 20px;
                box-sizing: border-box;
                .user_info{
                    .mixin_div(100%,150px,none,auto,left);
                    position: relative;
                    img{
                        .mixin_img(100px,100px);
                        position: absolute;
                        left: 50%;
                        top: 5px;
                        margin-left: -50px;
                    }
                    span{
                        .mixin_span(100%,30px,none,@color_white,center);
                        position: absolute;
                        top: 105px;
                    }
                }
                .account_balance,.nickname,.reserve,.return_point,.gear_position{
                    .mixin_div(100%,30px,none,auto,left);
                    margin-bottom: 4px;
                    label{
                        .mixin_span(auto,30px,none,@color_lightblue,center);
                        margin-right: 10px;
                    }
                }
                .account_balance{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,#40dd38,center);
                        font-size: 22px;
                        font-weight: 600;
                    }
                    span:nth-of-type(2){
                        .mixin_span(auto,30px,none,@color_white,center);
                        float: right;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
                .nickname,.reserve{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,@color_lightblue,center);
                    }
                    i{
                        color: @color_white;
                        margin-left: 30px;
                        cursor: pointer;
                    }
                    input{
                        .mixin_input(120px,20px);
                        border: 1px solid #209fec;
                        background: #000000;
                        color: #edebf0;
                        vertical-align: middle;
                        border-radius: 0px;
                    }
                    button{
                        .mixin_button(40px,20px,#276699,#edebf0);
                        border: 1px solid #209fec;
                        font-size: 12px;
                        border-radius: 0px;
                        margin-left: 20px;
                    }
                }
                .return_point,.gear_position{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,#e52346,center);
                    }
                    span:nth-of-type(2){
                        .mixin_span(auto,30px,none,#e52346,center);
                        float: right;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
            
        }
        .information_right{
            .mixin_float(530px,100%,right);
            .balance_contain{
                .mixin_div(100%,365px,none,auto,left);
                .balance_list{
                        .mixin_float(250px,110px,left);
                        border-top: 3px solid #8bc6ee;
                        margin: 0px 0px 10px 10px;
                        .theme{
                            width: 100%;
                            height: 40px;
                            background: #2C4564;
                            padding: 0px 10px 0px 10px;
                            box-sizing: border-box;
                            .theme_left{
                                .mixin_div(50%,40px,none,#8cc3ec,left);
                                float: left;
                                font-weight: 600;
                            }
                            .theme_right{
                                .mixin_div(50%,40px,none,#f5fdff,right);
                                float: right;
                            }
                        }
                        .balance_info{
                            width: 100%;
                            height: 70px;
                            background: #243851;
                            position: relative;
                            .count{
                                width: 190px;
                                height: 30px;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin: -15px 0px 0px -125px;
                                .count_left{
                                    .mixin_div(160px,30px,none,#f5fdff,center);
                                    float: left;
                                    font-weight: 600;
                                }
                                .count_right{
                                    .mixin_div(30px,30px,none,#f5fdff,center);
                                    float: right;
                                }
                            }
                        }
                    }


            }
            .payment{
                width: 100%;
                height: 35px;
                button{
                    .mixin_button(120px,35px,#219fed,@color_white);
                    border: 1px solid #209fec;
                    float: left;
                    margin: 0px 0px 0px 10px;
                }
            }
        }
    }

    .archives{
        .mixin_div(100%,480px,none,auto,left);
        margin-top: 30px;
        .archives_margin{
            margin-right: 10px;
        }
        .archives_list{
            .mixin_div(410px,145px,none,auto,left);
            float: left;
            margin-bottom: 10px;
            .archives_header{
                .mixin_div(100%,45px,#2c4564,auto,left);
                border-top: 3px solid #8bc6ee;
            }
            .archives_contain{
                .mixin_div(100%,95px,#243851,auto,left);
                position: relative;
                img{
                    .mixin_img(55px,55px);
                    position: absolute;
                    left: 20px;
                    top: 18px;
                }
                span:nth-of-type(1){
                    .mixin_span(120px,25px,none,@color_white,left);
                    position: absolute;
                    left: 100px;
                    top: 20px;
                }
                span:nth-of-type(2){
                    .mixin_span(120px,25px,none,@color_lightblue,left);
                    position: absolute;
                    left: 100px;
                    top: 45px;
                }
                span:nth-of-type(3){
                    .mixin_span(auto,25px,none,#ec2449,right);
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>