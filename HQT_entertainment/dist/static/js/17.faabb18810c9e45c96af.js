webpackJsonp([17],{"8vMv":function(e,t){},TofE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"player_information",data:function(){return{percentage:0,colors:"#b00cb3",information:[{theme:"代理信息",active_title:"今日活跃代理",active:"10",newly_added_title:"今日新增代理",newly_added:"10",see_agent:"查看代理"},{theme:"玩家信息",active_title:"今日活跃玩家",active:"100",newly_added_title:"今日新增玩家",newly_added:"200",see_agent:"查看玩家"}]}},created:function(){var e,t=this;e=setInterval(function(){t.percentage<60?t.percentage=t.percentage+5:clearInterval(e)},20)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{attrs:{id:"player_information"}},e._l(e.information,function(t,n){return a("div",{staticClass:"cards_frame"},[a("div",{staticClass:"cards_title"},[e._v(e._s(t.theme))]),e._v(" "),a("div",{staticClass:"cards_content"},[a("div",{staticClass:"balance"},[a("span",[e._v(e._s(t.active_title)+":")]),a("span",[e._v(e._s(t.active))])]),e._v(" "),a("div",{staticClass:"gear_position"},[a("span",[e._v(e._s(t.newly_added_title)+":")]),a("span",[e._v(e._s(t.newly_added))])]),e._v(" "),a("div",{staticClass:"see_agent"},[a("el-progress",{attrs:{type:"circle",percentage:e.percentage,color:e.colors,"show-text":!1,width:155,"stroke-width":6}})],1),e._v(" "),a("span",{staticClass:"progress_words"},[e._v("查看代理")])])])}),0)},staticRenderFns:[]};var i=a("C7Lr")(n,s,!1,function(e){a("8vMv")},"data-v-94f63bd6",null);t.default=i.exports}});
//# sourceMappingURL=17.faabb18810c9e45c96af.js.map