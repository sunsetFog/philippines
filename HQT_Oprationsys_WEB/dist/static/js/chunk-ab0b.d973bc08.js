(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ab0b"],{"8wbD":function(e,t,a){"use strict";var n=a("ESQ0");a.n(n).a},ESQ0:function(e,t,a){},KKj1:function(e,t,a){"use strict";a.r(t);var n=a("QbLZ"),i=a.n(n),r=a("t3Un"),l=a("XJYT"),s=a("L2JU");function o(e,t,a,n,i,s){e.loading=!0;var o="",d="";if(e.formInline.starttime){var c=e.formInline.starttime.getTime()/1e3;o=m(c)}if(e.formInline.endtime){var g=e.formInline.endtime.getTime()/1e3;d=m(g+86400-1)}if(c&&g&&c>g)Object(l.Message)({message:"开始时间必须小于结束时间",type:"error"});else{var u="",h="";""!=e.formInline.id&&e.gamelist.map(function(t){e.formInline.id==t.name&&(u=t.id,h=t.type)}),Object(r.a)({url:e.public.url+"/backend/businessdealdayreport/getgamedatalist",method:"post",data:{begindate:o,enddate:d,pageno:e.currentPage,pagerows:e.pagesize,game_id:u,game_type:h,org_id:e.formInline.org}}).then(function(t){Object(l.Message)({message:t.message,type:"success"}),e.loading=!1,t.data.list.length,e.tableData=t.data.list,e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno}).catch(function(e){})}}function m(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}var d={data:function(){return{formInline:{time:[],id:"",org:"",starttime:"",endtime:""},currentPage:1,tableData:[],gamelist:[],total:0,pagesize:20,havetime:!1,havetime1:!1,orglist:[],loading:!1}},created:function(){var e=new Date((new Date).toLocaleDateString()).getTime(),t=new Date((new Date).toLocaleDateString()).getTime();this.formInline.starttime=new Date(e),this.formInline.endtime=new Date(t),function(e){Object(r.a)({url:e.public.url+"/backend/gamename/getgamenamelist",method:"post",data:{}}).then(function(t){e.gamelist=t.data}).catch(function(e){})}(this),function(e){Object(r.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.orglist=t.data,e.orglist.unshift({id:"",name:"全部"})}).catch(function(e){})}(this);this.gamedealday.length||0==this.gamedealday.length||(this.formInline.starttime=this.gamedealday.starttime,this.formInline.endtime=this.gamedealday.endtime,this.currentPage=this.gamedealday.currentPage,this.pagesize=this.gamedealday.pagesize,this.formInline.time=this.gamedealday.time,this.formInline.id=this.gamedealday.id,o(this,this.formInline.starttime,this.formInline.endtime,this.currentPage,this.pagesize,this.formInline.id))},computed:i()({},Object(s.b)(["gamedealdayreportgetlist","gamedealday","businessdealdayreportgamedatadownload"])),watch:{},methods:{query:function(){this.currentPage=1,o(this,this.currentPage,this.pagesize,this.formInline.id,this.formInline.starttime,this.formInline.endtime);var e={currentPage:this.currentPage,pagesize:this.pagesize,starttime:this.formInline.starttime,endtime:this.formInline.endtime,id:this.formInline.id,org:this.formInline.org};this.$store.commit("setgamedealday",e)},excel:function(){var e=this,t="",a="";if(e.formInline.starttime){var n=e.formInline.starttime.getTime()/1e3;t=m(n)}if(e.formInline.endtime){var i=e.formInline.endtime.getTime()/1e3;a=m(i+86400-1)}if(n&&i&&n>i)Object(l.Message)({message:"开始时间必须小于结束时间",type:"error"});else{var s="",o="";""!=e.formInline.id&&e.gamelist.map(function(t){e.formInline.id==t.name&&(s=t.id,o=t.type)}),Object(r.a)({url:e.public.url+"/backend/businessdealdayreport/gamedatadownload",method:"post",data:{begindate:t,enddate:a,pageno:e.currentPage,pagerows:e.pagesize,game_id:s,game_type:o,org_id:e.formInline.org}}).then(function(t){window.location.href=e.public.url+t.data}).catch(function(e){})}},cell:function(e){var t=e.row,a=(e.column,e.rowIndex,e.columnIndex);return 8===a&&1*t.gprofit<0?"red":8===a&&1*t.gprofit>0?"green":void 0},tableclassname:function(e){e.row,e.rowIndex},sort:function(e){e.column;var t=e.prop,a=e.order;if(this.tableData.length>0){var n=this.tableData.shift();switch(a){case"ascending":this.tableData.sort(function(e,a){return"adate"===t?a[t]>e[t]?1:-1:1*a[t]-1*e[t]});break;case"descending":this.tableData.sort(function(e,a){return"adate"===t?e[t]>a[t]?1:-1:1*e[t]-1*a[t]})}this.tableData.unshift(n)}},handleSizeChange:function(e){this.pagesize=e;this.currentPage=1,o(this,this.currentPage,this.pagesize,this.formInline.id,this.formInline.starttime,this.formInline.endtime);var t={currentPage:this.currentPage,pagesize:this.pagesize,starttime:this.formInline.starttime,endtime:this.formInline.endtime,id:this.formInline.id,org:this.formInline.org};this.$store.commit("setgamedealday",t)},handleCurrentChange:function(e){this.currentPage=1*e;o(this,this.currentPage,this.pagesize,this.formInline.id,this.formInline.starttime,this.formInline.endtime);var t={currentPage:this.currentPage,pagesize:this.pagesize,starttime:this.formInline.starttime,endtime:this.formInline.endtime,id:this.formInline.id,org:this.formInline.org};this.$store.commit("setgamedealday",t)}},filters:{}},c=(a("8wbD"),a("KHd+")),g=Object(c.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"query"},[a("el-row",[a("el-form",{attrs:{inline:!0,"label-width":"80px"}},[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"玩家渠道"}},[a("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.org,callback:function(t){e.$set(e.formInline,"org",t)},expression:"formInline.org"}},e._l(e.orglist,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"游戏名称"}},[a("el-select",{attrs:{filterable:"",clearable:""},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}},e._l(e.gamelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"开始日期"}},[a("el-date-picker",{attrs:{editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.formInline.starttime,callback:function(t){e.$set(e.formInline,"starttime",t)},expression:"formInline.starttime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"结束日期"}},[a("el-date-picker",{attrs:{editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.formInline.endtime,callback:function(t){e.$set(e.formInline,"endtime",t)},expression:"formInline.endtime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:2}},[e.gamedealdayreportgetlist?a("el-button",{attrs:{type:"primary",icon:"el-icon-search",loading:e.loading},on:{click:e.query}},[e._v("查询")]):e._e()],1),e._v(" "),a("el-col",{attrs:{span:2}},[e.businessdealdayreportgamedatadownload?a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.excel}},[e._v("导出excel")]):e._e()],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,background:"",layout:"prev, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.tableclassname,"cell-class-name":e.cell,border:""},on:{"sort-change":e.sort}},[a("el-table-column",{attrs:{prop:"adate",sortable:"custom","sort-orders":["ascending","descending"],label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"游戏名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"betnum",label:"投注人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bet_ptom",label:"投注额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"flow",sortable:"custom","sort-orders":["ascending","descending"],label:"流水"}}),e._v(" "),a("el-table-column",{attrs:{prop:"lost_money",label:"玩家输额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"win_money",label:"玩家赢额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tax",sortable:"custom","sort-orders":["ascending","descending"],label:"代理收益"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gprofit",sortable:"custom","sort-orders":["ascending","descending"],label:"营收"}})],1),e._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[20,50,200],"page-size":e.pagesize,background:"",layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)])],1)},[],!1,null,null,null);g.options.__file="gamedealday.vue";t.default=g.exports}}]);