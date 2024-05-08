/*! For license information please see main.js.LICENSE.txt */
(()=>{var t,e,o={775:(t,e,o)=>{"use strict";o.r(e)},499:function(t,e,o){var s,i;!function(n,a){"use strict";void 0===(i="function"==typeof(s=function(){var t={};function e(t,e){this.x=t||0,this.y=e||0}function o(t,o){this.pos=t||new e,this.r=o||0,this.offset=new e}function s(t,o){this.pos=t||new e,this.angle=0,this.offset=new e,this.setPoints(o||[])}function i(t,o,s){this.pos=t||new e,this.w=o||0,this.h=s||0}function n(){this.a=null,this.b=null,this.overlapN=new e,this.overlapV=new e,this.clear()}t.Vector=e,t.V=e,e.prototype.copy=e.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this},e.prototype.clone=e.prototype.clone=function(){return new e(this.x,this.y)},e.prototype.perp=e.prototype.perp=function(){var t=this.x;return this.x=this.y,this.y=-t,this},e.prototype.rotate=e.prototype.rotate=function(t){var e=this.x,o=this.y;return this.x=e*Math.cos(t)-o*Math.sin(t),this.y=e*Math.sin(t)+o*Math.cos(t),this},e.prototype.reverse=e.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},e.prototype.normalize=e.prototype.normalize=function(){var t=this.len();return t>0&&(this.x=this.x/t,this.y=this.y/t),this},e.prototype.add=e.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},e.prototype.sub=e.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},e.prototype.scale=e.prototype.scale=function(t,e){return this.x*=t,this.y*=void 0!==e?e:t,this},e.prototype.project=e.prototype.project=function(t){var e=this.dot(t)/t.len2();return this.x=e*t.x,this.y=e*t.y,this},e.prototype.projectN=e.prototype.projectN=function(t){var e=this.dot(t);return this.x=e*t.x,this.y=e*t.y,this},e.prototype.reflect=e.prototype.reflect=function(t){var e=this.x,o=this.y;return this.project(t).scale(2),this.x-=e,this.y-=o,this},e.prototype.reflectN=e.prototype.reflectN=function(t){var e=this.x,o=this.y;return this.projectN(t).scale(2),this.x-=e,this.y-=o,this},e.prototype.dot=e.prototype.dot=function(t){return this.x*t.x+this.y*t.y},e.prototype.len2=e.prototype.len2=function(){return this.dot(this)},e.prototype.len=e.prototype.len=function(){return Math.sqrt(this.len2())},t.Circle=o,o.prototype.getAABBAsBox=o.prototype.getAABBAsBox=function(){var t=this.r;return new i(this.pos.clone().add(this.offset).sub(new e(t,t)),2*t,2*t)},o.prototype.getAABB=o.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},o.prototype.setOffset=o.prototype.setOffset=function(t){return this.offset=t,this},t.Polygon=s,s.prototype.setPoints=s.prototype.setPoints=function(t){if(!this.points||this.points.length!==t.length){var o,s=this.calcPoints=[],i=this.edges=[],n=this.normals=[];for(o=0;o<t.length;o++){var a=t[o],r=o<t.length-1?t[o+1]:t[0];a===r||a.x!==r.x||a.y!==r.y?(s.push(new e),i.push(new e),n.push(new e)):(t.splice(o,1),o-=1)}}return this.points=t,this._recalc(),this},s.prototype.setAngle=s.prototype.setAngle=function(t){return this.angle=t,this._recalc(),this},s.prototype.setOffset=s.prototype.setOffset=function(t){return this.offset=t,this._recalc(),this},s.prototype.rotate=s.prototype.rotate=function(t){for(var e=this.points,o=e.length,s=0;s<o;s++)e[s].rotate(t);return this._recalc(),this},s.prototype.translate=s.prototype.translate=function(t,e){for(var o=this.points,s=o.length,i=0;i<s;i++)o[i].x+=t,o[i].y+=e;return this._recalc(),this},s.prototype._recalc=function(){var t,e=this.calcPoints,o=this.edges,s=this.normals,i=this.points,n=this.offset,a=this.angle,r=i.length;for(t=0;t<r;t++){var l=e[t].copy(i[t]);l.x+=n.x,l.y+=n.y,0!==a&&l.rotate(a)}for(t=0;t<r;t++){var h=e[t],c=t<r-1?e[t+1]:e[0],u=o[t].copy(c).sub(h);s[t].copy(u).perp().normalize()}return this},s.prototype.getAABBAsBox=s.prototype.getAABBAsBox=function(){for(var t=this.calcPoints,o=t.length,s=t[0].x,n=t[0].y,a=t[0].x,r=t[0].y,l=1;l<o;l++){var h=t[l];h.x<s?s=h.x:h.x>a&&(a=h.x),h.y<n?n=h.y:h.y>r&&(r=h.y)}return new i(this.pos.clone().add(new e(s,n)),a-s,r-n)},s.prototype.getAABB=s.prototype.getAABB=function(){return this.getAABBAsBox().toPolygon()},s.prototype.getCentroid=s.prototype.getCentroid=function(){for(var t=this.calcPoints,o=t.length,s=0,i=0,n=0,a=0;a<o;a++){var r=t[a],l=a===o-1?t[0]:t[a+1],h=r.x*l.y-l.x*r.y;s+=(r.x+l.x)*h,i+=(r.y+l.y)*h,n+=h}return new e(s/=n*=3,i/=n)},t.Box=i,i.prototype.toPolygon=i.prototype.toPolygon=function(){var t=this.pos,o=this.w,i=this.h;return new s(new e(t.x,t.y),[new e,new e(o,0),new e(o,i),new e(0,i)])},t.Response=n,n.prototype.clear=n.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var a=[],r=0;r<10;r++)a.push(new e);var l=[];for(r=0;r<5;r++)l.push([]);var h=new n,c=new i(new e,1e-6,1e-6).toPolygon();function u(t,e,o){for(var s=Number.MAX_VALUE,i=-Number.MAX_VALUE,n=t.length,a=0;a<n;a++){var r=t[a].dot(e);r<s&&(s=r),r>i&&(i=r)}o[0]=s,o[1]=i}function d(t,e,o,s,i,n){var r=l.pop(),h=l.pop(),c=a.pop().copy(e).sub(t),d=c.dot(i);if(u(o,i,r),u(s,i,h),h[0]+=d,h[1]+=d,r[0]>h[1]||h[0]>r[1])return a.push(c),l.push(r),l.push(h),!0;if(n){var p,f,y=0;r[0]<h[0]?(n.aInB=!1,r[1]<h[1]?(y=r[1]-h[0],n.bInA=!1):y=(p=r[1]-h[0])<(f=h[1]-r[0])?p:-f):(n.bInA=!1,r[1]>h[1]?(y=r[0]-h[1],n.aInB=!1):y=(p=r[1]-h[0])<(f=h[1]-r[0])?p:-f);var _=Math.abs(y);_<n.overlap&&(n.overlap=_,n.overlapN.copy(i),y<0&&n.overlapN.reverse())}return a.push(c),l.push(r),l.push(h),!1}function p(t,e){var o=t.len2(),s=e.dot(t);return s<0?f:s>o?_:y}t.isSeparatingAxis=d;var f=-1,y=0,_=1;function m(t,e,o){for(var s=a.pop().copy(e.pos).add(e.offset).sub(t.pos),i=e.r,n=i*i,r=t.calcPoints,l=r.length,h=a.pop(),c=a.pop(),u=0;u<l;u++){var d=u===l-1?0:u+1,y=0===u?l-1:u-1,m=0,v=null;h.copy(t.edges[u]),c.copy(s).sub(r[u]),o&&c.len2()>n&&(o.aInB=!1);var g=p(h,c);if(g===f){h.copy(t.edges[y]);var w=a.pop().copy(s).sub(r[y]);if((g=p(h,w))===_){if((x=c.len())>i)return a.push(s),a.push(h),a.push(c),a.push(w),!1;o&&(o.bInA=!1,v=c.normalize(),m=i-x)}a.push(w)}else if(g===_){if(h.copy(t.edges[d]),c.copy(s).sub(r[d]),(g=p(h,c))===f){if((x=c.len())>i)return a.push(s),a.push(h),a.push(c),!1;o&&(o.bInA=!1,v=c.normalize(),m=i-x)}}else{var b=h.perp().normalize(),x=c.dot(b),C=Math.abs(x);if(x>0&&C>i)return a.push(s),a.push(b),a.push(c),!1;o&&(v=b,m=i-x,(x>=0||m<2*i)&&(o.bInA=!1))}v&&o&&Math.abs(m)<Math.abs(o.overlap)&&(o.overlap=m,o.overlapN.copy(v))}return o&&(o.a=t,o.b=e,o.overlapV.copy(o.overlapN).scale(o.overlap)),a.push(s),a.push(h),a.push(c),!0}function v(t,e,o){for(var s=t.calcPoints,i=s.length,n=e.calcPoints,a=n.length,r=0;r<i;r++)if(d(t.pos,e.pos,s,n,t.normals[r],o))return!1;for(r=0;r<a;r++)if(d(t.pos,e.pos,s,n,e.normals[r],o))return!1;return o&&(o.a=t,o.b=e,o.overlapV.copy(o.overlapN).scale(o.overlap)),!0}return t.pointInCircle=function(t,e){var o=a.pop().copy(t).sub(e.pos).sub(e.offset),s=e.r*e.r,i=o.len2();return a.push(o),i<=s},t.pointInPolygon=function(t,e){c.pos.copy(t),h.clear();var o=v(c,e,h);return o&&(o=h.aInB),o},t.testCircleCircle=function(t,e,o){var s=a.pop().copy(e.pos).add(e.offset).sub(t.pos).sub(t.offset),i=t.r+e.r,n=i*i,r=s.len2();if(r>n)return a.push(s),!1;if(o){var l=Math.sqrt(r);o.a=t,o.b=e,o.overlap=i-l,o.overlapN.copy(s.normalize()),o.overlapV.copy(s).scale(o.overlap),o.aInB=t.r<=e.r&&l<=e.r-t.r,o.bInA=e.r<=t.r&&l<=t.r-e.r}return a.push(s),!0},t.testPolygonCircle=m,t.testCirclePolygon=function(t,e,o){var s=m(e,t,o);if(s&&o){var i=o.a,n=o.aInB;o.overlapN.reverse(),o.overlapV.reverse(),o.a=o.b,o.b=i,o.aInB=o.bInA,o.bInA=n}return s},t.testPolygonPolygon=v,t})?s.call(e,o,e,t):s)||(t.exports=i)}()},854:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(931)),n=s(o(800)),a=s(o(698)),r=s(o(399)),l=s(o(843));e.default=class{constructor(t){this._updateCallbacks=new Set;const{uiRootSelector:e}=t;this.userInterfaceService=new r.default(e),n.default.onUpdate((({deltaTime:t})=>this._onTick(t)))}start(){n.default.start()}onUpdate(t){this._updateCallbacks.add(t)}_onTick(t){i.default.update(t),this._updateCallbacks.forEach((e=>e(t))),l.default.render(),a.default.collide(),a.default.move(t)}}},427:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(737)),n=s(o(335)),a=o(412);class r extends i.default{constructor({context:t,canvas:e,backgroundColor:o,meshColor:s,borders:i,name:n,id:a,height:r,width:l}){super({name:n,id:a}),this.zoom=1,this.backgroundColor="rgba(30, 30, 30, .85)",this.meshColor="white",this.lerp=1,this.deadZoneX=60,this.deadZoneY=60,this.borders={top:-1/0,right:1/0,bottom:1/0,left:-1/0},this._lastZoom=this.zoom,o&&(this.backgroundColor=o),s&&(this.meshColor=s),i&&(this.borders=i),this._context=t,this._canvas=e,this._canvas.height=r,this._canvas.width=l,this._height=r,this._width=l,this._context.scale(this.zoom,this.zoom)}worldToCameraPosition(t){return new n.default(this.translate.position.x-t.x,this.translate.position.y-t.y)}render(t){this._clearCanvas(),this.target&&this.follow(),t.forEach((t=>{t.draw({context:this._context})})),this._context.restore()}setZoom(t){t<1&&(t=1),this.zoom=t,this._context.scale(this.zoom/this._lastZoom,this.zoom/this._lastZoom),this._lastZoom=this.zoom}_getScreenCenter(){return new n.default(this._width/2/this.zoom,this._height/2/this.zoom)}_translateCanvas(t){this._context.save(),this._context.translate(t.x,t.y)}follow(){this._context.save();const{x:t,y:e}=this.target.translate.position;this.translate.position.x-t>this.deadZoneX?this.translate.position.x=(0,a.lerp)(this.translate.position.x,t+this.deadZoneX,this.lerp):this.translate.position.x-t<-this.deadZoneX&&(this.translate.position.x=(0,a.lerp)(this.translate.position.x,t-this.deadZoneX,this.lerp)),this.translate.position.y-e>this.deadZoneY?this.translate.position.y=(0,a.lerp)(this.translate.position.y,e+this.deadZoneY,this.lerp):this.translate.position.y-e<-this.deadZoneY&&(this.translate.position.y=(0,a.lerp)(this.translate.position.y,e-this.deadZoneY,this.lerp));const o=this._getScreenCenter();this.translate.position.x=(0,a.clamp)(this.translate.position.x,this.borders.left+o.x-20,this.borders.right-o.x+20),this.translate.position.y=(0,a.clamp)(this.translate.position.y,this.borders.top+o.y-20*this.zoom,this.borders.bottom-o.y+20);const s=this.translate.position.x-o.x,i=this.translate.position.y-o.y;this._translateCanvas(new n.default(-s,-i))}isInCamera(t){const e=this.worldToCameraPosition(t);return e.x>=0&&e.x<=this._width&&e.y>=0&&e.y<=this._height}_clearCanvas(){this._context.fillStyle=this.backgroundColor,this._context.fillRect(0,0,this._width,this._height),this._context.fillStyle=this.meshColor,this._context.strokeStyle="black"}}e.default=r},737:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(931)),n=s(o(448));class a{constructor(t){if(this.translate=new n.default,this._children=new Set,this._components={},t){const{name:e,id:o}=t;this.name=e,this.id=o}}setComponent(t){this._components[t.name]=t,t.setGameObject(this)}getComponent(t){return this._components[t]}addChild(t){this.translate.addChild(t.translate),this._children.add(t)}removeChild(t){if("number"!=typeof t)t instanceof a&&this._children.delete(t);else{const e=[...this._children].find((e=>e.id===t));this._children.delete(e)}}onInstantiate(){}onUpdate(t){}instantiate(){i.default.instantiate(this)}destroy(){this._children.forEach((t=>{i.default.destroy(t)})),Object.keys(this._components).forEach((t=>this._components[t].cleanup())),i.default.destroy(this)}}e.default=a},473:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){t&&t.gameObject&&(this._gameObject=t.gameObject)}setGameObject(t){this._gameObject=t}cleanup(){}}},97:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(448));e.default=class{constructor(t){this.translate=new i.default,t.shape&&(this.shape=t.shape),this.fillStyle=t.fillStyle,this.strokeStyle=t.strokeStyle,this.lineWidth=t.lineWidth,this.glow=t.glow,this.glowColor=t.glowColor||"white"}draw({context:t}){if(!this.shape)return;const{strokeStyle:e,fillStyle:o,lineWidth:s,shadowBlur:i,shadowColor:n}=t;t.beginPath(),t.shadowColor=this.glowColor,t.shadowBlur=this.glow,this.shape.getPointsPosition(this.translate.getActualPosition(),this.translate.getActionRotation()).forEach((e=>{const{x:o,y:s}=e;t.lineTo(o,s)})),t.strokeStyle=this.strokeStyle||e,t.fillStyle=this.fillStyle||o,t.lineWidth=this.lineWidth||s,t.closePath(),t.stroke(),t.fill(),t.strokeStyle=e,t.fillStyle=o,t.lineWidth=s,t.shadowBlur=i,t.shadowColor=n}}},553:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(335)),n=s(o(402));class a{get scale(){return this._scale}set scale(t){this._scale=t<0?0:t}constructor({points:t,scale:e}){this._scale=1,this.points=t,this._scale=e||this._scale}_getScaledPoint(t){return new i.default(t.x*this._scale,t.y*this._scale)}getPointsPosition(t,e){return this.points.map((o=>{const{x:s,y:i}=this._getScaledPoint(o),{x:n,y:r}=t;return a.rotatePoint(s+n,i+r,e,t)}))}static rotatePoint(t,e,o,s){const a=(0,n.default)(o),r=Math.cos(a),l=Math.sin(a),{x:h,y:c}=s,u=h+(t-h)*r-(e-c)*l,d=c+(t-h)*l+(e-c)*r;return new i.default(u,d)}}e.default=a},448:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(335)),n=s(o(553));e.default=class{constructor(){this.position=i.default.zero(),this.rotation=0,this.children=new Set}getActualPosition(){if(!this.parentTranslate)return this.position;const{rotation:t,position:e}=this.parentTranslate,{x:o,y:s}=this.position,{x:a,y:r}=e,l=new i.default(o+a,s+r);return n.default.rotatePoint(l.x,l.y,t,e)}getActionRotation(){return this.parentTranslate?this.parentTranslate.rotation+this.rotation:this.rotation}setPosition(t){this.position.x=t.x,this.position.y=t.y}setRotation(t){this.rotation=t}addChild(t){this.children.add(t),t.parentTranslate=this}}},254:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(515));class n extends i.default{constructor({content:t,height:e,width:o,position:s}){super({width:o,height:e,position:s}),this.content=t}addToRoot(t,e){this._htmlNode=document.createElement("p"),this._htmlNode.innerText=this.content,this._htmlNode.style.position="absolute",this._htmlNode.style.left=`${this.position.x}px`,this._htmlNode.style.top=`${this.position.y}px`,this._htmlNode.style.overflow="hidden",this._htmlNode.style.width=`${this.width}px`,this._htmlNode.style.height=`${this.height}px`,t.appendChild(this._htmlNode),this._rootNode=t,this._blocksSet=e}remove(){this._rootNode.removeChild(this._htmlNode),this._blocksSet.delete(this)}setContent(t){this.content=t,this._htmlNode.innerText=this.content}}e.default=n},515:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor({width:t,height:e,position:o}){this.width=t,this.height=e,this.position=o}}},335:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=o(870);class i{constructor(t=0,e=0){this.x=t,this.y=e}static zero(){return new i(0,0)}static dot(t,e){return t.x*e.x+t.y*e.y}static random(){return new i((0,s.negativeRandom)(-1,1),(0,s.negativeRandom)(-1,1))}copy(){return new i(this.x,this.y)}negative(){return new i(-this.x,-this.y)}normalize(){return 0===this.getLength()?i.zero():new i(this.x/this.getLength(),this.y/this.getLength())}getLength(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}}e.default=i},799:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(499)),n=s(o(335)),a=s(o(473));class r extends a.default{constructor(t){super(t),this._collisionCallbacks=[],this.name="collider",this.shape=t.shape}checkCollision(t){if(!this._gameObject||t==this)return!1;const e=this._turnShapeIntoSATPolygon(this.shape,this._gameObject.translate.position,this._gameObject.translate.rotation),o=this._turnShapeIntoSATPolygon(t.shape,t._gameObject.translate.position,t._gameObject.translate.rotation);let s=new i.default.Response;if(i.default.testPolygonPolygon(e,o,s)){const e=new n.default(s.overlapV.x,s.overlapV.y);this._collisionCallbacks.forEach((o=>o(t,e)))}}onCollision(t){this._collisionCallbacks.push(t)}getGameObject(){return this._gameObject}_turnShapeIntoSATPolygon(t,e,o){const s=t.getPointsPosition(n.default.zero(),o).map((t=>{const{x:e,y:o}=t;return new i.default.Vector(e,o)}));return new i.default.Polygon(new i.default.Vector(e.x,e.y),s)}}e.default=r},161:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(473)),n=s(o(843));class a extends i.default{constructor(t){super(t),this._mesh=null,this.name="meshRenderer"}set mesh(t){this._mesh=t,n.default.drawables.add(this._mesh)}get mesh(){return this._mesh}setGameObject(t){super.setGameObject(t),this._mesh.translate=this._gameObject.translate}cleanup(){super.cleanup(),this.removeMesh()}removeMesh(){n.default.drawables.delete(this._mesh)}}e.default=a},708:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(335)),n=s(o(473));class a extends n.default{constructor(t){super(t),this.velocity=i.default.zero(),this.friction=.02,this.rotationVelocity=0,this.rotationFriction=.02,this.name="rigibody"}move(t){this._gameObject&&(this._moveGameObject(t),this._rotateGameObject(t))}push(t,e){this.velocity.x+=t,this.velocity.y+=e}turn(t){this.rotationVelocity+=t}_moveGameObject(t){const{x:e,y:o}=this._gameObject.translate.position;this._gameObject.translate.setPosition(new i.default(e+this.velocity.x*t,o+this.velocity.y*t)),this.velocity.x*=1-this.friction*t,this.velocity.y*=1-this.friction*t}_rotateGameObject(t){this._gameObject.translate.rotation+=this.rotationVelocity*t,this.rotationVelocity*=1-this.rotationFriction*t}}e.default=a},507:function(t,e,o){"use strict";var s=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(i,n){function a(t){try{l(s.next(t))}catch(t){n(t)}}function r(t){try{l(s.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,r)}l((s=s.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(o(335));e.default=new class{constructor(){this.tracks=new Set,this._onAudioContextInitCallbacks=new Set,this._noSourceTracks=new Set}getTrack(t){return[...this.tracks].find((e=>e.name===t))}add({name:t,resolvedSrc:e}){const o=document.createElement("audio");o.src=e;const s={name:t,audio:o,nodes:[]};this._noSourceTracks.add(s),this.tracks.add(s)}play(t){return s(this,void 0,void 0,(function*(){try{const e=this.getTrack(t);if(!e)return void console.warn(`Track with name ${t} not found.`);yield this._createAudioContext(),this._onAudioContextInit((()=>s(this,void 0,void 0,(function*(){this._connectMediaSources(),this._connectTrackAudioNodes(t),yield e.audio.play()}))))}catch(t){console.error(t)}}))}addPosition(t,e){const o=this.getTrack(t);o?this._onAudioContextInit((()=>{const t=o.nodes.find((t=>t instanceof PannerNode)),s=t||new PannerNode(this._audioContext),i=new n.default(this.listenerPosition.x-e.x,this.listenerPosition.y-e.y),a=i.getLength()/300,{x:r,y:l}=i.normalize();s.positionX.value=-r*a,s.positionZ.value=l*a,t||o.nodes.push(s)})):console.warn(`Track with name ${t} not found.`)}addGain(t,e){const o=this.getTrack(t);o?this._onAudioContextInit((()=>{const t=o.nodes.find((t=>t instanceof GainNode)),s=t||new GainNode(this._audioContext);s.gain.value=e,t||o.nodes.push(s)})):console.warn(`Track with name ${t} not found.`)}stopAndPlay(t){return s(this,void 0,void 0,(function*(){this.stop(t),yield this.play(t)}))}pause(t){this.getTrack(t).audio.pause()}stop(t){const e=this.getTrack(t);e?(e.audio.pause(),e.audio.currentTime=0):console.warn(`Track with name ${t} not found.`)}_connectTrackAudioNodes(t){const e=this.getTrack(t);return function t(e,o){if(!o.length)return e;const s=o[o.length-1];return t(e.connect(s),o.slice(0,-1))}(e.mediaSource,e.nodes).connect(this._audioContext.destination)}_onAudioContextInit(t){this._audioContext&&t(),this._onAudioContextInitCallbacks.add(t)}_connectMediaSources(){0!==this._noSourceTracks.size&&this._noSourceTracks.forEach((t=>this._connectTrackToAudioContext(t.name)))}_createAudioContext(){return s(this,void 0,void 0,(function*(){if(this._audioContext)return this._audioContext.resume();this._audioContext=new AudioContext,this._onAudioContextInitCallbacks.forEach((t=>t()))}))}_connectTrackToAudioContext(t){const e=this.getTrack(t);e.mediaSource||(e.mediaSource=this._audioContext.createMediaElementSource(this.getTrack(t).audio))}}},931:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=new class{constructor(){this.gameObjects=new Set}instantiate(t){this.gameObjects.add(t),t.onInstantiate()}destroy(t){this.gameObjects.delete(t)}update(t){this.gameObjects.forEach((e=>{var o;return null===(o=e.onUpdate)||void 0===o?void 0:o.call(e,t)}))}}},993:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(800));e.default=new class{setListener(t){const{keyCode:e,onDown:o,onUp:s,once:n}=t;let a;function r(t){t.repeat||t.code===e&&(o&&!n?a=i.default.onUpdate(o):o())}function l(t){t.code===e&&(o&&!n&&(null==a||a()),s&&s())}return document.addEventListener("keydown",r),document.addEventListener("keyup",l),()=>{document.removeEventListener("keydown",r),document.removeEventListener("keyup",l)}}}},698:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(931));e.default=new class{constructor(){}move(t){i.default.gameObjects.forEach((e=>{const o=e.getComponent("rigibody");o&&o.move(t)}))}collide(){const t=[...i.default.gameObjects].filter((t=>t.getComponent("collider")));t.forEach((e=>{const o=e.getComponent("collider");t.forEach((t=>{if(t===e)return;const s=t.getComponent("collider");o.checkCollision(s)}))}))}}},843:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=new class{constructor(){this.drawables=new Set,this.cameras=new Set}render(){this.cameras.forEach((t=>{t.render([...this.drawables])}))}}},800:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=new class{constructor(){this.updateCallbacks=new Set,this.perfectFramerate=60,this.deltaTime=0,this.lastTimestamp=0}onUpdate(t){return this.updateCallbacks.add(t),()=>{this.updateCallbacks.delete(t)}}start(){this.tickRequestId=requestAnimationFrame((t=>this._update(t)))}_update(t){this.updateCallbacks.forEach((t=>t(this._getUpdateCallbackContext()))),this.tickRequestId=requestAnimationFrame((t=>this._update(t))),this.deltaTime=(t-this.lastTimestamp)/(1e3/this.perfectFramerate),this.lastTimestamp=t}_getUpdateCallbackContext(){return{deltaTime:this.deltaTime,time:this.lastTimestamp}}}},399:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.uiRootSelector=t,this._uiElements=new Set,this._uiRoot=document.querySelector(t),this._uiRoot||console.error(`No UI root with selector ${t} were found`)}addUIBlock(t){t.addToRoot(this._uiRoot,this._uiElements),this._uiElements.add(t)}}},402:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return t*Math.PI/180}},412:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.clamp=e.lerp=void 0,e.lerp=function(t,e,o){return t*(1-o)+e*o},e.clamp=function(t,e,o){return t>o?o:t<e?e:t}},870:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.minRandom=e.negativeRandom=void 0,e.negativeRandom=function(t,e){return Math.random()*e+Math.random()*t},e.minRandom=function(t,e){return Math.random()*(e-t)+t}},2:function(t,e){"use strict";var o=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(i,n){function a(t){try{l(s.next(t))}catch(t){n(t)}}function r(t){try{l(s.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,r)}l((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.sleep=void 0,e.sleep=function(t){return o(this,void 0,void 0,(function*(){return new Promise((e=>setTimeout(e,t)))}))}},890:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(895)),n=s(o(335)),a=s(o(39)),r=s(o(931)),l=s(o(800)),h=s(o(993)),c=s(o(402)),u=s(o(254)),d=s(o(843)),p=o(412),f=o(870),y=s(o(507)),_=s(o(427));e.default=class{constructor(){this._mapWidth=6e3,this._mapHeight=6e3}start(t){const{height:e,width:o,uiService:s,uiRootSelector:i,canvasSelector:n}=t;this._uiService=s,this._width=o,this._height=e,this._canvas=document.querySelector(n),this._context=this._canvas.getContext("2d"),this.restart(e,o),l.default.onUpdate((()=>{this._player.health<=0&&(this.stop(),this.restart(e,o)),this._player.translate.position.x=(0,p.clamp)(this._player.translate.position.x,0,this._mapWidth),this._player.translate.position.y=(0,p.clamp)(this._player.translate.position.y,0,this._mapHeight)}))}restart(t,e){this._spawnPlayer(new n.default(this._mapWidth/2,this._mapHeight/2)),this._startAsteroidInterval(e,t),this._initControls(),this._initUI(e,t),this._camera=new _.default({context:this._context,canvas:this._canvas,width:this._width,height:this._height,borders:{top:0,left:0,right:this._mapWidth,bottom:this._mapHeight}}),d.default.cameras.clear(),this._camera.target=this._player,this._camera.translate.position=this._player.translate.position.copy(),this._context.restore(),d.default.cameras.add(this._camera),y.default.listenerPosition=this._camera.translate.position;let o,s=5;o=l.default.onUpdate((({deltaTime:t})=>{s>1.6&&(s-=.1*t,this._camera.setZoom(s)),s<=1.6&&(s=1.6,this._camera.setZoom(s),o())}))}stop(){this._player.destroy(),this.velocityZoomUnsub(),this._removeAllAsteroids(),this._stopAsteroidInterval()}_initControls(){const t=this._player.getComponent("rigibody");h.default.setListener({keyCode:"KeyW",onDown:()=>{const e=Math.cos((0,c.default)(this._player.translate.rotation+t.rotationVelocity))/6,o=Math.sin((0,c.default)(this._player.translate.rotation+t.rotationVelocity))/6;t.push(e,o)}}),h.default.setListener({keyCode:"KeyD",onDown:()=>{t.turn(.2)}}),h.default.setListener({keyCode:"KeyA",onDown:()=>{t.turn(-.2)}}),h.default.setListener({keyCode:"Space",onDown:()=>{this._player.shoot()}})}_initUI(t,e){const o=new u.default({position:new n.default(15,15),height:100,width:400,content:""});this._uiService.addUIBlock(o);const s=new u.default({position:new n.default(t-350,e-50),height:50,width:350,content:""});this._uiService.addUIBlock(s);const i=new u.default({position:new n.default(t-350,15),height:50,width:350,content:""});this._uiService.addUIBlock(i);const a=new u.default({position:new n.default(350,15),height:50,width:350,content:""});return this._uiService.addUIBlock(a),l.default.onUpdate((()=>{s.setContent(`Player position: x - ${this._player.translate.position.x.toFixed(1)}; y - ${this._player.translate.position.y.toFixed(1)}`),o.setContent(`Health left - ${this._player.health} / ${this._player.maxHealth}`),i.setContent(`There's ${r.default.gameObjects.size} game object(s) on the map`),a.setContent(`Score: ${this._player.score}`)})),{healthBlock:o,positionBlock:s,objectsCount:i}}_spawnPlayer(t){this._player=new i.default({maxHealth:6}),this._player.translate.position=t,this._player.translate.rotation=-90,r.default.instantiate(this._player);const e=this._player.getComponent("rigibody");this.velocityZoomUnsub=l.default.onUpdate((()=>{this._camera.setZoom((0,p.lerp)(this._camera.zoom,1.6-e.velocity.getLength()/10,.02))}))}_removeAllAsteroids(){r.default.gameObjects.forEach((t=>{"asteroid"===t.name&&t.destroy()}))}_stopAsteroidInterval(){clearInterval(this._currAsteroidInterval)}_startAsteroidInterval(t,e){o.e(510).then(o.bind(o,510)).then((t=>{y.default.add({name:"asteroid-explode",resolvedSrc:t.default})})),o.e(24).then(o.bind(o,24)).then((t=>{y.default.add({name:"asteroid-hurt",resolvedSrc:t.default})}));const s=()=>(0,f.negativeRandom)(t/-2,t/2),i=()=>(0,f.negativeRandom)(e/-2,e/2),r=()=>(0,f.minRandom)(200,600),l={top:(t,o)=>new n.default(t+s(),o-e/2-r()),left:(e,o)=>new n.default(e-t/2-r(),o+i()),right:(e,o)=>new n.default(e+t/2+r()*Math.random(),o+i()),bottom:(t,o)=>new n.default(t+s(),o+e/2+r())};this._currAsteroidInterval=setInterval((()=>{const{x:t,y:e}=this._player.translate.position,o=Object.keys(l),s=o[Math.floor(Math.random()*o.length)],i=(0,l[s])(t,e),n=new a.default({maxHealth:6,name:"asteroid",player:this._player});n.translate.position=i;const r=n.getComponent("rigibody");n.instantiate(),r.push(.003*(this._player.translate.position.x-n.translate.position.x),.003*(this._player.translate.position.y-n.translate.position.y)),r.turn(5*Math.random())}),800)}}},263:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(737));class n extends i.default{constructor({maxHealth:t,health:e}){super(),this.maxHealth=t,this.health=e||t}makeDamage(t){}}e.default=n},39:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(263)),n=s(o(335)),a=s(o(553)),r=s(o(708)),l=s(o(799)),h=s(o(507)),c=s(o(161)),u=s(o(97));class d extends i.default{constructor(t){super(t),this._maxRadius=70,this._minRadius=50,this._asteroidDefaultColor="rgb(23, 86, 118)",this.name="asteroid",this.player=t.player,this.radius=(this._maxRadius-this._minRadius)*Math.random()+this._minRadius;const e=this.radius/2,o=Math.floor(5*Math.random())+5,s=[];for(let t=0;t<o;t++){const i=t/o*360*Math.PI/180,a=Math.cos(i)*(this.radius-Math.random()*e+Math.random()*e),r=Math.sin(i)*(this.radius-Math.random()*e+Math.random()*e);s.push(new n.default(a,r))}const i=new a.default({points:s}),h=new c.default;h.mesh=new u.default({shape:i,fillStyle:this._asteroidDefaultColor,strokeStyle:"#4BA3C3",glowColor:"#FFFFFF44"});const d=new r.default({}),p=new l.default({shape:i});h.mesh.glow=100,h.mesh.glowColor="rgb(23, 86, 118, .35)",d.rotationFriction=0,d.friction=0,this.setComponent(h),this.setComponent(d),this.setComponent(p)}onUpdate(){this.health<=0&&(this.player.score+=1,h.default.addPosition("asteroid-explode",this.translate.position),h.default.play("asteroid-explode"),this.destroy()),Math.abs(this.player.translate.position.getLength()-this.translate.position.getLength())>1200&&this.destroy()}_meshBlink(){if(this._isBlinking)return;this._isBlinking=!0;const t=this.getComponent("meshRenderer"),{fillStyle:e}=t.mesh;t.mesh.fillStyle="white",t.mesh.glow=1e3,t.mesh.glowColor="#FFFFFF44",setTimeout((()=>{t.mesh.fillStyle=e,t.mesh.glow=100,t.mesh.glowColor="rgb(23, 86, 118, .35)",this._isBlinking=!1}),100)}_fillRgba(t,e,o,s){this.getComponent("meshRenderer").mesh.fillStyle=`rgba(${t},${e},${o}, ${s})`}makeDamage(t){this.health-=t,h.default.addPosition("asteroid-hurt",this.translate.position),h.default.stopAndPlay("asteroid-hurt");const e=this.health/this.maxHealth;this._fillRgba(23,86,118,e),this._meshBlink()}}e.default=d},895:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(o(263)),n=s(o(553)),a=s(o(97)),r=s(o(402)),l=s(o(708)),h=s(o(335)),c=s(o(799)),u=s(o(869)),d=s(o(507)),p=o(2),f=s(o(161));class y extends i.default{constructor(t){super(t),this._fireRate=6,this._accuracy=2,this._lastTimeShot=0,this._isInvincible=!1,this._invincibleTime=3,this.score=0,this.id="player";const e=new n.default({points:[new h.default(0,-4),new h.default(15,0),new h.default(0,4),new h.default(3,0)],scale:.9}),s=new c.default({shape:e}),i=new f.default;i.mesh=new a.default({shape:e});const r=new l.default({});this.setComponent(s),this.setComponent(i),this.setComponent(r),s.onCollision(((t,e)=>{const o=t.getGameObject();if("asteroid"===o.name){const t=o.getComponent("rigibody");r.push((this.translate.position.x-(this.translate.position.x+e.x))*t.velocity.getLength(),(this.translate.position.y-(this.translate.position.y+e.y))*t.velocity.getLength()),this.makeDamage(1)}})),o.e(404).then(o.bind(o,404)).then((t=>{d.default.add({name:"player-shoot",resolvedSrc:t.default})})),o.e(796).then(o.bind(o,796)).then((t=>{d.default.add({name:"player-hurt",resolvedSrc:t.default})})),this._addInvincibleBlink()}_addInvincibleBlink(){const t=this.getComponent("meshRenderer").mesh,e=t.fillStyle;setInterval((()=>{this._isInvincible&&(t.fillStyle="rgba(255, 255, 255, .3)",(0,p.sleep)(100).then((()=>{t.fillStyle=e})))}),200)}makeDamage(t){this._isInvincible||(this._isInvincible=!0,this.health-=t,d.default.addPosition("player-hurt",this.translate.position),d.default.play("player-hurt"),setTimeout((()=>{this._isInvincible=!1}),1e3*this._invincibleTime))}shoot(){if(Date.now()-this._lastTimeShot>=1e3/this._fireRate){const t=new h.default(this.translate.position.x+25*Math.cos((0,r.default)(this.translate.rotation)),this.translate.position.y+25*Math.sin((0,r.default)(this.translate.rotation)));console.log(t);const e=new u.default;e.translate.position=t,e.translate.rotation=this.translate.rotation+Math.random()*this._accuracy-Math.random()*this._accuracy,e.instantiate(),d.default.addPosition("player-shoot",this.translate.position),d.default.stopAndPlay("player-shoot"),setTimeout((()=>e.destroy()),2e3),this._lastTimeShot=Date.now()}return null}}e.default=y},869:function(t,e,o){"use strict";var s=this&&this.__awaiter||function(t,e,o,s){return new(o||(o=Promise))((function(i,n){function a(t){try{l(s.next(t))}catch(t){n(t)}}function r(t){try{l(s.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,r)}l((s=s.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(o(737)),a=i(o(335)),r=i(o(402)),l=i(o(553)),h=i(o(708)),c=i(o(799)),u=i(o(161)),d=i(o(97));class p extends n.default{constructor(t){super(t),this._projectileSpeed=40,this.name="PlayerProjectile";const e=new l.default({points:[new a.default(-25,0),new a.default(0,2),new a.default(25,0),new a.default(0,-2),new a.default(-25,0)]}),o=new u.default;o.mesh=new d.default({shape:e,fillStyle:"#ECEE81",strokeStyle:"#5B9A8B",lineWidth:0,glow:100,glowColor:"#ECEE8166"});const i=new h.default({}),n=new c.default({shape:e});this.setComponent(o),this.setComponent(i),this.setComponent(n),n.onCollision((t=>s(this,void 0,void 0,(function*(){const e=t.getGameObject();"asteroid"===e.name&&(e.makeDamage(1),this.destroy())}))))}onInstantiate(){const t=this.getComponent("rigibody");t.friction=0,t.velocity=new a.default(Math.cos((0,r.default)(this.translate.rotation+t.rotationVelocity))*this._projectileSpeed,Math.sin((0,r.default)(this.translate.rotation+t.rotationVelocity))*this._projectileSpeed)}}e.default=p},156:function(t,e,o){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),o(775);const i=s(o(854)),n=s(o(890)),a=new i.default({uiRootSelector:"#ui"}),{userInterfaceService:r}=a;(new n.default).start({uiService:r,height:window.innerHeight,width:window.innerWidth,canvasSelector:"#root",uiRootSelector:"#ui"}),a.start()}},s={};function i(t){var e=s[t];if(void 0!==e)return e.exports;var n=s[t]={exports:{}};return o[t].call(n.exports,n,n.exports,i),n.exports}i.m=o,i.d=(t,e)=>{for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},i.f={},i.e=t=>Promise.all(Object.keys(i.f).reduce(((e,o)=>(i.f[o](t,e),e)),[])),i.u=t=>t+".js",i.miniCssF=t=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="asteroids-ts:",i.l=(o,s,n,a)=>{if(t[o])t[o].push(s);else{var r,l;if(void 0!==n)for(var h=document.getElementsByTagName("script"),c=0;c<h.length;c++){var u=h[c];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==e+n){r=u;break}}r||(l=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,i.nc&&r.setAttribute("nonce",i.nc),r.setAttribute("data-webpack",e+n),r.src=o),t[o]=[s];var d=(e,s)=>{r.onerror=r.onload=null,clearTimeout(p);var i=t[o];if(delete t[o],r.parentNode&&r.parentNode.removeChild(r),i&&i.forEach((t=>t(s))),e)return e(s)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=d.bind(null,r.onerror),r.onload=d.bind(null,r.onload),l&&document.head.appendChild(r)}},i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var o=e.getElementsByTagName("script");if(o.length)for(var s=o.length-1;s>-1&&(!t||!/^http(s?):/.test(t));)t=o[s--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{var t={792:0};i.f.j=(e,o)=>{var s=i.o(t,e)?t[e]:void 0;if(0!==s)if(s)o.push(s[2]);else{var n=new Promise(((o,i)=>s=t[e]=[o,i]));o.push(s[2]=n);var a=i.p+i.u(e),r=new Error;i.l(a,(o=>{if(i.o(t,e)&&(0!==(s=t[e])&&(t[e]=void 0),s)){var n=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;r.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",r.name="ChunkLoadError",r.type=n,r.request=a,s[1](r)}}),"chunk-"+e,e)}};var e=(e,o)=>{var s,n,[a,r,l]=o,h=0;if(a.some((e=>0!==t[e]))){for(s in r)i.o(r,s)&&(i.m[s]=r[s]);l&&l(i)}for(e&&e(o);h<a.length;h++)n=a[h],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0},o=self.webpackChunkasteroids_ts=self.webpackChunkasteroids_ts||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})(),i(156)})();