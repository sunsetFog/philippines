<template>
        <section id="home_game" :style="{height: count_height+300+'px'}">
            <el-button :disabled="count_height==930" style="margin: 20px 0px 0px 100px;" @click="zoomMeans(1)">放大</el-button>
            <el-button :disabled="count_height==530" style="margin: 20px 0px 0px 20px;" @click="zoomMeans(2)">缩小</el-button>
        </section>
</template>

<script>
    export default{
        data(){
            return{
                count_height: 630,
            }
        },
        methods:{
            zoomMeans(value){
                if(value==1){
                    if(this.count_height<930){
                        this.count_height = this.count_height+100;
                        zoomGame(this.count_height);
                        window.dispatchEvent(new Event('resize'));//触发窗口调整大小事件
                    }
                }else if(value==2){
                    if(this.count_height>530){
                        this.count_height = this.count_height-100;
                        zoomGame(this.count_height);
                        window.dispatchEvent(new Event('resize'));
                    }
                }
            },
        }
    }

</script>

<style lang="less" scoped>
#home_game{

}
</style>