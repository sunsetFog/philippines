const permission = {
  state: {
    role: [],
    account: [],
    quicksetbank: [],
    paychannel: [],
    thpmerchant: [],
    operationlog: [],
    agentaccount: [],
    domain: [],
    income: [],
    org: [],
    newuser: [],
    userpromotion: [],
    businessdealday: [],
    gamedealday: [],
    gamesinglereport: [],
    gameuserrankreport: [],
    agentorgday: [],
    mail: [],
    notice: [],
    createactivity: [],
    queryactivity: [],
    gameuser: [],
    order: [],
    payrecharge: [],
    paywithdraw: [],
    gameopenaward: [],
    gameuserchg: [],
    agentaccountday: [],
    recharge: [],
    pointson: [],
    rushtoask: [],
    agentmoney: [],
    agentup: [],
    playerup: [],
    playerdown: [],
    agentdown: [],
    bankreview: [],
    online: [],
    playergamelist: [],
    catchno: [],
    negative: [],
    cancellations: [],
    chant: [],
    lottery: [],
    gamename: [],
    abnormal: [],
    applywithdrawal: [],
    tax: [],
    drawingcashier: [],
    diversions: [],
    gamerecord: [],
    agentteam: [],
    customer: []
  },
  getters: {
    role: state => state.role,
    account: state => state.account,
    quicksetbank: state => state.quicksetbank,
    paychannel: state => state.paychannel,
    thpmerchant: state => state.thpmerchant,
    operationlog: state => state.operationlog,
    agentaccount: state => state.agentaccount,
    domain: state => state.domain,
    income: state => state.income,
    org: state => state.org,
    newuser: state => state.newuser,
    userpromotion: state => state.userpromotion,
    businessdealday: state => state.businessdealday,
    gamedealday: state => state.gamedealday,
    gamesinglereport: state => state.gamesinglereport,
    gameuserrankreport: state => state.gameuserrankreport,
    agentorgday: state => state.agentorgday,
    mail: state => state.mail,
    notice: state => state.notice,
    createactivity: state => state.createactivity,
    queryactivity: state => state.queryactivity,
    gameuser: state => state.gameuser,
    order: state => state.order,
    payrecharge: state => state.payrecharge,
    paywithdraw: state => state.paywithdraw,
    gameopenaward: state => state.gameopenaward,
    gameuserchg: state => state.gameuserchg,
    agentaccountday: state => state.agentaccountday,
    recharge: state => state.recharge,
    pointson: state => state.pointson,
    rushtoask: state => state.rushtoask,
    agentmoney: state => state.agentmoney,
    agentup: state => state.agentup,
    playerup: state => state.playerup,
    playerdown: state => state.playerdown,
    agentdown: state => state.agentdown,
    bankreview: state => state.bankreview,
    online: state => state.online,
    playergamelist: state => state.playergamelist,
    catchno: state => state.catchno,
    negative: state => state.negative,
    cancellations: state => state.cancellations,
    chant: state => state.chant,
    lottery: state => state.lottery,
    gamename: state => state.gamename,
    abnormal: state => state.abnormal,
    applywithdrawal: state => state.applywithdrawal,
    drawingcashier: state => state.drawingcashier,
    tax: state => state.tax,
    diversions: state => state.diversions,
    gamerecord: state => state.gamerecord,
    agentteam: state => state.agentteam,
    customer: state => state.customer,
  },
  mutations: {
    setrole: (state, role) => {
      state.role = role
    },
    setaccount: (state, account) => {
      state.account = account
    },
    setquicksetbank: (state, quicksetbank) => {
      state.quicksetbank = quicksetbank
    },
    setpaychannel: (state, paychannel) => {
      state.paychannel = paychannel
    },
    setthpmerchant: (state, thpmerchant) => {
      state.thpmerchant = thpmerchant
    },
    setoperationlog: (state, operationlog) => {
      state.operationlog = operationlog
    },
    setagentaccount: (state, agentaccount) => {
      state.agentaccount = agentaccount
    },
    setdomain: (state, domain) => {
      state.domain = domain
    },
    setincome: (state, income) => {
      state.income = income
    },
    setorg: (state, org) => {
      state.org = org
    },
    setnewuser: (state, newuser) => {
      state.newuser = newuser
    },
    setuserpromotion: (state, userpromotion) => {
      state.userpromotion = userpromotion
    },
    setbusinessdealday: (state, businessdealday) => {
      state.businessdealday = businessdealday
    },
    setgamedealday: (state, gamedealday) => {
      state.gamedealday = gamedealday
    },
    setgamesinglereport: (state, gamesinglereport) => {
      state.gamesinglereport = gamesinglereport
    },
    setgameuserrankreport: (state, gameuserrankreport) => {
      state.gameuserrankreport = gameuserrankreport
    }, 
    setagentorgday: (state, agentorgday) => {
      state.agentorgday = agentorgday
    }, 
    setmail: (state, mail) => {
      state.mail = mail
    }, 
    setnotice: (state, notice) => {
      state.notice = notice
    }, 
    setcreateactivity: (state, createactivity) => {
      state.createactivity = createactivity
    }, 
    setqueryactivity: (state, queryactivity) => {
      state.queryactivity = queryactivity
    }, 
    setgameuser: (state, gameuser) => {
      state.gameuser = gameuser
    }, 
    setorder: (state, order) => {
      state.order = order
    }, 
    setpayrecharge: (state, payrecharge) => {
      state.payrecharge = payrecharge
    }, 
    setpaywithdraw: (state, paywithdraw) => {
      state.paywithdraw = paywithdraw
    }, 
    setgameopenaward: (state, gameopenaward) => {
      state.gameopenaward = gameopenaward
    }, 
    setgameuserchg: (state, gameuserchg) => {
      state.gameuserchg = gameuserchg
    },
    agentaccountday: (state, agentaccountday) => {
      state.agentaccountday = agentaccountday
    },
    setrecharge: (state, recharge) => {
      state.recharge = recharge
    },
    setpointson: (state, pointson) => {
      state.pointson = pointson
    },
    setrushtoask: (state, rushtoask) => {
      state.rushtoask = rushtoask
    },
    setagentmoney: (state, agentmoney) => {
      state.agentmoney = agentmoney
    },
    setagentup: (state, agentup) => {
      state.agentup = agentup
    },
    setplayerup: (state, playerup) => {
      state.playerup = playerup
    },
    setplayerdown: (state, playerdown) => {
      state.playerdown = playerdown
    },
    setagentdown: (state, agentdown) => {
      state.agentdown = agentdown
    },
    setbankreview: (state, bankreview) => {
      state.bankreview = bankreview
    },
    setonline: (state, online) => {
      state.online = online
    },
    setplayergamelist: (state, playergamelist) => {
      state.playergamelist = playergamelist
    },
    setcatchno: (state, catchno) => {
      state.catchno = catchno
    },
    setnegative: (state, negative) => {
      state.negative = negative
    },
    setcancellations: (state, cancellations) => {
      state.cancellations = cancellations
    },
    setchant: (state, chant) => {
      state.chant = chant
    },
    setlottery: (state, lottery) => {
      state.lottery = lottery
    },
    setgamename: (state, gamename) => {
      state.gamename = gamename
    },
    setabnormal: (state, abnormal) => {
      state.abnormal = abnormal
    },
    setapplywithdrawal: (state, applywithdrawal) => {
      state.applywithdrawal = applywithdrawal
    },
    settax: (state, tax) => {
      state.tax = tax
    },
    setdrawingcashier: (state, drawingcashier) => {
      state.drawingcashier = drawingcashier
    },
    setdiversions: (state, diversions) => {
      state.diversions = diversions
    },
    setgamerecord: (state, gamerecord) => {
      state.gamerecord = gamerecord
    },
    setagentteam: (state, agentteam) => {
      state.agentteam = agentteam
    },
    setcustomer: (state, customer) => {
      state.customer = customer
    },
  },
  actions: {
    
  }
}

export default permission
