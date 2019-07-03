<template>
    <section id="recharge">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">绑定银行卡</div>
        <div class="varieties_content">
            <div class="processing_time">
                <span>充值处理时间:&nbsp;7*24小时充值服务</span>
                <button>下一步</button>
            </div>
            <div class="rechargeable_blank">
                <span>选择充值银行:</span>
                <span><img src="../../static/dream/bank/gantanhao.png"/></span>
                <span>如选择银行卡转账,请勿使用其他支付方式,否则充值将无法</span>
            </div>
            <div class="payment_method">
                <button v-for="(item,index) in payment_list" :style="{margin: item.margin}" :class="{'payment_active':item.active}" @click="paymentMeans(index)">
                    <span><img :src="item.url"/></span>{{item.title}}
                </button>
            </div>
            <div class="explain">请先绑定银行卡后才可充值，此通道需要收取0.1%的手续费,谢谢</div>
            <div class="bank_card">
                <label>选择付款银行:</label>
                <div class="select_bank">
                        <el-select v-model="agent_profit" placeholder="对不起,请先绑定银行卡" size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                </div>
                <div class="now_bank"><button @click="nowBinding()">现在就绑定银行卡</button></div>
            </div>
            <div class="recharge_jine">
                <label>选择付款银行:</label>
                <div class="recharge_money">
                    <input placeholder="请输入充值金额"></input>
                    <span>元</span>
                </div>
                <div class="recharge_quota">
                    <div>单笔充值限额:最低&nbsp;<span>100</span>,最高<span>40000</span>元</div>
                </div>
            </div>
            <div class="recharge_amount">
                <label>充值金额(人民币):</label>
                <span></span>
            </div>
            <div class="explain">*平台填写金额应当与网银汇款金额完全一致,否则将无法即时到账</div>
        </div>
        <div slot="footer" class="example_footer">
            <button>下一步</button>
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
            payment_list: [
                {title: '大额快充',url: '../../static/dream/bank/bank1.png',margin: '0px 32px 20px 0px',active: true},
                {title: '支付宝直接C',url: '../../static/dream/bank/zhifubao.png',margin: '0px 32px 20px 0px',active: false},
                {title: '聚鑫银联',url: '../../static/dream/bank/bank1.png',margin: '0px 32px 20px 0px',active: false},
                {title: 'HQP银联1',url: '../../static/dream/bank/bank1.png',margin: '0px 0px 20px 0px',active: false},
                {title: 'HQP支付宝S3',url: '../../static/dream/bank/zhifubao.png',margin: '0px 32px 0px 0px',active: false},
                {title: 'HQP支付宝S2',url: '../../static/dream/bank/zhifubao.png',margin: '0px 32px 0px 0px',active: false}
            ],
            options: [{
            value: '选项1',
            label: '50%'
            }, {
            value: '选项2',
            label: '45%'
            }, {
            value: '选项3',
            label: '40%'
            }, {
            value: '选项4',
            label: '35%'
            }, {
            value: '选项5',
            label: '30%'
            }],
            agent_profit: '',
        }
    },
    methods:{
        changeMeans(){
            this.rechargeActive = true;
        },
        paymentMeans(index){
            for(var i=0;i<this.payment_list.length;i++){
                this.payment_list[i].active = false;
            }
            this.payment_list[index].active = true;
        },
        nowBinding(){
            this.$parent.bindMeans();
        }
    }
}
</script>

<style lang="less" scoped>
#recharge{
    .varieties_content{
        width: 100%;
        height: 620px;
        .processing_time{
            width: 100%;
            height: 35px;
            position: relative;
            span{
                .mixin_span(auto,32px,#8c2d91,@color_white,left);
                padding: 0px 10px;
                box-sizing: border-box;
                position: absolute;
                left: 0px;
                top: 0px;
            }
            button{
                .mixin_button(115px,34px,@color_white2,@color_blueviolet);
                position: absolute;
                right: 35px;
                top: 15px;
                border: 1px solid @color_blueviolet;
            }
            button:hover{
                background: @color_white2_hover;
            }
        }
        .rechargeable_blank{
            width: 100%;
            height: 35px;
            margin-top: 12px;
            span:nth-of-type(1){
                .mixin_span(auto,35px,none,@color_white,left);
                margin-right: 60px;
            }
            span:nth-of-type(2){
                .mixin_span(auto,35px,none,@color_white,left);
                margin-right: 5px;
                img{
                    .mixin_img(22px,22px);
                }
            }
            span:nth-of-type(3){
                .mixin_span(auto,35px,none,@color_blueviolet,left);
            }
        }
        .payment_method{
            width: 100%;
            height: 140px;
            margin-top: 10px;
            .payment_active{
                .mixin_image(url('../../static/dream/bank/xuanzhong.png'));
            }
            button{
                .mixin_button(185px,55px,#2c1e37,@color_white);
                text-align: left;
                padding: 0px 0px 0px 10px;
                box-sizing: border-box;
                border: 1px solid #946abc;
                font-size: @font_size16;
                span{
                    .mixin_span(55px,55px,none,@color_white,left);
                    padding-top: 8px;
                    box-sizing: border-box;
                    float: left;
                    img{
                        .mixin_img(36px,36px);
                        float: left;
                    }
                }
            }
        }
        .explain{
            .mixin_div(100%,50px,none,@color_blueviolet,center);
            border-top: 1px solid @color_blueviolet;
            margin-top: 35px;
            line-height: 70px;
        }
        .bank_card{
            width: 100%;
            height: 45px;
            padding: 0px 0px 0px 180px;
            box-sizing: border-box;
            margin-top: 10px;
            label{
                .mixin_span(180px,45px,none,@color_white,right);
                float: left;
            }
            .select_bank{
                .mixin_float(300px,45px,left);
                margin-left: 12px;
            }
            .now_bank{
                .mixin_float(170px,45px,left);
                padding-top: 4px;
                box-sizing: border-box;
                margin-left: 20px;
                button{
                    .mixin_button(auto,34px,@color_white2,@color_blueviolet);
                    padding: 0px 12px;
                    box-sizing: border-box;
                    border: 1px solid @color_blueviolet;
                }
                button:hover{
                    background: @color_white2_hover
                }
            }
        }
        .recharge_jine{
            width: 100%;
            height: 45px;
            padding: 0px 0px 0px 180px;
            box-sizing: border-box;
            margin-top: 25px;
            label{
                .mixin_span(180px,45px,none,@color_white,right);
                float: left;
            }
            .recharge_money{
                .mixin_float(350px,45px,left);
                margin-left: 12px;
                input{
                    .mixin_input(300px,45px);
                    background: @color_indigo;
                    color: #98719b;
                    border: 1px solid @color_blueviolet;
                }
                span{
                    .mixin_span(45px,45px,none,@color_white,center);
                }
            }
            .recharge_quota{
                .mixin_float(100px,45px,left);
                position: relative;
                div{
                    width: 350px;
                    height: 25px;
                    position: absolute;
                    left: -345px;
                    top: 55px;
                    span{
                        color: #e61d25;
                    }
                }
            }
        }
        .recharge_amount{
            width: 100%;
            height: 45px;
            padding: 0px 0px 0px 180px;
            box-sizing: border-box;
            margin-top: 40px;
            label{
                .mixin_span(180px,45px,none,@color_white,right);
                float: left;
            }
            span{
                .mixin_span(200px,45px,none,@color_white,left);
                float: left;
            }
        }
    }
    .example_footer{
        width: 100%;
        height: 35px;
        button{
            .mixin_button(155px,34px,@color_white2,@color_blueviolet);
            border: 1px solid @color_blueviolet;
        }
        button:hover{
            background: @color_white2_hover;
        }
    }
}
</style>