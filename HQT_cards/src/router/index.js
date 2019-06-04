import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/pages/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',component:resolve => require(['@/pages/home'],resolve),
      children: [
        {path: '/home',name: 'hPage',meta: {title: '首页',navigation: 0},component: resolve => require(['@/pages/homePage/homePage.vue'],resolve)},
        {path: '/cards',name: 'cards',meta: {title: '棋牌',navigation: 1},component: resolve => require(['@/pages/cards/cards.vue'],resolve)},
        {path: '/lottery',meta: {title: '彩票',navigation: 2},component: resolve => require(['@/pages/lottery/lottery.vue'],resolve),
          children: [
            {path: 'fivestars',name: 'fiveStars',meta: {title: '五星',navigation: 2},component: resolve => require(['@/pages/lottery/fiveStars.vue'],resolve)},
            {path: 'fourstars',name: 'fourStars',meta: {title: '四星',navigation: 2},component: resolve => require(['@/pages/lottery/fourStars.vue'],resolve)},
            {path: 'afteryards',name: 'afterYards',meta: {title: '后三码',navigation: 2},component: resolve => require(['@/pages/lottery/afterYards.vue'],resolve)},
            {path: 'frontyards',name: 'frontYards',meta: {title: '前三码',navigation: 2},component: resolve => require(['@/pages/lottery/frontYards.vue'],resolve)},
            {path: 'middleyards',name: 'middleYards',meta: {title: '中三码',navigation: 2},component: resolve => require(['@/pages/lottery/middleYards.vue'],resolve)},
            {path: 'twoyards',name: 'twoYards',meta: {title: '二码',navigation: 2},component: resolve => require(['@/pages/lottery/twoYards.vue'],resolve)},
            {path: 'location',name: 'location',meta: {title: '定位胆',navigation: 2},component: resolve => require(['@/pages/lottery/location.vue'],resolve)},
            {path: 'nolacation',name: 'noLocation',meta: {title: '不定胆',navigation: 2},component: resolve => require(['@/pages/lottery/noLocation.vue'],resolve)},
            {path: 'singledouble',name: 'singleDouble',meta: {title: '大小单双',navigation: 2},component: resolve => require(['@/pages/lottery/singleDouble.vue'],resolve)},
            {path: 'interest',name: 'interest',meta: {title: '趣味',navigation: 2},component: resolve => require(['@/pages/lottery/interest.vue'],resolve)},
            {path: '/',redirect: '/lottery/afteryards'}
          ]
        },
        {path: '/realperson',name: 'realPerson',meta: {title: '真人',navigation: 3},component: resolve => require(['@/pages/realPerson/realPerson.vue'],resolve)},
        {path: '/sports',name: 'sports',meta: {title: '体育',navigation: 4},component: resolve => require(['@/pages/sports/sports.vue'],resolve)},
        {path: '/videogame',name: 'videoGame',meta: {title: '电玩',navigation: 5},component: resolve => require(['@/pages/videoGame/videoGame.vue'],resolve)},
        {path: '/baoYou',name: 'baoYou',meta: {title: '宝友',navigation: 6},component: resolve => require(['@/pages/baoYou/baoYou.vue'],resolve)},
        {path: '/mcenter',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/managementCenter.vue'],resolve),
          children: [
            {path: 'crux',name: 'crux',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/crux.vue'],resolve)},
            {path: 'chesscard',name: 'chessCard',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/chessAndCard.vue'],resolve)},
            {path: 'teaminfo',name: 'teamInfo',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/teamInfo.vue'],resolve)},
            {path: 'agent',name: 'agent',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/agent.vue'],resolve)},
            {path: 'player',name: 'gamePlayer',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/gamePlayer.vue'],resolve)},
            {path: 'finance',name: 'finance',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/finance.vue'],resolve)},
            {path: 'profit',name: 'profit',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/profit.vue'],resolve)},
            {path: 'extension',name: 'extension',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/extension.vue'],resolve)},
            {path: 'notice',name: 'notice',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/notice.vue'],resolve)},
            {path: 'lotteryinfo',name: 'lotteryInformation',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/lotteryInformation.vue'],resolve)},
            {path: 'lotteryteam',name: 'lotteryTeam',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/lotteryTeam.vue'],resolve)},
            {path: 'lotteryreport',name: 'lotteryReport',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/lotteryReport.vue'],resolve)},
            {path: 'electronicsports',name: 'electronicSports',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/electronicSports.vue'],resolve)},
            {path: 'lotterynotice',name: 'lotteryNotice',meta: {title: '管理中心',navigation: 7},component: resolve => require(['@/pages/managementCenter/lotteryNotice.vue'],resolve)},
            {path: '/',redirect: '/mcenter/crux'}
          ]
        },
        {path: '/',redirect: '/home'}
      ]
    },
    {path: '/login',name: 'Login',meta: {title: '登陆'},component: resolve => require(['@/pages/login/login'],resolve)}
  ]
})
