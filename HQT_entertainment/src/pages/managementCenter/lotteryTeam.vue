<template>
<section id="lotteryTeam">
    <div class="quota">
        <div class="quota_titile">团队管理</div>
        <div class="agent_modify">
            <div class="agent_profit">
                <input placeholder="请输入用户名查找"></input>
                <button>注册开户</button>
                <button>推广连接</button>
                <i class="el-icon-search"></i>
            </div>
            <div class="business_card"><span>本级:</span><span>Numenslq</span><span>可点击标题修改排序</span><span>注:</span></div>
        </div>
        <div class="quota_theme">
            <ul>
                <li style="margin-right: 2px;">用户名</li>
                <li style="margin-right: 2px;">返点</li>
                <li style="margin-right: 2px;">人数</li>
                <li style="margin-right: 2px;">个人余额</li>
                <li style="margin-right: 2px;">团队余额</li>
                <li style="margin-right: 2px;">注册日期</li>
                <li style="margin-right: 2px;">最后登录</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="quota_list" v-for="(item,index) in quota_list">
            <ul>
                <li class="margin_list">4687898669</li>
                <li class="margin_list">7.8%</li>
                <li class="margin_list">0</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">0.0000</li>
                <li class="margin_list">2019-03-05</li>
                <li class="margin_list">2019-04-06</li>
                <li style="margin-top: 2px;">投注记录/帐变记录</li>
            </ul>
        </div>

        <div class="paging">
            <div class="page_content">
                <span>总计1个记录分为1页，当前第1页</span>
                <span>1</span><span>转至</span><span></span><span>页</span>
                <button>GO</button>
            </div>
        </div>

    </div>
</section>
</template>

<script>
export default{
    name: 'lotteryTeam',
    data(){
        return{
            quota_list: [{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'}],
        }
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
#lotteryTeam{
    width: 100%;
    .quota{
        width: 100%;
        height: 660px;
        background: #243851;
        border-top: 3px solid #8bc6ee;
        .quota_titile{
            .mixin_div(100%,70px,#2C4564,#f2fafc,left);
            padding-left: 20px;
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
                input{
                    .mixin_input(160px,28px);
                    border: 1px solid #0d78bc;
                    background: #000000;
                    color: #edebf0;
                    position: absolute;
                    top: 3px;
                    left: 0px;
                }
                i{
                    width: 15px;
                    height: 15px;
                    color: #0d78bc;
                    position: absolute;
                    top: 9px;
                    left: 140px;
                    z-index: 3;
                    cursor: pointer;
                }
                .mixin_button(){
                    .mixin_button(120px,35px,none,#edebf0);
                    border: 1px solid #209fec;
                    position: absolute;
                }
                button:nth-of-type(1){
                    .mixin_button();
                    background: #236595;
                    top: 0px;
                    right: 130px;
                }
                button:nth-of-type(2){
                    .mixin_button();
                    background: #24a8e9;
                    top: 0px;
                    right: 0px;
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
                    color: #fc3a5d;
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
                font-weight: 600;
                font-size: 12px;
                color: #f1f0f8;
                li:nth-of-type(1){
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(2){
                    .mixin_li(8%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(8%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(6){
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(7){
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(8){
                    .mixin_li(17.2%,40px);
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
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(2){
                    .mixin_li(8%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(8%,40px);
                }
                li:nth-of-type(4){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(5){
                    .mixin_li(10%,40px);
                }
                li:nth-of-type(6){
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(7){
                    .mixin_li(15%,40px);
                }
                li:nth-of-type(8){
                    .mixin_li(17.2%,40px);
                }
            }
        }
        .paging{
            width: 100%;
            height: 35px;
            margin-top: 15px;
            .page_content{
                width: 420px;
                height: 35px;
                margin: 0 auto;
                color: #efffff;
                position: relative;
                .mixin_spans(){
                    .mixin_span(auto,35px,none,auto,center);
                    float: left;
                    position: absolute;
                }
                span:nth-of-type(1){
                    .mixin_spans();
                    left: 0px;
                    top: 0px;
                }
                span:nth-of-type(2){
                    .mixin_spans();
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #2da5f1;
                    line-height: 24px;
                    left: 210px;
                    top: 6px;
                }
                span:nth-of-type(3){
                    .mixin_spans();
                    left: 240px;
                    top: 0px;
                }
                span:nth-of-type(4){
                    .mixin_spans();
                    width: 34px;
                    height: 24px;
                    background: #2da5f1;
                    border: 1px solid #209fec;
                    border-radius: 4px;
                    left: 271px;
                    top: 6px;
                }
                span:nth-of-type(5){
                    .mixin_spans();
                    left: 310px;
                    top: 0px;
                }
                button{
                    .mixin_button(45px,24px,#21abec,#f9efee);
                    position: absolute;
                    left: 330px;
                    top: 6px;
                }
            }
        }
    }

}
</style>