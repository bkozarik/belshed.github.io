
document.addEventListener('DOMContentLoaded',()=>{const dropdownItems=document.querySelectorAll('.js-dropdown');const mainSwiperNode=document.querySelector('.js-main-swiper');const mainSwiperPagination=document.querySelector('.js-pagination');const mainSwiperControls=document.querySelectorAll('.js-main-control')
let mainSwiperPaginationSlide;const maintTitles=document.querySelectorAll('.js-main-title-item');const reviewsSwiperNode=document.querySelector('.js-reviews-swiper');const popupTriggers=document.querySelectorAll('.js-popup-trigger');const popupCloseTriggers=document.querySelectorAll('.js-popup-close');const bodyBg=document.querySelector('.js-body-bg');const bodyBgMap=document.querySelector('.js-body-map');const scrollLinks=document.querySelectorAll('.js-scroll-link');const popupMarks=document.querySelectorAll('.js-popup-mark');const popupCities=document.querySelectorAll('.js-popup-city');const isExists=element=>{if(typeof(element)=='string'){return document.querySelector(element)?true:false;}
else if(typeof(element)=='object'){if(Array.isArray(element)){return element[0]?true:false;}
else if(NodeList.prototype.isPrototypeOf(element)){return element[0]?true:false;}
return element?true:false;}}
const updateSlidePaginationItem=pagination=>{const activePaginationItem=pagination.querySelector('.pagination__item_active');const activePaginationItemDimentions={x:activePaginationItem.offsetLeft,y:activePaginationItem.offsetTop,};const paginationSlide=pagination.querySelector('.js-pagination-item-slide');paginationSlide.style.top=activePaginationItemDimentions.y+'px';paginationSlide.style.left=activePaginationItemDimentions.x+'px';}
const updatePagination=swiper=>{const paginationItems=mainSwiperPagination.querySelectorAll('.js-pagination-item');paginationItems.forEach(item=>item.classList.remove('pagination__item_active'))
const paginationActiveItem=paginationItems[swiper.activeIndex];paginationActiveItem.classList.add('pagination__item_active');updateSlidePaginationItem(mainSwiperPagination);}
const showActualTitle=swiper=>{maintTitles.forEach(item=>{item.classList.remove('active');})
maintTitles[swiper.activeIndex].classList.add('active');}
const moveMainBg=swiper=>{const bgHeight=bodyBg.getBoundingClientRect().height;const bodyHeightt=document.body.getBoundingClientRect().height;const heightDiff=bgHeight-bodyHeightt;const moveStep=heightDiff/swiper.slides.length;if(heightDiff>0){bodyBg.style.transform=`translateY(${-1 * moveStep * swiper.activeIndex}px)`;bodyBgMap.style.transform=`translate(-50%, calc(${-5 * moveStep * swiper.activeIndex}px - 50%))`;}}
const mainSwiperInit=()=>{const mainSwiper=new Swiper(mainSwiperNode,{slidesPerView:1,direction:'vertical',speed:600,mousewheel:true,on:{init:function(){this.slides.forEach((slide,index)=>{const paginationItem=document.createElement('li');paginationItem.classList.add('pagination__item','js-pagination-item');paginationItem.setAttribute('tabindex',0);paginationItem.setAttribute('data-index',index);paginationItem.appendChild(document.createElement('span'));mainSwiperPagination.appendChild(paginationItem);});const paginationSlideItem=document.createElement('li');paginationSlideItem.classList.add('pagination__item-slide','js-pagination-item-slide');mainSwiperPagination.appendChild(paginationSlideItem);updatePagination(this);showActualTitle(this);moveMainBg(this);if(this.isEnd){document.querySelector('.main__control_next').classList.add('main__control_hidden');document.querySelector('.main__control_back').classList.remove('main__control_hidden');}
else{document.querySelector('.main__control_next').classList.remove('main__control_hidden');document.querySelector('.main__control_back').classList.add('main__control_hidden');}},slideChange:function(){updatePagination(this);showActualTitle(this);moveMainBg(this);if(!this.isBeginning&&!this.isEnd){let defaultBgOpacity=0.6;bodyBg.style.opacity=defaultBgOpacity;if(this.activeIndex==3){bodyBg.style.opacity='0.3';}
document.querySelector('.main__control_next').classList.remove('main__control_hidden');document.querySelector('.main__control_back').classList.add('main__control_hidden');}
else if(this.isBeginning){document.querySelector('.js-nav-header').classList.remove('nav_hidden');}
else if(this.isEnd){document.querySelector('.main__control_next').classList.add('main__control_hidden');document.querySelector('.main__control_back').classList.remove('main__control_hidden');}
if(!this.isBeginning){document.querySelector('.js-nav-header').classList.add('nav_hidden');}},},breakpoints:{0:{mousewheel:false,allowTouchMove:true,},920:{allowTouchMove:true,threshold:30,}}});const paginationItems=mainSwiperPagination.querySelectorAll('.js-pagination-item');mainSwiperPaginationSlide=document.querySelector('.js-pagination-item-slide')
paginationItems.forEach(item=>{item.addEventListener('click',()=>{const slideIndex=item.dataset.index;mainSwiper.slideTo(slideIndex,mainSwiper.params.speed,true);});});mainSwiperControls.forEach(control=>{control.addEventListener('click',function(){if(this.classList.contains('js-main-control-next')){mainSwiper.slideNext();}
else if(this.classList.contains('js-main-control-first')){mainSwiper.slideTo(0,mainSwiper.params.speed,true);}});});scrollLinks.forEach(link=>{link.addEventListener('click',()=>{event.preventDefault();mainSwiper.slideTo(event.target.getAttribute('href'),mainSwiper.params.speed,true);});});}
const reviewsSwiperInit=()=>{const reviewsSwiper=new Swiper(reviewsSwiperNode,{slidesPerView:1,navigation:{prevEl:'.reviews__control_prev',nextEl:'.reviews__control_next',}});}
const dropdownSelectInit=dropdownItems=>{const createOptionPopupItem=(option,index)=>{const dropdownPopupItem=document.createElement('li');dropdownPopupItem.classList.add('dropdown__item');dropdownPopupItem.setAttribute('tabindex',0);dropdownPopupItem.innerHTML=option.innerHTML;dropdownPopupItem.dataset.index=index;return dropdownPopupItem;}
const setTriggerText=(item,data)=>{return item.dataset.triggerVal=='text'?data.textContent:data.innerHTML;}
dropdownItems.forEach(item=>{const options=item.querySelectorAll('.js-dropdown-select li');options[0].dataset.selected=true;const dropdownTrigger=document.createElement('button');dropdownTrigger.classList.add('button','dropdown__trigger','js-dropdown-trigger');dropdownTrigger.setAttribute('type','button');const dropdownText=document.createElement('span');dropdownText.classList.add('dropdown__trigger-text');dropdownText.innerHTML=setTriggerText(item,options[0]);const dropdownPopupList=document.createElement('ul');dropdownPopupList.classList.add('dropdown__list');const dropdownSelect=document.createElement('select');dropdownSelect.setAttribute('name',item.dataset.selectName)
options.forEach((option,index)=>{if(option.dataset.value!='none'&&!option.hasAttribute('hidden')){const dropdownPopupItem=createOptionPopupItem(option,index);dropdownPopupList.appendChild(dropdownPopupItem);const dropdownOption=document.createElement('option');dropdownOption.innerHTML=option.textContent;dropdownOption.value=option.dataset.value;dropdownSelect.appendChild(dropdownOption);dropdownPopupItem.addEventListener('click',()=>{let targetItem=event.target;while(targetItem.tagName!='LI'){targetItem=targetItem.parentNode;}
targetItem.dataset.selected=true;targetItemIndex=parseInt(targetItem.dataset.index);dropdownSelect.querySelectorAll('option')[targetItemIndex-1].selected=true;dropdownText.innerHTML=setTriggerText(item,dropdownPopupItem);});}});dropdownTrigger.appendChild(dropdownText);item.appendChild(dropdownTrigger);item.appendChild(dropdownPopupList);item.appendChild(dropdownSelect);dropdownTrigger.addEventListener('click',()=>{event.stopImmediatePropagation();let target=event.target;while(!target.classList.contains('js-dropdown-trigger')){target=target.parentNode;}
target.classList.toggle('active');dropdownPopupList.classList.toggle('active');document.addEventListener('click',()=>{const target=event.target;event.stopImmediatePropagation();if(!target.parentNode.classList.contains('js-dropdown-trigger')&&!target.classList.contains('js-dropdown-trigger')){document.querySelectorAll('.dropdown__list').forEach(item=>item.classList.remove('active'));document.querySelectorAll('.js-dropdown-trigger').forEach(item=>item.classList.remove('active'));}});});item.querySelector('select').addEventListener('change',()=>{const targetOption=event.target;options.forEach(option=>{if(option.selected)dropdownText.innerHTML=setTriggerText(item,option);});});});}
const openPopup=popup=>{closePopups();const targetPopup=typeof(popup)=='string'?document.querySelector(popup):popup instanceof Element?popup:null;targetPopup.classList.add('active');return targetPopup;}
const openPopupByTrigger=()=>{let target=event.target;while(!target.classList.contains('js-popup-trigger')){target=target.parentNode;}
popupTriggers.forEach(trigger=>{trigger.classList.remove('active');});target.classList.add('active');closePopups();openPopup(target.dataset.target);}
const resizeHandler=()=>{moveMainBg(mainSwiperNode.swiper);document.querySelectorAll('.js-popup-answer').forEach(popup=>{popup.classList.remove('active');});if(window.innerWidth<=920){document.body.appendChild(document.querySelector('.faq__answers-list'));document.querySelectorAll('.js-popup-answer').forEach(popup=>{popup.classList.add('js-popup');});}
else{document.querySelector('.faq__wrap').appendChild(document.querySelector('.faq__answers-list'));document.querySelectorAll('.js-popup-answer').forEach((popup,index)=>{if(index==0){popup.classList.add('active');}
popup.classList.remove('js-popup');});}}
const closePopups=()=>{const popups=document.querySelectorAll('.js-popup');popups.forEach(popup=>{popup.classList.remove('active');if(isExists(popup.querySelector('video'))){popup.querySelector('video').pause();}});}
const mapMarksInit=()=>{popupMarks.forEach(mark=>{mark.addEventListener('mouseover',()=>{const targetMarks=[...popupMarks].filter(searchingMark=>searchingMark.dataset.index==mark.dataset.index);targetMarks.forEach(mark=>{mark.classList.add('visible');});});mark.addEventListener('mouseleave',()=>{const targetMarks=[...popupMarks].filter(searchingMark=>searchingMark.dataset.index==mark.dataset.index);targetMarks.forEach(mark=>{mark.classList.remove('visible');});});mark.addEventListener('click',()=>{popupMarks.forEach(mark=>{mark.classList.remove('active');});popupCities.forEach(city=>{city.classList.remove('active');});const targetMarks=[...popupMarks].filter(searchingMark=>searchingMark.dataset.index==mark.dataset.index);targetMarks.forEach(mark=>{mark.classList.add('active');const targetCities=[...popupCities].filter(searchingCity=>searchingCity.dataset.target==mark.dataset.index);targetCities.forEach(city=>{city.classList.add('active');});});});});popupCities.forEach(city=>{city.addEventListener('click',()=>{popupMarks.forEach(mark=>{mark.classList.remove('active');});popupCities.forEach(city=>{city.classList.remove('active');});event.target.classList.add('active');const targetMarks=[...popupMarks].filter(mark=>mark.dataset.index==city.dataset.target);targetMarks.forEach(mark=>{mark.classList.add('active');});});});}
popupTriggers.forEach(trigger=>{event.stopPropagation();trigger.addEventListener('click',openPopupByTrigger);});popupCloseTriggers.forEach(trigger=>trigger.addEventListener('click',event=>{event.stopPropagation();if(event.target.classList.contains('js-popup-close')){closePopups();}}));window.addEventListener('resize',resizeHandler);mapMarksInit();mainSwiperInit();reviewsSwiperInit();dropdownSelectInit(dropdownItems);resizeHandler();});