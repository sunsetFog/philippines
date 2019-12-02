<template>
<section id="profit">
    <div class="quota">
        <div class="quota_titile">收益信息</div>
        <div class="agent_modify">
            <div class="agent_name">
                    <div class="query_title">查询日期:</div>
                    <div class="query_date">

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
            </div>
            <div class="agent_profit">
                    <span class="agent_span_s">类型选择:</span>
                    <div class="select_type">
                        <el-select v-model="agent_profit" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </div>
                    <div class="query_role"><input placeholder="请输入角色ID"></input></div>
                    <button>查询</button>
             </div>
        </div>
        <div class="quota_theme">
            <ul>
                <li><span>收益:</span> 5.2620</li>
                <li><span>流水:</span> 421.0</li>
                <li><span>记录:</span> 37</li>
            </ul>
        </div>
        <div class="quota_list" v-for="(item,index) in quota_list">
            <ul>
                <li><span style="margin-right: 25px;">{{index+1}}</span>4687898669</li>
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
    name: 'profit',
    data(){
        return{
            quota_list: [{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'},{gear_position: '流水:11.9'}],
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
            query_date: '',
        }
    },
    methods:{
        pickerDate(res){
            // console.log('index',res[0],this.query_date);
        }
    }
}
</script>

<style lang="less" scoped>
#profit{
    width: 100%;
    .quota{
        width: 100%;
        height: 660px;
        background: @color_purple;
        border-top: 7px solid @color_blueviolet;
        .quota_titile{
            .mixin_div(100%,70px,@color_darkgray,@color_gray,left);
            padding-left: 20px;
            font-size: @font_size20;
            line-height: 60px;
        }
        .agent_modify{
            width: 100%;
            height: 135px;
            padding: 30px 20px 0px 20px;
            box-sizing: border-box;
            .agent_name{
                width: 100%;
                height: 35px;
                .query_title{
                    .mixin_float(auto,35px,left);
                    color: @color_gray;
                }
                .query_date{
                    .mixin_float(270px,35px,left);
                    padding-left: 10px;
                    box-sizing: border-box;
                }
            }
            .agent_profit{
                width: 100%;
                height: 35px;
                margin-top: 20px;
                .agent_span_s{
                    .mixin_span(auto,35px,none,@color_gray,center);
                    float: left;
                }
                .select_type{
                    .mixin_float(130px,35px,left);
                    padding: 5px 0px 0px 10px;
                    box-sizing: border-box;
                }
                .query_role{
                    .mixin_float(140px,35px,left);
                    input{
                        .mixin_input(120px,28px);
                        border: 1px solid @color_blueviolet;
                        background: @color_indigo;
                        color: @color_gray;
                        margin: 5px 0px 0px 20px;
                     }
                }
                
                button:nth-of-type(1){
                    .mixin_button(120px,35px,@color_white2,@color_blueviolet);
                    border: 1px solid @color_blueviolet;
                    float: right;
                }
                button:nth-of-type(1):hover{
                    background: @color_white2_hover;
                }

            }
        }
        .quota_theme{
            width: 100%;
            height: 40px;
            padding: 0px 20px;
            box-sizing: border-box;
            ul{
                li{
                    color: @color_gray;
                    span{
                        color: @color_dimgray;
                    }
                }
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
            padding: 0px 20px;
            box-sizing: border-box;
            margin-bottom: 3px;
            ul{
                width: 100%;
                background: @color_darkgray;
                height: 40px;
                li{
                    color: @color_gray;
                }
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
                .mixin_button(120px,35px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                position: absolute;
                left: 200px;
                top: 0px;
            }
            button:nth-of-type(1):hover{
                background: @color_white2_hover;
            }
            div:nth-of-type(1){
                .mixin_div(200px,35px,none,@color_gray,center);
                position: absolute;
                left: 320px;
            }
            button:nth-of-type(2){
                .mixin_button(120px,35px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                position: absolute;
                top: 0px;
                left: 520px;
            }
            button:nth-of-type(2):hover{
                background: @color_white2_hover;
            }
        }
    }

}
</style>