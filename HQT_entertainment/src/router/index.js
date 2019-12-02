import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/pages/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: resolve => require(['@/pages/home'], resolve),
      children: [
        { path: '/home', name: 'home', meta: { title: '首页'}, component: resolve => require(['@/pages/homePage/index.vue'], resolve) },
        { path: '/lottery', meta: { title: '彩票'}, component: resolve => require(['@/pages/lottery/lottery.vue'], resolve) },
        { path: '/realperson', name: 'realPerson', meta: { title: '真人'}, component: resolve => require(['@/pages/realPerson/realPerson.vue'], resolve) },
        { path: '/sports', name: 'sports', meta: { title: '体育'}, component: resolve => require(['@/pages/sports/sports.vue'], resolve) },
        { path: '/videogame', name: 'videoGame', meta: { title: '电玩'}, component: resolve => require(['@/pages/videoGame/videoGame.vue'], resolve) },
        { path: '/agentsystem', name: 'agentSystem', meta: { title: '代理'}, component: resolve => require(['@/pages/agentSystem/agentSystem.vue'], resolve) },
        {
          path: '/mcenter', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/managementCenter.vue'], resolve),
          children: [
            { path: '/crux', name: 'crux', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/crux.vue'], resolve) },
            { path: '/chesscard', name: 'chessCard', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/chessAndCard.vue'], resolve) },
            { path: '/teaminfo', name: 'teamInfo', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/teamInfo.vue'], resolve) },
            { path: '/agent', name: 'agent', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/agent.vue'], resolve) },
            { path: '/player', name: 'gamePlayer', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/gamePlayer.vue'], resolve) },
            { path: '/finance', name: 'finance', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/finance.vue'], resolve) },
            { path: '/profit', name: 'profit', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/profit.vue'], resolve) },
            { path: '/extension', name: 'extension', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/extension.vue'], resolve) },
            { path: '/notice', name: 'notice', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/notice.vue'], resolve) },
            { path: '/lotteryinfo', name: 'lotteryInformation', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/lotteryInformation.vue'], resolve) },
            { path: '/lotteryteam', name: 'lotteryTeam', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/lotteryTeam.vue'], resolve) },
            { path: '/lotteryreport', name: 'lotteryReport', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/lotteryReport.vue'], resolve) },
            { path: '/electronicsports', name: 'electronicSports', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/electronicSports.vue'], resolve) },
            { path: '/lotterynotice', name: 'lotteryNotice', meta: { title: '管理中心'}, component: resolve => require(['@/pages/managementCenter/lotteryNotice.vue'], resolve) },
            { path: '/', redirect: '/crux' }
          ]
        },
        { path: '/', redirect: '/home' }
      ]
    },
    { path: '/login', name: 'Login', meta: { title: '登陆'}, component: resolve => require(['@/pages/login/login'], resolve) },
    { path: '/line', name: 'Line', meta: { title: '线路检测'}, component: resolve => require(['@/pages/login/line'], resolve) },
    { path: '/register', name: 'Register', meta: { title: '注册'}, component: resolve => require(['@/pages/register/register'], resolve) },
    { path: '/game', name: 'game', meta: { title: '首页'}, component: resolve => require(['@/pages/game/game.vue'], resolve) },
    { path: '/neutralgear', name: 'neutralGear', meta: { title: '加载中'}, component: resolve => require(['@/pages/neutralGear/neutralGear'], resolve) },
    { path: '/download', name: 'download', meta: { title: '下载中心'}, component: resolve => require(['@/pages/download/download'], resolve) }
  ]
})
