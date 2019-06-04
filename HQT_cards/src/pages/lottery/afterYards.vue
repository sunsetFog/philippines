<template>
    <section id="afterYards">
        <div class="directly_elected">
            <label>后三直选</label>
            <button v-for="(item,index) in directly_list" @click="oceanMeans(index,'directly_list')" :class="{'active_directly': item.active}">{{item.name}}</button>
        </div>
        <div class="group_yards" style="margin-top: 5px;">
            <label>后三组选</label>
            <button v-for="(item,index) in group_list" @click="oceanMeans(index,'group_list')" :class="{'active_directly': item.active}">{{item.name}}</button>
        </div>
        <div class="theme_menu">
            <div class="omission"><span v-for="(item,index) in omission_list" :class="{'active_directly':item.active}" @click="oceanMeans(index,'omission_list')">{{item.name}}</span></div>
            <div class="current_largest"><span>当前遗漏</span><span>最大遗漏</span></div>
            <div class="explanation_matters">
                <ul>
                    <li><img src="../../../static/lottery/lottery6.png"><span>说明</span></li>
                    <li><img src="../../../static/lottery/lottery6.png"><span>示例</span></li>
                    <li><img src="../../../static/lottery/lottery6.png"><span>帮助</span></li>
                    <li><img src="../../../static/lottery/lottery6.png"><span>开奖官网</span></li>
                </ul>
            </div>
        </div>
        <div class="digit_number">
            <div class="hundred_bit">
                <label>百位</label>
                <button v-for="(item,index) in hundred_list" @click="oceanMeans(index,'hundred_list')" :class="{'active_directly': item.active}">{{item.name}}</button>
                <div class="gambling"><span v-for="(item,index) in gambling_list">{{item.name}}</span></div>
            </div> 
            <div class="ten_place" style="margin-top: 20px;">
                <label>十位</label>
                <button v-for="(item,index) in ten_place_list" @click="oceanMeans(index,'ten_place_list')" :class="{'active_directly': item.active}">{{item.name}}</button>
                <div class="gambling"><span v-for="(item,index) in gambling_list2">{{item.name}}</span></div>
            </div>
            <div class="individual_bit" style="margin-top: 20px;">
                <label>个位</label>
                <button v-for="(item,index) in individual_list" @click="oceanMeans(index,'individual_list')" :class="{'active_directly': item.active}">{{item.name}}</button>
                <div class="gambling"><span v-for="(item,index) in gambling_list3">{{item.name}}</span></div>
            </div>
        </div>

        <div class="betting_amount">
            <div class="betting_amount_left">
                <div class="stake_amount">
                    <div class="all_election"><span>已选0注</span>共<span>0.000</span>元</div>
                    <div class="bonus">
                        <el-select v-model="bonus_profit" placeholder="请选择" size="mini">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="company"><button v-for="(item,index) in company_list" :class="{'active_directly':item.active}" @click="oceanMeans(index,'company_list')">{{item.name}}</button></div>
                    <div class="times_count"><el-input-number size="small" v-model="times_count" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number><span style="margin-left: 5px;color: #6a6a6a;">倍</span></div>
                </div>
                <div class="play_table">
                    <div class="table_header">
                        <ul>
                            <li>玩法与投注号码</li>
                            <li>倍率</li>
                            <li>注数</li>
                            <li>金额</li>
                            <li><i style="margin-right: 3px;" class="el-icon-delete"></i>全删</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="betting_amount_right">
                <button>一键投注</button>
                <button>添加号码</button>
                <button>立即注册</button>
                <div><input type="checkbox"></input><span>我要追号</span></div>
                <div>已选<span>0</span>单</div>
                <div>共计<span>0</span>注</div>
                <div>金额<span>0.000</span>元</div>
            </div>
        </div>
    </section>
</template>

<script>
export default{
    data(){
        return{
            directly_list: [
                {name: '复式',active: true},
                {name: '单式',active: false},
                {name: '直选和值',active: false}
            ],
            group_list: [
                {name: '组三',active: false},
                {name: '组六',active: false},
                {name: '混合组选',active: false},
                {name: '组选和值',active: false},
            ],
            omission_list: [{name: '遗漏',active: true},{name: '冷热',active: false}],
            hundred_list: [
                {name: 0,active: false},
                {name: 1,active: false},
                {name: 2,active: false},
                {name: 3,active: false},
                {name: 4,active: false},
                {name: 5,active: false},
                {name: 6,active: false},
                {name: 7,active: false},
                {name: 8,active: false},
                {name: 9,active: false}
            ],
            gambling_list: [
                {name: '全',active: false},
                {name: '大',active: false},
                {name: '小',active: false},
                {name: '奇',active: false},
                {name: '偶',active: false},
                {name: '清',active: false}
            ],
            ten_place_list: [
                {name: 0,active: false},
                {name: 1,active: false},
                {name: 2,active: false},
                {name: 3,active: false},
                {name: 4,active: false},
                {name: 5,active: false},
                {name: 6,active: false},
                {name: 7,active: false},
                {name: 8,active: false},
                {name: 9,active: false}
            ],
            gambling_list2: [
                {name: '全',active: false},
                {name: '大',active: false},
                {name: '小',active: false},
                {name: '奇',active: false},
                {name: '偶',active: false},
                {name: '清',active: false}
            ],
            individual_list: [
                {name: 0,active: false},
                {name: 1,active: false},
                {name: 2,active: false},
                {name: 3,active: false},
                {name: 4,active: false},
                {name: 5,active: false},
                {name: 6,active: false},
                {name: 7,active: false},
                {name: 8,active: false},
                {name: 9,active: false}
            ],
            gambling_list3: [
                {name: '全',active: false},
                {name: '大',active: false},
                {name: '小',active: false},
                {name: '奇',active: false},
                {name: '偶',active: false},
                {name: '清',active: false}
            ],
            options: [
                {value: '选项1',label: '奖金50%'}, 
                {value: '选项2',label: '奖金45%'}, 
                {value: '选项3',label: '奖金40%'}
            ],
            bonus_profit: '',
            company_list: [
                {name: '元',active: true},
                {name: '角',active: false},
                {name: '分',active: false},
                {name: '厘',active: false}
            ],
            times_count: 1
        }
    },
    methods: {
        //高亮
        oceanMeans(index,res){
            if(this[res][index].active == false){
                for(let i=0;i<this[res].length;i++){
                    this[res][i].active = false;
                }
                this[res][index].active = true;
            }else{
                this[res][index].active = false;
            }    
        },
        //倍数
        handleChange(value) {
            // console.log(value);
        }
    }
}
</script>

<style lang="less" scoped>
#afterYards{
    width: 100%;
    height: 650px;
    .directly_elected,.group_yards{
        width: 100%;
        height: 30px;
        .active_directly{
            background: #f02528;
            color: #f7ffff;
        }
        label{
            .mixin_span(70px,30px,none,auto,center);
        }
        button{
            .mixin_button(auto,25px,none,#535353);
            padding: 0px 10px;
            box-sizing: border-box;
            margin-right: 15px;
        }
    }
    .theme_menu{
        width: 100%;
        height: 30px;
        margin: 10px 0px 0px 0px;
        .active_directly{
            background: #f02528;
            color: #f7ffff;
        }
        .omission{
            .mixin_float(100px,24px,left);
            border: 1px solid #cdcdcd;
            padding: 1px;
            box-sizing: border-box;
            span:nth-of-type(1){
                .mixin_span(48px,20px,auto,auto,center);
                float: left;
                cursor: pointer;
            }
            span:nth-of-type(2){
                .mixin_span(48px,20px,auto,auto,center);
                float: left;
                cursor: pointer;
            }
        }
        .current_largest{
            .mixin_float(160px,100%,left);
            margin-left: 10px;
            span:nth-of-type(1){
                .mixin_span(80px,20px,none,auto,center);
                float: left;
                border-right: 1px solid #e1d9f0;
            }
            span:nth-of-type(2){
                .mixin_span(80px,20px,none,auto,center);
                float: left;
            }
        }
        .explanation_matters{
            .mixin_float(320px,20px,right);
            ul{
                li{
                    padding: 0px 10px;
                    box-sizing: border-box;
                    height: 100%;
                    float: left;
                    img{
                        .mixin_img(18px,18px);
                    }
                    span{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
    .digit_number{
        width: 713px;
        height: 250px;
        background: #f8f6f7;
        border: 1px solid #dbd9da;
        margin-top: 10px;
        padding: 15px 10px 0px 25px;
        box-sizing: border-box;
        .hundred_bit,.ten_place,.individual_bit{
            width: 100%;
            height: 30px;
            font-size: 14px;
            color: #393939;
            .active_directly{
                background: #f02528;
                color: #f7ffff;
            }
            label{
                .mixin_span(auto,30px,none,auto,center);
                padding-right: 20px;
                box-sizing: border-box;
                text-align: left;
                font-weight: 600;
            }
            button{
                .mixin_button(auto,30px,none,#535353);
                padding: 0px 10px;
                box-sizing: border-box;
                line-height: 29px;
                border-radius: 50%;
                margin-right: 8px;
                border: 1px solid #dcdcdc;
                font-weight: 600;
            }
            .gambling{
                .mixin_float(auto,30px,right);
                span{
                    .mixin_span(30px,30px,none,auto,center);
                    padding: 0px 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
    .betting_amount{
        width: 713px;
        height: 260px;
        margin-top: 15px;
        .betting_amount_left{
            .mixin_float(593px,100%,left);
            padding: 0px 10px 0px 0px;
            box-sizing: border-box;
            .stake_amount{
                width: 100%;
                height: 30px;
                .all_election{
                    .mixin_float(auto,100%,left);
                    padding-right: 20px;
                    box-sizing: border-box;
                    line-height: 30px;
                    color: #6a6a6a;
                    span:nth-of-type(1){
                        margin-right: 10px;
                    }
                    span:nth-of-type(2){
                        color: #f6000e;
                        margin: 0px 3px;
                    }
                }
                .bonus{
                    .mixin_float(130px,30px,right);
                    padding: 1px 0px 0px 0px;
                    box-sizing: border-box;
                }
                .company{
                    .mixin_float(100px,30px,right);
                    margin-right: 10px;
                    padding: 3px 0px 0px 0px;
                    box-sizing: border-box;
                    .active_directly{
                        background: #f02528;
                        color: #f7ffff;
                    }
                    button{
                        .mixin_button(24px,24px,none,#5c6e86);
                        margin-right: 0px;
                    }
                }
                .times_count{
                    .mixin_float(160px,30px,right);
                }
            }
            .play_table{
                width: 100%;
                height: 215px;
                background: #f8f6f7;
                margin-top: 10px;
                border: 1px solid #e8e6e7;
                .table_header{
                    width: 100%;
                    height: 34px;
                    border-bottom: 1px solid #e8e6e7;
                    .mixin_li(){
                        height: 34px;
                        line-height: 34px;
                        float: left;
                        text-align: center;
                        color: #050505;
                        font-size: 14px;
                    }
                    ul{
                        width: 100%;
                        height: 100%;
                        li:nth-of-type(1){
                            .mixin_li();
                            width: 60%;
                        }
                        li:nth-of-type(2){
                            .mixin_li();
                            width: 10%;
                        }
                        li:nth-of-type(3){
                            .mixin_li();
                            width: 10%;
                        }
                        li:nth-of-type(4){
                            .mixin_li();
                            width: 10%;
                        }
                        li:nth-of-type(5){
                            .mixin_li();
                            width: 10%;
                            color: #d2636a;
                        }
                    }
                }
            }
        }
        .betting_amount_right{
            .mixin_float(120px,100%,right);
            button:nth-of-type(1){
                .mixin_button(100%,32px,#cbc8cf,#f7f5f8);
            }
            button:nth-of-type(2){
                .mixin_button(100%,32px,#cbc8cf,#f7f5f8);
                margin-top: 5px;
            }
            button:nth-of-type(3){
                .mixin_button(100%,42px,#e3c088,#f7f5f8);
                margin-top: 5px;
            }
            div:nth-of-type(1){
                margin-top: 15px;
                input{
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                }
                span{
                    color: #ee2849;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
            div:nth-of-type(2){
                margin-top: 15px;
                span{
                    color: #ee2849;
                    margin: 0px 5px;
                }
            }
            div:nth-of-type(3){
                margin-top: 10px;
                span{
                    color: #ee2849;
                    margin: 0px 5px;
                }
            }
            div:nth-of-type(4){
                margin-top: 10px;
                span{
                    color: #ee2849;
                    margin: 0px 5px;
                }
            }
        }
    }
}
</style>