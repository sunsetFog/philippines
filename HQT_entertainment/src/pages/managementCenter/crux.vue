<template>
    <section id="crux">
        <div class="personal_information">
            <div class="information_left">
                <div class="user_title">个人信息</div>
                <div class="user_contain">
                    <div class="user_info">
                        <img src="../../../static/dream/center/user1.png"/>
                        <span v-if="player_info">{{player_info.playerInfo.nickname}}</span>
                    </div>
                    <div class="account_balance"><label>账户余额:</label>
                    <span v-if="player_info"><img v-for="(item,index) in number_money" :src="number_count[item].url"/></span>
                    <span>充值</span></div>
                    <div class="nickname">
                        <label>昵称:</label>
                        <span v-if="!nickname_state">{{player_info.playerInfo.nickname}}</span><i v-if="!nickname_state" class="el-icon-edit" @click="nickname_state = true"></i>
                        <input type="text" v-if="nickname_state" placeholder="请输入昵称" v-model="nickname"/>
                        <button v-if="nickname_state" @click="nickname_determine">确定</button>
                    </div>
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
                                <div class="count_left"><span class="not_joined" v-if="item.money==''">用户尚未加入游戏</span><span v-else>{{item.money}}</span></div>
                                <div class="count_right"><img src="../../../static/dream/center/yue.png"/></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="payment">
                    <button v-for="(item,index) in pay_btn" @click="payMeans(index)">
                        <img v-if="index!=3" :src="item.url"/>
                        {{item.title}}
                        <i v-if="index==3" class="el-icon-d-arrow-right"></i>
                    </button>
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
                    <span @click="archivesMeans(index)">{{item.modify}}</span>
                </div>
            </div>
        </div>

        <recharge ref="recharge"></recharge>
        <binding-bank ref="banks"></binding-bank>
        <add-bank ref="adds"></add-bank>
    </section>
</template>

<script>
import recharge from '../../components/recharge.vue';
import bindingBank from '../../components/bindingBank.vue';
import addBank from '../../components/addBank.vue';
export default{
    name: 'parent',
    components: {recharge,bindingBank,addBank},
    data(){
        return{
            nickname_state: false,
            balance_list: [
                {theme: '彩',balance_title: '彩票余额',money: '0.000'},
                {theme: '彩',balance_title: '彩票余额',money: '0.000'},
                {theme: '彩',balance_title: '彩票余额',money: '0.000'},
                {theme: '彩',balance_title: '彩票余额',money: '0.000'},
                {theme: '彩',balance_title: '彩票余额',money: ''},
                {theme: '彩',balance_title: '彩票余额',money: '0.000'}
            ],
            pay_btn: [
                {title: '充值',url: '../../../static/dream/center/chongzhi.png'},
                {title: '提款',url: '../../../static/dream/center/tikuan.png'},
                {title: '转账',url: '../../../static/dream/center/zhuanzhang.png'},
                {title: '转账记录',url: ''}
            ],
            archives_list: [
                {theme: '登陆密码',explain: '6-16个字符',modify: '修改登录密码',url: '../../../static/dream/center/denglu.png'},
                {theme: '绑定银行卡',explain: '最多可绑定5张银行卡',modify: '绑定银行卡',url: '../../../static/dream/center/yinhangka.png'},
                {theme: '提款密码',explain: '6-16个字符',modify: '设置提款密码',url: '../../../static/dream/center/tikuanmima.png'},
                {theme: '站内信',explain: '0条未读',modify: '查看站内信',url: '../../../static/dream/center/zhanneixin.png'},
                {theme: '密保设定',explain: '用于找回密码',modify: '修改密保设定',url: '../../../static/dream/center/baomi.png'},
                {theme: '公告',explain: '请随时关注最新广告',modify: '查看广告',url: '../../../static/dream/center/xinxi.png'}
            ],
            player_info: '',
            nickname: '',
            number_count: [
                {url: '../../../static/dream/center/0.png'},
                {url: '../../../static/dream/center/1.png'},
                {url: '../../../static/dream/center/2.png'},
                {url: '../../../static/dream/center/3.png'},
                {url: '../../../static/dream/center/4.png'},
                {url: '../../../static/dream/center/5.png'},
                {url: '../../../static/dream/center/6.png'},
                {url: '../../../static/dream/center/7.png'},
                {url: '../../../static/dream/center/8.png'},
                {url: '../../../static/dream/center/9.png'},
                {url: '../../../static/dream/center/dian.png'}
            ],
            number_money: []
        }
    },
    created(){
        if('undefined' != typeof web){
            this.player_info = web.game_getPlayer();
            this.nickname = this.player_info.playerInfo.nickname;
            // this.player_info.money = 65960.08;
            this.number_money = this.player_info.money.toString().split('');
            for(let i=0;i<this.number_money.length;i++){
                if(this.number_money[i]=='.'){
                   this.number_money[i] = 10; 
                }
            }
            // console.log('money====',this.number_money);
        }
    },
    methods:{
        nickname_determine(){
            this.nickname_state = false;
        },
        payMeans(index){
            if(index==0){
                this.$refs.recharge.changeMeans();
            }
        },
        archivesMeans(index){
            if(index==1){
                this.$refs.banks.changeMeans();
            }
        },
        parentsMeans(){
            this.$refs.adds.changeMeans();
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
            .mixin_float(36.9%,100%,left);
            .user_title{
                border-top: 7px solid @color_blueviolet;
                .mixin_div(100%,70px,@color_darkgray,@color_gray,left);
                text-indent: 20px;
                font-size: @font_size20;
                line-height: 60px;
            }
            .user_contain{
                .mixin_div(100%,330px,@color_purple,@color_white,left);
                padding: 0px 20px;
                box-sizing: border-box;
                .user_info{
                    .mixin_div(100%,150px,none,@color_white,left);
                    position: relative;
                    img{
                        .mixin_img(95px,95px);
                        border-radius: 50%;
                        border: 3px solid @color_blueviolet;
                        position: absolute;
                        left: 50%;
                        top: 5px;
                        margin-left: -47.5px;
                    }
                    span{
                        .mixin_span(100%,30px,none,@color_white,center);
                        position: absolute;
                        top: 105px;
                        font-weight: 600;
                        font-size: @font_size18;
                    }
                }
                .account_balance,.nickname,.gear_position{
                    .mixin_div(100%,30px,none,@color_white,left);
                    margin-bottom: 10px;
                    font-size: @font_size16;
                    label{
                        .mixin_span(auto,30px,none,@color_gray,center);
                        margin-right: 10px;
                        float: left;
                    }
                }
                .account_balance{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,@color_white,center);
                        padding-top: 5px;
                        box-sizing: border-box;
                        float: left;
                        img{
                            .mixin_img(15px,20px);
                            float: left;
                        }
                    }
                    span:nth-of-type(2){
                        .mixin_span(auto,30px,none,@color_gray,center);
                        float: right;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
                .nickname{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,@color_gray,center);
                    }
                    i{
                        color: @color_white;
                        margin-left: 30px;
                        cursor: pointer;
                    }
                    input{
                        .mixin_input(150px,28px);
                        border: 1px solid @color_blueviolet;
                        background: @color_indigo;
                        color: @color_gray;
                        vertical-align: middle;
                        float: left;
                        margin-top: 1px;
                    }
                    button{
                        .mixin_button(40px,28px,@color_indigo,@color_gray);
                        border: 1px solid @color_blueviolet;
                        font-size: 12px;
                        margin-left: 20px;
                        float: left;
                        margin-top: 1px;
                    }
                }
                .gear_position{
                    span:nth-of-type(1){
                        .mixin_span(auto,30px,none,@color_blueviolet,center);
                    }
                    span:nth-of-type(2){
                        .mixin_span(auto,30px,none,@color_blueviolet,center);
                        float: right;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
            
        }
        .information_right{
            .mixin_float(63.1%,100%,right);
            .balance_contain{
                .mixin_div(100%,365px,none,auto,left);
                .balance_list{
                        .mixin_float(47.16%,110px,left);
                        border-top: 7px solid @color_blueviolet;
                        margin: 0px 0px 10px 10px;
                        .theme{
                            width: 100%;
                            height: 40px;
                            background: @color_darkgray;
                            padding: 0px 10px 0px 10px;
                            box-sizing: border-box;
                            .theme_left{
                                .mixin_div(50%,40px,none,@color_blueviolet,left);
                                float: left;
                                font-weight: 600;
                                font-size: 22px;
                            }
                            .theme_right{
                                .mixin_div(50%,40px,none,@color_gray,right);
                                float: right;
                                font-size: @font_size16;
                            }
                        }
                        .balance_info{
                            width: 100%;
                            height: 70px;
                            background: @color_purple;
                            position: relative;
                            .count{
                                width: 190px;
                                height: 30px;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin: -15px 0px 0px -125px;
                                .count_left{
                                    .mixin_div(160px,30px,none,@color_white,center);
                                    float: left;
                                    font-weight: 600;
                                    font-size: 26px;
                                    .not_joined{
                                        color: @color_gray;
                                        font-size: 14px;
                                        font-weight: 0;
                                    }
                                }
                                .count_right{
                                    .mixin_div(30px,30px,none,@color_white,center);
                                    float: right;
                                    img{
                                        .mixin_img(20px,20px);
                                    }
                                }
                            }
                        }
                    }


            }
            .payment{
                width: 100%;
                height: 35px;
                button{
                    .mixin_button(22.64%,35px,@color_yellow,@color_blueviolet);
                    float: left;
                    margin: 0px 0px 0px 10px;
                    font-size: @font_size16;
                    img{
                        .mixin_img(20px,20px);
                        margin-right: 5px;
                    }
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
            .mixin_div(48.8%,145px,none,auto,left);
            float: left;
            margin-bottom: 10px;
            .archives_header{
                .mixin_div(100%,45px,@color_darkgray,@color_white,left);
                border-top: 7px solid @color_blueviolet;
            }
            .archives_contain{
                .mixin_div(100%,95px,@color_purple,@color_white,left);
                position: relative;
                img{
                    .mixin_img(55px,55px);
                    position: absolute;
                    left: 20px;
                    top: 18px;
                }
                span:nth-of-type(1){
                    .mixin_span(auto,25px,none,@color_white,left);
                    font-size: @font_size20;
                    position: absolute;
                    left: 100px;
                    top: 20px;
                }
                span:nth-of-type(2){
                    .mixin_span(auto,25px,none,@color_dimgray,left);
                    font-size: @font_size16;
                    position: absolute;
                    left: 100px;
                    top: 45px;
                }
                span:nth-of-type(3){
                    .mixin_span(auto,25px,none,@color_blueviolet,right);
                    font-size: @font_size16;
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