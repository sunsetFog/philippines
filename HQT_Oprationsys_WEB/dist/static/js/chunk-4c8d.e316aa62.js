(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4c8d"],{"Mt+P":function(e,t,a){"use strict";a.r(t);var n=a("QbLZ"),r=a.n(n),i=a("t3Un"),s=a("XJYT"),l=a("L2JU");function o(e,t,a,n,r,l){var o="",g="";if(t){var d=t.getTime()/1e3;o=c(d)}if(a){var m=a.getTime()/1e3;g=c(m+86400-1)}if(d&&m&&d>m)Object(s.Message)({message:"开始时间必须小于结束时间",type:"error"});else{var u=l.join(",");Object(i.a)({url:e.public.url+"/backend/agentorgreport/getlist",method:"post",data:{date_from:o,date_to:g,pageno:n,pagerows:r,org_id:u}}).then(function(t){if(Object(s.Message)({message:t.message,type:"success"}),0===t.data.list.length)e.tableData=t.data.list;else{var a=t.data.total[0];a.adate="总计",e.tableData=t.data.list,e.tableData.unshift(a)}e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno}).catch(function(e){})}}function c(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}var g={data:function(){return{formInline:{starttime:"",endtime:"",id:""},currentPage:1,tableData:[],orglist:[],total:0,pagesize:20,havetime:!1,havetime1:!1}},created:function(){var e=new Date((new Date).toLocaleDateString()).getTime(),t=new Date((new Date).toLocaleDateString()).getTime();this.formInline.starttime=new Date(e),this.formInline.endtime=new Date(t),function(e){Object(i.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.orglist=t.data}).catch(function(e){})}(this);this.agentorgday.length||0==this.agentorgday.length||(this.formInline.starttime=this.agentorgday.starttime,this.currentPage=this.agentorgday.currentPage,this.pagesize=this.agentorgday.pagesize,this.formInline.endtime=this.agentorgday.endtime,this.formInline.id=this.agentorgday.id,o(this,this.formInline.starttime,this.formInline.endtime,this.currentPage,this.pagesize,this.formInline.id))},computed:r()({},Object(l.b)(["agentorgdayreportgetlist","agentorgday"])),watch:{},methods:{query:function(){o(this,this.formInline.starttime,this.formInline.endtime,this.currentPage,this.pagesize,this.formInline.id);var e={starttime:this.formInline.starttime,currentPage:this.currentPage,pagesize:this.pagesize,endtime:this.formInline.endtime,id:this.formInline.id};this.$store.commit("setagentorgday",e)},tableclassname:function(e){var t=e.row,a=e.rowIndex;return 1*t.revenue<1*t.flow_money*.05?"warning-row":0===a?"success-row":""},sort:function(e){e.column;var t=e.prop,a=e.order;if(this.tableData.length>0){var n=this.tableData.shift();switch(a){case"ascending":this.tableData.sort(function(e,a){return"adate"===t?a[t]>e[t]?1:-1:1*a[t]-1*e[t]});break;case"descending":this.tableData.sort(function(e,a){return"adate"===t?e[t]>a[t]?1:-1:1*e[t]-1*a[t]})}this.tableData.unshift(n)}},handleSizeChange:function(e){this.pagesize=e;this.currentPage=1,o(this,this.formInline.starttime,this.formInline.endtime,this.currentPage,this.pagesize,this.formInline.id);var t={starttime:this.formInline.starttime,currentPage:this.currentPage,pagesize:this.pagesize,endtime:this.formInline.endtime,id:this.formInline.id};this.$store.commit("setagentorgday",t)},handleCurrentChange:function(e){this.currentPage=1*e;o(this,this.formInline.starttime,this.formInline.endtime,this.currentPage,this.pagesize,this.formInline.id);var t={starttime:this.formInline.starttime,currentPage:this.currentPage,pagesize:this.pagesize,endtime:this.formInline.endtime,id:this.formInline.id};this.$store.commit("setagentorgday",t)}},filters:{}},d=(a("kqfx"),a("KHd+")),m=Object(d.a)(g,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"query"},[a("el-row",[a("el-form",{attrs:{inline:!0,"label-width":"80px"}},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"渠道名称"}},[a("el-select",{attrs:{multiple:"",filterable:""},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}},e._l(e.orglist,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"开始日期"}},[a("el-date-picker",{attrs:{editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.formInline.starttime,callback:function(t){e.$set(e.formInline,"starttime",t)},expression:"formInline.starttime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"结束日期"}},[a("el-date-picker",{attrs:{editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.formInline.endtime,callback:function(t){e.$set(e.formInline,"endtime",t)},expression:"formInline.endtime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[e.agentorgdayreportgetlist?a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]):e._e()],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,background:"",layout:"prev, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.tableclassname,border:""},on:{"sort-change":e.sort}},[a("el-table-column",{attrs:{prop:"adate",sortable:"custom","sort-orders":["ascending","descending"],label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"org_name",label:"渠道名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_recharge_num",label:"充值人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_recharge_money",label:"充值金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_withdraw_num",label:"提现人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_withdraw_money",label:"提现金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"flow_money",sortable:"custom","sort-orders":["ascending","descending"],label:"流水"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tax",sortable:"custom","sort-orders":["ascending","descending"],label:"税收"}}),e._v(" "),a("el-table-column",{attrs:{prop:"revenue",sortable:"custom","sort-orders":["ascending","descending"],label:"营收"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_lose_money",label:"玩家输额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_win_money",label:"玩家赢额"}})],1),e._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[20,50,200],"page-size":e.pagesize,background:"",layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)])],1)},[],!1,null,null,null);m.options.__file="agentorgday.vue";t.default=m.exports},QW9D:function(e,t,a){},kqfx:function(e,t,a){"use strict";var n=a("QW9D");a.n(n).a}}]);