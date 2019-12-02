<template>
<section id="player_information">
    <div class="cards_frame" v-for="(item,index) in information">
        <div class="cards_title">{{item.theme}}</div>
        <div class="cards_content">
            <div class="balance"><span>{{item.active_title}}:</span><span>{{item.active}}</span></div>
            <div class="gear_position"><span>{{item.newly_added_title}}:</span><span>{{item.newly_added}}</span></div>
            <div class="see_agent">
                <el-progress type="circle" :percentage="percentage" :color="colors" :show-text="false" :width="155" :stroke-width="6"></el-progress>
            </div>
            <span class="progress_words">查看代理</span>
        </div>
    </div>

</section>
</template>

<script>
export default{
    name: 'player_information',
    data(){
        return{
            percentage: 0,
            colors: '#b00cb3',
            information: [
                {theme: '代理信息',active_title: '今日活跃代理',active: '10',newly_added_title: '今日新增代理',newly_added: '10',see_agent: '查看代理'},
                {theme: '玩家信息',active_title: '今日活跃玩家',active: '100',newly_added_title: '今日新增玩家',newly_added: '200',see_agent: '查看玩家'}
            ]
        }
    },
    created(){
        var timeOutId;
        timeOutId = setInterval(()=>{
            if(this.percentage<60){
                this.percentage = this.percentage + 5;
            }else{
                clearInterval(timeOutId);
            }
        },20)
    }
}
</script>

<style lang="less" scoped>
#player_information{
    width: 100%;
    .cards_frame{
        width: 100%;
        height: 350px;
        border-top: 7px solid @color_blueviolet;
        margin-bottom: 45px;
        .cards_title{
            .mixin_div(100%,70px,@color_darkgray,@color_gray,left);
            text-indent: 20px;
            font-size: @font_size20;
            line-height: 60px;
        }
        .cards_content{
            width: 100%;
            height: 280px;
            background: @color_purple;
            position: relative;
            .balance{
                width: 400px;
                height: 40px;
                line-height: 40px;
                position: absolute;
                top: 60px;
                left: 45px;
                span:nth-of-type(1){
                    margin-left: 20px;
                    color: @color_gray;
                    font-size: 36px;
                }
                span:nth-of-type(2){
                    margin-left: 15px;
                    color: @color_gray;
                    font-size: 36px;
                }

            }
            .gear_position{
                width: 400px;
                height: 40px;
                line-height: 40px;
                position: absolute;
                top: 140px;
                left: 45px;
                span:nth-of-type(1){
                    margin-left: 20px;
                    color: @color_gray;
                    font-size: 36px;
                }
                span:nth-of-type(2){
                    margin-left: 15px;
                    color: @color_gray;
                    font-size: 36px;
                }
            }
            .see_agent{
                .mixin_div(155px,155px,none,@color_gray,center);
                position: absolute;
                top: 43px;
                right: 97px;
                cursor: pointer;
            }
            .progress_words{
                .mixin_span(auto,30px,none,@color_gray,left);
                position: absolute;
                top: 104px;
                right: 123px;
                z-index: 6;
                font-size: 26px;
            }
        }
    }


}
</style>