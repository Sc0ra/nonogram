(function(t){function e(e){for(var r,s,o=e[0],l=e[1],c=e[2],f=0,h=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(h.length)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/nonogram/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"22c3":function(t,e,n){},"32cc":function(t,e,n){},"36c4":function(t,e,n){},"4d8e":function(t,e,n){"use strict";var r=n("22c3"),i=n.n(r);i.a},"5c0b":function(t,e,n){"use strict";var r=n("9c0c"),i=n.n(r);i.a},"5e60":function(t,e,n){"use strict";var r=n("36c4"),i=n.n(r);i.a},"709f":function(t,e,n){},"840d":function(t,e,n){"use strict";var r=n("709f"),i=n.n(r);i.a},"9c0c":function(t,e,n){},b404:function(t,e,n){"use strict";var r=n("32cc"),i=n.n(r);i.a},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view",{staticClass:"main"})],1)},a=[],s=n("d4ec"),o=n("2caf"),l=n("262e"),c=n("9ab4"),u=n("60a3"),f=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return n}(u["c"]);f=Object(c["a"])([u["a"]],f);var h=f,d=h,p=(n("5c0b"),n("2877")),v=Object(p["a"])(d,i,a,!1,null,null,null),b=v.exports,y=n("2f62"),m={},O=m,g={},j=g,k={getLevel:function(t){return function(e){return t[e]}}},C=k,_={1:{model:[[0,1,1,0],[1,1,1,1],[1,0,1,1],[0,1,1,0]],maxHealth:3},2:{model:[[0,1,1,0,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,1,0,1],[0,1,1,0,1,1,1,1,0,1],[0,1,1,0,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,1,0,1],[0,1,1,0,1,1,1,1,0,1],[1,0,1,1,1,1,1,1,0,1],[0,1,1,0,1,1,1,1,0,1]],maxHealth:3}},w=!0,E={namespaced:w,state:_,actions:O,mutations:j,getters:C};r["a"].use(y["a"]);var x,H={modules:{levels:E}},L=new y["a"].Store(H),F=n("8c4f"),A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.level?n("div",[n("h1",{staticClass:"title is-1"},[t._v(" Nonogram ")]),n("div",{staticClass:"wrapper"},[t.success?n("h2",[t._v(" Congratulations !! ")]):n("health-bar",{attrs:{"max-health":t.level.maxHealth,"current-health":t.currentHealth}}),n("grid",{attrs:{model:t.level.model},on:{error:function(e){t.currentHealth++},success:function(e){t.success=!0}}})],1)]):t._e()},B=[],S=n("bee2"),$=n("4bb5"),q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",{staticClass:"board",on:{mouseup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:void(t.isEditing=!1)},mouseleave:function(e){t.isEditing=!1,t.hoveredCell={x:void 0,y:void 0}},contextmenu:function(t){t.preventDefault()}}},[n("tbody",[n("tr",[n("td"),t._l(t.width,(function(e){return n("td",{key:e-1,staticClass:"column-hint"},t._l(t.columnHints[e-1],(function(r,i){return n("div",{key:i,staticClass:"hint",class:{"success-hint":t.successColumn(e-1)}},[t._v(" "+t._s(r)+" ")])})),0)}))],2),t._l(t.state,(function(e,r){return n("tr",{key:r},[n("td",{staticClass:"line-hint"},t._l(t.rowHints[r],(function(e,i){return n("span",{key:i,staticClass:"hint",class:{"success-hint":t.successLine(r)}},[t._v(" "+t._s(e)+" ")])})),0),t._l(e,(function(e,i){return n("cell",{key:i,attrs:{value:e,highlighted:r===t.hoveredCell.x||i===t.hoveredCell.y,"fat-borders":t.fatBorders(r,i)},nativeOn:{mouseenter:function(e){return t.onEnter(r,i)},mousedown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:(e.preventDefault(),t.onLeftClick(r,i))},mouseover:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.onNewCellEnter(r,i)},mouseup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.onRightClick(r,i)}}})}))],2)}))],2)])])},N=[],P=(n("a623"),n("cb29"),n("d81d"),n("13d5"),n("a434"),n("d3b7"),n("ddb0"),n("2909")),T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("td",{staticClass:"cell",class:t.style})},M=[];n("caad"),n("a9e3"),n("2532");(function(t){t[t["Empty"]=0]="Empty",t[t["Fill"]=1]="Fill",t[t["Flag"]=2]="Flag",t[t["Error"]=3]="Error"})(x||(x={}));var R=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return Object(S["a"])(n,[{key:"style",get:function(){return{"is-fill":this.value===x.Fill,"is-flag":this.value===x.Flag,"is-error":this.value===x.Error,"is-highlight":this.highlighted,left:this.fatBorders.includes("left"),right:this.fatBorders.includes("right"),top:this.fatBorders.includes("top"),bottom:this.fatBorders.includes("bottom")}}}]),n}(u["c"]);Object(c["a"])([Object(u["b"])({required:!0,type:Number})],R.prototype,"value",void 0),Object(c["a"])([Object(u["b"])({required:!0,type:Boolean})],R.prototype,"highlighted",void 0),Object(c["a"])([Object(u["b"])({required:!0,type:Array})],R.prototype,"fatBorders",void 0),R=Object(c["a"])([u["a"]],R);var I=R,D=I,J=(n("b404"),Object(p["a"])(D,T,M,!1,null,"778783de",null)),G=J.exports,z=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.hoveredCell={},t.rowToHints=function(t){var e=[],n=0;return e=t.reduce((function(t,e){return 1===e?n+=1:n>0&&(t.push(n),n=0),t}),e),0!==n&&e.push(n),e},t.state=[],t.isEditing=!1,t.fatBorders=function(t,e){var n=[];return t%5===0?n.push("top"):t%5===4&&n.push("bottom"),e%5===0?n.push("left"):e%5===4&&n.push("right"),n},t}return Object(S["a"])(n,[{key:"created",value:function(){var t=this;this.state=Array(this.heigth).fill(x.Empty).map((function(){return Array(t.width).fill(x.Empty).map((function(){return x.Empty}))}))}},{key:"updateCell",value:function(t,e,n){var r=this.state[t];r[e]=n,this.state.splice(t,1,r)}},{key:"selectCell",value:function(t,e){this.model[t][e]===x.Fill?this.updateCell(t,e,x.Fill):this.state[t][e]===x.Empty&&(this.updateCell(t,e,x.Error),this.$emit("error"),this.isEditing=!1)}},{key:"onRightClick",value:function(t,e){var n=this.state[t][e];n===x.Empty?this.updateCell(t,e,x.Flag):this.updateCell(t,e,x.Empty)}},{key:"onLeftClick",value:function(t,e){this.isEditing=!0,this.selectCell(t,e)}},{key:"onNewCellEnter",value:function(t,e){this.isEditing&&this.selectCell(t,e)}},{key:"successCell",value:function(t,e,n){return this.model[t][e]!==x.Fill||n===this.model[t][e]}},{key:"successColumn",value:function(t){var e=this;return this.state.every((function(n,r){return e.successCell(r,t,n[t])}))}},{key:"successLine",value:function(t){var e=this;return this.state[t].every((function(n,r){return e.successCell(t,r,n)}))}},{key:"onSuccess",value:function(t){t&&(this.isEditing=!1,this.$emit("success"))}},{key:"onEnter",value:function(t,e){this.hoveredCell={x:t,y:e}}},{key:"heigth",get:function(){return this.model&&this.model.length}},{key:"width",get:function(){return this.model&&this.model[0].length}},{key:"columnHints",get:function(){var t=this;return Object(P["a"])(Array(this.model[0].length).keys()).map((function(e){return t.model.map((function(t){return t[e]}))})).map(this.rowToHints)}},{key:"rowHints",get:function(){return this.model.map(this.rowToHints)}},{key:"success",get:function(){var t=this;return this.state.every((function(e,n){return t.successLine(n)}))}}]),n}(u["c"]);Object(c["a"])([Object(u["b"])({required:!0,type:Array})],z.prototype,"model",void 0),Object(c["a"])([Object(u["d"])("success")],z.prototype,"onSuccess",null),z=Object(c["a"])([Object(u["a"])({components:{Cell:G}})],z);var K=z,Q=K,U=(n("5e60"),Object(p["a"])(Q,q,N,!1,null,"37cc4a78",null)),V=U.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"health-bar"},t._l(t.maxHealth,(function(e){return n("span",{key:e,staticClass:"icon is-large"},[n("i",{staticClass:"fa-heart is-error fa-2x",class:e<=t.currentHealth?"far":"fas"})])})),0)},X=[],Y=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return n}(u["c"]);Object(c["a"])([Object(u["b"])({required:!0,type:Number})],Y.prototype,"maxHealth",void 0),Object(c["a"])([Object(u["b"])({required:!0,type:Number})],Y.prototype,"currentHealth",void 0),Y=Object(c["a"])([u["a"]],Y);var Z=Y,tt=Z,et=(n("4d8e"),Object(p["a"])(tt,W,X,!1,null,"30b6e2f4",null)),nt=et.exports,rt=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.currentHealth=0,t.maxErrorCount=3,t.success=!1,t}return Object(S["a"])(n,[{key:"level",get:function(){return this.getLevel(this.levelId)}}]),n}(u["c"]);Object(c["a"])([Object(u["b"])({required:!0,type:String})],rt.prototype,"levelId",void 0),Object(c["a"])([Object($["a"])("getLevel",{namespace:"levels"})],rt.prototype,"getLevel",void 0),rt=Object(c["a"])([Object(u["a"])({components:{Grid:V,HealthBar:nt}})],rt);var it=rt,at=it,st=(n("840d"),Object(p["a"])(at,A,B,!1,null,null,null)),ot=st.exports,lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticClass:"title is-1"},[t._v(" Nonogram ")]),n("router-link",{attrs:{to:{path:"/level/1"}}},[t._v(" Level 1 ")]),n("router-link",{attrs:{to:{path:"/level/2"}}},[t._v(" Level 2 ")])],1)},ct=[],ut=function(t){Object(l["a"])(n,t);var e=Object(o["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return n}(u["c"]);ut=Object(c["a"])([u["a"]],ut);var ft=ut,ht=ft,dt=Object(p["a"])(ht,lt,ct,!1,null,null,null),pt=dt.exports;r["a"].use(F["a"]);var vt=[{path:"/level/:levelId",name:"Level",component:ot,props:!0},{path:"/",name:"Home",component:pt}],bt=new F["a"]({mode:"hash",base:"/nonogram/",routes:vt}),yt=bt;r["a"].config.productionTip=!1,new r["a"]({store:L,router:yt,render:function(t){return t(b)}}).$mount("#app")}});
//# sourceMappingURL=app.4c07f011.js.map