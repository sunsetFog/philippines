<template>
<section id="lotteryInformation">
    <div class="cards_info">
        <div class="cards_title">彩票信息</div>
        <div class="cards_content">
            <div class="balance">
                <div class="recharge"><span>账户余额:</span><span>50000.00</span><span>充值</span></div>
            </div>
            <div class="gear_position"><span>彩票返点:</span><span>7.8%</span></div>
        </div>
    </div>
    <div class="balance_frame">
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
        <button v-for="(item,index) in pay_btn" :class="{'margin_pay':index==0||index==1||index==2}"><i style="margin-right: 10px;" class="el-icon-picture-outline-round"></i>{{item.title}}</button>
    </div>

</section>
</template>

<script>
export default{
    name: 'lotteryInformation',
    data(){
        return{
            balance_list: [{theme: '沙',balance_title: '沙巴余额',money: ''},{theme: 'PT',balance_title: 'PT余额',money: '0.000'},{theme: 'AG',balance_title: 'AG余额',money: '0.000'},{theme: 'BB',balance_title: 'BBIN余额',money: '0.000'}],
            pay_btn: [{title: '充值'},{title: '提款'},{title: '转账'},{title: '转账记录'}]
        }
    }
}
</script>

<style lang="less" scoped>
#lotteryInformation{
    width: 100%;
    .cards_info{
        width: 100%;
        height: 220px;
        border-top: 3px solid #8bc6ee;
        .cards_title{
            .mixin_div(100%,70px,#2C4564,white,left);
            text-indent: 20px;
            font-weight: 600;
            font-size: 16px;
        }
        .cards_content{
            width: 100%;
            height: 150px;
            background: #243851;
            padding-top: 25px;
            box-sizing: border-box;
            .balance{
                width: 100%;
                height: 30px;
                .recharge{
                    .mixin_float(50%,30px,left);
                    span:nth-of-type(1){
                        color: #99adc8;
                        margin-left: 20px;
                    }
                    span:nth-of-type(2){
                        color: #e9e2e5;
                        margin-left: 15px;
                    }
                    span:nth-of-type(3){
                        color: #10c5f2;
                        margin-left: 15px;
                        text-decoration: underline;
                    }
                }
            }
            .gear_position{
                width: 100%;
                height: 30px;
                margin-top: 30px;
                line-height: 30%;
                span:nth-of-type(1){
                    color: #99adc8;
                    margin-left: 20px;
                }
                span:nth-of-type(2){
                    color: #e9e2e5;
                    margin-left: 15px;
                }
            }
        }
    }
    .balance_frame{
        width: 100%;
        height: 250px;
        margin-top: 15px;
        .margin_active{
            margin: 0px 0px 10px 10px;
        }
        .balance_list{
            .mixin_float(415px,110px,left);
            border-top: 3px solid #8bc6ee;
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
        .margin_pay{
            margin: 0px 15px 0px 0px;
        }
            button{
                .mixin_button(198.75px,35px,#276699,#edebf0);
                border: 1px solid #209fec;
                float: left;
            }
    }


}
</style>