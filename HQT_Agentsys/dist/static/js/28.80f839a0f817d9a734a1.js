webpackJsonp([28],{dMo7:function(t,e){},"g5/7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),l=a.n(s),i=a("pVTI"),n=a("NYxO"),o=a("vLgD"),r={data:function(){return{value:"",team_flow:"",team_tax:"",list:[],newlist:[],pageno:1,pagenum:1,id:""}},computed:l()({},Object(n.b)(["name"])),components:{otherheader:i.a},created:function(){c(this,1)},methods:{back:function(){this.$router.push({path:"/"})},search:function(){this.$router.push({path:"/teamreportsearch"})},loadmore:function(){this.pageno<this.pagenum&&(this.pageno++,c(this,this.pageno))}}};function c(t,e){Object(o.a)({url:t.public.url+"/teamreport/getlist",method:"post",data:{pageno:e,pagerows:15}}).then(function(e){t.team_flow=e.data.list[0].team_flow,t.team_tax=e.data.list[0].self_tax.toString(),t.newlist=e.data.list,t.pageno=e.data.pageno,t.pagenum=e.data.pagenum}).catch(function(t){})}var m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container teamreport"},[s("mt-header",{attrs:{title:"团队报表"}},[s("mt-button",{staticClass:"all_palm",attrs:{slot:"left"},on:{click:t.back},slot:"left"},[s("i",{staticClass:"mintui mintui-back"})])],1),t._v(" "),s("div",{staticClass:"card"},[s("mt-cell",{attrs:{title:t.name}},[s("img",{staticStyle:{width:"1.875rem",height:"1.875rem"},attrs:{slot:"icon",src:a("s0MG")},slot:"icon"})])],1),t._v(" "),s("div",{staticClass:"card"},[s("mt-cell",{attrs:{title:"团队报表","is-link":"",to:"/teaminfo?"+t.id}}),t._v(" "),s("div",{staticStyle:{display:"flex"}},[s("mt-cell",{staticClass:"threecell fontcolorb",attrs:{title:"团队总流水（总计）",label:t.team_flow}}),t._v(" "),s("mt-cell",{staticClass:"threecell fontcolorr",attrs:{title:"个人税收收益",label:t.team_tax}})],1)],1),t._v(" "),s("p",{staticStyle:{color:"red","text-align":"center"}},[t._v("∗ 仅展示近一个月内的报表数据")]),t._v(" "),s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadmore,expression:"loadmore"}]},t._l(t.newlist,function(e,a){return s("div",{key:a,staticClass:"card namestyle"},[s("mt-cell",{attrs:{title:e.agent_name,"is-link":"",to:"/teaminfo?"+e.agent_id}}),t._v(" "),s("div",{staticClass:"boxposition"},[s("p",[t._v("团队总流水："),s("span",{staticClass:"fontcolorb"},[t._v(t._s(e.team_flow))])]),t._v(" "),s("p",[t._v("个人税收收益："),s("span",{staticClass:"fontcolorr"},[t._v(t._s(e.self_tax))])])])],1)})),t._v(" "),s("p",{staticStyle:{color:"red","text-align":"center"}},[t._v("没有更多数据了")])],1)},staticRenderFns:[]};var d=a("VU/8")(r,m,!1,function(t){a("dMo7")},null,null);e.default=d.exports}});