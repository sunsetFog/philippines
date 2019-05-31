<template>
<section id="profit">
    <div class="quota">
        <div class="quota_titile"><span>收益信息</span></div>
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
                <li>收益: 5.2620</li>
                <li>流水: 421.0</li>
                <li>记录: 37</li>
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
        background: #243851;
        border-top: 3px solid #8bc6ee;
        .quota_titile{
            width: 100%;
            height: 70px;
            line-height: 70px;
            padding-left: 20px;
            background: #2C4564;
            span:nth-of-type(1){
                color: #f2fafc;
                font-weight: 600;
                font-size: 16px;
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
                height: 35px;
                .query_title{
                    height: 35px;
                    float: left;
                    color: #94a8c1;
                }
                .query_date{
                    width: 270px;
                    height: 35px;
                    float: left;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
            }
            .agent_profit{
                width: 100%;
                height: 35px;
                margin-top: 20px;
                .agent_span_s{
                    color: #94a8c1;
                    display: inline-block;
                    float: left;
                    height: 35px;
                    line-height: 35px;
                }
                .select_type{
                    width: 130px;
                    height: 35px;
                    float: left;
                    padding: 5px 0px 0px 10px;
                    box-sizing: border-box;
                }
                .query_role{
                    width: 140px;
                    height: 35px;
                    float: left;
                    input{
                        width: 120px;
                        height: 28px;
                        line-height: 28px;
                        outline: none;
                        border: 1px solid #209fec;
                        background: #000000;
                        color: #edebf0;
                        cursor: pointer;
                        text-align: left;
                        text-indent: 10px;
                        margin: 5px 0px 0px 20px;
                        border-radius: 4px;
                     }
                }
                
                button:nth-of-type(1){
                    width: 120px;
                    height: 35px;
                    line-height: 35px;
                    outline: none;
                    border: 1px solid #209fec;
                    background: #276699;
                    color: #edebf0;
                    float: right;
                    cursor: pointer;
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
                .mixin_li(){
                    width: 33.3%;
                    height: 40px;
                    float: left;
                    line-height: 40px;
                    text-align: center;
                }
                li:nth-of-type(1){
                    .mixin_li();
                    text-align: left;
                    text-indent: 20px;
                }
                li:nth-of-type(2){
                    .mixin_li();
                }
                li:nth-of-type(3){
                    .mixin_li();
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
                .mixin_li(){
                    width: 33.3%;
                    height: 40px;
                    float: left;
                    line-height: 40px;
                    text-align: center;
                }
                li:nth-of-type(1){
                    .mixin_li();
                    text-align: left;
                    text-indent: 20px;
                }
                li:nth-of-type(2){
                    .mixin_li();
                }
                li:nth-of-type(3){
                    .mixin_li();
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
                width: 120px;
                height: 35px;
                line-height: 35px;
                outline: none;
                border: 1px solid #209fec;
                background: #276699;
                color: #edebf0;
                float: right;
                cursor: pointer;
                position: absolute;
                left: 200px;
                top: 0px;
            }
            div:nth-of-type(1){
                width: 200px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                position: absolute;
                left: 320px;
                color: #edebf0;
            }
            button:nth-of-type(2){
                width: 120px;
                height: 35px;
                line-height: 35px;
                outline: none;
                border: 1px solid #209fec;
                background: #276699;
                color: #edebf0;
                float: right;
                cursor: pointer;
                position: absolute;
                top: 0px;
                left: 520px;
            }
        }
    }

}
</style>