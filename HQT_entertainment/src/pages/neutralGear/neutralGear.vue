<template>
    <section id="neutralGear">
        <img src="../../../static/dream/portrait/logo2.png"/>
        <div class="progress_example">
            <span :style="{width: percentage+'px',borderTopRightRadius: radius.top_right,borderBottomRightRadius: radius.bottom_right}"></span>
            <!-- <el-progress :percentage="percentage" :color="customColor" :show-text="false" :width="155" :stroke-width="20"></el-progress> -->
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            percentage: 0,
            customColor: '#409eff',
            timerKey: '',
            radius: {top_right: '0px',bottom_right: '0px'}
        }
    },
    mounted(){
        var that = this;
        that.$means.overallHeight('neutralGear');
        window.onresize = function temp2(){
            that.$means.overallHeight('neutralGear');
        }
    },
    created(){
        this.radius.top_right = '0px';
        this.radius.bottom_right = '0px';
        this.timerKey = setInterval(this.timerMeans,200);
        this.variableGear();
        flashGameplayer();
    },
    methods:{
        timerMeans(){
            if(this.percentage>=800){
                clearInterval(this.timerKey);
            }else{
                this.percentage+=80;
            }
            // console.log('width%%',this.percentage);
        },
        variableGear(){
            var that = this;
            Object.defineProperty(refreshWeb, 'state', {
                get: function() {
                    return 'state';
                },
                set: function(value) {
                    web.game_login(sessionStorage.getItem('account_number'),sessionStorage.getItem('password_number'),window.location.host,function() { 
                        that.percentage = 848;
                        that.radius.top_right = '15px';
                        that.radius.bottom_right = '15px';
                        let val = web.game_getPlayer();
                        sessionStorage.setItem('token',val.token);
                        that.$router.push({path: '/home'});
                        console.log('loading%%%');
                    });


                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
#neutralGear{
    width: 100%;
    .mixin_image(url('../../../static/dream/portrait/bg_loading.jpg'));
    position: relative;
    img{
        width: 550px;
        height: 480px;
        position: absolute;
        left: 50%;
        top: 150px;
        margin-left: -275px;
    }
    .progress_example{
        width: 860px;
        height: 46px;
        .mixin_image(url('../../../static/dream/portrait/kuang.png'));
        // background: blue;
        overflow: hidden;
        border-radius: 20px;
        padding: 5px 0px 0px 6px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        bottom: 150px;
        margin-left: -430px;
        span{
            height: 35px;
            display: inline-block;
            .mixin_image(url('../../../static/dream/portrait/jindus.png'));
            // background: blueviolet;
            float: left;
            overflow: hidden;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    }
}
</style>