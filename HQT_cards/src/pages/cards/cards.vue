<template>
<section id="cards">
        <!-- <button @click="playerMeans()">进入游戏</button> -->
</section>
</template>

<script>
    export default{
        data(){
            return{
            }
        },
        methods:{
            playerMeans(){
                web.game_startGame('fishjoy');
                // web.game_back2GameFromLobby(false);
            }
        }
    }

</script>

<style lang="less" scoped>
#cards{
    button{
        .mixin_button(120px,35px,#276699,#edebf0);
        margin: 20px 0px 0px 20px;
    }
}
</style>