
document.addEventListener('DOMContentLoaded',function(){const header=document.querySelector('.header');const burger=document.querySelector('.js-burger');const menu=document.querySelector('.js-menu');const tabTriggers=document.querySelectorAll('.js-tab-trigger');const tabs=document.querySelectorAll('.js-tab');const mouseMoveElements=document.querySelectorAll('.js-mousemove-item');const galleryItems=document.querySelectorAll('.js-gallery-item');const popupCloseTriggers=document.querySelectorAll('.js-popup-close');const popupTriggers=document.querySelectorAll('.js-popup-trigger');const popups=document.querySelectorAll('.popup');function scrollHandler(){window.pageYOffset>60?header.classList.add('fixed'):header.classList.remove('fixed');}
function isExists(element){if(typeof(element)=='string'){return document.querySelector(element)?true:false;}
else if(typeof(element)=='object'){if(Array.isArray(element)){return element[0]?true:false;}
else if(NodeList.prototype.isPrototypeOf(element)){return element[0]?true:false;}
return element?true:false;}}
function mousemoveHandler(){mouseMoveElements.forEach(function(element){const coords={xCoord:event.clientX,yCoord:event.clientY,}
for(coord in coords){coords[coord]*=100;if(element.dataset.speed)coords[coord]*=parseFloat(element.dataset.speed);if(element.dataset.direction)element.dataset.direction=='vertical'?coords.xCoord=0:element.dataset.direction=='horizontal'?coords.yCoord=0:null;}
element.style.transform='translate( '+coords.xCoord/window.innerWidth+'%, '+coords.yCoord/window.innerHeight+'%)';});}
function openPopup(selector){const targetPopup=document.querySelector(selector);targetPopup.classList.add('active');return targetPopup;}
function openPopupByTrigger(){let target=event.target;while(!target.classList.contains('js-popup-trigger')){target=target.parentNode;}
openPopup(target.dataset.target);}
function closePopups(){popups.forEach(function(popup){popup.classList.remove('active');if(isExists(popup.querySelector('video'))){popup.querySelector('video').pause();}});}
function toggleScroll(){var state=state||null;const body=document.querySelector('body');const html=document.querySelector('html');if(state!=null){state?body.classList.remove('no-scroll'):body.classList.add('no-scroll');state?html.classList.remove('no-scroll'):html.classList.add('no-scroll');}
else{body.classList.toggle('no-scroll');html.classList.toggle('no-scroll');}}
function toggleMenu(){var state=state||null;if(state==null){return()=>{burger.classList.toggle('active');menu.classList.toggle('active');toggleScroll();}}
else{state?burger.classList.add('active'):burger.classList.remove('active');state?menu.classList.add('active'):menu.classList.remove('active');state?toggleScroll(false):toggleScroll(true);}}
if(isExists(tabTriggers)&&isExists(tabs)){Array.from(tabTriggers).forEach(function(trigger,index){if(index==0){trigger.classList.add('active');tabs[index].classList.add('active');}
trigger.addEventListener('click',function(){tabTriggers.forEach(function(trigger){trigger.classList.remove('active');});tabs.forEach(function(table){table.classList.remove('active');});trigger.classList.add('active');const targetIndex=trigger.dataset.target;const targetTables=Array.from(tabs).filter(function(item){return item.dataset.index==targetIndex;});targetTables.forEach(function(table){table.classList.add('active');});});});}
if(isExists('.js-gallery-swiper')){const gallerySwiper=new Swiper('.js-gallery-swiper',{slidesPerView:1,spaceBetween:30,speed:700,navigation:{prevEl:'.gallery__control_prev',nextEl:'.gallery__control_next',},});}
if(isExists(galleryItems)){galleryItems.forEach(function(item){item.addEventListener('click',function(event){event.preventDefault();const largeImagePath=this.getAttribute('href');const targetPopup=openPopup('.js-popup-big-image');targetPopup.querySelector('.js-popup-img').setAttribute('src',largeImagePath);});});}
if(isExists(popupCloseTriggers)){popupCloseTriggers.forEach(function(trigger){trigger.addEventListener('click',function(event){event.stopPropagation();if(event.target.classList.contains('js-popup-close')){closePopups();}})});}
if(isExists(popupTriggers)){popupTriggers.forEach(function(trigger){trigger.addEventListener('click',openPopupByTrigger);});}
if(isExists(burger)){burger.addEventListener('click',toggleMenu());}
window.addEventListener('scroll',scrollHandler);document.addEventListener('mousemove',mousemoveHandler);scrollHandler();mousemoveHandler();});