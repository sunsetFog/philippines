(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3935"],{"1X04":function(t,e,a){"use strict";a.r(e);var r=a("QbLZ"),l=a.n(r),i=a("L2JU"),n=a("t3Un");a("Yfch");function o(t){var e=t.formInline.url.join(",");Object(n.a)({url:t.public.url+"/backend/org/getList",method:"post",data:{pageno:t.currentPage,pagerows:t.pagesize,org_id:t.formInline.user,domain_id:e,status:t.formInline.status}}).then(function(e){t.tableData=e.data.list,t.total=1*e.data.rownum,t.currentPage=1*e.data.pageno}).catch(function(t){})}function s(t){Object(n.a)({url:t.public.url+"/backend/domain/getdomainlist",method:"post"}).then(function(e){t.domainlist=e.data}).catch(function(t){})}var u={data:function(){var t=this;return{formInline:{user:"",url:[],status:"-1"},statuslists:[{id:"-1",name:"全部"},{id:"0",name:"禁用"},{id:"1",name:"启用"}],currentPage:1,userlist:[],tableData:[],dialogFormVisible:!1,dialogFormVisible2:!1,form:{name:"",domain:[],type:"1",enturl:"",allow_ip:"",status:"",status2:"",reward:"",tableData2:[{id:"",reward:"",num:""}]},form2:{domain:[],name:"",type:""},rules:{name:[{required:!0,message:"请输入玩家渠道",trigger:"blur"}],domain:[{required:!0,message:"请选择域名",trigger:"change"}],type:[{required:!0,message:"请选择类型",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],status2:[{required:!0,message:"请选择状态",trigger:"change"}],reward:[{required:!0,validator:function(t,e,a){""==e?a(new Error("请输入渠道抽水")):1*e<0?a(new Error("渠道抽水为正数")):a()},trigger:"blur"}],tableData2:[{required:!0,validator:function(e,a,r){""==a[0].reward||""==a[0].num?r(new Error("请输入返佣比例")):(a.length>=1&&(a.map(function(t){(1*t.reward<0||1*t.num<0||t.num.indexOf(".")>0)&&r(new Error("返佣比例为正数和配额数量为正整数"))}),t.rewardflag||r(new Error("所有下级代理的返佣比例必须低于总代"))),r())},trigger:"blur"}],amount:function(e){return{validator:function(a,r,l){t.rewardflag=!0,r[e].reward>r[0].reward&&(t.rewardflag=!1)}}}},rules2:{domain:[{required:!0,message:"请选择域名",trigger:"change"}]},domainlist:[],domainlists:[],rewardflag:!0,formLabelWidth:"120px",title:"",name:"",total:0,pagesize:20,ids:[],typelist:[{name:"内部公司",id:"1"},{name:"外部接入商",id:"2"}]}},created:function(){!function(t){Object(n.a)({url:t.public.url+"/backend/org/getorglist",method:"post"}).then(function(e){t.userlist=e.data}).catch(function(t){})}(this),function(t){Object(n.a)({url:t.public.url+"/backend/domain/getdomains",method:"post"}).then(function(e){t.domainlists=e.data}).catch(function(t){})}(this);this.org.length||0==this.org.length||(this.currentPage=this.org.currentPage,this.pagesize=this.org.pagesize,this.formInline.user=this.org.user,this.formInline.url=this.org.url,this.formInline.status=this.org.status,o(this))},computed:l()({},Object(i.b)(["orgadd","orgdel","orgupdate","orggetlist","org","orgrestcreatekey","orgupdatedomain"])),methods:{reset:function(t){this.form.enturl="",this.dialogFormVisible=!1,this.$refs.form.resetFields(),this.form.tableData2=[{id:"",reward:"",num:""}]},reset2:function(t){this.dialogFormVisible2=!1,this.$refs.form2.resetFields()},addnum:function(t){this.form.tableData2.push({id:"",reward:"",num:""})},delnum:function(t,e){this.form.tableData2.splice(t,1)},key:function(t){var e=this;Object(n.a)({url:e.public.url+"/backend/org/restcreatekey",method:"post",data:{id:t.id}}).then(function(t){e.$message({type:"success",message:t.message}),o(e)}).catch(function(t){})},cell:function(t){t.row,t.column,t.rowIndex,t.columnIndex},query:function(){this.currentPage=1,o(this);var t={currentPage:this.currentPage,pagesize:this.pagesize,user:this.formInline.user,url:this.formInline.url,status:this.formInline.status};this.$store.commit("setorg",t)},edit:function(t){this.title="编辑渠道组管理",this.dialogFormVisible=!0;var e=this;s(this),Object(n.a)({url:e.public.url+"/backend/org/getinfo",method:"post",data:{id:t.id}}).then(function(t){if(e.form.name=t.data.name,e.form.type=t.data.type,e.form.status=1*t.data.status,e.form.status2=1*t.data.incl_game_lobby,e.form.enturl=t.data.game_ent_url,e.form.allow_ip=t.data.allow_ip,e.form.tableData2=t.data.quota,e.form.reward=t.data.reward,t.data.url)for(var a=t.data.url.split(","),r=e.domainlist.map(function(t){return t.url}),l=0;l<a.length;l++){var i=a[l],n=i.split("|")[1],o=i.split("|")[0];r.includes(n)||e.domainlist.push({id:o,url:n}),e.form.domain.push(o)}else e.form.domain=[];e.id=t.data.id}).catch(function(t){})},editdomain:function(t){this.dialogFormVisible2=!0;var e=this;s(this),Object(n.a)({url:e.public.url+"/backend/org/getinfo",method:"post",data:{id:t.id}}).then(function(t){if("1"==t.data.type?e.form2.type="内部公司":e.form2.type="外部接入商",e.form2.name=t.data.name,t.data.url)for(var a=t.data.url.split(","),r=e.domainlist.map(function(t){return t.url}),l=0;l<a.length;l++){var i=a[l],n=i.split("|")[1],o=i.split("|")[0];r.includes(n)||e.domainlist.push({id:o,url:n}),e.form2.domain.push(o)}else e.form2.domain=[];e.id=t.data.id}).catch(function(t){})},add:function(){this.title="新增渠道组管理",this.dialogFormVisible=!0,s(this)},sure:function(t){var e=this,a=this;this.$refs.form.validate(function(t){if(!t)return!1;if("编辑渠道组管理"===e.title){var r=e.form.domain.join(",");Object(n.a)({url:a.public.url+"/backend/org/update",method:"post",data:{name:e.form.name,domain_id:r,id:e.id,type:e.form.type,status:e.form.status,reward:e.form.reward,quota:e.form.tableData2,allow_ip:e.form.allow_ip,game_ent_url:e.form.enturl,incl_game_lobby:e.form.status2}}).then(function(t){a.$message({type:"success",message:t.message}),a.dialogFormVisible=!1,a.$refs.form.resetFields(),e.form.enturl="",a.form.tableData2=[{id:"",reward:"",num:""}],o(a)}).catch(function(t){})}else{var l=e.form.domain.join(",");Object(n.a)({url:a.public.url+"/backend/org/add",method:"post",data:{name:e.form.name,domain_id:l,type:e.form.type,status:e.form.status,reward:e.form.reward,quota:e.form.tableData2,allow_ip:e.form.allow_ip,game_ent_url:e.form.enturl,incl_game_lobby:e.form.status2}}).then(function(t){a.$message({type:"success",message:t.message}),a.dialogFormVisible=!1,a.$refs.form.resetFields(),a.form.tableData2=[{id:"",reward:"",num:""}],o(a)}).catch(function(t){})}})},sure2:function(t){var e=this,a=this;this.$refs.form2.validate(function(t){if(!t)return!1;var r=e.form2.domain.join(",");Object(n.a)({url:a.public.url+"/backend/org/updatedomain",method:"post",data:{domain_id:r,id:e.id}}).then(function(t){a.$message({type:"success",message:t.message}),a.dialogFormVisible2=!1,a.$refs.form2.resetFields(),o(a)}).catch(function(t){})})},delet:function(t){var e=this,a=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){Object(n.a)({url:a.public.url+"/backend/org/del",method:"post",data:{id:t.id}}).then(function(t){o(a)}).catch(function(t){})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(t){this.pagesize=t,this.currentPage=1,o(this);var e={currentPage:this.currentPage,pagesize:this.pagesize,user:this.formInline.user,url:this.formInline.url,status:this.formInline.status};this.$store.commit("setorg",e)},handleCurrentChange:function(t){this.currentPage=1*t,o(this);var e={currentPage:this.currentPage,pagesize:this.pagesize,user:this.formInline.user,url:this.formInline.url,status:this.formInline.status};this.$store.commit("setorg",e)}},filters:{parseTime:function(t){if(t>0){var e=new Date(1e3*t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())}return""},time:function(t){return"-1"===t?"":t}}},m=(a("CtQP"),a("KHd+")),d=Object(m.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"query"},[a("el-row",[a("el-form",{attrs:{inline:!0,"label-width":"150px"}},[a("el-col",{attrs:{span:2}},[t.orgadd?a("el-button",{attrs:{type:"info",round:""},on:{click:t.add}},[t._v("新增 + ")]):t._e()],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"玩家渠道"}},[a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择玩家渠道"},model:{value:t.formInline.user,callback:function(e){t.$set(t.formInline,"user",e)},expression:"formInline.user"}},t._l(t.userlist,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"域名"}},[a("el-select",{attrs:{multiple:"",filterable:""},model:{value:t.formInline.url,callback:function(e){t.$set(t.formInline,"url",e)},expression:"formInline.url"}},t._l(t.domainlists,function(t){return a("el-option",{key:t.id,attrs:{label:t.url,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{filterable:""},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},t._l(t.statuslists,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.orggetlist?a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.query}},[t._v("查询")]):t._e()],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pagesize,background:"",layout:"prev, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"cell-class-name":t.cell,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"渠道代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"玩家渠道"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"secretkey",label:"授权key"}}),t._v(" "),a("el-table-column",{attrs:{prop:"url",width:"350",label:"域名"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("time")(e.row.create_time))+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"修改时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("time")(e.row.update_time))+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.orgupdate?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.edit(e.row)}}},[t._v("修改")]):t._e(),t._v(" "),t.orgupdate?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.editdomain(e.row)}}},[t._v("修改域名")]):t._e(),t._v(" "),t.orgupdate?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.key(e.row)}}},[t._v("重新生成key")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[20,50,200],"page-size":t.pagesize,background:"",layout:"sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)]),t._v(" "),a("el-dialog",{attrs:{title:t.title,visible:t.dialogFormVisible,"before-close":t.reset},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-form-item",{attrs:{label:"类型","label-width":t.formLabelWidth,prop:"type"}},[a("el-select",{attrs:{filterable:""},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.typelist,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"玩家渠道","label-width":t.formLabelWidth,prop:"name"}},[a("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"域名","label-width":t.formLabelWidth,prop:"domain"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:t.form.domain,callback:function(e){t.$set(t.form,"domain",e)},expression:"form.domain"}},t._l(t.domainlist,function(t){return a("el-option",{key:t.id,attrs:{label:t.url,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"状态：","label-width":t.formLabelWidth,prop:"status"}},[a("el-radio-group",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-radio",{attrs:{label:0}},[t._v("禁用")]),t._v(" "),a("el-radio",{attrs:{label:1}},[t._v("可用")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"是否接入大厅：","label-width":t.formLabelWidth}},[a("el-radio-group",{model:{value:t.form.status2,callback:function(e){t.$set(t.form,"status2",e)},expression:"form.status2"}},[a("el-radio",{attrs:{label:1}},[t._v("接入")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("不接入")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"游戏入口地址：","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.form.enturl,callback:function(e){t.$set(t.form,"enturl",e)},expression:"form.enturl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"访问IP限制：","label-width":t.formLabelWidth,placeholder:"多个IP请用,分隔"}},[a("el-input",{model:{value:t.form.allow_ip,callback:function(e){t.$set(t.form,"allow_ip",e)},expression:"form.allow_ip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"渠道抽水","label-width":t.formLabelWidth,prop:"reward"}},[a("span",[t._v("玩家流水的")]),a("el-input",{staticStyle:{width:"30%"},attrs:{type:"number"},model:{value:t.form.reward,callback:function(e){t.$set(t.form,"reward",e)},expression:"form.reward"}}),a("span",[t._v("%")])],1),t._v(" "),a("el-form-item",{attrs:{label:"返佣比例","label-width":t.formLabelWidth,prop:"tableData2"}},[a("span",{staticClass:"red"},[t._v("所有下级代理的返佣比例必须低于总代")]),t._v(" "),a("el-form",{attrs:{model:t.form}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.form.tableData2,border:""}},[a("el-table-column",{attrs:{label:"代理级别"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.$index?a("span",[t._v("总代")]):a("span",[t._v(t._s(String.fromCharCode(e.$index+64)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"返佣比例"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form-item",{attrs:{prop:"tableData2",rules:t.rules.amount(e.$index)}},[a("el-input",{staticStyle:{width:"80%"},attrs:{type:"number"},model:{value:e.row.reward,callback:function(a){t.$set(e.row,"reward",a)},expression:"scope.row.reward"}}),a("span",[t._v("%")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"配额数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{type:"number"},model:{value:e.row.num,callback:function(a){t.$set(e.row,"num",a)},expression:"scope.row.num"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.addnum(e.$index,e.row)}}},[t._v("添加")]),t._v(" "),0!=e.$index?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.delnum(e.$index,e.row)}}},[t._v("删除")]):t._e()]}}])})],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.reset(t.form)}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.sure(t.form)}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改渠道域名",visible:t.dialogFormVisible2,"before-close":t.reset2},on:{"update:visible":function(e){t.dialogFormVisible2=e}}},[a("el-form",{ref:"form2",attrs:{model:t.form2,rules:t.rules2}},[a("el-form-item",{attrs:{label:"类型","label-width":t.formLabelWidth}},[a("span",[t._v(t._s(t.form2.type))])]),t._v(" "),a("el-form-item",{attrs:{label:"玩家渠道","label-width":t.formLabelWidth}},[a("span",[t._v(t._s(t.form2.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"域名","label-width":t.formLabelWidth,prop:"domain"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:t.form2.domain,callback:function(e){t.$set(t.form2,"domain",e)},expression:"form2.domain"}},t._l(t.domainlist,function(t){return a("el-option",{key:t.id,attrs:{label:t.url,value:t.id}})}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.reset2(t.form)}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.sure2(t.form)}}},[t._v("确 定")])],1)],1)],1)},[],!1,null,null,null);d.options.__file="org.vue";e.default=d.exports},CtQP:function(t,e,a){"use strict";var r=a("mKOv");a.n(r).a},Yfch:function(t,e,a){"use strict";function r(t){return/^[a-zA-Z_]\w{2,17}$/.test(t)}function l(t){return/^[A-Za-z]+$/.test(t)}function i(t){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(t)}function n(t){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/.test(t)}a.d(e,"a",function(){return r}),a.d(e,"b",function(){return l}),a.d(e,"c",function(){return i}),a.d(e,"d",function(){return n})},mKOv:function(t,e,a){}}]);