<template>
<section id="gamePlayer">
    <div class="quota">
        <div class="quota_titile">玩家信息</div>
        <div class="agent_modify">
            <div class="agent_name"><span>今日活跃玩家:</span><span>20</span><span>今日新增玩家:</span><span>50</span></div>
            <div class="agent_profit"><span class="agent_span_s">玩家ID:</span><input placeholder="请输入玩家ID"></input><button>搜索</button></div>
        </div>
        <div class="quota_theme">
            <ul>
                <li>角色ID</li>
                <li>昵称</li>
                <li>注册时间</li>
            </ul>
        </div>
        <div class="quota_list" v-for="(item,index) in quota_list">
            <ul>
                <li>4687898669</li>
                <li>{{item.gear_position}}</li>
                <li>2019-03-05</li>
            </ul>
        </div>

        <div class="paging">
            <button><i class="el-icon-arrow-left" style="margin-right: 5px;"></i>上一页</button>
            <div>1/7</div>
            <button>下一页<i class="el-icon-arrow-right" style="margin-left: 5px;"></i></button>
        </div>

    </div>
</section>
</template>

<script>
export default{
    name: 'gamePlayer',
    data(){
        return{
            quota_list: [{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'},{gear_position: '游客19109'}],
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
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
#gamePlayer{
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
            padding: 30px 20px 0px 20px;
            box-sizing: border-box;
            .agent_name{
                width: 100%;
                height: 25px;
                span:nth-of-type(1){
                    .mixin_span(90px,25px,none,#94a8c1,center);
                }
                span:nth-of-type(2){
                    .mixin_span(50px,25px,none,#f4fbff,center);
                    margin-left: 10px;
                }
                span:nth-of-type(3){
                    color: #94a8c1;
                    margin-left: 70px;
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
                .agent_span_s{
                    .mixin_span(auto,35px,none,#94a8c1,center);
                    float: left;
                }
                input{
                    .mixin_input(120px,28px);
                    border: 1px solid #209fec;
                    background: #000000;
                    color: #edebf0;
                    margin: 5px 0px 0px 10px;
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
                    .mixin_li(33.3%,40px);
                    text-align: left;
                    text-indent: 20px;
                }
                li:nth-of-type(2){
                    .mixin_li(33.3%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(33.3%,40px);
                    text-align: right;
                    padding-right: 15px;
                    box-sizing: border-box;
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
                    .mixin_li(33.3%,40px);
                    text-align: left;
                    text-indent: 20px;
                }
                li:nth-of-type(2){
                    .mixin_li(33.3%,40px);
                }
                li:nth-of-type(3){
                    .mixin_li(33.3%,40px);
                    text-align: right;
                    padding-right: 15px;
                    box-sizing: border-box;
                }
            }
        }
        .paging{
            width: 100%;
            height: 35px;
            margin-top: 15px;
            position: relative;
            button:nth-of-type(1){
                .mixin_button(120px,35px,#276699,#edebf0);
                border: 1px solid #209fec;
                float: right;
                position: absolute;
                left: 200px;
                top: 0px;
            }
            div:nth-of-type(1){
                .mixin_div(200px,35px,none,#edebf0,center);
                position: absolute;
                left: 320px;
            }
            button:nth-of-type(2){
                .mixin_button(120px,35px,#276699,#edebf0);
                border: 1px solid #209fec;
                float: right;
                position: absolute;
                top: 0px;
                left: 520px;
            }
        }
    }

}
</style>