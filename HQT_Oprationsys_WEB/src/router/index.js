import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: false, meta: { title: '', icon: '', parent: '' }},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    meta: { title: '', icon: '' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      hidden: false,
      meta: { title: '首页', icon: 'example', parent: '' }
    }]
  },
  {
    path: '/gameusermgr',
    component: Layout,
    name: 'gameusermgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: {title: '玩家管理', icon: 'example'},
    children: [
      {
        path: 'agentaccount',
        name: 'agentaccountindex',
        hidden: true,
        component: () => import('@/views/promoters/agentaccount'),
        meta: { title: '新增总代', icon: 'guide', parent: 'gameusermgr/agentaccount' }
      },
      {
        path: 'playergamelist',
        name: 'gameuserindex',
        hidden: true,
        component: () => import('@/views/player/playergamelist'),
        meta: {title: '玩家列表', icon: 'guide', parent: 'gameusermgr/playergamelist'}
      },
      {
        path: 'accountchange',
        name:'paychgmoneyindex_bcm_rw',
        hidden: true,
        component: () => import('@/views/player/accountchange'),
        meta: {title: '批量充提账变', icon: 'guide', parent: 'gameusermgr/accountchange'}
      },
      {
        path: 'proxyaccount',
        name:'paychgmoneyindex_bcm_agent',
        hidden: true,
        component: () => import('@/views/player/proxyaccount'),
        meta: {title: '批量代理账变', icon: 'guide', parent: 'gameusermgr/proxyaccount'}
      },
      {
        path: 'bankreview',
        name:'pwdrestindex',
        hidden: true,
        component: () => import('@/views/player/bankreview'),
        meta: {title: '审核密码修改', icon: 'guide', parent: 'gameusermgr/bankreview'}
      },
      {
        path: 'recharge',
        name:'gameuserbankindex',
        hidden: true,
        component: () => import('@/views/player/recharge'),
        meta: {title: '银行反查', icon: 'guide', parent: 'gameusermgr/recharge'}
      },
      {
        path: 'agentup',
        name:'auditagentindex-am-agent',
        hidden: true,
        component: () => import('@/views/player/agentup'),
        meta: {title: '审核（代理上分）', icon: 'guide', parent: 'gameusermgr/agentup'}
      },
      {
        path: 'playerup',
        name: 'audituserindex-am-user',
        hidden: true,
        component: () => import('@/views/player/playerup'),
        meta: {title: '审核（玩家上分）', icon: 'guide', parent: 'gameusermgr/playerup'}
      },
      {
        path: 'playerdown',
        name: 'audituserindex-sm-user',
        hidden: true,
        component: () => import('@/views/player/playerdown'),
        meta: {title: '审核（玩家扣减）', icon: 'guide', parent: 'gameusermgr/playerdown'}
      },
      {
        path: 'agentdown',
        name: 'auditAgentindex-sm-agent',
        hidden: true,
        component: () => import('@/views/player/agentdown'),
        meta: {title: '审核（代理扣减）', icon: 'guide', parent: 'gameusermgr/agentdown'}
      },
      {
        path: 'negative',
        name: 'gameuserindex_reset',
        hidden: true,
        component: () => import('@/views/player/negative'),
        meta: {title: '负余额清零', icon: 'guide', parent: 'gameusermgr/negative'}
      },
      {
        path: 'tax',
        name: 'agentaccountindex_tax',
        hidden: true,
        component: () => import('@/views/player/tax'),
        meta: {title: '总代管理', icon: 'guide', parent: 'gameusermgr/tax'}
      },
      {
        path: 'codeamount',
        name: 'codeamountindex',
        hidden: true,
        component: () => import('@/views/player/codeamount'),
        meta: {title: '玩家打码量查询', icon: 'guide', parent: 'gameusermgr/codeamount'}
      },

    ]
  },
  {
    path: '/analysisdatamgr',
    component: Layout,
    name: 'analysisdatamgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '运营分析数据', icon: 'example' },
    children: [
      {
        path: 'newuser',
        name: 'newuserdayreportindex',
        hidden: true,
        component: () => import('@/views/datashow/newuser'),
        meta: { title: '新用户数据报表', icon: 'clipboard', parent: 'analysisdatamgr/newuser' }
      },
      {
        path: 'userpromotion',
        name: 'keepuserdayreportindex',
        hidden: true,
        component: () => import('@/views/datashow/userpromotion'),
        meta: { title: '用户推广数据报表', icon: 'clipboard', parent: 'analysisdatamgr/userpromotion' }
      },
      {
        path: 'businessdealday',
        name: 'businessdealdayreportindex',
        hidden: true,
        component: () => import('@/views/datashow/businessdealday'),
        meta: { title: '日常运营数据报表', icon: 'clipboard', parent: 'analysisdatamgr/businessdealday' }
      },
      {
        path: 'gamedealday',
        name: 'gamedealdayreportindex',
        hidden: true,
        component: () => import('@/views/datashow/gamedealday'),
        meta: { title: '游戏数据报表', icon: 'clipboard', parent: 'analysisdatamgr/gamedealday' }
      },
      {
        path: 'gamesinglereport',
        name: 'gamesinglereportindex',
        hidden: true,
        component: () => import('@/views/datashow/gamesinglereport'),
        meta: { title: '游戏单期', icon: 'clipboard', parent: 'analysisdatamgr/gamesinglereport' }
      },
      {
        path: 'agentorgday',
        name: 'agentorgreportindex',
        hidden: true,
        component: () => import('@/views/datashow/agentorgday'),
        meta: { title: '渠道数据报表', icon: 'clipboard', parent: 'analysisdatamgr/agentorgday' }
      },
      {
        path: 'agentteam',
        name: 'agentteamreportindex',
        hidden: true,
        component: () => import('@/views/datashow/agentteam'),
        meta: { title: '代理人员团队报表', icon: 'clipboard', parent: 'analysisdatamgr/agentteam' }
      },
      {
        path: 'agentaccountday',
        name: 'agentdatareportindex',
        hidden: true,
        component: () => import('@/views/datashow/agentaccountday'),
        meta: { title: '代理人员数据报表', icon: 'clipboard', parent: 'analysisdatamgr/agentaccountday' }
      },
      {
        path: 'gameuserrankreport',
        name: 'gameuserrankreportindex',
        hidden: true,
        component: () => import('@/views/datashow/gameuserrankreport'),
        meta: { title: '用户输赢排行', icon: 'clipboard', parent: 'analysisdatamgr/gameuserrankreport' }
      },
      {
        path: 'gameorderdetail',
        name: 'gameorderdetail',
        hidden: true,
        component: () => import('@/views/datashow/gameorderdetail'),
        meta: { title: '玩家订单明细', icon: 'clipboard', parent: 'analysisdatamgr/gameorderdetail' }
      },
      {
        path: 'rushtoask',
        name: 'fundchangeindex-rw',
        hidden: true,
        component: () => import('@/views/operatinganalysis/rushtoask'),
        meta: { title: '充提账变', icon: 'clipboard', parent: 'analysisdatamgr/rushtoask' }
      },
      {
        path: 'agentmoney',
        name: 'fundchangeindex-agent',
        hidden: true,
        component: () => import('@/views/operatinganalysis/agentmoney'),
        meta: { title: '代理资金账变', icon: 'clipboard', parent: 'analysisdatamgr/agentmoney' }
      },
      {
        path: 'payrecharge',
        name: 'payrechargeindex',
        hidden: true,
        component: () => import('@/views/game/payrecharge'),
        meta: { title: '玩家充值记录列表', icon: 'clipboard', parent: 'analysisdatamgr/payrecharge' }
      },
      {
        path: 'paywithdraw',
        name: 'paywithdrawindex',
        hidden: true,
        component: () => import('@/views/game/paywithdraw'),
        meta: { title: '玩家提款记录列表', icon: 'clipboard', parent: 'analysisdatamgr/paywithdraw' }
      },
      
      // {
      //   path: 'income',
      //   name: 'incomeindex',
      //   hidden: true,
      //   component: () => import('@/views/promoters/income'),
      //   meta: { title: '代理收益管理', icon: 'theme', parent: 'analysisdatamgr/income' }
      // },
      {
        path: 'gameuserchg',
        name: 'gameuserchgindex',
        hidden: true,
        component: () => import('@/views/game/gameuserchg'),
        meta: { title: '账变查询', icon: 'clipboard', parent: 'analysisdatamgr/gameuserchg' }
      },
      {
        path: 'gamertpset',
        name: 'gamertpsetindex',
        hidden: true,
        component: () => import('@/views/datashow/gamertpset'),
        meta: { title: 'RTP查询', icon: 'clipboard', parent: 'analysisdatamgr/gamertpset' }
      },
      {
        path: 'downloadanalysis',
        name: 'analysisindex',
        hidden: true,
        component: () => import('@/views/datashow/downloadAnalysis'),
        meta: { title: '登陆下载分析报表', icon: 'clipboard', parent: 'analysisdatamgr/downloadanalysis' }
      },
      {
        path: 'repstudiodata',
        name: 'repstudiodataindex',
        hidden: true,
        component: () => import('@/views/datashow/repstudiodata'),
        meta: { title: '工作室数据统计报表', icon: 'clipboard', parent: 'analysisdatamgr/repstudiodata' }
      },
    ]
  },
  {
    path: '/operation',
    component: Layout,
    name: 'logmgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '日志管理', icon: 'example' },
    children: [
      {
        path: 'operationlog',
        name: 'operationlogindex',
        hidden: true,
        component: () => import('@/views/operation/operationlog'),
        meta: { title: '后台操作日志', icon: 'documentation', parent: 'operation/operationlog' }
      },
      {
        path: 'sendingmail',
        name: 'sendingmailindex',
        hidden: true,
        component: () => import('@/views/operation/sendingmail'),
        meta: { title: '邮件发送日志', icon: 'documentation', parent: 'operation/sendingmail' }
      },
      {
        path: 'cancellations',
        name: 'gamelotsrclogindex',
        hidden: true,
        component: () => import('@/views/operation/cancellations'),
        meta: { title: '撤单及奖源日志', icon: 'documentation', parent: 'operation/cancellations' }
      }
    ]
  },
  {
    path: '/activitymgr',
    component: Layout,
    name: 'activitymgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '活动管理', icon: 'example' },
    children: [
      {
        path: 'createactivity',
        name: 'gameactivityindex',
        hidden: true,
        component: () => import('@/views/customerservice/createactivity'),
        meta: { title: '创建活动', icon: 'guide', parent: 'activitymgr/createactivity' }
      },
      {
        path: 'queryactivity',
        name: 'gameactivitysearchindex',
        hidden: true,
        component: () => import('@/views/customerservice/queryactivity'),
        meta: { title: '活动查询', icon: 'guide', parent: 'activitymgr/queryactivity' }
      },
      {
        path: 'registerpayment',
        name: 'reglargessmoneyindex',
        hidden: true,
        component: () => import('@/views/customerservice/registerpayment'),
        meta: { title: '注册送金', icon: 'guide', parent: 'activitymgr/registerpayment' }
      },
    ]
  },
  
  {
    path: '/gamemsgmgr',
    component: Layout,
    name: 'gamemsgmgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '游戏消息管理', icon: 'example' },
    children: [
      {
        path: 'mail',
        name: 'gameemailindex',
        hidden: true,
        component: () => import('@/views/customerservice/mail'),
        meta: { title: '邮件管理', icon: 'guide', parent: 'gamemsgmgr/mail' }
      },
      {
        path: 'notice',
        name: 'gamenoticeindex',
        hidden: true,
        component: () => import('@/views/customerservice/notice'),
        meta: { title: '公告管理', icon: 'guide', parent: 'gamemsgmgr/notice' }
      },
      {
        path: 'participateuser',
        name: 'participateuser',
        hidden: true,
        component: () => import('@/views/customerservice/participateuser'),
        meta: { title: '活动参与人员', icon: '', parent: '' }
      },
      {
        path: 'diversions',
        name: 'gamemovetextindex',
        hidden: true,
        component: () => import('@/views/customerservice/diversions'),
        meta: { title: '跑马灯', icon: 'guide', parent: 'gamemsgmgr/diversions' }
      },
      {
        path: 'banners',
        name: 'bannersindex',
        hidden: true,
        component: () => import('@/views/customerservice/banners'),
        meta: { title: '轮播广告管理', icon: 'guide', parent: 'gamemsgmgr/banners' }
      },
      // {
      //   path: 'customer',
      //   name: 'csmmessageindex',
      //   hidden: true,
      //   component: () => import('@/views/customerservice/customer'),
      //   meta: { title: '客服消息管理', icon: 'guide', parent: 'gamemsgmgr/customer' }
      // },
      // {
      //   path: 'mailtemplate',
      //   name: 'csmreplytemplateindex',
      //   hidden: true,
      //   component: () => import('@/views/customerservice/mailtemplate'),
      //   meta: { title: '邮件模板管理', icon: 'guide', parent: 'gamemsgmgr/mailtemplate' }
      // }
    ]
  },
  {
    path: '/gameconfmgr',
    component: Layout,
    name: 'gameconfmgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '游戏配置管理', icon: 'example' },
    children: [
      {
        path: 'order',
        name: 'gameorderindex',
        hidden: true,
        component: () => import('@/views/game/order'),
        meta: { title: '订单管理', icon: 'guide', parent: 'gameconfmgr/order' }
      },
      {
        path: 'gamename',
        name: 'gamenameindex',
        hidden: true,
        component: () => import('@/views/game/gamename'),
        meta: { title: '游戏设置', icon: 'guide', parent: 'gameconfmgr/gamename' }
      },
      {
        path: 'airole',
        name: 'robotsceneconfigindex',
        hidden: true,
        component: () => import('@/views/game/airole'),
        meta: { title: 'AI角色管理', icon: 'guide', parent: 'gameconfmgr/airole' }
      },
      {
        path: 'aiconfig',
        name: 'gameconfmgrindex',
        hidden: true,
        component: () => import('@/views/game/aiconfig'),
        meta: { title: 'AI配置管理', icon: 'guide', parent: 'gameconfmgr/aiconfig' }
      },
      {
        path: 'forthesource',
        name: 'lotteryawardindex',
        hidden: true,
        component: () => import('@/views/game/forthesource'),
        meta: { title: '奖源管理', icon: 'guide', parent: 'gameconfmgr/forthesource' }
      },
      {
        path: 'lottery',
        name: 'gameopenawardindex',
        hidden: true,
        component: () => import('@/views/game/lottery'),
        meta: { title: '开奖记录', icon: 'guide', parent: 'gameconfmgr/lottery' }
      },
      {
        path: 'catchno',
        name: 'lotteryawardindex_query',
        hidden: true,
        component: () => import('@/views/game/catchno'),
        meta: { title: '抓号查询', icon: 'guide', parent: 'gameconfmgr/catchno' }
      },
      {
        path: 'gamebetitem',
        name: 'gamebetitem',
        hidden: true,
        component: () => import('@/views/game/gamebetitem'),
        meta: { title: '投注项设置', icon: 'guide', parent: 'gameconfmgr/gamebetitem' }
      },
      {
        path: 'point',
        name: 'gameclickstatindex',
        hidden: true,
        component: () => import('@/views/game/point'),
        meta: { title: '点击统计', icon: 'guide', parent: 'gameconfmgr/point' }
      },
      {
        path: 'gamerecord',
        name: 'gamewmgplayrecindex',
        hidden: true,
        component: () => import('@/views/game/gamerecord'),
        meta: { title: '水浒传游戏记录', icon: 'guide', parent: 'gameconfmgr/gamerecord' }
      },
      // {
      //   path: 'gameopenaward',
      //   name: 'gameopenawardindex',
      //   hidden: true,
      //   component: () => import('@/views/game/gameopenaward'),
      //   meta: { title: '开奖查询', icon: 'guide', parent: 'gameconfmgr/gameopenaward' }
      // },
    ]
  },
  {
    path: '/thpjoinmgr',
    component: Layout,
    name: 'thpjoinmgrexpland',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '第三方接入管理', icon: 'example' },
    children: [
    ]
  },
  {
    path: '/rewithmgr',
    component: Layout,
    name: 'rewithmgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '充提管理', icon: 'example' },
    children: [
      {
        path: 'online',
        name: 'payrechargesindex',
        hidden: true,
        component: () => import('@/views/withdrawal/online'),
        meta: { title: '在线充值申请', icon: 'guide', parent: 'rewithmgr/online' }
      },
      {
        path: 'applywithdrawal',
        name: 'withdrawpostindex',
        hidden: true,
        component: () => import('@/views/system/applywithdrawal'),
        meta: { title: '在线提款申请', icon: 'tab', parent: 'rewithmgr/applywithdrawal' }
      },
      // {
      //   path: 'totalgame',
      //   name: 'totalgame',
      //   hidden: true,
      //   component: () => import('@/views/system/totalgame'),
      //   meta: { title: '游戏总额', icon: 'tab', parent: 'rewithmgrtotalgame' }
      // },
      // {
      //   path: 'totalrecharge',
      //   name: 'totalrecharge',
      //   hidden: true,
      //   component: () => import('@/views/system/totalrecharge'),
      //   meta: { title: '充值总额', icon: 'tab', parent: 'rewithmgr/totalrecharge' }
      // },
      {
        path: 'drawingcashier',
        name: 'paywithdrawindex_cashier',
        hidden: true,
        component: () => import('@/views/system/drawingcashier'),
        meta: { title: '提款出纳', icon: 'tab', parent: 'rewithmgr/drawingcashier' }
      },
      {
        path: 'riskcontrol',
        name: 'sysconfigindex2',
        hidden: true,
        component: () => import('@/views/system/riskcontrol'),
        meta: { title: '风控配置', icon: 'tab', parent: 'rewithmgr/riskcontrol' }
      },
      {
        path: 'abnormal',
        name: 'paywdrexcpmemoindex',
        hidden: true,
        component: () => import('@/views/system/abnormal'),
        meta: { title: '提款异常备注', icon: 'tab', parent: 'rewithmgr/abnormal' }
      },
      {
        path: 'withdrawals',
        name: 'sysconfigindex',
        hidden: true,
        component: () => import('@/views/system/withdrawals'),
        meta: { title: '提款设置', icon: 'tab', parent: 'rewithmgr/withdrawals' }
      },
    ]
    
  },
  {
    path: '/bank',
    component: Layout,
    name: 'bankmgrexpland',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '充提银行管理', icon: 'example' },
    children: [
      {
        path: 'quicksetbank',
        name: 'quicksetbankindex',
        hidden: true,
        component: () => import('@/views/system/quicksetbank'),
        meta: { title: '银行代码设置', icon: 'tab', parent: 'bank/quicksetbank' }
      },
      {
        path: 'topupbank',
        name: 'paybankcardindex',
        hidden: true,
        component: () => import('@/views/system/topupbank'),
        meta: { title: '充值银行设置', icon: 'tab', parent: 'bank/topupbank' }
      },
      {
        path: 'paychannel',
        name: 'paychannelindex',
        hidden: true,
        component: () => import('@/views/system/paychannel'),
        meta: { title: '充值来源设置', icon: 'tab', parent: 'bank/paychannel' }
      },
      {

        path: '/chant',
        name: 'chant',
        hidden: true,
        component: () => import('@/views/system/chant'),
        meta: { title: '充值银行列表', icon: 'tab', parent: 'bank/paychannel' }
      },
      {
        path: 'webtechnology',
        name: 'paymodeindex',
        hidden: true,
        component: () => import('@/views/withdrawal/webtechnology'),
        meta: { title: '前端分类管理', icon: 'tab', parent: 'bank/webtechnology' }
      },
      {
        path: 'bankcard',
        name: 'paybankcardlistindex',
        hidden: true,
        component: () => import('@/views/system/bankcard'),
        meta: { title: '银行卡列表', icon: 'tab', parent: 'bank/bankcard' }
      },
      {
        path: 'bankallocation',
        name: 'bankcardallocationindex',
        hidden: true,
        component: () => import('@/views/system/bankallocation'),
        meta: { title: '银行卡分配管理', icon: 'tab', parent: 'bank/bankallocation' }
      },
    ]
  },
  {
    path: '/domainmgr',
    component: Layout,
    name: 'domainmgrexpland',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '域名管理', icon: 'example' },
    children: [
      {
        path: 'domain',
        name: 'domainindex',
        hidden: true,
        component: () => import('@/views/promoters/domain'),
        meta: { title: '域名管理', icon: 'list', parent: 'domainmgr/domain' }
      },
      {
        path: 'agentdomain',
        name: 'agentusabledomainindex',
        hidden: true,
        component: () => import('@/views/promoters/agentdomain'),
        meta: { title: '代理域名管理', icon: 'list', parent: 'domainmgr/agentdomain' }
      },
      {
        path: 'virtualagent',
        name: 'virtualagentindex',
        hidden: true,
        component: () => import('@/views/promoters/virtualagent'),
        meta: { title: '推广链接管理', icon: 'list', parent: 'domainmgr/virtualagent' },
      },
      {
        path: 'virtualagentgetinfo',
        name: 'virtualagentgetinfoindex',
        hidden: true,
        component: () => import('@/views/promoters/virtualagentgetinfo'),
        meta: { title: '查看代理详情', icon: 'list', parent: 'domainmgr/virtualagentgetinfo' },
      },
      {
        path: 'webdownpage',
        name: 'webdownpageindex',
        hidden: true,
        component: () => import('@/views/promoters/webdownpage'),
        meta: { title: '下载页管理', icon: 'list', parent: 'domainmgr/webdownpage' },
      },
    ]
  },
  
  {
    path: '/employmgr',
    component: Layout,
    name: 'employmgrexpand',
    redirect: 'noredirect',
    hidden: true,
    alwaysShow: true,
    meta: { title: '渠道管理', icon: 'example' },
    children: [
      {
        path: 'org',
        name: 'orgindex',
        hidden: true,
        component: () => import('@/views/promoters/org'),
        meta: { title: '渠道组管理', icon: 'excel', parent: 'employmgr/org' }
      },
      {
        path: 'thpmerchant',
        name: 'thpmerchantindex',
        hidden: true,
        component: () => import('@/views/system/thpmerchant'),
        meta: { title: '商户管理', icon: 'tab', parent: 'employmgr/thpmerchant' }
      }
    ]
  },
  {
    path: '/backendmgr',
    component: Layout,
    redirect: 'noredirect',
    name: 'backendmgrexpand',
    hidden: true,
    meta: { title: '后台管理', icon: 'example', parent: '' },
    children: [
      {
        path: 'role',
        name: 'roleindex',
        hidden: true,
        component: () => import('@/views/permissions/role'),
        meta: { title: '角色管理', icon: 'user' , parent: 'backendmgr/role'}
      },
      {
        path: 'power',
        name: 'privilegeindex',
        hidden: true,
        component: () => import('@/views/permissions/power'),
        meta: { title: '权限管理', icon: 'tree', parent: 'backendmgr/power' }
      },
      {
        path: 'account',
        name: 'accountindex',
        hidden: true,
        component: () => import('@/views/permissions/account'),
        meta: { title: '账号管理', icon: 'table', parent: 'backendmgr/account' }
      },
      {
        path: 'pointson',
        name: 'sysauditindex',
        hidden: true,
        component: () => import('@/views/permissions/pointson'),
        meta: { title: '上分权限', icon: 'table', parent: 'backendmgr/pointson' }
      },
      {
        path: 'datacleaning',
        name: 'syscleardatasetindex',
        hidden: true,
        component: () => import('@/views/permissions/datacleaning'),
        meta: { title: '数据清理', icon: 'tab' , parent: 'backendmgr/datacleaning'}
      },
      {
        path: 'accountcommnav',
        name: 'accountcommnavindex',
        hidden: true,
        component: () => import('@/views/system/accountcommnav'),
        meta: { title: '公共导航', icon: 'tab', parent: 'backendmgr/accountcommnav' }
      },
    ]
  },

  // {
  //   path: '/customer',
  //   component: Layout,
  //   redirect: '/customerservice',
  //   name: 'customer',
  //   hidden: false,
  //   meta: { title: '客服', icon: '' },
  //   children: [{
  //     path: 'customerservice',
  //     component: () => import('@/views/customer/index'),
  //     hidden: false,
  //     meta: { title: '客服', icon: 'example', parent: '' }
  //   }]
  // },


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
