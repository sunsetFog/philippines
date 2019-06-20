<template>
    <section id="addBank">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">绑定银行卡</div>
        <div class="varieties_content">
            <div class="example_contain">
                <div class="bank_header">
                    <ul>
                        <li>用户名</li>
                        <li>开户行</li>
                        <li>卡号</li>
                        <li>绑定时间</li>
                        <li>操作</li>
                    </ul>
                </div>
                <div class="bank_list">
                    <ul v-for="(item,index) in bank_list">
                        <li>{{item.user_name}}</li>
                        <li>{{item.opening_bank}}</li>
                        <li>{{item.card_number}}</li>
                        <li>{{item.binding_time}}</li>
                        <li>重新绑定</li>
                    </ul>
                </div>
            </div>
            <div class="locking_bank">
                <button>增加绑定</button>
                <button>锁定银行卡</button>
            </div>
            <div class="mobile_phone">
                <div class="phone_contain">
                    <label>绑定手机号:</label>
                    <input type="text" placeholder="请输入手机号码"></input>
                    <span>*选填</span>
                    <button>绑定</button>
                </div>
            </div>
            <div class="welfare">电销活动每月会抽出幸运用户给予奖励，请务必填写真实有效号码，支持更多，送你更多！</div>
            <div class="welfare">每个账户只能绑定一个手机号，绑定后无法解绑！</div>
            <div class="account_info" style="margin-top: 120px;">一个账户最多只能绑定<span>5</span>张银行卡</div>
            <div class="account_info">银行卡锁定可以增强账户安全，推荐锁定(如:账户被他人盗用后，用于锁定的限制，你的账户资金不会被他人提款)</div>
            <div class="account_info">银行卡锁定后，不能增加新银行卡绑定，自身不能解绑和解锁银行卡，联系你的上级申请解锁</div>
        </div>
        <div slot="footer" class="example_footer">

        </div>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'children',
    data(){
        return{
            rechargeActive: false,
            bank_list: [
                {user_name: 'numenslp',opening_bank: '中国招商银行',card_number: '*************4277',binding_time: '2019-04-04 15:18:19'}
            ]
        }
    },
    methods:{
        changeMeans(){
            this.rechargeActive = true;
        }
    }
}
</script>

<style lang="less" scoped>
#addBank{
    .varieties_content{
        width: 100%;
        min-height: 670px;
        .example_contain{
            width: 100%;
            min-height: 140px;
            border: 1px solid @color_blueviolet;
            border-radius: 4px;
            padding-bottom: 2px;
            box-sizing: border-box;
            .bank_header{
                .mixin_div(100%,68px,@color_indigo,@color_white,left);
                ul{
                    li{
                        .mixin_li(auto,68px);
                    }
                    li:nth-of-type(1){
                        width: 20%;
                    }
                    li:nth-of-type(2){
                        width: 20%;
                    }
                    li:nth-of-type(3){
                        width: 22%;
                    }
                    li:nth-of-type(4){
                        width: 22%;
                    }
                    li:nth-of-type(5){
                        width: 16%;
                    }
                }
            }
            .bank_list{
                .mixin_div(100%,70px,none,@color_white,left);
                ul{
                    li{
                        .mixin_li(auto,70px);
                        border-right: 2px solid @color_indigo;
                    }
                    li:nth-of-type(1){
                        width: 20%;
                    }
                    li:nth-of-type(2){
                        width: 20%;
                    }
                    li:nth-of-type(3){
                        width: 22%;
                    }
                    li:nth-of-type(4){
                        width: 22%;
                    }
                    li:nth-of-type(5){
                        width: 16%;
                        border: none;
                        color: #f61a0e;
                    }
                }
            }
        }
        .locking_bank{
            width: 100%;
            height: 36px;
            margin-top: 40px;
            position: relative;
            button:nth-of-type(1){
                .mixin_button(110px,34px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                position: absolute;
                left: 300px;
                top: 0px;
            }
            button:nth-of-type(1):hover{
                background: @color_white2_hover;
            }
            button:nth-of-type(2){
                .mixin_button(110px,34px,@color_indigo,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                position: absolute;
                left: 600px;
                top: 0px;
            }
            button:nth-of-type(2):hover{
                background: @color_indigo_hover;
            }
        }
        .mobile_phone{
            width: 100%;
            height: 48px;
            margin: 105px 0px 20px 0px;
            .phone_contain{
                width: 630px;
                height: 100%;
                margin: 0 auto;
                label{
                    .mixin_span(auto,48px,none,@color_white,left);
                    float: left;
                    margin-right: 10px;
                }
                input{
                    .mixin_input(300px,48px);
                    background: @color_indigo;
                    border: 1px solid @color_blueviolet;
                    float: left;
                }
                span{
                    .mixin_span(85px,48px,none,#f61a0e,center);
                    float: left;
                }
                button{
                    .mixin_button(110px,34px,@color_indigo,@color_blueviolet);
                    border: 1px solid @color_blueviolet;
                    float: left;
                    margin-top: 7px;
                }
                button:hover{
                    background: @color_indigo_hover;
                }
            }
        }
        .welfare{
            .mixin_div(100%,30px,none,@color_blueviolet,center);
            margin-top: 2px;
        }
        .account_info{
           .mixin_div(100%,30px,none,@color_dimgray,left);
            span{
                color: #f61a0e;
            }
        }
    }
    .example_footer{
        .mixin_div(100%,0px,none,auto,left);
    }
}
</style>