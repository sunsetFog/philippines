(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-511d"],{GQeE:function(e,t,a){e.exports={default:a("iq4v"),__esModule:!0}},HwB3:function(e,t,a){"use strict";var i=a("tFov");a.n(i).a},I8D7:function(e,t,a){"use strict";a.r(t);var i=a("gDS+"),n=a.n(i),l=a("GQeE"),s=a.n(l),r=a("QbLZ"),o=a.n(r),c=a("t3Un"),m=a("L2JU"),u=a("X4fA");function f(e){e.gamelist.map(function(t){t.name===e.formInline.id&&(t.id,t.type)});var t={scene:e.formInline.id,agent_org_id:e.selectId,pageno:e.currentPage,pagerows:e.pagesize};Object(c.a)({url:e.public.url+"/robotsceneconfig/aiaccountlist",method:"post",data:t}).then(function(t){e.tableData=t.data.list,e.total=1*t.data.rownum,e.currentPage=1*t.data.pageno}).catch(function(e){})}var d={data:function(){var e=this;return{formInline:{id:""},gamelist:[],currentPage:1,tableData:[],total:0,pagesize:20,id:"",title:"",dialogFormVisible:!1,formLabelWidth:"120px",rules:{account:[{required:!0,message:"请输入AI账号",trigger:"blur"}],nick:[{required:!0,message:"请输入AI昵称",trigger:"blur"}],head:[{required:!0,message:"请输入头像ID",trigger:"blur"}],picture:[{required:!0,message:"请输入头像框ID",trigger:"blur"}],balance:[{required:!0,validator:function(t,a,i){""===a||""==e.form.max?i(new Error("请输入AI余额区间")):""==e.form.max?i(new Error("请输入AI余额区间")):1*a<0||1*e.form.max<0||a.indexOf(".")>0||e.form.max.indexOf(".")>0?i(new Error("AI余额区间为正整数")):i()},trigger:"blur"}],game:[{required:!0,message:"请选择可参与游戏",trigger:"change"}]},form:{account:"",nick:"",head:"",picture:"",balance:"",min:"",game:[]},game:[],form2:{account:"",name:"",balance:"",game:[]},rules2:{account:[{required:!1,message:"请输入AI账号",trigger:"blur"}],name:[{required:!1,message:"请输入AI昵称",trigger:"blur"}],balance:[{required:!1,message:"请输入AI余额区间",trigger:"blur"}],game:[{required:!0,message:"请选择可参与游戏",trigger:"change"}]},dialogFormVisible2:!1,showfile:!1,fileList:[],balancelist:[{min:"",max:"",prob:""}],file:{},selectchannel:[],selectId:null}},created:function(){!function(e){Object(c.a)({url:e.public.url+"/robotsceneconfig/getaisupgamelist",method:"post",data:{}}).then(function(t){e.gamelist=t.data}).catch(function(e){})}(this),function(e){Object(c.a)({url:e.public.url+"/backend/org/getorglist",method:"post",data:{}}).then(function(t){e.selectchannel=t.data}).catch(function(e){})}(this),this.airole.length||0==this.airole.length||(this.formInline.id=this.airole.id,this.currentPage=this.airole.currentPage,this.pagesize=this.airole.pagesize,this.selectId=this.airole.agent_org_id,f(this))},computed:o()({},Object(m.b)(["robotsceneconfigaiaccountlist","robotsceneconfigaddonerobot","robotsceneconfigaddmultirobot","robotsceneconfigaisupgameupdate","robotsceneconfigdelaiaccount","airole"]),{token:function(){return{"X-Token":Object(u.a)()}},action:function(){return""}}),watch:{},filters:{},methods:{query:function(){this.currentPage=1,this.num=1,f(this);var e={id:this.formInline.id,agent_org_id:this.selectId,currentPage:this.currentPage,pagesize:this.pagesize};this.$store.commit("setairole",e)},addai:function(){this.balancelist.push({min:"",max:"",prob:""})},delet:function(e){this.balancelist.splice(e,1)},exceed:function(e){e.length>1&&this.$message({message:"一次只能上传一个文件",type:"warning"})},cardTab:function(e,t){this.selectId=null},before:function(e){var t=e.name.substring(e.name.lastIndexOf(".")+1),a="xls"===t,i="xlsx"===t,n=e.size/1024/1024<5;return a||i||this.$message({message:"上传文件只能是xls、xlsx格式",type:"warning"}),n||this.$message({message:"上传文件大小不能超过5MB!",type:"warning"}),a||i&&n},success:function(e,t,a){this.$message({message:e.message,type:"success"})},error:function(e,t,a){this.$message({message:e.message,type:"error"})},reset:function(e){this.dialogFormVisible=!1,this.$refs.form.resetFields(),this.form.max="",this.balancelist=[],this.game=[],this.fileList=[]},reset2:function(e){this.dialogFormVisible2=!1,this.$refs.form2.resetFields()},sure3:function(){var e=this,t=this;if(0===s()(this.file).length)return this.$message({message:"请上传文件",type:"error"}),!1;var a=this.file.name.substring(this.file.name.lastIndexOf(".")+1),i="xls"===a,l="xlsx"===a,r=this.file.size/1024/1024<5;if(!i&&!l)return this.$message({message:"上传文件只能是xls、xlsx格式",type:"warning"}),!1;if(!r)return this.$message({message:"上传文件大小不能超过5MB!",type:"warning"}),!1;if(0===this.balancelist.length)return this.$message({message:"请填写AI余额区间",type:"error"}),!1;if(this.balancelist.map(function(t){if(1*t.min<0||t.min.indexOf(".")>0||1*t.max<0||t.max.indexOf(".")>0||1*t.prob<0||t.prob.indexOf(".")>0)return e.$message({message:"AI余额区间应该为正整数",type:"error"}),!1}),0===this.game.length)return this.$message({message:"请选择游戏",type:"error"}),!1;for(var o="",m=0;m<t.gamelist.length;m++)for(var u=t.gamelist[m].name,d=0;d<this.game.length;d++){u==this.game[d]&&(""!=o?o=o+","+t.gamelist[m].scene:o+=t.gamelist[m].scene)}var g=new FormData;g.append("file",this.file);var p=n()(this.balancelist);g.append("priority",p),o=n()(o),g.append("ai_sup_game",o),g.append("agent_org_id",t.selectId),Object(c.a)({url:t.public.url+"/robotsceneconfig/addmultirobot",method:"post",data:g}).then(function(e){t.$message.success(e.message),t.dialogFormVisible=!1,t.$refs.form.resetFields(),t.form.max="",t.balancelist=[],t.game=[],t.fileList=[],f(t)}).catch(function(e){})},change:function(e,t){this.file=e.raw;var a=e.name.substring(e.name.lastIndexOf(".")+1),i="xls"===a,n="xlsx"===a,l=e.size/1024/1024<5;return i||n||this.$message({message:"上传文件只能是xls、xlsx格式",type:"warning"}),l||this.$message({message:"上传文件大小不能超过5MB!",type:"warning"}),i||n&&l},edit:function(e){var t=this;this.dialogFormVisible2=!0,Object(c.a)({url:t.public.url+"/robotsceneconfig/getrobotinfo",method:"post",data:{id:e.id}}).then(function(e){t.form2.account=e.data.login_name,t.form2.name=e.data.name,t.form2.balance=e.data.balance,t.form2.game=e.data.ai_sup_game.split("、"),t.id=e.data.id}).catch(function(e){})},sure:function(){var e=this,t=this;this.$refs.form.validate(function(a){if(!a)return!1;for(var i="",n=0;n<t.gamelist.length;n++)for(var l=t.gamelist[n].name,s=0;s<e.form.game.length;s++){l==e.form.game[s]&&(""!=i?i=i+","+t.gamelist[n].scene:i+=t.gamelist[n].scene)}Object(c.a)({url:t.public.url+"/robotsceneconfig/addonerobot",method:"post",data:{ai_sup_game:i,agent_org_id:t.selectId,login_name:e.form.account,nick_name:e.form.nick,avatar:e.form.head,avatar_frame:e.form.picture,min_money:e.form.balance,max_money:e.form.max}}).then(function(e){t.$message.success(e.message),t.dialogFormVisible=!1,t.$refs.form.resetFields(),t.form.max="",t.balancelist=[],t.game=[],t.fileList=[],f(t)}).catch(function(e){})})},sure2:function(){var e=this,t=this;this.$refs.form2.validate(function(a){if(!a)return!1;for(var i="",n=0;n<t.gamelist.length;n++)for(var l=t.gamelist[n].name,s=0;s<e.form2.game.length;s++){l==e.form2.game[s]&&(""!=i?i=i+","+t.gamelist[n].scene:i+=t.gamelist[n].scene)}Object(c.a)({url:t.public.url+"/robotsceneconfig/aisupgameupdate",method:"post",data:{ai_sup_game:i,id:e.id}}).then(function(e){t.dialogFormVisible2=!1,t.$refs.form2.resetFields(),f(t),t.$message({type:"success",message:"修改成功"})}).catch(function(e){})})},del:function(e){var t=this,a=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){Object(c.a)({url:a.public.url+"/robotsceneconfig/delaiaccount",method:"post",data:{id:e.id}}).then(function(e){t.$message({type:"success",message:e.message}),f(a)}).catch(function(e){})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},add:function(){this.selectId=null,this.title="新增AI角色",this.dialogFormVisible=!0,this.balancelist=[{min:"",max:"",prob:""}]},handleSizeChange:function(e){this.pagesize=e,this.currentPage=1,f(this);var t={id:this.formInline.id,currentPage:this.currentPage,pagesize:this.pagesize};this.$store.commit("setairole",t)},handleCurrentChange:function(e){this.currentPage=1*e,f(this);var t={id:this.formInline.id,currentPage:this.currentPage,pagesize:this.pagesize};this.$store.commit("setairole",t)}}},g=(a("HwB3"),a("KHd+")),p=Object(g.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container mail"},[a("div",{staticClass:"query"},[a("el-row",[a("el-form",{attrs:{inline:!0,"label-width":"100px"}},[a("el-col",{attrs:{span:2}},[e.robotsceneconfigaddonerobot||e.robotsceneconfigaddmultirobot?a("el-button",{attrs:{type:"info",round:""},on:{click:e.add}},[e._v("新增 + ")]):e._e()],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"支持游戏","label-width":"100px"}},[a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择支持游戏"},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}},e._l(e.gamelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.scene}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"Ai角色渠道","label-width":"100px"}},[a("el-select",{staticClass:"channel",attrs:{clearable:""},model:{value:e.selectId,callback:function(t){e.selectId=t},expression:"selectId"}},e._l(e.selectchannel,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:3}},[e.robotsceneconfigaiaccountlist?a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]):e._e()],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"pagingbox",staticStyle:{overflow:"hidden"}},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,background:"",layout:"prev, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"login_name",label:"AI账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"AI昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"balance",label:"AI角色余额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"agent_org_name",label:"AI角色渠道"}}),e._v(" "),a("el-table-column",{attrs:{label:"支持游戏"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("div",{staticStyle:{width:"200px",height:"25px","line-height":"25px"}},[e._v("Ai账号:"),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.login_name))])]),e._v(" "),a("div",{staticStyle:{width:"200px",height:"25px","line-height":"25px"}},[e._v("支持游戏:")]),e._v(" "),a("div",{staticStyle:{width:"200px",padding:"6px 0px 6px 0px","box-sizing":"border-box"}},[e._v(e._s(t.row.ai_sup_game))])]),e._v(" "),a("el-button",[e._v("查看")])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.robotsceneconfigaisupgameupdate?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.edit(t.row)}}},[e._v("修改")]):e._e(),e._v(" "),e.robotsceneconfigdelaiaccount?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.del(t.row)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"pagingbox"},[a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[20,50,200],"page-size":e.pagesize,background:"",layout:"sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),a("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,"before-close":e.reset},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.cardTab}},[e.robotsceneconfigaddonerobot?a("el-tab-pane",{attrs:{label:"单个创建"}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"AI账号","label-width":e.formLabelWidth,prop:"account"}},[a("el-input",{model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"AI账号昵称","label-width":e.formLabelWidth,prop:"nick"}},[a("el-input",{model:{value:e.form.nick,callback:function(t){e.$set(e.form,"nick",t)},expression:"form.nick"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像ID","label-width":e.formLabelWidth,prop:"head"}},[a("el-input",{model:{value:e.form.head,callback:function(t){e.$set(e.form,"head",t)},expression:"form.head"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像框ID","label-width":e.formLabelWidth,prop:"picture"}},[a("el-input",{model:{value:e.form.picture,callback:function(t){e.$set(e.form,"picture",t)},expression:"form.picture"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"AI余额区间","label-width":e.formLabelWidth,prop:"balance"}},[a("span",[e._v("最低")]),a("el-input",{staticStyle:{width:"20%"},attrs:{type:"number"},model:{value:e.form.balance,callback:function(t){e.$set(e.form,"balance",t)},expression:"form.balance"}}),a("span",[e._v("元")]),e._v(" "),a("span",[e._v("最高")]),a("el-input",{staticStyle:{width:"20%"},attrs:{type:"number"},model:{value:e.form.max,callback:function(t){e.$set(e.form,"max",t)},expression:"form.max"}}),a("span",[e._v("元")]),e._v(" "),a("span",{staticClass:"red"},[e._v("在此区间内随机生金额，单位最小到分")])],1),e._v(" "),a("el-form-item",{attrs:{label:"Ai所属渠道","label-width":e.formLabelWidth,prop:"channel"}},[a("el-select",{staticClass:"channel",attrs:{clearable:""},model:{value:e.selectId,callback:function(t){e.selectId=t},expression:"selectId"}},e._l(e.selectchannel,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"可参与游戏","label-width":e.formLabelWidth,prop:"game"}},[a("el-select",{attrs:{filterable:"",multiple:""},model:{value:e.form.game,callback:function(t){e.$set(e.form,"game",t)},expression:"form.game"}},e._l(e.gamelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:function(t){e.reset(e.form)}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sure(e.form)}}},[e._v("确 定")])],1)],1):e._e(),e._v(" "),e.robotsceneconfigaddmultirobot?a("el-tab-pane",{attrs:{label:"批量创建"}},[a("el-form",[a("el-form-item",{attrs:{label:"AI账号昵称","label-width":e.formLabelWidth}},[a("span",[e._v("上传账号昵称头像编号表")]),e._v(" "),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.action,headers:e.token,"on-exceed":e.exceed,"on-success":e.success,"on-error":e.error,"before-upload":e.before,"on-change":e.change,"auto-upload":!1,multiple:"",limit:1,"file-list":e.fileList}},[a("el-button",{attrs:{type:"warning"}},[e._v("上传文件")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传xls/xlsx文件,且文件大小不超过5m  "),a("span",{staticClass:"red"},[e._v("文件格式为账号、昵称、头像、头像框编号四列")])])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"AI余额区间","label-width":e.formLabelWidth}},[e._l(e.balancelist,function(t,i){return a("div",{key:i,staticStyle:{"margin-bottom":"5px"}},[a("span",[e._v("最低")]),a("el-input",{staticStyle:{width:"20%"},attrs:{type:"number"},model:{value:t.min,callback:function(a){e.$set(t,"min",a)},expression:"item.min"}}),a("span",[e._v("元")]),e._v(" "),a("span",[e._v("最高")]),a("el-input",{staticStyle:{width:"20%"},attrs:{type:"number"},model:{value:t.max,callback:function(a){e.$set(t,"max",a)},expression:"item.max"}}),a("span",[e._v("元")]),e._v(" "),a("span",[e._v("权重")]),a("el-input",{staticStyle:{width:"20%"},attrs:{type:"number"},model:{value:t.prob,callback:function(a){e.$set(t,"prob",a)},expression:"item.prob"}}),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.addai(i)}}},[e._v("新增")]),e._v(" "),0!=i?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.delet(i)}}},[e._v("删除")]):e._e(),a("br")],1)}),e._v(" "),a("span",{staticClass:"red"},[e._v("在此区间内随机生金额，单位最小到分")])],2),e._v(" "),a("el-form-item",{attrs:{label:"Ai所属渠道","label-width":e.formLabelWidth,prop:"channel"}},[a("el-select",{staticClass:"channel",attrs:{clearable:""},model:{value:e.selectId,callback:function(t){e.selectId=t},expression:"selectId"}},e._l(e.selectchannel,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"可参与游戏","label-width":e.formLabelWidth,prop:"game"}},[a("el-select",{attrs:{filterable:"",multiple:""},model:{value:e.game,callback:function(t){e.game=t},expression:"game"}},e._l(e.gamelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:function(t){e.reset(e.form)}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sure3(e.form)}}},[e._v("确 定")])],1)],1):e._e()],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"AI角色-修改",visible:e.dialogFormVisible2,"before-close":e.reset2},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[a("el-form",{ref:"form2",attrs:{model:e.form2,rules:e.rules2}},[a("el-form-item",{attrs:{label:"AI账号","label-width":e.formLabelWidth,prop:"account"}},[e._v("\n        "+e._s(e.form2.account)+"\n      ")]),e._v(" "),a("el-form-item",{attrs:{label:"AI昵称","label-width":e.formLabelWidth,prop:"name"}},[e._v("\n        "+e._s(e.form2.name)+"\n      ")]),e._v(" "),a("el-form-item",{attrs:{label:"AI角色余额","label-width":e.formLabelWidth,prop:"balance"}},[e._v("\n        "+e._s(e.form2.balance)+"\n      ")]),e._v(" "),a("el-form-item",{attrs:{label:"支持游戏","label-width":e.formLabelWidth,prop:"game"}},[a("el-select",{attrs:{filterable:"",multiple:""},model:{value:e.form2.game,callback:function(t){e.$set(e.form2,"game",t)},expression:"form2.game"}},e._l(e.gamelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.reset2(e.form)}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sure2(e.form)}}},[e._v("确 定")])],1)],1)],1)},[],!1,null,null,null);p.options.__file="airole.vue";t.default=p.exports},Mqbl:function(e,t,a){var i=a("JB68"),n=a("w6GO");a("zn7N")("keys",function(){return function(e){return n(i(e))}})},iq4v:function(e,t,a){a("Mqbl"),e.exports=a("WEpk").Object.keys},tFov:function(e,t,a){},zn7N:function(e,t,a){var i=a("Y7ZC"),n=a("WEpk"),l=a("KUxP");e.exports=function(e,t){var a=(n.Object||{})[e]||Object[e],s={};s[e]=t(a),i(i.S+i.F*l(function(){a(1)}),"Object",s)}}}]);