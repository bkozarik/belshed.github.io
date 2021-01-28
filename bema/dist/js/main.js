
document.addEventListener('DOMContentLoaded',function(){var header=document.querySelector('.header');var burger=document.querySelector('.js-burger');var menu=document.querySelector('.js-menu');var tabTriggers=document.querySelectorAll('.js-tab-trigger');var tabs=document.querySelectorAll('.js-tab');var mouseMoveElements=document.querySelectorAll('.js-mousemove-item');var gallerySwiperNode=document.querySelector('.js-gallery-swiper');var galleryItems=document.querySelectorAll('.js-gallery-item');var popupCloseTriggers=document.querySelectorAll('.js-popup-close');var popupTriggers=document.querySelectorAll('.js-popup-trigger');var popups=document.querySelectorAll('.popup');var passwordTriggers=document.querySelectorAll('.js-pass-toggle');var scrollLinks=document.querySelectorAll('.js-scroll-link');var dialogLinks=document.querySelectorAll('.js-dialog-link');var dialogSwitcher=document.querySelector('.js-dialog-switcher');var reactionTriggers=document.querySelectorAll('.js-reaction-trigger');function scrollHandler(){window.pageYOffset>60?header.classList.add('fixed'):header.classList.remove('fixed');}
function resizeHandler(){if(window.innerWidth>=920){toggleMenu(false);}
if(window.innerWidth<=968){var lastFooterCol=document.querySelectorAll('.footer__col')[0];lastFooterCol.insertBefore(document.querySelector('a.footer__copyright'),lastFooterCol.querySelector('.footer__copyright'));}
else{var lastFooterCol=document.querySelectorAll('.footer__col')[1];lastFooterCol.appendChild(document.querySelector('a.footer__copyright'));}}
function isExists(element){if(typeof(element)=='string'){return document.querySelector(element)?true:false;}
else if(typeof(element)=='object'){if(Array.isArray(element)){return element[0]?true:false;}
else if(NodeList.prototype.isPrototypeOf(element)){return element[0]?true:false;}
return element?true:false;}}
function mousemoveHandler(){mouseMoveElements.forEach(function(element){var coords={xCoord:event.clientX,yCoord:event.clientY,}
for(coord in coords){coords[coord]*=100;if(element.dataset.speed)coords[coord]*=parseFloat(element.dataset.speed);if(element.dataset.direction)element.dataset.direction=='vertical'?coords.xCoord=0:element.dataset.direction=='horizontal'?coords.yCoord=0:null;}
element.style.transform='translate( '+coords.xCoord/window.innerWidth+'%, '+coords.yCoord/window.innerHeight+'%)';});}
function openPopup(selector){var targetPopup=document.querySelector(selector);targetPopup.classList.add('active');toggleScroll(false);return targetPopup;}
function openPopupByTrigger(){var target=event.target;while(!target.classList.contains('js-popup-trigger')){target=target.parentNode;}
openPopup(target.dataset.target);}
function closePopups(){popups.forEach(function(popup){popup.classList.remove('active');if(isExists(popup.querySelector('video'))){popup.querySelector('video').pause();}});toggleScroll(true);}
function toggleScroll(state){state=typeof state=='object'?null:state;var body=document.querySelector('body');var html=document.querySelector('html');if(state!=null){state?body.classList.remove('no-scroll'):body.classList.add('no-scroll');state?html.classList.remove('no-scroll'):html.classList.add('no-scroll');}
else{body.classList.toggle('no-scroll');html.classList.toggle('no-scroll');}}
function toggleMenu(state){state=typeof state=='object'?null:state;if(state==null){return function(){burger.classList.toggle('active');menu.classList.toggle('active');toggleScroll();}}
else{state?burger.classList.add('active'):burger.classList.remove('active');state?menu.classList.add('active'):menu.classList.remove('active');state?toggleScroll(false):toggleScroll(true);}}
function scrollLinkClick(){event.preventDefault();var targetLink=event.target;var offset=-100;toggleMenu(false);var href=targetLink.getAttribute('href');try{window.scrollTo({top:document.querySelector(href).offsetTop+offset,behavior:'smooth'});}
catch(e){console.log("Элемент "+href+" не найден!");}}
function togglePasswordView(item){item.classList.toggle('active');var type=item.classList.contains('active')?'text':'password';item.parentNode.querySelector('input').setAttribute('type',type);}
function dialogLinkClick(){event.preventDefault();dialogLinks.forEach(function(link){link.classList.remove('active');});this.classList.toggle('active');}
function pulseAnimation(element){var targetElement=typeof(element)=='string'?document.querySelector(element):element instanceof Element?element:new Error('Такого элемента не существует!');targetElement.classList.add('pulse-animate');targetElement.classList.add('pulse-animate_animate');setTimeout(function(){targetElement.classList.remove('pulse-animate_animate');},800);}
function animateReactionTrigger(){var spirit=document.createElement('span');spirit.classList.add('reaction__trigger');spirit.classList.add('reaction__trigger_spirit');spirit.style.backgroundImage=getComputedStyle(this).backgroundImage;this.appendChild(spirit);var counter=0;var counterStep=1.3;var frameRate=1000/60;var maxCounter=110*Math.PI;var totalFrames=maxCounter/counterStep;var totalTime=totalFrames*frameRate;var animationInterval=setInterval(function(){spirit.style.top=(-2*counter)-32*Math.cos(0.1*counter)+'px';spirit.style.right=-counter+'px';counter+=counterStep;if(counter>=maxCounter){clearInterval(animationInterval);}},frameRate);var bubbleAnimation=setTimeout(()=>{spirit.style.transform='scale(2)';spirit.style.opacity='0';},totalTime-2*parseFloat(getComputedStyle(spirit).transitionDuration)*1000);var endOfAnimation=setTimeout(()=>{spirit.remove();},totalTime);}
function switchDialogs(){var dialogs=document.querySelector('.js-chat-dialogs');dialogs.classList.toggle('active')}
if(isExists(tabTriggers)&&isExists(tabs)){Array.from(tabTriggers).forEach(function(trigger,index){if(index==0){trigger.classList.add('active');tabs[index].classList.add('active');}
trigger.addEventListener('click',function(){tabTriggers.forEach(function(trigger){trigger.classList.remove('active');});tabs.forEach(function(table){table.classList.remove('active');});trigger.classList.add('active');var targetIndex=trigger.dataset.target;var targetTables=Array.from(tabs).filter(function(item){return item.dataset.index==targetIndex;});targetTables.forEach(function(table){table.classList.add('active');});});});}
if(isExists(gallerySwiperNode)){try{var gallerySwiper=new Swiper(gallerySwiperNode,{slidesPerView:1,spaceBetween:30,speed:700,centeredSlides:true,navigation:{prevEl:'.gallery__control_prev',nextEl:'.gallery__control_next',},});}
catch(e){var swiperWrapper=gallerySwiperNode.querySelector('.swiper-wrapper');var swiperSlides=swiperWrapper.querySelectorAll('.swiper-slide');document.querySelectorAll('.gallery__control').forEach(function(control){control.addEventListener('click',function(event){var slideWidth=parseInt(getComputedStyle(swiperSlides[0]).width);slideWidth*=this.classList.contains('gallery__control_prev')?1:-1;var slideOffset=getComputedStyle(swiperWrapper).transform;slideOffset=slideOffset.replace('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ','').replace(', 0, 0, 1)','');slideOffset=slideOffset.replace('matrix(1, 0, 0, 1, ','').replace(', 0)','');var translateX=slideWidth+parseInt(slideOffset);console.log('translateX',translateX);if(Math.abs(translateX)<=Math.abs((swiperSlides.length-1)*slideWidth)&&translateX<=0){swiperWrapper.style.transform='translateX('+translateX+'px)';}});});}}
if(isExists(galleryItems)){galleryItems.forEach(function(item){item.addEventListener('click',function(event){event.preventDefault();var largeImagePath=this.getAttribute('href');var targetPopup=openPopup('.js-popup-big-image');targetPopup.querySelector('.js-popup-img').setAttribute('src',largeImagePath);});});}
if(isExists(popupCloseTriggers)){popupCloseTriggers.forEach(function(trigger){trigger.addEventListener('click',function(event){event.stopPropagation();if(event.target.classList.contains('js-popup-close')){closePopups();}})});}
if(isExists(popupTriggers)){popupTriggers.forEach(function(trigger){trigger.addEventListener('click',openPopupByTrigger);});}
if(isExists(burger)){burger.addEventListener('click',toggleMenu());}
if(isExists(passwordTriggers)){passwordTriggers.forEach(function(trigger){trigger.addEventListener('click',function(){togglePasswordView(this);});});}
if(isExists(scrollLinks)){scrollLinks.forEach(function(link){link.addEventListener('click',scrollLinkClick)});}
if(isExists(dialogLinks)){dialogLinks.forEach(function(link){link.addEventListener('click',dialogLinkClick);});}
if(isExists(dialogSwitcher)){dialogSwitcher.addEventListener('click',switchDialogs);}
if(isExists(reactionTriggers)){reactionTriggers.forEach(function(trigger){trigger.addEventListener('click',animateReactionTrigger);});}
window.addEventListener('scroll',scrollHandler);window.addEventListener('resize',resizeHandler);document.addEventListener('mousemove',mousemoveHandler);polyfill();scrollHandler();resizeHandler();mousemoveHandler();});