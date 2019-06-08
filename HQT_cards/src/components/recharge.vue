<template>
    <section id="recharge">
        <el-dialog
        :visible.sync="rechargeActive"
        width="60%"
        center>
        <div slot="title">充值</div>
        <div class="varieties_content">

        </div>
        <div slot="footer" class="dialog-footer">

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
#recharge{
    .varieties_content{
        width: 100%;
        height: 540px;
    }
    .dialog-footer{
        .mixin_div(100%,40px,none,auto,left);
        padding: 0px 20px;
        box-sizing: border-box;
    }
}
</style>