import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/layout/home'

Vue.use(Router)

// 静态路由（无需权限）
export const constantRouterMap = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/login'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    redirect: '/',
    component: Home
  },
  {
    path: '/teamreport',
    name: 'teamreport',
    component: () => import('@/views/report/teamreport'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/information/personal'),
  },
  {
    path: '/earnings',
    name: 'earnings',
    component: () => import('@/views/earnings/index'),
  },
  {
    path: '/teamreportsearch',
    name: 'teamreportsearch',
    component: () => import('@/views/report/teamreportsearch'),
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: () => import('@/views/layout/withdrawal'),
  },
  {
    path: '/email',
    name: 'email',
    component: () => import('@/views/information/email'),
  },
  {
    path: '/pwd',
    name: 'pwd',
    component: () => import('@/views/information/pwd'),
  },
  {
    path: '/settlement',
    name: 'settlement',
    component: () => import('@/views/information/settlement'),
  },
  {
    path: '/bankcard',
    name: 'bankcard',
    component: () => import('@/views/information/bankcard'),
  },
  {
    path: '/daydegrees',
    name: 'daydegrees',
    component: () => import('@/views/report/daydegrees'),
  },
  {
    path: '/lowerlevel',
    name: 'lowerlevel',
    component: () => import('@/views/report/lowerlevel')
  },
  {
    path: '/agent',
    name: 'agent',
    component: () => import('@/views/report/agent')
  },
  {
    path: '/agentgetinfo',
    name: 'agentgetinfo',
    component: () => import('@/views/report/agentgetinfo')
  },
  {
    path: '/updateagent',
    name: 'updateagent',
    component: () => import('@/views/report/updateagent')
  },
  {
    path: '/http',
    name: 'http',
    component: () => import('@/views/report/http')
  },
  {
    path: '/bankcardchange',
    name: 'bankcardchange',
    component: () => import('@/views/information/bankcardchange')
  },
  {
    path: '/bankcardadd',
    name: 'bankcardadd',
    component: () => import('@/views/information/bankcardadd')
  },
  {
    path: '/bankradio',
    name: 'bankradio',
    component: () => import('@/views/information/bankradio')
  },
  {
    path: '/bankcarddel',
    name: 'bankcarddel',
    component: () => import('@/views/information/bankcarddel')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('@/views/report/record')
  },
  {
    path: '/withdrawalrecord',
    name: 'withdrawalrecord',
    component: () => import('@/views/report/withdrawalrecord')
  },{
    path: '/plaverreport',
    name: 'plaverreport',
    component: () => import('@/views/report/plaverreport')
  },
  {
    path: '/playerreportsearch',
    name: 'playerreportsearch',
    component: () => import('@/views/report/playerreportsearch')
  },
  {
    path: '/plaverlist',
    name: 'plaverlist',
    component: () => import('@/views/report/plaverlist')
  },
  {
    path: '/playerinfo',
    name: 'playerinfo',
    component: () => import('@/views/report/playerinfo')
  },
  {
    path: '/dayinfo',
    name: 'dayinfo',
    component: () => import('@/views/report/dayinfo')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/report/game')
  },
  {
    path: '/gamereport',
    name: 'gamereport',
    component: () => import('@/views/report/gamereport')
  },
  {
    path: '/teaminfo',
    name: 'teaminfo',
    component: () => import('@/views/report/teaminfo')
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
