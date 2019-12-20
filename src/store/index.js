import Vue from 'vue'
import Vuex from 'vuex'
//导入某一个函数
// import {getAdminInfo} from '@/api/getData'
import {
    login
} from '@/api/api'
//vue的状态管理
Vue.use(Vuex)

const state = { //状态，用于组件之间的通讯
    adminInfo: {
        avatar: 'default.jpg'
    },
    user: {},
    customerListInfo:[],
    searchContent:"",
}

const mutations = { //立即触发状态，用于同步进行状态触发
    saveUserInfo(state, userInfo) {
        state.user = userInfo;
    },
    saveCustomerListInfo(state, customerListInfo){
        state.customerListInfo = customerListInfo;
    },
    saveSearchContent(state, searchContent){
        state.searchContent = searchContent;
    }
}

const actions = { //异步触发状态，用户异步触发mutations,从而更改状态
    async getUserInfo({
        commit
    }) {
        try {
            const res = await login({});
            if (res.status == 0) {
                commit('saveUserInfo', res.data);
            } else {
                throw new Error(res);
            }
        } catch (err) {
            alert('您尚未登陆或者session失效');
        }
    },
    saveUserInfo({
        commit
    }, userInfo) {
        commit('saveUserInfo', userInfo)
    },
    
    saveCustomerListInfo({commit}, customerListInfo) {
        commit('saveCustomerListInfo', customerListInfo)
    },
    saveSearchContent({commit}, searchContent) {
        commit('saveSearchContent', searchContent)
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})