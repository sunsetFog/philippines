<template>
<section id="electronicSports">
    <div class="quota">
        <div class="quota_titile">真人电子体育</div>
        <div class="agent_modify">
            <div class="agent_profit">
                <!-- <div class="agent_profit_title"><i class="el-icon-search"></i>查询:</div> -->
                <div class="agent_profit_date"><label>日期:</label>
                        <el-date-picker
                            size="mini"
                            @change="pickerDate"
                        v-model="query_date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </div>
                <div class="agent_profit_user"><label>用户名:</label><input placeholder="请输入用户名"></input></div>
                <div class="plateform">
                    <el-select v-model="plateform_data" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                </div>
                <button>查询</button>
            </div>
            <div class="business_card"><span>本级:</span><span>Numenslq</span><span>所有平台</span><span>游戏平台:</span></div>
        </div>
        <div class="quota_theme">
            <ul>
                <li style="margin-right: 2px;">用户名</li>
                <li style="margin-right: 2px;">充值</li>
                <li style="margin-right: 2px;">提现</li>
                <li style="margin-right: 2px;">投注金额</li>
                <li style="margin-right: 2px;">中奖金额</li>
                <li style="margin-right: 2px;">返点金额</li>
                <li style="margin-right: 2px;">活动奖金</li>
                <li style="margin-right: 2px;">盈亏金额</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="quota_list" v-for="(item,index) in quota_list">
            <ul>
                <li class="margin_list">4687898669</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li style="margin-top: 2px;"></li>
            </ul>
        </div>
        <div class="quota_list">
            <ul>
                <li class="margin_list" style="font-weight: 600;color: #edf7f9;">本页合计</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li style="margin-top: 2px;">--</li>
            </ul>
        </div>
        <div class="quota_list">
            <ul>
                <li class="margin_list" style="font-weight: 600;color: #edf7f9;">总合计</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li style="margin-top: 2px;">--</li>
            </ul>
        </div>

    </div>
</section>
</template>

<script>
export default{
    data(){
        return{
            quota_list: [{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'}],
            query_date: '',
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
            plateform_data: '所有平台',
        }
    },
    created(){
    },
    methods:{
        pickerDate(res){
            // console.log('index',res[0],this.query_date);
        }
    }
}
</script>

<style lang="less" scoped>
#electronicSports{
    width: 100%;
    .quota{
        width: 100%;
        height: 660px;
        background: #243851;
        border-top: 3px solid #8bc6ee;
        .quota_titile{
            .mixin_div(100%,70px,#2C4564,#f2fafc,left);
            text-indent: 20px;
            font-weight: 600;
            font-size: 16px;
        }
        .agent_modify{
            width: 100%;
            height: 135px;
            padding: 20px 20px 0px 20px;
            box-sizing: border-box;
            .agent_profit{
                width: 100%;
                height: 60px;
                border-bottom: 1px solid #435674;
                position: relative;
                .mixin_agent(){
                    height: 35px;
                    float: left;
                    position: absolute;
                }
                .agent_profit_title{
                    .mixin_agent();
                    width: 55px;
                    color: #d94461;
                    left: 0px;
                    top: 0px;
                }
                .agent_profit_date{
                    .mixin_agent();
                    width: 395px;
                    left: 0px;
                    top: 0px;
                    label{
                        .mixin_span(40px,35px,none,#f0f3fc,center);
                    }
                }
                .agent_profit_user{
                    .mixin_agent();
                    width: 180px;
                    margin-left: 10px;
                    left: 395px;
                    top: 0px;
                    label{
                        .mixin_span(55px,35px,none,#f0f3fc,center);
                    }
                    input{
                        .mixin_input(120px,28px);
                        border: 1px solid #0d78bc;
                        background: #000000;
                        color: #edebf0;
                    }    
                }
                
                button:nth-of-type(1){
                    .mixin_button(95px,35px,#24a8e9,#edebf0);
                    border: 1px solid #a3cbe5;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                }
                .plateform{
                    width: 100px;
                    height: 30px;
                    position: absolute;
                    right: 110px;
                    top: 3.5px;
                }

            }
            .business_card{
                width: 100%;
                height: 25px;
                line-height: 25px;
                margin-top: 15px;
                span:nth-of-type(1){
                    float: left;
                    color: #9db2cf;
                    font-weight: 600;
                }
                span:nth-of-type(2){
                    float: left;
                    margin-left: 10px;
                    color: #eff5f5;
                }
                span:nth-of-type(3){
                    float: right;
                    color: #fc3a5d;
                }
                span:nth-of-type(4){
                    float: right;
                    color: #9db2cf;
                    font-weight: 600;
                    margin-right: 10px;
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
                width: 100%;
                height: 40px;
                background: #415877;
                color: #f1f0f8;
                font-weight: 600;
                font-size: 12px;
                li:nth-of-type(1){
                    .mixin_li(14%,40px);
                }
                li:nth-of-type(2){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(6){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(7){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(8){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(9){
                    .mixin_li(14%,40px);
                }
            }
        }
        .quota_list{
            width: 100%;
            height: 40px;
            color: #9bafca;
            padding: 0px 20px;
            box-sizing: border-box;
            margin-bottom: 2px;
            ul{
                width: 100%;
                height: 40px;
                .margin_list{
                    margin: 2px 2px 0px 0px;
                }
                li{
                    background: #2c4564;
                }
                li:nth-of-type(1){
                    .mixin_li(14%,40px);
                }
                li:nth-of-type(2){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(6){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(7){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(8){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(9){
                    .mixin_li(14%,40px);
                }
            }
        }
    }

}
</style>