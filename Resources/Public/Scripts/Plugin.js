(()=>{var Ae,x,tr,Tt,Y,Jt,rr,or,xt,Ke,Pe,nr,Et,Ct,St,ir,Ye={},Je=[],jo=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,et=Array.isArray;function G(e,t){for(var r in t)e[r]=t[r];return e}function Nt(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function oe(e,t,r){var o,i,n,a={};for(n in t)n=="key"?o=t[n]:n=="ref"?i=t[n]:a[n]=t[n];if(arguments.length>2&&(a.children=arguments.length>3?Ae.call(arguments,2):r),typeof e=="function"&&e.defaultProps!=null)for(n in e.defaultProps)a[n]===void 0&&(a[n]=e.defaultProps[n]);return Oe(e,a,o,i,null)}function Oe(e,t,r,o,i){var n={type:e,props:t,key:r,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++tr,__i:-1,__u:0};return i==null&&x.vnode!=null&&x.vnode(n),n}function D(e){return e.children}function J(e,t){this.props=e,this.context=t}function pe(e,t){if(t==null)return e.__?pe(e.__,e.__i+1):null;for(var r;t<e.__k.length;t++)if((r=e.__k[t])!=null&&r.__e!=null)return r.__e;return typeof e.type=="function"?pe(e):null}function qo(e){if(e.__P&&e.__d){var t=e.__v,r=t.__e,o=[],i=[],n=G({},t);n.__v=t.__v+1,x.vnode&&x.vnode(n),Mt(e.__P,n,t,e.__n,e.__P.namespaceURI,32&t.__u?[r]:null,o,r??pe(t),!!(32&t.__u),i),n.__v=t.__v,n.__.__k[n.__i]=n,ur(o,n,i),t.__e=t.__=null,n.__e!=r&&sr(n)}}function sr(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),sr(e)}function kt(e){(!e.__d&&(e.__d=!0)&&Y.push(e)&&!Xe.__r++||Jt!=x.debounceRendering)&&((Jt=x.debounceRendering)||rr)(Xe)}function Xe(){try{for(var e,t=1;Y.length;)Y.length>t&&Y.sort(or),e=Y.shift(),t=Y.length,qo(e)}finally{Y.length=Xe.__r=0}}function ar(e,t,r,o,i,n,a,c,f,l,p){var d,u,h,g,y,w,v,_=o&&o.__k||Je,k=t.length;for(f=Go(r,t,_,f,k),d=0;d<k;d++)(h=r.__k[d])!=null&&(u=h.__i!=-1&&_[h.__i]||Ye,h.__i=d,w=Mt(e,h,u,i,n,a,c,f,l,p),g=h.__e,h.ref&&u.ref!=h.ref&&(u.ref&&Pt(u.ref,null,h),p.push(h.ref,h.__c||g,h)),y==null&&g!=null&&(y=g),(v=!!(4&h.__u))||u.__k===h.__k?(f=cr(h,f,e,v),v&&u.__e&&(u.__e=null)):typeof h.type=="function"&&w!==void 0?f=w:g&&(f=g.nextSibling),h.__u&=-7);return r.__e=y,f}function Go(e,t,r,o,i){var n,a,c,f,l,p=r.length,d=p,u=0;for(e.__k=new Array(i),n=0;n<i;n++)(a=t[n])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=e.__k[n]=Oe(null,a,null,null,null):et(a)?a=e.__k[n]=Oe(D,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=e.__k[n]=Oe(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[n]=a,f=n+u,a.__=e,a.__b=e.__b+1,c=null,(l=a.__i=Zo(a,r,f,d))!=-1&&(d--,(c=r[l])&&(c.__u|=2)),c==null||c.__v==null?(l==-1&&(i>p?u--:i<p&&u++),typeof a.type!="function"&&(a.__u|=4)):l!=f&&(l==f-1?u--:l==f+1?u++:(l>f?u--:u++,a.__u|=4))):e.__k[n]=null;if(d)for(n=0;n<p;n++)(c=r[n])!=null&&(2&c.__u)==0&&(c.__e==o&&(o=pe(c)),pr(c,c));return o}function cr(e,t,r,o){var i,n;if(typeof e.type=="function"){for(i=e.__k,n=0;i&&n<i.length;n++)i[n]&&(i[n].__=e,t=cr(i[n],t,r,o));return t}e.__e!=t&&(o&&(t&&e.type&&!t.parentNode&&(t=pe(e)),r.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Zo(e,t,r,o){var i,n,a,c=e.key,f=e.type,l=t[r],p=l!=null&&(2&l.__u)==0;if(l===null&&c==null||p&&c==l.key&&f==l.type)return r;if(o>(p?1:0)){for(i=r-1,n=r+1;i>=0||n<t.length;)if((l=t[a=i>=0?i--:n++])!=null&&(2&l.__u)==0&&c==l.key&&f==l.type)return a}return-1}function Xt(e,t,r){t[0]=="-"?e.setProperty(t,r??""):e[t]=r==null?"":typeof r!="number"||jo.test(t)?r:r+"px"}function Ze(e,t,r,o,i){var n,a;e:if(t=="style")if(typeof r=="string")e.style.cssText=r;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)r&&t in r||Xt(e.style,t,"");if(r)for(t in r)o&&r[t]==o[t]||Xt(e.style,t,r[t])}else if(t[0]=="o"&&t[1]=="n")n=t!=(t=t.replace(nr,"$1")),a=t.toLowerCase(),t=a in e||t=="onFocusOut"||t=="onFocusIn"?a.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+n]=r,r?o?r[Pe]=o[Pe]:(r[Pe]=Et,e.addEventListener(t,n?St:Ct,n)):e.removeEventListener(t,n?St:Ct,n);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=r??"";break e}catch{}typeof r=="function"||(r==null||r===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&r==1?"":r))}}function er(e){return function(t){if(this.l){var r=this.l[t.type+e];if(t[Ke]==null)t[Ke]=Et++;else if(t[Ke]<r[Pe])return;return r(x.event?x.event(t):t)}}}function Mt(e,t,r,o,i,n,a,c,f,l){var p,d,u,h,g,y,w,v,_,k,j,$,R,S,Ge,wt,q=t.type;if(t.constructor!==void 0)return null;128&r.__u&&(f=!!(32&r.__u),n=[c=t.__e=r.__e]),(p=x.__b)&&p(t);e:if(typeof q=="function"){d=a.length;try{if(_=t.props,k=q.prototype&&q.prototype.render,j=(p=q.contextType)&&o[p.__c],$=p?j?j.props.value:p.__:o,r.__c?v=(u=t.__c=r.__c).__=u.__E:(k?t.__c=u=new q(_,$):(t.__c=u=new J(_,$),u.constructor=q,u.render=Yo),j&&j.sub(u),u.state||(u.state={}),u.__n=o,h=u.__d=!0,u.__h=[],u._sb=[]),k&&u.__s==null&&(u.__s=u.state),k&&q.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=G({},u.__s)),G(u.__s,q.getDerivedStateFromProps(_,u.__s))),g=u.props,y=u.state,u.__v=t,h)k&&q.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),k&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(k&&q.getDerivedStateFromProps==null&&_!==g&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(_,$),t.__v==r.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(_,u.__s,$)===!1){t.__v!=r.__v&&(u.props=_,u.state=u.__s,u.__d=!1),t.__e=r.__e,t.__k=r.__k,t.__k.some(function(fe){fe&&(fe.__=t)}),Je.push.apply(u.__h,u._sb),u._sb=[],u.__h.length&&a.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(_,u.__s,$),k&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(g,y,w)})}if(u.context=$,u.props=_,u.__P=e,u.__e=!1,R=x.__r,S=0,k)u.state=u.__s,u.__d=!1,R&&R(t),p=u.render(u.props,u.state,u.context),Je.push.apply(u.__h,u._sb),u._sb=[];else do u.__d=!1,R&&R(t),p=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++S<25);u.state=u.__s,u.getChildContext!=null&&(o=G(G({},o),u.getChildContext())),k&&!h&&u.getSnapshotBeforeUpdate!=null&&(w=u.getSnapshotBeforeUpdate(g,y)),Ge=p!=null&&p.type===D&&p.key==null?fr(p.props.children):p,c=ar(e,et(Ge)?Ge:[Ge],t,r,o,i,n,a,c,f,l),u.base=t.__e,t.__u&=-161,u.__h.length&&a.push(u),v&&(u.__E=u.__=null)}catch(fe){if(a.length=d,t.__v=null,f||n!=null){if(fe.then){for(t.__u|=f?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;n!=null&&(n[n.indexOf(c)]=null),t.__e=c}else if(n!=null)for(wt=n.length;wt--;)Nt(n[wt])}else t.__e=r.__e;t.__k==null&&(t.__k=r.__k||[]),fe.then||lr(t),x.__e(fe,t,r)}}else n==null&&t.__v==r.__v?(t.__k=r.__k,t.__e=r.__e):c=t.__e=Ko(r.__e,t,r,o,i,n,a,f,l);return(p=x.diffed)&&p(t),128&t.__u?void 0:c}function lr(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(lr))}function ur(e,t,r){for(var o=0;o<r.length;o++)Pt(r[o],r[++o],r[++o]);x.__c&&x.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(n){n.call(i)})}catch(n){x.__e(n,i.__v)}})}function fr(e){return typeof e!="object"||e==null||e.__b>0?e:et(e)?e.map(fr):e.constructor!==void 0?null:G({},e)}function Ko(e,t,r,o,i,n,a,c,f){var l,p,d,u,h,g,y,w=r.props||Ye,v=t.props,_=t.type;if(_=="svg"?i="http://www.w3.org/2000/svg":_=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),n!=null){for(l=0;l<n.length;l++)if((h=n[l])&&"setAttribute"in h==!!_&&(_?h.localName==_:h.nodeType==3)){e=h,n[l]=null;break}}if(e==null){if(_==null)return document.createTextNode(v);e=document.createElementNS(i,_,v.is&&v),c&&(x.__m&&x.__m(t,n),c=!1),n=null}if(_==null)w===v||c&&e.data==v||(e.data=v);else{if(n=_=="textarea"&&v.defaultValue!=null?null:n&&Ae.call(e.childNodes),!c&&n!=null)for(w={},l=0;l<e.attributes.length;l++)w[(h=e.attributes[l]).name]=h.value;for(l in w)h=w[l],l=="dangerouslySetInnerHTML"?d=h:l=="children"||l in v||l=="value"&&"defaultValue"in v||l=="checked"&&"defaultChecked"in v||Ze(e,l,null,h,i);for(l in v)h=v[l],l=="children"?u=h:l=="dangerouslySetInnerHTML"?p=h:l=="value"?g=h:l=="checked"?y=h:c&&typeof h!="function"||w[l]===h||Ze(e,l,h,w[l],i);if(p)c||d&&(p.__html==d.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(d&&(e.innerHTML=""),ar(t.type=="template"?e.content:e,et(u)?u:[u],t,r,o,_=="foreignObject"?"http://www.w3.org/1999/xhtml":i,n,a,n?n[0]:r.__k&&pe(r,0),c,f),n!=null)for(l=n.length;l--;)Nt(n[l]);c&&_!="textarea"||(l="value",_=="progress"&&g==null?e.removeAttribute("value"):g!=null&&(g!==e[l]||_=="progress"&&!g||_=="option"&&g!=w[l])&&Ze(e,l,g,w[l],i),l="checked",y!=null&&y!=e[l]&&Ze(e,l,y,w[l],i))}return e}function Pt(e,t,r){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&t==null||(e.__u=e(t))}else e.current=t}catch(i){x.__e(i,r)}}function pr(e,t,r){var o,i;if(x.unmount&&x.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||Pt(o,null,t)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(n){x.__e(n,t)}o.base=o.__P=o.__n=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&pr(o[i],t,r||typeof e.type!="function");r||Nt(e.__e),e.__c=e.__=e.__e=void 0}function Yo(e,t,r){return this.constructor(e,r)}function De(e,t,r){var o,i,n,a;t==document&&(t=document.documentElement),x.__&&x.__(e,t),i=(o=typeof r=="function")?null:r&&r.__k||t.__k,n=[],a=[],Mt(t,e=(!o&&r||t).__k=oe(D,null,[e]),i||Ye,Ye,t.namespaceURI,!o&&r?[r]:i?null:t.firstChild?Ae.call(t.childNodes):null,n,!o&&r?r:i?i.__e:t.firstChild,o,a),ur(n,e,a),e.props.children=null}function Ot(e,t){De(e,t,Ot)}function At(e,t,r){var o,i,n,a,c=G({},e.props);for(n in e.type&&e.type.defaultProps&&(a=e.type.defaultProps),t)n=="key"?o=t[n]:n=="ref"?i=t[n]:c[n]=t[n]===void 0&&a!=null?a[n]:t[n];return arguments.length>2&&(c.children=arguments.length>3?Ae.call(arguments,2):r),Oe(e.type,c,o||e.key,i||e.ref,null)}function dr(e){function t(r){var o,i;return this.getChildContext||(o=new Set,(i={})[t.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){o=null},this.shouldComponentUpdate=function(n){this.props.value!=n.value&&o.forEach(function(a){a.__e=!0,kt(a)})},this.sub=function(n){o.add(n);var a=n.componentWillUnmount;n.componentWillUnmount=function(){o&&o.delete(n),a&&a.call(n)}}),r.children}return t.__c="__cC"+ir++,t.__=e,t.Provider=t.__l=(t.Consumer=function(r,o){return r.children(o)}).contextType=t,t}Ae=Je.slice,x={__e:function(e,t,r,o){for(var i,n,a;t=t.__;)if((i=t.__c)&&!i.__)try{if((n=i.constructor)&&n.getDerivedStateFromError!=null&&(i.setState(n.getDerivedStateFromError(e)),a=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,o||{}),a=i.__d),a)return i.__E=i}catch(c){e=c}throw e}},tr=0,Tt=function(e){return e!=null&&e.constructor===void 0},J.prototype.setState=function(e,t){var r;r=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=G({},this.state),typeof e=="function"&&(e=e(G({},r),this.props)),e&&G(r,e),e!=null&&this.__v&&(t&&this._sb.push(t),kt(this))},J.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),kt(this))},J.prototype.render=D,Y=[],rr=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,or=function(e,t){return e.__v.__b-t.__v.__b},Xe.__r=0,xt=Math.random().toString(8),Ke="__d"+xt,Pe="__a"+xt,nr=/(PointerCapture)$|Capture$/i,Et=0,Ct=er(!1),St=er(!0),ir=0;function tt(){return tt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},tt.apply(this,arguments)}function mr(e,t){if(e==null)return{};var r,o,i={},n=Object.keys(e);for(o=0;o<n.length;o++)t.indexOf(r=n[o])>=0||(i[r]=e[r]);return i}var Jo=["context","children"],Xo=["useFragment"];function _r(e,t,r,o){function i(){var n,a=Reflect.construct(HTMLElement,[],i);return a._vdomComponent=e,o&&o.shadow?(a._root=a.attachShadow({mode:o.mode||"open",serializable:(n=o.serializable)!=null&&n}),o.adoptedStyleSheets&&(a._root.adoptedStyleSheets=o.adoptedStyleSheets)):a._root=a,a}return(i.prototype=Object.create(HTMLElement.prototype)).constructor=i,i.prototype.connectedCallback=function(){tn.call(this,o)},i.prototype.attributeChangedCallback=rn,i.prototype.disconnectedCallback=on,r=r||e.observedAttributes||Object.keys(e.propTypes||{}),i.observedAttributes=r,e.formAssociated&&(i.formAssociated=!0),r.forEach(function(n){Object.defineProperty(i.prototype,n,{get:function(){return this._vdom?this._vdom.props[n]:this._props[n]},set:function(a){this._vdom?this.attributeChangedCallback(n,null,a):(this._props||(this._props={}),this._props[n]=a);var c=typeof a;a!=null&&c!=="string"&&c!=="boolean"&&c!=="number"||this.setAttribute(n,a)}})}),customElements.define(t||e.tagName||e.displayName||e.name,i),i}function en(e){this.getChildContext=function(){return e.context};var t=e.children,r=mr(e,Jo);return At(t,r)}function tn(e){var t=new CustomEvent("_preact",{detail:{},bubbles:!0,cancelable:!0});this.dispatchEvent(t),this._vdom=oe(en,tt({},this._props,{context:t.detail.context}),gr(this,this._vdomComponent,e)),(this.hasAttribute("hydrate")?Ot:De)(this._vdom,this._root)}function vr(e){return e.replace(/-(\w)/g,function(t,r){return r?r.toUpperCase():""})}function rn(e,t,r){if(this._vdom){var o={};o[e]=r=r??void 0,o[vr(e)]=r,this._vdom=At(this._vdom,o),De(this._vdom,this._root)}}function on(){De(this._vdom=null,this._root)}function hr(e,t){var r=this,o=e.useFragment,i=mr(e,Xo);return oe(o?D:"slot",tt({},i,{ref:function(n){n?(r.ref=n,r._listener||(r._listener=function(a){a.stopPropagation(),a.detail.context=t},n.addEventListener("_preact",r._listener))):r.ref.removeEventListener("_preact",r._listener)}}))}function gr(e,t,r){if(e.nodeType===3)return e.data;if(e.nodeType!==1)return null;var o=[],i={},n=0,a=e.attributes,c=e.childNodes;for(n=a.length;n--;)a[n].name!=="slot"&&(i[a[n].name]=a[n].value,i[vr(a[n].name)]=a[n].value);for(n=c.length;n--;){var f=gr(c[n],null,r),l=c[n].slot;l?i[l]=oe(hr,{name:l},f):o[n]=f}var p=!(!r||!r.shadow),d=t?oe(hr,{useFragment:!p},o):o;return!p&&t&&(e.innerHTML=""),oe(t||e.nodeName.toLowerCase(),i,d)}var de,E,Dt,yr,Fe=0,Er=[],P=x,br=P.__b,wr=P.__r,xr=P.diffed,Cr=P.__c,Sr=P.unmount,kr=P.__;function ot(e,t){P.__h&&P.__h(E,e,Fe||t),Fe=0;var r=E.__H||(E.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function L(e){return Fe=1,nn(Or,e)}function nn(e,t,r){var o=ot(de++,2);if(o.t=e,!o.__c&&(o.__=[r?r(t):Or(void 0,t),function(c){var f=o.__N?o.__N[0]:o.__[0],l=o.t(f,c);f!==l&&(o.__N=[l,o.__[1]],o.__c.setState({}))}],o.__c=E,!E.__f)){var i=function(c,f,l){if(!o.__c.__H)return!0;var p=!1,d=o.__c.props!==c;if(o.__c.__H.__.some(function(h){if(h.__N){p=!0;var g=h.__[0];h.__=h.__N,h.__N=void 0,g!==h.__[0]&&(d=!0)}}),n){var u=n.call(this,c,f,l);return p?u||d:u}return!p||d};E.__f=!0;var n=E.shouldComponentUpdate,a=E.componentWillUpdate;E.componentWillUpdate=function(c,f,l){if(this.__e){var p=n;n=void 0,i(c,f,l),n=p}a&&a.call(this,c,f,l)},E.shouldComponentUpdate=i}return o.__N||o.__}function ne(e,t){var r=ot(de++,3);!P.__s&&Pr(r.__H,t)&&(r.__=e,r.u=t,E.__H.__h.push(r))}function Nr(e){return Fe=5,he(function(){return{current:e}},[])}function he(e,t){var r=ot(de++,7);return Pr(r.__H,t)&&(r.__=e(),r.__H=t,r.__h=e),r.__}function K(e,t){return Fe=8,he(function(){return e},t)}function Mr(e){var t=E.context[e.__c],r=ot(de++,9);return r.c=e,t?(r.__==null&&(r.__=!0,t.sub(E)),t.props.value):e.__}function sn(){for(var e;e=Er.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(rt),t.__h.some(Ft),t.__h=[]}catch(r){t.__h=[],P.__e(r,e.__v)}}}P.__b=function(e){E=null,br&&br(e)},P.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),kr&&kr(e,t)},P.__r=function(e){wr&&wr(e),de=0;var t=(E=e.__c).__H;t&&(Dt===E?(t.__h=[],E.__h=[],t.__.some(function(r){r.__N&&(r.__=r.__N),r.u=r.__N=void 0})):(t.__h.some(rt),t.__h.some(Ft),t.__h=[],de=0)),Dt=E},P.diffed=function(e){xr&&xr(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Er.push(t)!==1&&yr===P.requestAnimationFrame||((yr=P.requestAnimationFrame)||an)(sn)),t.__H.__.some(function(r){r.u&&(r.__H=r.u,r.u=void 0)})),Dt=E=null},P.__c=function(e,t){t.some(function(r){try{r.__h.some(rt),r.__h=r.__h.filter(function(o){return!o.__||Ft(o)})}catch(o){t.some(function(i){i.__h&&(i.__h=[])}),t=[],P.__e(o,r.__v)}}),Cr&&Cr(e,t)},P.unmount=function(e){Sr&&Sr(e);var t,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{rt(o)}catch(i){t=i}}),r.__H=void 0,t&&P.__e(t,r.__v))};var Tr=typeof requestAnimationFrame=="function";function an(e){var t,r=function(){clearTimeout(o),Tr&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(r,35);Tr&&(t=requestAnimationFrame(r))}function rt(e){var t=E,r=e.__c;typeof r=="function"&&(e.__c=void 0,r()),E=t}function Ft(e){var t=E;e.__c=e.__(),E=t}function Pr(e,t){return!e||e.length!==t.length||t.some(function(r,o){return r!==e[o]})}function Or(e,t){return typeof t=="function"?t(e):t}var cn=0;function s(e,t,r,o,i,n){t||(t={});var a,c,f=t;if("ref"in f)for(c in f={},t)c=="ref"?a=t[c]:f[c]=t[c];var l={type:e,props:f,key:r,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--cn,__i:-1,__u:0,__source:i,__self:n};if(typeof e=="function"&&(a=e.defaultProps))for(c in a)f[c]===void 0&&(f[c]=a[c]);return x.vnode&&x.vnode(l),l}var Ar=dr({}),W=()=>Mr(Ar),Dr=({debugInfos:e,cacheInfos:t,closeApp:r,children:o})=>s(Ar.Provider,{value:{debugInfos:e,cacheInfos:t,closeApp:r},children:o});var ln=!1;function un(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function fn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Fr=(function(){function e(r){var o=this;this._insertTag=function(i){var n;o.tags.length===0?o.insertionPoint?n=o.insertionPoint.nextSibling:o.prepend?n=o.container.firstChild:n=o.before:n=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(i,n),o.tags.push(i)},this.isSpeedy=r.speedy===void 0?!ln:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(fn(this));var i=this.tags[this.tags.length-1];if(this.isSpeedy){var n=un(i);try{n.insertRule(o,n.cssRules.length)}catch{}}else i.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){var i;return(i=o.parentNode)==null?void 0:i.removeChild(o)}),this.tags=[],this.ctr=0},e})();var F="-ms-",Ie="-moz-",C="-webkit-",nt="comm",me="rule",_e="decl";var Ir="@import";var it="@keyframes";var Rr="@layer";var $r=Math.abs,ie=String.fromCharCode,Lr=Object.assign;function Hr(e,t){return M(e,0)^45?(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3):0}function st(e){return e.trim()}function It(e,t){return(e=t.exec(e))?e[0]:e}function b(e,t,r){return e.replace(t,r)}function Re(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function X(e,t,r){return e.slice(t,r)}function H(e){return e.length}function ve(e){return e.length}function ge(e,t){return t.push(e),e}function Rt(e,t){return e.map(t).join("")}var at=1,ye=1,Br=0,B=0,O=0,we="";function $e(e,t,r,o,i,n,a){return{value:e,root:t,parent:r,type:o,props:i,children:n,line:at,column:ye,length:a,return:""}}function xe(e,t){return Lr($e("",null,null,"",null,null,0),e,{length:-e.length},t)}function zr(){return O}function Ur(){return O=B>0?M(we,--B):0,ye--,O===10&&(ye=1,at--),O}function z(){return O=B<Br?M(we,B++):0,ye++,O===10&&(ye=1,at++),O}function Q(){return M(we,B)}function Le(){return B}function Ce(e,t){return X(we,e,t)}function be(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ct(e){return at=ye=1,Br=H(we=e),B=0,[]}function lt(e){return we="",e}function Se(e){return st(Ce(B-1,$t(e===91?e+2:e===40?e+1:e)))}function Wr(e){for(;(O=Q())&&O<33;)z();return be(e)>2||be(O)>3?"":" "}function Qr(e,t){for(;--t&&z()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return Ce(e,Le()+(t<6&&Q()==32&&z()==32))}function $t(e){for(;z();)switch(O){case e:return B;case 34:case 39:e!==34&&e!==39&&$t(O);break;case 40:e===41&&$t(e);break;case 92:z();break}return B}function Vr(e,t){for(;z()&&e+O!==57;)if(e+O===84&&Q()===47)break;return"/*"+Ce(t,B-1)+"*"+ie(e===47?e:z())}function jr(e){for(;!be(Q());)z();return Ce(e,B)}function Zr(e){return lt(ut("",null,null,null,[""],e=ct(e),0,[0],e))}function ut(e,t,r,o,i,n,a,c,f){for(var l=0,p=0,d=a,u=0,h=0,g=0,y=1,w=1,v=1,_=0,k="",j=i,$=n,R=o,S=k;w;)switch(g=_,_=z()){case 40:if(g!=108&&M(S,d-1)==58){Re(S+=b(Se(_),"&","&\f"),"&\f")!=-1&&(v=-1);break}case 34:case 39:case 91:S+=Se(_);break;case 9:case 10:case 13:case 32:S+=Wr(g);break;case 92:S+=Qr(Le()-1,7);continue;case 47:switch(Q()){case 42:case 47:ge(pn(Vr(z(),Le()),t,r),f);break;default:S+="/"}break;case 123*y:c[l++]=H(S)*v;case 125*y:case 59:case 0:switch(_){case 0:case 125:w=0;case 59+p:v==-1&&(S=b(S,/\f/g,"")),h>0&&H(S)-d&&ge(h>32?Gr(S+";",o,r,d-1):Gr(b(S," ","")+";",o,r,d-2),f);break;case 59:S+=";";default:if(ge(R=qr(S,t,r,l,p,i,c,k,j=[],$=[],d),n),_===123)if(p===0)ut(S,t,R,R,j,n,d,c,$);else switch(u===99&&M(S,3)===110?100:u){case 100:case 108:case 109:case 115:ut(e,R,R,o&&ge(qr(e,R,R,0,0,i,c,k,i,j=[],d),$),i,$,d,c,o?j:$);break;default:ut(S,R,R,R,[""],$,0,c,$)}}l=p=h=0,y=v=1,k=S="",d=a;break;case 58:d=1+H(S),h=g;default:if(y<1){if(_==123)--y;else if(_==125&&y++==0&&Ur()==125)continue}switch(S+=ie(_),_*y){case 38:v=p>0?1:(S+="\f",-1);break;case 44:c[l++]=(H(S)-1)*v,v=1;break;case 64:Q()===45&&(S+=Se(z())),u=Q(),p=d=H(k=S+=jr(Le())),_++;break;case 45:g===45&&H(S)==2&&(y=0)}}return n}function qr(e,t,r,o,i,n,a,c,f,l,p){for(var d=i-1,u=i===0?n:[""],h=ve(u),g=0,y=0,w=0;g<o;++g)for(var v=0,_=X(e,d+1,d=$r(y=a[g])),k=e;v<h;++v)(k=st(y>0?u[v]+" "+_:b(_,/&\f/g,u[v])))&&(f[w++]=k);return $e(e,t,r,i===0?me:c,f,l,p)}function pn(e,t,r){return $e(e,t,r,nt,ie(zr()),X(e,2,-2),0)}function Gr(e,t,r,o){return $e(e,t,r,_e,X(e,0,o),X(e,o+1,-1),o)}function se(e,t){for(var r="",o=ve(e),i=0;i<o;i++)r+=t(e[i],i,e,t)||"";return r}function Kr(e,t,r,o){switch(e.type){case Rr:if(e.children.length)break;case Ir:case _e:return e.return=e.return||e.value;case nt:return"";case it:return e.return=e.value+"{"+se(e.children,o)+"}";case me:e.value=e.props.join(",")}return H(r=se(e.children,o))?e.return=e.value+"{"+r+"}":""}function Yr(e){var t=ve(e);return function(r,o,i,n){for(var a="",c=0;c<t;c++)a+=e[c](r,o,i,n)||"";return a}}function Jr(e){return function(t){t.root||(t=t.return)&&e(t)}}function Xr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var dn=function(t,r,o){for(var i=0,n=0;i=n,n=Q(),i===38&&n===12&&(r[o]=1),!be(n);)z();return Ce(t,B)},hn=function(t,r){var o=-1,i=44;do switch(be(i)){case 0:i===38&&Q()===12&&(r[o]=1),t[o]+=dn(B-1,r,o);break;case 2:t[o]+=Se(i);break;case 4:if(i===44){t[++o]=Q()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=ie(i)}while(i=z());return t},mn=function(t,r){return lt(hn(ct(t),r))},eo=new WeakMap,_n=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,i=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!eo.get(o))&&!i){eo.set(t,!0);for(var n=[],a=mn(r,n),c=o.props,f=0,l=0;f<a.length;f++)for(var p=0;p<c.length;p++,l++)t.props[l]=n[f]?a[f].replace(/&\f/g,c[p]):c[p]+" "+a[f]}}},vn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function to(e,t){switch(Hr(e,t)){case 5103:return C+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return C+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return C+e+Ie+e+F+e+e;case 6828:case 4268:return C+e+F+e+e;case 6165:return C+e+F+"flex-"+e+e;case 5187:return C+e+b(e,/(\w+).+(:[^]+)/,C+"box-$1$2"+F+"flex-$1$2")+e;case 5443:return C+e+F+"flex-item-"+b(e,/flex-|-self/,"")+e;case 4675:return C+e+F+"flex-line-pack"+b(e,/align-content|flex-|-self/,"")+e;case 5548:return C+e+F+b(e,"shrink","negative")+e;case 5292:return C+e+F+b(e,"basis","preferred-size")+e;case 6060:return C+"box-"+b(e,"-grow","")+C+e+F+b(e,"grow","positive")+e;case 4554:return C+b(e,/([^-])(transform)/g,"$1"+C+"$2")+e;case 6187:return b(b(b(e,/(zoom-|grab)/,C+"$1"),/(image-set)/,C+"$1"),e,"")+e;case 5495:case 3959:return b(e,/(image-set\([^]*)/,C+"$1$`$1");case 4968:return b(b(e,/(.+:)(flex-)?(.*)/,C+"box-pack:$3"+F+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+C+e+e;case 4095:case 3583:case 4068:case 2532:return b(e,/(.+)-inline(.+)/,C+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(H(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return b(e,/(.+:)(.+)-([^]+)/,"$1"+C+"$2-$3$1"+Ie+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Re(e,"stretch")?to(b(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,H(e)-3-(~Re(e,"!important")&&10))){case 107:return b(e,":",":"+C)+e;case 101:return b(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+C+(M(e,14)===45?"inline-":"")+"box$3$1"+C+"$2$3$1"+F+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return C+e+F+b(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return C+e+F+b(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return C+e+F+b(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return C+e+F+e+e}return e}var gn=function(t,r,o,i){if(t.length>-1&&!t.return)switch(t.type){case _e:t.return=to(t.value,t.length);break;case it:return se([xe(t,{value:b(t.value,"@","@"+C)})],i);case me:if(t.length)return Rt(t.props,function(n){switch(It(n,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return se([xe(t,{props:[b(n,/:(read-\w+)/,":"+Ie+"$1")]})],i);case"::placeholder":return se([xe(t,{props:[b(n,/:(plac\w+)/,":"+C+"input-$1")]}),xe(t,{props:[b(n,/:(plac\w+)/,":"+Ie+"$1")]}),xe(t,{props:[b(n,/:(plac\w+)/,F+"input-$1")]})],i)}return""})}},yn=[gn],ro=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(y){var w=y.getAttribute("data-emotion");w.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var i=t.stylisPlugins||yn,n={},a,c=[];a=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var w=y.getAttribute("data-emotion").split(" "),v=1;v<w.length;v++)n[w[v]]=!0;c.push(y)});var f,l=[_n,vn];{var p,d=[Kr,Jr(function(y){p.insert(y)})],u=Yr(l.concat(i,d)),h=function(w){return se(Zr(w),u)};f=function(w,v,_,k){p=_,h(w?w+"{"+v.styles+"}":v.styles),k&&(g.inserted[v.name]=!0)}}var g={key:r,sheet:new Fr({key:r,container:a,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:n,registered:{},insert:f};return g.sheet.hydrate(c),g};function oo(e){for(var t=0,r,o=0,i=e.length;i>=4;++o,i-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var no={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var bn=!1,wn=/[A-Z]|^ms/g,xn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,co=function(t){return t.charCodeAt(1)===45},io=function(t){return t!=null&&typeof t!="boolean"},Lt=Xr(function(e){return co(e)?e:e.replace(wn,"-$&").toLowerCase()}),so=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(xn,function(o,i,n){return Z={name:i,styles:n,next:Z},i})}return no[t]!==1&&!co(t)&&typeof r=="number"&&r!==0?r+"px":r},Cn="Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";function He(e,t,r){if(r==null)return"";var o=r;if(o.__emotion_styles!==void 0)return o;switch(typeof r){case"boolean":return"";case"object":{var i=r;if(i.anim===1)return Z={name:i.name,styles:i.styles,next:Z},i.name;var n=r;if(n.styles!==void 0){var a=n.next;if(a!==void 0)for(;a!==void 0;)Z={name:a.name,styles:a.styles,next:Z},a=a.next;var c=n.styles+";";return c}return Sn(e,t,r)}case"function":{if(e!==void 0){var f=Z,l=r(e);return Z=f,He(e,t,l)}break}}var p=r;if(t==null)return p;var d=t[p];return d!==void 0?d:p}function Sn(e,t,r){var o="";if(Array.isArray(r))for(var i=0;i<r.length;i++)o+=He(e,t,r[i])+";";else for(var n in r){var a=r[n];if(typeof a!="object"){var c=a;t!=null&&t[c]!==void 0?o+=n+"{"+t[c]+"}":io(c)&&(o+=Lt(n)+":"+so(n,c)+";")}else{if(n==="NO_COMPONENT_SELECTOR"&&bn)throw new Error(Cn);if(Array.isArray(a)&&typeof a[0]=="string"&&(t==null||t[a[0]]===void 0))for(var f=0;f<a.length;f++)io(a[f])&&(o+=Lt(n)+":"+so(n,a[f])+";");else{var l=He(e,t,a);switch(n){case"animation":case"animationName":{o+=Lt(n)+":"+l+";";break}default:o+=n+"{"+l+"}"}}}}return o}var ao=/label:\s*([^\s;{]+)\s*(;|$)/g,Z;function ft(e,t,r){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var o=!0,i="";Z=void 0;var n=e[0];if(n==null||n.raw===void 0)o=!1,i+=He(r,t,n);else{var a=n;i+=a[0]}for(var c=1;c<e.length;c++)if(i+=He(r,t,e[c]),o){var f=n;i+=f[c]}ao.lastIndex=0;for(var l="",p;(p=ao.exec(i))!==null;)l+="-"+p[1];var d=oo(i)+l;return{name:d,styles:i,next:Z}}var kn=!0;function Ht(e,t,r){var o="";return r.split(" ").forEach(function(i){e[i]!==void 0?t.push(e[i]+";"):i&&(o+=i+" ")}),o}var Tn=function(t,r,o){var i=t.key+"-"+r.name;(o===!1||kn===!1)&&t.registered[i]===void 0&&(t.registered[i]=r.styles)},lo=function(t,r,o){Tn(t,r,o);var i=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var n=r;do t.insert(r===n?"."+i:"",n,t.sheet,!0),n=n.next;while(n!==void 0)}};function uo(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function fo(e,t,r){var o=[],i=Ht(e,o,r);return o.length<2?r:i+t(o)}var po=function(t){var r=ro(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var f=arguments.length,l=new Array(f),p=0;p<f;p++)l[p]=arguments[p];var d=ft(l,r.registered,void 0);return lo(r,d,!1),r.key+"-"+d.name},i=function(){for(var f=arguments.length,l=new Array(f),p=0;p<f;p++)l[p]=arguments[p];var d=ft(l,r.registered),u="animation-"+d.name;return uo(r,{name:d.name,styles:"@keyframes "+u+"{"+d.styles+"}"}),u},n=function(){for(var f=arguments.length,l=new Array(f),p=0;p<f;p++)l[p]=arguments[p];var d=ft(l,r.registered);uo(r,d)},a=function(){for(var f=arguments.length,l=new Array(f),p=0;p<f;p++)l[p]=arguments[p];return fo(r.registered,o,En(l))};return{css:o,cx:a,injectGlobal:n,keyframes:i,hydrate:function(f){f.forEach(function(l){r.inserted[l]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:Ht.bind(null,r.registered),merge:fo.bind(null,r.registered,o)}},En=function e(t){for(var r="",o=0;o<t.length;o++){var i=t[o];if(i!=null){var n=void 0;switch(typeof i){case"boolean":break;case"object":{if(Array.isArray(i))n=e(i);else{n="";for(var a in i)i[a]&&a&&(n&&(n+=" "),n+=a)}break}default:n=i}n&&(r&&(r+=" "),r+=n)}}return r};var Bt=document.createElement("div"),ho=po({key:"neos-debug",container:Bt});ho.sheet.speedy(!1);var m=ho.css;var Be='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zm-312 8v64c0 13.3 10.7 24 24 24s24-10.7 24-24v-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96v160c0 13.3 10.7 24 24 24s24-10.7 24-24V120c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64v96c0 13.3 10.7 24 24 24s24-10.7 24-24v-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>';var zt='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M448 73.1v45.7c0 40.3-100.3 73.2-224 73.2S0 159.1 0 118.9V73.1C0 32.9 100.3 0 224 0s224 32.9 224 73.1zm0 102.9v102.9c0 40.2-100.3 73.1-224 73.1S0 319.1 0 278.9V176c48.1 33.1 136.2 48.6 224 48.6s175.9-15.5 224-48.6zm0 160v102.9c0 40.2-100.3 73.1-224 73.1S0 479.1 0 438.9V336c48.1 33.1 136.2 48.6 224 48.6s175.9-15.5 224-48.6z"/></svg>';var Ut='<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M0 256 28.5 28c2-16 15.6-28 31.8-28h168.6c15 0 27.1 12.1 27.1 27.1 0 3.2-.6 6.5-1.7 9.5L208 160h139.3c20.2 0 36.7 16.4 36.7 36.7 0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5 0-2.3.3-4.6.9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"/></svg>';var ze='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-81-337c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>';var Wt=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <path fill="#26224C" d="M132.984 37.5l-20.642 15.162v31.716l20.642 29.413M132.984 150.564L53.627 37.5l-9.193 6.773V162.5l20.642-15.162V88.79l51.619 73.71h22.58l16.291-11.936"/>
    <path fill="#00ADEE" d="M65.076 88.79v58.548L44.434 162.5h22.582l20.642-15.162v-26.3M132.984 113.791V37.5h22.582v113.064h-22.582L53.627 37.5h25.809"/>
</svg>
`;var ee='<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>';var Qt=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>
`;var Vt=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
`;var Ue=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
`;var jt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16" height="16"><!--!Font Awesome Free v6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
`;var Ln={S:"0.75rem",M:"1rem",L:"1.5rem",XL:"2rem"},N=({icon:e,size:t="M"})=>s("span",{dangerouslySetInnerHTML:{__html:e},style:t!="M"?{height:Ln[t]}:void 0});var Hn=Symbol.for("preact-signals");function qt(){if(ae>1)ae--;else{var e,t=!1;for((function(){var i=dt;for(dt=void 0;i!==void 0;){var n=i.S;if(n.v===i.v)for(var a=n.t;a!==void 0;a=a.x)a.i===i.i&&(a.i=n.i);i=i.o}})();Qe!==void 0;){var r=Qe;for(Qe=void 0,pt++;r!==void 0;){var o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&vo(r))try{r.c()}catch(i){t||(e=i,t=!0)}r=o}}if(pt=0,ae--,t)throw e}}var We,T=void 0;function Ve(e){var t=T,r=We;T=void 0,We=void 0;try{return e()}finally{T=t,We=r}}var Qe=void 0,ae=0,pt=0;var mo=0,dt=void 0,ht=0;function _o(e){if(T!==void 0){var t=e.n;if(t===void 0||t.t!==T)return t={i:0,S:e,p:T.s,n:void 0,t:T,e:void 0,x:void 0,r:t},T.s!==void 0&&(T.s.n=t),T.s=t,e.n=t,32&T.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=T.s,t.n=void 0,T.s.n=t,T.s=t),t}}function A(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}A.prototype.brand=Hn;A.prototype.h=function(){return!0};A.prototype.S=function(e){var t=this,r=this.t;r!==e&&e.e===void 0&&(e.x=r,this.t=e,r!==void 0?r.e=e:Ve(function(){var o;(o=t.W)==null||o.call(t)}))};A.prototype.U=function(e){var t=this;if(this.t!==void 0){var r=e.e,o=e.x;r!==void 0&&(r.x=o,e.e=void 0),o!==void 0&&(o.e=r,e.x=void 0),e===this.t&&(this.t=o,o===void 0&&Ve(function(){var i;(i=t.Z)==null||i.call(t)}))}};A.prototype.subscribe=function(e){var t=this;return je(function(){var r=t.value;Ve(function(){return e(r)})},{name:"sub"})};A.prototype.valueOf=function(){return this.value};A.prototype.toString=function(){return this.value+""};A.prototype.toJSON=function(){return this.value};A.prototype.peek=function(){var e=this;return Ve(function(){return e.value})};Object.defineProperty(A.prototype,"value",{get:function(){var e=_o(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(pt>100)throw new Error("Cycle detected");(function(r){ae!==0&&pt===0&&r.l!==mo&&(r.l=mo,dt={S:r,v:r.v,i:r.i,o:dt})})(this),this.v=e,this.i++,ht++,ae++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{qt()}}}});function ke(e,t){return new A(e,t)}function vo(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function go(e){for(var t=e.s;t!==void 0;t=t.n){var r=t.S.n;if(r!==void 0&&(t.r=r),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function yo(e){for(var t=e.s,r=void 0;t!==void 0;){var o=t.p;t.i===-1?(t.S.U(t),o!==void 0&&(o.n=t.n),t.n!==void 0&&(t.n.p=o)):r=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=o}e.s=r}function ce(e,t){A.call(this,void 0,t),this.x=e,this.s=void 0,this.g=ht-1,this.f=4}ce.prototype=new A;ce.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ht))return!0;if(this.g=ht,this.f|=1,this.i>0&&!vo(this))return this.f&=-2,!0;var e=T;try{go(this),T=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(r){this.v=r,this.f|=16,this.i++}return T=e,yo(this),this.f&=-2,!0};ce.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}A.prototype.S.call(this,e)};ce.prototype.U=function(e){if(this.t!==void 0&&(A.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};ce.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}};Object.defineProperty(ce.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=_o(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function mt(e,t){return new ce(e,t)}function bo(e){var t=e.m;if(e.m=void 0,typeof t=="function"){ae++;var r=T;T=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,Gt(e),o}finally{T=r,qt()}}}function Gt(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,bo(e)}function Bn(e){if(T!==this)throw new Error("Out-of-order effect");yo(this),T=e,this.f&=-2,8&this.f&&Gt(this),qt()}function Te(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,We&&We.push(this)}Te.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.m=t)}finally{e()}};Te.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,bo(this),go(this),ae++;var e=T;return T=this,Bn.bind(this,e)};Te.prototype.N=function(){2&this.f||(this.f|=2,this.u=Qe,Qe=this)};Te.prototype.d=function(){this.f|=8,1&this.f||Gt(this)};Te.prototype.dispose=function(){this.d()};function je(e,t){var r=new Te(e,t);try{r.c()}catch(i){throw r.d(),i}var o=r.d.bind(r);return o[Symbol.dispose]=o,o}var gt,_t;function Ee(e,t){x[e]=t.bind(null,x[e]||function(){})}function vt(e){if(_t){var t=_t;_t=void 0,t()}_t=e&&e.S()}function wo(e){var t=this,r=e.data,o=Un(r);o.value=r;var i=he(function(){for(var n=t.__v;n=n.__;)if(n.__c){n.__c.__$f|=4;break}return t.__$u.c=function(){var a,c=t.__$u.S(),f=i.value;c(),Tt(f)||((a=t.base)==null?void 0:a.nodeType)!==3?(t.__$f|=1,t.setState({})):t.base.data=f},mt(function(){var a=o.value.value;return a===0?0:a===!0?"":a||""})},[]);return i.value}wo.displayName="_st";Object.defineProperties(A.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:wo},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});Ee("__b",function(e,t){if(typeof t.type=="string"){var r,o=t.props;for(var i in o)if(i!=="children"){var n=o[i];n instanceof A&&(r||(t.__np=r={}),r[i]=n,o[i]=n.peek())}}e(t)});Ee("__r",function(e,t){e(t),vt();var r,o=t.__c;o&&(o.__$f&=-2,(r=o.__$u)===void 0&&(o.__$u=r=(function(i){var n;return je(function(){n=this}),n.c=function(){o.__$f|=1,o.setState({})},n})())),gt=o,vt(r)});Ee("__e",function(e,t,r,o){vt(),gt=void 0,e(t,r,o)});Ee("diffed",function(e,t){vt(),gt=void 0;var r;if(typeof t.type=="string"&&(r=t.__e)){var o=t.__np,i=t.props;if(o){var n=r.U;if(n)for(var a in n){var c=n[a];c!==void 0&&!(a in o)&&(c.d(),n[a]=void 0)}else r.U=n={};for(var f in o){var l=n[f],p=o[f];l===void 0?(l=zn(r,f,p,i),n[f]=l):l.o(p,i)}}}e(t)});function zn(e,t,r,o){var i=t in e&&e.ownerSVGElement===void 0,n=ke(r);return{o:function(a,c){n.value=a,o=c},d:je(function(){var a=n.value.value;o[t]!==a&&(o[t]=a,i?e[t]=a:a?e.setAttribute(t,a):e.removeAttribute(t))})}}Ee("unmount",function(e,t){if(typeof t.type=="string"){var r=t.__e;if(r){var o=r.U;if(o){r.U=void 0;for(var i in o){var n=o[i];n&&n.d()}}}}else{var a=t.__c;if(a){var c=a.__$u;c&&(a.__$u=void 0,c.d())}}e(t)});Ee("__h",function(e,t,r,o){(o<3||o===9)&&(t.__$f|=2),e(t,r,o)});J.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var r=this.__$u,o=r&&r.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){if(!(o||2&this.__$f||4&this.__$f)||1&this.__$f)return!0}else if(!(o||4&this.__$f)||3&this.__$f)return!0;for(var n in e)if(n!=="__source"&&e[n]!==this.props[n])return!0;for(var a in this.props)if(!(a in e))return!0;return!1};function Un(e){return he(function(){return ke(e)},[])}function te(e){var t=Nr(e);return t.current=e,gt.__$f|=4,he(function(){return mt(function(){return t.current()})},[])}var Wn=m`
    align-items: flex-start;
    background-color: var(--colors-ContrastDarker);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    color: var(--colors-ContrastBrightest);
    font-size: 12px;
    left: 1rem;
    position: fixed;
    right: 1rem;
    top: 1rem;
    max-width: 1280px;
    margin: 0 auto;
    z-index: 10002;
    display: grid;
    grid-template-rows: auto 1fr;
    max-height: calc(100vh - 6rem);
    overflow: hidden;

    h1 {
        margin: 0;
        font-size: 1.4em;
        position: sticky;
        top: 0;
        padding: 0.5rem 0;
        text-align: center;
        width: 100%;
        z-index: 1;
        background-color: var(--colors-PrimaryViolet);
        color: var(--colors-ContrastBrightest);
    }

    h2 {
        margin: 0;
        font-size: 1.2em;
    }
`,Qn=m`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    padding: 1rem;
    background-color: transparent !important;
    color: white;
    z-index: 1;
`,Vn=m`
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    max-height: calc(100% - 40px);
    
    /**
     * Scollbars
     */
    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: var(--colors-ContrastDark);
    }
    
    ::-webkit-scrollbar-corner {
        background-color: var(--colors-ContrastDarker);
    }
`,V=ke(null),jn=({title:e=null,children:t,onClose:r,resetOverlay:o=!0})=>{let i=K(()=>{o&&(V.value=null),r&&r()},[]);return ne(()=>{let n=a=>{a.key==="Escape"&&i()};return window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n)}}),s("div",{className:Wn,children:[e&&s("h1",{children:e}),s("button",{type:"button",className:Qn,onClick:i,children:s(N,{icon:ze})}),s("div",{className:Vn,children:t})]})};var re=jn;var qn=m`
    --button-bg: transparent;
    background-color: var(--colors-ContrastDarker);
    border-top-left-radius: 0.5rem;
    box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    position: fixed;
    right: 0;
    bottom: 0;
    width: auto;
    z-index: 10003;
    padding: 0 0.5rem 0 0;

    > * {
        background: transparent;
        border-left: 1px solid var(--colors-ContrastDark);
        color: var(--colors-ContrastBrightest);
        font-size: 0.75em;
        line-height: 1.6em;
        padding: 0.5rem;
        pointer-events: all;

        &:first-child {
            border-left: none;
            border-top-left-radius: 0.5rem;
        }
    }

    svg {
        height: inherit;
        width: auto;
        vertical-align: text-bottom;
        fill: currentColor;
    }

    button {
        border-left: 1px solid var(--colors-ContrastDark);
        display: flex;
        gap: 0.3rem;
        user-select: none;
        transition:
            color 0.1s ease-in-out,
            background-color 0.1s ease-in-out;

        &:hover {
            color: var(--colors-PrimaryBlue);
        }
    }
`,Gn=()=>{let{debugInfos:{renderTime:e,sqlData:t,cCacheHits:r,cCacheMisses:o,cCacheUncached:i,additionalMetrics:n},closeApp:a}=W(),c=K(f=>{V.value=V.value===f?null:f},[]);return s("div",{className:qn,children:[s(N,{icon:Wt,size:"L"}),s("div",{children:[e," ms render time"]}),s("button",{onClick:()=>c("inspection"),children:[s(N,{icon:Be})," Inspect"]}),s("button",{onClick:()=>c("query"),children:[s(N,{icon:zt})," SQL (",t.queryCount," queries, ",t.slowQueries.length," are slow)"]}),s("button",{onClick:()=>c("cache"),children:[s(N,{icon:Ut})," Cache (hits: ",r,", misses: ",o.length,", uncached"," ",i,")"]}),s("button",{onClick:()=>c("additionalMetrics"),children:[s(N,{icon:ee})," Additional metrics",n.messages?.length>0?` (${n.messages?.length})`:""]}),s("button",{onClick:a,children:s(N,{icon:ze})})]})},xo=Gn;function yt(...e){return e.filter(Boolean).join(" ")}var Zn=m`
    ul {
        margin: 0;
    }

    td {
        &:first-child {
            padding-left: 1rem !important;
        }
        
        &:not(:first-child) {
            text-align: right;
        }
    }
`,Kn=m`
    display: inline-flex;
    vertical-align: middle;
    max-width: calc(100% - 30px);
    gap: 1ch;
    
    i {
        font-style: normal;
        cursor: pointer;
        
        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`,Yn=m`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`,Jn=m`
    svg {
        color: var(--colors-Warn);
    }
`,Co=m`
    td {
        text-align: end;
        
        &:first-child {
            text-align: start;
            padding-left: 2rem !important;
            overflow-wrap: anywhere;
        }
    }
    
    svg {
        color: var(--colors-Warn);
    }
`,Xn=({queryString:e,queryDetails:t,slowQueries:r})=>{let[o,i]=L(!0),n=r.length>0;return s(D,{children:[s("tr",{className:Zn,children:[s("td",{title:"Toggle details",children:s("span",{className:yt(Kn,o&&Yn,n&&Jn),title:e,children:[s("i",{onClick:()=>i(a=>!a),children:o?"\u25B6":"\u25BC"}),n&&s(N,{icon:ee}),s("span",{children:e})]})}),s("td",{children:[t.executionTimeSum.toFixed(2)," ms"]}),s("td",{children:t.count})]}),!o&&s(D,{children:[s("tr",{classNames:Co,children:[s("td",{colSpan:2,children:"Calls by parameters"}),s("td",{children:"Count"})]}),Object.keys(t.params).sort((a,c)=>t.params[c]-t.params[a]).map(a=>{let c=r.find(({params:f})=>JSON.stringify(f)===a);return s("tr",{className:Co,children:[s("td",{colSpan:2,children:[c&&s(N,{icon:ee})," ",a]}),s("td",{children:t.params[a]})]},a)})]})]})},So=Xn;var ei=m`
    cursor: pointer;
    
    &:hover {
        background-color: var(--colors-ContrastNeutral);
    }
        
    td {
        color: var(--colors-PrimaryBlue);
        
        &:not(:first-child) {
            text-align: right;
        }
    }
`,ti=m`
    svg {
        color: var(--colors-Warn);
    }
`,ri=m`
    display: inline-flex;
    gap: 1ch;
`,oi=({tableName:e,queryGroup:t,slowQueries:r})=>{let[o,i]=L(!0),n=r.filter(a=>a.table===e);return s(D,{children:[s("tr",{className:yt(ei,n.length>0&&ti),onClick:()=>i(a=>!a),children:[s("td",{children:s("span",{className:ri,children:[o?"\u25B6":"\u25BC",n.length>0&&s(N,{icon:ee}),s("strong",{children:e})]})}),s("td",{children:[t.executionTimeSum.toFixed(2)," ms"]}),s("td",{children:t.count})]}),!o&&Object.keys(t.queries).sort((a,c)=>t.queries[c].executionTimeSum-t.queries[a].executionTimeSum).map(a=>s(So,{queryString:a,queryDetails:t.queries[a],slowQueries:n.filter(({sql:c})=>c===a)}))]})},ko=oi;var ni=m`
    width: 100%;
    margin-bottom: 4rem;
    table-layout: fixed;
    border-collapse: collapse;

    th {
        font-weight: bold;
        font-size: 16px;
        padding: 1rem 0.5rem;
        width: 100px;
        textAlign: right;
        
        &:first-child {
            text-align: left;
            width: auto;
        }
    }

    tr {
        font-size: 13px;
        margin-bottom: 0.5rem;

        &:last-child {
            border-bottom: none;
        }
    }

    td {
        padding: 0.5rem;
        border-bottom: 1px solid var(--colors-ContrastDark);
        vertical-align: top;
    }
`,ii=()=>{let{debugInfos:{sqlData:{groupedQueries:e,slowQueries:t}}}=W();return s("table",{className:ni,children:[s("thead",{children:s("tr",{children:[s("th",{children:"Query"}),s("th",{children:"Total time"}),s("th",{children:"Count"})]})}),s("tbody",{children:Object.keys(e).sort((r,o)=>e[o].executionTimeSum-e[r].executionTimeSum).map(r=>s(ko,{tableName:r,queryGroup:e[r],slowQueries:t}))})]})},To=ii;var si=m`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    
    span {
        display: inline-flex;
    }

    svg {
        color: var(--colors-PrimaryBlue);
    }
`,ai=({children:e,title:t=null})=>s("div",{className:si,children:[s(N,{icon:Ue}),s("div",{className:"notice__content",children:[t&&s("strong",{children:t}),s("div",{children:e})]})]}),le=ai;var ci=()=>{let e=te(()=>V.value==="query"),{debugInfos:{sqlData:t}}=W();return e.value?s(re,{title:"Database query information",children:[s(le,{children:[s("strong",{children:t.queryCount})," queries with ",s("strong",{children:[t.executionTime.toFixed(2),"ms"]})," ","execution time."]}),s(To,{})]}):null},Eo=ci;var li=m`
    overflow-y: auto;
    width: 100%;
`,ui=m`
    border-collapse: collapse;
    width: 100%;

    th {
        text-align: left;
        padding: 0.5rem;
        word-break: break-word;
        /* This regex-like pattern helps break at uppercase letters in camelCase */
        overflow-wrap: break-word;
        hyphens: auto;
        position: sticky;
        top: 0;
        background-color: var(--colors-ContrastDarker);
    }

    td {
        border: 1px solid var(--colors-ContrastDark);
        vertical-align: baseline;
        padding: 0.5rem;
    }
`,fi=({children:e})=>s("div",{className:li,children:s("table",{className:ui,children:e})}),I=fi;function Zt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function No(e){return typeof e=="boolean"?e?"Yes":"No":typeof e=="object"?pi(e):e}function pi(e){if(typeof e!="string")try{e=JSON.stringify(e,void 0,2)}catch(t){return console.error("Failed to stringify JSON:",t),"Invalid JSON"}return e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,function(t){let r="number";return/^"/.test(t)?/:$/.test(t)?r="key":r="string":/true|false/.test(t)?r="boolean":/null/.test(t)&&(r="null"),'<span class="'+r+'">'+t+"</span>"})}var di=m`
    overflow: auto;
    margin: 0;

    .string {
        color: var(--colors-Success);
        white-space: normal;
        overflow-wrap: anywhere;
    }
    .number {
        color: var(--colors-Warn);
    }
    .boolean {
        color: var(--colors-PrimaryBlue);
    }
    .null {
        color: var(--colors-ContrastBright);
    }
    .key {
        color: var(--colors-Error);
    }
`,hi=({value:e})=>s("pre",{class:di,dangerouslySetInnerHTML:{__html:No(e)}}),ue=hi;var Mo=m`
    --color-positive: var(--colors-Success);
    --color-negative: var(--colors-Danger);
    --color-neutral: var(--colors-Warn);
`,Po=m`
    border-left: 5px solid var(--color-positive) !important;
`,mi=m`
    border-left: 5px solid var(--color-neutral) !important;
`,Oo=m`
    border-left: 5px solid var(--color-negative) !important;
`,_i=m`
    word-break: break-word;
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.3em;
    line-height: 1.4;

    i {
        color: var(--colors-ContrastBright);
    }

    .fragment {
        color: var(--colors-ContrastBrighter);
    }

    .prototype {
        display: none;
        font-weight: bold;
        color: var(--colors-PrimaryBlue);
    }

    &[data-show-prototypes='true'] .prototype {
        display: inline-block;
    }
`,vi=m`
    display: flex;
    gap: 0.5rem;
`,gi=["mode","hit","fusionPath","renderMetrics"],yi=({cacheInfo:e})=>{let[t,r]=L(!1),[o,i]=L(!1),n=/([^<>/]+)<([^<>:/]+:[^<>:/]+)(?::(.*?))?>(?:\/|$)/g,a=e.fusionPath.replace(n,'<span class="fragment">$1</span><span class="prototype">&lt;$2$3&gt;</span><i>/</i>'),c=e.mode=="cached"?Po:e.mode=="dynamic"?mi:Oo,f=e.hit?Po:Oo;return s(D,{children:[s("tr",{className:Mo,"data-cache-hit":e.hit,children:[s("td",{className:c,children:Zt(e.mode)}),s("td",{className:f,children:e.hit?"Yes":"No"}),s("td",{children:e.renderMetrics?.renderTime??"\u2013"}),s("td",{children:e.renderMetrics?.sqlQueryCount??"\u2013"}),s("td",{children:s("div",{className:_i,"data-show-prototypes":t,dangerouslySetInnerHTML:{__html:a}})}),s("td",{children:s("div",{className:vi,children:[s("button",{type:"button",onClick:()=>r(l=>!l),title:"Toggle prototypes",children:s(N,{icon:t?Vt:Qt})}),s("button",{type:"button",onClick:()=>i(l=>!l),title:"Show details",children:s(N,{icon:Ue})})]})})]}),o&&Object.keys(e).filter(l=>!gi.includes(l)).map(l=>s("tr",{className:Mo,children:[s("td",{colSpan:3,children:Zt(l)}),s("td",{colSpan:3,children:s(ue,{value:e[l]})})]},l))]})},Ao=yi;var bi=m`
    display: flex;
    gap: 1rem;
`,wi=m`
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 1rem;
    width: 100%;
    height: 100%;
`,qe=m`
    cursor: pointer;
    user-select: none;
    white-space: nowrap;

    &:hover {
        color: var(--colors-PrimaryBlue);
    }
`,xi=m`
    display: inline-flex;
    margin-left: 1ch;
    vertical-align: text-top;
    
    svg {
        height: 100%;
        width: auto;
        display: block;
    }
`,Ci=()=>{let e=te(()=>V.value==="cache"),{debugInfos:t,cacheInfos:r}=W(),[o,i]=L("fusionPath"),[n,a]=L("asc"),c=p=>{o===p?a(d=>d==="asc"?"desc":"asc"):(i(p),a("asc"))},f=[...r].sort((p,d)=>{let u=0;switch(o){case"mode":u=p.mode.localeCompare(d.mode);break;case"hit":u=(p.hit?1:0)-(d.hit?1:0);break;case"renderTime":u=parseFloat(p.renderMetrics?.renderTime??"0")-parseFloat(d.renderMetrics?.renderTime??"0");break;case"sqlQueryCount":u=(p.renderMetrics?.sqlQueryCount??0)-(d.renderMetrics?.sqlQueryCount??0);break;case"fusionPath":u=p.fusionPath.localeCompare(d.fusionPath);break}return n==="asc"?u:-u});if(!e.value)return null;let l=p=>o!==p?null:s("span",{className:xi,style:{transform:n==="desc"?"rotate(180deg)":void 0},children:s(N,{icon:jt,size:"S"})});return s(re,{title:"Fusion cache information",children:s("div",{className:wi,children:[s("div",{className:bi,children:[s("span",{children:[s("strong",{children:"Hits:"})," ",t.cCacheHits]}),s("span",{children:[s("strong",{children:"Misses:"})," ",t.cCacheMisses.length]}),s("span",{children:[s("strong",{children:"Uncached:"})," ",t.cCacheUncached]})]}),s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{className:qe,onClick:()=>c("mode"),style:{width:"fit-content"},children:["Mode",l("mode")]}),s("th",{className:qe,onClick:()=>c("hit"),style:{width:"min-content",whiteSpace:"nowrap"},children:["Cache hit",l("hit")]}),s("th",{className:qe,onClick:()=>c("renderTime"),style:{width:"min-content",whiteSpace:"nowrap"},children:["Render time",l("renderTime")]}),s("th",{className:qe,onClick:()=>c("sqlQueryCount"),style:{width:"min-content",whiteSpace:"nowrap"},children:["SQL queries",l("sqlQueryCount")]}),s("th",{className:qe,onClick:()=>c("fusionPath"),style:{width:"100%"},children:["Fusion path",l("fusionPath")]}),s("th",{style:{width:"min-content"},children:"Actions"})]})}),s("tbody",{children:f.map(p=>s(Ao,{cacheInfo:p},p.fusionPath))})]})]})})},Do=Ci;var Si=m`
    position: absolute;
    box-shadow: 0 0 10px rgba(0, 173, 238, 0.8);
    border-radius: 0.5rem;
    padding: 1rem;
    pointer-events: none;
`,ki=m`
    position: absolute;
    left: 0;
    top: 0;
    padding: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    pointer-events: all;
`,Ti=({cacheInfo:e,setActiveElement:t})=>{let{fusionPath:r,parentNode:o}=e,[i,n]=L(null),a=K(()=>{let{left:f,top:l,width:p,height:d}=o.getBoundingClientRect(),{scrollX:u,scrollY:h}=window;n({left:f+u,top:l+h,width:p,height:d})},[]),c=K(()=>{t(f=>e===f?null:e)},[]);return ne(()=>(a(),o.addEventListener("scroll",a),()=>o.removeEventListener("scroll",a)),[]),i?s("div",{"data-fusion-path":r,className:Si,style:{left:`max(0px, calc(${i.left}px - 1rem))`,top:`max(0px, calc(${i.top}px - 1rem))`,height:i.height,width:i.width},children:s("button",{className:ki,type:"button",onClick:c,title:r,children:s(N,{icon:Be})})}):null},Fo=Ti;var Ne=null,Ei=m`
    max-width: 90vw;
    overflow: auto;
    background-color: var(--colors-ContrastDarker);
    color: var(--colors-ContrastBrightest);
    pointer-events: all;

    td {
        vertical-align: text-bottom;

        &:first-child {
            font-weight: bold;
        }
    }
`,Ni=()=>{let e=te(()=>V.value==="inspection"),{cacheInfos:t}=W(),[r,o]=L({}),[i,n]=L(null),a=K(c=>{c.forEach(f=>{let l=f.target.dataset.neosDebugId;r[l]=f.isIntersecting}),o({...r})},[]);return ne(()=>(Ne||(Ne=new IntersectionObserver(a,{threshold:.1,rootMargin:"0px"})),e?t.forEach(c=>Ne.observe(c.parentNode)):t.forEach(c=>Ne.unobserve(c.parentNode)),()=>{Ne&&t.forEach(c=>Ne.unobserve(c.parentNode))}),[e.value]),e.value?s(D,{children:[t.filter(c=>r[c.fusionPath]).map(c=>s(Fo,{cacheInfo:c,setActiveElement:n},c.fusionPath)),i&&s(re,{onClose:()=>n(null),resetOverlay:!1,children:s("table",{className:Ei,children:s("tbody",{children:Object.keys(i).map(c=>s("tr",{children:[s("td",{children:c}),s("td",{children:s(ue,{value:i[c]})})]},c))})})})]}):null},Io=Ni;var Mi=m`
    summary {
        cursor: pointer;
        padding: 5px 0;
    
        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`,Pi=({summary:e,children:t})=>s("details",{className:Mi,children:[s("summary",{children:e}),t]}),U=Pi;var Oi=({cacheAccess:e})=>{let t=Object.values(e).reduce((i,n)=>i+n.hits,0),r=Object.values(e).reduce((i,n)=>i+n.misses,0),o=Object.values(e).reduce((i,n)=>i+n.updates,0);return s(U,{summary:`Cache access (${t} hits, ${r} misses, ${o} sets)`,children:s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Cache identifier"}),s("th",{children:"Backend type"}),s("th",{children:"Hits"}),s("th",{children:"Misses"}),s("th",{children:"Sets"})]})}),s("tbody",{children:Object.keys(e).sort().map(i=>s("tr",{children:[s("td",{children:i}),s("td",{children:e[i].cacheType}),s("td",{children:e[i].hits}),s("td",{children:e[i].misses}),s("td",{children:e[i].updates})]}))})]})})},Ro=Oi;var Ai=m`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
`,Di=e=>{let t=e.replace(/([A-Z])/g," $1").trim();return t.charAt(0).toUpperCase()+t.slice(1)},Fi=({metrics:e})=>{let t=Object.values(e).reduce((r,o)=>(r+=Math.max(o.firstLevelNodeCache.nodesByPath,o.firstLevelNodeCache.nodesByIdentifier,o.firstLevelNodeCache.childNodesByPathAndNodeTypeFilter),r),0);return s(U,{summary:`Node access metrics (~${t} loaded nodes)`,children:[s(le,{children:"These are nodes loaded from the Content Repository and stored in the first level node cache. The total number might include duplicates and doesn't necessarily correlate with the number of database queries."}),s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Identifier"}),Object.keys(Object.values(e)[0]).map(r=>s("th",{children:Di(r)},r))]})}),s("tbody",{children:Object.keys(e).map(r=>s("tr",{children:[s("td",{class:Ai,children:r}),Object.keys(e[r]).map(o=>s("td",{children:s(ue,{value:e[r][o]})},o))]}))})]})]})},$o=Fi;var Kt=e=>e>200?"var(--colors-Error)":e>50?"var(--colors-Warn)":"var(--colors-Success)",Ii=({records:e})=>{let t=e.reduce((r,o)=>r+o.count,0);return s(U,{summary:`Debug-marked prototypes (${t} evaluations)`,children:s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Label"}),s("th",{children:"Fusion Object"}),s("th",{children:"Count"}),s("th",{children:"Total"}),s("th",{children:"Avg"}),s("th",{children:"Min"}),s("th",{children:"Max"})]})}),s("tbody",{children:e.map((r,o)=>s("tr",{children:[s("td",{title:r.fusionPath,children:r.label}),s("td",{children:r.fusionObjectName}),s("td",{children:r.count}),s("td",{style:{color:Kt(r.totalTime)},children:[r.totalTime,"ms"]}),s("td",{style:{color:Kt(r.avgTime)},children:[r.avgTime,"ms"]}),s("td",{children:[r.minTime,"ms"]}),s("td",{style:{color:Kt(r.maxTime)},children:[r.maxTime,"ms"]})]},o))})]})})},Lo=Ii;var Ri=({messages:e})=>s(U,{summary:`Messages (${e.length})`,children:s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Timestamp"}),s("th",{children:"Title"}),s("th",{children:"Message"})]})}),s("tbody",{children:Object.values(e).map(({timestamp:t,title:r,message:o},i)=>s("tr",{children:[s("td",{children:t}),s("td",{children:r}),s("td",{children:o})]},i))})]})}),Ho=Ri;var $i=({resourceStreamRequests:e})=>s(U,{summary:`Resource stream requests (${Object.keys(e).length})`,children:[s(le,{children:"These requests show how many persistent resources are loaded during rendering to read their contents."}),Object.values(e).length>0&&s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Filename"}),s("th",{children:"SHA1"}),s("th",{children:"Collection"})]})}),s("tbody",{children:Object.values(e).map((t,r)=>s("tr",{children:[s("td",{children:t.filename}),s("td",{children:t.sha1}),s("td",{children:t.collectionName})]},r))})]})]}),Bo=$i;var Li=e=>e>200?"var(--colors-Error)":e>50?"var(--colors-Warn)":"var(--colors-Success)",Hi=e=>e.split(".").pop()??e,Bi=({searchQueries:e})=>{let t=e.reduce((r,o)=>r+o.executionTime,0).toFixed(2);return s(U,{summary:`Search queries (${e.length}) \u2014 ${t}ms total`,children:s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"Implementation"}),s("th",{children:"Method"}),s("th",{children:"Execution time"})]})}),s("tbody",{children:e.map((r,o)=>s("tr",{children:[s("td",{title:r.className,children:Hi(r.className)}),s("td",{children:r.methodName}),s("td",{style:{color:Li(r.executionTime)},children:[r.executionTime.toFixed(2),"ms"]})]},o))})]})})},zo=Bi;var zi=({thumbnails:e})=>s(U,{summary:`Generated thumbnails (${Object.keys(e).length})`,children:Object.keys(e).length>0&&s(I,{children:[s("thead",{children:s("tr",{children:[s("th",{children:"SHA1"}),s("th",{children:"Usages"})]})}),s("tbody",{children:Object.keys(e).map((t,r)=>s("tr",{children:[s("td",{children:t}),s("td",{children:e[t].join(", ")})]},r))})]})}),Uo=zi;var Ui=()=>{let e=te(()=>V.value==="additionalMetrics"),{debugInfos:{resourceStreamRequests:t,thumbnails:r,additionalMetrics:o}}=W();return e.value?s(re,{title:"Other metrics",children:[s(Bo,{resourceStreamRequests:t}),s(Uo,{thumbnails:r}),Object.keys(o.cacheAccess??[]).length>0&&s(Ro,{cacheAccess:o.cacheAccess}),Object.keys(o.messages??[]).length>0&&s(Ho,{messages:o.messages}),Object.keys(o.nodeAccessMetrics??[]).length>0&&s($o,{metrics:o.nodeAccessMetrics}),(o.searchQueries??[]).length>0&&s(zo,{searchQueries:o.searchQueries}),Object.keys(o.debugMarkedPrototypes??[]).length>0&&s(Lo,{records:o.debugMarkedPrototypes})]}):null},Wo=Ui;function Yt(e){let t=new Date((e||"").replace(/-/g,"/").replace(/[TZ]/g," ")),r=(new Date().getTime()-t.getTime())/1e3,o=Math.floor(r/86400);if(!(isNaN(o)||o<0||o>=31))return o===0&&(r<60&&"just now"||r<120&&"1 minute ago"||r<3600&&Math.floor(r/60)+" minutes ago"||r<7200&&"1 hour ago"||r<86400&&Math.floor(r/3600)+" hours ago")||o===1&&"Yesterday"||o<7&&o+" days ago"||o<31&&Math.ceil(o/7)+" weeks ago"}var Qo="__NEOS_CONTENT_CACHE_DEBUG__",Vo="__NEOS_DEBUG__",Wi=m`
    --colors-PrimaryViolet: #26224c;
    --colors-PrimaryVioletHover: #342f5f;
    --colors-PrimaryBlue: #00adee;
    --colors-PrimaryBlueHover: #35c3f8;
    --colors-ContrastDarkest: #141414;
    --colors-ContrastDarker: #222;
    --colors-ContrastDark: #3f3f3f;
    --colors-ContrastNeutral: #323232;
    --colors-ContrastBright: #999;
    --colors-ContrastBrighter: #adadad;
    --colors-ContrastBrightest: #fff;
    --colors-Success: #00a338;
    --colors-SuccessHover: #0bb344;
    --colors-Warn: #ff8700;
    --colors-WarnHover: #fda23d;
    --colors-Error: #ff460d;
    --colors-ErrorHover: #ff6a3c;
    --colors-UncheckedCheckboxTick: #5b5b5b;
    --button-bg: var(--colors-ContrastNeutral);

    font:
        112.5%/1.65 Noto Sans Regular,
        Helvetica Neue Light,
        Helvetica,
        Arial,
        sans-serif,
        serif;

    button {
        border: none;
        background-color: var(--button-bg);
        color: var(--colors-ContrastBrightest);
        cursor: pointer;
        white-space: break-spaces;
        padding: 0.5rem;

        &:hover {
            background-color: var(--colors-ContrastDark);
            color: var(--colors-PrimaryBlue);
        }

        span {
            display: flex;
        }
    }

    svg {
        fill: currentColor;
    }

    details summary {
        cursor: pointer;
    }
`,Me=class extends J{constructor(){super();this.cacheInfos=[];this.closeApp=()=>{let{cookiename:r}=this.props;document.cookie=`${r}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`,document.querySelector("neos-debug").setAttribute("active","false"),this.writeToConsole("%c Closing Neos Debug tool","color: white; background: #f9423a; line-height: 20px; font-weight: bold")};this.loadDebugInfos()&&this.loadCacheNodes()}writeToConsole(...r){console.debug("[Neos.Debug]",...r)}loadNodes(r){return document.createTreeWalker(document.getRootNode(),NodeFilter.SHOW_COMMENT,{acceptNode:o=>o.nodeValue.indexOf(r)===0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP})}processCacheInfo(r,o){let{mode:i,created:n,fusionPath:a}=o;i==="uncached"&&this.debugInfos.cCacheUncached++,o.hit=i!=="uncached"&&!this.debugInfos.cCacheMisses.includes(a),o.parentNode=r,r.dataset.neosDebugId=o.fusionPath,o.created=new Date(n).toLocaleString()+(i!=="uncached"?" - "+Yt(n):""),o.markup=r.outerHTML.replace(/<\/.+/,"").replace(/</g,"&lt;").replace(/>/g,"&gt;").substring(0,150)+" \u2026",this.cacheInfos.push(o)}loadCacheNodes(){let r=this.loadNodes(Qo);for(;r.nextNode();){let{currentNode:o}=r,i=o.previousElementSibling;if(!i)continue;let n=JSON.parse(o.nodeValue.substring(Qo.length));this.processCacheInfo(i,n)}}loadDebugInfos(){let o=this.loadNodes(Vo).nextNode();return this.debugInfos=o?JSON.parse(o.nodeValue.substring(Vo.length)):null,this.debugInfos?(this.writeToConsole(this.debugInfos,"Parsed debug infos"),!0):(this.writeToConsole("No debug infos found"),!1)}render({active:r}){return r==="false"||!this.debugInfos?null:s(Dr,{closeApp:this.closeApp,debugInfos:this.debugInfos,cacheInfos:this.cacheInfos,children:[s("div",{dangerouslySetInnerHTML:{__html:Bt.innerHTML}}),s("div",{className:Wi,children:[s(xo,{}),s(Eo,{}),s(Do,{}),s(Io,{}),s(Wo,{})]})]})}};Me.tagName="neos-debug",Me.observedAttributes=["active","cookiename"],Me.options={shadow:!0};var bt=Me;(()=>{let e="__neos_debug__",t=null,r=!1;window.__enable_neos_debug=(i=!1)=>{console.debug("%c Starting Neos Debug Tool ... ","color: white; background: #f9423a; line-height: 20px; font-weight: bold"),i?document.cookie=`${e}=true;path=/;SameSite=Strict`:console.debug('Start the Debug tool with "__enable_neos_debug(true)" to start up the Debug tool on every page load'),r||(_r(bt,null,null,bt.options),r=!0,t=document.createElement(bt.tagName),t.setAttribute("cookiename",e),document.body.appendChild(t)),t.setAttribute("active","true")};let o=document.cookie.match(new RegExp(`${e}=([^;]+)`));o&&o[1]==="true"&&window.addEventListener("load",()=>window.__enable_neos_debug(!0))})();})();
//# sourceMappingURL=Plugin.js.map
