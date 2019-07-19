<template>
    <section id="withdrawalPassword">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">设置提款密码</div>
        <div class="varieties_content">
            <div class="setting_password">
                <button>设定提款密码</button>
            </div>
            <div class="tips_text">提示:你还没设定提款密码，为了你的账户安全，请先设定好你的提款密码</div>
            <div class="remarks">备注:请妥善保管好你的提款密码，如遗忘请使用密保功能找回或联系在线客服处理</div>
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
            rechargeActive: false
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
#withdrawalPassword{
    .varieties_content{
        width: 100%;
        height: 620px;
        .setting_password{
            width: 100%;
            height: 35px;
            margin-top: 90px;
            position: relative;
            button{
                .mixin_button(155px,34px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                margin: 0 auto;
                position: absolute;
                left: 50%;
                top: 0px;
                margin-left: -77.5px;
            }
            button:hover{
                background: @color_white2_hover;
            }
        }
        .tips_text{
            .mixin_div(100%,30px,none,@color_blueviolet,center);
            margin-top: 30px;
        }
        .remarks{
            .mixin_div(100%,30px,none,@color_white,center);
            margin-top: 30px;
        }
    }
    .example_footer{
        .mixin_div(100%,35px,none,auto,left);
    }
}
</style>