(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5e6a"],{LfqL:function(t,e,n){"use strict";n.r(e);var a=n("QbLZ"),i=n.n(a),r=n("t3Un"),s=n("L2JU");n("X4fA");function l(t){var e="",n="";t.formInline.time&&t.formInline.time.length>0&&(e=o(t.formInline.time[0].getTime()/1e3),n=o(t.formInline.time[1].getTime()/1e3)),Object(r.a)({url:t.public.url+"/backend/lotteryaward/getawardlist",method:"post",data:{las_id:t.formInline.id,termno:t.formInline.number,from_time:e,to_time:n,pageno:t.currentPage,pagerows:t.pagesize,type:t.formInline.status}}).then(function(e){t.tableData=e.data.list,t.total=1*e.data.rownum,t.currentPage=1*e.data.pageno}).catch(function(t){})}function o(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())}var c={name:"accountchange",data:function(){return{total:0,pagesize:20,currentPage:1,tableData:[],formInline:{status:"2",number:"",time:[],id:"11"},status:[{id:"-1",name:"全部"},{id:"2",name:"返回异常"},{id:"1",name:"返回成功"}],idlist:[],flag:!0}},created:function(){!function(t){Object(r.a)({url:t.public.url+"/backend/lotteryaward/getnamelist",method:"post",data:{}}).then(function(e){t.idlist=e.data}).catch(function(t){})}(this),this.catchno.length||0==this.catchno.length||(this.formInline.id=this.catchno.id,this.formInline.status=this.catchno.status,this.formInline.number=this.catchno.number,this.formInline.time=this.catchno.time,this.currentPage=this.catchno.currentPage,this.pagesize=this.catchno.pagesize,l(this))},computed:i()({},Object(s.b)(["lotteryawardgetawardlist","catchno"])),filters:{},watch:{"formInline.status":function(t){this.flag="2"==t||"-1"==t}},methods:{tableclassname:function(t){var e=t.row;t.rowIndex;if("未结果(处理中)"===e.status)return"red"},handleCurrentChange:function(t){this.currentPage=1*t,l(this);var e={id:this.formInline.id,currentPage:this.currentPage,pagesize:this.pagesize,number:this.formInline.number,status:this.formInline.status,time:this.formInline.time};this.$store.commit("setcatchno",e)},reset:function(t){this.$router.push({path:"/gameconfmgr/lottery",query:{id:t.las_id,termno:t.termno}})},handleSizeChange:function(t){this.pagesize=t,this.currentPage=1,l(this);var e={id:this.formInline.id,currentPage:this.currentPage,pagesize:this.pagesize,number:this.formInline.number,status:this.formInline.status,time:this.formInline.time};this.$store.commit("setcatchno",e)},query:function(){l(this);var t={id:this.formInline.id,currentPage:this.currentPage,pagesize:this.pagesize,number:this.formInline.number,status:this.formInline.status,time:this.formInline.time};this.$store.commit("setcatchno",t)}}},u=(n("nVPs"),n("KHd+")),m=Object(u.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"query"},[n("el-row",[n("el-form",{attrs:{inline:!0,"label-width":"70px"}},[n("el-col",{attrs:{span:5}},[n("el-form-item",{attrs:{label:"彩票名称"}},[n("el-select",{model:{value:t.formInline.id,callback:function(e){t.$set(t.formInline,"id",e)},expression:"formInline.id"}},t._l(t.idlist,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),n("el-col",{attrs:{span:5}},[n("el-form-item",{attrs:{label:"期号"}},[n("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:t.formInline.number,callback:function(e){t.$set(t.formInline,"number",e)},expression:"formInline.number"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:7}},[n("el-form-item",{attrs:{label:"彩票时间"}},[n("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"range-separator":"-","start-placeholde":"开始日期","end-placeholde":"结束日期"},model:{value:t.formInline.time,callback:function(e){t.$set(t.formInline,"time",e)},expression:"formInline.time"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:5}},[n("el-form-item",{attrs:{label:"返回情况"}},[n("el-select",{model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},t._l(t.status,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),n("el-col",{attrs:{span:2}},[t.lotteryawardgetawardlist?n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.query()}}},[t._v("查询")]):t._e()],1)],1)],1)],1),t._v(" "),n("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.tableData,"row-class-name":t.tableclassname,border:""}},[n("el-table-column",{attrs:{label:"彩票期号",prop:"termno"}}),t._v(" "),n("el-table-column",{attrs:{label:"彩票时间",prop:"to_time"}}),t._v(" "),n("el-table-column",{attrs:{label:"中奖号码",prop:"openno"}}),t._v(" "),n("el-table-column",{attrs:{label:"返回情况"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.status)+"\n              ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"花销时间（毫秒）",prop:"fetch_cost_time"}}),t._v(" "),n("el-table-column",{attrs:{label:"请求次数",prop:"fetch_num"}}),t._v(" "),n("el-table-column",{attrs:{label:"抓号获取时间",prop:"last_success_time"}}),t._v(" "),t.flag?n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return["未结果(处理中)"===e.row.status?n("el-button",{staticClass:"red",attrs:{type:"text",size:"small"},on:{click:function(n){t.reset(e.row)}}},[t._v("撤单")]):t._e()]}}])}):t._e()],1),t._v(" "),n("div",{staticClass:"pagingbox"},[n("div",{staticClass:"paging",staticStyle:{"margin-top":"20px"}},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pagesize,"page-sizes":[20,50,200],total:t.total,background:"",layout:"sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(e){t.currentPage=e},"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)])],1)},[],!1,null,null,null);m.options.__file="catchno.vue";e.default=m.exports},nVPs:function(t,e,n){"use strict";var a=n("ucxj");n.n(a).a},ucxj:function(t,e,n){}}]);