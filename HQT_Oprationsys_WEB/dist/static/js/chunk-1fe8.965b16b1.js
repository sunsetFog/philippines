(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1fe8"],{JvUn:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),l=i.n(n),r=i("t3Un"),o=i("L2JU");i("X4fA");function a(e){e.loading=!0;var t="",i="",n="",l="",o="",a="";e.formInline.time1&&e.formInline.time1.length>0&&(t=s(e.formInline.time1[0].getTime()/1e3),i=s(e.formInline.time1[1].getTime()/1e3)),e.formInline.time2&&e.formInline.time2.length>0&&(n=s(e.formInline.time2[0].getTime()/1e3),l=s(e.formInline.time2[1].getTime()/1e3)),e.formInline.time3&&e.formInline.time3.length>0&&(o=s(e.formInline.time3[0].getTime()/1e3),a=s(e.formInline.time3[1].getTime()/1e3)),Object(r.a)({url:e.public.url+"/backend/gamewmgplayrec/getlist",method:"post",data:{org_id:e.formInline.id,user_account:e.formInline.number,uid:e.formInline.uid,co_open_time_from:t,co_open_time_to:i,cm_open_time_from:n,cm_open_time_to:l,tg_open_time_from:o,tg_open_time_to:a,pageno:e.currentPage,pagerows:e.pagesize}}).then(function(t){e.loading=!1,e.tableData=t.data}).catch(function(e){})}function s(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}var m={name:"accountchange",data:function(){return{total:0,pagesize:20,currentPage:1,tableData:[],formInline:{number:"",time1:[],time2:[],time3:[],id:"",uid:""},statuslist:[],num:1,picture:"",title:"",dialogFormVisible:!1,loading:!1}},created:function(){!function(e){Object(r.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.statuslist=t.data,e.statuslist.unshift({id:"",name:"全部"})}).catch(function(e){})}(this),this.gamerecord.length||0==this.gamerecord.length||(this.formInline.id=this.gamerecord.id,this.formInline.number=this.gamerecord.number,this.formInline.time1=this.gamerecord.time1,this.formInline.time2=this.gamerecord.time2,this.formInline.time3=this.gamerecord.time3,this.formInline.uid=this.gamerecord.uid,this.currentPage=this.gamerecord.currentPage,this.num=this.gamerecord.currentPage,this.pagesize=this.gamerecord.pagesize,a(this))},computed:l()({},Object(o.b)(["gamewmgplayrecgetlist","gamerecord"])),filters:{time:function(e){return"-1"==e?"":e}},methods:{up:function(){this.num--,this.currentPage=this.num,a(this);var e={id:this.formInline.id,currentPage:this.num,pagesize:this.pagesize,number:this.formInline.number,time1:this.formInline.time1,time2:this.formInline.time2,time3:this.formInline.time3,uid:this.formInline.uid};this.$store.commit("setgamerecord",e)},view:function(e){this.title="常规开奖图案",this.picture=e,this.dialogFormVisible=!0},view1:function(e){console.log(e),this.title="彩金开奖图案",this.picture=e,this.dialogFormVisible=!0},view2:function(e){this.title="比倍开奖时间",this.picture=e,this.dialogFormVisible=!0},reset:function(){this.picture="",this.dialogFormVisible=!1},down:function(){this.num++,this.currentPage=this.num,a(this);var e={id:this.formInline.id,currentPage:this.num,pagesize:this.pagesize,number:this.formInline.number,time1:this.formInline.time1,time2:this.formInline.time2,time3:this.formInline.time3,uid:this.formInline.uid};this.$store.commit("setgamerecord",e)},query:function(){this.currentPage=1,this.num=1,a(this);var e={id:this.formInline.id,currentPage:this.num,pagesize:this.pagesize,number:this.formInline.number,time1:this.formInline.time1,time2:this.formInline.time2,time3:this.formInline.time3,uid:this.formInline.uid};this.$store.commit("setgamerecord",e)}}},c=(i("xmCQ"),i("KHd+")),u=Object(c.a)(m,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"query"},[i("el-row",[i("el-form",{attrs:{inline:!0,"label-width":"100px"}},[i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"玩家渠道"}},[i("el-select",{attrs:{clearable:""},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}},e._l(e.statuslist,function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"玩家账号"}},[i("el-input",{attrs:{placeholder:"请输入要查询的关键词",clearable:""},model:{value:e.formInline.number,callback:function(t){e.$set(e.formInline,"number",t)},expression:"formInline.number"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"常规开奖时间"}},[i("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"range-separator":"-","start-placeholde":"开始日期","end-placeholde":"结束日期"},model:{value:e.formInline.time1,callback:function(t){e.$set(e.formInline,"time1",t)},expression:"formInline.time1"}})],1)],1)],1)],1),e._v(" "),i("el-row",[i("el-form",{attrs:{inline:!0,"label-width":"100px"}},[i("el-col",{attrs:{span:8}}),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-form-item",{attrs:{label:"彩金开奖时间"}},[i("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"range-separator":"-","start-placeholde":"开始日期","end-placeholde":"结束日期"},model:{value:e.formInline.time3,callback:function(t){e.$set(e.formInline,"time3",t)},expression:"formInline.time3"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"UID"}},[i("el-input",{attrs:{clearable:""},model:{value:e.formInline.uid,callback:function(t){e.$set(e.formInline,"uid",t)},expression:"formInline.uid"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:2}},[e.gamewmgplayrecgetlist?i("el-button",{attrs:{type:"primary",icon:"el-icon-search",loading:e.loading},on:{click:function(t){e.query()}}},[e._v("查询")]):e._e()],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"paging"},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",disabled:e.num<=1,loading:e.loading},on:{click:e.up}},[e._v("上一页")]),e._v(" "),i("el-button",{attrs:{type:"primary",disabled:e.tableData.length<20,loading:e.loading},on:{click:e.down}},[e._v("下一页"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[i("el-table-column",{attrs:{label:"ID",prop:"id"}}),e._v(" "),i("el-table-column",{attrs:{label:"UID",prop:"uid"}}),e._v(" "),i("el-table-column",{attrs:{label:"玩家渠道",prop:"org_name"}}),e._v(" "),i("el-table-column",{attrs:{label:"玩家账号",prop:"user_account"}}),e._v(" "),i("el-table-column",{attrs:{label:"常规下注金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.co_bet_money)+"\n              ")]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"常规奖励金额",prop:"co_reward"}}),e._v(" "),i("el-table-column",{attrs:{label:"彩金奖励金额",prop:"tg_reward"}}),e._v(" "),i("el-table-column",{attrs:{label:"常规开奖时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("time")(t.row.co_open_time))+"\n              ")]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"彩金开奖时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("time")(t.row.tg_open_time))+"\n              ")]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"比倍骰子点数",prop:"cm_dice_points"}}),e._v(" "),i("el-table-column",{attrs:{label:"常规开奖图案"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.co_open_pattern&&""!=t.row.co_open_pattern?i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){e.view(t.row.co_open_pattern)}}},[e._v("查看")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"彩金开奖次数",prop:"tg_num"}}),e._v(" "),i("el-table-column",{attrs:{label:"彩金开奖图案"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.tg_open_pattern&&""!=t.row.tg_open_pattern?i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){e.view1(t.row.tg_open_pattern)}}},[e._v("查看")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"比倍下注金额",prop:"cm_bet_money"}}),e._v(" "),i("el-table-column",{attrs:{label:"比倍奖励金额",prop:"cm_reward"}}),e._v(" "),i("el-table-column",{attrs:{label:"比倍开奖时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.cm_open_time&&""!=t.row.cm_open_time?i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){e.view2(t.row.cm_open_time)}}},[e._v("查看")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"比倍下注名称",prop:"cm_bet_name"}}),e._v(" "),i("el-table-column",{attrs:{label:"比倍方式",prop:"cm_mode"}})],1),e._v(" "),i("div",{staticClass:"paging"},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",disabled:e.num<=1,loading:e.loading},on:{click:e.up}},[e._v("上一页")]),e._v(" "),i("el-button",{attrs:{type:"primary",disabled:e.tableData.length<20,loading:e.loading},on:{click:e.down}},[e._v("下一页"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1),e._v(" "),i("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,"before-close":e.reset},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("div",[e._v(e._s(e.picture))]),e._v(" "),i("el-button",{staticStyle:{"margin-top":"20px"},on:{click:function(t){e.reset()}}},[e._v("取 消")])],1)],1)},[],!1,null,null,null);u.options.__file="gamerecord.vue";t.default=u.exports},wHl4:function(e,t,i){},xmCQ:function(e,t,i){"use strict";var n=i("wHl4");i.n(n).a}}]);