
document.addEventListener('DOMContentLoaded',()=>{const scrollLinks=document.querySelectorAll('.js-scroll-link');const clientsSwiperNode=document.querySelector('.js-clients-swiper');const catalogSwiperNode=document.querySelector('.js-catalog-swiper');const mouseMoveElements=document.querySelectorAll('.js-mousemove-item');const isExists=element=>{if(typeof(element)=='string'){return document.querySelector(element)?true:false;}
else if(typeof(element)=='object'){if(Array.isArray(element)){return element[0]?true:false;}
else if(NodeList.prototype.isPrototypeOf(element)){return element[0]?true:false;}
return element?true:false;}}
function mousemoveHandler(){mouseMoveElements.forEach(function(element){const coords={xCoord:event.clientX,yCoord:event.clientY,}
for(coord in coords){coords[coord]*=100;if(element.dataset.speed)coords[coord]*=parseFloat(element.dataset.speed);if(element.dataset.direction)element.dataset.direction=='vertical'?coords.xCoord=0:element.dataset.direction=='horizontal'?coords.yCoord=0:null;}
element.style.transform='translate( '+coords.xCoord/window.innerWidth+'%, '+coords.yCoord/window.innerHeight+'%)';});}
if(isExists(scrollLinks)){scrollLinks.forEach(link=>{link.addEventListener('click',function(event){event.preventDefault();const href=this.getAttribute('href');window.scrollTo({top:document.querySelector(href).offsetTop+30,behavior:'smooth'});});});}
if(isExists(clientsSwiperNode)){const clientsSwiper=new Swiper(clientsSwiperNode,{slidesPerView:3,spaceBetween:100,reverseDirection:true,navigation:{prevEl:'.clients__control_prev',nextEl:'.clients__control_next',},pagination:{el:'.js-pagination',type:'custom',renderCustom:function(swiper,current,total){return`<span class="swiper-pagination-current">0${total - current + 1}</span> 
                            /
                            <span class="swiper-pagination-total">0${total}</span>`;}},});clientsSwiper.slideTo(clientsSwiper.slides.length,0,true);}
if(isExists(catalogSwiperNode)){const catalogSwiper=new Swiper(catalogSwiperNode,{slidesPerView:2,spaceBetween:40,grabCursor:true,});}
if(isExists(mouseMoveElements)){document.addEventListener('mousemove',mousemoveHandler);}});