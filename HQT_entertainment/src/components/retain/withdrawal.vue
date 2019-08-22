<template>
    <section id="withdrawal">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">提款</div>
        <div class="varieties_content">
            <template v-if="withdrawalState==1">
                <div class="disabled_picture">
                    <img src="../../static/dream/bank/meibangding.png"/>
                </div>
                <div class="tips_text">你尚未绑定银行卡，请前往管理中心-个人管理页进行绑定银行卡！</div>
            </template>
            <template v-if="withdrawalState==2">
                <div class="submission">
                    <label>请输入提款密码:</label>
                    <input type="text" v-model.trim="password" placeholder="请输入提款密码"/>
                    <img src="../../static/dream/bank/jianpan.png" @click="keyboard()"/>
                </div>
                <div class="submit_btn">
                    <button @click="submitMeans()">提交</button>
                    <button>重制</button>
                </div>
            </template>
            <template v-if="withdrawalState==3">
                <div class="steps_example">
                    <ul>
                        <li v-for="(item,index) in steps_list">
                            <span :class="{'steps_border':item.active,'border_nomal':!item.active}">{{item.number}}</span>
                            <span :class="{'steps_color':item.active,'color_nomal':!item.active}">{{item.title}}</span>
                        </li>
                    </ul>
                </div>
                <section v-if="steps_active==1">
                    <div class="explain">注意:每天限制提款10次，你已提款1次，提款时间为00:001至00:00您今日剩余提款额度为599.00</div>
                    <div class="amount_contain">
                        <div class="user_name"><label>用户名:</label><span>shawn chen</span></div>
                        <div class="money_example"><label>可提款金额:</label><span>599.00元</span></div>
                        <div class="drawing">
                            <label>提款金额:</label>
                            <div class="draw_money"><input type="text" placeholder="请输入提款金额"/></div>
                            <div class="draw_explain"><div>单笔充值限额:最低<span>100</span>元,最高<span>100000</span>元</div></div>
                        </div>
                        <div class="receivables">
                            <label>收款银行卡:</label>
                            <div class="bank_select">
                                <el-select v-model="agent_profit" placeholder="对不起,请先绑定银行卡" size="mini">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="next_step"><button @click="stepMeans(2)">下一步</button></div>
                </section>
                <section v-if="steps_active==2">
                    <div class="information">
                        <div><label>用户名:</label><span>shawn chen</span></div>
                        <div><label>可提款金额:</label><span>599.00</span></div>
                        <div><label>提款金额:</label><span>200</span></div>
                        <div><label>开户行名称:</label><span>中国招商银行</span></div>
                        <div><label>开户行所在地:</label><span>是得看看</span></div>
                        <div><label>银行账号:</label><span>************{{bank_code.substring(bank_code.length-4,bank_code.length)}}</span></div>
                    </div>
                    <div class="back_step">
                        <button @click="stepMeans(1)">返回上一步</button>
                        <button @click="stepMeans(3)">确认提交</button>
                    </div>
                </section>
                <section v-if="steps_active==3">
                    <div class="cash_success">
                        <img src="../../static/dream/bank/chongzhichenggong.png"/>
                        <span>账户提现成功</span>
                        <span>我还要提现</span>
                        <span>8秒后，系统自动跳到提现页</span>
                    </div>
                </section>
            </template>
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
            withdrawalState: 3,
            password: '',
            steps_list: [
                {number: 1,title: '设置提款请求',active: true},
                {number: 2,title: '设置提款请求',active: false},
                {number: 3,title: '完成申请',active: false}
            ],
            steps_active: 1,
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
            bank_code: '687898898978786787'
        }
    },
    methods:{
        changeMeans(index){
            if(index){
                this.rechargeActive = true;
                this.password = index;
            }else{
                this.rechargeActive = true;
            }
        },
        stepMeans(index){
            if(index==3){
                this.withdrawalState = 2;
            }
            this.steps_active = index;
            for(let i=0;i<this.steps_list.length;i++){
                this.steps_list[i].active = false;
            }
            this.steps_list[index-1].active = true;
        },
        keyboard(){
            this.$parent.boardMeans();
        },
        submitMeans(){
            this.withdrawalState = 3;
        }
    }
}
</script>

<style lang="less" scoped>
#withdrawal{
    .varieties_content{
        width: 100%;
        height: 620px;
        .disabled_picture{
            width: 100%;
            height: 95px;
            margin-top: 80px;
            position: relative;
            img{
                .mixin_img(95px,95px);
                position: absolute;
                left: 50%;
                top: 0px;
                margin-left: -47.5px;
            }
        }
        .tips_text{
            .mixin_div(100%,30px,none,@color_blueviolet,center);
            margin-top: 30px;
        }
        //状态2
        .submission{
            width: 100%;
            height: 50px;
            padding-left: 220px;
            box-sizing: border-box;
            margin-top: 100px;
            label{
                .mixin_span(auto,50px,none,@color_white,right);
                float: left;
            }
            input{
                .mixin_input(300px,45px);
                float: left;
                background: @color_indigo;
                border: 1px solid @color_blueviolet;
                margin-left: 25px;
                color: @color_input;
            }
            img{
                .mixin_img(45px,45px);
                float: left;
                margin-left: 25px;
                cursor: pointer;
            }
        }
        .submit_btn{
            width: 100%;
            height: 34px;
            margin-top: 80px;
            padding-left: 370px;
            box-sizing: border-box;
            button:nth-of-type(1){
                .mixin_button(115px,34px,@color_white2,@color_blueviolet);
                float: left;
                border: 1px solid @color_blueviolet;
            }
            button:nth-of-type(1):hover{
                background: @color_white2_hover;
            }
            button:nth-of-type(2){
                .mixin_button(115px,34px,@color_indigo,@color_blueviolet);
                float: left;
                border: 1px solid @color_blueviolet;
                margin-left: 40px;
            }
            button:nth-of-type(2):hover{
                background: @color_indigo_hover;
            }
        }
        .steps_example{
            width: 100%;
            height: 120px;
            border-bottom: 1px solid @color_blueviolet;
            padding: 25px 0px 0px 40px;
            box-sizing: border-box;
            .color_nomal{
                color: @color_blueviolet;
            }
            .steps_color{
                color: #f4b653;
            }
            .border_nomal{
                color: @color_blueviolet;
                border: 1px solid @color_blueviolet;
            }
            .steps_border{
                color: #f4b653;
                border: 1px solid #f4b653;
            }
            ul{
                li{
                    .mixin_li(330px,70px);
                    font-size: 36px;
                    span:nth-of-type(1){
                        width: 62px;
                        height: 62px;
                        text-align: center;
                        line-height: 62px;
                        display: inline-block;
                        float: left;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    span:nth-of-type(2){
                        width: auto;
                        height: 70px;
                        text-align: left;
                        display: inline-block;
                        float: left;
                    }
                }
            }
        }
        .explain{
            .mixin_div(100%,30px,none,@color_blueviolet,center);
            margin: 50px 0px 15px 0px;
        }
        .amount_contain{
            width: 100%;
            height: 300px;
            padding: 0px 0px 0px 220px;
            box-sizing: border-box;
            border-bottom: 1px solid @color_blueviolet;
            .user_name,.money_example,.drawing,.receivables{
                width: 100%;
                height: 45px;
                label{
                    .mixin_span(120px,45px,none,@color_white,right);
                    float: left;
                }
            }
            .user_name,.money_example{
                span{
                    .mixin_span(200px,45px,none,@color_white,left);
                    float: left;
                    margin-left: 15px;
                }
            }
            .drawing{
                .draw_money{
                    .mixin_float(300px,45px,left);
                    margin-left: 15px;
                    input{
                        .mixin_input(300px,44px);
                        float: left;
                        border: 1px solid @color_blueviolet;
                        background: @color_indigo;
                        color: @color_input;
                    }
                }
                .draw_explain{
                    width: 100px;
                    height: 45px;
                    float: left;
                    position: relative;
                    div{
                        .mixin_div(500px,45px,none,@color_dimgray,left);
                        position: absolute;
                        top: 45px;
                        left: -300px;
                        span{
                            color: #cd1f28;
                        }
                    }
                }
            }
            .receivables{
                margin-top: 55px;
                .bank_select{
                    .mixin_float(300px,45px,left);
                    margin-left: 15px;
                }
            }
        }
        .next_step{
            width: 100%;
            height: 35px;
            position: relative;
            button{
                .mixin_button(155px,34px,@color_white2,@color_blueviolet);
                margin-top: 55px;
                border: 1px solid @color_blueviolet;
                position: absolute;
                left: 50%;
                top: 0px;
                margin-left: -77.5px;
            }
        }
        //状态2
        .information{
            width: 100%;
            height: 350px;
            padding: 40px 0px 0px 320px;
            box-sizing: border-box;
            border-bottom: 1px solid @color_blueviolet;
            div{
                width: 100%;
                height: 30px;
                margin-bottom: 15px;
                label{
                    .mixin_span(160px,30px,none,@color_white,right);
                    float: left;
                }
                span{
                    .mixin_span(auto,30px,none,@color_white,left);
                    float: left;
                    margin-left: 20px;
                }
            }
        }
        .back_step{
            width: 100%;
            height: 30px;
            margin-top: 55px;
            padding-left: 340px;
            button:nth-of-type(1){
                .mixin_button(155px,34px,@color_indigo,@color_blueviolet);
                float: left;
                border: 1px solid @color_blueviolet;
            }
            button:nth-of-type(2){
                .mixin_button(155px,34px,@color_white2,@color_blueviolet);
                float: left;
                border: 1px solid @color_blueviolet;
                margin-left: 45px;
            }
        }
        .cash_success{
            width: 100%;
            height: 400px;
            position: relative;
            img{
                .mixin_img(85px,85px);
                position: absolute;
                top: 125px;
                left: 330px;
            }
            span:nth-of-type(1){
                .mixin_span(400px,30px,none,@color_white,left);
                position: absolute;
                left: 440px;
                top: 106px;
            }
            span:nth-of-type(2){
                .mixin_span(400px,30px,none,@color_blueviolet,left);
                position: absolute;
                left: 440px;
                top: 160px;
            }
            span:nth-of-type(3){
                .mixin_span(400px,30px,none,@color_dimgray,left);
                position: absolute;
                left: 440px;
                top: 200px;
            }
        }
    }
    .example_footer{
        .mixin_div(100%,35px,none,auto,left);
    }
}
</style>