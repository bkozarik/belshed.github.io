
if(!Array.from){Array.from=(function(){var toStr=Object.prototype.toString;var isCallable=function(fn){return typeof fn==='function'||toStr.call(fn)==='[object Function]';};var toInteger=function(value){var number=Number(value);if(isNaN(number)){return 0;}
if(number===0||!isFinite(number)){return number;}
return(number>0?1:-1)*Math.floor(Math.abs(number));};var maxSafeInteger=Math.pow(2,53)-1;var toLength=function(value){var len=toInteger(value);return Math.min(Math.max(len,0),maxSafeInteger);};return function from(arrayLike){var C=this;var items=Object(arrayLike);if(arrayLike==null){throw new TypeError('Array.from requires an array-like object - not null or undefined');}
var mapFn=arguments.length>1?arguments[1]:void undefined;var T;if(typeof mapFn!=='undefined'){if(!isCallable(mapFn)){throw new TypeError('Array.from: when provided, the second argument must be a function');}
if(arguments.length>2){T=arguments[2];}}
var len=toLength(items.length);var A=isCallable(C)?Object(new C(len)):new Array(len);var k=0;var kValue;while(k<len){kValue=items[k];if(mapFn){A[k]=typeof T==='undefined'?mapFn(kValue,k):mapFn.call(T,kValue,k);}else{A[k]=kValue;}
k+=1;}
A.length=len;return A;};}());}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++){callback.call(thisArg,this[i],i,this);}};}'use strict';function polyfill(){var w=window;var d=document;if('scrollBehavior'in d.documentElement.style&&w.__forceSmoothScrollPolyfill__!==true){return;}
var Element=w.HTMLElement||w.Element;var SCROLL_TIME=468;var original={scroll:w.scroll||w.scrollTo,scrollBy:w.scrollBy,elementScroll:Element.prototype.scroll||scrollElement,scrollIntoView:Element.prototype.scrollIntoView};var now=w.performance&&w.performance.now?w.performance.now.bind(w.performance):Date.now;function isMicrosoftBrowser(userAgent){var userAgentPatterns=['MSIE ','Trident/','Edge/'];return new RegExp(userAgentPatterns.join('|')).test(userAgent);}
var ROUNDING_TOLERANCE=isMicrosoftBrowser(w.navigator.userAgent)?1:0;function scrollElement(x,y){this.scrollLeft=x;this.scrollTop=y;}
function ease(k){return 0.5*(1-Math.cos(Math.PI*k));}
function shouldBailOut(firstArg){if(firstArg===null||typeof firstArg!=='object'||firstArg.behavior===undefined||firstArg.behavior==='auto'||firstArg.behavior==='instant'){return true;}
if(typeof firstArg==='object'&&firstArg.behavior==='smooth'){return false;}
throw new TypeError('behavior member of ScrollOptions '+
firstArg.behavior+' is not a valid value for enumeration ScrollBehavior.');}
function hasScrollableSpace(el,axis){if(axis==='Y'){return el.clientHeight+ROUNDING_TOLERANCE<el.scrollHeight;}
if(axis==='X'){return el.clientWidth+ROUNDING_TOLERANCE<el.scrollWidth;}}
function canOverflow(el,axis){var overflowValue=w.getComputedStyle(el,null)['overflow'+axis];return overflowValue==='auto'||overflowValue==='scroll';}
function isScrollable(el){var isScrollableY=hasScrollableSpace(el,'Y')&&canOverflow(el,'Y');var isScrollableX=hasScrollableSpace(el,'X')&&canOverflow(el,'X');return isScrollableY||isScrollableX;}
function findScrollableParent(el){while(el!==d.body&&isScrollable(el)===false){el=el.parentNode||el.host;}
return el;}
function step(context){var time=now();var value;var currentX;var currentY;var elapsed=(time-context.startTime)/SCROLL_TIME;elapsed=elapsed>1?1:elapsed;value=ease(elapsed);currentX=context.startX+(context.x-context.startX)*value;currentY=context.startY+(context.y-context.startY)*value;context.method.call(context.scrollable,currentX,currentY);if(currentX!==context.x||currentY!==context.y){w.requestAnimationFrame(step.bind(w,context));}}
function smoothScroll(el,x,y){var scrollable;var startX;var startY;var method;var startTime=now();if(el===d.body){scrollable=w;startX=w.scrollX||w.pageXOffset;startY=w.scrollY||w.pageYOffset;method=original.scroll;}else{scrollable=el;startX=el.scrollLeft;startY=el.scrollTop;method=scrollElement;}
step({scrollable:scrollable,method:method,startTime:startTime,startX:startX,startY:startY,x:x,y:y});}
w.scroll=w.scrollTo=function(){if(arguments[0]===undefined){return;}
if(shouldBailOut(arguments[0])===true){original.scroll.call(w,arguments[0].left!==undefined?arguments[0].left:typeof arguments[0]!=='object'?arguments[0]:w.scrollX||w.pageXOffset,arguments[0].top!==undefined?arguments[0].top:arguments[1]!==undefined?arguments[1]:w.scrollY||w.pageYOffset);return;}
smoothScroll.call(w,d.body,arguments[0].left!==undefined?~~arguments[0].left:w.scrollX||w.pageXOffset,arguments[0].top!==undefined?~~arguments[0].top:w.scrollY||w.pageYOffset);};w.scrollBy=function(){if(arguments[0]===undefined){return;}
if(shouldBailOut(arguments[0])){original.scrollBy.call(w,arguments[0].left!==undefined?arguments[0].left:typeof arguments[0]!=='object'?arguments[0]:0,arguments[0].top!==undefined?arguments[0].top:arguments[1]!==undefined?arguments[1]:0);return;}
smoothScroll.call(w,d.body,~~arguments[0].left+(w.scrollX||w.pageXOffset),~~arguments[0].top+(w.scrollY||w.pageYOffset));};Element.prototype.scroll=Element.prototype.scrollTo=function(){if(arguments[0]===undefined){return;}
if(shouldBailOut(arguments[0])===true){if(typeof arguments[0]==='number'&&arguments[1]===undefined){throw new SyntaxError('Value could not be converted');}
original.elementScroll.call(this,arguments[0].left!==undefined?~~arguments[0].left:typeof arguments[0]!=='object'?~~arguments[0]:this.scrollLeft,arguments[0].top!==undefined?~~arguments[0].top:arguments[1]!==undefined?~~arguments[1]:this.scrollTop);return;}
var left=arguments[0].left;var top=arguments[0].top;smoothScroll.call(this,this,typeof left==='undefined'?this.scrollLeft:~~left,typeof top==='undefined'?this.scrollTop:~~top);};Element.prototype.scrollBy=function(){if(arguments[0]===undefined){return;}
if(shouldBailOut(arguments[0])===true){original.elementScroll.call(this,arguments[0].left!==undefined?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,arguments[0].top!==undefined?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop);return;}
this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior});};Element.prototype.scrollIntoView=function(){if(shouldBailOut(arguments[0])===true){original.scrollIntoView.call(this,arguments[0]===undefined?true:arguments[0]);return;}
var scrollableParent=findScrollableParent(this);var parentRects=scrollableParent.getBoundingClientRect();var clientRects=this.getBoundingClientRect();if(scrollableParent!==d.body){smoothScroll.call(this,scrollableParent,scrollableParent.scrollLeft+clientRects.left-parentRects.left,scrollableParent.scrollTop+clientRects.top-parentRects.top);if(w.getComputedStyle(scrollableParent).position!=='fixed'){w.scrollBy({left:parentRects.left,top:parentRects.top,behavior:'smooth'});}}else{w.scrollBy({left:clientRects.left,top:clientRects.top,behavior:'smooth'});}};}
if(typeof exports==='object'&&typeof module!=='undefined'){module.exports={polyfill:polyfill};}else{polyfill();}