webpackJsonp([10],{"6HH2":function(t,l,e){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var a=e("pVTI"),s=e("vLgD"),i={data:function(){return{value:"",show:!1,show1:!1,show2:!1,show3:!1,show4:!1,show5:!1,show6:!1,child_flow:{},child_reward:{},direct_flow:{},direct_reward:{},group_flow:{},group_reward:{},my_income:{}}},components:{otherheader:a.a},created:function(){var t=this;Object(s.a)({url:t.public.url+"/account/getincomeinfo",method:"post",data:{}}).then(function(l){t.child_flow=l.data.child_flow,t.child_reward=l.data.child_reward,t.direct_flow=l.data.direct_flow,t.direct_reward=l.data.direct_reward,t.group_flow=l.data.group_flow,t.group_reward=l.data.group_reward,t.my_income=l.data.my_income}).catch(function(t){})},methods:{}},c={render:function(){var t=this,l=t.$createElement,a=t._self._c||l;return a("div",{staticClass:"container earnings"},[a("otherheader",{attrs:{title:"收益详情"}}),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"我的收益"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show=!t.show}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show,callback:function(l){t.show=l},expression:"show"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("我的收益")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("我的税收收益总和")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.my_income.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.my_income.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.my_income.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"团队流水"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show1=!t.show1}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show1,callback:function(l){t.show1=l},expression:"show1"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("团队流水")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.group_flow.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.group_flow.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.group_flow.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"下级流水"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show2=!t.show2}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show2,callback:function(l){t.show2=l},expression:"show2"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("下级流水")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("团队流水-直属流水")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.child_flow.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.child_flow.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.child_flow.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"直属流水"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show3=!t.show3}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show3,callback:function(l){t.show3=l},expression:"show3"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("直属流水")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("直属玩家提供的流水总额")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.direct_flow.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.child_flow.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.child_flow.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"团队税收"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show4=!t.show4}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show4,callback:function(l){t.show4=l},expression:"show4"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("团队税收")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("团队的税收收益总额（团队总流水*计税税收*团队最高代理分红额度）")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.group_reward.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.group_reward.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.group_reward.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"下级税收"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show5=!t.show5}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show5,callback:function(l){t.show5=l},expression:"show5"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("下级税收")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("团队税收-直属税收")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.child_reward.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.child_reward.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.child_reward.yersterday}})],1)],1),t._v(" "),a("div",{staticClass:"card"},[a("mt-cell",{attrs:{title:"直属税收"}},[a("img",{staticClass:"mark1 all_palm",staticStyle:{width:"1.25rem",height:"1.25rem"},attrs:{slot:"icon",src:e("ZWUT")},on:{click:function(l){t.show6=!t.show6}},slot:"icon"}),t._v(" "),a("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.show6,callback:function(l){t.show6=l},expression:"show6"}},[a("div",{staticStyle:{"text-align":"center","line-height":"1.875rem"}},[t._v("直属税收")]),t._v(" "),a("div",{staticStyle:{"line-height":"1.25rem"}},[t._v("直属流水*计税税率*自身代理分红比例")])])],1),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("mt-cell",{staticClass:"threecell",attrs:{title:"总计",label:t.direct_reward.total}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"今日",label:t.direct_reward.today}}),t._v(" "),a("mt-cell",{staticClass:"threecell",attrs:{title:"昨日",label:t.direct_reward.yersterday}})],1)],1)],1)},staticRenderFns:[]};var r=e("VU/8")(i,c,!1,function(t){e("8Cfu")},null,null);l.default=r.exports},"8Cfu":function(t,l){}});