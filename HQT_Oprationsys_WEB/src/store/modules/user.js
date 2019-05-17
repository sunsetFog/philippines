import { getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '../../router'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    navList: [],
    roleadd: false,
    roledel: false,
    roleupdate: false,
    rolegetlist: false,
    privilegeadd: false,
    privilegedel: false,
    privilegeupdate: false,
    accountadd: false,
    accountdel: false,
    accountgetlist: false,
    accountupdate: false,
    accountaddCmoney: false,
    accountresetLoginPwd: false,
    accountcommnavadd: false,
    accountcommnavdel: false,
    accountcommnavupdate: false,
    agentaccountadd: false,
    agentaccountdel: false,
    agentaccountupdate: false,
    agentaccountupdateStatus: false,
    domainupdate: false,
    domainadd: false,
    domaindel: false,
    incomeadd: false,
    incomedel: false,
    incomeupdate: false,
    orgadd: false,
    orgdel: false,
    orgupdate: false,
    operationloggetlist: false,
    agentaccountgetlist: false,
    domaingetlist: false,
    incomegetlist: false,
    orggetlist: false,
    newuserdayreportgetlist: false,
    keepuserdayreportgetlist: false,
    businessdealdayreportgetlist: false,
    gamedealdayreportgetlist: false,
    agentorgdayreportgetlist: false,
    agentaccountdayreportgetlist: true, //by test
    gameemailgetlist: false,
    gameemailadd: false,
    gameemailgetinfo: false,
    gameemailgetreceiverlist: false,
    gamenoticeadd: false,
    gamenoticedel: false,
    gamenoticeupdate: false,
    gamenoticegetlist: false,
    gameactivityupdate: false,
    gameactivityadd: false,
    gameactivitydel: false,
    gameactivitygetlist: false,
    gameactivitysearchsearchactivity: false,
    gameactivitysearchgetjoinuserlist: false,
    gameactivitysearchgetdayjoinusersum: false,
    quicksetbankgetlist: false,
    quicksetbankadd: false,
    quicksetbankupdate: false,
    quicksetbankdel: false,
    paychanneladd: false,
    paychannelupdate: false,
    paychanneldel: false,
    paychannelgetlist: false,
    paychannelgetinfo: false,
    paychanneladdchannelbank: false,
    paychanneldelchannelbank: false,
    paychannelupdatechannelbank: false,
    paychannelgetlistchannelbank: false,
    paychannelbankupdatestatus: false,
    thpmerchantadd: false,
    thpmerchantdel: false,
    thpmerchantupdate: false,
    thpmerchantgetlist: false,
    gameusergetinfo: false,
    gameordergetlist: false,
    payrechargegetlist: false,
    paywithdrawgetlist: false,
    gamenamegetlist: false,
    gamenameadd: false,
    gamenamedel: false,
    gamenameupdate: false,
    gamebetitemgetlist: false,
    gamebetitemadd: false,
    gamebetitemdel: false,
    gamebetitemupdate: false,
    gameopenawardgetlist: false,
    gameopenawardkillorder: false,
    gameuserchggetlist: false,
    gamesinglereportgetlist: false,
    gameuserrankreportgetlist: false,
    gameuserrankreportgameorderdetail: false,
    gameuserbankgethistorylist: false,
    sysauditadd: false,
    sysauditdel: false,
    sysauditupdate: false,
    sysauditgetlist: false,
    fundchangerechargewithdrawlist: false,
    fundchangeagentfundlist: false,
    fundchangeexportrechargewithdraw: false,
    fundchangeexportagentfund: false,
    paychgmoneygetchargeup: false,
    paychgmoneybatchcharge: false,
    paychgmoneygetagentup: false,
    paychgmoneybatchagent: false,
    auditAgentgetaddscorelist: false,
    auditAgentauditaddscore: false,
    auditAgentgetdeductlist: false,
    auditAgentauditdeduct: false,
    auditusergetdeductlist: false,
    audituserauditdeduct: false,
    auditusergetaddscorelist: false,
    audituserauditaddscore: false,
    pwdrestgetlist: false,
    pwdrestauditpwd: false,
    payrechargesgetauditlist: false,
    payrechargesexcelexport: false,
    payrechargesauditone: false,
    payrechargesaudittwo: false,
    gameusergetchildusers: false,
    gameuserresetpassword: false,
    gameuserdelbind: false,
    gameuserfrozeuser: false,
    gameuserchangeusertype: false,
    gameuserchangeuserremark: false,
    gameusergetlist: false,
    gameusergetimpinfo: false,
    paychgmoneyaddmoney: false,
    paychgmoneysubmoney: false,
    gameuserbankunbind: false,
    gameuserexportuserdata: false,
    lotteryawardgetawardlist: false,
    lotteryawardupdatecycle: false,
    lotteryawardupdatestatus: false,
    lotteryawardgetresult: false,
    lotteryawardupdate: false,
    fundchangeagentfundlinklist: false,
    gameusernegativeclearzero: false,
    paychannelupdatestatus: false,
    paychannelupdatevalgread: false,
    paychannelupdatecompay: false,
    gameuserchangeuseragent: false,
    gamelotsrcloggetlist: false,
    gamesetsavebase: false,
    gamesetupdatetable: false,
    gamesetaddtable: false,
    gamesetupdatetablestatus: false,
    gamesetupdatebetitem: false,
    gamesetaddbetitem: false,
    gamesetgetbetitemlist: false,
    gamesetgetawardsrclist: false,
    paymodeadd: false,
    paymodedel: false,
    paymodeupdate: false,
    paymodeupdatestatus: false,
    sysconfiggetconfiginfo: false,
    sysconfigdepositconfig: false,
    sysconfigriskcontroller: false,
    paywdrexcpmemogetlist: false,
    paywdrexcpmemoadd: false,
    paywdrexcpmemodel: false,
    paywdrexcpmemoupdate: false,
    paywdrexcpmemoexportlist: false,
    withdrawpostgetlist: false,
    withdrawpostexportgetlist: false,
    withdrawpostupdateauditstatus: false,
    withdrawpostgetinfo: false,
    withdrawpostexceptionlist: false,
    agentaccountgettaxlist: false,
    agentaccountupdatetax: false,
    paywithdrawgetcashlist: false,
    paywithdrawgetinfocash: false,
    paywithdrawauditwithdraw: false,
    gamemovetextgetlist: false,
    gamemovetextdel: false,
    gamemovetextadd: false,
    gamemovetextupdate: false,
    gamemovetextgetinfo: false,
    gameorderexportorderlist: false,
    gamesetwmgaddqbmoney: false,
    gamesetwmgupdateqbmoney: false,
    gamesetwmgdelqbmoney: false,
    gamesetfruitsetrate: false,
    gamesetfruitaddtrain: false,
    gamesetfruitfruitratelist: false,
    gamesetfruitdeltrainrate: false,
    gamefishsetupdategamefish: false,
    gamefishsetgetgamefishinfo: false,
    gamemovetextrepeatpush: false,
    gameclickstatgetlist: false,
    gameclickstatdownloadlist: false,
    gamewmgplayrecgetlist: false
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    //获取用户信息
    GetInfo ({commit,dispatch}) {
      getUserInfo().then(res => {
        if (res.data.menu && res.data.menu.length > 0) {
          commit('SET_ROLES', res.data.menu)
          dispatch('getbtn', res.data.menu)
          dispatch('getnewroles', res.data.menu)
        }
        setToken(res.data.token)
        commit('SET_TOKEN', res.data.token)
        commit('SET_NAME', res.data.nickname)
      }).catch(error => {
      })
    },
    //获取按钮权限
    getbtn ({state},menu) {
      menu.map (item =>{
        let buttonshow =  item.controller + item.action
        if (buttonshow === 'roleadd') {
          state.roleadd = true
        }
        if (buttonshow === 'roledel') {
          state.roledel = true
        }
        if (buttonshow === 'roleupdate') {
          state.roleupdate = true
        }
        if (buttonshow === 'rolegetlist') {
          state.rolegetlist = true
        }
        if (buttonshow === 'privilegeadd') {
          state.privilegeadd = true
        }
        if (buttonshow === 'privilegedel') {
          state.privilegedel = true
        }
        if (buttonshow === 'privilegeupdate') {
          state.privilegeupdate = true
        }
        if (buttonshow === 'accountadd') {
          state.accountadd = true
        }
        if (buttonshow === 'accountdel') {
          state.accountdel = true
        }
        if (buttonshow === 'accountupdate') {
          state.accountupdate = true
        }
        if (buttonshow === 'accountgetlist') {
          state.accountgetlist = true
        }
        if (buttonshow === 'accountaddCmoney') {
          state.accountaddCmoney = true
        }
        if (buttonshow === 'accountresetloginpwd') {
          state.accountresetLoginPwd = true
        }
        if (buttonshow === 'accountcommnavadd') {
          state.accountcommnavadd = true
        }
        if (buttonshow === 'accountcommnavdel') {
          state.accountcommnavdel = true
        }
        if (buttonshow === 'accountcommnavupdate') {
          state.accountcommnavupdate = true
        }
        if (buttonshow === 'agentaccountadd') {
          state.agentaccountadd = true
        }
        if (buttonshow === 'agentaccountdel') {
          state.agentaccountdel = true
        }
        if (buttonshow === 'agentaccountupdate') {
          state.agentaccountupdate = true
        }
        if (buttonshow === 'agentaccountupdateStatus') {
          state.agentaccountupdateStatus = true
        }
        if (buttonshow === 'domainupdate') {
          state.domainupdate = true
        }
        if (buttonshow === 'domainadd') {
          state.domainadd = true
        }
        if (buttonshow === 'incomeadd') {
          state.incomeadd = true
        }
        if (buttonshow === 'incomedel') {
          state.incomedel = true
        }
        if (buttonshow === 'incomeupdate') {
          state.incomeupdate = true
        }
        if (buttonshow === 'orgadd') {
          state.orgadd = true
        }
        if (buttonshow === 'orgdel') {
          state.orgdel = true
        }
        if (buttonshow === 'orgupdate') {
          state.orgupdate = true
        }
        if (buttonshow === 'operationloggetlist') {
          state.operationloggetlist = true
        }
        if (buttonshow === 'agentaccountgetlist') {
          state.agentaccountgetlist = true
        }
        if (buttonshow === 'domaingetlist') {
          state.domaingetlist = true
        }
        if (buttonshow === 'incomegetlist') {
          state.incomegetlist = true
        }
        if (buttonshow === 'orggetlist') {
          state.orggetlist = true
        }
        if (buttonshow === 'newuserdayreportgetlist') {
          state.newuserdayreportgetlist = true
        }
        if (buttonshow === 'keepuserdayreportgetlist') {
          state.keepuserdayreportgetlist = true
        }
        if (buttonshow === 'businessdealdayreportgetlist') {
          state.businessdealdayreportgetlist = true
        }
        if (buttonshow === 'gamedealdayreportgetlist') {
          state.gamedealdayreportgetlist = true
        }
        if (buttonshow === 'agentorgreportgetlist') {
          state.agentorgdayreportgetlist = true
        }
        if (buttonshow === 'agentdatareportgetlist') {
          state.agentaccountdayreportgetlist = true
        }
        if (buttonshow === 'gameemailgetlist') {
          state.gameemailgetlist = true
        }
        if (buttonshow === 'gameemailadd') {
          state.gameemailadd = true
        }
        if (buttonshow === 'gameemailgetinfo') {
          state.gameemailgetinfo = true
        }
        if (buttonshow === 'gameemailgetreceiverlist') {
          state.gameemailgetreceiverlist = true
        }
        if (buttonshow === 'gamenoticeadd') {
          state.gamenoticeadd = true
        }
        if (buttonshow === 'gamenoticedel') {
          state.gamenoticedel = true
        }
        if (buttonshow === 'gamenoticeupdate') {
          state.gamenoticeupdate = true
        }
        if (buttonshow === 'gamenoticegetlist') {
          state.gamenoticegetlist = true
        }
        if (buttonshow === 'gameactivityupdate') {
          state.gameactivityupdate = true
        }
        if (buttonshow === 'gameactivityadd') {
          state.gameactivityadd = true
        }
        if (buttonshow === 'gameactivitygetlist') {
          state.gameactivitygetlist = true
        }
        if (buttonshow === 'gameactivitydel') {
          state.gameactivitydel = true
        }
        if (buttonshow === 'gameactivitysearchsearchactivity') {
          state.gameactivitysearchsearchactivity = true
        }
        if (buttonshow === 'gameactivitysearchgetjoinuserlist') {
          state.gameactivitysearchgetjoinuserlist = true
        }
        if (buttonshow === 'gameactivitysearchgetdayjoinusersum') {
          state.gameactivitysearchgetdayjoinusersum = true
        }
        if (buttonshow === 'quicksetbankadd') {
          state.quicksetbankadd = true
        }
        if (buttonshow === 'quicksetbankdel') {
          state.quicksetbankdel = true
        }
        if (buttonshow === 'quicksetbankupdate') {
          state.quicksetbankupdate = true
        }
        if (buttonshow === 'quicksetbankgetlist') {
          state.quicksetbankgetlist = true
        }
        if (buttonshow === 'paychanneladd') {
          state.paychanneladd = true
        }
        if (buttonshow === 'paychannelupdate') {
          state.paychannelupdate = true
        }
        if (buttonshow === 'paychanneldel') {
          state.paychanneldel = true
        }
        if (buttonshow === 'paychannelgetlist') {
          state.paychannelgetlist = true
        }
        if (buttonshow === 'paychannelgetinfo') {
          state.paychannelgetinfo = true
        }
        if (buttonshow === 'paychannelbankadd') {
          state.paychanneladdchannelbank = true
        }
        if (buttonshow === 'paychannelbankdel') {
          state.paychanneldelchannelbank = true
        }
        if (buttonshow === 'paychannelbankupdate') {
          state.paychannelupdatechannelbank = true
        }
        if (buttonshow === 'paychannelbankgetlist') {
          state.paychannelgetlistchannelbank = true
        }
        if (buttonshow === 'paychannelbankupdatestatus') {
          state.paychannelbankupdatestatus = true
        }
        if (buttonshow === 'thpmerchantadd') {
          state.thpmerchantadd = true
        }
        if (buttonshow === 'thpmerchantdel') {
          state.thpmerchantdel = true
        }
        if (buttonshow === 'thpmerchantupdate') {
          state.thpmerchantupdate = true
        }
        if (buttonshow === 'thpmerchantgetlist') {
          state.thpmerchantgetlist = true
        }
        if (buttonshow === 'gameusergetinfo') {
          state.gameusergetinfo = true
        }
        if (buttonshow === 'gameordergetlist') {
          state.gameordergetlist = true
        }
        if (buttonshow === 'payrechargegetlist') {
          state.payrechargegetlist = true
        }
        if (buttonshow === 'paywithdrawgetlist') {
          state.paywithdrawgetlist = true
        }
        if (buttonshow === 'gamenamegetlist') {
          state.gamenamegetlist = true
        }
        if (buttonshow === 'gamenameadd') {
          state.gamenameadd = true
        }
        if (buttonshow === 'gamenamedel') {
          state.gamenamedel = true
        }
        if (buttonshow === 'gamenameupdate') {
          state.gamenameupdate = true
        }
        if (buttonshow === 'gamebetitemgetlist') {
          state.gamebetitemgetlist = true
        }
        if (buttonshow === 'gamebetitemadd') {
          state.gamebetitemadd = true
        }
        if (buttonshow === 'gamebetitemdel') {
          state.gamebetitemdel = true
        }
        if (buttonshow === 'gamebetitemupdate') {
          state.gamebetitemupdate = true
        }
        if (buttonshow === 'gameopenawardgetlotterylist') {
          state.gameopenawardgetlist = true
        }
        if (buttonshow === 'gameopenawardkillorder') {
          state.gameopenawardkillorder = true
        }
        if (buttonshow === 'gameuserchggetlist') {
          state.gameuserchggetlist = true
        }
        if (buttonshow === 'gamesinglereportgetlist') {
          state.gamesinglereportgetlist = true
        }
        if (buttonshow === 'gameuserrankreportgetlist') {
          state.gameuserrankreportgetlist = true
        }
        if (buttonshow === 'gameuserrankreportgameorderdetail') {
          state.gameuserrankreportgameorderdetail = true
        }
        if (buttonshow === 'gameuserbankgethistorylist') {
          state.gameuserbankgethistorylist = true
        }
        if (buttonshow === 'sysauditadd') {
          state.sysauditadd = true
        }
        if (buttonshow === 'sysauditdel') {
          state.sysauditdel = true
        }
        if (buttonshow === 'sysauditupdate') {
          state.sysauditupdate = true
        }
        if (buttonshow === 'sysauditgetlist') {
          state.sysauditgetlist = true
        }
        if (buttonshow === 'fundchangerechargewithdrawlist') {
          state.fundchangerechargewithdrawlist = true
        }
        if (buttonshow === 'fundchangeagentfundlist') {
          state.fundchangeagentfundlist = true
        }
        if (buttonshow === 'fundchangeexportrechargewithdraw') {
          state.fundchangeexportrechargewithdraw = true
        }
        if (buttonshow === 'fundchangeexportagentfund') {
          state.fundchangeexportagentfund = true
        }
        if (buttonshow === 'paychgmoneygetchargeup') {
          state.paychgmoneygetchargeup = true
        }
        if (buttonshow === 'paychgmoneybatchcharge') {
          state.paychgmoneybatchcharge = true
        }
        if (buttonshow === 'paychgmoneygetagentup') {
          state.paychgmoneygetagentup = true
        }
        if (buttonshow === 'paychgmoneybatchagent') {
          state.paychgmoneybatchagent = true
        }
        if (buttonshow === 'auditAgentgetaddscorelist') {
          state.auditAgentgetaddscorelist = true
        }
        if (buttonshow === 'auditAgentauditaddscore') {
          state.auditAgentauditaddscore = true
        }
        if (buttonshow === 'auditAgentgetdeductlist') {
          state.auditAgentgetdeductlist = true
        }
        if (buttonshow === 'auditAgentauditdeduct') {
          state.auditAgentauditdeduct = true
        }
        if (buttonshow === 'auditusergetdeductlist') {
          state.auditusergetdeductlist = true
        }
        if (buttonshow === 'audituserauditdeduct') {
          state.audituserauditdeduct = true
        }
        if (buttonshow === 'auditusergetaddscorelist') {
          state.auditusergetaddscorelist = true
        }
        if (buttonshow === 'audituserauditaddscore') {
          state.audituserauditaddscore = true
        }
        if(buttonshow === 'pwdrestgetlist') {
          state.pwdrestgetlist = true
        }
        if (buttonshow === 'pwdrestauditpwd') {
          state.pwdrestauditpwd = true
        }
        if (buttonshow === 'payrechargesgetauditlist') {
          state.payrechargesgetauditlist = true
        }
        if (buttonshow === 'payrechargesexcelexport') {
          state.payrechargesexcelexport = true
        }
        if (buttonshow === 'payrechargesauditone') {
          state.payrechargesauditone = true
        }
        if (buttonshow === 'payrechargesaudittwo') {
          state.payrechargesaudittwo = true
        }
        if (buttonshow === 'gameusergetchildusers') {
          state.gameusergetchildusers = true
        }
        if (buttonshow === 'gameuserresetpassword') {
          state.gameuserresetpassword = true
        }
        if (buttonshow === 'gameuserdelbind') {
          state.gameuserdelbind = true
        }
        if (buttonshow === 'gameuserfrozeuser') {
          state.gameuserfrozeuser = true
        }
        if (buttonshow === 'gameuserchangeusertype') {
          state.gameuserchangeusertype = true
        }
        if (buttonshow === 'gameuserchangeuserremark') {
          state.gameuserchangeuserremark = true
        }
        if (buttonshow === 'gameusergetlist') {
          state.gameusergetlist = true
        }
        if (buttonshow === 'gameusergetimpinfo') {
          state.gameusergetimpinfo = true
        }
        if (buttonshow === 'paychgmoneyaddmoney') {
          state.paychgmoneyaddmoney = true
        }
        if (buttonshow === 'paychgmoneysubmoney') {
          state.paychgmoneysubmoney = true
        }
        if (buttonshow === 'gameuserbankunbind') {
          state.gameuserbankunbind = true
        }
        if (buttonshow === 'gameuserexportuserdata') {
          state.gameuserexportuserdata = true
        }
        if (buttonshow === 'lotteryawardgetawardlist') {
          state.lotteryawardgetawardlist = true
        }
        if (buttonshow === 'domaindel') {
          state.domaindel = true
        }
        if (buttonshow === 'lotteryawardupdatecycle') {
          state.lotteryawardupdatecycle = true
        }
        if (buttonshow === 'lotteryawardupdatestatus') {
          state.lotteryawardupdatestatus = true
        }
        if (buttonshow === 'lotteryawardgetresult') {
          state.lotteryawardgetresult = true
        }
        if (buttonshow === 'lotteryawardupdate') {
          state.lotteryawardupdate = true
        }
        if (buttonshow === 'fundchangeagentfundlinklist') {
          state.fundchangeagentfundlinklist = true
        }
        if (buttonshow === 'gameusernegativeclearzero') {
          state.gameusernegativeclearzero = true
        }
        if (buttonshow === 'paychannelupdatestatus') {
          state.paychannelupdatestatus = true
        }
        if (buttonshow === 'paychannelupdatevalgread') {
          state.paychannelupdatevalgread = true
        }
        if (buttonshow === 'paychannelupdatecompay') {
          state.paychannelupdatecompay = true
        }
        if (buttonshow === 'gameuserchangeuseragent') {
          state.gameuserchangeuseragent = true
        }
        if (buttonshow === 'gamelotsrcloggetlist') {
          state.gamelotsrcloggetlist = true
        }
        if (buttonshow === 'gamesetsavebase') {
          state.gamesetsavebase = true
        }
        if (buttonshow === 'gamesetupdatetable') {
          state.gamesetupdatetable = true
        }
        if (buttonshow === 'gamesetaddtable') {
          state.gamesetaddtable = true
        }
        if (buttonshow === 'gamesetupdatetablestatus') {
          state.gamesetupdatetablestatus = true
        }
        if (buttonshow === 'gamesetupdatebetitem') {
          state.gamesetupdatebetitem = true
        }
        if (buttonshow === 'gamesetaddbetitem') {
          state.gamesetaddbetitem = true
        }
        if (buttonshow === 'gamesetgetbetitemlist') {
          state.gamesetgetbetitemlist = true
        }
        if (buttonshow === 'gamesetgetawardsrclist') {
          state.gamesetgetawardsrclist = true
        }
        if (buttonshow === 'paymodeadd') {
          state.paymodeadd = true
        }
        if (buttonshow === 'paymodedel') {
          state.paymodedel = true
        }
        if (buttonshow === 'paymodeupdate') {
          state.paymodeupdate = true
        }
        if (buttonshow === 'paymodeupdatestatus') {
          state.paymodeupdatestatus = true
        }
        if (buttonshow === 'sysconfiggetconfiginfo') {
          state.sysconfiggetconfiginfo = true
        }
        if (buttonshow === 'sysconfigdepositconfig') {
          state.sysconfigdepositconfig = true
        }
        if (buttonshow === 'sysconfigriskcontroller') {
          state.sysconfigriskcontroller = true
        }
        if (buttonshow === 'paywdrexcpmemogetlist') {
          state.paywdrexcpmemogetlist = true
        }
        if (buttonshow === 'paywdrexcpmemoadd') {
          state.paywdrexcpmemoadd = true
        }
        if (buttonshow === 'paywdrexcpmemodel') {
          state.paywdrexcpmemodel = true
        }
        if (buttonshow === 'paywdrexcpmemoupdate') {
          state.paywdrexcpmemoupdate = true
        }
        if (buttonshow === 'paywdrexcpmemoexportlist') {
          state.paywdrexcpmemoexportlist = true
        }
        if (buttonshow === 'withdrawpostgetlist') {
          state.withdrawpostgetlist = true
        }
        if (buttonshow === 'withdrawpostexportgetlist') {
          state.withdrawpostexportgetlist = true
        }
        if (buttonshow === 'withdrawpostupdateauditstatus') {
          state.withdrawpostupdateauditstatus = true
        }
        if (buttonshow === 'withdrawpostgetinfo') {
          state.withdrawpostgetinfo = true
        }
        if (buttonshow === 'withdrawpostexceptionlist') {
          state.withdrawpostexceptionlist = true
        }
        if (buttonshow === 'agentaccountgettaxlist') {
          state.agentaccountgettaxlist = true
        }
        if (buttonshow === 'agentaccountupdatetax') {
          state.agentaccountupdatetax = true
        }
        if (buttonshow === 'paywithdrawgetcashlist') {
          state.paywithdrawgetcashlist = true
        }
        if (buttonshow === 'paywithdrawgetinfocash') {
          state.paywithdrawgetinfocash = true
        }
        if (buttonshow === 'paywithdrawauditwithdraw') {
          state.paywithdrawauditwithdraw = true
        }
        if (buttonshow === 'gamemovetextgetlist') {
          state.gamemovetextgetlist = true
        }
        if (buttonshow === 'gamemovetextdel') {
          state.gamemovetextdel = true
        }
        if (buttonshow === 'gamemovetextadd') {
          state.gamemovetextadd = true
        }
        if (buttonshow === 'gamemovetextupdate') {
          state.gamemovetextupdate = true
        }
        if (buttonshow === 'gamemovetextgetinfo') {
          state.gamemovetextgetinfo = true
        }
        if (buttonshow === 'gameorderexportorderlist') {
          state.gameorderexportorderlist = true
        }
        if (buttonshow === 'gamesetwmgaddqbmoney') {
          state.gamesetwmgaddqbmoney = true
        }
        if (buttonshow === 'gamesetwmgupdateqbmoney') {
          state.gamesetwmgupdateqbmoney = true
        }
        if (buttonshow === 'gamesetwmgdelqbmoney') {
          state.gamesetwmgdelqbmoney = true
        }
        if (buttonshow === 'gamesetfruitsetrate') {
          state.gamesetfruitsetrate = true
        }
        if (buttonshow === 'gamesetfruitaddtrain') {
          state.gamesetfruitaddtrain = true
        }
        if (buttonshow === 'gamesetfruitfruitratelist') {
          state.gamesetfruitfruitratelist = true
        }
        if (buttonshow === 'gamesetfruitdeltrainrate') {
          state.gamesetfruitdeltrainrate = true
        } 
        if (buttonshow === 'gamefishsetupdategamefish') {
          state.gamefishsetupdategamefish = true
        }
        if (buttonshow === 'gamefishsetgetgamefishinfo') {
          state.gamefishsetgetgamefishinfo = true
        }
        if (buttonshow === 'gamemovetextrepeatpush') {
          state.gamemovetextrepeatpush = true
        }
        if (buttonshow === 'gameclickstatgetlist') {
          state.gameclickstatgetlist = true
        }
        if (buttonshow === 'gameclickstatdownloadlist') {
          state.gameclickstatdownloadlist = true
        }
        if (buttonshow === 'gamewmgplayrecgetlist') {
          state.gamewmgplayrecgetlist = true
        }
      })
    },
    //获取侧边栏导航
    getnewroles ({state, dispatch},menu) {
      state.permissions = menu.map(item => {// 你只需要name
          return item.controller + item.action
        })
      let options = JSON.parse(JSON.stringify(router.options.routes))
      dispatch('showRouters', options)
      state.navList = options
    },

    showRouters ({state, dispatch}, navList) {
      for (let i = 0;i < navList.length;i++) {
        // 取出对象
        let item = navList[i]
        if (item && item.name === 'Dashboard') {
          item.hidden = false
        } else {
          // 根据后台给的权限判断true还是false
          let hasPermission = state.permissions.indexOf(item && item.name) >= 0
          // 取反赋值,true代表有权限 则hidden为false
          item.hidden = !hasPermission
          // item.hidden = false
          // 向下递归
          if (item.children && item.children.length > 0) {
            dispatch('showRouters', item.children)
          }
        }
      }
    },

    // 前端 登出
    FedLogOut({ commit, dispatch }) {
      dispatch('tagsView')
      commit('SET_TOKEN', '')
      removeToken()
    }
  }
}

export default user
