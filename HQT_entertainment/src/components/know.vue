<template>
    <section id="know">
        <el-dialog
        :visible.sync="rechargeActive"
        width="2.79rem"
        top="1.46rem"
        center>
        <div slot="title"></div>
        <div class="varieties_content">
            <div class="already_submit">您的提款申请已提交</div>
            <div class="withdrawal_money">提款金额为<span>{{money}}</span>金币</div>
            <div class="attention">请留意游戏信息哈，看申请结果，谢谢~</div>
            <div class="sure_btn">
                <button @click="sureMeans()">知道了</button>
            </div>
        </div>
        <div slot="footer" class="example_footer">

        </div>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'know',
    data(){
        return{
            rechargeActive: false,
            money: ''
        }
    },
    methods:{
        changeMeans(value){
            this.rechargeActive = true;
            this.money = value;
        },
        sureMeans(){
            this.rechargeActive = false;
        }
    }
}
</script>

<style lang="less" scoped>
#know{
    .varieties_content{
        width: 100%;
        height: 295px;
        padding: 35px 35px 0px 35px;
        box-sizing: border-box;
        .already_submit{
            .mixin_div(100%,45px,none,@color_white,center);
            font-size: @font_size24;
        }
        .withdrawal_money{
            .mixin_div(100%,45px,none,@color_white,center);
            font-size: @font_size22;
            margin-top: 10px;
            span{
                color: @color_blueviolet;
            }
        }
        .attention{
            .mixin_div(100%,45px,none,@color_blueviolet,center);
            margin-top: 10px;
        }
        .sure_btn{
            .mixin_div(100%,45px,none,@color_white,left);
            padding-left: 180px;
            box-sizing: border-box;
            margin-top: 25px;
            button{
                .mixin_button(112px,34px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
            }
            button:hover{
                background: @color_white2_hover;
            }
        }
    }
    .example_footer{
        .mixin_div(100%,0px,none,auto,left);
    }
}
</style>