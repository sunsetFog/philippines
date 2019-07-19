<template>
        <section id="home_game" :style="{height: count_height+300+'px'}">
            <div class="game_example">
                <el-button :disabled="count_height==930" style="position:absolute;left:100px;top:20px;" @click="zoomMeans(1)">放大</el-button>
                <el-button :disabled="count_height==530" style="position:absolute;left:190px;top:20px;" @click="zoomMeans(2)">缩小</el-button>
                <div class="gameOrigin" :style="{width: game_frame.width,height: game_frame.height,marginLeft: game_frame.margin_left}">
                    <div :style="{height: purple_define.height}"></div>
                    <div :style="{height: purple_define.height}"></div>
                    <div :style="{width: purple_define.width}"></div>
                    <div :style="{width: purple_define.width}"></div>
                </div>
            </div>
        </section>
</template>

<script>
    export default{
        data(){
            return{
                count_height: 630,
                game_frame: {width: '1120px',height: '630px',margin_left: '-560px'},
                purple_define: {width: '1120px',height: '710px'},
            }
        },
        methods:{
            zoomMeans(value){
                if(value==1){
                    if(this.count_height<930){
                        this.count_height = this.count_height+100;
                        this.calculation(this.count_height);
                        zoomGame(this.count_height);
                        window.dispatchEvent(new Event('resize'));//触发窗口调整大小事件
                    }
                }else if(value==2){
                    if(this.count_height>530){
                        this.count_height = this.count_height-100;
                        this.calculation(this.count_height);
                        zoomGame(this.count_height);
                        window.dispatchEvent(new Event('resize'));
                    }
                }
            },
            calculation(value){
                this.game_frame.width = value/0.5625+'px';
                this.game_frame.height = value+'px';
                this.game_frame.margin_left = -value/0.5625/2+'px';
                let purple_height = value + 80;
                this.purple_define.height = purple_height + 'px';
                this.purple_define.width = value/0.5625+'px';
            }
        }
    }

</script>

<style lang="less" scoped>
#home_game{
    width: 100%;
    min-height: 900px;
    .mixin_image(url('../../../static/dream/bank/bj-youxi.jpg'));
    .game_example{
        width: 100%;
        height: 80px;
        position: relative;
        .gameOrigin{
            position: absolute;
            top: 155px;
            left: 50%;
            div:nth-of-type(1){
                width: 40px;
                position: absolute;
                left: -40px;
                top: -40px;
                background: rgba(172, 36, 223, 0.2);
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                border-left: 1px solid @color_blueviolet;
                border-top: 1px solid @color_blueviolet;
                border-bottom: 1px solid @color_blueviolet;
            }
            div:nth-of-type(2){
                width: 40px;
                position: absolute;
                right: -40px;
                top: -40px;
                background: rgba(172, 36, 223, 0.2);
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-right: 1px solid @color_blueviolet;
                border-top: 1px solid @color_blueviolet;
                border-bottom: 1px solid @color_blueviolet;
            }
            div:nth-of-type(3){
                height: 40px;
                position: absolute;
                left: 0px;
                top: -40px;
                background: rgba(172, 36, 223, 0.2);
                border-top: 1px solid @color_blueviolet;
            }
            div:nth-of-type(4){
                height: 40px;
                position: absolute;
                left: 0px;
                bottom: -40px;
                background: rgba(172, 36, 223, 0.2);
                border-bottom: 1px solid @color_blueviolet;
            }
        }
    }
}
</style>