<template>
<section id="agent_system">
    <div class="system_example">
        <img class="big_fish" src="../../../static/dream/login/fish.png" @click="fishMeans()"/>
        <div class="manage_content">
            <iframe :src="agentSrc" id="mapFrame" class="mapFrame" ref="mapFrame" @load="systemMeans()"></iframe>
        </div>
    </div>
    <footers :vip_foot="false"></footers>
</section>
</template>

<script>
import footers from '../../components/footer.vue';
export default{
    name: 'agent_system',
    components: {footers},
    data(){
        return{
            agentSrc: ''
        }
    },
    created(){
        // this.agentSrc = "http://10.1.101.120:501/#/?token="+sessionStorage.getItem('token')+'&loginname='+web.game_getPlayer().playerInfo.nickname+'&web';
        let that = this;
        web.game_agent_url(function(value){
            //console.log('agent$$$$');
            that.agentSrc = value.agent_url + '&web';
        })
    },
    methods:{
        fishMeans(){
             
        },
        systemMeans(){
            // 子vue:给其他window对象发送消息 parent.postMessage('back',"*");
            var that = this;
            window.onmessage = function (e) {
                e = e||event;
                //console.log('回调参数',e);
                if (e.data == 'back') {
                    that.$router.push({path: '/home'});
                }
           
            }
        }
    }
    
}
</script>

<style lang="less" scoped>
#agent_system{
    width: 100%;
    height: 100%;
    .system_example{
        width: 100%;
        height: 1200px;
        .mixin_image(url('../../../static/dream/center/bg-guanli.jpg'));
        position: relative;
        .big_fish{
            .mixin_img(426px;487px);
            position: absolute;
            left: 0px;
            bottom: 0px;
        }
        .manage_content{
            width: 1200px;
            height: 1200px;
            background: rgba(88,51,82,0.6);
            border-left: 1px solid @color_blueviolet;
            border-right: 1px solid @color_blueviolet;
            position: absolute;
            left: 50%;
            top: 0px;
            margin-left: -600px;
            padding: 45px 225px 0px 225px;
            box-sizing: border-box;
            .mapFrame{
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
            }
        }
    }

}
</style>