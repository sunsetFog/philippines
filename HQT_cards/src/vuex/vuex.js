import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    menuState: 0
}

const mutations={
	navigation(state,params){
		sessionStorage.setItem('navigation',params.num);
		state.menuState = params.num;
	}
}


const getters = {
	ready:function(state){
		return state.numbers-=120
	}
}

const actions = {
	mutation(res){
		res.commit('submitMatations',{id: 6,city: '茂名'})
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
})
