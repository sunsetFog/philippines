(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-424a"],{GQeE:function(e,t,n){e.exports={default:n("iq4v"),__esModule:!0}},J57m:function(e,t,n){"use strict";var i=n("eGyE");n.n(i).a},Mqbl:function(e,t,n){var i=n("JB68"),r=n("w6GO");n("zn7N")("keys",function(){return function(e){return r(i(e))}})},TW6c:function(e,t,n){"use strict";n.r(t);var i=n("QbLZ"),r=n.n(i),l=n("GQeE"),o=n.n(l),a=n("t3Un"),s=n("L2JU");function m(e){var t="",n="",i=e.formInline.type.join(",");e.formInline.time&&e.formInline.time.length>0&&(t=c(e.formInline.time[0].getTime()/1e3),n=c(e.formInline.time[1].getTime()/1e3));var r="0";if(""!=e.formInline.radio)r=e.formInline.radio;e.loading=!0,Object(a.a)({url:e.public.url+"/fundchange/rechargewithdrawlist",method:"post",data:{src_type:i,order_no:e.formInline.order,clientip:e.formInline.ip,date_from:t,date_to:n,auditor:e.formInline.user,amount_cond_1:e.formInline.money1,amount_cond_2:e.formInline.money2,amount_1:e.formInline.xy,amount_2:e.formInline.dy,remark:e.formInline.remark,agent_org_id:e.formInline.org,user_account:e.formInline.value,is_contain_level:r,channel_id:e.formInline.account,channel_mode_id:e.formInline.money,pageno:e.currentPage,pagerows:e.pagesize,uid:e.formInline.uid}}).then(function(t){if(e.loading=!1,0===t.data.list.length)e.tableData=[],e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno;else{var n=t.data.list;e.tableData=n;var i=t.data.page_total,r=i.page_amount;i.create_time="本页小结："+r,i.income_amount=i.page_income,i.expend_amount=i.page_expend;var l=t.data.total,o=l.total_amount;l.create_time="总结："+o,l.page_income=l.total_income,l.page_expend=l.total_expend,e.tableData.push(i),e.tableData.push(l),e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno}}).catch(function(e){})}function c(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}var u={data:function(){return{formInline:{type:"",order:"",ip:"",user:"",org:"",value:"",radio:"",account:"",remark:"",xy:"",dy:"",time:[],money:"",money1:"",money2:"",uid:""},currentPage:1,tableData:[],moneylist:[],typelist:[{name:"[+]在线充值",type:"11"},{name:"[+]活动奖金",type:"12"},{name:"[+]理赔",type:"13"},{name:"[+]其他",type:"14"},{name:"[+]提款失败",type:"15"},{name:"[-]人工扣减",type:"50"},{name:"[+]返手续费",type:"16"},{name:"[+]保险箱存款",type:"17"},{name:"[-]保险箱提款",type:"52"},{name:"[-]申请提款",type:"57"},{name:"[-]手续费",type:"56"}],symbollist:[{name:"小于",type:"<"},{name:"小于等于",type:"<="},{name:"等于",type:"="},{name:"大于",type:">"},{name:"大于等于",type:">="}],userlist:[],orglist:[],accountlist:[],total:0,pagesize:20,id:"",num:1,loading:!1}},created:function(){o()(this.$route.query).length>0&&(this.formInline.value=this.$route.query.login_name),this.rushtoask.length||0==this.rushtoask.length||(this.formInline.type=this.rushtoask.type,this.currentPage=this.rushtoask.currentPage,this.pagesize=this.rushtoask.pagesize,this.formInline.order=this.rushtoask.order,this.formInline.ip=this.rushtoask.ip,this.num=this.rushtoask.currentPage,this.formInline.user=this.rushtoask.user,this.formInline.time=this.rushtoask.time,this.formInline.money1=this.rushtoask.money1,this.formInline.money2=this.rushtoask.money2,this.formInline.xy=this.rushtoask.xy,this.formInline.dy=this.rushtoask.dy,this.formInline.remark=this.rushtoask.remark,this.formInline.org=this.rushtoask.org,this.formInline.radio=this.rushtoask.radio,this.formInline.account=this.rushtoask.account,this.formInline.money=this.rushtoask.money,this.formInline.uid=this.rushtoask.uid,m(this)),function(e){Object(a.a)({url:e.public.url+"/account/getloginnamelist",method:"post",data:{}}).then(function(t){e.userlist=t.data}).catch(function(e){})}(this),function(e){Object(a.a)({url:e.public.url+"/backend/paychannel/getchannellist",method:"post",data:{}}).then(function(t){e.accountlist=t.data}).catch(function(e){})}(this),function(e){Object(a.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.orglist=t.data}).catch(function(e){})}(this),function(e){Object(a.a)({url:e.public.url+"/backend/paychannel/getchannelmodelist",method:"post",data:{}}).then(function(t){e.moneylist=t.data}).catch(function(e){})}(this)},computed:r()({},Object(s.b)(["fundchangerechargewithdrawlist","rushtoask","fundchangeexportrechargewithdraw"])),watch:{},filters:{type:function(e){return"0"===e?"待开奖":"1"===e?"已中奖":"2"===e?"未开奖":"3"===e?"已撤单":void 0}},methods:{query:function(){this.currentPage=1,this.num=1,m(this);var e={type:this.formInline.type,order:this.formInline.order,ip:this.formInline.ip,user:this.formInline.user,currentPage:this.num,pagesize:this.pagesize,time:this.formInline.time,money1:this.formInline.money1,money2:this.formInline.money2,xy:this.formInline.xy,dy:this.formInline.dy,remark:this.formInline.remark,org:this.formInline.org,value:this.formInline.value,radio:this.formInline.radio,account:this.formInline.account,money:this.formInline.money,uid:this.formInline.uid};this.$store.commit("setrushtoask",e)},arrymethod:function(e){e.row,e.column,e.rowIndex,e.columnIndex},up:function(){this.num--,this.currentPage=this.num,m(this);var e={type:this.formInline.type,order:this.formInline.order,ip:this.formInline.ip,user:this.formInline.user,currentPage:this.num,pagesize:this.pagesize,time:this.formInline.time,money1:this.formInline.money1,money2:this.formInline.money2,xy:this.formInline.xy,dy:this.formInline.dy,remark:this.formInline.remark,org:this.formInline.org,value:this.formInline.value,radio:this.formInline.radio,account:this.formInline.account,money:this.formInline.money,uid:this.formInline.uid};this.$store.commit("setrushtoask",e)},down:function(){this.num++,this.currentPage=this.num,m(this);var e={type:this.formInline.type,order:this.formInline.order,ip:this.formInline.ip,user:this.formInline.user,currentPage:this.num,pagesize:this.pagesize,time:this.formInline.time,money1:this.formInline.money1,money2:this.formInline.money2,xy:this.formInline.xy,dy:this.formInline.dy,remark:this.formInline.remark,org:this.formInline.org,value:this.formInline.value,radio:this.formInline.radio,account:this.formInline.account,money:this.formInline.money,uid:this.formInline.uid};this.$store.commit("setrushtoask",e)},cell:function(e){var t=e.row,n=(e.column,e.rowIndex),i=e.columnIndex,r=this.tableData.length-2;return 5===i&&n===r?"green":6===i&&n===r?"red":5===i&&n===r+1?"green":6===i&&n===r+1?"red":1===i&&n===r?1*t.create_time.split("：")[1]>0?"green":"red":1===i&&n===r+1?1*t.create_time.split("：")[1]>0?"green":"red":void 0},excel:function(){var e=this,t="",n="",i=e.formInline.type.join(",");e.formInline.time&&e.formInline.time.length>0&&(t=c(e.formInline.time[0].getTime()/1e3),n=c(e.formInline.time[1].getTime()/1e3));var r="0";if(""!=e.formInline.radio)r=e.formInline.radio;Object(a.a)({url:e.public.url+"/fundchange/exportrechargewithdraw",method:"post",data:{src_type:i,order_no:e.formInline.order,clientip:e.formInline.ip,date_from:t,date_to:n,auditor:e.formInline.user,amount_cond_1:e.formInline.money1,amount_cond_2:e.formInline.money2,amount_1:e.formInline.xy,amount_2:e.formInline.dy,remark:e.formInline.remark,agent_org_id:e.formInline.org,user_account:e.formInline.value,is_contain_level:r,channel_id:e.formInline.account,channel_mode_id:e.formInline.money,uid:e.formInline.uid}}).then(function(t){var n=e.public.url+t.data;window.location.href=n}).catch(function(e){})},clickitem:function(e){e===this.formInline.radio?this.formInline.radio="":this.formInline.radio=e},tableclass:function(e){e.row;var t=e.rowIndex,n=this.tableData.length-2;return t===n||t===n+1?"success-row":""},handleSizeChange:function(e){this.pagesize=e,this.currentPage=1,m(this);var t={type:this.formInline.type,order:this.formInline.order,ip:this.formInline.ip,user:this.formInline.user,currentPage:this.currentPage,pagesize:this.pagesize,time:this.formInline.time,money1:this.formInline.money1,money2:this.formInline.money2,xy:this.formInline.xy,dy:this.formInline.dy,remark:this.formInline.remark,org:this.formInline.org,value:this.formInline.value,radio:this.formInline.radio,account:this.formInline.account,money:this.formInline.money};this.$store.commit("setrushtoask",t)},handleCurrentChange:function(e){this.currentPage=1*e,m(this);var t={type:this.formInline.type,order:this.formInline.order,ip:this.formInline.ip,user:this.formInline.user,currentPage:this.currentPage,pagesize:this.pagesize,time:this.formInline.time,money1:this.formInline.money1,money2:this.formInline.money2,xy:this.formInline.xy,dy:this.formInline.dy,remark:this.formInline.remark,org:this.formInline.org,value:this.formInline.value,radio:this.formInline.radio,account:this.formInline.account,money:this.formInline.money};this.$store.commit("setrushtoask",t)}}},f=(n("J57m"),n("KHd+")),h=Object(f.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container mail"},[n("div",{staticClass:"query"},[n("el-row",[n("el-form",{attrs:{inline:!0,"label-width":"100px"}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"充提账变类型"}},[n("el-select",{attrs:{filterable:"",clearable:"",multiple:""},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},e._l(e.typelist,function(e){return n("el-option",{key:e.type,attrs:{label:e.name,value:e.type}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"订单号","label-width":"100px"}},[n("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.order,callback:function(t){e.$set(e.formInline,"order",t)},expression:"formInline.order"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"玩家IP地址","label-width":"100px"}},[n("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.ip,callback:function(t){e.$set(e.formInline,"ip",t)},expression:"formInline.ip"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"最终审核人员"}},[n("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}},e._l(e.userlist,function(e){return n("el-option",{key:e.id,attrs:{label:e.login_name,value:e.login_name}})}))],1)],1)],1)],1),e._v(" "),n("el-row",[n("el-form",{attrs:{inline:!0,"label-width":"100px"}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"玩家渠道"}},[n("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.org,callback:function(t){e.$set(e.formInline,"org",t)},expression:"formInline.org"}},e._l(e.orglist,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"玩家搜索"}},[n("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.value,callback:function(t){e.$set(e.formInline,"value",t)},expression:"formInline.value"}}),e._v(" "),n("el-radio",{attrs:{label:1},nativeOn:{click:function(t){t.preventDefault(),e.clickitem(1)}},model:{value:e.formInline.radio,callback:function(t){e.$set(e.formInline,"radio",t)},expression:"formInline.radio"}},[e._v("含下级")])],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"充值渠道"}},[n("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.account,callback:function(t){e.$set(e.formInline,"account",t)},expression:"formInline.account"}},e._l(e.accountlist,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"备注","label-width":"100px"}},[n("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.remark,callback:function(t){e.$set(e.formInline,"remark",t)},expression:"formInline.remark"}})],1)],1)],1)],1),e._v(" "),n("el-row",[n("el-form",{attrs:{inline:!0,"label-width":"100px"}},[n("el-col",{attrs:{span:16}},[n("el-form-item",{attrs:{label:"账变金额"}},[n("el-select",{staticStyle:{width:"20%"},attrs:{filterable:""},model:{value:e.formInline.money1,callback:function(t){e.$set(e.formInline,"money1",t)},expression:"formInline.money1"}},e._l(e.symbollist,function(e){return n("el-option",{key:e.type,attrs:{label:e.name,value:e.type}})})),e._v(" "),n("el-input",{staticStyle:{width:"20%"},attrs:{clearable:""},model:{value:e.formInline.xy,callback:function(t){e.$set(e.formInline,"xy",t)},expression:"formInline.xy"}}),e._v(" "),n("span",[e._v("并且")]),e._v(" "),n("el-select",{staticStyle:{width:"20%"},attrs:{filterable:""},model:{value:e.formInline.money2,callback:function(t){e.$set(e.formInline,"money2",t)},expression:"formInline.money2"}},e._l(e.symbollist,function(e){return n("el-option",{key:e.type,attrs:{label:e.name,value:e.type}})})),e._v(" "),n("el-input",{staticStyle:{width:"20%"},attrs:{clearable:""},model:{value:e.formInline.dy,callback:function(t){e.$set(e.formInline,"dy",t)},expression:"formInline.dy"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"账变时间"}},[n("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"range-separator":"-","start-placeholde":"开始日期","end-placeholde":"结束日期"},model:{value:e.formInline.time,callback:function(t){e.$set(e.formInline,"time",t)},expression:"formInline.time"}})],1)],1)],1)],1),e._v(" "),n("el-row",[n("el-form",{attrs:{inline:!0,"label-width":"100px"}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"支付方式"}},[n("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.money,callback:function(t){e.$set(e.formInline,"money",t)},expression:"formInline.money"}},e._l(e.moneylist,function(e){return n("el-option",{key:e.type,attrs:{label:e.name,value:e.type}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"UID搜索"}},[n("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.uid,callback:function(t){e.$set(e.formInline,"uid",t)},expression:"formInline.uid"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:2}},[e.fundchangerechargewithdrawlist?n("el-button",{attrs:{type:"primary",icon:"el-icon-search",loading:e.loading},on:{click:e.query}},[e._v("查询")]):e._e()],1),e._v(" "),n("el-col",{attrs:{span:2}},[e.fundchangeexportrechargewithdraw?n("el-button",{attrs:{type:"primary"},on:{click:e.excel}},[e._v("导出excel")]):e._e()],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"paging"},[n("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",disabled:e.num<=1,loading:e.loading},on:{click:e.up}},[e._v("上一页")]),e._v(" "),n("el-button",{attrs:{type:"primary",disabled:e.tableData.length<20,loading:e.loading},on:{click:e.down}},[e._v("下一页"),n("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1),e._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"span-method":e.arrymethod,"row-class-name":e.tableclass,"cell-class-name":e.cell,border:""}},[n("el-table-column",{attrs:{prop:"uid",label:"UID"}}),e._v(" "),n("el-table-column",{attrs:{prop:"order_no",label:"订单号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"create_time",width:"200",label:"账变时间"}}),e._v(" "),n("el-table-column",{attrs:{prop:"user_account",label:"玩家账号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"agent_org_name",label:"玩家渠道"}}),e._v(" "),n("el-table-column",{attrs:{prop:"src_type",label:"账变类型"}}),e._v(" "),n("el-table-column",{attrs:{prop:"income_amount",label:"收入"}}),e._v(" "),n("el-table-column",{attrs:{prop:"expend_amount",label:"支出"}}),e._v(" "),n("el-table-column",{attrs:{prop:"balance_after",label:"可用余额"}}),e._v(" "),n("el-table-column",{attrs:{prop:"deposit",label:"保险箱金额"}}),e._v(" "),n("el-table-column",{attrs:{prop:"pay_channel",label:"充提来源"}}),e._v(" "),n("el-table-column",{attrs:{width:"200",prop:"clientip",label:"玩家IP地址"}}),e._v(" "),n("el-table-column",{attrs:{label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.remark)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"充提方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.pay_method)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"最终审核人员"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.auditor)+"\n      ")]}}])})],1),e._v(" "),n("div",{staticClass:"paging"},[n("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",disabled:e.num<=1,loading:e.loading},on:{click:e.up}},[e._v("上一页")]),e._v(" "),n("el-button",{attrs:{type:"primary",disabled:e.tableData.length<20,loading:e.loading},on:{click:e.down}},[e._v("下一页"),n("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)],1)},[],!1,null,null,null);h.options.__file="rushtoask.vue";t.default=h.exports},eGyE:function(e,t,n){},iq4v:function(e,t,n){n("Mqbl"),e.exports=n("WEpk").Object.keys},zn7N:function(e,t,n){var i=n("Y7ZC"),r=n("WEpk"),l=n("KUxP");e.exports=function(e,t){var n=(r.Object||{})[e]||Object[e],o={};o[e]=t(n),i(i.S+i.F*l(function(){n(1)}),"Object",o)}}}]);