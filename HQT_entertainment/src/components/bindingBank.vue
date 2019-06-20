<template>
    <section id="bindingBank">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">绑定银行卡</div>
        <div class="varieties_content">
            <div class="be_careful">注:&nbsp;增加绑定银行卡需提供最近一次绑定的卡号</div>
            <div class="opening_bank">
                <label>*开户银行&nbsp;:</label>
                <div class="example_frame">
                        <el-select v-model="agent_profit" placeholder="请选择..." size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                </div>
            </div>
            <div class="bank_province">
                <label>*开户银行省份&nbsp;:</label>
                <div class="example_frame">
                        <el-select v-model="agent_profit" placeholder="请选择..." size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                </div>
            </div>
            <div class="bank_city">
                <label>*开户银行城市&nbsp;:</label>
                <div class="example_frame">
                        <el-select v-model="agent_profit" placeholder="请选择..." size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                </div>
            </div>
            <div class="bank_name">
                <label>*支行名称&nbsp;:</label>
                <div class="example_frame"><input placeholder="请输入支行名称:"></input></div>
                <span>由1至20个字符或汉字组成，不能使用特殊字符</span>
            </div>
            <div class="bank_owner">
                <label>*开户人姓名&nbsp;:</label>
                <div class="example_frame"><input placeholder="请输入开户人姓名:"></input></div>
                <span>请填写你的真实姓名，只能是中文字符，最长16个汉字，支持以下姓名分隔符".""."</span>
            </div>
            <div class="bank_number">
                <label>*银行卡号&nbsp;:</label>
                <div class="example_frame"><input placeholder="请输入银行卡号:"></input></div>
                <span>(银行卡卡号由16位到19位数数字组成)</span>
            </div>
            <div class="confirm_account">
                <label>*确认账号&nbsp;:</label>
                <div class="example_frame"><input placeholder="请输入确认账号:"></input></div>
                <span>(银行卡卡号只能手动输入，不能粘粘)</span>
            </div>
        </div>
        
        <div slot="footer" class="example_footer">
            <button @click="submission(1)">提交</button>
            <button @click="submission(2)">返回</button>
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
            options: [
                {value: '选项1',label: '50%'},
                {value: '选项2',label: '45%'},
                {value: '选项3',label: '40%'},
                {value: '选项4',label: '35%'},
                {value: '选项5',label: '30%'}
            ],
            agent_profit: '',
        }
    },
    methods:{
        changeMeans(){
            this.rechargeActive = true;
        },
        submission(index){
            if(index==1){
                this.rechargeActive = false;
                this.$parent.parentsMeans();
            }else if(index==2){
                this.rechargeActive = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
#bindingBank{
    .varieties_content{
        width: 100%;
        height: 565px;
        border: 1px solid @color_blueviolet;
        border-radius: 4px;
        .be_careful{
            .mixin_div(100%,70px,@color_indigo,@color_white,center);
        }
        .opening_bank,.bank_province,.bank_city,.bank_name,.bank_owner,.bank_number,.confirm_account{
            width: 100%;
            height: 70px;
            border-top: 2px solid @color_indigo;
            label{
                .mixin_span(180px,70px,none,@color_white,right);
                padding-right: 15px;
                box-sizing: border-box;
                float: left;
            }
            .example_frame{
                .mixin_float(300px,70px,left);
                padding-top: 12px;
                box-sizing: border-box;
            }
        }
        .bank_name,.bank_owner,.bank_number,.confirm_account{
            input{
                .mixin_input(300px,45px);
                border: 1px solid @color_blueviolet;
                background: @color_indigo;
                color: @color_blueviolet;
            }
            span{
                .mixin_span(550px,70px,none,@color_blueviolet,left);
                float: left;
                text-indent: 10px;
            }
        }
    }
    .example_footer{
        .mixin_div(100%,60px,none,auto,left);
        button:nth-of-type(1){
            .mixin_button(115px,34px,@color_white2,@color_blueviolet);
            border: 2px solid @color_blueviolet;
            margin-left: 410px;
        }
        button:nth-of-type(2){
            .mixin_button(115px,34px,@color_indigo,@color_blueviolet);
            border: 2px solid @color_blueviolet;
            margin-left: 40px;
        }
    }
}
</style>