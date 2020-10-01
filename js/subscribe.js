var app=function(){"use strict";function e(){}const t=e=>e;function n(e,t){for(const n in t)e[n]=t[n];return e}function s(e){return e()}function o(){return Object.create(null)}function r(e){e.forEach(s)}function i(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function l(e,t,s,o){return e[1]&&o?n(s.ctx.slice(),e[1](o(t))):s.ctx}function c(e){return null==e?"":e}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),m=u?e=>requestAnimationFrame(e):e;const p=new Set;function f(e){p.forEach(t=>{t.c(e)||(p.delete(t),t.f())}),0!==p.size&&m(f)}function h(e,t){e.appendChild(t)}function g(e,t,n){e.insertBefore(t,n||null)}function _(e){e.parentNode.removeChild(e)}function y(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function b(e){return document.createElement(e)}function $(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function v(e){return document.createTextNode(e)}function w(){return v(" ")}function k(){return v("")}function x(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function S(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function C(e,t){t=""+t,e.data!==t&&(e.data=t)}function E(e,t,n,s){e.style.setProperty(t,n,s?"important":"")}function T(e,t,n){e.classList[n?"add":"remove"](t)}function I(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}const N=new Set;let j,q=0;function B(e,t,n,s,o,r,i,a=0){const l=16.666/s;let c="{\n";for(let e=0;e<=1;e+=l){const s=t+(n-t)*r(e);c+=100*e+`%{${i(s,1-s)}}\n`}const u=c+`100% {${i(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(u)}_${a}`,m=e.ownerDocument;N.add(m);const p=m.__svelte_stylesheet||(m.__svelte_stylesheet=m.head.appendChild(b("style")).sheet),f=m.__svelte_rules||(m.__svelte_rules={});f[d]||(f[d]=!0,p.insertRule(`@keyframes ${d} ${u}`,p.cssRules.length));const h=e.style.animation||"";return e.style.animation=`${h?h+", ":""}${d} ${s}ms linear ${o}ms 1 both`,q+=1,d}function z(e){j=e}function A(){if(!j)throw new Error("Function called outside component initialization");return j}function M(e){A().$$.on_mount.push(e)}function O(){const e=A();return(t,n)=>{const s=e.$$.callbacks[t];if(s){const o=I(t,n);s.slice().forEach(t=>{t.call(e,o)})}}}const P=[],W=[],Y=[],L=[],F=Promise.resolve();let D=!1;function H(e){Y.push(e)}let R=!1;const V=new Set;function G(){if(!R){R=!0;do{for(let e=0;e<P.length;e+=1){const t=P[e];z(t),J(t.$$)}for(P.length=0;W.length;)W.pop()();for(let e=0;e<Y.length;e+=1){const t=Y[e];V.has(t)||(V.add(t),t())}Y.length=0}while(P.length);for(;L.length;)L.pop()();D=!1,R=!1,V.clear()}}function J(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}let K;function Q(e,t,n){e.dispatchEvent(I(`${t?"intro":"outro"}${n}`))}const U=new Set;let X;function Z(){X={r:0,c:[],p:X}}function ee(){X.r||r(X.c),X=X.p}function te(e,t){e&&e.i&&(U.delete(e),e.i(t))}function ne(e,t,n,s){if(e&&e.o){if(U.has(e))return;U.add(e),X.c.push(()=>{U.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}}const se={duration:0};function oe(n,s,o,a){let l=s(n,o),c=a?0:1,u=null,h=null,g=null;function _(){g&&function(e,t){const n=(e.style.animation||"").split(", "),s=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),o=n.length-s.length;o&&(e.style.animation=s.join(", "),q-=o,q||m(()=>{q||(N.forEach(e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}}),N.clear())}))}(n,g)}function y(e,t){const n=e.b-c;return t*=Math.abs(n),{a:c,b:e.b,d:n,duration:t,start:e.start,end:e.start+t,group:e.group}}function b(s){const{delay:o=0,duration:i=300,easing:a=t,tick:b=e,css:$}=l||se,v={start:d()+o,b:s};s||(v.group=X,X.r+=1),u?h=v:($&&(_(),g=B(n,c,s,i,o,a,$)),s&&b(0,1),u=y(v,i),H(()=>Q(n,s,"start")),function(e){let t;0===p.size&&m(f),new Promise(n=>{p.add(t={c:e,f:n})})}(e=>{if(h&&e>h.start&&(u=y(h,i),h=null,Q(n,u.b,"start"),$&&(_(),g=B(n,c,u.b,u.duration,0,a,l.css))),u)if(e>=u.end)b(c=u.b,1-c),Q(n,u.b,"end"),h||(u.b?_():--u.group.r||r(u.group.c)),u=null;else if(e>=u.start){const t=e-u.start;c=u.a+u.d*a(t/u.duration),b(c,1-c)}return!(!u&&!h)}))}return{run(e){i(l)?(K||(K=Promise.resolve(),K.then(()=>{K=null})),K).then(()=>{l=l(),b(e)}):b(e)},end(){_(),u=h=null}}}function re(e,t){const n={},s={},o={$$scope:1};let r=e.length;for(;r--;){const i=e[r],a=t[r];if(a){for(const e in i)e in a||(s[e]=1);for(const e in a)o[e]||(n[e]=a[e],o[e]=1);e[r]=a}else for(const e in i)o[e]=1}for(const e in s)e in n||(n[e]=void 0);return n}function ie(e){return"object"==typeof e&&null!==e?e:{}}function ae(e){e&&e.c()}function le(e,t,n){const{fragment:o,on_mount:a,on_destroy:l,after_update:c}=e.$$;o&&o.m(t,n),H(()=>{const t=a.map(s).filter(i);l?l.push(...t):r(t),e.$$.on_mount=[]}),c.forEach(H)}function ce(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ue(t,n,s,i,a,l,c=[-1]){const u=j;z(t);const d=n.props||{},m=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:a,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:c};let p=!1;if(m.ctx=s?s(t,d,(e,n,...s)=>{const o=s.length?s[0]:n;return m.ctx&&a(m.ctx[e],m.ctx[e]=o)&&(m.bound[e]&&m.bound[e](o),p&&function(e,t){-1===e.$$.dirty[0]&&(P.push(e),D||(D=!0,F.then(G)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(t,e)),n}):[],m.update(),p=!0,r(m.before_update),m.fragment=!!i&&i(m.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);m.fragment&&m.fragment.l(e),e.forEach(_)}else m.fragment&&m.fragment.c();n.intro&&te(t.$$.fragment),le(t,n.target,n.anchor),G()}z(u)}class de{$destroy(){ce(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}function me(t){let n,s,o,r,i,a,l,c,u,d,m,p,f,y=t[4]?"Selected":"Select";return{c(){n=b("div"),s=b("h3"),o=v(t[0]),r=w(),i=b("p"),a=v(t[1]),l=w(),c=b("p"),u=v(t[2]),d=w(),m=b("button"),p=v(y),S(s,"class","option__title svelte-6vtuuk"),S(i,"class","option__description svelte-6vtuuk"),S(c,"class","option__price svelte-6vtuuk"),S(m,"class","option__button svelte-6vtuuk"),S(m,"data-form",t[3]),T(m,"selected",t[4]),S(n,"class","option svelte-6vtuuk")},m(e,_,y){g(e,n,_),h(n,s),h(s,o),h(n,r),h(n,i),h(i,a),h(n,l),h(n,c),h(c,u),h(n,d),h(n,m),h(m,p),y&&f(),f=x(m,"click",t[5])},p(e,[t]){1&t&&C(o,e[0]),2&t&&C(a,e[1]),4&t&&C(u,e[2]),16&t&&y!==(y=e[4]?"Selected":"Select")&&C(p,y),8&t&&S(m,"data-form",e[3]),16&t&&T(m,"selected",e[4])},i:e,o:e,d(e){e&&_(n),f()}}}function pe(e,t,n){let{title:s}=t,{description:o}=t,{price:r}=t,{form:i}=t,{selected:a}=t;const l=O();return e.$set=e=>{"title"in e&&n(0,s=e.title),"description"in e&&n(1,o=e.description),"price"in e&&n(2,r=e.price),"form"in e&&n(3,i=e.form),"selected"in e&&n(4,a=e.selected)},[s,o,r,i,a,function(e){l("select",e.target.dataset.form)}]}class fe extends de{constructor(e){super(),ue(this,e,pe,me,a,{title:0,description:1,price:2,form:3,selected:4})}}function he(e,t,n){const s=e.slice();return s[3]=t[n],s}function ge(e){let t;const s=[e[3]];let o={};for(let e=0;e<s.length;e+=1)o=n(o,s[e]);const r=new fe({props:o});return r.$on("select",e[1]),{c(){ae(r.$$.fragment)},m(e,n){le(r,e,n),t=!0},p(e,t){const n=1&t?re(s,[ie(e[3])]):{};r.$set(n)},i(e){t||(te(r.$$.fragment,e),t=!0)},o(e){ne(r.$$.fragment,e),t=!1},d(e){ce(r,e)}}}function _e(e){let t,n,s,o,r,i=e[0],a=[];for(let t=0;t<i.length;t+=1)a[t]=ge(he(e,i,t));const l=e=>ne(a[e],1,1,()=>{a[e]=null});return{c(){t=b("section"),n=b("h2"),n.textContent="Choose Your Subscription",s=w(),o=b("div");for(let e=0;e<a.length;e+=1)a[e].c();S(n,"class","options-heading svelte-1l5yv7j"),S(o,"class","options-table svelte-1l5yv7j"),S(t,"class","formHeader svelte-1l5yv7j")},m(e,i){g(e,t,i),h(t,n),h(t,s),h(t,o);for(let e=0;e<a.length;e+=1)a[e].m(o,null);r=!0},p(e,[t]){if(3&t){let n;for(i=e[0],n=0;n<i.length;n+=1){const s=he(e,i,n);a[n]?(a[n].p(s,t),te(a[n],1)):(a[n]=ge(s),a[n].c(),te(a[n],1),a[n].m(o,null))}for(Z(),n=i.length;n<a.length;n+=1)l(n);ee()}},i(e){if(!r){for(let e=0;e<i.length;e+=1)te(a[e]);r=!0}},o(e){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)ne(a[e]);r=!1},d(e){e&&_(t),y(a,e)}}}function ye(e,t,n){let s=[{title:"Magazine Only",description:"Ireland + N. Ireland / Rest of the World",price:"€25 / €30",form:"magonly",selected:!1},{title:"Books Only",description:"Ireland + N. Ireland / Rest of the World",price:"€30 / €35",form:"bookonly",selected:!1},{title:"Magazine + Books",description:"Ireland + N. Ireland / Rest of the World",price:"€50 / €60",form:"magbook",selected:!1},{title:"Patron",description:"Choose Your Own Price",price:"€100+",form:"patron",selected:!1}];const o=O();return[s,e=>{o("formSelect",e.detail),s.forEach(e=>e.selected=!1);let t=s.findIndex(t=>t.form===e.detail);n(0,s[t].selected=!0,s)}]}class be extends de{constructor(e){super(),ue(this,e,ye,_e,a,{})}}function $e(e,{delay:n=0,duration:s=400,easing:o=t}){const r=+getComputedStyle(e).opacity;return{delay:n,duration:s,easing:o,css:e=>"opacity: "+e*r}}function ve(e){let t,n,s,o,r,i,a,l=e[4]&&we();return{c(){t=b("label"),n=b("span"),s=v(e[1]),o=w(),r=b("input"),i=w(),l&&l.c(),S(n,"class","label-title svelte-nmjtwm"),S(r,"id",e[0]),S(r,"type",e[3]),r.required=e[4],r.disabled=e[8],S(r,"placeholder"," "),S(r,"pattern",".*\\S.*"),S(t,"for",e[0]),S(t,"class",a=c(e[5])+" svelte-nmjtwm")},m(e,a){g(e,t,a),h(t,n),h(n,s),h(t,o),h(t,r),h(t,i),l&&l.m(t,null)},p(e,n){2&n&&C(s,e[1]),1&n&&S(r,"id",e[0]),8&n&&S(r,"type",e[3]),16&n&&(r.required=e[4]),256&n&&(r.disabled=e[8]),e[4]?l||(l=we(),l.c(),l.m(t,null)):l&&(l.d(1),l=null),1&n&&S(t,"for",e[0]),32&n&&a!==(a=c(e[5])+" svelte-nmjtwm")&&S(t,"class",a)},d(e){e&&_(t),l&&l.d()}}}function we(e){let t;return{c(){t=b("span"),t.textContent="This field is required.",S(t,"class","validation")},m(e,n){g(e,t,n)},d(e){e&&_(t)}}}function ke(e){let t,n,s,o;return{c(){t=b("input"),n=w(),s=b("label"),o=v(e[1]),S(t,"type",e[3]),S(t,"name",e[0]),S(t,"id",e[2]),t.value=e[7],t.disabled=e[8],t.checked=e[6],S(s,"for",e[2])},m(e,r){g(e,t,r),g(e,n,r),g(e,s,r),h(s,o)},p(e,n){8&n&&S(t,"type",e[3]),1&n&&S(t,"name",e[0]),4&n&&S(t,"id",e[2]),128&n&&t.value!==e[7]&&(t.value=e[7]),256&n&&(t.disabled=e[8]),64&n&&(t.checked=e[6]),2&n&&C(o,e[1]),4&n&&S(s,"for",e[2])},d(e){e&&_(t),e&&_(n),e&&_(s)}}}function xe(e){let t,n,s,o,r,i,a;return{c(){t=b("label"),n=b("span"),s=v(e[1]),o=w(),r=b("input"),S(n,"class","label-title svelte-nmjtwm"),S(r,"type",e[3]),S(r,"name",e[0]),S(r,"pattern",i="\\d4-\\d2-\\d2"),S(r,"min",a=e[9]()),S(t,"for",e[2])},m(e,i){g(e,t,i),h(t,n),h(n,s),h(t,o),h(t,r)},p(e,n){2&n&&C(s,e[1]),8&n&&S(r,"type",e[3]),1&n&&S(r,"name",e[0]),4&n&&S(t,"for",e[2])},d(e){e&&_(t)}}}function Se(e){let t,n;return{c(){t=b("h3"),n=v(e[1]),S(t,"class","svelte-nmjtwm")},m(e,s){g(e,t,s),h(t,n)},p(e,t){2&t&&C(n,e[1])},d(e){e&&_(t)}}}function Ce(t){let n,s,o,r,i="text"===t[3]&&ve(t),a="radio"===t[3]&&ke(t),l="date"===t[3]&&xe(t),c="heading"===t[3]&&Se(t);return{c(){i&&i.c(),n=w(),a&&a.c(),s=w(),l&&l.c(),o=w(),c&&c.c(),r=k()},m(e,t){i&&i.m(e,t),g(e,n,t),a&&a.m(e,t),g(e,s,t),l&&l.m(e,t),g(e,o,t),c&&c.m(e,t),g(e,r,t)},p(e,[t]){"text"===e[3]?i?i.p(e,t):(i=ve(e),i.c(),i.m(n.parentNode,n)):i&&(i.d(1),i=null),"radio"===e[3]?a?a.p(e,t):(a=ke(e),a.c(),a.m(s.parentNode,s)):a&&(a.d(1),a=null),"date"===e[3]?l?l.p(e,t):(l=xe(e),l.c(),l.m(o.parentNode,o)):l&&(l.d(1),l=null),"heading"===e[3]?c?c.p(e,t):(c=Se(e),c.c(),c.m(r.parentNode,r)):c&&(c.d(1),c=null)},i:e,o:e,d(e){i&&i.d(e),e&&_(n),a&&a.d(e),e&&_(s),l&&l.d(e),e&&_(o),c&&c.d(e),e&&_(r)}}}function Ee(e,t,n){let{name:s}=t,{label:o}=t,{input_id:r}=t,{type:i}=t,{required:a=!1}=t,{classes:l}=t,{checked:c}=t,{value:u}=t,{disabled:d}=t;return e.$set=e=>{"name"in e&&n(0,s=e.name),"label"in e&&n(1,o=e.label),"input_id"in e&&n(2,r=e.input_id),"type"in e&&n(3,i=e.type),"required"in e&&n(4,a=e.required),"classes"in e&&n(5,l=e.classes),"checked"in e&&n(6,c=e.checked),"value"in e&&n(7,u=e.value),"disabled"in e&&n(8,d=e.disabled)},[s,o,r,i,a,l,c,u,d,()=>{let e=new Date,t=""+e.getFullYear(),n=""+e.getMonth(),s=""+e.getDay(),o=e=>e.padStart(2,"0");return`${o(t)}/${o(n)}/${s}`}]}class Te extends de{constructor(e){super(),ue(this,e,Ee,Ce,a,{name:0,label:1,input_id:2,type:3,required:4,classes:5,checked:6,value:7,disabled:8})}}function Ie(e,t,n){const s=e.slice();return s[7]=t[n],s}function Ne(e){let t;const s=[e[7]];let o={};for(let e=0;e<s.length;e+=1)o=n(o,s[e]);const r=new Te({props:o});return{c(){ae(r.$$.fragment)},m(e,n){le(r,e,n),t=!0},p(e,t){const n=4&t?re(s,[ie(e[7])]):{};r.$set(n)},i(e){t||(te(r.$$.fragment,e),t=!0)},o(e){ne(r.$$.fragment,e),t=!1},d(e){ce(r,e)}}}function je(e){let t,n,s,o,r="sub_start"===e[0]&&qe(e);return{c(){t=b("div"),n=b("p"),s=v(e[3]),o=w(),r&&r.c(),S(t,"class","fieldset-comment")},m(e,i){g(e,t,i),h(t,n),h(n,s),h(t,o),r&&r.m(t,null)},p(e,n){8&n&&C(s,e[3]),"sub_start"===e[0]?r?r.p(e,n):(r=qe(e),r.c(),r.m(t,null)):r&&(r.d(1),r=null)},d(e){e&&_(t),r&&r.d()}}}function qe(e){let t,n=e[4]&&Be();return{c(){n&&n.c(),t=k()},m(e,s){n&&n.m(e,s),g(e,t,s)},p(e,s){e[4]?n||(n=Be(),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(e){n&&n.d(e),e&&_(t)}}}function Be(e){let t;return{c(){t=b("p"),t.textContent="You can also choose a date on which your gift subscription will start. This is the day the recipient will be notified."},m(e,n){g(e,t,n)},d(e){e&&_(t)}}}function ze(e){let t,n,s,o,r,i,a;const c=e[6].default,u=function(e,t,n,s){if(e){const s=l(e,t,n,null);return e[0](s)}}(c,e,e[5]),d=u||function(e){let t,n,s=e[2],o=[];for(let t=0;t<s.length;t+=1)o[t]=Ne(Ie(e,s,t));const r=e=>ne(o[e],1,1,()=>{o[e]=null});return{c(){for(let e=0;e<o.length;e+=1)o[e].c();t=k()},m(e,s){for(let t=0;t<o.length;t+=1)o[t].m(e,s);g(e,t,s),n=!0},p(e,n){if(4&n){let i;for(s=e[2],i=0;i<s.length;i+=1){const r=Ie(e,s,i);o[i]?(o[i].p(r,n),te(o[i],1)):(o[i]=Ne(r),o[i].c(),te(o[i],1),o[i].m(t.parentNode,t))}for(Z(),i=s.length;i<o.length;i+=1)r(i);ee()}},i(e){if(!n){for(let e=0;e<s.length;e+=1)te(o[e]);n=!0}},o(e){o=o.filter(Boolean);for(let e=0;e<o.length;e+=1)ne(o[e]);n=!1},d(e){y(o,e),e&&_(t)}}}(e);let m=e[3]&&je(e);return{c(){t=b("fieldset"),n=b("legend"),s=v(e[1]),o=w(),r=b("div"),d&&d.c(),i=w(),m&&m.c(),S(r,"class","fieldset-inputs"),S(t,"id",e[0])},m(e,l){g(e,t,l),h(t,n),h(n,s),h(t,o),h(t,r),d&&d.m(r,null),h(t,i),m&&m.m(t,null),a=!0},p(e,[n]){(!a||2&n)&&C(s,e[1]),u?u.p&&32&n&&u.p(l(c,e,e[5],null),function(e,t,n,s){return e[2],t.dirty}(c,e[5])):d&&d.p&&4&n&&d.p(e,n),e[3]?m?m.p(e,n):(m=je(e),m.c(),m.m(t,null)):m&&(m.d(1),m=null),(!a||1&n)&&S(t,"id",e[0])},i(e){a||(te(d,e),a=!0)},o(e){ne(d,e),a=!1},d(e){e&&_(t),d&&d.d(e),m&&m.d()}}}function Ae(e,t,n){let{f_id:s}=t,{f_legend:o}=t,{inputs:r}=t,{comment:i}=t,{gift:a=!1}=t,{$$slots:l={},$$scope:c}=t;return e.$set=e=>{"f_id"in e&&n(0,s=e.f_id),"f_legend"in e&&n(1,o=e.f_legend),"inputs"in e&&n(2,r=e.inputs),"comment"in e&&n(3,i=e.comment),"gift"in e&&n(4,a=e.gift),"$$scope"in e&&n(5,c=e.$$scope)},[s,o,r,i,a,c,l]}class Me extends de{constructor(e){super(),ue(this,e,Ae,ze,a,{f_id:0,f_legend:1,inputs:2,comment:3,gift:4})}}const Oe=(e,t,n)=>{let s=t=>e.querySelector(t)?e.querySelector(t).value:null,o={first_name:s("#first_name"),last_name:s("#last_name"),email:s("#email"),address_line1:s("#address_line1"),address_line2:s("#address_line2"),address_city:s("#address_city"),address_country:s("#address_country"),address_postcode:s("#address_postcode"),issue:s('input[name="issue"]:checked'),book:s('input[name="book"]:checked'),delivery:s('input[name="delivery"]:checked'),anonymous:s('input[name="anon"]:checked'),patron_amount:s('input[name="patron_amount"]'),stripeToken:t?t.id:null,subscription_type:n,gift:s('input[name="gift"]:checked'),gifter_first_name:s("#gifter_first_name"),gifter_last_name:s("#gifter_last_name"),gifter_email:s("#gifter_email"),gift_date:s('input[name="gift_start_date"]')};return JSON.stringify(o)},Pe=async(e,t,n,s)=>{let o=await fetch(n,{method:"POST",body:Oe(e,t,s),headers:{Accept:"application/json","Content-Type":"application/json"}});return await o.json()};function We(t){let n,s,o,r,i,a,l,c,u,d,m,p,f,y,$;return{c(){n=b("fieldset"),s=b("legend"),s.textContent="How would you like to pay for it?",o=w(),r=b("label"),r.textContent="Your Card Details",i=w(),a=b("div"),l=w(),c=b("p"),c.textContent="We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.",u=w(),d=b("div"),m=w(),p=b("button"),p.textContent="Subscribe",f=w(),y=b("div"),y.innerHTML="<p>When you click &#39;subscribe&#39;, your card will be charged, and you will receive an email with the full details of your subscription, including how to access our online archive.</p>",S(r,"for","card-element"),S(r,"class","svelte-1ytjumv"),S(a,"id","card-element"),S(c,"class","stripe-info"),S(d,"id","card-errors"),S(p,"id","submit-button"),S(y,"class","fieldset-comment"),S(n,"id","sub_payment")},m(e,_,b){g(e,n,_),h(n,s),h(n,o),h(n,r),h(n,i),h(n,a),h(n,l),h(n,c),h(n,u),h(n,d),h(n,m),h(n,p),h(n,f),h(n,y),b&&$(),$=x(p,"click",t[1])},p:e,d(e){e&&_(n),$()}}}function Ye(t){let n,s,o,r,i,a,l,c,u,d,m;return{c(){n=b("fieldset"),s=b("legend"),s.textContent="Pay Now",o=w(),r=b("p"),r.textContent="We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.",i=w(),a=b("div"),l=w(),c=b("button"),c.textContent="Subscribe",u=w(),d=b("div"),d.innerHTML="<p>When you click &#39;subscribe&#39;, you will be redirected to a checkout screen, where you can enter your card details. Once everything is completed, you will receive an email with the full details of your patronage, including how to access our online archive.</p>",S(r,"class","stripe-info"),S(a,"id","card-errors"),S(c,"id","submit-button"),S(d,"class","fieldset-comment"),S(n,"id","checkout")},m(e,p,f){g(e,n,p),h(n,s),h(n,o),h(n,r),h(n,i),h(n,a),h(n,l),h(n,c),h(n,u),h(n,d),f&&m(),m=x(c,"click",t[1])},p:e,d(e){e&&_(n),m()}}}function Le(t){let n;function s(e,t){return"patron"===e[0]?Ye:We}let o=s(t),r=o(t);return{c(){r.c(),n=k()},m(e,t){r.m(e,t),g(e,n,t)},p(e,[t]){o===(o=s(e))&&r?r.p(e,t):(r.d(1),r=o(e),r&&(r.c(),r.m(n.parentNode,n)))},i:e,o:e,d(e){r.d(e),e&&_(n)}}}function Fe(e,t,n){let{subscription:s}=t;const o=O(),{url:r,pkey:i,endpoint:a}=(e=>{const t=window.location.hostname,n="patron"===e?"patrons":"subscribers";return{url:t,pkey:"stingingfly.org"===t?"pk_live_EPVd6u1amDegfDhpvbp57swa":"pk_test_0lhyoG9gxOmK5V15FobQbpUs",endpoint:"stingingfly.org"===t?"https://enigmatic-basin-09064.herokuapp.com/api/"+n:"http://localhost:8001/api/"+n}})(s),l=window.Stripe(i),c=l.elements().create("card",{style:{base:{color:"#32325d",fontFamily:'"Helvetica Neue", Helvetica, sans-serif',fontSmoothing:"antialiased",fontSize:"15px","::placeholder":{color:"#aab7c4"}},invalid:{color:"#fa755a",iconColor:"#fa755a"}}});return M(()=>{if("patron"!==s){c.mount("#card-element");let e=document.getElementById("card-errors");c.addEventListener("change",(function(t){t.error?e.textContent=t.error.message:e.textContent=""}))}}),e.$set=e=>{"subscription"in e&&n(0,s=e.subscription)},[s,e=>{let t=document.getElementById("card-errors");(async(e,t,n,s,o,r,i)=>{e.preventDefault();let a=document.getElementById("payment-form");var l={name:`${document.getElementById("first_name").value} ${document.getElementById("last_name").value}`,email:document.getElementById("email").value,address_line1:document.getElementById("address_line1").value,address_line2:document.getElementById("address_line2").value,address_city:document.getElementById("address_city").value,address_country:document.getElementById("address_country").value,address_zip:document.getElementById("address_postcode").value};if("patron"===s)try{let e=await Pe(a,null,o,s);e.success?i("success",{res:e}):i("failure",{res:e,card:null,stripe:n,errorElement:r})}catch(e){console.log(e)}else try{let e=await(async(e,t,n)=>{try{const s=await n.createToken(e,t);if(s.error)throw s.error.message;return s.token}catch(e){return console.log(e),e}})(t,l,n),c=await Pe(a,e,o,s);c.success?i("success",{res:c}):i("failure",{res:c,card:t,stripe:n,errorElement:r})}catch(e){console.log(e)}})(e,c,l,s,a,t,o),o("formSubmit",e)}]}class De extends de{constructor(e){super(),ue(this,e,Fe,Le,a,{subscription:0})}}function He(e){let t,n,s,o,r;return{c(){t=$("svg"),n=$("circle"),S(n,"role","presentation"),S(n,"cx","16"),S(n,"cy","16"),S(n,"r",e[4]),S(n,"stroke",e[2]),S(n,"fill","none"),S(n,"stroke-width",e[3]),S(n,"stroke-dasharray",s=e[5]+",100"),S(n,"stroke-linecap","round"),S(t,"height",e[0]),S(t,"width",e[0]),E(t,"--speed",e[1]+"ms"),S(t,"class","svelte-spinner svelte-1hr8yec"),S(t,"viewBox","0 0 32 32")},m(e,s){g(e,t,s),h(t,n),r=!0},p(e,[o]){(!r||16&o)&&S(n,"r",e[4]),(!r||4&o)&&S(n,"stroke",e[2]),(!r||8&o)&&S(n,"stroke-width",e[3]),(!r||32&o&&s!==(s=e[5]+",100"))&&S(n,"stroke-dasharray",s),(!r||1&o)&&S(t,"height",e[0]),(!r||1&o)&&S(t,"width",e[0]),(!r||2&o)&&E(t,"--speed",e[1]+"ms")},i(e){r||(H(()=>{o||(o=oe(t,$e,{},!0)),o.run(1)}),r=!0)},o(e){o||(o=oe(t,$e,{},!1)),o.run(0),r=!1},d(e){e&&_(t),e&&o&&o.end()}}}function Re(e,t,n){let s,{size:o=200}=t,{speed:r=750}=t,{color:i="rgba(0,0,0,0.4)"}=t,{thickness:a=2}=t,{gap:l=40}=t,{radius:c=10}=t;return e.$set=e=>{"size"in e&&n(0,o=e.size),"speed"in e&&n(1,r=e.speed),"color"in e&&n(2,i=e.color),"thickness"in e&&n(3,a=e.thickness),"gap"in e&&n(6,l=e.gap),"radius"in e&&n(4,c=e.radius)},e.$$.update=()=>{80&e.$$.dirty&&n(5,s=2*Math.PI*c*(100-l)/100)},[o,r,i,a,c,s,l]}class Ve extends de{constructor(e){super(),ue(this,e,Re,He,a,{size:0,speed:1,color:2,thickness:3,gap:6,radius:4})}}function Ge(e){let t,n,s,o,r,i,a,l,c,u,d,m="patron"!==e[0]&&Je(e);const p=new Me({props:{f_id:"sub_contact",f_legend:"Who should we send it to?",inputs:e[3].contact_inputs,comment:e[5].contact_comment}});let f=1==e[1]&&Qe(e);const y=new Me({props:{f_id:"sub_address",f_legend:"Where should we send it?",inputs:e[3].address_inputs,comment:e[5].address_comment[e[0]]}}),$=new Me({props:{f_id:"sub_start",f_legend:"When would you like the subscription to start?",inputs:e[3].start_inputs,comment:e[5].start_comment[e[0]],gift:e[1]}});let v="patron"===e[0]&&Ue(e);const x=new De({props:{subscription:e[0]}});x.$on("formSubmit",e[6]),x.$on("success",e[7]),x.$on("failure",e[8]);let C=e[2]&&et(),E=e[4].display&&tt(e);return{c(){t=b("form"),m&&m.c(),n=w(),ae(p.$$.fragment),s=w(),f&&f.c(),o=w(),ae(y.$$.fragment),r=w(),ae($.$$.fragment),i=w(),v&&v.c(),a=w(),ae(x.$$.fragment),l=w(),C&&C.c(),c=w(),E&&E.c(),u=k(),S(t,"action",""),S(t,"method","post"),S(t,"class","payment-form svelte-1yl1jhh"),S(t,"id","payment-form"),T(t,"closed",e[2])},m(e,_){g(e,t,_),m&&m.m(t,null),h(t,n),le(p,t,null),h(t,s),f&&f.m(t,null),h(t,o),le(y,t,null),h(t,r),le($,t,null),h(t,i),v&&v.m(t,null),h(t,a),le(x,t,null),g(e,l,_),C&&C.m(e,_),g(e,c,_),E&&E.m(e,_),g(e,u,_),d=!0},p(e,s){"patron"!==e[0]?m?(m.p(e,s),1&s&&te(m,1)):(m=Je(e),m.c(),te(m,1),m.m(t,n)):m&&(Z(),ne(m,1,1,()=>{m=null}),ee());const r={};8&s&&(r.inputs=e[3].contact_inputs),p.$set(r),1==e[1]?f?(f.p(e,s),2&s&&te(f,1)):(f=Qe(e),f.c(),te(f,1),f.m(t,o)):f&&(Z(),ne(f,1,1,()=>{f=null}),ee());const i={};8&s&&(i.inputs=e[3].address_inputs),1&s&&(i.comment=e[5].address_comment[e[0]]),y.$set(i);const l={};8&s&&(l.inputs=e[3].start_inputs),1&s&&(l.comment=e[5].start_comment[e[0]]),2&s&&(l.gift=e[1]),$.$set(l),"patron"===e[0]?v?1&s&&te(v,1):(v=Ue(e),v.c(),te(v,1),v.m(t,a)):v&&(Z(),ne(v,1,1,()=>{v=null}),ee());const d={};1&s&&(d.subscription=e[0]),x.$set(d),4&s&&T(t,"closed",e[2]),e[2]?C?4&s&&te(C,1):(C=et(),C.c(),te(C,1),C.m(c.parentNode,c)):C&&(Z(),ne(C,1,1,()=>{C=null}),ee()),e[4].display?E?(E.p(e,s),16&s&&te(E,1)):(E=tt(e),E.c(),te(E,1),E.m(u.parentNode,u)):E&&(Z(),ne(E,1,1,()=>{E=null}),ee())},i(e){d||(te(m),te(p.$$.fragment,e),te(f),te(y.$$.fragment,e),te($.$$.fragment,e),te(v),te(x.$$.fragment,e),te(C),te(E),d=!0)},o(e){ne(m),ne(p.$$.fragment,e),ne(f),ne(y.$$.fragment,e),ne($.$$.fragment,e),ne(v),ne(x.$$.fragment,e),ne(C),ne(E),d=!1},d(e){e&&_(t),m&&m.d(),ce(p),f&&f.d(),ce(y),ce($),v&&v.d(),ce(x),e&&_(l),C&&C.d(e),e&&_(c),E&&E.d(e),e&&_(u)}}}function Je(e){let t;const n=new Me({props:{f_id:"sub_gift_toggle",f_legend:"Is this subscription for you, or someone else?",$$slots:{default:[Ke]},$$scope:{ctx:e}}});return{c(){ae(n.$$.fragment)},m(e,s){le(n,e,s),t=!0},p(e,t){const s={};131074&t&&(s.$$scope={dirty:t,ctx:e}),n.$set(s)},i(e){t||(te(n.$$.fragment,e),t=!0)},o(e){ne(n.$$.fragment,e),t=!1},d(e){ce(n,e)}}}function Ke(e){let t,n,s,o,i,a,l,c,u,d;return{c(){t=b("input"),s=w(),o=b("label"),o.textContent="It's For Me",i=w(),a=b("input"),c=w(),u=b("label"),u.textContent="It's A Gift",S(t,"type","radio"),S(t,"name","gift"),S(t,"id","gift_no"),t.__value=n=!1,t.value=t.__value,t.checked=!0,e[13][0].push(t),S(o,"for","gift_no"),S(a,"type","radio"),S(a,"name","gift"),S(a,"id","gift_yes"),a.__value=l=!0,a.value=a.__value,e[13][0].push(a),S(u,"for","gift_yes")},m(n,l,m){g(n,t,l),t.checked=t.__value===e[1],g(n,s,l),g(n,o,l),g(n,i,l),g(n,a,l),a.checked=a.__value===e[1],g(n,c,l),g(n,u,l),m&&r(d),d=[x(t,"change",e[12]),x(a,"change",e[14])]},p(e,n){2&n&&(t.checked=t.__value===e[1]),2&n&&(a.checked=a.__value===e[1])},d(n){n&&_(t),e[13][0].splice(e[13][0].indexOf(t),1),n&&_(s),n&&_(o),n&&_(i),n&&_(a),e[13][0].splice(e[13][0].indexOf(a),1),n&&_(c),n&&_(u),r(d)}}}function Qe(e){let t;const n=new Me({props:{f_id:"sub_gifter",f_legend:"Your Contact Details",inputs:e[3].gifter_inputs,comment:e[5].gifter_comment}});return{c(){ae(n.$$.fragment)},m(e,s){le(n,e,s),t=!0},p(e,t){const s={};8&t&&(s.inputs=e[3].gifter_inputs),n.$set(s)},i(e){t||(te(n.$$.fragment,e),t=!0)},o(e){ne(n.$$.fragment,e),t=!1},d(e){ce(n,e)}}}function Ue(e){let t,n;const s=new Me({props:{f_id:"patron_set_amount",f_legend:"How much would you like to give?",$$slots:{default:[Xe]},$$scope:{ctx:e}}}),o=new Me({props:{f_id:"patron_anon_toggle",f_legend:"Would you like to be listed as a patron on our website?",$$slots:{default:[Ze]},$$scope:{ctx:e}}});return{c(){ae(s.$$.fragment),t=w(),ae(o.$$.fragment)},m(e,r){le(s,e,r),g(e,t,r),le(o,e,r),n=!0},i(e){n||(te(s.$$.fragment,e),te(o.$$.fragment,e),n=!0)},o(e){ne(s.$$.fragment,e),ne(o.$$.fragment,e),n=!1},d(e){ce(s,e),e&&_(t),ce(o,e)}}}function Xe(e){let t;return{c(){t=b("label"),t.innerHTML='<span class="label-title">Amount in Euro – Minimum €100</span> \n\t\t<input type="number" name="patron_amount" id="patron_amount" min="100" value="100">',S(t,"for","patron_amount")},m(e,n){g(e,t,n)},d(e){e&&_(t)}}}function Ze(e){let t,n,s,o,r,i,a;return{c(){t=b("input"),n=w(),s=b("label"),s.textContent="Yes, List My Name",o=w(),r=b("input"),i=w(),a=b("label"),a.textContent="No, Don't List My Name",S(t,"type","radio"),S(t,"name","anon"),S(t,"id","anon_yes"),t.value="true",t.checked=!0,S(s,"for","anon_yes"),S(r,"type","radio"),S(r,"name","anon"),S(r,"id","anon_no"),r.value="false",S(a,"for","anon_no")},m(e,l){g(e,t,l),g(e,n,l),g(e,s,l),g(e,o,l),g(e,r,l),g(e,i,l),g(e,a,l)},d(e){e&&_(t),e&&_(n),e&&_(s),e&&_(o),e&&_(r),e&&_(i),e&&_(a)}}}function et(e){let t;const n=new Ve({});return{c(){ae(n.$$.fragment)},m(e,s){le(n,e,s),t=!0},i(e){t||(te(n.$$.fragment,e),t=!0)},o(e){ne(n.$$.fragment,e),t=!1},d(e){ce(n,e)}}}function tt(e){let t,n,s,o,i,a,l,c,u,d,m,p,f,y,$,k,E=e[4].data.title+"",T=e[4].data.message+"",I=e[4].data.button_text+"";return{c(){t=b("div"),n=b("div"),s=w(),o=b("div"),i=b("h2"),a=v(E),l=w(),c=b("p"),u=v(T),d=w(),m=b("a"),p=v(I),S(n,"class","modal__underlay svelte-1yl1jhh"),S(i,"class","svelte-1yl1jhh"),S(c,"class","svelte-1yl1jhh"),S(m,"href",f=e[4].data.link),S(m,"class","svelte-1yl1jhh"),S(o,"class","modal__text svelte-1yl1jhh"),S(t,"class","modal svelte-1yl1jhh")},m(f,_,y){g(f,t,_),h(t,n),h(t,s),h(t,o),h(o,i),h(i,a),h(o,l),h(o,c),h(c,u),h(o,d),h(o,m),h(m,p),$=!0,y&&r(k),k=[x(n,"click",e[15]),x(m,"click",e[16])]},p(e,t){(!$||16&t)&&E!==(E=e[4].data.title+"")&&C(a,E),(!$||16&t)&&T!==(T=e[4].data.message+"")&&C(u,T),(!$||16&t)&&I!==(I=e[4].data.button_text+"")&&C(p,I),(!$||16&t&&f!==(f=e[4].data.link))&&S(m,"href",f)},i(e){$||(H(()=>{y||(y=oe(t,$e,{},!0)),y.run(1)}),$=!0)},o(e){y||(y=oe(t,$e,{},!1)),y.run(0),$=!1},d(e){e&&_(t),e&&y&&y.end(),r(k)}}}function nt(e){let t,n,s=e[0]&&Ge(e);return{c(){s&&s.c(),t=k()},m(e,o){s&&s.m(e,o),g(e,t,o),n=!0},p(e,[n]){e[0]?s?(s.p(e,n),1&n&&te(s,1)):(s=Ge(e),s.c(),te(s,1),s.m(t.parentNode,t)):s&&(Z(),ne(s,1,1,()=>{s=null}),ee())},i(e){n||(te(s),n=!0)},o(e){ne(s),n=!1},d(e){s&&s.d(e),e&&_(t)}}}function st(e,t,n){let{formType:s}=t,o=!1,r=!1;const i={current_number:document.querySelector(".meta").dataset.current,current_title:document.querySelector(".meta").dataset.title,next_issue_number:parseInt(document.querySelector(".meta").dataset.current)+1,next_issue_title:`Issue ${parseInt(document.querySelector(".meta").dataset.current)+1} / Volume 2`,current_book:"Modern Times by Cathy Sweeney (Available now)",next_book:"Trouble by Philip Ó Ceallaigh (Available Sept 2020)"};let a={contact_inputs:[{name:"first_name",label:"First Name",type:"text",required:!0,classes:"half-width"},{name:"last_name",label:"Last Name",type:"text",required:!0,classes:"half-width"},{name:"email",label:"Email",type:"text",required:!0,classes:"full-width"}],gifter_inputs:[{name:"gifter_first_name",label:"First Name",type:"text",required:!0,classes:"half-width"},{name:"gifter_last_name",label:"Last Name",type:"text",required:!0,classes:"half-width"},{name:"gifter_email",label:"Email",type:"text",required:!0,classes:"full-width"}],address_inputs:[{name:"address_line1",label:"Address Line 1",type:"text",required:!0,classes:"full-width"},{name:"address_line2",label:"Address Line 2",type:"text",required:!0,classes:"full-width"},{name:"address_city",label:"City",type:"text",classes:"third-width"},{name:"address_postcode",label:"Postcode",type:"text",classes:"third-width"},{name:"address_country",label:"Country",type:"text",classes:"third-width"},{name:"heading",type:"heading",label:"Select your delivery region"},{type:"radio",name:"delivery",input_id:"irl",value:"irl",checked:!0,label:"Ireland & Northern Ireland"},{type:"radio",name:"delivery",input_id:"row",value:"row",checked:!1,label:"Rest of the World"}],mag_inputs:[{type:"radio",input_id:"current_issue",name:"issue",value:i.current_number,disabled:!1,checked:!0,label:i.current_title},{type:"radio",input_id:"next_issue",name:"issue",value:i.next_issue_number,disabled:!1,checked:!1,label:i.next_issue_title}],book_inputs:[{type:"radio",input_id:"current_book",name:"book",value:i.current_book,disabled:!1,checked:!0,label:i.current_book},{type:"radio",input_id:"next_book",name:"book",value:i.next_book,disabled:!1,checked:!1,label:i.next_book}],start_inputs:[]},l={customer_exists:{title:"Something has gone wrong...",message:"It seems we already have a customer with that email address – are you trying to renew your subscription? Subscriptions renew automatically, so there's no need to resubscribe. If you believe there's a problem, contact us at web.stingingfly@gmail.com.",link:"#",button_text:"Try Again?"},unknown_error:{title:"Something has gone wrong...",message:"There's a problem somewhere, contact us at web.stingingfly@gmail.com.",link:"#",button_text:"Try Again?"},payment_failed:{title:"There's a problem with your card",message:"It seems your card has been declined for some reason. Please try another.",link:"#",button_text:"Try Again?"},success:{title:"Success!",message:"You have successfully subscribed to The Stinging Fly. You will receive a receipt and an email with your login details shortly. Happy reading!",link:"/",button_text:"Return To The Stinging Fly"}},c={display:!1,data:l.success};const u=(e,t,s)=>{t.redirectToCheckout({sessionId:e.id}).then((function(e){e.error?s.textContent=e.error.message:n(4,c.display=!0,c)}))};var d;return d=()=>{"patron"===s&&n(1,o=!1),n(3,a.start_inputs="magonly"===s?a.mag_inputs:"bookonly"===s?a.book_inputs:[...a.mag_inputs,...a.book_inputs],a),o&&n(3,a.start_inputs=[...a.start_inputs,{type:"date",label:"On what date should the gift subscription begin?",name:"gift_start_date"}],a)},A().$$.before_update.push(d),M(()=>fetch("https://enigmatic-basin-09064.herokuapp.com/wakeup")),e.$set=e=>{"formType"in e&&n(0,s=e.formType)},[s,o,r,a,c,{contact_comment:"The name and email address of the recipient",gifter_comment:"We’ll need your name and email address too, just so we can send you a receipt.",address_comment:{magonly:"This is the address where we’ll be sending the issues.",bookonly:"This is the address where we’ll be sending the books.",magbook:"This is the address where we’ll be sending the magazine issues and books during the year.",patron:"This is the address where we’ll be sending the magazine issues and books during the year."},start_comment:{magonly:"You can choose to have your subscription start with the current issue, or the next issue. Magazine subscriptions last for one year and include two issues of the magazine.",bookonly:"You can choose to have your subscription start with the current title, or the next one. Book subscriptions include two books as they are published.",magbook:"You can choose which issue and book you want your subscription to start with. Your subscription will last for one year and you will receive two issues of the magazine and two books.",patron:"You can choose which issue and book you want your patron's subscription to start with. We will then send you a copy of each new issue and book as it is published."}},e=>{n(2,r=!0)},e=>{n(2,r=!1),n(4,c.display=!0,c)},async e=>{let{res:t,card:s,stripe:o,errorElement:i}=e.detail;switch(n(2,r=!1),console.log({res:t}),t.message){case"Existing Customer":n(4,c.data=l.customer_exists,c),n(4,c.display=!0,c);break;case"payment_failed":n(4,c.data=l.payment_failed,c),n(4,c.display=!0,c);break;case"confirmation_needed":!async function(e,t,n,s,o){let r=await n.handleCardPayment(e,t);console.log({result:r}),r.error?s.textContent=r.error.message:o()}(t.data.client_secret,s,o,i,()=>n(4,c.display=!0,c));break;case"session_created":u(t.data,o);break;default:n(4,c.data=l.unknown_error,c),n(4,c.display=!0,c)}},i,l,u,function(){o=this.__value,n(1,o)},[[]],function(){o=this.__value,n(1,o)},()=>n(4,c.display=!1,c),()=>n(4,c.display=!1,c)]}class ot extends de{constructor(e){super(),ue(this,e,st,nt,a,{formType:0})}}function rt(e){let t,n,s;const o=new be({});o.$on("formSelect",e[1]);const r=new ot({props:{formType:e[0]}});return{c(){ae(o.$$.fragment),t=w(),n=b("div"),ae(r.$$.fragment),S(n,"id","subs-page__form"),S(n,"class","svelte-4bawas")},m(e,i){le(o,e,i),g(e,t,i),g(e,n,i),le(r,n,null),s=!0},p(e,[t]){const n={};1&t&&(n.formType=e[0]),r.$set(n)},i(e){s||(te(o.$$.fragment,e),te(r.$$.fragment,e),s=!0)},o(e){ne(o.$$.fragment,e),ne(r.$$.fragment,e),s=!1},d(e){ce(o,e),e&&_(t),e&&_(n),ce(r)}}}function it(e,t,n){let s=void 0;return[s,e=>n(0,s=e.detail)]}return new class extends de{constructor(e){super(),ue(this,e,it,rt,a,{})}}({target:document.querySelector("#svelte")})}();