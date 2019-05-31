<template>
<section id="player_information">
    <div class="cards_frame" v-for="(item,index) in information">
        <div class="cards_title">{{item.theme}}</div>
        <div class="cards_content">
            <div class="balance"><span>{{item.active_title}}:</span><span>{{item.active}}</span></div>
            <div class="gear_position"><span>{{item.active_title}}:</span><span>{{item.active}}</span></div>
            <div class="see_agent">{{item.see_agent}}</div>
        </div>
    </div>

</section>
</template>

<script>
export default{
    data(){
        return{
                information: [
                        {theme: '代理信息',active_title: '今日活跃代理',active: '10',newly_added_title: '今日新增代理',newly_added: '10',see_agent: '查看代理'},
                        {theme: '玩家信息',active_title: '今日活跃玩家',active: '100',newly_added_title: '今日新增玩家',newly_added: '200',see_agent: '查看玩家'}
                        ]
        }
    }
}
</script>

<style lang="less" scoped>
#player_information{
    width: 100%;
    .cards_frame{
        width: 100%;
        height: 350px;
        border-top: 3px solid #8bc6ee;
        margin-bottom: 45px;
        .cards_title{
            width: 100%;
            height: 70px;
            color: white;
            line-height: 70px;
            text-indent: 20px;
            background: #2C4564;
            font-weight: 600;
            font-size: 16px;
        }
        .cards_content{
            width: 100%;
            height: 280px;
            background: #243851;
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
                    color: #25f959;
                    font-size: 35px;
                }
                span:nth-of-type(2){
                    margin-left: 15px;
                    color: #25f959;
                    font-size: 35px;
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
                    color: #25f959;
                    font-size: 35px;
                }
                span:nth-of-type(2){
                    margin-left: 15px;
                    color: #25f959;
                    font-size: 35px;
                }
            }
            .see_agent{
                width: 150px;
                height: 150px;
                line-height: 150px;
                border-radius: 50%;
                border: 4px solid #84c4ea;
                text-align: center;
                font-size: 25px;
                color: #f8fdff;
                text-decoration: underline;
                position: absolute;
                top: 55px;
                right: 110px;
            }
        }
    }


}
</style>