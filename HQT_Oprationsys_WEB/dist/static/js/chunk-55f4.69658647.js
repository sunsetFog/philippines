(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-55f4"],{ADn3:function(e,t,r){"use strict";var a=r("p2qV");r.n(a).a},Wmy7:function(e,t,r){"use strict";r.r(t);var a=r("QbLZ"),n=r.n(a),l=r("L2JU"),i=r("t3Un");r("Yfch");function s(e){Object(i.a)({url:e.public.url+"/backend/gameusercode/getlist",method:"post",data:{agent_org_id:e.formInline.org,pageno:e.currentPage,pagerows:e.pagesize,user_account:e.formInline.user.trim(),uid:e.formInline.user_uid}}).then(function(t){e.tableData=t.data.list,e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno}).catch(function(e){})}var o={data:function(){return{formInline:{org:"",user:"",user_uid:""},currentPage:1,tableData:[],dialogFormVisible:!1,form:{desc:""},rules:{desc:[{required:!0,validator:function(e,t,r){""===t?r(new Error("请输入契约规则")):1*t<0?r(new Error("契约规则不能为负数")):/^[1-9]\d*$|^[1-9]\d*\.\d\d?$|^0\.\d\d?$/.test(t)||"0"==t?r():r(new Error("保留两位小数"))},trigger:"blur"}]},formLabelWidth:"150px",title:"",name:"",total:0,pagesize:15,statuslist:[],nav:[],form2:{}}},created:function(){!function(e){Object(i.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.statuslist=t.data}).catch(function(e){})}(this)},computed:n()({},Object(l.b)(["gameusercodegetlist"])),filters:{time:function(e){return"-1"===e?"":e}},methods:{reset:function(e){this.dialogFormVisible=!1,this.$refs.form.resetFields()},query:function(){this.currentPage=1,s(this);var e={org:this.formInline.org,currentPage:this.currentPage,pagesize:this.pagesize,uid:this.formInline.user_uid,user:this.formInline.user};this.$store.commit("settax",e)},handleSizeChange:function(e){this.pagesize=e,this.currentPage=1,s(this);var t={org:this.formInline.org,currentPage:this.currentPage,pagesize:this.pagesize,user:this.formInline.user,uid:this.formInline.user_uid};this.$store.commit("settax",t)},handleCurrentChange:function(e){this.currentPage=1*e,s(this);var t={org:this.formInline.org,currentPage:this.currentPage,pagesize:this.pagesize,user:this.formInline.user,uid:this.formInline.user_uid};this.$store.commit("settax",t)}}},u=(r("ADn3"),r("KHd+")),c=Object(u.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"query"},[r("el-row",[r("el-form",{attrs:{inline:!0,"label-width":"80px"}},[r("el-col",{attrs:{span:5}},[r("el-form-item",{attrs:{label:"玩家渠道"}},[r("el-select",{attrs:{clearable:""},model:{value:e.formInline.org,callback:function(t){e.$set(e.formInline,"org",t)},expression:"formInline.org"}},e._l(e.statuslist,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),r("el-col",{attrs:{span:5}},[r("el-form-item",{attrs:{label:"玩家账号"}},[r("el-input",{attrs:{placeholder:"玩家账号",clearable:""},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:5}},[r("el-form-item",{attrs:{label:"UID"}},[r("el-input",{attrs:{placeholder:"UID",clearable:""},model:{value:e.formInline.user_uid,callback:function(t){e.$set(e.formInline,"user_uid",t)},expression:"formInline.user_uid"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e.gameusercodegetlist?r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]):e._e()],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"pagingbox"},[r("div",{staticClass:"paging"},[r("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,background:"",layout:"prev, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),r("div"),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[r("el-table-column",{attrs:{prop:"agent_org_name",label:"玩家渠道"}}),e._v(" "),r("el-table-column",{attrs:{label:"玩家账号",prop:"user_account"}}),e._v(" "),r("el-table-column",{attrs:{prop:"uid",label:"UID"}}),e._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"提款时间"}}),e._v(" "),r("el-table-column",{attrs:{prop:"money",label:"提款金额"}}),e._v(" "),r("el-table-column",{attrs:{prop:"lwtn_balance",label:"账户余额"}}),e._v(" "),r("el-table-column",{attrs:{prop:"lwtn_deposit",label:"保险箱金额"}}),e._v(" "),r("el-table-column",{attrs:{label:"充值次数",prop:"lwtn_charge_count"}}),e._v(" "),r("el-table-column",{attrs:{label:"充值金额",prop:"lwtn_change_amt"}}),e._v(" "),r("el-table-column",{attrs:{prop:"lwtn_code_amt",label:"打码量"}}),e._v(" "),r("el-table-column",{attrs:{prop:"lwtn_cad_ratio",label:"充投比"}})],1),e._v(" "),r("div",{staticClass:"pagingbox"},[r("div",{staticClass:"paging"},[r("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,50,200],"page-size":e.pagesize,background:"",layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)])],1)},[],!1,null,"42bb4d7e",null);c.options.__file="codeamount.vue";t.default=c.exports},Yfch:function(e,t,r){"use strict";function a(e){return/^[a-zA-Z_]\w{2,17}$/.test(e)}function n(e){return/^[A-Za-z]+$/.test(e)}function l(e){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(e)}function i(e){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/.test(e)}r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n}),r.d(t,"c",function(){return l}),r.d(t,"d",function(){return i})},p2qV:function(e,t,r){}}]);