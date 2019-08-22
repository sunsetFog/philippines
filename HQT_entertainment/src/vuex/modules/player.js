const player = {
    state: {
        userInfo: {}
    },
    mutations: {

    },
    getters: {
        player_info: state => state.userInfo,
        money(state){
            console.log('player_money',state.userInfo.money);
            let money = state.userInfo.money/10000;
            money = money.toFixed(4);
            money = money.substring(0, money.length - 1);
            money = money.substring(0, money.length - 1);
            return money;
        }
    },
    actions: {
        getPlayerInfo({state,commit,dispatch},response){
            console.log('player',response);
            state.userInfo = response;
            sessionStorage.setItem('token',response.token);
        }
    }
}

export default player;