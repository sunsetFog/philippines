<template>
<section id="chessCards">
    <div class="cards_info">
        <div class="cards_title">棋牌信息</div>
        <div class="cards_content">
            <div class="balance">
                <div class="recharge"><span>账户余额:</span><span>50000.00</span><span>充值</span></div>
                <div class="cash_withdrawal"><button>体现余额到游戏</button></div>
            </div>
            <div class="gear_position"><span>我的档位:</span><span>50%</span></div>
        </div>
    </div>
    <div class="quota">
        <div class="quota_titile"><span>配额使用情况</span><span>0代表该代理没有当前排位，-1代表无限</span></div>
        <div class="agent_modify">
            <div class="agent_name"><span>代理名称:</span><span>游客109190</span><span>代理ID:</span><span>4567839201</span></div>
            <div class="agent_profit"><span class="agent_span_y">代理收益:</span><span class="agent_span_e">
            
            <el-select v-model="agent_profit" placeholder="请选择" size="mini">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            
            </span><span class="agent_span_s">请按照分成档位填写</span><button>保存修改</button></div>
        </div>
        <div class="quota_theme">
            <ul>
                <li>分成档位</li>
                <li>我的配额</li>
                <li>我的剩余</li>
                <li>代理配额</li>
                <li>代理剩余</li>
            </ul>
        </div>
        <div class="quota_list" v-for="(item,index) in quota_list">
            <ul>
                <li>{{item.gear_position}}</li>
                <li>50</li>
                <li>48</li>
                <li><input value="0"></input></li>
                <li>0</li>
            </ul>
        </div>


    </div>
</section>
</template>

<script>
export default{
    data(){
        return{
            quota_list: [{gear_position: '50%'},{gear_position: '45%'},{gear_position: '40%'},{gear_position: '35%'},{gear_position: '30%'},{gear_position: '25%'},{gear_position: '15%'},{gear_position: '10%'}],
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
            agent_profit: ''
        }
    }
}
</script>

<style lang="less" scoped>
#chessCards{
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
                .cash_withdrawal{
                    .mixin_float(50%,30px,right);
                    button{
                        .mixin_button(120px,35px,#276699,#edebf0);
                        border: 1px solid #209fec;
                        float: right;
                        margin-right: 20px;
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
    .quota{
        width: 100%;
        height: 620px;
        margin-top: 30px;
        background: #243851;
        border-top: 3px solid #8bc6ee;
        .quota_titile{
            width: 100%;
            height: 70px;
            padding: 15px 0px 0px 20px;
            box-sizing: border-box;
            background: #2C4564;
            span:nth-of-type(1){
                color: #f2fafc;
                font-weight: 600;
                font-size: 16px;
                display: block;
            }
            span:nth-of-type(2){
                color: #849cb8;
                display: block;
            }
        }
        .agent_modify{
            width: 100%;
            height: 135px;
            padding: 30px 20px 0px 20px;
            box-sizing: border-box;
            .agent_name{
                width: 100%;
                height: 25px;
                span:nth-of-type(1){
                    color: #94a8c1;
                }
                span:nth-of-type(2){
                    color: #f4fbff;
                    margin-left: 10px;
                }
                span:nth-of-type(3){
                    color: #94a8c1;
                    margin-left: 60px;
                }
                span:nth-of-type(4){
                    color: #f4fbff;
                    margin-left: 10px;
                }
            }
            .agent_profit{
                width: 100%;
                height: 35px;
                margin-top: 20px;
                .agent_span_y{
                    .mixin_span(auto,35px,none,#94a8c1,center);
                    float: left;
                }
                .agent_span_e{
                    width: 90px;
                    height: 35px;
                    display: inline-block;
                    margin-left: 10px;
                    float: left;
                    padding-top: 5px;
                    box-sizing: border-box;
                }
                .agent_span_s{
                    .mixin_span(auto,35px,none,#1ca3ff,center);
                    margin-left: 10px;
                    float: left;
                }
                button:nth-of-type(1){
                    .mixin_button(120px,35px,#276699,#edebf0);
                    border: 1px solid #209fec;
                    float: right;
                }

            }
        }
        .quota_theme{
            width: 100%;
            height: 40px;
            color: #9bafca;
            padding: 0px 20px;
            box-sizing: border-box;
            ul{
                li:nth-of-type(1){
                    .mixin_li(26.6%,40px);
                    width: 10%;
                    text-align: left;
                }
                li:nth-of-type(2){
                    .mixin_li(26.6%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(26.6%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(26.6%,40px);
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                    text-align: right;
                }
            }
        }
        .quota_list{
            width: 100%;
            height: 40px;
            color: #9bafca;
            padding: 0px 20px;
            box-sizing: border-box;
            margin-bottom: 3px;
            ul{
                width: 100%;
                background: #2c4564;
                height: 40px;
                li:nth-of-type(1){
                    .mixin_li(26.6%,40px);
                    width: 10%;
                    text-align: left;
                    text-indent: 20px;
                }
                li:nth-of-type(2){
                    .mixin_li(26.6%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(26.6%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(26.6%,40px);
                    input{
                        .mixin_input(70px,20px);
                        border: 1px solid #209fec;
                        background: #000000;
                        color: #edebf0;
                        text-align: center;
                        text-indent: 0px;
                    }
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                    text-align: right;
                    padding-right: 15px;
                    box-sizing: border-box;
                }
            }
        }
    }

}
</style>