<template>
    <section id="game_theme"></section>
</template>

<script>
export default {
    props: ['subject'],
    data(){
        return{

        }
    },
    created(){
        if(this.subject==true){
            this.changeMeans();
        }
    },
    methods: {
        openFullScreen() {
            return this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        changeMeans(){
            // console.log('subject######');
            this.variableChange1();
            this.variableChange2();
        },
        variableChange1(){
            var that = this;
            Object.defineProperty(sceneWeb, 'type', {
                get: function() {
                    return 'type';
                },
                set: function(value) {
                    if(value=='999992'){
                        that.$router.push({path: '/home'});
                        web.game_exit_scene(function(value){});
                    }else if(value=='999991'||value=='999993'||value=='999994'||value=='999995'){
                        that.$router.push({path: '/game'});
                        that.openFullScreen().close();
                    }
                }
            });
        },
        variableChange2(){
            var that = this;
            Object.defineProperties(errorCodeGame,{
                code:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        if(value==1001||value==1002||value==1101||value==1102||value==1103||value==1104||value==1105||value==1201||value==1202||value==1203||value==1204||value==1301||value==1302||value==1303||value==1||value==2){
                            that.$router.push({path: '/home'});
                            that.openFullScreen().close();
                            web.game_exit_scene(function(value){});
                        }
                    }
                },
                overtime:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        that.$router.push({path: '/home'});
                        that.openFullScreen().close();
                        web.game_exit_scene(function(value){});
                        that.$message.error('请求超时!');
                    }
                },
                move:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        that.$emit('interaction',value);
                    }
                },
                socket:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        that.$confirm('服务器连接已断开，是否重连？', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            web.game_relogin();
                        }).catch(() => {
                            web.game_clear();
                        });
                    }
                },
                description:{
                    configurable: true,
                    get:function(){

                    },
                    set:function(value){
                        that.$alert(value, '温馨提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {

                            }
                        });
                    }
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
#game_theme{
    width: 100%;
    height: 0px;
}
</style>