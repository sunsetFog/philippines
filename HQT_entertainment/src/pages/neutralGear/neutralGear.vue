<template>
    <section id="neutralGear">

    </section>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    beforeCreate(){
        if(sessionStorage.getItem('counts')==1){
              location.reload();
              sessionStorage.setItem('counts',2);
        }
    },
    created(){
        this.variableGear();
        flashGameplayer();
        this.openFullScreen();
    },
    methods:{
        openFullScreen() {
            return this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        variableGear(){
            var that = this;
            Object.defineProperty(refreshWeb, 'state', {
                get: function() {
                    return 'state';
                },
                set: function(value) {
                    web.game_login(sessionStorage.getItem('account_number'),sessionStorage.getItem('password_number'),function() { 
                        let val = web.game_getPlayer();
                        sessionStorage.setItem('token',val.token);
                        that.$router.push({path: '/home'});
                        that.openFullScreen().close();
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
    height: 100%;
}
</style>